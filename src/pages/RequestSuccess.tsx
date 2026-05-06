import { useQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  Bell,
  Bookmark,
  ChevronRight,
  ClipboardList,
  Clock,
  Handshake,
  Loader2,
  Send,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MetaTags } from "@/components/seo/MetaTags";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { ISTANBUL_DISTRICTS } from "@/data/istanbulDistricts";
import { LEGAL_CATEGORIES } from "@/data/legalCategories";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

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

function readPersistedToken(requestId: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!raw) return null;
    const list = JSON.parse(raw) as Array<{ request_id: string; token: string }>;
    return list.find((entry) => entry.request_id === requestId)?.token ?? null;
  } catch {
    return null;
  }
}

function persistToken(requestId: string, token: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    const list = raw
      ? (JSON.parse(raw) as Array<{
          request_id: string;
          token: string;
          created_at: string;
        }>)
      : [];
    if (list.some((entry) => entry.request_id === requestId)) return;
    list.push({ request_id: requestId, token, created_at: new Date().toISOString() });
    window.localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Storage unavailable — just continue.
  }
}

export default function RequestSuccess() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const tokenFromUrl = searchParams.get("token");
  const token = tokenFromUrl ?? (id ? readPersistedToken(id) : null);

  const enabled = !!id && !!token;

  const { data, isLoading, error } = useQuery<AnonymousRequest | null>({
    queryKey: ["anonymous-request", id, token],
    enabled,
    queryFn: async () => {
      if (!id || !token) return null;
      const { data, error } = await supabase.rpc("get_anonymous_request", {
        p_request_id: id,
        p_token: token,
      });
      if (error) throw error;
      const row = Array.isArray(data) ? data[0] : data;
      return (row as AnonymousRequest | undefined) ?? null;
    },
  });

  useEffect(() => {
    if (data && id && token) {
      trackEvent("customer_request_success_view", {
        request_id: id,
        practice_area: data.practice_area,
      });
    }
  }, [data, id, token]);

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title="Talebiniz Alındı"
        description="AvukatIstanbul talebiniz alındı. Doğrulanmış İstanbul avukatları kısa süre içinde sizinle iletişime geçecek."
        path={null}
        noindex
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
              <Link to="/talep-olustur" className="hover:text-primary-foreground transition-colors">
                Talep Oluştur
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-primary-foreground/85">Talebiniz Alındı</span>
            </nav>
            <div className="flex items-start gap-4">
              <span className="mt-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <BadgeCheck className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <div>
                <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-primary-foreground tracking-tight text-balance">
                  Talebiniz alındı
                </h1>
                <p className="mt-3 max-w-2xl text-primary-foreground/75">
                  Doğrulanmış İstanbul avukatları talebinizi inceledi olarak
                  görecek ve size dönecek. Aşağıda kaydettiğimiz özet yer
                  alıyor — saklamak için bu sayfayı yer imlerinize ekleyebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-18">
          <div className="container-main">
            <div className="mx-auto max-w-3xl space-y-10">
              <RequestSummary
                state={
                  !enabled
                    ? "missing"
                    : isLoading
                      ? "loading"
                      : error
                        ? "error"
                        : data
                          ? "ready"
                          : "missing"
                }
                request={data ?? null}
              />

              <NextSteps />

              {enabled && id && token ? (
                <FollowAction
                  onFollow={() => {
                    persistToken(id, token);
                    toast.success("Talebiniz takibe alındı", {
                      description: "Bu cihazda /taleplerim sayfasından erişebilirsiniz.",
                    });
                    trackEvent("customer_request_follow_saved", { request_id: id });
                  }}
                />
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

interface SummaryProps {
  state: "loading" | "ready" | "error" | "missing";
  request: AnonymousRequest | null;
}

function RequestSummary({ state, request }: SummaryProps) {
  const practiceAreaName = useMemo(() => {
    if (!request) return null;
    return (
      LEGAL_CATEGORIES.find((c) => c.slug === request.practice_area)?.name ??
      request.practice_area
    );
  }, [request]);

  const districtName = useMemo(() => {
    if (!request?.district) return null;
    return (
      ISTANBUL_DISTRICTS.find((d) => d.slug === request.district)?.name ??
      request.district
    );
  }, [request]);

  if (state === "loading") {
    return (
      <div className="rounded-xl border border-border bg-card p-8 flex items-center gap-3 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin text-accent" />
        Talep özeti yükleniyor…
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-foreground">
        <p className="font-medium">Özet getirilemedi.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Talebinizi başarıyla aldık ancak özet yüklenirken bir hata oluştu.
          Sayfayı yenileyebilirsiniz.
        </p>
      </div>
    );
  }

  if (state === "missing" || !request) {
    return (
      <div className="rounded-xl border border-border bg-card p-8">
        <p className="font-medium">Talebiniz alındı.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Detaylı bir özet görüntülemek için talep oluşturma akışından gelmeniz
          ya da takip ettiğiniz cihazı kullanmanız gerekiyor.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-soft">
      <h2 className="font-serif text-xl font-semibold mb-5">Talep özeti</h2>
      <dl className="grid gap-y-4 sm:grid-cols-3 sm:gap-x-6">
        <SummaryRow label="Hukuk dalı" value={practiceAreaName} />
        {request.case_type ? (
          <SummaryRow label="Dava türü" value={request.case_type} />
        ) : null}
        {districtName ? (
          <SummaryRow label="İlçe" value={districtName} />
        ) : null}
        {request.urgency ? (
          <SummaryRow label="Aciliyet" value={URGENCY_LABEL[request.urgency] ?? request.urgency} />
        ) : null}
        <SummaryRow label="Durum" value="Açık (yeni)" />
      </dl>
      {request.description ? (
        <div className="mt-6 rounded-lg bg-secondary/60 p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Açıklamanız
          </div>
          <p className="mt-1.5 text-sm text-foreground/85 whitespace-pre-wrap">
            {request.description}
          </p>
        </div>
      ) : null}
    </div>
  );
}

const URGENCY_LABEL: Record<string, string> = {
  urgent: "Acil",
  soon: "Yakında",
  flexible: "Esnek",
};

function SummaryRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-foreground/90">{value ?? "—"}</dd>
    </div>
  );
}

function NextSteps() {
  const items = [
    {
      icon: Send,
      title: "Avukatlara iletildi",
      body: "Doğrulanmış İstanbul avukatlarına talebiniz iletildi.",
    },
    {
      icon: Bell,
      title: "Yanıtlar size dönecek",
      body: "İlgilenen avukatlar 24 saat içinde sizinle iletişime geçer.",
    },
    {
      icon: Handshake,
      title: "Tercih sizin",
      body: "Gelen tekliflerden uygun bulduklarınızla görüşmeyi sürdürürsünüz.",
    },
  ];

  return (
    <section aria-labelledby="next-steps-heading" className="space-y-4">
      <h2 id="next-steps-heading" className="font-serif text-xl font-semibold flex items-center gap-2">
        <Clock className="h-5 w-5 text-accent" strokeWidth={1.75} />
        Bundan sonrası nasıl işliyor?
      </h2>
      <ol className="grid gap-4 sm:grid-cols-3">
        {items.map((item, idx) => (
          <li
            key={item.title}
            className="rounded-lg border border-border bg-card p-5 shadow-soft"
          >
            <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
              <item.icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className={cn("text-xs font-semibold uppercase tracking-wide text-muted-foreground")}>
              {idx + 1}. adım
            </div>
            <div className="mt-1 font-medium">{item.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function FollowAction({ onFollow }: { onFollow: () => void }) {
  return (
    <section className="rounded-xl border border-dashed border-accent/40 bg-accent/5 p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div className="flex items-start gap-3">
        <ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
        <div>
          <p className="font-medium">Bu talebimi takip et</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Bu cihazda saklayalım — daha sonra <Link to="/taleplerim" className="text-accent link-underline">/taleplerim</Link>{" "}
            sayfasından durumunu görüntüleyebilirsiniz.
          </p>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 sm:flex-shrink-0">
        <Button type="button" variant="outline" size="md" onClick={onFollow}>
          <Bookmark />
          Takibe al
        </Button>
      </div>
    </section>
  );
}
