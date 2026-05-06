import { lazy, Suspense } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  ArrowLeft,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MetaTags } from "@/components/seo/MetaTags";
import {
  JsonLd,
  blogPostingLd,
  breadcrumbLd,
} from "@/components/seo/JsonLd";
import {
  findBlogPost,
  relatedBlogPosts,
  type BlogPost as BlogPostMeta,
} from "@/data/blogPosts";
import { findCategory } from "@/data/legalCategories";

// Each post body is a default-exported React component in src/content/blog/<slug>.tsx.
// Lazy-load so the index page doesn't pull every post into the initial bundle.
const LAZY_BODIES: Record<string, React.LazyExoticComponent<React.ComponentType>> =
  Object.fromEntries(
    Object.entries(
      import.meta.glob<{ default: React.ComponentType }>(
        "../content/blog/*.tsx",
      ),
    ).map(([path, loader]) => {
      const slug = path.split("/").pop()!.replace(/\.tsx$/, "");
      return [slug, lazy(loader)];
    }),
  );

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/blog" replace />;

  const post = findBlogPost(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const category = findCategory(post.practiceArea);
  const path = `/blog/${slug}`;
  const Body = LAZY_BODIES[slug];
  const related = relatedBlogPosts(slug);

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title={post.title}
        description={post.excerpt}
        path={path}
      />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Ana Sayfa", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path },
          ]),
          blogPostingLd({
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            path,
            authorName: post.authorName,
          }),
        ]}
      />

      <Header />
      <main className="flex-1">
        <PostHeader post={post} categoryName={category?.name} />

        <div className="container-main pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <article className="lg:col-span-8 prose-legal max-w-none">
              {Body ? (
                <Suspense fallback={<BodySkeleton />}>
                  <Body />
                </Suspense>
              ) : (
                <BodyMissing />
              )}

              {category ? (
                <RelatedHizmet
                  categoryName={category.name}
                  categorySlug={category.slug}
                />
              ) : null}

              <InlineCta categoryName={category?.name} />
            </article>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-8">
                <BackToBlog />
                {related.length > 0 ? (
                  <RelatedPosts posts={related} />
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function PostHeader({
  post,
  categoryName,
}: {
  post: BlogPostMeta;
  categoryName: string | undefined;
}) {
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
          <Link to="/blog" className="hover:text-primary-foreground transition-colors">
            Blog
          </Link>
          {categoryName ? (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link
                to={`/blog?area=${post.practiceArea}`}
                className="hover:text-primary-foreground transition-colors"
              >
                {categoryName}
              </Link>
            </>
          ) : null}
        </nav>
        <div className="max-w-3xl">
          {categoryName ? (
            <span className="font-medium text-accent uppercase tracking-wider text-xs">
              {categoryName}
            </span>
          ) : null}
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary-foreground leading-[1.1] tracking-tight text-balance">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-primary-foreground/80 max-w-2xl text-pretty">
            {post.excerpt}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-primary-foreground/75">
            <span>{post.authorName}</span>
            <span className="text-primary-foreground/40">•</span>
            <time dateTime={post.publishedAt}>
              {formatTrDate(post.publishedAt)}
            </time>
            <span className="text-primary-foreground/40">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" />
              {post.readingTimeMinutes} dk okuma
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function BackToBlog() {
  return (
    <Link
      to="/blog"
      className="inline-flex items-center gap-2 text-sm text-foreground/75 hover:text-accent transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      Tüm yazılar
    </Link>
  );
}

function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  return (
    <div className="bg-card rounded-xl border border-border/70 p-5">
      <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        İlgili yazılar
      </h2>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              to={`/blog/${p.slug}`}
              className="block group"
            >
              <h3 className="font-serif text-base leading-snug font-semibold text-foreground group-hover:text-accent transition-colors text-pretty">
                {p.title}
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground">
                {formatTrDate(p.publishedAt)} • {p.readingTimeMinutes} dk
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RelatedHizmet({
  categoryName,
  categorySlug,
}: {
  categoryName: string;
  categorySlug: string;
}) {
  return (
    <div className="not-prose mt-12 rounded-xl border border-border/70 bg-secondary/40 p-6">
      <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        İlgili hizmet
      </h3>
      <Link
        to={`/hizmetler/${categorySlug}`}
        className="font-serif text-xl font-semibold text-foreground hover:text-accent transition-colors"
      >
        {categoryName} İstanbul →
      </Link>
      <p className="mt-2 text-sm text-foreground/75">
        {categoryName} alanında çalışan İstanbul avukatlarının uzmanlık
        özetlerine bakın.
      </p>
    </div>
  );
}

function InlineCta({ categoryName }: { categoryName: string | undefined }) {
  const heading = categoryName
    ? `${categoryName} davası için bir avukatla görüşmeye hazır mısınız?`
    : "Davanız için bir avukatla görüşmeye hazır mısınız?";
  return (
    <div className="not-prose mt-10 rounded-xl bg-primary text-primary-foreground p-8 md:p-10 shadow-soft-lg">
      <h2 className="font-serif text-2xl md:text-3xl font-semibold tracking-tight">
        {heading}
      </h2>
      <p className="mt-3 text-primary-foreground/80 max-w-xl">
        Davanızı kısaca anlatın; doğrulanmış İstanbul avukatları 24 saat
        içinde size dönsün. Ücretsiz, taahhütsüz.
      </p>
      <div className="mt-6">
        <Button
          asChild
          variant="cta"
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Link to="/talep-olustur">
            Ücretsiz teklif al
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function BodySkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-5/6" />
      <div className="h-4 bg-muted rounded w-2/3" />
    </div>
  );
}

function BodyMissing() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-secondary/40 p-10 text-center">
      <h2 className="font-serif text-2xl font-semibold mb-3">
        Yazı hazırlanıyor
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        Bu yazının tam metni yakında yayınlanacak.
      </p>
    </div>
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
