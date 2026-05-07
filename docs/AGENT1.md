# AGENT 1 — Content & SEO

You are responsible for the **content spine** of AvukatIstanbul: long-form
practice-area articles, blog posts, the sitemap, and all the SEO scaffolding
that makes them discoverable.

## Read first

1. `CLAUDE.md` — project context, conventions, design language
2. `docs/AGENT-SPLIT.md` — how your work fits with Agent 2 and Agent 3
3. `src/content/categories/bosanma-hukuku.tsx` — the **template** you will
   replicate. Every hizmet article must follow its structure.

## Track 1A — Practice-area articles (11 of them)

`src/content/categories/bosanma-hukuku.tsx` exists as the gold-standard
template (~1500 words, 6 sections, 7 FAQs, real TMK references). Replicate
it — same shape, same tone, same care for accuracy — for the **11 remaining
slugs** in `src/data/legalCategories.ts`:

```
ceza-hukuku
is-hukuku
tazminat-hukuku
miras-hukuku
gayrimenkul-kira-hukuku
ticaret-hukuku
icra-iflas-hukuku
aile-hukuku
tuketici-hukuku
yabancilar-hukuku
kvkk-bilisim-hukuku
```

For each:

1. Read the corresponding entry in `src/data/legalCategories.ts` for
   `name`, `searchTerm`, `caseTypes`, `longDescription`. These are
   constraints — the article must reinforce these case types and search
   term, not invent new ones.
2. Create `src/content/categories/<slug>.tsx` exporting a `CategoryArticle`
   with the same exported shape as `bosanmaHukukuArticle`.
3. Article structure:
   - **Lead:** 2-3 sentences naming the practice area + İstanbul + the
     primary search term naturally.
   - **6-8 sections:** "<area> nedir?", "Türleri / kapsamı", "Yasal
     dayanak (kanun maddeleri)", "Süreç", "Süre ve maliyet", "Kim
     başvurmalı?", and any area-specific section (e.g., for ceza: "Sanık
     ve mağdur müdafiliği").
   - **6-8 FAQs:** questions a real prospective client would Google. Real
     answers, citing law where applicable. Match the depth of the
     `bosanmaHukukuArticle.faqs`.
4. Wire each new article into the `ARTICLES` registry in
   `src/pages/HizmetDetay.tsx`:
   ```ts
   import { cezaHukukuArticle } from "@/content/categories/ceza-hukuku";
   const ARTICLES: Record<string, CategoryArticle> = {
     "bosanma-hukuku": bosanmaHukukuArticle,
     "ceza-hukuku": cezaHukukuArticle,
     // ...
   };
   ```

### Legal accuracy guardrails (non-negotiable)

- **Cite real Turkish law articles** when relevant: TMK (Türk Medeni
  Kanunu), TCK (Türk Ceza Kanunu), İYUK (İdari Yargılama Usulü Kanunu),
  HMK (Hukuk Muhakemeleri Kanunu), CMK (Ceza Muhakemesi Kanunu), İK (İş
  Kanunu), TKHK (Tüketicinin Korunması Hakkında Kanun), KVKK (6698 sayılı
  Kişisel Verilerin Korunması Kanunu), YUKK (Yabancılar ve Uluslararası
  Koruma Kanunu).
- **Do not promise outcomes.** Avoid phrases like "kazanmanızı garanti
  ederiz". The platform connects clients with lawyers; it does not give
  legal advice.
- **Do not present yourself as a lawyer or law firm.** This is a marketplace.
- **Avoid US/UK terms.** No "deposition", no "discovery". Turkish legal
  vocabulary only.

## Track 1B — Blog (3 posts × 12 areas = 36 posts)

For each of the 12 practice areas, write **3 long-tail SEO blog posts** —
each ~800-1200 words targeting a specific high-intent query.

### Examples

For `bosanma-hukuku`:
1. "Anlaşmalı Boşanma Davası 2026: Süre, Şartlar, Maliyet"
2. "Çekişmeli Boşanma Davasında Tanık Beyanı Nasıl Alınır?"
3. "Boşanma Davasında Mal Paylaşımı: Edinilmiş Mallara Katılma Rejimi"

For `ceza-hukuku`:
1. "İfade Verirken Avukat Hakkı: Ne Zaman, Nasıl Talep Edilir?"
2. "Hakaret Suçu (TCK m. 125): Para Cezası Mı, Hapis Mi?"
3. "Uzlaştırma Nedir? Hangi Suçlar Uzlaştırma Kapsamındadır?"

You decide the exact 36 titles based on Turkish search-volume intuition for
that practice area. Each title must include either the practice area name
or a closely-related high-volume query.

### Blog data model

Create `src/data/blogPosts.ts`:

```ts
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;            // 1-2 sentences for cards
  practiceArea: string;       // matches a slug in legalCategories
  publishedAt: string;        // ISO date "2026-05-10"
  readingTimeMinutes: number;
  authorName: string;         // "AvukatIstanbul Editörü" is fine
}

export const BLOG_POSTS: BlogPost[] = [ ... ];
```

