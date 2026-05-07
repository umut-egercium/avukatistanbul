# TODO — AvukatIstanbul

Open work, grouped by priority. Updated 2026-05-07.

## Must — needed for the marketplace to actually function end-to-end

- [ ] **Bootstrap the first admin.** Without an admin nobody can approve
      pending lawyer applications, so verified profiles never appear in
      the directory.
      ```bash
      # 1. Sign up at https://avukatistanbul.net/avukat-kayit (or use Supabase dashboard to create the user)
      # 2. Then promote that user:
      supabase db query --linked \
        "select public.promote_to_admin('<your-email>');"
      ```
      See `docs/RUNBOOK.md` § Bootstrapping the first admin.

- [ ] **Wire Resend so lead-notification emails actually send.** Right
      now `notify-lawyers` falls back to console-log; the
      `request_notification_logs` row is still created so PanelLeads
      shows the lead, but the lawyer doesn't receive an email.
      Steps in `docs/RUNBOOK.md` § Email: configuring Resend.
      ```bash
      # 1. Verify avukatistanbul.net at resend.com (DNS records)
      # 2. supabase secrets set RESEND_API_KEY=re_... \
      #      --project-ref kcukkqnkhvhphfdebcuh
      # 3. (Optional) supabase secrets set \
      #      "RESEND_FROM=AvukatIstanbul <noreply@avukatistanbul.net>" \
      #      --project-ref kcukkqnkhvhphfdebcuh
      ```

- [ ] **Merge Agent 1's content branch.** Agent 1 has 3 local-only
      commits on `agent1/content`:
      - blog scaffolding + sitemap edge function + robots + BlogPosting
        JSON-LD
      - 11 hizmet articles (the long-form Turkish legal content)
      - 36 blog posts (3 per practice area)
      Until merged, `/hizmetler/<slug>` shows "coming soon" for 11 of
      the 12 hukuk areas, and `/blog` doesn't render. From a fresh shell
      with the agent1 branch present:
      ```bash
      git push -u origin agent1/content     # if not already pushed
      git fetch origin
      git rebase origin/main                # may have App.tsx + JsonLd.tsx + HizmetDetay.tsx merge points; accept agent1's
      npm run build                         # verify clean
      git push --force-with-lease origin agent1/content
      git checkout main
      git merge --no-ff origin/agent1/content -m "Merge Agent 1: content + SEO + sitemap"
      git push origin main
      git branch -d agent1/content && git push origin --delete agent1/content
      ```

## Should — improves the system but the marketplace runs without

- [ ] **Lawyer-side analytics events** (Track 3F in `docs/AGENT3.md`).
      Append `trackLawyerPanelEvent` to `src/lib/analytics.ts` and wire
      calls in `PanelDashboard` mount, `PanelLeads` row expand,
      `PanelQuotes` quote send, `PanelVerification` submit. ~30 min.

- [ ] **Code-split the bundle.** `npm run build` warns the JS chunk is
      >500 KB (~924 KB un-gzipped, 263 KB gzip). Reasonable for v1, but
      route-level `React.lazy` would split panel + admin out of the
      public bundle and make `/` faster on first paint.

- [ ] **Lighthouse polish.** Target ≥ 90 on Performance + SEO for
      `/`, one hizmet page, one blog post, one lawyer profile. Likely
      improvements: optimize Fraunces font loading (currently both
      400-700 weights load on every page), defer GA4/Clarity until
      after first contentful paint, route-level code split (above).

## Nice-to-have — quality-of-life

- [ ] **Build-time prerendering for OG / social-share previews.** SPAs
      lose social-card metadata to non-JS crawlers (Facebook, Twitter,
      LinkedIn). Add `vite-plugin-ssg` (or similar) to prerender the
      static routes (home, hizmet pages, blog posts) so OG bots see
      the per-page MetaTags values.

- [ ] **Daily-digest preference for lawyers.** Currently
      `notify-lawyers` sends an email per lead. A high-volume lawyer
      might prefer a single daily summary. Add a `lawyer_profiles.
      notification_mode` column (`per_lead` | `daily_digest`) and a
      cron edge function for the digest.

- [ ] **Avatar bucket privacy.** `lawyer-avatars` is a public bucket —
      anyone with the URL can fetch the image (URLs aren't enumerable,
      paths use UUIDs, but treat as public). If a lawyer wants to
      restrict, the `PanelProfile` UI could expose a "use initials
      instead" toggle that nullifies `avatar_url` server-side.

- [ ] **Retry on Resend 5xx.** The current `notify-lawyers` function
      doesn't retry email send. The notification log row exists but the
      lawyer won't see it in their inbox if Resend was transiently
      down. Acceptable for v1; revisit if bounce rate gets high.

- [ ] **Delete `public/_redirects`.** Legacy file from the multi-agent
      split (Agent 1's Pages-style config). Workers ignore it; the
      sitemap proxy lives in `worker/index.ts` and SPA fallback is in
      `wrangler.jsonc`. Removing the file is a clean-up, not a
      requirement.

## Out of scope (explicitly)

- ~~Credit purchases / iyzico / payment system.~~ Scrapped 2026-05-06
  by user decision. Marketplace is free for both sides. See
  `docs/AGENT3.md` § Out of scope.
