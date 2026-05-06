-- Admin queue + bootstrap (slice 3.C).
--
-- Adds:
--   1. is_admin() helper used by RLS policies and RPCs.
--   2. Admin-side RLS read policies on the tables the admin UI lists.
--   3. RPCs for state transitions: approve/reject lawyer application,
--      toggle is_active. All SECURITY DEFINER and gated on is_admin().
--   4. get_admin_dashboard_stats() — counts powering /admin home.
--   5. promote_to_admin(p_email text) — service-role-only bootstrap.

-- =============================================================================
-- 1. is_admin() helper
-- =============================================================================

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

-- The function reads user_roles on behalf of the caller; SECURITY DEFINER
-- ensures it can run even when the caller's RLS would block the row read.
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- =============================================================================
-- 2. Admin RLS read policies
-- =============================================================================

drop policy if exists "admin_read_all_profiles" on public.profiles;
create policy "admin_read_all_profiles"
  on public.profiles for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admin_read_all_user_roles" on public.user_roles;
create policy "admin_read_all_user_roles"
  on public.user_roles for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admin_read_all_lawyer_profiles" on public.lawyer_profiles;
create policy "admin_read_all_lawyer_profiles"
  on public.lawyer_profiles for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admin_read_all_lawyer_applications" on public.lawyer_applications;
create policy "admin_read_all_lawyer_applications"
  on public.lawyer_applications for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admin_read_all_requests" on public.requests;
create policy "admin_read_all_requests"
  on public.requests for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admin_read_all_quotes" on public.quotes;
create policy "admin_read_all_quotes"
  on public.quotes for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admin_read_all_reviews" on public.reviews;
create policy "admin_read_all_reviews"
  on public.reviews for select
  to authenticated
  using (public.is_admin());

drop policy if exists "admin_read_all_notif_logs" on public.request_notification_logs;
create policy "admin_read_all_notif_logs"
  on public.request_notification_logs for select
  to authenticated
  using (public.is_admin());

-- Storage: admin reads private lawyer-documents (so the queue can preview
-- baro certificates via signed URLs).
drop policy if exists "admin_read_lawyer_documents" on storage.objects;
create policy "admin_read_lawyer_documents"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'lawyer-documents' and public.is_admin()
  );

-- =============================================================================
-- 3. State-transition RPCs
-- =============================================================================

create or replace function public.approve_lawyer_application(
  p_application_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
begin
  if not public.is_admin() then
    raise exception 'Yalnızca yöneticiler bu işlemi yapabilir';
  end if;

  update public.lawyer_applications
     set application_status = 'approved'
   where id = p_application_id
   returning user_id into v_user_id;

  if v_user_id is null then
    raise exception 'Başvuru bulunamadı';
  end if;

  update public.lawyer_profiles
     set verification_status = 'verified',
         is_active = true
   where user_id = v_user_id;
end;
$$;

revoke all on function public.approve_lawyer_application(uuid) from public;
grant execute on function public.approve_lawyer_application(uuid) to authenticated;

create or replace function public.reject_lawyer_application(
  p_application_id uuid,
  p_notes text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
begin
  if not public.is_admin() then
    raise exception 'Yalnızca yöneticiler bu işlemi yapabilir';
  end if;
  if p_notes is null or length(btrim(p_notes)) < 5 then
    raise exception 'Reddetme nedeni en az 5 karakter olmalı';
  end if;

  update public.lawyer_applications
     set application_status = 'rejected',
         notes = p_notes
   where id = p_application_id
   returning user_id into v_user_id;

  if v_user_id is null then
    raise exception 'Başvuru bulunamadı';
  end if;

  update public.lawyer_profiles
     set verification_status = 'rejected'
   where user_id = v_user_id;
end;
$$;

revoke all on function public.reject_lawyer_application(uuid, text) from public;
grant execute on function public.reject_lawyer_application(uuid, text) to authenticated;

create or replace function public.set_lawyer_active(
  p_lawyer_id uuid,
  p_active boolean
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Yalnızca yöneticiler bu işlemi yapabilir';
  end if;
  update public.lawyer_profiles
     set is_active = p_active
   where id = p_lawyer_id;
end;
$$;

revoke all on function public.set_lawyer_active(uuid, boolean) from public;
grant execute on function public.set_lawyer_active(uuid, boolean) to authenticated;

-- =============================================================================
-- 4. get_admin_dashboard_stats()
-- =============================================================================

create or replace function public.get_admin_dashboard_stats()
returns table (
  pending_applications integer,
  rejected_applications integer,
  verified_lawyers integer,
  active_lawyers integer,
  total_requests integer,
  requests_last_24h integer,
  requests_last_7d integer,
  open_requests integer
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Yalnızca yöneticiler bu istatistikleri görebilir';
  end if;
  return query
  select
    (select count(*)::integer from public.lawyer_applications
       where application_status = 'pending'),
    (select count(*)::integer from public.lawyer_applications
       where application_status = 'rejected'),
    (select count(*)::integer from public.lawyer_profiles
       where verification_status = 'verified'),
    (select count(*)::integer from public.lawyer_profiles
       where verification_status = 'verified' and is_active = true),
    (select count(*)::integer from public.requests),
    (select count(*)::integer from public.requests
       where created_at > now() - interval '24 hours'),
    (select count(*)::integer from public.requests
       where created_at > now() - interval '7 days'),
    (select count(*)::integer from public.requests where status = 'open');
end;
$$;

revoke all on function public.get_admin_dashboard_stats() from public;
grant execute on function public.get_admin_dashboard_stats() to authenticated;

-- =============================================================================
-- 5. promote_to_admin(p_email) — bootstrap, service-role only
-- =============================================================================
-- Run via:
--   supabase db query --linked "select public.promote_to_admin('umegerci@gmail.com');"
--
-- The function intentionally does NOT check is_admin() — it's the bootstrap
-- path before any admin exists. Restricted to service_role/postgres only by
-- revoking from anon and authenticated.

create or replace function public.promote_to_admin(p_email text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
begin
  select id into v_user_id
    from auth.users
   where lower(email) = lower(btrim(p_email))
   limit 1;

  if v_user_id is null then
    raise exception 'Bu e-posta ile bir kullanıcı bulunamadı: %', p_email;
  end if;

  insert into public.user_roles (user_id, role)
  values (v_user_id, 'admin')
  on conflict (user_id) do update set role = 'admin';
end;
$$;

revoke all on function public.promote_to_admin(text) from public;
revoke all on function public.promote_to_admin(text) from anon, authenticated;
grant execute on function public.promote_to_admin(text) to service_role;
