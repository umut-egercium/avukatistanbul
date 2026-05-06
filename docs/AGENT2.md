# AGENT 2 — Customer-facing app

You own everything a person searching for a lawyer touches: the request
flow, the directory, the public lawyer profile, and the analytics that
measure conversion through them.

## Read first

1. `CLAUDE.md` — project context, conventions, design language
2. `docs/AGENT-SPLIT.md` — how your work fits with Agent 1 and Agent 3
3. `~/Documents/musavirbul-36f6bc47/src/pages/CreateRequest.tsx` and the
   `create_request` RPC migration — the proven pattern. Adapt, don't copy.
   The same project's `regex {8,512}` bug taught us: keep validators
   simple, never use bounded repetition over 255 in Postgres regex.

## Track 2A — Customer request flow (`/talep-olustur`)

Replace the placeholder `src/pages/TalepOlustur.tsx` with a 2-step form,
mirroring Müşavirbul's reduced-friction flow but rebuilt:

**Step 1 — what + where:**
- Practice area picker (Combobox, options from `LEGAL_CATEGORIES`)
- Case type picker (Combobox; options derived from selected practice area's
  `caseTypes` + a free-text "Diğer")
- District picker (Combobox, options from `ISTANBUL_DISTRICTS`)
- Urgency chips (`urgent` / `soon` / `flexible`) with Turkish labels
- "Devam et" CTA → step 2

**Step 2 — who:**
- Full name (validate ≥ 2 chars after trim)
- Phone (Turkish mobile mask `0### ### ## ##`, validate 11 digits starting
  `05`)
- Email (optional but encouraged; native HTML5 + zod-style check)
- Description textarea (optional, 0-1500 chars)
- KVKK consent checkbox (required, links to `/kvkk` — placeholder route ok)
- Submit → calls `create_request` RPC → `/talep-basarili?id=<uuid>&token=<token>`

### `create_request` RPC

Write a new migration `supabase/migrations/<ts>_create_request.sql`. The
RPC must:

- Be `SECURITY DEFINER`, callable by `anon` and `authenticated`
- Take all the form fields + optional `gclid`, `gbraid`, `wbraid`
- **Server-side validate** name length, phone digit-count, practice_area
  is non-empty
- **Sanitize click ids** with this exact pattern (lesson from Müşavirbul —
  do not use `{m,n}` bounded repetition):
  ```sql
  v_re text := '^[A-Za-z0-9_-]+$';
  begin
    if p_gclid is not null and length(p_gclid) between 8 and 512
       and p_gclid ~ v_re then v_gclid := p_gclid; end if;
    -- etc.
  exception when others then
    v_gclid := null; v_gbraid := null; v_wbraid := null;
  end;
  ```
- Insert into `requests` with `is_anonymous = (auth.uid() is null)`
- Return `(id uuid, anonymous_token uuid, is_anonymous boolean)`
- `revoke all` from `public`, `grant execute` to `anon, authenticated`

### Success page (`/talep-basarili`)

Read `id` and `token` from query string, call a `get_anonymous_request(id, token)`
RPC (also new — same migration) that returns a PII-safe view of the
request the customer just created. Show:

- Confirmation headline
- Summary card of what they submitted (practice area, district, etc.)
- "What happens next" 3-step explainer
- Link to "Bu talebimi takip et" (stores token in `localStorage`)

Persist the token in `localStorage["anonymous_request_tokens"]` (array of
`{ request_id, token, created_at }`) so a future "/taleplerim" page can
list them. Building `/taleplerim` is in scope as a stub for this agent —
real implementation can follow.

## Track 2B — Lawyer directory (`/avukat-bul`, `/avukat-bul/:district`)

Replace the placeholder. Display verified, active lawyers with:

- Optional district filter (URL-driven via `:district` param)
- Practice-area chip filter (URL-driven via `?area=<slug>`)
- Free-text name search (URL-driven via `?q=...`, debounced)
- Pagination (12 per page, URL-driven via `?page=2`)

### Public view

Add a new migration creating `public.public_lawyer_profiles`:

```sql
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

grant select on public.public_lawyer_profiles to anon, authenticated;
```

Note `security_invoker = off` is intentional — the view runs definer-style
to expose a PII-stripped surface to anon while base-table RLS stays
deny-all.

### LawyerCard component

Create `src/components/lawyer/LawyerCard.tsx`. Avatar (fallback to
initials), name, baro registration line, top 3 practice-area tags,
rating + reviews-count, "Profili görüntüle" CTA. Used by directory + by
"related lawyers" rails on the Hizmet detail and Profile pages.

## Track 2C — Lawyer profile (`/avukat/:slug`)

New page `src/pages/AvukatProfil.tsx`. Read from
`public_lawyer_profiles where slug = :slug`. Show:

- Hero: avatar, name, "İstanbul Barosu • Sicil <bar_number>", rating bar,
  practice-area tags
- About / Bio (long-form, prose-legal styling)
- Reviews list (read from `reviews` table, public)
- Practice areas as deep-link chips back to `/hizmetler/<slug>`
- Right-rail "Bu avukatla görüş" CTA → `/talep-olustur?practiceArea=<one of theirs>&district=<theirs>`

JSON-LD: combined `Person` + `LegalService` (`provider: Organization
AvukatIstanbul`, `areaServed: City İstanbul`).

Add `/avukat/:slug` route to `src/App.tsx`.

## Track 2D — Customer analytics

Create `src/lib/analytics.ts` with a clear, documented public API. **You
are the primary owner**; Agent 3 will extend (not redefine) it.

