-- Panel-side wiring for slice 3.B.
--
-- Adds:
--   1. lawyer-avatars storage bucket (public read; user owns own folder)
--   2. lawyer-documents storage bucket (private; user owns own folder)
--   3. get_my_received_leads() RPC: lead inbox for the panel
--   4. mark_lead_viewed(p_log_id uuid) RPC: idempotent first-view stamp
--   5. RLS policies on quotes + request_notification_logs so the panel
--      can read its own data and submit quotes through the regular
--      authenticated client (no SECURITY DEFINER wrapper for quote insert).

-- =============================================================================
-- 1. Storage buckets
-- =============================================================================

insert into storage.buckets (id, name, public)
values ('lawyer-avatars', 'lawyer-avatars', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('lawyer-documents', 'lawyer-documents', false)
on conflict (id) do nothing;

-- ----- lawyer-avatars: public read, user owns their own folder -----

drop policy if exists "lawyer_avatars_public_read" on storage.objects;
create policy "lawyer_avatars_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'lawyer-avatars');

drop policy if exists "lawyer_avatars_self_insert" on storage.objects;
create policy "lawyer_avatars_self_insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'lawyer-avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "lawyer_avatars_self_update" on storage.objects;
create policy "lawyer_avatars_self_update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'lawyer-avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "lawyer_avatars_self_delete" on storage.objects;
create policy "lawyer_avatars_self_delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'lawyer-avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- ----- lawyer-documents: private; only owner reads/writes -----

drop policy if exists "lawyer_documents_self_read" on storage.objects;
create policy "lawyer_documents_self_read"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'lawyer-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "lawyer_documents_self_insert" on storage.objects;
create policy "lawyer_documents_self_insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'lawyer-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "lawyer_documents_self_update" on storage.objects;
create policy "lawyer_documents_self_update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'lawyer-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "lawyer_documents_self_delete" on storage.objects;
create policy "lawyer_documents_self_delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'lawyer-documents'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- =============================================================================
-- 2. get_my_received_leads()
-- =============================================================================

create or replace function public.get_my_received_leads()
returns table (
  log_id uuid,
  request_id uuid,
  notified_at timestamptz,
  viewed_at timestamptz,
  customer_name text,
  customer_phone text,
  customer_email text,
  practice_area text,
  case_type text,
  city text,
  district text,
  description text,
  urgency text,
  request_created_at timestamptz,
  request_status text
)
language sql
security definer
set search_path = public
as $$
  select
    rnl.id           as log_id,
    rnl.request_id   as request_id,
    rnl.notified_at  as notified_at,
    rnl.viewed_at    as viewed_at,
    r.customer_name  as customer_name,
    r.customer_phone as customer_phone,
    r.customer_email as customer_email,
    r.practice_area  as practice_area,
    r.case_type      as case_type,
    r.city           as city,
    r.district       as district,
    r.description    as description,
    r.urgency        as urgency,
    r.created_at     as request_created_at,
    r.status         as request_status
  from public.request_notification_logs rnl
  join public.lawyer_profiles lp on lp.id = rnl.lawyer_id
  join public.requests r on r.id = rnl.request_id
  where lp.user_id = auth.uid()
  order by rnl.notified_at desc;
$$;

revoke all on function public.get_my_received_leads() from public;
grant execute on function public.get_my_received_leads() to authenticated;

-- =============================================================================
-- 3. mark_lead_viewed(p_log_id uuid)
-- =============================================================================

create or replace function public.mark_lead_viewed(p_log_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.request_notification_logs rnl
     set viewed_at = coalesce(rnl.viewed_at, now())
    from public.lawyer_profiles lp
   where rnl.id = p_log_id
     and rnl.lawyer_id = lp.id
     and lp.user_id = auth.uid();
end;
$$;

revoke all on function public.mark_lead_viewed(uuid) from public;
grant execute on function public.mark_lead_viewed(uuid) to authenticated;

-- =============================================================================
-- 4. RLS on quotes (lawyer-side). Customer-side reads come via Agent 2.
-- =============================================================================

drop policy if exists "quotes_lawyer_read_own" on public.quotes;
create policy "quotes_lawyer_read_own"
  on public.quotes for select
  to authenticated
  using (
    exists (
      select 1 from public.lawyer_profiles lp
      where lp.id = quotes.lawyer_id
        and lp.user_id = auth.uid()
    )
  );

drop policy if exists "quotes_lawyer_insert_own" on public.quotes;
create policy "quotes_lawyer_insert_own"
  on public.quotes for insert
  to authenticated
  with check (
    -- The quote's lawyer_id must belong to the calling user
    exists (
      select 1 from public.lawyer_profiles lp
      where lp.id = quotes.lawyer_id
        and lp.user_id = auth.uid()
    )
    -- And the lawyer must have actually been notified about this request
    -- (prevents back-door quoting on requests the lawyer wasn't billed for)
    and exists (
      select 1 from public.request_notification_logs rnl
      where rnl.request_id = quotes.request_id
        and rnl.lawyer_id  = quotes.lawyer_id
    )
  );

-- =============================================================================
-- 5. RLS on request_notification_logs
-- =============================================================================

drop policy if exists "notif_logs_lawyer_read_own" on public.request_notification_logs;
create policy "notif_logs_lawyer_read_own"
  on public.request_notification_logs for select
  to authenticated
  using (
    exists (
      select 1 from public.lawyer_profiles lp
      where lp.id = request_notification_logs.lawyer_id
        and lp.user_id = auth.uid()
    )
  );
