-- Public read views for the customer-facing directory + profile pages.
--
-- Base table RLS is deny-all by design (Phase 0 baseline). These views are
-- intentionally `security_invoker = off` so they run with the migration
-- owner's privileges and bypass RLS to expose a PII-stripped (lawyers) and
-- moderation-gated (reviews) surface to anon callers. Email / phone on
-- lawyer profiles are revealed only to authenticated users when the lawyer
-- has opted in via show_email / show_phone. Reviews are gated on
-- is_verified = true so unmoderated submissions never leak.

create or replace view public.public_lawyer_profiles
with (security_invoker = off)
as
select
  lp.id,
  lp.slug,
  lp.full_name,
  case when auth.uid() is not null and lp.show_email then lp.email end as email,
  case when auth.uid() is not null and lp.show_phone then lp.phone end as phone,
  lp.bar_number,
  lp.bar_association,
  lp.bio,
  lp.city,
  lp.district,
  lp.practice_areas,
  lp.avatar_url,
  lp.years_of_experience,
  lp.rating,
  lp.reviews_count,
  lp.created_at
from public.lawyer_profiles lp
where lp.is_active = true and lp.verification_status = 'verified';

revoke all on public.public_lawyer_profiles from public;
grant select on public.public_lawyer_profiles to anon, authenticated;

-- =============================================================================
-- public.public_reviews — moderated review feed for /avukat/:slug pages
-- =============================================================================

create or replace view public.public_reviews
with (security_invoker = off)
as
select
  r.id,
  r.lawyer_id,
  r.rating,
  r.comment,
  r.created_at
from public.reviews r
where r.is_verified = true;

revoke all on public.public_reviews from public;
grant select on public.public_reviews to anon, authenticated;
