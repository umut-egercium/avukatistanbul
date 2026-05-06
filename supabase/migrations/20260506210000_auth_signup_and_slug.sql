-- Auth + lawyer signup wiring (slice 3.A).
--
-- This migration wires three things:
--   1. A Turkish-aware slugify() function used to generate lawyer profile
--      slugs from their full name.
--   2. An auth.users INSERT trigger that mirrors the row into public.profiles
--      and assigns a role in public.user_roles based on signup metadata.
--   3. A public.lawyer_applications INSERT trigger that creates a matching
--      pending lawyer_profiles row with a unique slug.
--
-- Plus the RLS policies needed for the lawyer signup + login flows to work
-- under RLS-on-deny-by-default (Phase 0 baseline). Agent 2's customer flows
-- and Agent 3's admin/payments work add their own policies later.

-- =============================================================================
-- 1. slugify()
-- =============================================================================

create or replace function public.slugify(input text)
returns text
language plpgsql
immutable
as $$
declare
  result text;
begin
  -- Turkish characters → ASCII, then lowercase
  result := lower(translate(input, 'çğıöşüÇĞİÖŞÜ', 'cgiosucgiosu'));
  -- Anything that's not [a-z0-9] becomes a hyphen
  result := regexp_replace(result, '[^a-z0-9]+', '-', 'g');
  -- Trim leading/trailing hyphens
  result := trim(both '-' from result);
  return result;
end;
$$;

-- =============================================================================
-- 2. auth.users INSERT → profiles + user_roles
-- =============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name, email, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'phone'
  )
  on conflict (user_id) do nothing;

  insert into public.user_roles (user_id, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================================================
-- 3. lawyer_applications INSERT → pending lawyer_profiles
-- =============================================================================

create or replace function public.handle_new_lawyer_application()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base_slug text;
  candidate text;
  counter integer := 1;
begin
  -- Skip if the applicant already has a lawyer_profiles row (e.g. they
  -- re-submitted because the admin asked for clarification).
  if new.user_id is not null
     and exists (select 1 from public.lawyer_profiles where user_id = new.user_id)
  then
    return new;
  end if;

  base_slug := public.slugify(new.full_name);
  if base_slug = '' then
    base_slug := 'avukat';
  end if;

  candidate := base_slug;
  while exists (select 1 from public.lawyer_profiles where slug = candidate) loop
    counter := counter + 1;
    candidate := base_slug || '-' || counter;
  end loop;

  insert into public.lawyer_profiles (
    user_id, slug, full_name, email, phone, bar_number, bar_association,
    bio, city, district, practice_areas, years_of_experience,
    verification_status, is_active
  ) values (
    new.user_id, candidate, new.full_name, new.email, new.phone,
    new.bar_number, new.bar_association, new.bio, new.city, new.district,
    new.practice_areas, new.years_of_experience, 'pending', true
  );
  return new;
end;
$$;

drop trigger if exists trg_lawyer_application_creates_profile
  on public.lawyer_applications;
create trigger trg_lawyer_application_creates_profile
  after insert on public.lawyer_applications
  for each row execute function public.handle_new_lawyer_application();

-- =============================================================================
-- 4. RLS policies (auth + lawyer-side)
-- =============================================================================
-- Phase 0 left RLS enabled with no policies (deny-all). Add the minimum
-- needed for signup, login, and the lawyer's own panel access.

-- profiles: each user reads + updates their own
create policy "profiles_self_read"
  on public.profiles for select
  to authenticated
  using (auth.uid() = user_id);

create policy "profiles_self_update"
  on public.profiles for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- user_roles: each user reads their own (used by useAuth)
create policy "user_roles_self_read"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

-- lawyer_applications: applicant inserts and reads their own
create policy "lawyer_applications_self_insert"
  on public.lawyer_applications for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "lawyer_applications_self_read"
  on public.lawyer_applications for select
  to authenticated
  using (auth.uid() = user_id);

-- lawyer_profiles: lawyer reads + updates their own
-- (Public read of *verified, active* profiles will land via Agent 2's
-- public_lawyer_profiles view, not via direct RLS on the base table.)
create policy "lawyer_profiles_self_read"
  on public.lawyer_profiles for select
  to authenticated
  using (auth.uid() = user_id);

create policy "lawyer_profiles_self_update"
  on public.lawyer_profiles for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
