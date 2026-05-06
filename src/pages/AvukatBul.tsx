import { Link, useParams } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MetaTags } from "@/components/seo/MetaTags";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import {
  ISTANBUL_DISTRICTS,
  findDistrict,
} from "@/data/istanbulDistricts";

export default function AvukatBul() {
  const { district: districtSlug } = useParams<{ district?: string }>();
  const district = districtSlug ? findDistrict(districtSlug) : null;

  const path = district
    ? `/avukat-bul/${district.slug}`
    : "/avukat-bul";

  const title = district
    ? `${district.name} Avukatları — İstanbul`
    : "İstanbul Avukatları — Doğrulanmış Listeler";

  const description = district
    ? `İstanbul ${district.name}'da hizmet veren, AvukatIstanbul tarafından doğrulanmış avukatların listesi.`
    : "İstanbul'un 39 ilçesinde hizmet veren doğrulanmış avukatları görüntüleyin, uzmanlık alanına göre filtreleyin.";

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags title={title} description={description} path={path} />
      <JsonLd
        data={breadcrumbLd(
          district
            ? [
                { name: "Ana Sayfa", path: "/" },
                { name: "Avukat Bul", path: "/avukat-bul" },
                { name: district.name, path },
              ]
            : [
                { name: "Ana Sayfa", path: "/" },
                { name: "Avukat Bul", path: "/avukat-bul" },
              ],
        )}
      />

      <Header />
      <main className="flex-1">
        <section className="hero-gradient border-b border-border/40">
          <div className="container-main py-14 lg:py-18">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm text-primary-foreground/65 mb-5"
            >
              <Link
                to="/"
                className="hover:text-primary-foreground transition-colors"
              >
                Ana Sayfa
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              {district ? (
                <Link
                  to="/avukat-bul"
                  className="hover:text-primary-foreground transition-colors"
                >
                  Avukat Bul
                </Link>
              ) : (
                <span className="text-primary-foreground/85">Avukat Bul</span>
              )}
              {district ? (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span className="text-primary-foreground/85">
                    {district.name}
                  </span>
                </>
              ) : null}
            </nav>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary-foreground tracking-tight text-balance">
              {district ? (
                <>
                  {district.name}{" "}
                  <span className="text-accent">Avukatları</span>
                </>
              ) : (
                <>
                  İstanbul{" "}
                  <span className="text-accent">Avukatları</span>
                </>
              )}
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/75 max-w-2xl">
              {description}
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-main">
            <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-2xl font-semibold mb-3">
                Avukat listesi yakında
              </h2>
              <p className="text-muted-foreground">
                Avukat profil sayfaları kısa süre içinde aktif olacak. Bu
                arada davanızı anlatın, size uygun avukatlardan teklif alın.
              </p>
              <div className="mt-6 inline-flex">
                <Button asChild variant="cta" size="lg">
                  <Link to="/talep-olustur">
                    Ücretsiz teklif al
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="font-serif text-2xl font-semibold tracking-tight mb-6">
                Tüm İstanbul ilçeleri
              </h2>
              <div className="flex flex-wrap gap-2">
                {ISTANBUL_DISTRICTS.map((d) => (
                  <Link
                    key={d.slug}
                    to={`/avukat-bul/${d.slug}`}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-card border border-border/70 hover:border-accent/40 hover:bg-accent/5 text-sm font-medium transition-colors"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
