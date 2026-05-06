-- Customer request RPCs.
-- create_request — anon-callable, SECURITY DEFINER. Inserts into public.requests
-- and returns (id, anonymous_token, is_anonymous). Captures gclid/gbraid/wbraid
-- for offline ad conversions.
-- get_anonymous_request — token-protected fetch for the /talep-basarili page
-- and the localStorage-backed /taleplerim list.
--
-- Click-id validation note: we deliberately use `^[A-Za-z0-9_-]+$` and a
-- separate length check (BETWEEN 8 AND 512). Bounded repetition `{8,512}`
-- exceeds Postgres POSIX regex's 255 cap and raises "invalid repetition
-- count(s)" at parse time — see Müşavirbul incident 2026-05-06.

create or replace function public.create_request(
  p_full_name text,
  p_phone text,
  p_email text,
  p_practice_area text,
  p_district text default null,
  p_case_type text default null,
  p_urgency text default null,
  p_description text default null,
  p_gclid text default null,
  p_gbraid text default null,
  p_wbraid text default null
)
returns table(id uuid, anonymous_token uuid, is_anonymous boolean)
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_uid uuid := auth.uid();
  v_is_anon boolean := v_uid is null;
  v_re text := '^[A-Za-z0-9_-]+$';
  v_gclid  text := null;
  v_gbraid text := null;
  v_wbraid text := null;
  v_click_at timestamptz := null;
  v_urgency text := null;
begin
  if p_full_name is null or length(btrim(p_full_name)) < 2 then
    raise exception 'Geçerli bir ad giriniz';
  end if;

  if p_phone is null
     or length(regexp_replace(p_phone, '[^0-9]', '', 'g')) <> 11
     or left(regexp_replace(p_phone, '[^0-9]', '', 'g'), 2) <> '05' then
    raise exception 'Geçerli bir cep telefonu giriniz';
  end if;

  if p_practice_area is null or length(btrim(p_practice_area)) = 0 then
    raise exception 'Hukuk dalı seçimi gereklidir';
  end if;

  if p_urgency is not null and p_urgency in ('urgent', 'soon', 'flexible') then
    v_urgency := p_urgency;
  end if;

  -- Validate click identifiers; silently drop malformed values so analytics
  -- never blocks a lead from being created.
  begin
    if p_gclid is not null
       and length(p_gclid) between 8 and 512
       and p_gclid ~ v_re then v_gclid := p_gclid; end if;
    if p_gbraid is not null
       and length(p_gbraid) between 8 and 512
       and p_gbraid ~ v_re then v_gbraid := p_gbraid; end if;
    if p_wbraid is not null
       and length(p_wbraid) between 8 and 512
       and p_wbraid ~ v_re then v_wbraid := p_wbraid; end if;
  exception when others then
    v_gclid  := null;
    v_gbraid := null;
    v_wbraid := null;
  end;

  if v_gclid is not null or v_gbraid is not null or v_wbraid is not null then
    v_click_at := now();
  end if;

  return query
  insert into public.requests (
    customer_user_id,
    customer_name,
    customer_email,
    customer_phone,
    city,
    district,
    practice_area,
    case_type,
    urgency,
    description,
    is_anonymous,
    gclid,
    gbraid,
    wbraid,
    click_captured_at
  ) values (
    v_uid,
    btrim(p_full_name),
    coalesce(btrim(p_email), ''),
    regexp_replace(p_phone, '[^0-9]', '', 'g'),
    'İstanbul',
    nullif(btrim(p_district), ''),
    btrim(p_practice_area),
    nullif(btrim(p_case_type), ''),
    v_urgency,
    nullif(btrim(p_description), ''),
    v_is_anon,
    v_gclid,
    v_gbraid,
    v_wbraid,
    v_click_at
  )
  returning public.requests.id, public.requests.anonymous_token, public.requests.is_anonymous;
end;
$function$;

revoke all on function public.create_request(
  text, text, text, text, text, text, text, text, text, text, text
) from public;
grant execute on function public.create_request(
  text, text, text, text, text, text, text, text, text, text, text
) to anon, authenticated;

-- =============================================================================
-- get_anonymous_request — token-protected request lookup for the success page
-- =============================================================================

create or replace function public.get_anonymous_request(
  p_request_id uuid,
  p_token uuid
)
returns table(
  id uuid,
  customer_name text,
  practice_area text,
  case_type text,
  district text,
  urgency text,
  description text,
  status text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if p_request_id is null or p_token is null then
    return;
  end if;

  return query
  select
    r.id,
    r.customer_name,
    r.practice_area,
    r.case_type,
    r.district,
    r.urgency,
    r.description,
    r.status,
    r.created_at
  from public.requests r
  where r.id = p_request_id
    and r.anonymous_token = p_token;
end;
$function$;

revoke all on function public.get_anonymous_request(uuid, uuid) from public;
grant execute on function public.get_anonymous_request(uuid, uuid) to anon, authenticated;
