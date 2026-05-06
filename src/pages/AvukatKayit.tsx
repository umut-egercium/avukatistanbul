import { Link } from "react-router-dom";
import {
  ChevronRight,
  ShieldCheck,
  Users,
  Coins,
  TrendingUp,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MetaTags } from "@/components/seo/MetaTags";

const VALUE_PROPS = [
  {
    icon: Users,
    title: "Aradığı sizi bulan müvekkil",
    body: "Boşanma, ceza, iş, miras gibi yüksek niyetli arama yapan kullanıcılar size yönlendirilir; soğuk satış yapmazsınız.",
  },
  {
    icon: ShieldCheck,
    title: "Onaylı baro kaydı",
    body: "Profilinizde İstanbul Barosu sicil numaranız ve doğrulama rozetiniz yer alır; güven aşamasında müvekkil daha hızlı karar verir.",
  },
  {
    icon: Coins,
    title: "Sadece aldığınız lead için ödeyin",
    body: "Aylık abonelik yok. Yalnızca size ulaşan ve iletişim bilgilerini açtığınız davalar için kredi kullanırsınız.",
  },
  {
    icon: TrendingUp,
    title: "Görünür panel ve istatistikler",
    body: "Aldığınız teklif daveti, gönderdiğiniz teklif, kazanılan davalar ve ortalama yanıt sürenizi tek panelden takip edersiniz.",
  },
];

export default function AvukatKayit() {
  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title="Avukat Olarak Kaydolun — İstanbul'da Yeni Müvekkillere Ulaşın"
        description="İstanbul Barosu'na kayıtlı avukatlar için: Yüksek niyetli müvekkil adaylarına dakikalar içinde ulaşın. Sadece aldığınız lead için ödeme yapın."
        path="/avukat-kayit"
      />

      <Header />
      <main className="flex-1">
        <section className="hero-gradient border-b border-border/40">
          <div className="container-main py-14 lg:py-20">
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
              <span className="text-primary-foreground/85">Avukat Kayıt</span>
            </nav>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Avukatlar için
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary-foreground tracking-tight text-balance max-w-3xl">
              İstanbul'da yeni müvekkillere ulaşmanın{" "}
              <span className="text-accent">en doğrudan yolu</span>
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/75 max-w-2xl">
              Boşanma, ceza, iş, miras ve diğer hukuk dallarında aktif olarak
              avukat arayan kullanıcılar AvukatIstanbul'a gelir. Profilinizi
              oluşturun, ihtiyacınıza uygun talepleri seçin.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
              {VALUE_PROPS.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className="bg-card rounded-xl border border-border/70 p-6"
                  >
                    <span className="grid place-items-center w-11 h-11 rounded-md bg-accent/10 text-accent">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                    <h2 className="mt-4 font-serif text-xl font-semibold tracking-tight">
                      {p.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-16 max-w-2xl rounded-xl border border-dashed border-border bg-card p-10 text-center">
              <h2 className="font-serif text-2xl font-semibold mb-3">
                Avukat kayıt formu yakında
              </h2>
              <p className="text-muted-foreground">
                Avukat onboarding akışı geliştiriliyor. Erken erişim için{" "}
                <a
                  href="mailto:hello@avukatistanbul.net"
                  className="text-accent font-medium link-underline"
                >
                  hello@avukatistanbul.net
                </a>{" "}
                adresine yazın; doğrulamanız ve panelinizi sizin için
                hazırlayalım.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
