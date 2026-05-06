import { useQuery } from "@tanstack/react-query";
import {
  Award,
  ChevronRight,
  Clock,
  Loader2,
  MapPin,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { MetaTags, SITE_CONFIG } from "@/components/seo/MetaTags";
import { Button } from "@/components/ui/button";
import { ISTANBUL_DISTRICTS } from "@/data/istanbulDistricts";
import { LEGAL_CATEGORIES } from "@/data/legalCategories";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import NotFound from "@/pages/NotFound";

interface PublicLawyerProfile {
  id: string;
  slug: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  bar_number: string | null;
  bar_association: string | null;
  bio: string | null;
  city: string | null;
  district: string | null;
  practice_areas: string[];
  avatar_url: string | null;
  years_of_experience: number | null;
  rating: number | null;
  reviews_count: number;
  created_at: string;
}

interface PublicReview {
  id: string;
  lawyer_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export default function AvukatProfil() {
  const { slug } = useParams<{ slug: string }>();

  const lawyerQuery = useQuery<PublicLawyerProfile | null>({
    queryKey: ["public-lawyer-profile", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("public_lawyer_profiles")
        .select(
          "id, slug, full_name, email, phone, bar_number, bar_association, bio, city, district, practice_areas, avatar_url, years_of_experience, rating, reviews_count, created_at",
        )
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      return (data as PublicLawyerProfile | null) ?? null;
    },
  });

  const lawyer = lawyerQuery.data ?? null;

  const reviewsQuery = useQuery<PublicReview[]>({
    queryKey: ["public-lawyer-reviews", lawyer?.id],
    enabled: !!lawyer?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("public_reviews")
        .select("id, lawyer_id, rating, comment, created_at")
        .eq("lawyer_id", lawyer!.id)
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return (data ?? []) as PublicReview[];
    },
  });

  const districtName = useMemo(() => {
    if (!lawyer?.district) return null;
    return (
      ISTANBUL_DISTRICTS.find((d) => d.slug === lawyer.district)?.name ??
      lawyer.district
    );
  }, [lawyer]);

  const practiceAreas = useMemo(() => {
    if (!lawyer) return [];
    return lawyer.practice_areas
      .map((slug) => LEGAL_CATEGORIES.find((c) => c.slug === slug))
      .filter((c): c is NonNullable<typeof c> => !!c);
  }, [lawyer]);

  if (lawyerQuery.isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="container-main py-24 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-accent" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!lawyer) {
    return <NotFound />;
  }

  const path = `/avukat/${lawyer.slug}`;
  const primaryArea = practiceAreas[0]?.name ?? "Avukat";
  const headline = `${lawyer.full_name} — İstanbul ${primaryArea} Avukatı`;
  const description =
    lawyer.bio?.slice(0, 200) ??
    `${lawyer.full_name}, ${lawyer.bar_association ?? "İstanbul Barosu"} kayıtlı avukat. ${
      districtName ? `${districtName} • ` : ""
    }${primaryArea}.`;

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: lawyer.full_name,
    jobTitle: "Avukat",
    worksFor: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    image: lawyer.avatar_url ?? undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: districtName ?? "İstanbul",
      addressRegion: "İstanbul",
      addressCountry: "TR",
    },
    url: `${SITE_CONFIG.url}${path}`,
    knowsAbout: practiceAreas.map((cat) => cat.name),
  };

  const legalServiceLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: lawyer.full_name,
    description,
    url: `${SITE_CONFIG.url}${path}`,
    image: lawyer.avatar_url ?? undefined,
    areaServed: {
      "@type": "City",
      name: "İstanbul",
      "@id": "https://www.wikidata.org/wiki/Q406",
    },
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    serviceType: practiceAreas.map((cat) => cat.name).join(", ") || "Hukuki Danışmanlık",
    aggregateRating:
      typeof lawyer.rating === "number" && lawyer.reviews_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: lawyer.rating,
            reviewCount: lawyer.reviews_count,
          }
        : undefined,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags title={headline} description={description} path={path} />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Avukat Bul", path: "/avukat-bul" },
            { name: lawyer.full_name, path },
          ]),
          personLd,
          legalServiceLd,
        ]}
      />

      <Header />
      <main className="flex-1">
        <section className="hero-gradient border-b border-border/40">
          <div className="container-main py-12 lg:py-16">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex items-center gap-2 text-sm text-primary-foreground/65"
            >
              <Link to="/" className="hover:text-primary-foreground transition-colors">
                Ana Sayfa
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                to="/avukat-bul"
                className="hover:text-primary-foreground transition-colors"
              >
                Avukat Bul
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-primary-foreground/85 truncate">
                {lawyer.full_name}
              </span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10">
                {lawyer.avatar_url ? (
                  <img
                    src={lawyer.avatar_url}
                    alt={lawyer.full_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-serif text-3xl text-primary-foreground/80">
                    {getInitials(lawyer.full_name)}
                  </div>
                )}
              </div>
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary-foreground tracking-tight text-balance">
                  {lawyer.full_name}
                </h1>
                <p className="mt-2 flex items-center gap-2 text-primary-foreground/75">
                  <Award className="h-4 w-4 text-accent" strokeWidth={1.75} />
                  {lawyer.bar_association ?? "İstanbul Barosu"}
                  {lawyer.bar_number ? ` • Sicil ${lawyer.bar_number}` : ""}
                </p>
                {districtName ? (
                  <p className="mt-1 flex items-center gap-2 text-primary-foreground/70">
                    <MapPin className="h-4 w-4 text-accent" strokeWidth={1.75} />
                    İstanbul, {districtName}
                  </p>
                ) : null}

                {practiceAreas.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {practiceAreas.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          to={`/hizmetler/${cat.slug}`}
                          className="inline-flex items-center rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1 text-xs text-primary-foreground/85 hover:bg-primary-foreground/10"
                        >
                          {cat.shortName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <RatingBadge rating={lawyer.rating} reviewsCount={lawyer.reviews_count} />
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container-main grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-12">
              <Bio bio={lawyer.bio} />
              <Reviews
                isLoading={reviewsQuery.isLoading}
                reviews={reviewsQuery.data ?? []}
              />
              {practiceAreas.length > 0 ? (
                <PracticeAreas areas={practiceAreas} />
              ) : null}
            </div>
            <ContactRail
              lawyer={lawyer}
              districtSlug={lawyer.district}
              firstAreaSlug={practiceAreas[0]?.slug ?? ""}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function RatingBadge({
  rating,
  reviewsCount,
}: {
  rating: number | null;
  reviewsCount: number;
}) {
  if (typeof rating !== "number" || reviewsCount === 0) {
    return (
      <div className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-5 py-4 text-sm text-primary-foreground/75">
        Yeni profil — değerlendirme henüz yok
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 px-5 py-4 text-primary-foreground">
      <div className="flex items-center gap-2 text-2xl font-semibold">
        <Star className="h-5 w-5 fill-accent text-accent" strokeWidth={1.75} />
        {rating.toFixed(1)}
      </div>
      <div className="text-xs text-primary-foreground/65">
        {reviewsCount} değerlendirme
      </div>
    </div>
  );
}

function Bio({ bio }: { bio: string | null }) {
  return (
    <section aria-labelledby="bio-heading">
      <h2 id="bio-heading" className="font-serif text-2xl font-semibold tracking-tight">
        Hakkında
      </h2>
      {bio ? (
        <div className="prose-legal mt-4 max-w-none">
          {bio.split(/\n+/).map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-muted-foreground">
          Avukat henüz tanıtım metni eklemedi.
        </p>
      )}
    </section>
  );
}

function Reviews({
  isLoading,
  reviews,
}: {
  isLoading: boolean;
  reviews: PublicReview[];
}) {
  return (
    <section aria-labelledby="reviews-heading">
      <div className="flex items-center gap-2">
        <MessageSquareText className="h-5 w-5 text-accent" strokeWidth={1.75} />
        <h2 id="reviews-heading" className="font-serif text-2xl font-semibold tracking-tight">
          Müvekkil değerlendirmeleri
        </h2>
      </div>
      {isLoading ? (
        <p className="mt-4 text-muted-foreground">Yükleniyor…</p>
      ) : reviews.length === 0 ? (
        <p className="mt-4 text-muted-foreground">
          Henüz yayınlanmış bir değerlendirme yok.
        </p>
      ) : (
        <ul className="mt-6 space-y-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="rounded-xl border border-border bg-card p-5 shadow-soft"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={cn(
                        "h-4 w-4",
                        idx < review.rating
                          ? "fill-accent text-accent"
                          : "text-muted-foreground/40",
                      )}
                      strokeWidth={1.75}
                    />
                  ))}
                </div>
                <time className="text-xs text-muted-foreground" dateTime={review.created_at}>
                  {new Date(review.created_at).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
              {review.comment ? (
                <p className="mt-3 text-foreground/85 whitespace-pre-wrap">
                  {review.comment}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function PracticeAreas({
  areas,
}: {
  areas: { slug: string; name: string; shortDescription: string }[];
}) {
  return (
    <section aria-labelledby="practice-areas-heading">
      <h2
        id="practice-areas-heading"
        className="font-serif text-2xl font-semibold tracking-tight"
      >
        Hizmet alanları
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {areas.map((area) => (
          <li key={area.slug}>
            <Link
              to={`/hizmetler/${area.slug}`}
              className="group block rounded-lg border border-border bg-card p-4 shadow-soft transition-shadow hover:shadow-soft-lg"
            >
              <div className="font-medium">{area.name}</div>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {area.shortDescription}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs text-accent">
                Detayını gör
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ContactRail({
  lawyer,
  districtSlug,
  firstAreaSlug,
}: {
  lawyer: PublicLawyerProfile;
  districtSlug: string | null;
  firstAreaSlug: string;
}) {
  const ctaParams = new URLSearchParams();
  if (firstAreaSlug) ctaParams.set("practiceArea", firstAreaSlug);
  if (districtSlug) ctaParams.set("district", districtSlug);
  const ctaHref = ctaParams.toString()
    ? `/talep-olustur?${ctaParams.toString()}`
    : "/talep-olustur";

  return (
    <aside className="lg:sticky lg:top-24 self-start space-y-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-serif text-lg font-semibold">Bu avukatla görüş</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Davanızı kısaca anlatın, {lawyer.full_name.split(" ")[0]} ve diğer
          uzman avukatlardan teklif alın. Ücretsiz, taahhütsüz.
        </p>
        <Button asChild variant="cta" size="lg" className="mt-5 w-full">
          <Link to={ctaHref}>
            Ücretsiz teklif al
            <ChevronRight />
          </Link>
        </Button>

        <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" strokeWidth={1.75} />
            Genelde 24 saat içinde yanıt
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-accent" strokeWidth={1.75} />
            Bilgileriniz yalnızca seçtiğiniz avukatlarla paylaşılır
          </li>
        </ul>
      </div>

      {lawyer.email || lawyer.phone ? (
        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-serif text-lg font-semibold">İletişim</h3>
          <ul className="mt-3 space-y-2.5 text-sm">
            {lawyer.phone ? (
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" strokeWidth={1.75} />
                <a className="link-underline" href={`tel:${lawyer.phone}`}>
                  {lawyer.phone}
                </a>
              </li>
            ) : null}
            {lawyer.email ? (
              <li className="flex items-center gap-2">
                <MessageSquareText className="h-4 w-4 text-accent" strokeWidth={1.75} />
                <a className="link-underline" href={`mailto:${lawyer.email}`}>
                  {lawyer.email}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toLocaleUpperCase("tr-TR");
  const first = parts[0]![0] ?? "";
  const last = parts[parts.length - 1]![0] ?? "";
  return `${first}${last}`.toLocaleUpperCase("tr-TR");
}
