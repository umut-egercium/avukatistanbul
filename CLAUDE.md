# AvukatIstanbul — Claude Context

**One-line:** Two-sided marketplace at `avukatistanbul.com` connecting people searching for İstanbul lawyers with verified İstanbul Barosu attorneys. Customers post requests; lawyers will pay credits to receive contact info and submit quotes.

**Domain:** `avukatistanbul.com` (not yet pointed at hosting)
**Hosting:** Cloudflare Pages (not yet connected — repo is `umut-egercium/avukatistanbul`)
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
| 1 | 11 remaining hizmet detail pages (1500-2000 words each), 36 blog posts (3 per area) | Not started |
| 2 | Customer request flow `/talep-olustur` + lawyer directory `/avukat-bul/...` | Not started |
| 3 | Lawyer signup `/avukat-kayit` + lawyer panel `/panel/...` + admin verification `/admin/...` | Not started |
| 4 | Credit purchases (iyzico/PayTR), lead notifications (resend/postmark), low-balance UX | Not started |
| 5 | GA4 + dual-send Measurement Protocol + Ads conversion (gclid → enhanced conversions), A/B helper | Not started |
| 6 | Cloudflare Pages connect + custom domain + Lighthouse polish | Not started |

## Things that will surprise next-session-Claude

1. **`strict: true` actually enforces.** Build is `tsc -b && vite build` — strict typecheck failures fail the build, unlike Müşavirbul. Don't ignore TS errors.
2. **TypeScript 6 deprecates `baseUrl`.** Path aliases use `paths` only; do not re-add `baseUrl` to any tsconfig.
3. **No shadcn CLI.** UI primitives are hand-written in `src/components/ui/`. Adding more should follow the cva pattern in `button.tsx`.
4. **Long-form per-category content lives in `src/content/categories/<slug>.tsx`.** The `HizmetDetay` page reads from a `Record<slug, CategoryArticle>` registry; missing slugs fall back to a "coming soon" panel. Add new content by exporting a `CategoryArticle` and wiring it into the `ARTICLES` registry.
5. **RLS is on but empty.** Don't be alarmed when the React app can't read from `lawyer_profiles` — that's by design. Add policies as the Phase 2 customer/lawyer flows go in.
6. **The "Avukat" word in headlines breaks line poorly without `text-balance`.** Most h1s use `text-balance` for that reason. Keep it.
7. **No `git add .`** — there's no nested-clone hazard like Müşavirbul, but `.env` is the only untracked secret carrier and is in `.gitignore`. Stage explicit files anyway, by habit.

## How to start a new session productively

1. Read this file and `git log --oneline -10`.
2. If the user mentions "Phase N", refer to the table above.
3. For migrations: see `README.md` § "Database / Supabase".
4. Long-form content: copy `src/content/categories/bosanma-hukuku.tsx` as the template; legal accuracy matters (cite TMK / İYUK / TCK articles where appropriate).
5. Before pushing to `main`, `npm run build` must succeed locally.

---

**Last meaningful update:** 2026-05-06 — Phase 0 complete.
