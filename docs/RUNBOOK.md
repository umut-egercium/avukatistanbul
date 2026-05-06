# RUNBOOK

Operational procedures for running and maintaining AvukatIstanbul. Read
this before:

- Deploying to production
- Applying a database migration
- Deploying a new edge function
- Rotating a credential
- Diagnosing a production breakage

For project context (what the codebase is and how it's structured), see
`CLAUDE.md`. For roadmap and per-track scope, see `docs/AGENT3.md`,
`AGENT2.md`, `AGENT1.md`.

---

## Local development

### One-time setup

```bash
git clone https://github.com/umut-egercium/avukatistanbul.git
cd avukatistanbul
npm install
cp .env.example .env
# Edit .env with the values from the Supabase dashboard:
#   VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_SUPABASE_PROJECT_ID
```

Supabase CLI authentication is one-time and persists across projects:

```bash
supabase login
supabase link --project-ref kcukkqnkhvhphfdebcuh
# DB password is in ~/.config/avukatistanbul/db-password (mode 600).
```

### Daily commands

| Command | What |
|---|---|
| `npm run dev` | Vite dev server with HMR at `http://localhost:5173` |
| `npm run build` | Production build (`tsc -b && vite build`) — strict typecheck **is** part of the build, errors fail it |
| `npm run lint` | ESLint |
| `npm run preview` | Serve the `dist/` build locally |

### Smoke-testing the dev server

After `npm run dev`:

1. Hit `/` — should render the home with hero + practice areas grid
2. Hit `/hizmetler/bosanma-hukuku` — full Boşanma article
3. Hit `/avukat-kayit` — the lawyer signup form (validations should fire)
4. Hit `/giris` — login page
5. Hit `/panel` — should redirect to `/giris?next=/panel` if not logged in

---

## Environment variables

### Frontend (`.env`, picked up by Vite)

| Var | Where it's used | Safe to commit? |
|---|---|---|
| `VITE_SUPABASE_URL` | `src/integrations/supabase/client.ts` | yes (public) |
| `VITE_SUPABASE_ANON_KEY` | same | yes (public anon key) |
| `VITE_SUPABASE_PROJECT_ID` | (currently unused; future analytics) | yes |

`.env` itself is gitignored. `.env.example` is the committed template.

### Backend (Supabase edge function secrets)

Set via `supabase secrets set NAME=value --project-ref kcukkqnkhvhphfdebcuh`.

| Var | Used by | Required? |
|---|---|---|
| `SUPABASE_URL` | all functions | auto-injected |
| `SUPABASE_SERVICE_ROLE_KEY` | all functions | auto-injected |
| `NOTIFY_SHARED_SECRET` | `notify-lawyers` | **yes** — set during 3.D, value lives in `app_settings.notify_lawyers_config.shared_secret` |
| `RESEND_API_KEY` | `notify-lawyers` | optional — function falls back to console.log when missing |
| `RESEND_FROM` | `notify-lawyers` | optional, defaults to `AvukatIstanbul <noreply@avukatistanbul.net>` |

To inspect what's currently set:
```bash
supabase secrets list --project-ref kcukkqnkhvhphfdebcuh
```

### Local secrets (outside the repo)

| File | What | Mode |
|---|---|---|
| `~/.config/avukatistanbul/db-password` | Supabase DB password — used by `SUPABASE_DB_PASSWORD="$(cat …)" supabase …` | 600 |

---

## Database migrations

### Apply a new migration (the standard path)

```bash
SUPABASE_DB_PASSWORD="$(cat ~/.config/avukatistanbul/db-password)" \
  supabase db push --linked
```

`db push` reads `supabase/migrations/`, compares against
`supabase_migrations.schema_migrations` on the linked DB, and applies
anything new. Each new file lands in alphanumeric order.

### Hotfix path (when `db push` would touch unrelated migrations)

If multiple agents are mid-flight and `db push` shows pending migrations
that aren't yours:

```bash
# 1. Apply just your file
supabase db query --linked --file supabase/migrations/<your_file>.sql

# 2. Mark it as applied so future db push doesn't re-run it
supabase migration repair --linked --status applied <YYYYMMDDHHMMSS>
```

### Naming convention

`YYYYMMDDHHMMSS_<descriptive_name>.sql` — UTC, no UUIDs. The Phase 0
schema and all subsequent migrations follow this. Order is by timestamp.

### Postgres gotchas seen in this project

- **Column / variable shadowing in plpgsql.** Postgres can ambiguity-fail
  if a plpgsql variable shares a name with a table column. Either prefix
  variables (`v_req_*`) or add `#variable_conflict use_column` /
  `use_variable` directives. See `pick_lawyers_for_request` in
  `20260506260000_lead_notifications.sql` for the canonical pattern.
- **`CREATE OR REPLACE FUNCTION`** rejects a return-type change. Use
  `DROP FUNCTION IF EXISTS …; CREATE FUNCTION …` when the signature
  changes. See `pick_lawyers_for_request` rebuild in
  `20260506270000_remove_credit_system.sql`.
- **`pg_net.http_post` returns immediately**, the response lands in
  `net._http_response` asynchronously. To debug a trigger:
  ```bash
  supabase db query --linked \
    "select status_code, content::text from net._http_response order by created desc limit 5;"
  ```

---

## Edge functions

### Deploying

```bash
# Deploy a single function
supabase functions deploy <name> --no-verify-jwt --project-ref kcukkqnkhvhphfdebcuh

# Deploy all functions
supabase functions deploy --no-verify-jwt --project-ref kcukkqnkhvhphfdebcuh
```

`--no-verify-jwt` is correct for `notify-lawyers` and the sitemap
function — the trigger calls them without an Authorization header
(notify-lawyers uses its own X-Notify-Secret check; sitemap is public).

### Inspecting logs

Dashboard: `https://supabase.com/dashboard/project/kcukkqnkhvhphfdebcuh/functions`
→ select function → "Logs" tab.

When `RESEND_API_KEY` is unset, you'll see lines like:
```
[notify-lawyers] RESEND_API_KEY missing; would email <addr> · <subject>
```

### Smoke-testing notify-lawyers

The trigger is wired to `requests AFTER INSERT`. Insert a test row:

```bash
supabase db query --linked "
insert into public.requests (
  customer_name, customer_phone, city, district,
  practice_area, urgency, is_anonymous
) values (
  'Smoke Test', '05551234567', 'İstanbul', 'kadikoy',
  'bosanma-hukuku', 'flexible', true
) returning id;"
sleep 3
supabase db query --linked "
select status_code, content::text from net._http_response
order by created desc limit 1;"
```

Expect status 200 and a JSON body with `notified` count.

Then clean up:
```bash
supabase db query --linked "delete from public.requests where customer_name = 'Smoke Test';"
```

---

## Cloudflare Pages deploy

The repo is built around Cloudflare Pages auto-deploy from `main`. The
heavy lifting is on you the operator (UI/dashboard work). This section
walks you through the one-time setup.

### One-time: connect the repo

1. Sign in to https://dash.cloudflare.com → **Workers & Pages**
2. **Create application** → **Pages** → **Connect to Git**
3. Authorize GitHub access; pick `umut-egercium/avukatistanbul`
4. **Set up builds and deployments:**
   - Project name: `avukatistanbul`
   - Production branch: `main`
   - Framework preset: `Vite` (or "None" — both work)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (default)
5. **Environment variables** (Production scope):
   - `VITE_SUPABASE_URL` → `https://kcukkqnkhvhphfdebcuh.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` → (the anon JWT from `.env`)
   - `VITE_SUPABASE_PROJECT_ID` → `kcukkqnkhvhphfdebcuh`
   - `NODE_VERSION` → `20`
6. Click **Save and Deploy**. The first build takes ~2 minutes.

The preview URL will look like
`https://avukatistanbul-xxxx.pages.dev`. Smoke-test before pointing the
custom domain at it.

### `_redirects` file

`public/_redirects` ships with the build and tells Cloudflare:
1. Proxy `/sitemap.xml` to the Supabase sitemap function
2. Serve `index.html` for any unmatched path (SPA fallback for React Router)

The file content is fixed:

```
/sitemap.xml https://kcukkqnkhvhphfdebcuh.supabase.co/functions/v1/sitemap 200
/* /index.html 200
```

If `public/_redirects` is missing from a deploy, the preview URL will
404 on every non-root path. (This file is the responsibility of
**Agent 1** in the multi-agent split, but lives in the shared `public/`
folder; ensure it's in any branch you deploy.)

### Custom domain (avukatistanbul.net)

Once the preview URL is happy:

1. Buy/own `avukatistanbul.net`. The DNS records can live wherever (CF
   registrar, Namecheap, etc.).
2. In CF Pages → your project → **Custom domains** → **Set up a custom
   domain** → enter `avukatistanbul.net`.
3. CF will display the DNS records to add at your registrar:
   - `avukatistanbul.net` → CNAME → `<project>.pages.dev` (or A records
     CF specifies)
   - `www.avukatistanbul.net` → CNAME → `<project>.pages.dev`
4. Once DNS propagates (usually <10min, can be up to 24h), CF
   provisions an SSL cert automatically.
5. Verify HTTPS works on `https://avukatistanbul.net`.

---

## Bootstrapping the first admin

After your account exists in `auth.users` (created by signing up at
`/avukat-kayit` or via the Supabase dashboard):

```bash
supabase db query --linked \
  "select public.promote_to_admin('your-email@example.com');"
```

The function is service-role-only; the SQL CLI runs as `postgres` which
satisfies that. After running, log in normally — `/admin` will let you
through.

To revoke or reassign:

```bash
supabase db query --linked \
  "update public.user_roles set role = 'lawyer' where user_id = (
    select id from auth.users where email = 'your-email@example.com');"
```

---

## Email: configuring Resend

`notify-lawyers` falls back to `console.log` until you wire Resend.

### Setup steps

1. Sign up at https://resend.com (free tier covers ~3k emails/month).
2. **Add domain** → `avukatistanbul.net` → follow the DNS instructions.
   Resend will give you 3-4 DNS records (TXT for verification, DKIM,
   SPF, optional DMARC). Add them at your registrar.
3. Wait for verification (usually <5min).
4. **API Keys** → create one named `avukatistanbul-prod`. Copy the
   `re_…` value.
5. Set it as a Supabase function secret:
   ```bash
   supabase secrets set RESEND_API_KEY=re_xxxxxxxx \
     --project-ref kcukkqnkhvhphfdebcuh
   ```
6. (Optional) override the From line:
   ```bash
   supabase secrets set "RESEND_FROM=AvukatIstanbul <noreply@avukatistanbul.net>" \
     --project-ref kcukkqnkhvhphfdebcuh
   ```
7. The next request that triggers notify-lawyers picks up the new env;
   no redeploy needed. Smoke-test by inserting a request as in the
   "Smoke-testing notify-lawyers" section above.

### When emails are bouncing

Check Resend's dashboard → **Emails** for bounce reasons. Common ones:
- Domain not fully verified (DNS propagation delay)
- Recipient address invalid (check `lawyer_profiles.email`)
- Hit rate limit (free tier ≈ 100/hour)

---

## Service role rotation

If the service role key is ever exposed (committed to git, leaked in
logs, shared accidentally):

1. Supabase dashboard → **Project Settings** → **API** → rotate the
   service_role JWT.
2. Update local `.env` if you have it there (you shouldn't — this key
   should never be in `.env`).
3. Re-deploy edge functions — `SUPABASE_SERVICE_ROLE_KEY` is
   auto-injected by the platform but cached per deployment in some
   cases; redeploy to be safe:
   ```bash
   supabase functions deploy --no-verify-jwt --project-ref kcukkqnkhvhphfdebcuh
   ```
4. The `NOTIFY_SHARED_SECRET` is **not** the service role; it's a
   separate value stored in `app_settings.notify_lawyers_config`.
   Rotate independently if needed (regenerate via SQL, then
   `supabase secrets set` again).

---

## Common breakage

### `npm run build` fails on TS errors

Strict typecheck **is** in the build chain (different from Müşavirbul).
Fix the type errors. Frequently-seen:

- Implicit `any` on react-hook-form `field`/`fieldState` destructuring
  → annotate or upgrade Zod usage.
- `Cannot find module '@/...'` → restart the TS server / `tsc -b --clean`
  if you renamed a file.
- `Coins is declared but its value is never read` → remove the import.

### Trigger fires but no logs appear in `request_notification_logs`

Check the response in `net._http_response`:
```bash
supabase db query --linked \
  "select status_code, content::text from net._http_response order by created desc limit 5;"
```

Common causes:
- 403 → `NOTIFY_SHARED_SECRET` mismatch between trigger config and
  function env. Re-sync:
  ```bash
  SECRET=$(supabase db query --linked --output csv \
    "select value->>'shared_secret' from app_settings where key='notify_lawyers_config';" \
    | tail -1)
  supabase secrets set NOTIFY_SHARED_SECRET=$SECRET --project-ref kcukkqnkhvhphfdebcuh
  ```
- 500 with "column reference X is ambiguous" → SQL function bug; check
  the `#variable_conflict` directive and variable prefixes.
- 404 "request_not_found" → the trigger fired before the row was
  visible (transactional). Should self-heal on retry, but worth
  logging.

### Customer can submit form but no rows in `requests`

`create_request` RPC is Agent 2's. Check:
- `auth.users` has the customer (anonymous flow uses `is_anonymous=true`,
  customer_user_id can be null).
- RLS on `requests` allows the insert path that Agent 2 wired up.

### Lawyer signed up but `lawyer_profiles` row missing

The `trg_lawyer_application_creates_profile` trigger should fire on
`lawyer_applications` insert. If it didn't:
- Check `auth.users.raw_user_meta_data.role` was `'lawyer'` (signup form
  sets this).
- Run the trigger manually:
  ```sql
  insert into lawyer_applications (...same fields...)
  ```
  to re-fire.

### "Hesap oluşturuldu fakat başvurunuz kaydedilemedi"

Auth user was created but the lawyer_applications insert failed. The
auth account exists; user can log in but won't have an application.
Either:
- Resubmit the form when logged in (`/avukat-kayit` re-uses the auth
  session).
- Insert the lawyer_application manually via the dashboard.

---

## Known limitations (for documentation, not bugs)

1. **SPA + social-share previews.** This is a client-rendered Vite SPA.
   Per-route `<MetaTags>` updates happen after JS executes, so OG/
   Twitter crawlers (which don't run JS) see only the static defaults
   in `index.html`. Google's Googlebot does run JS and indexes
   correctly. **Fix when needed:** add `vite-plugin-ssg` for
   build-time prerendering of static routes (home, hizmet pages,
   blog posts).

2. **Lawyer email is in the dispatch payload.** `notify-lawyers` reads
   `lawyer_profiles.email`. If a lawyer hasn't filled it in, that lead
   is silently skipped (`email_status: "no_email_on_file"`). Consider
   making `email` required on signup.

3. **Avatar bucket is public.** Anyone with a `lawyer-avatars/<userId>/…`
   URL can fetch the image. Files are not enumerable (UUID paths), but
   if a profile photo includes private info, treat that as the lawyer's
   responsibility (set in `PanelProfile` upload UI copy if you want).

4. **`notify-lawyers` doesn't retry on Resend failure.** If Resend
   returns 5xx, the lawyer's notification log row exists but no email
   was sent. The lawyer will see the lead in their panel but no email
   in their inbox. Acceptable tradeoff for v1; add a retry queue if
   bounce rate gets high.

5. **No daily digest.** A lawyer who's offline gets emails as
   notifications fire, no batching. If lawyers complain about email
   volume, add a "send me a daily digest instead" preference on
   `lawyer_profiles`.

---

## File map (where to look for X)

| Domain | File / dir |
|---|---|
| Auth state | `src/hooks/useAuth.ts` |
| Auth gate (route) | `src/components/auth/AuthGate.tsx` |
| Lawyer signup form | `src/pages/AvukatKayit.tsx` |
| Lawyer panel | `src/pages/panel/*.tsx` |
| Admin queue | `src/pages/admin/*.tsx` |
| Lead notifications | `supabase/functions/notify-lawyers/index.ts` + `supabase/migrations/20260506260000_*.sql` |
| Practice-area taxonomy | `src/data/legalCategories.ts` |
| İstanbul districts | `src/data/istanbulDistricts.ts` |
| Brand / design tokens | `src/index.css`, `tailwind.config.ts` |
| SEO infra | `src/components/seo/MetaTags.tsx`, `JsonLd.tsx` |
| Supabase client | `src/integrations/supabase/client.ts` |
