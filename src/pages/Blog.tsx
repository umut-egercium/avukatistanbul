import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Clock } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MetaTags } from "@/components/seo/MetaTags";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import {
  BLOG_POSTS_NEWEST_FIRST,
  type BlogPost,
} from "@/data/blogPosts";
import { LEGAL_CATEGORIES, findCategory } from "@/data/legalCategories";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 10;

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const areaFilter = params.get("area") ?? "";
  const pageParam = Number.parseInt(params.get("page") ?? "1", 10);
  const page = Number.isFinite(pageParam) && pageParam >= 1 ? pageParam : 1;

  const filtered = useMemo(() => {
    if (!areaFilter) return BLOG_POSTS_NEWEST_FIRST;
    return BLOG_POSTS_NEWEST_FIRST.filter((p) => p.practiceArea === areaFilter);
  }, [areaFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const visible = filtered.slice(start, start + POSTS_PER_PAGE);

  const setArea = (slug: string) => {
    const next = new URLSearchParams(params);
    if (slug) next.set("area", slug);
    else next.delete("area");
    next.delete("page");
    setParams(next, { replace: false });
  };

  const setPage = (n: number) => {
    const next = new URLSearchParams(params);
    if (n > 1) next.set("page", String(n));
    else next.delete("page");
    setParams(next, { replace: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeArea = areaFilter ? findCategory(areaFilter) : undefined;

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title={
          activeArea
            ? `${activeArea.name} Yazıları — İstanbul Hukuk Blog`
            : "İstanbul Hukuk Blog: Avukatlardan Pratik Rehberler"
        }
        description={
          activeArea
            ? `${activeArea.name} alanında 2026 güncel mevzuat ve mahkeme uygulamasıyla hazırlanmış yazılar.`
            : "Boşanma, ceza, iş hukuku, miras ve diğer alanlarda Türk hukukuna uygun, 2026 güncel rehber yazıları."
        }
        path={`/blog${activeArea ? `?area=${activeArea.slug}` : ""}`}
      />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />

      <Header />
      <main className="flex-1">
        <BlogHero activeArea={activeArea?.name} />

        <div className="container-main py-12 lg:py-16">
          <div className="mb-8 flex flex-wrap gap-2">
            <FilterPill active={!areaFilter} onClick={() => setArea("")}>
              Tümü
            </FilterPill>
            {LEGAL_CATEGORIES.map((cat) => (
              <FilterPill
                key={cat.slug}
                active={areaFilter === cat.slug}
                onClick={() => setArea(cat.slug)}
              >
                {cat.shortName}
              </FilterPill>
            ))}
          </div>

          {visible.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {totalPages > 1 ? (
            <Pagination
              page={safePage}
              totalPages={totalPages}
              onChange={setPage}
            />
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function BlogHero({ activeArea }: { activeArea: string | undefined }) {
  return (
    <section className="hero-gradient border-b border-border/40">
      <div className="container-main py-14 lg:py-20">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-primary-foreground/65 mb-6"
        >
          <Link to="/" className="hover:text-primary-foreground transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-primary-foreground/85">Blog</span>
        </nav>
        <div className="max-w-3xl">
          <span className="font-medium text-accent uppercase tracking-wider text-xs">
            İstanbul Hukuk Blog
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary-foreground leading-[1.05] tracking-tight text-balance">
            Avukatlardan{" "}
            <span className="text-accent">pratik rehberler</span>
          </h1>
          <p className="mt-5 text-lg text-primary-foreground/75 max-w-2xl text-pretty">
            {activeArea
              ? `${activeArea} alanında 2026 mevzuatı ve mahkeme uygulamasıyla hazırlanmış güncel yazılar.`
              : "Boşanmadan ceza hukukuna, iş hukukundan tüketici davalarına — hukuki süreçlerinizde ihtiyacınız olan güncel ve doğru bilgi."}
          </p>
        </div>
      </div>
    </section>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center px-4 h-9 rounded-full text-sm font-medium border transition-colors",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-foreground/80 border-border hover:bg-secondary",
      )}
    >
      {children}
    </button>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  const category = findCategory(post.practiceArea);
  return (
    <article className="group bg-card rounded-xl border border-border/70 p-6 flex flex-col hover:border-accent/50 transition-colors">
      {category ? (
        <Link
          to={`/blog?area=${category.slug}`}
          className="text-xs font-medium uppercase tracking-wider text-accent hover:underline self-start"
        >
          {category.shortName}
        </Link>
      ) : null}
      <h2 className="mt-3 font-serif text-xl font-semibold leading-tight tracking-tight text-balance">
        <Link
          to={`/blog/${post.slug}`}
          className="hover:text-accent transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mt-3 text-sm text-foreground/75 leading-relaxed text-pretty line-clamp-4">
        {post.excerpt}
      </p>
      <div className="mt-5 pt-5 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
        <time dateTime={post.publishedAt}>
          {formatTrDate(post.publishedAt)}
        </time>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {post.readingTimeMinutes} dk
        </span>
      </div>
      <Link
        to={`/blog/${post.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:gap-2.5 transition-[gap]"
      >
        Yazıyı oku
        <ArrowRight className="w-4 h-4" />
      </Link>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-secondary/40 p-10 text-center">
      <h2 className="font-serif text-2xl font-semibold mb-3">
        Bu alanda henüz yazı yok
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        Yakında eklenecek. Bu arada diğer hukuk dallarındaki yazılarımıza göz
        atabilirsiniz.
      </p>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (n: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav
      aria-label="Sayfalama"
      className="mt-12 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-border text-foreground/80 hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors"
        aria-label="Önceki sayfa"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {pages.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(
            "inline-flex items-center justify-center w-10 h-10 rounded-md border text-sm font-medium transition-colors",
            n === page
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-foreground/80 hover:bg-secondary",
          )}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-border text-foreground/80 hover:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors"
        aria-label="Sonraki sayfa"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

function formatTrDate(iso: string): string {
  const months = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
  ];
  const [y, m, d] = iso.split("-").map((s) => Number.parseInt(s, 10));
  if (!y || !m || !d) return iso;
  return `${d} ${months[m - 1]} ${y}`;
}