Write the post body itself in `src/content/blog/<slug>.tsx` following the
same JSX-with-`prose-legal` pattern as the practice-area articles.

### Blog routes

Add to `src/App.tsx`:
```tsx
<Route path="/blog" element={<Blog />} />
<Route path="/blog/:slug" element={<BlogPost />} />
```

Build the pages:

- **`src/pages/Blog.tsx`** — index page. List all posts newest-first. Filter
  pills by practice area. Pagination (10 per page). MetaTags + Breadcrumb
  JSON-LD.
- **`src/pages/BlogPost.tsx`** — single post. H1 + author + date + reading
  time + body + "İlgili hizmet" link to the matching `/hizmetler/<slug>`
  page + "İlgili yazılar" (3 other posts in same area) + final "Avukatla
  görüş" CTA. MetaTags + Breadcrumb + Article (or BlogPosting) JSON-LD.

### Blog JSON-LD

Use `BlogPosting` schema:
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "...",
  "description": "...",
  "datePublished": "2026-05-10",
  "author": { "@type": "Organization", "name": "AvukatIstanbul" },
  "mainEntityOfPage": "https://avukatistanbul.net/blog/<slug>"
}
```

Add a `blogPostingLd(post)` factory to `src/components/seo/JsonLd.tsx`.

## Track 1C — Sitemap edge function

Create `supabase/functions/sitemap/index.ts` (Deno-based edge function)
that returns a valid `application/xml` `urlset` covering:

- Static pages: `/`, `/hizmetler`, `/avukat-bul`, `/talep-olustur`,
  `/avukat-kayit`, `/blog`
- Each of 12 hizmet detail URLs (`/hizmetler/<slug>`)
- Each of 39 district URLs (`/avukat-bul/<district-slug>`)
- Each of 36 blog post URLs (`/blog/<slug>`)
- Each verified lawyer's profile URL (`/avukat/<slug>`) — query
  `public.lawyer_profiles where verification_status='verified' and is_active=true`

Set `<lastmod>` based on `updated_at` for DB-driven URLs and the build
date for static.

Deploy:
```bash
supabase functions deploy sitemap --no-verify-jwt --project-ref kcukkqnkhvhphfdebcuh
```

Reference at `https://kcukkqnkhvhphfdebcuh.supabase.co/functions/v1/sitemap`.

Add a Cloudflare-style redirect rule (in `_redirects` for Pages-style
hosting; on Workers the equivalent is the `/sitemap.xml` branch in
`worker/index.ts`) so that
`/sitemap.xml` proxies to the function URL. Document this in `README.md`
deploy section.

## Track 1D — `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://avukatistanbul.net/sitemap.xml
```

## File ownership

**You own** (create / extensively edit):
- `src/content/categories/*.tsx` (11 new files)
- `src/content/blog/*.tsx` (36 new files)
- `src/data/blogPosts.ts` (new)
- `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx` (new)
- `supabase/functions/sitemap/` (new)
- `public/robots.txt` (new)
- `src/components/seo/JsonLd.tsx` — add `blogPostingLd` factory (small
  extension, surface area shouldn't grow beyond one factory)

**You append to** (small additions only — don't restructure):
- `src/pages/HizmetDetay.tsx` — extend the `ARTICLES` registry with
  imports + map entries
- `src/App.tsx` — add `/blog` and `/blog/:slug` routes

**Don't touch** (Agent 2 / 3 territory):
- `src/pages/TalepOlustur.tsx`, `AvukatBul.tsx`, `AvukatKayit.tsx`,
  `panel/*`, `admin/*`, `AvukatProfil.tsx`
- `src/lib/analytics.ts`, `src/hooks/useAuth.ts`
- `supabase/migrations/*`, `supabase/functions/notify-lawyers/`,
  any non-sitemap edge functions

## Acceptance criteria

- All 12 hizmet detail URLs (`/hizmetler/<any-slug>`) render full articles,
  no "coming soon" panel anywhere.
- `/blog` renders a paginated list of 36 posts; filter pills work.
- `/blog/<slug>` renders each of the 36 posts with full body + related
  posts + CTA.
- `npm run build` exits 0; bundle size grows but stays under 600 KB
  un-gzipped (long-form text compresses well).
- `https://kcukkqnkhvhphfdebcuh.supabase.co/functions/v1/sitemap` returns
  valid XML covering all static + dynamic URLs.
- `public/robots.txt` is in place pointing at the production sitemap URL.
- Every article and post passes a quick legal-accuracy review by a Turkish
  speaker (the human user). Plan content commits in chunks (3-4 articles
  at a time) so review happens before drift.

## Out of scope (explicitly)

- Customer request flow, lawyer directory display logic, lawyer profile
  page styling — Agent 2.
- Lawyer signup, panel, admin — Agent 3.
- GA4/Ads conversion code, A/B testing helper — Agent 2 owns those.
- Cloudflare deploy config (Workers) — Agent 3 connects; you provide the
  `_redirects` file content for the sitemap proxy.
