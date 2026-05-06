// Sitemap edge function for avukatistanbul.net.
//
// Returns an XML sitemap covering:
//   - Static pages (home, /hizmetler, /avukat-bul, /talep-olustur, /avukat-kayit, /blog)
//   - 12 hizmet detail URLs (/hizmetler/<slug>)
//   - 39 district directory URLs (/avukat-bul/<slug>)
//   - 36 blog URLs (/blog/<slug>)
//   - Verified, active lawyer profile URLs (/avukat/<slug>) read from `lawyer_profiles`
//
// Cloudflare Pages proxies /sitemap.xml to this function via public/_redirects.
//
// Deploy:
//   supabase functions deploy sitemap --no-verify-jwt --project-ref kcukkqnkhvhphfdebcuh

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SITE_URL = "https://avukatistanbul.net";

const STATIC_PATHS: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/hizmetler", priority: "0.9", changefreq: "weekly" },
  { path: "/avukat-bul", priority: "0.9", changefreq: "daily" },
  { path: "/talep-olustur", priority: "0.8", changefreq: "monthly" },
  { path: "/avukat-kayit", priority: "0.7", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
];

const HIZMET_SLUGS = [
  "bosanma-hukuku",
  "ceza-hukuku",
  "is-hukuku",
  "tazminat-hukuku",
  "miras-hukuku",
  "gayrimenkul-kira-hukuku",
  "ticaret-hukuku",
  "icra-iflas-hukuku",
  "aile-hukuku",
  "tuketici-hukuku",
  "yabancilar-hukuku",
  "kvkk-bilisim-hukuku",
];

const DISTRICT_SLUGS = [
  "esenyurt", "kucukcekmece", "umraniye", "bagcilar", "pendik",
  "uskudar", "bahcelievler", "sultangazi", "esenler", "kadikoy",
  "maltepe", "sariyer", "kartal", "atasehir", "fatih",
  "avcilar", "sancaktepe", "tuzla", "gaziosmanpasa", "basaksehir",
  "beylikduzu", "sile", "catalca", "silivri", "buyukcekmece",
  "arnavutkoy", "beykoz", "cekmekoy", "sisli", "beyoglu",
  "besiktas", "eyupsultan", "zeytinburnu", "bayrampasa", "kagithane",
  "bakirkoy", "gungoren", "adalar",
];

const BLOG_SLUGS = [
  // Boşanma
  "anlasmali-bosanma-2026-sure-sartlar-maliyet",
  "cekismeli-bosanmada-tanik-ve-delil",
  "bosanmada-mal-paylasimi-edinilmis-mallara-katilma",
  // Ceza
  "ifade-verirken-avukat-hakki",
  "hakaret-sucu-tck-125-para-cezasi-mi-hapis-mi",
  "uzlastirma-hangi-suclar-kapsaminda",
  // İş
  "kidem-ve-ihbar-tazminati-2026",
  "ise-iade-davasi-sartlar-sureler",
  "mobbing-davasi-nasil-acilir",
  // Tazminat
  "trafik-kazasinda-maddi-manevi-tazminat",
  "is-kazasi-tazminati-sgk-isveren-sorumlulugu",
  "doktor-hatasi-malpraktis-davasi",
  // Miras
  "mirasin-reddi-tmk-605-borcttan-kurtulma",
  "vasiyetname-iptali-davasi",
  "muris-muvazaasi-mirastan-mal-kacirma",
  // Gayrimenkul & Kira
  "tahliye-davasi-2026-sebepler",
  "kira-artisi-2026-tufe-kira-tespit-davasi",
  "tapu-iptal-ve-tescil-davasi",
  // Ticaret
  "limited-sirket-kurulusu-2026-adimlar-maliyet",
  "anonim-sirkette-pay-devri-genel-kurul-iptali",
  "ticari-sozlesmelerde-haksiz-sart-cezai-sart",
  // İcra & İflas
  "ilamli-ilamsiz-icra-takibi",
  "icraya-itiraz-7-gun-itirazin-iptali",
  "maas-haczi-ne-kadari-haczedilebilir",
  // Aile
  "velayet-degisikligi-davasi",
  "6284-uzaklastirma-karari-nasil-alinir",
  "evlat-edinme-tek-cift-yetiskin",
  // Tüketici
  "ayipli-arac-davasi-secimlik-haklar",
  "tuketici-hakem-heyeti-2026-parasal-sinir",
  "banka-kredi-karti-ucretleri-iadesi",
  // Yabancılar
  "turk-vatandasligi-2026-kazanma-yollari",
  "sinir-disi-kararina-itiraz",
  "calisma-izni-basvurusu-ve-reddine-itiraz",
  // KVKK
  "kvkk-veri-ihlali-bildirimi-72-saat",
  "sosyal-medyada-hakaret-url-kapatma",
  "bilisim-sistemleri-dolandiriciligi-tck-158",
];

interface UrlEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

function buildUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function escapeXml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderXml(entries: UrlEntry[]): string {
  const head =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const body = entries
    .map(
      (e) =>
        `  <url>\n` +
        `    <loc>${escapeXml(e.loc)}</loc>\n` +
        `    <lastmod>${e.lastmod}</lastmod>\n` +
        `    <changefreq>${e.changefreq}</changefreq>\n` +
        `    <priority>${e.priority}</priority>\n` +
        `  </url>`,
    )
    .join("\n");
  return `${head}\n${body}\n</urlset>\n`;
}

async function fetchVerifiedLawyers(): Promise<Array<{ slug: string; updated_at: string | null }>> {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return [];
  const client = createClient(url, key, {
    auth: { persistSession: false },
  });
  const { data, error } = await client
    .from("lawyer_profiles")
    .select("slug, updated_at")
    .eq("verification_status", "verified")
    .eq("is_active", true)
    .not("slug", "is", null);
  if (error || !data) return [];
  return data
    .filter((r): r is { slug: string; updated_at: string | null } =>
      typeof r.slug === "string" && r.slug.length > 0,
    );
}

Deno.serve(async () => {
  const today = todayIso();
  const entries: UrlEntry[] = [];

  for (const s of STATIC_PATHS) {
    entries.push({
      loc: buildUrl(s.path),
      lastmod: today,
      changefreq: s.changefreq,
      priority: s.priority,
    });
  }

  for (const slug of HIZMET_SLUGS) {
    entries.push({
      loc: buildUrl(`/hizmetler/${slug}`),
      lastmod: today,
      changefreq: "monthly",
      priority: "0.85",
    });
  }

  for (const slug of DISTRICT_SLUGS) {
    entries.push({
      loc: buildUrl(`/avukat-bul/${slug}`),
      lastmod: today,
      changefreq: "weekly",
      priority: "0.7",
    });
  }

  for (const slug of BLOG_SLUGS) {
    entries.push({
      loc: buildUrl(`/blog/${slug}`),
      lastmod: today,
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  const lawyers = await fetchVerifiedLawyers();
  for (const l of lawyers) {
    entries.push({
      loc: buildUrl(`/avukat/${l.slug}`),
      lastmod: (l.updated_at ?? "").slice(0, 10) || today,
      changefreq: "weekly",
      priority: "0.6",
    });
  }

  return new Response(renderXml(entries), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
