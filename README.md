# AvukatIstanbul

Two-sided marketplace at **avukatistanbul.net** (in development) — connects
people searching for an İstanbul lawyer with verified İstanbul Barosu
attorneys. Customers post their legal need; lawyers buy lead access in their
practice area.

## Quick start

```bash
git clone https://github.com/umut-egercium/avukatistanbul.git
cd avukatistanbul
npm install

# Provide your Supabase project's public keys
cp .env.example .env
# then edit .env with your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

npm run dev    # vite at http://localhost:5173
npm run build  # tsc -b + vite build (production build)
```

## Stack

- **Frontend:** Vite + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS v3 + shadcn-style primitives, Fraunces (serif) +
  Inter (sans)
- **Routing:** React Router v7
- **State:** TanStack Query v5
- **Backend:** Supabase (Postgres + Auth + Storage + Edge Functions)
- **SEO:** react-helmet-async + per-route `<MetaTags>` + JSON-LD factories

## Project structure

```
src/
  pages/                  one component per route
  components/
    layout/               Header, Footer
    seo/                  MetaTags, JsonLd
    ui/                   shadcn primitives (Button, …)
  data/
    legalCategories.ts    12 hukuk dalı registry (single source of truth)
    istanbulDistricts.ts  39 İstanbul districts
  content/
    categories/           Long-form rich content per practice area
  integrations/supabase/
    client.ts             typed Supabase client
  lib/
    utils.ts              cn() helper
supabase/
  migrations/             append-only SQL migrations
  config.toml
```

## Deployment

The repo is wired for **Cloudflare Pages** auto-deploy from `main`. Build
command: `npm run build`. Output directory: `dist`.

## Database / Supabase

The Supabase CLI is linked to the project at
`supabase/.temp/project-ref` (gitignored). New migrations are added under
`supabase/migrations/` and applied via:

```bash
SUPABASE_DB_PASSWORD="$(cat ~/.config/avukatistanbul/db-password)" \
  supabase db push --linked
```

Do **not** edit production data without a migration; this project is
migration-managed end to end.

## Status

This repo is currently at **Phase 0** — the brand, design system, public
pages and database schema are in place. The customer request flow, lawyer
panel, payments and per-area blog content roll out in subsequent phases.
See `CLAUDE.md` for the canonical session-onboarding doc.

## License

Proprietary. © 2026 AvukatIstanbul.
