-- Lead notification pipeline (slice 3.D).
--
-- When a customer creates a request, fire-and-forget POST to the
-- notify-lawyers edge function which picks up to 3 verified lawyers in
-- the matching practice_area + city (preferring same district), charges
-- 1 credit, sends email, idempotently logs to request_notification_logs.
--
-- Adds:
--   1. pg_net extension (HTTP from Postgres)
--   2. lawyer_credits + credit_transactions tables (basic credit ledger)
--   3. seed_lawyer_credits trigger — every new lawyer_profiles row gets
--      a beta-grant of 999 credits. TODO(slice 3.E): change default to 0
--      once iyzico ships.
--   4. record_lead_notification(request_id, lawyer_id) — atomic charge +
--      log; idempotent; returns (charged, log_id) so the edge function
--      knows whether to send an email.
--   5. dispatch_request_notifications() trigger on requests.INSERT that
--      POSTs request_id to the edge function with a shared secret.

-- =============================================================================
-- 1. pg_net extension
-- =============================================================================

create extension if not exists pg_net with schema extensions;

-- =============================================================================
-- 2. lawyer_credits + credit_transactions
-- =============================================================================

create table if not exists public.lawyer_credits (
  lawyer_id uuid primary key references public.lawyer_profiles(id) on delete cascade,
  balance integer not null default 0 check (balance >= 0),
  updated_at timestamptz not null default now()
);

alter table public.lawyer_credits enable row level security;

drop policy if exists "lawyer_credits_self_read" on public.lawyer_credits;
create policy "lawyer_credits_self_read"
  on public.lawyer_credits for select
  to authenticated
  using (
    exists (
      select 1 from public.lawyer_profiles lp
      where lp.id = lawyer_credits.lawyer_id and lp.user_id = auth.uid()
    )
    or public.is_admin()
  );

