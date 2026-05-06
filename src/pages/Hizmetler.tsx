import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MetaTags } from "@/components/seo/MetaTags";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { LEGAL_CATEGORIES } from "@/data/legalCategories";

export default function Hizmetler() {
  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title="Hukuk Dalları — İstanbul'da Uzmanına Göre Avukat"
        description="Boşanma, ceza, iş, miras, gayrimenkul, ticaret ve diğer hukuk dallarında İstanbul'un doğrulanmış avukatlarına ulaşın."
        path="/hizmetler"
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Hizmetler", path: "/hizmetler" },
        ])}
      />

      <Header />
      <main className="flex-1">
        <section className="hero-gradient border-b border-border/40">
          <div className="container-main py-16 lg:py-20">
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
              <span className="text-primary-foreground/85">Hizmetler</span>
            </nav>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary-foreground tracking-tight text-balance max-w-3xl">
              Tüm hukuk dallarında{" "}
              <span className="text-accent">İstanbul avukatları</span>
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/75 max-w-2xl">
              Davanızın türünü seçin, alanında uzmanlaşmış avukatlardan
              ücretsiz teklif alın.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {LEGAL_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.slug}
                    to={`/hizmetler/${cat.slug}`}
                    className="group relative bg-card border border-border/70 rounded-xl p-7 hover:border-accent/40 hover:shadow-soft transition-all"
                  >
                    <div className="flex items-start gap-5">
                      <span className="grid place-items-center w-12 h-12 rounded-md bg-secondary text-primary group-hover:bg-accent/10 group-hover:text-accent transition-colors shrink-0">
                        <Icon className="w-6 h-6" strokeWidth={1.75} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-serif text-xl font-semibold tracking-tight">
                          {cat.name}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {cat.shortDescription}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {cat.caseTypes.slice(0, 3).map((t) => (
                            <li
                              key={t}
                              className="text-xs px-2 py-1 rounded-full bg-secondary/70 text-foreground/70"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                          Detay ve avukatlar
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-16 rounded-xl bg-secondary/40 border border-border/70 p-8 md:p-10 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">
                Aradığınız alan listede yok mu?
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Davanızı kısaca anlatın; ihtiyacınıza uygun avukatları sizinle
                eşleştirelim.
              </p>
              <div className="mt-6 inline-flex">
                <Button asChild variant="cta" size="lg">
                  <Link to="/talep-olustur">
                    Ücretsiz Teklif Al
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
