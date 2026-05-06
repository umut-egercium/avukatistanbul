import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight, ChevronRight, ShieldCheck, Clock } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MetaTags } from "@/components/seo/MetaTags";
import {
  JsonLd,
  breadcrumbLd,
  legalServiceLd,
  faqLd,
} from "@/components/seo/JsonLd";
import { findCategory, LEGAL_CATEGORIES } from "@/data/legalCategories";
import {
  bosanmaHukukuArticle,
  type CategoryArticle,
} from "@/content/categories/bosanma-hukuku";
import { cezaHukukuArticle } from "@/content/categories/ceza-hukuku";
import { isHukukuArticle } from "@/content/categories/is-hukuku";
import { tazminatHukukuArticle } from "@/content/categories/tazminat-hukuku";
import { mirasHukukuArticle } from "@/content/categories/miras-hukuku";
import { gayrimenkulKiraHukukuArticle } from "@/content/categories/gayrimenkul-kira-hukuku";
import { ticaretHukukuArticle } from "@/content/categories/ticaret-hukuku";
import { icraIflasHukukuArticle } from "@/content/categories/icra-iflas-hukuku";
import { aileHukukuArticle } from "@/content/categories/aile-hukuku";
import { tuketiciHukukuArticle } from "@/content/categories/tuketici-hukuku";
import { yabancilarHukukuArticle } from "@/content/categories/yabancilar-hukuku";
import { kvkkBilisimHukukuArticle } from "@/content/categories/kvkk-bilisim-hukuku";

const ARTICLES: Record<string, CategoryArticle> = {
  "bosanma-hukuku": bosanmaHukukuArticle,
  "ceza-hukuku": cezaHukukuArticle,
  "is-hukuku": isHukukuArticle,
  "tazminat-hukuku": tazminatHukukuArticle,
  "miras-hukuku": mirasHukukuArticle,
  "gayrimenkul-kira-hukuku": gayrimenkulKiraHukukuArticle,
  "ticaret-hukuku": ticaretHukukuArticle,
  "icra-iflas-hukuku": icraIflasHukukuArticle,
  "aile-hukuku": aileHukukuArticle,
  "tuketici-hukuku": tuketiciHukukuArticle,
  "yabancilar-hukuku": yabancilarHukukuArticle,
  "kvkk-bilisim-hukuku": kvkkBilisimHukukuArticle,
};

export default function HizmetDetay() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/hizmetler" replace />;

  const category = findCategory(slug);
  if (!category) return <Navigate to="/hizmetler" replace />;

  const article = ARTICLES[slug];
  const path = `/hizmetler/${slug}`;
  const Icon = category.icon;

  const related = LEGAL_CATEGORIES.filter((c) => c.slug !== slug).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title={`${category.name} İstanbul — ${category.searchTerm.replace(/\b\w/g, (m) => m.toUpperCase())}`}
        description={category.metaDescription ?? category.longDescription}
        path={path}
      />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Hizmetler", path: "/hizmetler" },
            { name: category.name, path },
          ]),
          legalServiceLd({
            name: `${category.name} — İstanbul`,
            description: category.longDescription,
            serviceType: category.shortName,
            path,
          }),
          ...(article ? [faqLd(article.faqs)] : []),
        ]}
      />

      <Header />
      <main className="flex-1">
        <ArticleHero category={category} icon={Icon} />

        <div className="container-main py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <article className="lg:col-span-8 prose-legal max-w-none">
              {article ? (
                <>
                  <p className="text-lg leading-relaxed text-foreground/85 text-pretty">
                    {article.lead}
                  </p>

                  {article.sections.map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-24"
                    >
                      <h2>{section.title}</h2>
                      {section.body}
                    </section>
                  ))}

                  <FaqSection faqs={article.faqs} />
                </>
              ) : (
                <ComingSoon categoryName={category.name} />
              )}

              <InlineCta categoryName={category.name} />
            </article>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-8">
                {article ? <Toc sections={article.sections} /> : null}
                <CaseTypesPanel
                  caseTypes={category.caseTypes}
                  categoryName={category.name}
                />
                <RelatedAreas current={category.name} items={related} />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ArticleHero({
  category,
  icon: Icon,
}: {
  category: ReturnType<typeof findCategory> & object;
  icon: typeof ShieldCheck;
}) {
  return (
    <section className="hero-gradient relative overflow-hidden border-b border-border/40">
      <div className="container-main py-14 lg:py-20">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-primary-foreground/65 mb-6"
        >
          <Link to="/" className="hover:text-primary-foreground transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            to="/hizmetler"
            className="hover:text-primary-foreground transition-colors"
          >
            Hizmetler
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-primary-foreground/85">{category.shortName}</span>
        </nav>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="grid place-items-center w-12 h-12 rounded-md bg-accent/15 ring-1 ring-accent/30 text-accent">
              <Icon className="w-6 h-6" strokeWidth={1.75} />
            </span>
            <span className="font-medium text-accent uppercase tracking-wider text-xs">
              {category.searchTerm}
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary-foreground leading-[1.05] tracking-tight text-balance">
            {category.name} <span className="text-accent">İstanbul</span>
          </h1>
          <p className="mt-5 text-lg text-primary-foreground/75 max-w-2xl text-pretty">
            {category.longDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="cta" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link
                to={`/talep-olustur?practiceArea=${category.slug}`}
              >
                Bu alanda avukatla iletişime geç
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/10 text-primary-foreground border-white/25 hover:bg-white/15 hover:text-primary-foreground"
            >
              <Link to="/avukat-bul">Avukatları Görüntüle</Link>
            </Button>
          </div>

          <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-primary-foreground/80">
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent" /> Doğrulanmış İstanbul
              avukatları
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" /> 24 saat içinde yanıt
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Toc({
  sections,
}: {
  sections: CategoryArticle["sections"];
}) {
  return (
    <nav
      aria-label="Bu sayfada"
      className="bg-card rounded-xl border border-border/70 p-5"
    >
      <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Bu sayfada
      </h2>
      <ol className="space-y-2 text-sm">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="flex gap-2 text-foreground/75 hover:text-accent transition-colors"
            >
              <span className="text-muted-foreground tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{s.title}</span>
            </a>
          </li>
        ))}
        <li>
          <a
            href="#sss"
            className="flex gap-2 text-foreground/75 hover:text-accent transition-colors"
          >
            <span className="text-muted-foreground tabular-nums">SSS</span>
            <span>Sıkça sorulan sorular</span>
          </a>
        </li>
      </ol>
    </nav>
  );
}

