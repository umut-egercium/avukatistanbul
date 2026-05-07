# AvukatIstanbul — Claude Context

**One-line:** Two-sided marketplace at `avukatistanbul.net` connecting people searching for İstanbul lawyers with verified İstanbul Barosu attorneys. Customers post requests; verified lawyers receive matching leads by email and submit quotes through their panel. The marketplace is free for both sides — no credit-purchase or payment flow.

**Domain:** `avukatistanbul.net` (live as of 2026-05-07, on Cloudflare DNS, custom domain bound to the Worker; default Worker URL also live at `avukatistanbul.umut-091.workers.dev`)
**Hosting:** Cloudflare **Worker** (not Pages — see `wrangler.jsonc`). Deploys via `npx wrangler deploy`. The Worker (`worker/index.ts`) proxies `/sitemap.xml` to the Supabase edge function and delegates everything else to the static-assets binding with SPA fallback (`not_found_handling: "single-page-application"`).
**Repo:** `~/Documents/avukatistanbul`
**Built fresh in 2026-05-06 session;** intentionally NOT a fork or copy of `musavirbul-36f6bc47`. Patterns where similar are deliberate (data model, analytics design, migration policy); design language is fully different.

---

## Tech stack

- **Frontend:** Vite + React 19 + TypeScript (`strict: true`, unlike Müşavirbul which is loose)
- **Styling:** Tailwind CSS v3, shadcn-style primitives. Fraunces (serif) + Inter (sans), both via Google Fonts
- **State:** TanStack Query v5 (`@tanstack/react-query`)
- **Routing:** React Router v7 (note: v7 syntax, not v6)
- **Backend:** Supabase project `kcukkqnkhvhphfdebcuh` (West EU / Ireland)
- **Build:** `tsc -b && vite build` — strict typecheck IS part of the build (different from Müşavirbul). Errors must be fixed, not ignored.

## Brand & design system

- **Wordmark:** "Avukat**Istanbul**" — "Istanbul" in accent gold, set in Fraunces
- **Search-target phrase:** "İstanbul Avukat" — used naturally in H1s and meta titles
- **Palette (HSL CSS vars in `src/index.css`):**
  - `--primary` deep navy `218 55% 16%` — main brand
  - `--background` warm cream `38 25% 97%` — page surface
  - `--accent` warm ochre `36 50% 48%` — sparingly, for highlights
  - `--cta` deep navy (same as primary) — high contrast on cream cards
- **Typography:** Fraunces variable serif for h1-h6 with `letter-spacing: -0.015em`, Inter for body
- **Density:** roomier than Müşavirbul. WCAG AA contrast minimum.
- **Custom utility classes:** `.container-main`, `.hero-gradient`, `.text-balance`, `.text-pretty`, `.link-underline`, `.prose-legal`

## Key conventions

- **Path alias:** `@/*` → `src/*`
- **Turkish copy** throughout the user-facing UI; comments and identifiers in English
- **Slugs** are ASCII (e.g., `bosanma-hukuku`, not `boşanma-hukuku`); display names are Turkish
- **All routes** wrap their page in `<MetaTags>` from `@/components/seo/MetaTags` — title is auto-suffixed with " — AvukatIstanbul" unless `noSuffix`
- **Structured data** via factories in `@/components/seo/JsonLd`: `organizationLd`, `websiteLd`, `legalServiceLd`, `breadcrumbLd`, `faqLd`
- **Icons:** lucide-react. Use `strokeWidth={1.75}` on hero/section icons for the airy serif-friendly feel
- **Buttons:** always via `@/components/ui/button` `<Button>` with cva `variant` (`primary` / `cta` / `accent` / `outline` / `ghost` / `link`) and `size` (`sm` / `md` / `lg` / `xl` / `icon`)
- **Long-form content** (per-category articles, blog posts) lives in `src/content/`, separate from layout

## Database / Supabase

### Project

