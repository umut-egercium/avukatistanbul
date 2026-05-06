import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MetaTags } from "@/components/seo/MetaTags";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title="Sayfa bulunamadı"
        description="Aradığınız sayfa mevcut değil. AvukatIstanbul ana sayfasından devam edin."
        path={null}
        noindex
      />

      <Header />
      <main className="flex-1 grid place-items-center py-24">
        <div className="container-main text-center max-w-xl">
          <p className="font-serif text-7xl text-muted-foreground/40 leading-none mb-3">
            404
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
            Aradığınız sayfa bulunamadı
          </h1>
          <p className="mt-4 text-muted-foreground">
            Bu sayfa kaldırılmış veya hiç var olmamış olabilir. Ana sayfadan
            yola devam edebilirsiniz.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="cta" size="lg">
              <Link to="/">
                Ana sayfaya dön
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/hizmetler">Hukuk dalları</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