function CaseTypesPanel({
  caseTypes,
  categoryName,
}: {
  caseTypes: string[];
  categoryName: string;
}) {
  return (
    <div className="bg-secondary/50 rounded-xl border border-border/70 p-5">
      <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        {categoryName} kapsamı
      </h2>
      <ul className="space-y-2 text-sm">
        {caseTypes.map((t) => (
          <li
            key={t}
            className="flex items-start gap-2 text-foreground/85 leading-snug"
          >
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function RelatedAreas({
  current,
  items,
}: {
  current: string;
  items: ReturnType<typeof findCategory>[];
}) {
  return (
    <div className="bg-card rounded-xl border border-border/70 p-5">
      <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        İlgili Hukuk Dalları
      </h2>
      <ul className="space-y-2.5">
        {items.map((c) =>
          c ? (
            <li key={c.slug}>
              <Link
                to={`/hizmetler/${c.slug}`}
                className="text-sm text-foreground/85 hover:text-accent transition-colors"
                aria-label={`${c.name} (${current} ile ilgili)`}
              >
                {c.name}
              </Link>
            </li>
          ) : null,
        )}
      </ul>
    </div>
  );
}

function FaqSection({ faqs }: { faqs: CategoryArticle["faqs"] }) {
  return (
    <section id="sss" className="scroll-mt-24">
      <h2>Sıkça sorulan sorular</h2>
      <div className="not-prose mt-6 divide-y divide-border/70 border-y border-border/70">
        {faqs.map((f) => (
          <details
            key={f.question}
            className="group py-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="cursor-pointer flex items-start justify-between gap-4 list-none">
              <span className="font-medium text-foreground text-base">
                {f.question}
              </span>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 transition-transform group-open:rotate-90" />
            </summary>
            <p
              className="mt-3 text-foreground/80 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: f.answer }}
            />
          </details>
        ))}
      </div>
    </section>
  );
}

function InlineCta({ categoryName }: { categoryName: string }) {
  return (
    <div className="not-prose mt-12 rounded-xl bg-primary text-primary-foreground p-8 md:p-10 shadow-soft-lg">
      <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">
        {categoryName} alanında bir avukatla görüşmeye hazır mısınız?
      </h2>
      <p className="mt-3 text-primary-foreground/80 max-w-xl">
        Davanızı kısaca anlatın; doğrulanmış İstanbul avukatları 24 saat
        içinde size dönsün. Ücretsiz, taahhütsüz.
      </p>
      <div className="mt-6">
        <Button asChild variant="cta" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/talep-olustur">
            Ücretsiz teklif al
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function ComingSoon({ categoryName }: { categoryName: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-secondary/40 p-10 text-center">
      <h2 className="font-serif text-2xl font-semibold mb-3">
        {categoryName} sayfası hazırlanıyor
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        Bu hukuk dalına özel detaylı içerik yakında yayında. Bu arada davanızı
        anlatabilir, doğrulanmış {categoryName.toLowerCase()} avukatlarından
        teklif alabilirsiniz.
      </p>
    </div>
  );
}
