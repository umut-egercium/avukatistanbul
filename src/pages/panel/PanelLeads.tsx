import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Inbox,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { findCategory } from "@/data/legalCategories";
import { findDistrict } from "@/data/istanbulDistricts";

interface LeadRow {
  log_id: string;
  request_id: string;
  notified_at: string;
  viewed_at: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  practice_area: string;
  case_type: string | null;
  city: string;
  district: string | null;
  description: string | null;
  urgency: "urgent" | "soon" | "flexible" | null;
  request_created_at: string;
  request_status: "open" | "matched" | "closed";
}

interface MyQuoteRow {
  request_id: string;
  created_at: string;
}

const URGENCY_LABEL: Record<NonNullable<LeadRow["urgency"]>, string> = {
  urgent: "Acil",
  soon: "Yakın zamanda",
  flexible: "Esnek",
};

export default function PanelLeads() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const leadsQuery = useQuery({
    queryKey: ["my-received-leads", user?.id ?? null],
    enabled: !!user,
    queryFn: async (): Promise<LeadRow[]> => {
      const { data, error } = await supabase.rpc("get_my_received_leads");
      if (error) throw error;
      return (data ?? []) as LeadRow[];
    },
  });

  const profileQuery = useQuery({
    queryKey: ["lawyer-profile-id", user?.id ?? null],
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
    queryKey: ["my-sent-quote-request-ids", profileQuery.data?.id ?? null],
    enabled: !!profileQuery.data?.id,
    queryFn: async (): Promise<MyQuoteRow[]> => {
      if (!profileQuery.data) return [];
      const { data, error } = await supabase
        .from("quotes")
        .select("request_id, created_at")
        .eq("lawyer_id", profileQuery.data.id);
      if (error) throw error;
      return (data ?? []) as MyQuoteRow[];
    },
  });

  const quotedRequestIds = useMemo(() => {
    return new Set((quotesQuery.data ?? []).map((q) => q.request_id));
  }, [quotesQuery.data]);

  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const handleExpand = async (lead: LeadRow) => {
    if (expandedLogId === lead.log_id) {
      setExpandedLogId(null);
      return;
    }
    setExpandedLogId(lead.log_id);
    if (!lead.viewed_at) {
      await supabase.rpc("mark_lead_viewed", { p_log_id: lead.log_id });
      queryClient.invalidateQueries({
        queryKey: ["my-received-leads", user?.id ?? null],
      });
    }
  };

  if (leadsQuery.isLoading) return <Skeleton />;

  const leads = leadsQuery.data ?? [];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-muted-foreground">
          Gelen Talepler
        </p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
          Müvekkil adaylarınız
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Size yönlendirilen müvekkil talepleri. Bir kart açıldığında talep
          "görüldü" olarak işaretlenir; doğrudan teklifinizi gönderebilirsiniz.
        </p>
      </header>

      {leads.length === 0 ? <EmptyState /> : null}

      <div className="space-y-3">
        {leads.map((lead) => (
          <LeadCard
            key={lead.log_id}
            lead={lead}
            expanded={expandedLogId === lead.log_id}
            onToggle={() => handleExpand(lead)}
            alreadyQuoted={quotedRequestIds.has(lead.request_id)}
            myLawyerId={profileQuery.data?.id ?? null}
            onQuoteSent={() => {
              queryClient.invalidateQueries({
                queryKey: ["my-sent-quote-request-ids", profileQuery.data?.id],
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface LeadCardProps {
  lead: LeadRow;
  expanded: boolean;
  onToggle: () => void;
  alreadyQuoted: boolean;
  myLawyerId: string | null;
  onQuoteSent: () => void;
}

function LeadCard({
  lead,
  expanded,
  onToggle,
  alreadyQuoted,
  myLawyerId,
  onQuoteSent,
}: LeadCardProps) {
  const category = findCategory(lead.practice_area);
  const district = lead.district ? findDistrict(lead.district) : null;
  const isUnread = !lead.viewed_at;

  return (
    <article
      className={`bg-card rounded-xl border ${
        isUnread ? "border-accent/40 ring-1 ring-accent/20" : "border-border/70"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-start"
        aria-expanded={expanded}
      >
        <div className="space-y-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {isUnread ? (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent/15 text-accent text-xs font-semibold">
                Yeni
              </span>
            ) : null}
            {alreadyQuoted ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-foreground/80 text-xs font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Teklif gönderildi
              </span>
            ) : null}
            {lead.urgency ? (
              <span className="text-xs text-muted-foreground">
                {URGENCY_LABEL[lead.urgency]}
              </span>
            ) : null}
            <span className="text-xs text-muted-foreground">
              {formatRelative(lead.notified_at)}
            </span>
          </div>

          <h2 className="font-serif text-lg font-semibold tracking-tight truncate">
            {category?.name ?? lead.practice_area}
            {lead.case_type ? (
              <span className="text-muted-foreground font-normal text-base">
                {" • "}
                {lead.case_type}
              </span>
            ) : null}
          </h2>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {district?.name ?? lead.city}
            </span>
            <span>{lead.customer_name}</span>
          </div>
        </div>

        <span className="text-muted-foreground shrink-0">
          {expanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </span>
      </button>

      {expanded ? (
        <div className="border-t border-border/70 p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <ContactRow
              icon={Phone}
              label="Telefon"
              value={formatPhoneDisplay(lead.customer_phone)}
              href={`tel:${lead.customer_phone}`}
            />
            {lead.customer_email ? (
              <ContactRow
                icon={Mail}
                label="E-posta"
                value={lead.customer_email}
                href={`mailto:${lead.customer_email}`}
              />
            ) : null}
            {category ? (
              <ContactRow
                icon={Tag}
                label="Hukuk dalı"
                value={category.name}
              />
            ) : null}
            <ContactRow
              icon={Clock}
              label="Talep zamanı"
              value={new Date(lead.request_created_at).toLocaleString("tr-TR")}
            />
          </div>

          {lead.description ? (
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                Müvekkil notu
              </p>
              <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                {lead.description}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Müvekkil ek not bırakmamış.
            </p>
          )}

          {alreadyQuoted ? (
            <div className="flex items-start gap-2 px-3.5 py-3 rounded-md bg-accent/10 text-foreground/85 text-sm">
              <CheckCircle2 className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <span>
                Bu talebe teklifinizi gönderdiniz. Müvekkil dilediğinde
                size dönecektir; "Tekliflerim" sekmesinde takibe
                alabilirsiniz.
              </span>
            </div>
          ) : myLawyerId ? (
            <QuoteForm
              requestId={lead.request_id}
              lawyerId={myLawyerId}
              onSent={onQuoteSent}
            />
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

interface QuoteFormProps {
  requestId: string;
  lawyerId: string;
  onSent: () => void;
}

function QuoteForm({ requestId, lawyerId, onSent }: QuoteFormProps) {
  const [message, setMessage] = useState("");
  const [feeMin, setFeeMin] = useState("");
  const [feeMax, setFeeMax] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = useMutation({
    mutationFn: async () => {
      if (message.trim().length < 20) {
        throw new Error("Lütfen en az 20 karakterlik bir mesaj yazın.");
      }
      const min = feeMin.trim() === "" ? null : Number(feeMin);
      const max = feeMax.trim() === "" ? null : Number(feeMax);
      if (min !== null && (!Number.isFinite(min) || min < 0)) {
        throw new Error("Alt ücret geçersiz.");
      }
      if (max !== null && (!Number.isFinite(max) || max < 0)) {
        throw new Error("Üst ücret geçersiz.");
      }
      if (min !== null && max !== null && min > max) {
        throw new Error("Alt ücret üst ücretten büyük olamaz.");
      }
      const { error: insertError } = await supabase.from("quotes").insert({
        request_id: requestId,
        lawyer_id: lawyerId,
        message: message.trim(),
        estimated_fee_min: min,
        estimated_fee_max: max,
      });
      if (insertError) throw new Error(insertError.message);
    },
    onSuccess: () => {
      setError(null);
      onSent();
    },
    onError: (err: Error) => {
      setError(err.message ?? "Teklif gönderilemedi.");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        submit.mutate();
      }}
      className="space-y-4"
      noValidate
    >
      <div>
        <Label htmlFor={`q-msg-${requestId}`}>Teklifiniz *</Label>
        <Textarea
          id={`q-msg-${requestId}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          maxLength={1500}
          placeholder="Davanın özeti, çalışma planınız ve müvekkil için ilk adımlar."
          className="mt-1.5"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          {message.length}/1500
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`q-min-${requestId}`}>
            Tahmini ücret — alt sınır (TL)
          </Label>
          <Input
            id={`q-min-${requestId}`}
            type="number"
            min={0}
            inputMode="numeric"
            value={feeMin}
            onChange={(e) => setFeeMin(e.target.value)}
            placeholder="Örn. 25000"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor={`q-max-${requestId}`}>
            Tahmini ücret — üst sınır (TL)
          </Label>
          <Input
            id={`q-max-${requestId}`}
            type="number"
            min={0}
            inputMode="numeric"
            value={feeMax}
            onChange={(e) => setFeeMax(e.target.value)}
            placeholder="Örn. 60000"
            className="mt-1.5"
          />
        </div>
      </div>

      {error ? (
        <div
          role="alert"
          className="flex items-start gap-2 px-3.5 py-2.5 rounded-md bg-destructive/10 text-destructive text-sm"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      <Button type="submit" variant="cta" disabled={submit.isPending}>
        {submit.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Gönderiliyor…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Teklifi gönder
          </>
        )}
      </Button>
    </form>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <span className="flex items-start gap-2">
      <Icon className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
      <span className="min-w-0">
        <span className="text-xs text-muted-foreground block">{label}</span>
        <span className="text-foreground/90 break-words">{value}</span>
      </span>
    </span>
  );
  return href ? (
    <a href={href} className="hover:text-accent transition-colors">
      {content}
    </a>
  ) : (
    content
  );
}

function EmptyState() {
  return (
    <div className="bg-card rounded-xl border border-border/70 p-10 text-center">
      <div className="grid place-items-center w-12 h-12 rounded-md bg-secondary text-primary mx-auto">
        <Inbox className="w-6 h-6" strokeWidth={1.75} />
      </div>
      <h2 className="mt-4 font-serif text-xl font-semibold tracking-tight">
        Henüz lead almadınız
      </h2>
      <p className="mt-2 text-muted-foreground max-w-md mx-auto">
        Hesabınız doğrulandıktan sonra, uzmanlık alanlarınız + ilçenizle
        eşleşen müvekkil talepleri burada listelenir.
      </p>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-4">
      <div className="h-7 w-40 bg-muted animate-pulse rounded" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-24 bg-muted/50 animate-pulse rounded-xl" />
      ))}
    </div>
  );
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "az önce";
  if (min < 60) return `${min} dk önce`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} saat önce`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} gün önce`;
  return new Date(iso).toLocaleDateString("tr-TR");
}

function formatPhoneDisplay(raw: string): string {
  const d = raw.replace(/\D+/g, "");
  if (d.length !== 11) return raw;
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9, 11)}`;
}