```ts
// MUST export:
export function trackEvent(event: string, params?: Record<string, unknown>): void;
export function trackCustomerRequestStep(
  step: 1 | 2,
  phase: "view" | "complete",
  params?: Record<string, unknown>,
): void;
export function getAttributionParams(): {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
};
export function newEventId(): string;
```

Implement:

- `trackEvent` — wraps `window.gtag('event', name, params)` with safe
  fallback when gtag isn't loaded
- `trackCustomerRequestStep` — fires `customer_request_flow_step_one_view`
  / `_complete` etc. with `event_id` for dedup
- `getAttributionParams` — read gclid/gbraid/wbraid from URL → cookie →
  localStorage. 90-day persistence. Mirror the pattern in Müşavirbul's
  `src/lib/ga-mp.ts`.
- `newEventId` — `crypto.randomUUID()`

Wire GA4 + Microsoft Clarity into `index.html` once the user provides IDs
(if not yet provided, leave a `// TODO(GA4_ID)` comment). Server-side
relay (`ga-mp-track` edge function) is **out of scope** for this agent —
defer to Agent 3 if needed.

A/B testing helper at `src/lib/experiment.ts`:

```ts
export function useExperiment<V extends string>(
  name: string,
  variants: readonly V[],
): V;
```

Hash `(experiment_id, visitor_id)` (visitor_id stored in
localStorage UUID) with FNV-1a, modulo into `variants.length`. Fire
`experiment_variant` GA4 event once per session per experiment.

## Track 2E — UI primitives

You'll need shadcn-style primitives the project doesn't have yet. Build
them in `src/components/ui/`:

- `combobox.tsx` (you'll need this for both step-1 form and directory
  filters) — wraps Radix Popover + cmdk Command
- `command.tsx` — cmdk wrapper (input, list, item, empty)
- `popover.tsx` — Radix Popover wrapper
- `input.tsx` — styled `<input>`
- `label.tsx` — Radix Label wrapper
- `form.tsx` — minimal form context (react-hook-form is fine; or your own;
  pick one and stay consistent)
- `toast.tsx` (or use `sonner` from existing deps)

Pattern: copy shadcn/ui defaults but **respect the design tokens** in
`src/index.css`. No `text-zinc-*` or `bg-slate-*` literals — only
semantic tokens (`bg-card`, `text-foreground`, etc.).

## File ownership

**You own** (create / extensively edit):
- `src/pages/TalepOlustur.tsx`, `RequestSuccess.tsx` (new), `AvukatBul.tsx`,
  `AvukatProfil.tsx` (new), `Taleplerim.tsx` (stub ok)
- `src/components/customer/*.tsx`
- `src/components/lawyer/LawyerCard.tsx` (used by you primarily; Agent 3
  may import for admin views — design as if it'll be reused)
- `src/components/ui/*.tsx` (most primitives)
- `src/lib/analytics.ts`, `src/lib/experiment.ts`, `src/lib/phone.ts`,
  `src/lib/seo/urls.ts`
- `supabase/migrations/<ts>_create_request.sql` and any new public-view
  migrations

**You append to**:
- `src/App.tsx` — add `/talep-basarili`, `/avukat/:slug`, `/taleplerim`
  routes
- `src/integrations/supabase/types.ts` — extend with row types as you add
  RPCs (or keep manual until we wire `supabase gen types`)

**Don't touch** (Agent 1 / 3 territory):
- `src/content/**` (Agent 1)
- `src/pages/AvukatKayit.tsx`, `Giris.tsx`, `panel/*`, `admin/*` (Agent 3)
- `src/hooks/useAuth.ts` (Agent 3 owns)
- `supabase/functions/*` other than your migrations (Agent 1 / 3)

## Acceptance criteria

- `/talep-olustur` collects all required fields with proper validation,
  calls `create_request`, lands customer on `/talep-basarili?id=&token=`.
- `/talep-basarili` displays the customer's request via
  `get_anonymous_request(id, token)` with no PII leak to other users.
- `/avukat-bul` lists verified lawyers (works once Agent 3 has approved at
  least one application; until then displays graceful empty state).
- `/avukat-bul/:district` filters to that district.
- `?area=<slug>` chip filter works; `?q=` search works; pagination works.
- `/avukat/:slug` renders a public lawyer profile with combined Person +
  LegalService JSON-LD.
- `npm run build` clean.
- GA4 events fire (`customer_request_flow_step_one_view`,
  `_complete`, `_step_two_view`, `_complete`) with `event_id` for dedup.

## Coordination points

- **`src/lib/analytics.ts`** — you create the file. Agent 3 will add
  `trackLawyerPanelEvent` and `trackAccountantVerificationSubmitted`
  later. Don't break the public API once published.
- **`src/components/lawyer/LawyerCard.tsx`** — you own; Agent 3 may
  import for admin queue views. Keep the props minimal and stable.
- **`src/hooks/useAuth.ts`** — Agent 3 owns. If you need auth state
  before they ship it, import from `useAuth` and let it return
  `{ user: null, loading: false }` until Agent 3 lands the real
  implementation.
- **`src/App.tsx` routes** — add yours in a clearly-marked block, e.g.
  `{/* Customer routes */}`. Agent 3 has their own `{/* Lawyer panel */}`
  block. Keep them separate.

## Out of scope (explicitly)

- Lawyer signup or any `/avukat-kayit` work — Agent 3.
- Lawyer panel `/panel/*` — Agent 3.
- Admin `/admin/*` — Agent 3.
- Payments, credits, lead notification edge function — Agent 3.
- Long-form content (articles, blog) — Agent 1.
- Cloudflare Pages connect — Agent 3.
- Server-side analytics relay (`ga-mp-track` edge function) — Agent 3 if
  they have time, otherwise Phase 7.
