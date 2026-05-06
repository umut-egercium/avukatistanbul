# AGENT 3 — Lawyer + admin + payments + deploy

You own the supply side of the marketplace and everything that turns it
into a business: lawyer signup, the lawyer panel, the admin queue, the
credit/payment system that makes lawyers spend money to receive leads,
the notification pipeline that delivers leads, and the production deploy.

## Read first

1. `CLAUDE.md` — project context, conventions, design language
2. `docs/AGENT-SPLIT.md` — how your work fits with Agent 1 and Agent 2
3. `~/Documents/musavirbul-36f6bc47/CLAUDE.md` and `docs/RUNBOOK.md` —
   the proven Müşavirbul patterns for accountant signup, panel layout,
   credit packages, lead notification edge function, and iyzico sketch.
   Adapt to the lawyer vertical; don't copy verbatim.

## Track 3A — Auth (do this first)

Create `src/hooks/useAuth.ts` exposing:

```ts
interface AuthState {
  user: User | null;
  userRole: "customer" | "lawyer" | "admin" | null;
  loading: boolean;
  signIn(email: string, password: string): Promise<{ error: Error | null }>;
  signUp(email: string, password: string, meta: SignUpMeta): Promise<{ error: Error | null }>;
  signOut(): Promise<void>;
}
export function useAuth(): AuthState;
```

Implementation: subscribe to Supabase `auth.onAuthStateChange`, fetch
`user_roles` row when user is set, expose role + loading flag. Provide an
`<AuthGate role="lawyer" />` wrapper component for `/panel/*` routes
(redirect to `/giris` if not authenticated; redirect to `/` if wrong
role).

Add `/giris` (login) and `/sifre-sifirla` (password reset) pages.

## Track 3B — Lawyer signup (`/avukat-kayit`)

Replace the placeholder. Single-form, low-friction signup:

- Full name, email, phone, password
- Bar association select (default: `İstanbul Barosu`; allow others as
  this is İstanbul-focused but lawyers may be registered elsewhere)
- Bar registration number (`bar_number`) — optional at signup, required
  before verification
- Practice areas (multi-select chips, options from `LEGAL_CATEGORIES`) —
  must pick at least 1
- Primary district (Combobox from `ISTANBUL_DISTRICTS`)
- KVKK consent (required)
- Submit creates `auth.users` row + `lawyer_applications` row + assigns
  `user_roles.role = 'lawyer'`

After successful signup, redirect to `/panel/dogrulama` to upload baro
certificate. Trigger `trg_create_pending_lawyer_profile_on_application`
(write the migration) creates a `lawyer_profiles` row with
`verification_status = 'pending'` and a generated `slug`.

### Slug generation (the contract Agent 2 reads)

In the trigger, generate the slug from full_name via a Turkish-aware
ASCII transform:

- Lowercase
- Map ç→c, ğ→g, ı→i, İ→i, ö→o, ş→s, ü→u
- Replace non-`[a-z0-9]` with `-`
- Collapse repeated `-`
- Trim trailing `-`
- On collision, append `-2`, `-3`, etc.

Reuse the same util via a `public.slugify(text)` SQL function so triggers
and admin tools share one implementation.

## Track 3C — Lawyer panel (`/panel/*`)

`src/pages/panel/PanelLayout.tsx` — auth gate + sidebar + outlet.

Pages under `src/pages/panel/`:

- `PanelDashboard.tsx` — stats (kalan kredi, son 7 gün lead sayısı,
  ortalama yanıt süresi), CTA to /panel/talepler
- `PanelProfile.tsx` — edit `lawyer_profiles` (bio, practice areas,
  district, show_email, show_phone, avatar upload to
  `lawyer-documents` bucket)
