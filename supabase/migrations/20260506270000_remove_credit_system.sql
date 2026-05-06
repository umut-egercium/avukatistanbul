-- Scrap the credit / payment system entirely.
--
-- Decision: AvukatIstanbul will not gate lead notifications on a credit
-- balance. Lawyers receive all matching leads as long as they are verified
-- and active. A future monetization strategy can be added later if desired,
-- but the credit-purchase model is dropped.
--
-- This migration:
--   1. Drops the seed-credits trigger + helper.
--   2. Replaces record_lead_notification to no longer charge.
--   3. Replaces pick_lawyers_for_request to no longer filter by balance.
--   4. Drops the lawyer_credits + credit_transactions tables.

-- =============================================================================
-- 1. Drop seed-credits machinery
-- =============================================================================

drop trigger if exists trg_seed_lawyer_credits on public.lawyer_profiles;
drop function if exists public.seed_lawyer_credits();

-- =============================================================================
-- 2. Replace record_lead_notification (no credit deduction)
-- =============================================================================
-- Returns (notified boolean, log_id uuid):
--   notified=true, log_id=...   → fresh notification, send email
--   notified=false, log_id=... → already notified previously (idempotent)
--   notified=false, log_id=null → unexpected (shouldn't happen now)

drop function if exists public.record_lead_notification(uuid, uuid);

create or replace function public.record_lead_notification(
  p_request_id uuid,
  p_lawyer_id uuid
)
returns table (notified boolean, log_id uuid)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_log_id uuid;
begin
  -- Idempotency: bail without re-notifying if log already exists.
  select id into v_log_id
    from public.request_notification_logs
   where request_id = p_request_id and lawyer_id = p_lawyer_id;
  if v_log_id is not null then
    return query select false, v_log_id;
    return;
  end if;

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
-- 3. Replace pick_lawyers_for_request (no balance filter)
-- =============================================================================
-- Same priority order: same-district first, then any district. Within each
-- bucket, older profiles get matched first (deterministic, fair).

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
  where lp.is_active = true
    and lp.verification_status = 'verified'
    and lp.city = 'İstanbul'
    and v_req_practice_area = any(lp.practice_areas)
  order by
    (case
       when v_req_district is not null and lp.district = v_req_district then 0
       else 1
     end) asc,
    lp.created_at asc
  limit 3;
end;
$$;

revoke all on function public.pick_lawyers_for_request(uuid) from public;
revoke all on function public.pick_lawyers_for_request(uuid) from anon, authenticated;
grant execute on function public.pick_lawyers_for_request(uuid) to service_role;

-- =============================================================================
-- 4. Drop credit tables
-- =============================================================================
-- CASCADE because credit_transactions references lawyer_profiles via FK
-- (and policies / indexes get dropped along with the tables).

drop table if exists public.credit_transactions cascade;
drop table if exists public.lawyer_credits cascade;
