import { useQuery } from "@tanstack/react-query";
import { Send, FileText, MapPin, Tag } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { findCategory } from "@/data/legalCategories";
import { findDistrict } from "@/data/istanbulDistricts";

interface QuoteRow {
  id: string;
  message: string;
  estimated_fee_min: number | null;
  estimated_fee_max: number | null;
  created_at: string;
  request_id: string;
  requests: {
    practice_area: string;
    case_type: string | null;
    district: string | null;
    customer_name: string;
    description: string | null;
    created_at: string;
    status: "open" | "matched" | "closed";
  } | null;
}

export default function PanelQuotes() {
  const { user } = useAuth();

  const profileQuery = useQuery({
    queryKey: ["lawyer-profile-id-quotes", user?.id ?? null],
    enabled: !!user,
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("lawyer_profiles")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data as { id: string } | null;
    },
  });

  const quotesQuery = useQuery({
    queryKey: ["my-sent-quotes", profileQuery.data?.id ?? null],
    enabled: !!profileQuery.data?.id,
    queryFn: async (): Promise<QuoteRow[]> => {
      if (!profileQuery.data) return [];
      const { data, error } = await supabase
        .from("quotes")
        .select(
          `id, message, estimated_fee_min, estimated_fee_max, created_at, request_id,
           requests:request_id (
             practice_area, case_type, district, customer_name, description, created_at, status
           )`,
        )
        .eq("lawyer_id", profileQuery.data.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as QuoteRow[];
    },
  });

  if (quotesQuery.isLoading) return <Skeleton />;
  const quotes = quotesQuery.data ?? [];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-muted-foreground">
          Tekliflerim
        </p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
          Gönderdiğiniz teklifler
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Müvekkil adaylarına gönderdiğiniz tüm teklifler burada
          listelenir. Müvekkilin görüntülemesi ve dönüş yapması zaman
          alabilir; "Gelen Talepler" sekmesinden takibinizi devam
          ettirebilirsiniz.
        </p>
      </header>

      {quotes.length === 0 ? <EmptyState /> : null}

      <div className="space-y-3">
        {quotes.map((q) => (
          <QuoteCard key={q.id} quote={q} />
        ))}
      </div>
    </div>
  );
}

function QuoteCard({ quote }: { quote: QuoteRow }) {
  const category = quote.requests
    ? findCategory(quote.requests.practice_area)
    : null;
  const district = quote.requests?.district
    ? findDistrict(quote.requests.district)
    : null;

  const fee = formatFeeRange(
    quote.estimated_fee_min,
    quote.estimated_fee_max,
  );

  return (
    <article className="bg-card rounded-xl border border-border/70 p-5 sm:p-6">
      <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground mb-2">
        <span className="text-foreground/85 font-medium">
          {new Date(quote.created_at).toLocaleString("tr-TR")}
        </span>
        {quote.requests?.status ? (
          <StatusPill status={quote.requests.status} />
        ) : null}
        {fee ? (
          <span className="ml-auto inline-flex items-center gap-1 text-foreground/80 font-medium">
            {fee}
          </span>
        ) : null}
      </div>

      <h2 className="font-serif text-lg font-semibold tracking-tight">
        {category?.name ?? quote.requests?.practice_area ?? "Talep"}
        {quote.requests?.case_type ? (
          <span className="text-muted-foreground font-normal text-base">
            {" • "}
            {quote.requests.case_type}
          </span>
        ) : null}
      </h2>

      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />
          {district?.name ?? "İstanbul"}
        </span>
        {quote.requests?.customer_name ? (
          <span>{quote.requests.customer_name}</span>
        ) : null}
      </div>

      {quote.requests?.description ? (
        <div className="mt-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
            Müvekkil notu
          </p>
          <p className="text-sm text-foreground/80 line-clamp-3">
            {quote.requests.description}
          </p>
        </div>
      ) : null}

      <div className="mt-4 pt-4 border-t border-border/60">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
          Teklifiniz
        </p>
        <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
          {quote.message}
        </p>
      </div>
    </article>
  );
}

function StatusPill({
  status,
}: {
  status: "open" | "matched" | "closed";
}) {
  const map = {
    open: { label: "Açık", className: "bg-accent/15 text-accent" },
    matched: { label: "Eşleşti", className: "bg-secondary text-foreground/85" },
    closed: { label: "Kapandı", className: "bg-muted text-muted-foreground" },
  } as const;
  const { label, className } = map[status];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}

function formatFeeRange(min: number | null, max: number | null): string | null {
  if (min === null && max === null) return null;
  const fmt = (n: number) =>
    new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(n);
  if (min !== null && max !== null) return `${fmt(min)} – ${fmt(max)} TL`;
  if (min !== null) return `${fmt(min)} TL+`;
  return `~${fmt(max!)} TL`;
}

function EmptyState() {
  return (
    <div className="bg-card rounded-xl border border-border/70 p-10 text-center">
      <div className="grid place-items-center w-12 h-12 rounded-md bg-secondary text-primary mx-auto">
        <FileText className="w-6 h-6" strokeWidth={1.75} />
      </div>
      <h2 className="mt-4 font-serif text-xl font-semibold tracking-tight">
        Henüz teklif göndermediniz
      </h2>
      <p className="mt-2 text-muted-foreground max-w-md mx-auto inline-flex items-start gap-2">
        <Tag className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
        <span>
          "Gelen Talepler" sekmesinden bir lead seçin, doğrudan oradan
          teklifinizi gönderin. Gönderdikleriniz burada görünecek.
        </span>
      </p>
      <p className="mt-3 text-xs text-muted-foreground inline-flex items-center gap-1">
        <Send className="w-3.5 h-3.5" />
        İpucu: Net bir çalışma planı + ücret aralığı, müvekkilin sizi seçme
        olasılığını artırır.
      </p>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-4">
      <div className="h-7 w-40 bg-muted animate-pulse rounded" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-32 bg-muted/50 animate-pulse rounded-xl" />
      ))}
    </div>
  );
}
