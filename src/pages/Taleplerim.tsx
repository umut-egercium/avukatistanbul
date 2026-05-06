// Anonymous "my requests" — reads localStorage tokens written by the request
// flow. Real implementation (status updates, lawyer responses) lands when the
// quotes / lead-notification side ships.
import { useQueries } from "@tanstack/react-query";
import { ChevronRight, ClipboardList, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MetaTags } from "@/components/seo/MetaTags";
import { Button } from "@/components/ui/button";
import { ISTANBUL_DISTRICTS } from "@/data/istanbulDistricts";
import { LEGAL_CATEGORIES } from "@/data/legalCategories";
import { supabase } from "@/integrations/supabase/client";

interface PersistedToken {
  request_id: string;
  token: string;
  created_at: string;
}

interface AnonymousRequest {
  id: string;
  customer_name: string;
  practice_area: string;
  case_type: string | null;
  district: string | null;
  urgency: string | null;
  description: string | null;
  status: string;
  created_at: string;
}

const TOKEN_STORAGE_KEY = "anonymous_request_tokens";

function readPersistedTokens(): PersistedToken[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as PersistedToken[];
    return list.filter((entry) => entry.request_id && entry.token);
  } catch {
    return [];
  }
}

export default function Taleplerim() {
  const [tokens, setTokens] = useState<PersistedToken[]>([]);

  useEffect(() => {
    setTokens(readPersistedTokens());
  }, []);

  const queries = useQueries({
    queries: tokens.map((entry) => ({
      queryKey: ["anonymous-request", entry.request_id, entry.token],
      queryFn: async () => {
        const { data, error } = await supabase.rpc("get_anonymous_request", {
          p_request_id: entry.request_id,
          p_token: entry.token,
        });
        if (error) throw error;
        const row = Array.isArray(data) ? data[0] : data;
        return (row as AnonymousRequest | undefined) ?? null;
      },
    })),
  });

  const loaded = queries.every((q) => !q.isLoading);
  const requests = queries
    .map((q, idx) => ({ token: tokens[idx]!, data: q.data }))
    .filter((entry): entry is { token: PersistedToken; data: AnonymousRequest } => !!entry.data);

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title="Taleplerim"
        description="Bu cihazda kayıtlı taleplerinizi görüntüleyin."
        path="/taleplerim"
        noindex
      />

      <Header />
      <main className="flex-1">
        <section className="hero-gradient border-b border-border/40">
          <div className="container-main py-12 lg:py-16">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-sm text-primary-foreground/65 mb-5"
            >
              <Link to="/" className="hover:text-primary-foreground transition-colors">
                Ana Sayfa
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-primary-foreground/85">Taleplerim</span>
            </nav>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-primary-foreground tracking-tight text-balance">
              Bu cihazdaki talepler
            </h1>
            <p className="mt-3 max-w-2xl text-primary-foreground/75">
              Tarayıcınızda kayıtlı taleplerinizi burada görebilirsiniz.
              Hesap açmadan oluşturulan talepler yalnızca bu cihazda hatırlanır.
            </p>
          </div>
        </section>

        <section className="py-14 lg:py-18">
          <div className="container-main">
            <div className="mx-auto max-w-3xl space-y-6">
              {!loaded ? (
                <p className="text-muted-foreground">Yükleniyor…</p>
              ) : requests.length === 0 ? (
                <EmptyState />
              ) : (
                <ul className="space-y-4">
                  {requests.map(({ token, data }) => (
                    <li key={data.id}>
                      <RequestRow entry={token} request={data} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
      <ClipboardList
        className="mx-auto h-10 w-10 text-muted-foreground/60"
        strokeWidth={1.5}
      />
      <h2 className="mt-4 font-serif text-xl font-semibold">
        Bu cihazda kayıtlı talep bulunmuyor
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Henüz hiç talep oluşturmadıysanız ya da farklı bir cihaz kullandıysanız
        burası boş görünür.
      </p>
      <div className="mt-6">
        <Button variant="cta" size="md" asChild>
          <Link to="/talep-olustur">Yeni talep oluştur</Link>
        </Button>
      </div>
    </div>
  );
}

function RequestRow({
  entry,
  request,
}: {
  entry: PersistedToken;
  request: AnonymousRequest;
}) {
  const practiceArea =
    LEGAL_CATEGORIES.find((c) => c.slug === request.practice_area)?.name ??
    request.practice_area;
  const district = request.district
    ? (ISTANBUL_DISTRICTS.find((d) => d.slug === request.district)?.name ??
      request.district)
    : null;

  return (
    <Link
      to={`/talep-basarili?id=${entry.request_id}&token=${entry.token}`}
      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-foreground/20"
    >
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          {new Date(request.created_at).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="mt-1 truncate font-medium text-foreground">
          {practiceArea}
          {request.case_type ? ` • ${request.case_type}` : ""}
        </div>
        <div className="mt-0.5 text-sm text-muted-foreground">
          {district ?? "İstanbul"} • Durum: {request.status === "open" ? "Açık" : request.status}
        </div>
      </div>
      <ExternalLink
        className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
        strokeWidth={1.75}
      />
    </Link>
  );
}
