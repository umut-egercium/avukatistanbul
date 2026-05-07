# AGENT 3 — Lawyer + admin + deploy

You own the supply side of the marketplace and the production-deploy
workflow: lawyer signup, the lawyer panel, the admin queue, the lead
notification pipeline that delivers customer requests to verified lawyers,
and the production deploy.

The marketplace is **free for both sides** — no credit-purchase or payment
flow. Lawyers receive matching leads as long as they are verified and
active. (A future monetization strategy can be added later if the user
wants one; not in scope here.)

## Read first

1. `CLAUDE.md` — project context, conventions, design language
2. `docs/AGENT-SPLIT.md` — how your work fits with Agent 1 and Agent 2
3. `~/Documents/musavirbul-36f6bc47/CLAUDE.md` — proven patterns for
   accountant signup, panel layout, and lead notification edge functions.
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

- `PanelDashboard.tsx` — stats (last 7d lead count, average response
  time), CTA to /panel/talepler, verification-status banner
- `PanelProfile.tsx` — edit `lawyer_profiles` (bio, practice areas,
  district, show_email, show_phone, avatar upload to
  `lawyer-avatars` bucket)
- `PanelLeads.tsx` (`/panel/talepler`) — list `request_notification_logs`
  for this lawyer, joined with PII fields from `requests`
- `PanelQuotes.tsx` (`/panel/teklifler`) — view sent quotes, send new
  quotes to leads
- `PanelVerification.tsx` (`/panel/dogrulama`) — upload baro
  certificate, status (pending/verified/rejected + admin notes)

Two storage buckets are needed:
- `lawyer-avatars` (`public: true`) for profile photos shown in directory
- `lawyer-documents` (`public: false`) for baro certificates, signed-URL
  preview by admin

## Track 3D — Admin (`/admin/*`)

`src/pages/admin/AdminLayout.tsx` — auth gate (role = `admin`).

Pages:

- `AdminDashboard.tsx` — counts: pending applications, verified lawyers,
  active lawyers, recent requests (last 24h, 7d, total, open)
- `AdminApplications.tsx` (`/admin/basvurular`) — pending lawyer
  applications. Approve → sets `application_status = 'approved'` and
  the linked `lawyer_profiles.verification_status = 'verified'`. Reject
  with notes → sets to `rejected`.
- `AdminLawyers.tsx` (`/admin/avukatlar`) — view all lawyer profiles,
  toggle `is_active`, link to public profile.

Bootstrap: write a SQL helper `public.promote_to_admin(p_email text)`
that the human user can call once via `supabase db query --linked` to
bootstrap the first admin.

## Track 3E — Lead notification system

Edge function `supabase/functions/notify-lawyers/index.ts`. Trigger:
Postgres `AFTER INSERT ON public.requests` calls `pg_net.http_post` to
the function URL with a shared secret stored in `app_settings`. The
function:

1. Verifies the shared secret in the `X-Notify-Secret` header
2. Idempotency short-circuit: if `request_notification_logs` already has
   rows for this `request_id`, returns 200 with `status=already_processed`
3. Loads the request via service role
4. Calls `pick_lawyers_for_request(request_id)` RPC which returns up to
   3 candidates: same district first, then any district, ordered by
   `lawyer_profiles.created_at` ascending (deterministic, fair)
5. For each candidate calls `record_lead_notification(request_id, lawyer_id)`
   RPC which idempotently inserts into `request_notification_logs` and
   returns `(notified boolean, log_id uuid)`
6. On `notified=true`, sends an HTML+text email via Resend (with
   console-log fallback when `RESEND_API_KEY` is missing)

Email template includes the lead's contact info, case description,
urgency, and a CTA back to `/panel/talepler`. KVKK-compliant footer.

To enable real email sending, the operator must:
1. Verify `avukatistanbul.net` in Resend (DNS records)
2. `supabase secrets set RESEND_API_KEY=re_... --project-ref kcukkqnkhvhphfdebcuh`
3. Optional: `supabase secrets set "RESEND_FROM=AvukatIstanbul <noreply@avukatistanbul.net>"`