- **Ref:** `kcukkqnkhvhphfdebcuh` (URL: `https://kcukkqnkhvhphfdebcuh.supabase.co`)
- **CLI link state:** `supabase/.temp/project-ref` (gitignored)
- **DB password:** `~/.config/avukatistanbul/db-password` (mode 600, outside repo)
- **Public anon key + URL** are also hardcoded as a fallback in `src/integrations/supabase/client.ts` so the bundle works regardless of build-env (Cloudflare's remote builds don't see gitignored `.env`). Env vars `??` override the fallback when present.

### Tables (Phase 0)

- `profiles` — auth user mirror (full_name, email, phone)
- `user_roles` — role mapping (`customer` | `lawyer` | `admin`)
- `lawyer_profiles` — public lawyer data, slug-addressable; gated by `verification_status` (`pending` / `verified` / `rejected`) and `is_active`
- `lawyer_applications` — onboarding apps; `certificate_url` is nullable to allow deferred-document signup (same pattern as Müşavirbul Part 2)
- `requests` — customer service requests; `practice_area` references a slug from `legalCategories`. Carries gclid/gbraid/wbraid for ad attribution
- `quotes` — lawyer responses to a request (one per request+lawyer pair)
- `reviews` — customer reviews of a lawyer (1-5 star)
- `request_notification_logs` — which lawyers were notified of which request (and when viewed); idempotent via unique(request_id, lawyer_id)
- `app_settings` — key-value JSON config

### RLS policy state

**RLS is enabled on every public table** with **no policies** — a deliberate Phase 0 baseline that denies all anon/authenticated reads/writes. The service role bypasses RLS so migrations and edge functions still work. Per-flow policies will be added as Phase 2+ ships the actual customer/lawyer surfaces.

### Migration policy

- Unlike Müşavirbul, this is a **clean Supabase project** — `supabase db push --linked` is the canonical way to apply migrations, and migration history is recorded normally.
- New migrations live in `supabase/migrations/YYYYMMDDHHMMSS_<descriptive>.sql`.
- DB password lives at `~/.config/avukatistanbul/db-password` — pass via `SUPABASE_DB_PASSWORD="$(cat ~/.config/avukatistanbul/db-password)" supabase db push --linked`.

## High-level codebase layout

```
src/
  App.tsx                        — top-level router
  main.tsx                       — providers (Helmet, QueryClient, BrowserRouter)
  pages/
    Home.tsx                     — full hero + practice areas + how it works + districts + final CTA
    Hizmetler.tsx                — index of all 12 hukuk dalları
    HizmetDetay.tsx              — /hizmetler/:slug, content-rich landing per category
    AvukatBul.tsx                — /avukat-bul/:district? directory (placeholder)
    TalepOlustur.tsx             — customer request flow (placeholder)
    AvukatKayit.tsx              — lawyer onboarding (placeholder)
    NotFound.tsx                 — 404
  components/
    layout/Header.tsx, Footer.tsx
    seo/MetaTags.tsx, JsonLd.tsx
    ui/button.tsx                — cva-based Button (full shadcn primitive lib comes later)
  data/
    legalCategories.ts           — 12 hukuk dalları, single source of truth
    istanbulDistricts.ts         — 39 İstanbul districts with population + side
  content/
    categories/
      bosanma-hukuku.tsx         — full article content (TMK refs, FAQs); template for the other 11
  integrations/supabase/
    client.ts                    — typed client
  lib/
    utils.ts                     — cn()
supabase/
  migrations/                    — append-only SQL
  config.toml
```

## Phase status

