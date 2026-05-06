-- Initial schema for AvukatIstanbul.
-- A two-sided marketplace: customers post legal requests, verified İstanbul
-- lawyers respond with quotes. Mirrors the data model proven on Müşavirbul,
-- adapted for legal practice areas.

-- =============================================================================
-- 1. profiles + user_roles
-- =============================================================================

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('customer', 'lawyer', 'admin')),
  created_at timestamptz not null default now()
);

-- =============================================================================
-- 2. lawyer_profiles + lawyer_applications
-- =============================================================================

create table public.lawyer_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete set null,
  slug text not null unique,
  full_name text not null,
  email text,
  phone text,
  bar_number text,
  bar_association text not null default 'İstanbul Barosu',
  bio text,
  city text not null default 'İstanbul',
  district text,
  practice_areas text[] not null default array[]::text[],
  avatar_url text,
  years_of_experience integer,
  is_active boolean not null default true,
  verification_status text not null default 'pending'
    check (verification_status in ('pending', 'verified', 'rejected')),
  show_email boolean not null default false,
  show_phone boolean not null default false,
  rating numeric(3,2),
  reviews_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index lawyer_profiles_district_idx
  on public.lawyer_profiles (district)
  where is_active = true and verification_status = 'verified';

create index lawyer_profiles_practice_areas_gin_idx
  on public.lawyer_profiles using gin (practice_areas)
  where is_active = true and verification_status = 'verified';

create table public.lawyer_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text not null,
  bar_number text,
  bar_association text not null default 'İstanbul Barosu',
  city text not null default 'İstanbul',
  district text,
  practice_areas text[] not null default array[]::text[],
  bio text,
  years_of_experience integer,
  certificate_url text,
  application_status text not null default 'pending'
    check (application_status in ('pending', 'approved', 'rejected')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index lawyer_applications_status_idx
  on public.lawyer_applications (application_status, created_at desc);

-- =============================================================================
-- 3. requests + quotes + reviews + notification logs
-- =============================================================================

create table public.requests (
  id uuid primary key default gen_random_uuid(),
  customer_user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  customer_email text not null default '',
  customer_phone text not null,
  city text not null default 'İstanbul',
  district text,
  practice_area text not null,
  case_type text,
  description text,
  urgency text check (urgency in ('urgent', 'soon', 'flexible')),
  is_anonymous boolean not null default true,
  anonymous_token uuid not null default gen_random_uuid(),
  status text not null default 'open'
    check (status in ('open', 'matched', 'closed')),
  -- Ad attribution (Google Ads click ids)
  gclid text,
  gbraid text,
  wbraid text,
  click_captured_at timestamptz,
  created_at timestamptz not null default now()
);

create index requests_practice_area_idx
  on public.requests (practice_area, created_at desc);

create index requests_district_idx
  on public.requests (district)
  where district is not null;

create index requests_anonymous_token_idx
  on public.requests (anonymous_token);

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  lawyer_id uuid not null references public.lawyer_profiles(id) on delete cascade,
  message text not null,
  estimated_fee_min numeric,
  estimated_fee_max numeric,
  created_at timestamptz not null default now(),
  unique (request_id, lawyer_id)
);

create index quotes_lawyer_idx on public.quotes (lawyer_id, created_at desc);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  lawyer_id uuid not null references public.lawyer_profiles(id) on delete cascade,
  customer_user_id uuid references auth.users(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  is_verified boolean not null default false,
  created_at timestamptz not null default now()
);

create index reviews_lawyer_idx on public.reviews (lawyer_id, created_at desc);

create table public.request_notification_logs (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  lawyer_id uuid not null references public.lawyer_profiles(id) on delete cascade,
  notified_at timestamptz not null default now(),
  viewed_at timestamptz,
  unique (request_id, lawyer_id)
);

create index notif_logs_lawyer_idx
  on public.request_notification_logs (lawyer_id, notified_at desc);

-- =============================================================================
-- 4. app_settings (key-value config used by edge functions / admin panel)
-- =============================================================================

create table public.app_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- =============================================================================
-- 5. updated_at triggers
-- =============================================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger trg_lawyer_profiles_updated_at
  before update on public.lawyer_profiles
  for each row execute function public.set_updated_at();

create trigger trg_lawyer_applications_updated_at
  before update on public.lawyer_applications
  for each row execute function public.set_updated_at();

-- =============================================================================
-- 6. RLS — enabled on every public table, deny-by-default until policies arrive
-- =============================================================================
-- Phase 0: lock everything down. Service role (used by edge functions and the
-- migration runner) bypasses RLS and can still do everything. Phase 2+ will
-- add per-flow policies as we build customer + lawyer surfaces.

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.lawyer_profiles enable row level security;
alter table public.lawyer_applications enable row level security;
alter table public.requests enable row level security;
alter table public.quotes enable row level security;
alter table public.reviews enable row level security;
alter table public.request_notification_logs enable row level security;
alter table public.app_settings enable row level security;
