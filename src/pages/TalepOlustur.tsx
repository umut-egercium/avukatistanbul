import { Link } from "react-router-dom";
import { ChevronRight, Clock, ShieldCheck, BadgeCheck } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MetaTags } from "@/components/seo/MetaTags";

export default function TalepOlustur() {
  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title="Ücretsiz Teklif Al — Avukatınız İçin Talep Oluşturun"
        description="Davanızı kısaca anlatın, İstanbul'un doğrulanmış avukatları 24 saat içinde size dönsün. Ücretsiz, taahhütsüz."
        path="/talep-olustur"
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
              <span className="text-primary-foreground/85">Talep Oluştur</span>
            </nav>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary-foreground tracking-tight text-balance max-w-3xl">
              Davanızı anlatın, <span className="text-accent">teklifler size gelsin</span>
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/75 max-w-2xl">
              30 saniye içinde davanızı tarif edin. Doğrulanmış İstanbul
              avukatları 24 saat içinde size yanıt versin.
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-primary-foreground/80">
              <li className="inline-flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-accent" /> Ücretsiz
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent" /> 24 saat içinde yanıt
              </li>
              <li className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent" /> Bilgileriniz
                gizli
              </li>
            </ul>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-main">
            <div className="max-w-2xl mx-auto rounded-xl border border-dashed border-border bg-card p-10 text-center">
              <h2 className="font-serif text-2xl font-semibold mb-3">
                Talep formu yakında aktif
              </h2>
              <p className="text-muted-foreground">
                Müşteri talep akışı şu anda geliştiriliyor. İhtiyacınız varsa
                bu süreçte{" "}
                <a
                  href="mailto:hello@avukatistanbul.net"
                  className="text-accent font-medium link-underline"
                >
                  hello@avukatistanbul.net
                </a>{" "}
                adresine yazabilirsiniz.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