| Phase | What | Status |
|-------|------|--------|
| **0** | Repo, design system, home + 1 hizmet page (Boşanma), schema | **Done — 2026-05-06** |
| 1 | 11 remaining hizmet detail pages (1500-2000 words each), 36 blog posts (3 per area), sitemap, robots.txt | **Local only** — Agent 1's branch has the work but was never pushed to origin (3 commits on local `agent1/content`); not yet merged into main |
| 2 | Customer request flow `/talep-olustur` + lawyer directory `/avukat-bul/...` + lawyer profile `/avukat/:slug` | **Done — 2026-05-06** (Agent 2 merged at `3485820`) |
| 3 | Lawyer signup `/avukat-kayit` + lawyer panel `/panel/...` + admin verification `/admin/...` | **Done — 2026-05-06** (Agent 3 merged at `2e5e0c8`) |
| 4 | Lead notifications via Resend (`notify-lawyers` edge function + pg_net trigger) | **Pipeline shipped, email send not wired** — function falls back to console-log until `RESEND_API_KEY` secret is set + `avukatistanbul.net` is verified in Resend |
| 5 | GA4 + Microsoft Clarity wired in `index.html` (`G-2EBVBZ8P5R` + `wmyqn4zu64`); dual-send Measurement Protocol + Ads conversion + A/B helper | **GA4/Clarity done; MP relay + A/B helper pending** |
| 6 | Cloudflare Worker deploy + `avukatistanbul.net` custom domain + SSL | **Done — 2026-05-07** |
| 7 | Lawyer-side analytics events (`trackLawyerPanelEvent` extension on `src/lib/analytics.ts`) + Lighthouse polish | Not started |

The credit-purchase / iyzico / payment system from the original 8-part roadmap was scrapped 2026-05-06. Marketplace is free for both sides.

## Things that will surprise next-session-Claude

1. **`strict: true` actually enforces.** Build is `tsc -b && vite build` — strict typecheck failures fail the build, unlike Müşavirbul. Don't ignore TS errors.
2. **TypeScript 6 deprecates `baseUrl`.** Path aliases use `paths` only; do not re-add `baseUrl` to any tsconfig.
3. **No shadcn CLI.** UI primitives are hand-written in `src/components/ui/`. Adding more should follow the cva pattern in `button.tsx`.
4. **Long-form per-category content lives in `src/content/categories/<slug>.tsx`.** The `HizmetDetay` page reads from a `Record<slug, CategoryArticle>` registry; missing slugs fall back to a "coming soon" panel. Add new content by exporting a `CategoryArticle` and wiring it into the `ARTICLES` registry.
5. **RLS is on but empty.** Don't be alarmed when the React app can't read from `lawyer_profiles` — that's by design. Add policies as the Phase 2 customer/lawyer flows go in.
6. **The "Avukat" word in headlines breaks line poorly without `text-balance`.** Most h1s use `text-balance` for that reason. Keep it.
7. **No `git add .`** — there's no nested-clone hazard like Müşavirbul, but `.env` is the only untracked secret carrier and is in `.gitignore`. Stage explicit files anyway, by habit.

## How to start a new session productively

1. Read this file, `docs/RUNBOOK.md`, and `git log --oneline -10`.
2. Check `TODO.md` at repo root for the open backlog (Agent 1 merge, Resend wiring, admin bootstrap, etc.).
3. If the user mentions "Phase N", refer to the table above.
4. For migrations: see `docs/RUNBOOK.md` § Database migrations.
5. For deploy + custom domain ops: see `docs/RUNBOOK.md` § Cloudflare Workers deploy.
6. Long-form content: copy `src/content/categories/bosanma-hukuku.tsx` as the template; legal accuracy matters (cite TMK / İYUK / TCK articles where appropriate).
7. Before pushing to `main`, `npm run build` must succeed locally.

## Multi-agent workstream

Phases 1-6 are split MECE-ly into three parallel tracks. If you've been spawned to pick up a track, read the corresponding file:

- `docs/AGENT-SPLIT.md` — overview of how the three tracks fit together (read first)
- `docs/AGENT1.md` — Content & SEO (11 hizmet articles + 36 blog posts + sitemap + robots)
- `docs/AGENT2.md` — Customer-facing app (request flow + directory + lawyer profile + customer analytics)
- `docs/AGENT3.md` — Lawyer + admin + deploy (signup + panel + admin + lead notifications + Cloudflare). The credit-purchase / iyzico flow was scrapped by user decision — the marketplace is free for both sides.

Each agent file lists owned files, coordination seams with the other tracks, and acceptance criteria. Stay inside your file ownership; cross-cutting changes go through `AGENT-SPLIT.md` contracts.

---

**Last meaningful update:** 2026-05-07 — Worker deployed, `avukatistanbul.net` custom domain live, docs synced. See `TODO.md` for what's left.
