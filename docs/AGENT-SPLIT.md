# Agent Split — How the Three Tracks Fit Together

Three Claude Code agents own the post-Phase-0 buildout of AvukatIstanbul.
Each track is **mutually exclusive** in file ownership and **collectively
exhaustive** of the remaining roadmap. Each agent has a dedicated task file
(`AGENT1.md`, `AGENT2.md`, `AGENT3.md`) detailing scope, deliverables, and
boundaries.

## Tracks at a glance

| Agent | Track | Owns | Lifelines |
|-------|-------|------|-----------|
| **AGENT 1** | Content & SEO | All long-form copy, blog, sitemap, robots, structured data polish | Pure parallel — no schema, no auth |
| **AGENT 2** | Customer-facing app | Request flow, lawyer directory, lawyer profile pages, customer analytics | Reads existing schema, adds public RPCs/views |
| **AGENT 3** | Lawyer + admin + payments + deploy | Lawyer signup, panel, admin queue, iyzico, lead notifications, Cloudflare connect | Auth, payments, edge functions |

## Why this split is MECE

- **No file is owned by two agents.** Where overlap was unavoidable
  (`src/App.tsx` for routes, `src/lib/analytics.ts`), the doc names a clear
  primary owner and an extension contract for the secondary.
- **Schema work is partitioned by table.** Agent 2 touches `requests`,
  `quotes` (customer-side reads/writes) and the `public_lawyer_profiles`
  view. Agent 3 touches `lawyer_profiles`, `lawyer_applications`,
  `user_roles`, plus new credit/payment tables. Both append migrations under
  `supabase/migrations/`; ordering is by timestamp so they never collide.
- **Edge functions are partitioned.** Agent 1 writes `sitemap`. Agent 3
  writes `notify-lawyers`, `iyzico-checkout`, `iyzico-webhook`. Agent 2
  writes none.
- **Phase 5 (analytics) and Phase 6 (deploy/polish) are interleaved** rather
  than assigned to a separate agent. Each track adds its own analytics
  events as it builds. Agent 3 owns Cloudflare Pages connect because deploy
  failure is most likely to come from auth/edge-function side and they have
  the deepest backend context.

## Order of operations (recommended)

Agents can run **in parallel** but two soft dependencies make life easier:

1. **AGENT 2 ships `src/lib/analytics.ts` first** so AGENT 3 can extend it.
   If AGENT 3 spins up earlier, AGENT 3 stubs the file with the public
   shape and AGENT 2 extends — coordinate via PR review.
2. **AGENT 3 ships `src/hooks/useAuth.ts` first** so AGENT 2's "my requests"
   surface can identify a logged-in customer. If AGENT 2 spins up earlier,
   AGENT 2 stubs (returns `{ user: null, loading: false }`) and AGENT 3
   replaces.

These are the only two coordination seams. Everything else is independent.

## Branch strategy

Each agent works on its own long-lived branch and merges to `main` per
deliverable, NOT in one giant PR:

- `agent1/content` (or feature-scoped sub-branches like `agent1/blog-route`)
- `agent2/customer-flow` (or `agent2/talep-olustur`, `agent2/directory`)
- `agent3/lawyer-panel` (or `agent3/payments`, `agent3/admin`)

Merge frequency: weekly minimum, ideally per coherent slice.

## Cross-agent contracts (write these down once, never break them)

- **Customer request shape (Agent 2 → Agent 3):** Agent 2 inserts into
  `requests` with `practice_area` (slug from `legalCategories`),
  `district` (slug from `istanbulDistricts`), `customer_phone` (digits-only,
  11 chars starting with `05`), `customer_email` (may be `''`), `gclid` /
  `gbraid` / `wbraid` (optional, validated). Agent 3's `notify-lawyers`
  edge function reads these fields.
- **Lawyer profile slug (Agent 3 → Agent 2):** Agent 3's lawyer-application
  approval flow generates a unique URL slug (Turkish-aware ASCII transform
  of the lawyer's name + numeric suffix on collision). Agent 2 uses this
  slug at `/avukat/:slug`.
- **Practice area taxonomy (single source of truth):** Both agents read
  from `src/data/legalCategories.ts`. Slugs in the database (request
  `practice_area` column, lawyer `practice_areas[]` column) MUST match
  values in this file. Don't hand-roll new slugs anywhere.

## When in doubt

- If two agents both want to add to a file, the named owner accepts a
  proposal; secondary opens a small PR.
- If a question isn't answered here or in `AGENT*.md` or `CLAUDE.md`, ask
  the human user — don't guess.