Until then the function logs `skipped_no_api_key` and records the
notification log row anyway (so PanelLeads stays in sync).

## Track 3F — Lawyer-side analytics

Extend `src/lib/analytics.ts` (Agent 2 owns the file, you append).
Don't redefine the public API — append:

```ts
export function trackLawyerPanelEvent(
  event:
    | "lawyer_dashboard_viewed"
    | "lawyer_lead_viewed"
    | "lawyer_quote_sent"
    | "lawyer_verification_submitted",
  params?: Record<string, unknown>,
): void;
```

Call sites: `PanelDashboard` mount, `PanelLeads` row expand,
`PanelQuotes` quote send, `PanelVerification` submit.

## Track 3G — Cloudflare Workers deploy + custom domain

**Shipped 2026-05-07.** What landed:

1. `wrangler.jsonc` — Worker config (name `avukatistanbul`, `main:
   worker/index.ts`, static-assets binding for `./dist` with SPA
   fallback).
2. `worker/index.ts` — proxies `/sitemap.xml` to the Supabase sitemap
   edge function; everything else → assets binding.
3. `src/integrations/supabase/client.ts` — public Supabase URL + anon
   key hardcoded as fallback so the bundle works regardless of build-env
   (Cloudflare's remote builds don't see gitignored `.env`).
4. Deploy via `npx wrangler@latest login && npx wrangler@latest deploy`.
   Default URL `avukatistanbul.umut-091.workers.dev`.
5. Custom domain `avukatistanbul.net` (and `www.avukatistanbul.net`)
   bound through Workers Custom Domain UI; DNS on Cloudflare; SSL
   auto-provisioned via Let's Encrypt.

Note: this is **Cloudflare Workers**, not Cloudflare Pages. The earlier
draft of this track assumed Pages; the production deploy ended up using
Workers because of the `/sitemap.xml` proxy requirement (Pages
`_redirects` doesn't allow proxying to external origins). `public/_redirects`
exists in the repo but is ignored by the Worker.

Lighthouse polish — not yet done. See `TODO.md`.

`docs/RUNBOOK.md` is the canonical operations doc; covers migrations,
edge functions, deploys, custom domain ops, admin bootstrap, Resend
wiring, common breakage.

## File ownership

**You own** (create / extensively edit):
- `src/pages/AvukatKayit.tsx`, `Giris.tsx`, `SifreSifirla.tsx`
- `src/pages/panel/*.tsx` (all)
- `src/pages/admin/*.tsx` (all)
- `src/components/panel/*.tsx`, `src/components/admin/*.tsx`
- `src/components/auth/*.tsx`
- `src/hooks/useAuth.ts`
- `src/lib/avatar.ts`
- `supabase/functions/notify-lawyers/`
- All `supabase/migrations/<ts>_*` related to lawyer/admin
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
  edit profile, upload baro doc on `/panel/dogrulama`.
- When a customer creates a request (Agent 2's flow), up to 3 verified
  lawyers in the matching practice area + city receive an email and
  a row appears in `request_notification_logs`.
- `npm run build` clean. All migrations apply via `supabase db push --linked`.
- Cloudflare Worker live; `avukatistanbul.net` custom domain serves
  with SSL.

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

- Payments, credit purchases, iyzico — **scrapped** by user decision.
  The marketplace is free; do not re-add a credit/payment system unless
  the user explicitly asks.
- Customer request flow itself, directory, lawyer profile *display* —
  Agent 2 (you provide the data, they render it).
- Long-form articles, blog posts, sitemap — Agent 1.
- Practice-area taxonomy — that lives in `src/data/legalCategories.ts`,
  do not redefine.
- New base UI primitives (Combobox, Input, etc.) — Agent 2 owns
  `src/components/ui/*`. If you need a new primitive, propose it in PR
  and let Agent 2 ship it (or land a stub and let them refine).
