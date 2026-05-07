// Cloudflare Worker entry that fronts the Pages site.
//
// Two responsibilities:
//   1. /sitemap.xml — proxy through to the Supabase edge function so the
//      sitemap is exposed at the same origin (avukatistanbul.net/sitemap.xml).
//      Workers Static Assets does not allow external proxy rules in
//      _redirects, so the proxy lives here.
//   2. Anything else — delegate to the static assets binding (Vite build
//      output). The `not_found_handling: "single-page-application"` setting
//      in wrangler.jsonc handles SPA fallback for unmatched routes.

const SITEMAP_UPSTREAM =
  "https://kcukkqnkhvhphfdebcuh.supabase.co/functions/v1/sitemap";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/sitemap.xml") {
      const upstream = await fetch(SITEMAP_UPSTREAM, {
        // Cache the sitemap at Cloudflare's edge for an hour. The Supabase
        // function itself also caches for an hour, so worst-case staleness
        // is 2 hours — fine for crawlers.
        cf: { cacheTtl: 3600, cacheEverything: true },
      } as RequestInit);
      return new Response(upstream.body, {
        status: upstream.status,
        headers: {
          "content-type": "application/xml; charset=utf-8",
          "cache-control": "public, max-age=3600",
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
