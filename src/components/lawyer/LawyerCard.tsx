// Compact lawyer summary used by:
//  - the directory list (/avukat-bul)
//  - "related lawyers" rails on /hizmetler/:slug and /avukat/:slug
//  - admin queue views (Agent 3) — props are intentionally minimal so the
//    same shape can render in either context. Don't add Agent-3-specific
//    props here; pass them via children or a sibling component.

import { ArrowRight, Award, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { LEGAL_CATEGORIES } from "@/data/legalCategories";
import { ISTANBUL_DISTRICTS } from "@/data/istanbulDistricts";
import { cn } from "@/lib/utils";

export interface LawyerCardData {
  id: string;
  slug: string;
  full_name: string;
  bar_number: string | null;
  bar_association: string | null;
  practice_areas: string[];
  district: string | null;
  avatar_url: string | null;
  rating: number | null;
  reviews_count: number;
  years_of_experience: number | null;
}

interface LawyerCardProps {
  lawyer: LawyerCardData;
  className?: string;
  /** Compact rail variant used outside the main directory grid. */
  variant?: "default" | "compact";
}

export function LawyerCard({ lawyer, className, variant = "default" }: LawyerCardProps) {
  const initials = getInitials(lawyer.full_name);
  const districtName = lawyer.district
    ? (ISTANBUL_DISTRICTS.find((d) => d.slug === lawyer.district)?.name ??
      lawyer.district)
    : null;
  const topAreas = lawyer.practice_areas.slice(0, 3);
  const compact = variant === "compact";

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-xl border border-border bg-card shadow-soft transition-shadow hover:shadow-soft-lg",
        compact ? "p-5" : "p-6",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-secondary text-foreground/80">
          {lawyer.avatar_url ? (
            <img
              src={lawyer.avatar_url}
              alt={lawyer.full_name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-serif text-lg font-medium">
              {initials}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg font-semibold leading-tight text-foreground">
            <Link
              to={`/avukat/${lawyer.slug}`}
              className="link-underline"
            >
              {lawyer.full_name}
            </Link>
          </h3>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
            <Award className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
            {lawyer.bar_association ?? "İstanbul Barosu"}
            {lawyer.bar_number ? ` • Sicil ${lawyer.bar_number}` : ""}
          </p>
          {districtName ? (
            <p className="mt-0.5 text-sm text-muted-foreground">{districtName}</p>
          ) : null}
        </div>
      </div>

      {topAreas.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {topAreas.map((slug) => {
            const label =
              LEGAL_CATEGORIES.find((c) => c.slug === slug)?.shortName ?? slug;
            return (
              <li
                key={slug}
                className="inline-flex items-center rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-xs text-foreground/85"
              >
                {label}
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
        <div className="flex items-center gap-1.5 text-sm">
          {typeof lawyer.rating === "number" ? (
            <>
              <Star className="h-4 w-4 fill-accent text-accent" strokeWidth={1.75} />
              <span className="font-medium">{lawyer.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">
                ({lawyer.reviews_count})
              </span>
            </>
          ) : (
            <span className="text-muted-foreground">Yeni profil</span>
          )}
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link to={`/avukat/${lawyer.slug}`}>
            Profili görüntüle
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </article>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toLocaleUpperCase("tr-TR");
  const first = parts[0]![0] ?? "";
  const last = parts[parts.length - 1]![0] ?? "";
  return `${first}${last}`.toLocaleUpperCase("tr-TR");
}