create table if not exists public.credit_transactions (
  id uuid primary key default gen_random_uuid(),
  lawyer_id uuid not null references public.lawyer_profiles(id) on delete cascade,
  delta integer not null,
  reason text not null check (
    reason in ('purchase', 'lead_charge', 'refund', 'admin_adjustment', 'beta_grant')
  ),
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists credit_transactions_lawyer_idx
  on public.credit_transactions (lawyer_id, created_at desc);

alter table public.credit_transactions enable row level security;

drop policy if exists "credit_transactions_self_read" on public.credit_transactions;
create policy "credit_transactions_self_read"
  on public.credit_transactions for select
  to authenticated
  using (
    exists (
      select 1 from public.lawyer_profiles lp
      where lp.id = credit_transactions.lawyer_id and lp.user_id = auth.uid()
    )
    or public.is_admin()
  );

-- =============================================================================
-- 3. seed_lawyer_credits trigger
-- =============================================================================

create or replace function public.seed_lawyer_credits()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  -- TODO(slice 3.E): change default to 0 once iyzico ships.
  -- For beta, every new profile gets 999 free leads worth of credits.
  v_initial_balance integer := 999;
begin
  insert into public.lawyer_credits (lawyer_id, balance)
  values (new.id, v_initial_balance)
  on conflict (lawyer_id) do nothing;

  insert into public.credit_transactions (lawyer_id, delta, reason, metadata)
  values (
    new.id,
    v_initial_balance,
    'beta_grant',
    jsonb_build_object('source', 'on_lawyer_profile_create')
  );
  return new;
end;
$$;

drop trigger if exists trg_seed_lawyer_credits on public.lawyer_profiles;
create trigger trg_seed_lawyer_credits
  after insert on public.lawyer_profiles
  for each row execute function public.seed_lawyer_credits();

-- Backfill: any pre-existing lawyer_profiles without a lawyer_credits row
insert into public.lawyer_credits (lawyer_id, balance)
select lp.id, 999
  from public.lawyer_profiles lp
  left join public.lawyer_credits lc on lc.lawyer_id = lp.id
 where lc.lawyer_id is null;

-- =============================================================================
-- 4. record_lead_notification(request_id, lawyer_id) — atomic charge + log
-- =============================================================================

create or replace function public.record_lead_notification(
  p_request_id uuid,
  p_lawyer_id uuid
)
returns table (charged boolean, log_id uuid)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_log_id uuid;
  v_balance integer;
begin
  -- Idempotency: if a log row already exists, bail without charging.
  select id into v_log_id
    from public.request_notification_logs
   where request_id = p_request_id and lawyer_id = p_lawyer_id;
  if v_log_id is not null then
    return query select false, v_log_id;
    return;
  end if;

  -- Try to atomically deduct one credit. NULL balance means insufficient
  -- balance OR missing credits row.
  update public.lawyer_credits
     set balance = balance - 1,
         updated_at = now()
   where lawyer_id = p_lawyer_id and balance >= 1
   returning balance into v_balance;
  if v_balance is null then
    return query select false, null::uuid;
    return;
  end if;

  -- Record the charge.
  insert into public.credit_transactions (lawyer_id, delta, reason, metadata)
  values (
    p_lawyer_id,
    -1,
    'lead_charge',
    jsonb_build_object('request_id', p_request_id)
  );

  -- Log the notification (also unique-constrained).
  insert into public.request_notification_logs (request_id, lawyer_id)
  values (p_request_id, p_lawyer_id)
  on conflict (request_id, lawyer_id) do nothing
  returning id into v_log_id;

  return query select true, v_log_id;
end;
$$;

revoke all on function public.record_lead_notification(uuid, uuid) from public;
revoke all on function public.record_lead_notification(uuid, uuid) from anon, authenticated;
grant execute on function public.record_lead_notification(uuid, uuid) to service_role;

-- =============================================================================
-- 5. pick_lawyers_for_request — selects up to 3 lawyers for a given request
-- =============================================================================
-- Same-district matches first (priority 0), then any-district (priority 1).
-- Within each priority bucket, ordered by credit balance desc (richest
-- lawyers get matched first; intentional revenue-aligning incentive).

drop function if exists public.pick_lawyers_for_request(uuid);
create or replace function public.pick_lawyers_for_request(p_request_id uuid)
returns table (
  id uuid,
  full_name text,
  email text,
  phone text,
  district text,
  practice_areas text[]
)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  v_req_practice_area text;
  v_req_district text;
begin
  select r.practice_area, r.district
    into v_req_practice_area, v_req_district
    from public.requests r
   where r.id = p_request_id;

  if v_req_practice_area is null then
    return;
  end if;

  return query
  select
    lp.id,
    lp.full_name,
    lp.email,
    lp.phone,
    lp.district,
    lp.practice_areas
  from public.lawyer_profiles lp
  left join public.lawyer_credits lc on lc.lawyer_id = lp.id
  where lp.is_active = true
    and lp.verification_status = 'verified'
    and lp.city = 'İstanbul'
    and v_req_practice_area = any(lp.practice_areas)
    and coalesce(lc.balance, 0) >= 1
  order by
    (case
       when v_req_district is not null and lp.district = v_req_district then 0
       else 1
     end) asc,
    coalesce(lc.balance, 0) desc
  limit 3;
end;
$$;

revoke all on function public.pick_lawyers_for_request(uuid) from public;
revoke all on function public.pick_lawyers_for_request(uuid) from anon, authenticated;
grant execute on function public.pick_lawyers_for_request(uuid) to service_role;

-- =============================================================================
-- 6. notify-lawyers config + dispatch trigger
-- =============================================================================

insert into public.app_settings (key, value)
values (
  'notify_lawyers_config',
  jsonb_build_object(
    'function_url',
    'https://kcukkqnkhvhphfdebcuh.supabase.co/functions/v1/notify-lawyers',
    'shared_secret',
    encode(gen_random_bytes(32), 'hex')
  )
) on conflict (key) do nothing;

create or replace function public.dispatch_request_notifications()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_function_url text;
  v_secret text;
  v_request_id bigint;
begin
  select value->>'function_url', value->>'shared_secret'
    into v_function_url, v_secret
    from public.app_settings
   where key = 'notify_lawyers_config';

  -- Bail silently if not configured (lets the migration apply before the
  -- function is deployed, and lets local/test envs run without HTTP).
  if v_function_url is null or v_function_url = '' then
    return new;
  end if;

  begin
    select net.http_post(
      url := v_function_url,
      body := jsonb_build_object('request_id', new.id),
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'X-Notify-Secret', v_secret
      )
    ) into v_request_id;
  exception when others then
    -- Never let a notification dispatch break request creation.
    raise notice 'notify-lawyers dispatch error: %', sqlerrm;
  end;
  return new;
end;
$$;

drop trigger if exists trg_dispatch_request_notifications on public.requests;
create trigger trg_dispatch_request_notifications
  after insert on public.requests
  for each row execute function public.dispatch_request_notifications();
