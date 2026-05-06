import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LawyerCard, type LawyerCardData } from "@/components/lawyer/LawyerCard";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { MetaTags } from "@/components/seo/MetaTags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ISTANBUL_DISTRICTS, findDistrict } from "@/data/istanbulDistricts";
import { LEGAL_CATEGORIES } from "@/data/legalCategories";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

export default function AvukatBul() {
  const { district: districtSlug } = useParams<{ district?: string }>();
  const district = districtSlug ? findDistrict(districtSlug) : null;
  const [searchParams, setSearchParams] = useSearchParams();

  const area = searchParams.get("area") ?? "";
  const q = searchParams.get("q") ?? "";
  const pageRaw = Number(searchParams.get("page"));
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;

  const [searchInput, setSearchInput] = useState(q);
  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  // Debounce free-text search → URL.
  useEffect(() => {
    if (searchInput === q) return;
    const handle = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (searchInput.trim()) next.set("q", searchInput.trim());
        else next.delete("q");
        next.delete("page");
        return next;
      });
    }, 250);
    return () => clearTimeout(handle);
  }, [searchInput, q, setSearchParams]);

  const queryKey = ["public-lawyers", { district: district?.slug, area, q, page }];

  const lawyersQuery = useQuery({
    queryKey,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let builder = supabase
        .from("public_lawyer_profiles")
        .select(
          "id, slug, full_name, bar_number, bar_association, practice_areas, district, avatar_url, rating, reviews_count, years_of_experience",
          { count: "exact" },
        )
        .order("rating", { ascending: false, nullsFirst: false })
        .order("reviews_count", { ascending: false })
        .range(from, to);

      if (district) builder = builder.eq("district", district.slug);
      if (area) builder = builder.contains("practice_areas", [area]);
      if (q) builder = builder.ilike("full_name", `%${q}%`);

      const { data, error, count } = await builder;
      if (error) throw error;
      return {
        lawyers: (data ?? []) as LawyerCardData[],
        total: count ?? 0,
      };
    },
  });

  const total = lawyersQuery.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const lawyers = lawyersQuery.data?.lawyers ?? [];

  const path = district ? `/avukat-bul/${district.slug}` : "/avukat-bul";

  const title = district
    ? `${district.name} Avukatları — İstanbul`
    : "İstanbul Avukatları — Doğrulanmış Listeler";

  const description = district
    ? `İstanbul ${district.name}'da hizmet veren, AvukatIstanbul tarafından doğrulanmış avukatların listesi.`
    : "İstanbul'un 39 ilçesinde hizmet veren doğrulanmış avukatları görüntüleyin, uzmanlık alanına göre filtreleyin.";

  const setArea = (next: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (next) params.set("area", next);
      else params.delete("area");
      params.delete("page");
      return params;
    });
  };

  const setPage = (next: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (next > 1) params.set("page", String(next));
      else params.delete("page");
      return params;
    });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const activeFilters = useMemo(() => {
    const filters: { label: string; clear: () => void }[] = [];
    if (area) {
      const cat = LEGAL_CATEGORIES.find((c) => c.slug === area);
      filters.push({
        label: `Uzmanlık: ${cat?.shortName ?? area}`,
        clear: () => setArea(""),
      });
    }
    if (q) {
      filters.push({
        label: `"${q}"`,
        clear: () => setSearchInput(""),
      });
    }
    return filters;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area, q]);

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
              <Link to="/" className="hover:text-primary-foreground transition-colors">
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
                  <span className="text-primary-foreground/85">{district.name}</span>
                </>
              ) : null}
            </nav>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary-foreground tracking-tight text-balance">
              {district ? (
                <>
                  {district.name} <span className="text-accent">Avukatları</span>
                </>
              ) : (
                <>
                  İstanbul <span className="text-accent">Avukatları</span>
                </>
              )}
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/75 max-w-2xl">
              {description}
            </p>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container-main space-y-10">
            <FilterBar
              areaSlug={area}
              onAreaChange={setArea}
              searchInput={searchInput}
              onSearchInputChange={setSearchInput}
            />

            {activeFilters.length > 0 ? (
              <ul className="-mt-6 flex flex-wrap items-center gap-2">
                <li className="text-sm text-muted-foreground">Aktif filtreler:</li>
                {activeFilters.map((filter) => (
                  <li key={filter.label}>
                    <button
                      type="button"
                      onClick={filter.clear}
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs hover:border-foreground/20"
                    >
                      {filter.label}
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            <div>
              {lawyersQuery.isLoading ? (
                <ResultsSkeleton />
              ) : lawyersQuery.error ? (
                <ErrorBlock />
              ) : lawyers.length === 0 ? (
                <EmptyState district={district?.name ?? null} />
              ) : (
                <>
                  <p className="mb-6 text-sm text-muted-foreground">
                    {total.toLocaleString("tr-TR")} avukat
                    {district ? ` • ${district.name}` : ""}
                  </p>
                  <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {lawyers.map((lawyer) => (
                      <li key={lawyer.id}>
                        <LawyerCard lawyer={lawyer} />
                      </li>
                    ))}
                  </ul>
                  <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </>
              )}
            </div>

            <div className="border-t border-border/60 pt-12">
              <h2 className="font-serif text-2xl font-semibold tracking-tight mb-6">
                Tüm İstanbul ilçeleri
              </h2>
              <div className="flex flex-wrap gap-2">
                {ISTANBUL_DISTRICTS.map((d) => (
                  <Link
                    key={d.slug}
                    to={`/avukat-bul/${d.slug}`}
                    className={cn(
                      "inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium transition-colors",
                      d.slug === district?.slug
                        ? "border-accent/40 bg-accent/10 text-accent-foreground"
                        : "bg-card border-border/70 hover:border-accent/40 hover:bg-accent/5",
                    )}
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

interface FilterBarProps {
  areaSlug: string;
  onAreaChange: (slug: string) => void;
  searchInput: string;
  onSearchInputChange: (value: string) => void;
}

function FilterBar({
  areaSlug,
  onAreaChange,
  searchInput,
  onSearchInputChange,
}: FilterBarProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <label
            htmlFor="lawyer-search"
            className="text-sm font-medium text-foreground/85"
          >
            İsme göre ara
          </label>
          <div className="relative mt-2">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              strokeWidth={1.75}
            />
            <Input
              id="lawyer-search"
              value={searchInput}
              onChange={(event) => onSearchInputChange(event.target.value)}
              placeholder="Avukat adı"
              className="pl-9"
              autoComplete="off"
              inputMode="search"
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground lg:text-right">
          {LEGAL_CATEGORIES.length} hukuk dalı • İstanbul
        </p>
      </div>

      <div className="mt-5">
        <div className="text-sm font-medium text-foreground/85">
          Uzmanlık alanı
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          <li>
            <button
              type="button"
              onClick={() => onAreaChange("")}
              aria-pressed={!areaSlug}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors",
                !areaSlug
                  ? "border-accent/40 bg-accent/10 text-foreground"
                  : "border-border bg-card hover:border-foreground/20",
              )}
            >
              Tümü
            </button>
          </li>
          {LEGAL_CATEGORIES.map((cat) => {
            const active = cat.slug === areaSlug;
            return (
              <li key={cat.slug}>
                <button
                  type="button"
                  onClick={() => onAreaChange(active ? "" : cat.slug)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-colors",
                    active
                      ? "border-accent/40 bg-accent/10 text-foreground"
                      : "border-border bg-card hover:border-foreground/20",
                  )}
                >
                  {cat.shortName}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav
      aria-label="Sayfalama"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        <ChevronLeft />
        Önceki
      </Button>
      <span className="text-sm text-muted-foreground">
        Sayfa {page} / {totalPages}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
      >
        Sonraki
        <ChevronRight />
      </Button>
    </nav>
  );
}

function ResultsSkeleton() {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <li
          key={idx}
          className="h-56 rounded-xl border border-border bg-card animate-pulse"
        />
      ))}
    </ul>
  );
}

function EmptyState({ district }: { district: string | null }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
      <h2 className="font-serif text-2xl font-semibold mb-3">
        Bu kriterlere uygun avukat bulunamadı
      </h2>
      <p className="text-muted-foreground">
        {district
          ? `${district} bölgesinde henüz doğrulanmış bir avukat profili yok.`
          : "Filtreleri genişletin ya da davanızı anlatarak teklif almayı deneyin."}
      </p>
      <div className="mt-6 inline-flex">
        <Button asChild variant="cta" size="lg">
          <Link to="/talep-olustur">
            Ücretsiz teklif al
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function ErrorBlock() {
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-foreground">
      <p className="font-medium">Liste yüklenemedi.</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Geçici bir bağlantı sorunu yaşandı. Lütfen sayfayı yenileyin.
      </p>
    </div>
  );
}