- `PanelLeads.tsx` (`/panel/talepler`) — list `request_notification_logs`
  for this lawyer, joined with PII fields from `requests` (only the
  rows they've been billed for)
- `PanelQuotes.tsx` (`/panel/teklifler`) — view sent quotes, send new
  quotes to leads
- `PanelCredits.tsx` (`/panel/krediler`) — buy credits via iyzico, view
  ledger
- `PanelVerification.tsx` (`/panel/dogrulama`) — upload baro
  certificate, status (pending/verified/rejected + admin notes)

A `lawyer-documents` Supabase storage bucket is needed (`public: false`)
— write a migration that creates it.

## Track 3D — Admin (`/admin/*`)

`src/pages/admin/AdminLayout.tsx` — auth gate (role = `admin`).

Pages:

- `AdminDashboard.tsx` — counts: pending applications, pending
  verifications, recent requests (last 24h, 7d)
- `AdminApplications.tsx` (`/admin/basvurular`) — pending lawyer
  applications. Approve → sets `application_status = 'approved'` and
  the linked `lawyer_profiles.verification_status = 'verified'`. Reject
  with notes → sets to `rejected`.
- `AdminLawyers.tsx` (`/admin/avukatlar`) — view all lawyer profiles,
  toggle `is_active`, edit if needed.

Bootstrap: write a SQL helper `public.promote_to_admin(p_email text)`
that the human user can call once via `supabase db query --linked` to
bootstrap the first admin.

## Track 3E — Lead notification system

Edge function `supabase/functions/notify-lawyers/index.ts`. Trigger:
Postgres `AFTER INSERT ON public.requests` calls `pg_net.http_post` to
the function. The function:

1. Reads the request by id
2. Selects up to 3 candidate lawyers:
   ```
   from lawyer_profiles
   where is_active and verification_status = 'verified'
     and (district = request.district OR district is null)
     and request.practice_area = ANY(practice_areas)
   order by credit_balance desc
   limit 3
   ```
3. For each, deducts 1 credit, inserts into `request_notification_logs`
   (idempotent via UNIQUE constraint), sends email via
   Resend/Postmark with the lead's contact info + case description
4. If fewer than 3 lawyers match, sends to whoever does match; logs the
   shortfall

Resend or Postmark — pick one based on what the user has access to. If
neither, document as a follow-up and stub email sending with console
logging.

Email template: HTML + plain text. Include unsubscribe link
(GDPR/KVKK-compliant). Use `track-open` and `track-click` pixels (write
those edge functions too — same pattern as Müşavirbul).

## Track 3F — Credits & iyzico payments

New tables (migration):

```sql
create table public.lawyer_credits (
  lawyer_id uuid primary key references lawyer_profiles(id) on delete cascade,
  balance integer not null default 0 check (balance >= 0),
  updated_at timestamptz not null default now()
);

create table public.credit_transactions (
  id uuid primary key default gen_random_uuid(),
  lawyer_id uuid not null references lawyer_profiles(id) on delete cascade,
  delta integer not null,
  reason text not null,  -- 'purchase' | 'lead_charge' | 'refund' | 'admin_adjustment'
  metadata jsonb,
  created_at timestamptz not null default now()
);

create table public.credit_purchase_requests (
  id uuid primary key default gen_random_uuid(),
  lawyer_id uuid not null references lawyer_profiles(id) on delete cascade,
  package_id text not null,
  credits integer not null,
  amount_try numeric(10,2) not null,
  status text not null default 'pending',  -- 'pending' | 'paid' | 'failed' | 'refunded'
  iyzico_token text,
  iyzico_payment_id text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);
```

Credit package definitions in `app_settings.value` JSON (key:
`credit_packages`). Frontend reads from `app_settings`, never hardcoded.

Edge functions:

- `iyzico-create-checkout/index.ts` — initiates iyzico checkout, returns
  the iyzico checkout form URL. Uses iyzico API (server-to-server) with
  the merchant credentials from environment secrets.
- `iyzico-webhook/index.ts` — receives iyzico's payment callback,
  verifies signature, updates `credit_purchase_requests.status = 'paid'`,
  inserts `credit_transactions` row, updates `lawyer_credits.balance`.

Iyzico merchant credentials need to be set in Supabase function env
vars. Document in `docs/RUNBOOK.md` (create this file) how to add them.

## Track 3G — Lawyer-side analytics

Extend `src/lib/analytics.ts` (Agent 2 owns the file, you add functions).
Don't redefine the public API — append:

```ts
export function trackLawyerPanelEvent(
  event:
    | "lawyer_dashboard_viewed"
    | "lawyer_lead_viewed"
    | "lawyer_credit_purchased"
    | "lawyer_verification_submitted"
    | "lawyer_quote_sent",
  params?: Record<string, unknown>,
): void;
```

Call sites: `PanelDashboard` mount, `PanelLeads` row expand,
`PanelCredits` purchase request insert, `PanelVerification` submit,
`PanelQuotes` quote send.

If Agent 2 hasn't shipped `analytics.ts` yet, ship a stub that they'll
extend. Coordinate via `docs/AGENT-SPLIT.md`'s contract.

## Track 3H — Cloudflare Pages connect & deploy

Once Agent 1 has the sitemap edge function and Agent 2 has the request
flow merged, you wire production deploy:

1. In Cloudflare Pages dashboard, connect `umut-egercium/avukatistanbul`
2. Build command: `npm run build`. Output: `dist`. Node version: 20+
3. Environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`,
   `VITE_SUPABASE_PROJECT_ID` (matches `.env.example`)
4. Add `_redirects` (or `public/_redirects`):
   ```
   /sitemap.xml https://kcukkqnkhvhphfdebcuh.supabase.co/functions/v1/sitemap 200
   /* /index.html 200
   ```
5. Once `avukatistanbul.net` DNS is active, add the custom domain in CF
   Pages and verify
6. Verify Lighthouse score on home + 1 hizmet page + 1 blog post + 1
   lawyer profile. Target ≥ 90 on Performance and SEO. Document any
   regressions.

Write `docs/RUNBOOK.md` covering: applying migrations, deploying edge
functions, rotating Supabase service role, iyzico merchant credential
rotation, common breakage one-liners.

## File ownership

**You own** (create / extensively edit):
- `src/pages/AvukatKayit.tsx`, `Giris.tsx`, `SifreSifirla.tsx`
- `src/pages/panel/*.tsx` (all)
- `src/pages/admin/*.tsx` (all)
- `src/components/panel/*.tsx`, `src/components/admin/*.tsx`
- `src/components/auth/*.tsx`
- `src/hooks/useAuth.ts`
- `supabase/functions/notify-lawyers/`, `iyzico-create-checkout/`,
  `iyzico-webhook/`, `track-open/`, `track-click/`
- All `supabase/migrations/<ts>_*` related to lawyer/admin/payments
- `docs/RUNBOOK.md` (new)

**You append to**:
- `src/App.tsx` — add `/giris`, `/sifre-sifirla`, `/avukat-kayit`
  (rewrite), `/panel/*`, `/admin/*` routes in a clearly-marked block
- `src/lib/analytics.ts` — extend with `trackLawyerPanelEvent` (Agent 2
  owns the file's foundational shape)

**Don't touch** (Agent 1 / 2 territory):
- `src/content/**`, `src/pages/Blog*.tsx` (Agent 1)
- `src/pages/TalepOlustur.tsx`, `RequestSuccess.tsx`, `AvukatBul.tsx`,
  `AvukatProfil.tsx` (Agent 2)
- `src/components/customer/`, `src/components/ui/combobox.tsx` etc.
  (Agent 2 owns most primitives)
- `src/lib/phone.ts`, `src/lib/experiment.ts`, `src/lib/seo/urls.ts`
  (Agent 2)

## Acceptance criteria

- A new lawyer can sign up at `/avukat-kayit`, end up in
  `lawyer_applications` with `application_status = 'pending'`, and a
  matching `lawyer_profiles` row with `verification_status = 'pending'`
  is created via trigger.
- An admin (bootstrapped via `promote_to_admin`) can log in, see the
  pending application at `/admin/basvurular`, approve it, and the
  lawyer's profile flips to `verified` + appears in `/avukat-bul`.
- A verified lawyer can log in, see `/panel`, view their dashboard,
  edit profile, and visit `/panel/krediler`.
- A lawyer can purchase credits via iyzico (works against iyzico's
  sandbox / staging if production credentials aren't ready); webhook
  updates balance.
- When a customer creates a request (Agent 2's flow), 3 verified
  lawyers in the matching practice area + district receive an email and
  have their credits deducted.
- `npm run build` clean. All migrations apply via `supabase db push --linked`.
- Cloudflare Pages live on a preview URL; once domain DNS lands, the
  custom domain serves correctly.

## Coordination points

- **`src/lib/analytics.ts`** — Agent 2 owns the file. You extend with
  lawyer-panel events. Do not refactor or rename their exported functions.
- **`src/components/lawyer/LawyerCard.tsx`** — Agent 2 owns. You may
  import for admin views.
- **Schema migrations** — name with timestamps so ordering is stable.
  Don't `drop`/`alter` tables Agent 2 is reading from without
  coordinating.
- **Lead notification trigger** — wires to `requests` table on insert.
  Agent 2 inserts; you react. Make the function idempotent (the unique
  constraint on `request_notification_logs` already enforces this).

## Out of scope (explicitly)

- Customer request flow itself, directory, lawyer profile *display* —
  Agent 2 (you provide the data, they render it).
- Long-form articles, blog posts, sitemap — Agent 1.
- Practice-area taxonomy — that lives in `src/data/legalCategories.ts`,
  do not redefine.
- New base UI primitives (Combobox, Input, etc.) — Agent 2 owns
  `src/components/ui/*`. If you need a new primitive, propose it in PR
  and let Agent 2 ship it (or land a stub and let them refine).
