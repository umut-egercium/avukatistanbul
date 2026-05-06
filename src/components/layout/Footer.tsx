import { Link } from "react-router-dom";
import { Scale, Mail } from "lucide-react";

import { LEGAL_CATEGORIES } from "@/data/legalCategories";
import { TOP_DISTRICTS } from "@/data/istanbulDistricts";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="container-main py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid place-items-center w-9 h-9 rounded-md bg-primary text-primary-foreground">
                <Scale className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <span className="font-serif text-xl font-semibold tracking-tight">
                Avukat<span className="text-accent">Istanbul</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              İstanbul'da uzmanlık alanına göre doğrulanmış avukatları bulmanın
              en hızlı yolu.
            </p>
            <a
              href="mailto:hello@avukatistanbul.com"
              className="mt-5 inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              hello@avukatistanbul.com
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground font-sans tracking-tight">
              Hukuk Dalları
            </h3>
            <ul className="mt-4 space-y-2.5">
              {LEGAL_CATEGORIES.slice(0, 8).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/hizmetler/${cat.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground font-sans tracking-tight">
              İlçeye Göre
            </h3>
            <ul className="mt-4 space-y-2.5">
              {TOP_DISTRICTS.slice(0, 8).map((d) => (
                <li key={d.slug}>
                  <Link
                    to={`/avukat-bul/${d.slug}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {d.name} Avukatları
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground font-sans tracking-tight">
              Şirket
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/talep-olustur"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Ücretsiz Teklif Al
                </Link>
              </li>
              <li>
                <Link
                  to="/avukat-kayit"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Avukat Olarak Kaydol
                </Link>
              </li>
              <li>
                <Link
                  to="/hizmetler"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tüm Hizmetler
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <p>© {year} AvukatIstanbul. Tüm hakları saklıdır.</p>
          <p className="text-pretty max-w-md">
            Bu site avukatlık hizmeti vermez; İstanbul Barosu'na kayıtlı
            avukatlar ile danışan adaylarını buluşturan tarafsız bir
            platformdur.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
