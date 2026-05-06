import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  getAvatarPublicUrl,
  initialsFromName,
} from "@/lib/avatar";
import { findCategory } from "@/data/legalCategories";
import { findDistrict } from "@/data/istanbulDistricts";
import { cn } from "@/lib/utils";

type StatusFilter = "all" | "pending" | "verified" | "rejected";
type ActiveFilter = "all" | "active" | "inactive";

interface LawyerRow {
  id: string;
  slug: string;
  full_name: string;
  bar_association: string;
  bar_number: string | null;
  district: string | null;
  practice_areas: string[];
  avatar_url: string | null;
  verification_status: "pending" | "verified" | "rejected";
  is_active: boolean;
  rating: number | null;
  reviews_count: number;
  created_at: string;
}

export default function AdminLawyers() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [searchInput, setSearchInput] = useState("");

  const lawyersQuery = useQuery({
    queryKey: ["admin-lawyers", statusFilter, activeFilter],
    queryFn: async (): Promise<LawyerRow[]> => {
      let builder = supabase
        .from("lawyer_profiles")
        .select(
          "id, slug, full_name, bar_association, bar_number, district, practice_areas, avatar_url, verification_status, is_active, rating, reviews_count, created_at",
        )
        .order("created_at", { ascending: false });
      if (statusFilter !== "all") {
        builder = builder.eq("verification_status", statusFilter);
      }
      if (activeFilter !== "all") {
        builder = builder.eq("is_active", activeFilter === "active");
      }
      const { data, error } = await builder;
      if (error) throw error;
      return (data ?? []) as LawyerRow[];
    },
  });

  const lawyers = lawyersQuery.data ?? [];

  const filtered = useMemo(() => {
    if (!searchInput.trim()) return lawyers;
    const q = searchInput.trim().toLocaleLowerCase("tr");
    return lawyers.filter((l) => l.full_name.toLocaleLowerCase("tr").includes(q));
  }, [lawyers, searchInput]);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-muted-foreground">Avukatlar</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
          Tüm avukat kayıtları
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Doğrulanmış, bekleyen ve reddedilmiş avukat profillerini görüntüleyin.
          Bir avukatı geçici olarak dizinden gizlemek için "aktif"
          durumunu kapatabilirsiniz.
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="İsme göre ara..."
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterTabs
            label="Durum"
            options={[
              { value: "all", label: "Tümü" },
              { value: "pending", label: "Bekleyen" },
              { value: "verified", label: "Doğrulanmış" },
              { value: "rejected", label: "Reddedilmiş" },
            ]}
            value={statusFilter}
            onChange={(v) => setStatusFilter(v as StatusFilter)}
          />
          <FilterTabs
            label="Aktiflik"
            options={[
              { value: "all", label: "Tümü" },
              { value: "active", label: "Aktif" },
              { value: "inactive", label: "Pasif" },
            ]}
            value={activeFilter}
            onChange={(v) => setActiveFilter(v as ActiveFilter)}
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {lawyersQuery.isLoading
          ? "Yükleniyor…"
          : `${filtered.length} kayıt`}
      </p>

      {lawyersQuery.isLoading ? (
        <Skeleton />
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {filtered.map((lawyer) => (
            <LawyerRowCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterTabs<V extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: V; label: string }>;
  value: V;
  onChange: (v: V) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}:
      </span>
      <div className="inline-flex rounded-lg bg-card border border-border/70 p-1 text-sm">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "px-3 py-1 rounded-md font-medium transition-colors",
              value === o.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function LawyerRowCard({ lawyer }: { lawyer: LawyerRow }) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const district = lawyer.district ? findDistrict(lawyer.district) : null;
  const avatarSrc = getAvatarPublicUrl(lawyer.avatar_url);

  const toggleActive = useMutation({
    mutationFn: async () => {
      const { error: rpcError } = await supabase.rpc("set_lawyer_active", {
        p_lawyer_id: lawyer.id,
        p_active: !lawyer.is_active,
      });
      if (rpcError) throw new Error(rpcError.message);
    },
    onSuccess: () => {
      setError(null);
      queryClient.invalidateQueries({ queryKey: ["admin-lawyers"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
    },
    onError: (err: Error) => setError(err.message ?? "Güncellenemedi."),
  });

  return (
    <article className="bg-card rounded-xl border border-border/70 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-secondary grid place-items-center shrink-0">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={lawyer.full_name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="font-serif text-base text-muted-foreground">
              {initialsFromName(lawyer.full_name)}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-serif text-lg font-semibold tracking-tight truncate">
              {lawyer.full_name}
            </h2>
            <VerificationPill status={lawyer.verification_status} />
            {!lawyer.is_active ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                <EyeOff className="w-3 h-3" />
                Dizinde gizli
              </span>
            ) : null}
          </div>

          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>
              {lawyer.bar_association}
              {lawyer.bar_number ? ` · ${lawyer.bar_number}` : ""}
            </span>
            {district ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {district.name}
              </span>
            ) : null}
            {lawyer.rating !== null ? (
              <span>
                ⭐ {lawyer.rating.toFixed(1)} · {lawyer.reviews_count} değerlendirme
              </span>
            ) : null}
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {lawyer.practice_areas.map((slug) => {
              const cat = findCategory(slug);
              return (
                <span
                  key={slug}
                  className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary text-foreground/85 text-xs font-medium"
                >
                  {cat?.shortName ?? slug}
                </span>
              );
            })}
          </div>

          {error ? (
            <div
              role="alert"
              className="mt-3 flex items-start gap-2 px-3 py-2 rounded-md bg-destructive/10 text-destructive text-xs"
            >
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 shrink-0">
          {lawyer.verification_status === "verified" ? (
            <a
              href={`/avukat/${lawyer.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 h-9 rounded-md text-sm font-medium border border-input hover:bg-secondary transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Profili gör
            </a>
          ) : null}
          <Button
            type="button"
            variant={lawyer.is_active ? "outline" : "primary"}
            size="md"
            onClick={() => toggleActive.mutate()}
            disabled={toggleActive.isPending}
          >
            {toggleActive.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : lawyer.is_active ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            {lawyer.is_active ? "Dizinden gizle" : "Dizinde göster"}
          </Button>
        </div>
      </div>
    </article>
  );
}

function VerificationPill({
  status,
}: {
  status: "pending" | "verified" | "rejected";
}) {
  const map = {
    pending: { label: "Bekliyor", className: "bg-amber-100 text-amber-800" },
    verified: {
      label: "Doğrulanmış",
      className: "bg-accent/15 text-accent",
    },
    rejected: {
      label: "Reddedilmiş",
      className: "bg-destructive/10 text-destructive",
    },
  } as const;
  const { label, className } = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
        className,
      )}
    >
      {status === "verified" ? <ShieldCheck className="w-3 h-3" /> : null}
      {label}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="bg-card rounded-xl border border-border/70 p-10 text-center">
      <div className="grid place-items-center w-12 h-12 rounded-md bg-secondary text-primary mx-auto">
        <Users className="w-6 h-6" strokeWidth={1.75} />
      </div>
      <p className="mt-4 text-muted-foreground max-w-md mx-auto">
        Bu filtreye uyan avukat bulunmuyor.
      </p>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-28 bg-muted/50 animate-pulse rounded-xl" />
      ))}
    </div>
  );
}
