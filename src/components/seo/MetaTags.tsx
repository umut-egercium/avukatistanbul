import { Helmet } from "react-helmet-async";

const SITE_NAME = "AvukatIstanbul";
const SITE_URL = "https://avukatistanbul.net";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface MetaTagsProps {
  /** Page-specific title; gets " — AvukatIstanbul" suffix unless `noSuffix`. */
  title: string;
  description: string;
  /** Path for canonical URL (e.g., "/hizmetler/bosanma-hukuku"). Pass null to omit. */
  path?: string | null;
  /** Override OG image (absolute URL). */
  ogImage?: string;
  /** Skip the " — AvukatIstanbul" suffix (e.g., on the home page). */
  noSuffix?: boolean;
  /** Mark as noindex (admin pages, drafts). */
  noindex?: boolean;
}

export function MetaTags({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noSuffix = false,
  noindex = false,
}: MetaTagsProps) {
  const fullTitle = noSuffix ? title : `${title} — ${SITE_NAME}`;
  const canonical = path != null ? `${SITE_URL}${path}` : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="tr_TR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}

export const SITE_CONFIG = {
  name: SITE_NAME,
  url: SITE_URL,
  defaultOgImage: DEFAULT_OG_IMAGE,
};
