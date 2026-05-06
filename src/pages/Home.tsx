import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  BadgeCheck,
  MessageSquareText,
  Search,
  HandHeart,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MetaTags } from "@/components/seo/MetaTags";
import {
  JsonLd,
  organizationLd,
  websiteLd,
} from "@/components/seo/JsonLd";
import { LEGAL_CATEGORIES } from "@/data/legalCategories";
import { TOP_DISTRICTS } from "@/data/istanbulDistricts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title="İstanbul Avukat — Uzmanına Göre Avukat Bulun"
        description="İstanbul'da boşanma, ceza, iş, miras, gayrimenkul ve daha fazlası için doğrulanmış avukatları bulun. Ücretsiz teklif alın, karşılaştırın, karar verin."
        path="/"
        noSuffix
      />
      <JsonLd data={[organizationLd(), websiteLd()]} />

      <Header />
      <main className="flex-1">
        <Hero />
        <PracticeAreas />
        <HowItWorks />
        <DistrictStrip />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="container-main relative py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/85 text-xs font-medium tracking-wide mb-7 ring-1 ring-white/15">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            Tüm avukatlar İstanbul Barosu'na kayıtlıdır
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary-foreground leading-[1.05] tracking-tight text-balance">
            İstanbul'da Uzmanlık Alanınıza Göre{" "}
            <span className="text-accent">Avukat Bulun</span>
          </h1>

          <p className="mt-6 text-lg lg:text-xl text-primary-foreground/75 max-w-2xl mx-auto text-pretty">
            Doğrulanmış İstanbul avukatları arasından dakikalar içinde teklif
            alın. Boşanma, ceza, iş, miras ve diğer hukuk dallarında size en
            uygun avukatı seçin.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Button asChild variant="cta" size="xl" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-cta hover:shadow-cta-hover">
              <Link to="/talep-olustur">
                Ücretsiz Teklif Al
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="bg-white/10 text-primary-foreground border-white/25 hover:bg-white/15 hover:text-primary-foreground">
              <Link to="/hizmetler">Hukuk Dallarına Göz At</Link>
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-primary-foreground/85">
            <li className="inline-flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-accent" /> Ücretsiz
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" /> 24 saat içinde yanıt
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent" /> Bilgileriniz gizli
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function PracticeAreas() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-main">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold tracking-tight">
            Hangi konuda avukata ihtiyacınız var?
          </h2>
          <p className="mt-3 text-lg text-muted-foreground text-pretty">
            En çok başvurulan 12 hukuk dalında uzmanlaşmış İstanbul
            avukatlarıyla doğrudan iletişime geçin.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LEGAL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                to={`/hizmetler/${cat.slug}`}
                className="group relative bg-card border border-border/70 rounded-xl p-6 hover:border-accent/40 hover:shadow-soft transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="grid place-items-center w-11 h-11 rounded-md bg-secondary text-primary group-hover:bg-accent/10 group-hover:text-accent transition-colors shrink-0">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg font-semibold tracking-tight">
                      {cat.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {cat.shortDescription}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                      Avukat bul
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    icon: MessageSquareText,
    title: "Davanızı kısaca anlatın",
    body: "30 saniyenizi alır. Hukuk dalı, konum ve ihtiyacınızı seçin; iletişim bilgilerinizi bırakın.",
  },
  {
    icon: Search,
    title: "Uzmanlardan teklif alın",
    body: "Doğrulanmış İstanbul avukatları 24 saat içinde size dönüş yapar; teklifleri yan yana karşılaştırın.",
  },
  {
    icon: HandHeart,
    title: "Doğru avukatı seçin",
    body: "Profil, deneyim ve müvekkil değerlendirmelerini inceleyin; en güvendiğiniz avukatla görüşmeye başlayın.",
  },
];

function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/40 border-y border-border/60">
      <div className="container-main">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Nasıl çalışır
          </p>
          <h2 className="mt-3 font-serif text-3xl lg:text-4xl font-semibold tracking-tight">
            Üç basit adımda doğru avukata ulaşın
          </h2>
        </div>

        <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li
                key={step.title}
                className="relative bg-card rounded-xl p-7 border border-border/70"
              >
                <span className="absolute -top-3 -left-3 grid place-items-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-serif text-base shadow-soft">
                  {i + 1}
                </span>
                <span className="grid place-items-center w-12 h-12 rounded-md bg-accent/10 text-accent">
                  <Icon className="w-6 h-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function DistrictStrip() {
  return (
    <section className="py-20 lg:py-24">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-4xl">
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold tracking-tight">
              İlçeye göre İstanbul avukatları
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Size en yakın ilçedeki avukatları görüntüleyin.
            </p>
          </div>
          <Link
            to="/avukat-bul"
            className="text-sm font-medium text-accent hover:underline shrink-0"
          >
            Tüm ilçeleri gör →
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {TOP_DISTRICTS.map((d) => (
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
    </section>
  );
}

function FinalCta() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-main">
        <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-10 md:p-16 shadow-soft-xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 80% 20%, hsl(36 50% 48% / 0.30), transparent 60%)",
            }}
          />
          <div className="relative max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
              Davanızı doğru avukatla başlatın.
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
              Uzmanlık alanını ve deneyimini gördüğünüz avukatlardan teklif
              alın. Hiçbir taahhüt vermeden karşılaştırın, kararı siz verin.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild variant="cta" size="xl" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/talep-olustur">
                  Ücretsiz Teklif Al
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="xl" className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                <Link to="/avukat-kayit">Avukatım, kaydolmak istiyorum</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
