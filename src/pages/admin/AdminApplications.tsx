import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  ExternalLink,
  FileText,
  Loader2,
  MapPin,
  Phone,
  Mail,
  X,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { findCategory } from "@/data/legalCategories";
import { findDistrict } from "@/data/istanbulDistricts";
import { cn } from "@/lib/utils";

type AppStatus = "pending" | "approved" | "rejected" | "all";

interface ApplicationRow {
  id: string;
  user_id: string | null;
  full_name: string;
  email: string;
  phone: string;
  bar_number: string | null;
  bar_association: string;
  city: string;
  district: string | null;
  practice_areas: string[];
  bio: string | null;
  years_of_experience: number | null;
  certificate_url: string | null;
  application_status: "pending" | "approved" | "rejected";
  notes: string | null;
  created_at: string;
}

export default function AdminApplications() {
  const [status, setStatus] = useState<AppStatus>("pending");
  const queryClient = useQueryClient();

  const appsQuery = useQuery({
    queryKey: ["admin-applications", status],
    queryFn: async (): Promise<ApplicationRow[]> => {
      let builder = supabase
        .from("lawyer_applications")
        .select(
          "id, user_id, full_name, email, phone, bar_number, bar_association, city, district, practice_areas, bio, years_of_experience, certificate_url, application_status, notes, created_at",
        )
        .order("created_at", { ascending: false });
      if (status !== "all") {
        builder = builder.eq("application_status", status);
      }
      const { data, error } = await builder;
      if (error) throw error;
      return (data ?? []) as ApplicationRow[];
    },
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
    queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
  };

  const apps = appsQuery.data ?? [];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-muted-foreground">Başvurular</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
          Avukat başvuruları
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Bekleyen avukat başvurularını inceleyin; baro belgesini
          görüntüledikten sonra onaylayın veya gerekçe yazarak reddedin.
        </p>
      </header>

      <FilterTabs status={status} onChange={setStatus} />

      {appsQuery.isLoading ? (
        <Skeleton />
      ) : apps.length === 0 ? (
        <EmptyState status={status} />
      ) : (
        <div className="space-y-3">
          {apps.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
              onApproved={invalidate}
              onRejected={invalidate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterTabs({
  status,
  onChange,
}: {
  status: AppStatus;
  onChange: (s: AppStatus) => void;
}) {
  const tabs: Array<{ value: AppStatus; label: string }> = [
    { value: "pending", label: "Bekleyen" },
    { value: "approved", label: "Onaylanan" },
    { value: "rejected", label: "Reddedilen" },
    { value: "all", label: "Tümü" },
  ];
  return (
    <div className="inline-flex rounded-lg bg-card border border-border/70 p-1 text-sm">
      {tabs.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => onChange(t.value)}
          className={cn(
            "px-3.5 py-1.5 rounded-md font-medium transition-colors",
            status === t.value
              ? "bg-primary text-primary-foreground shadow-soft"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

interface ApplicationCardProps {
  app: ApplicationRow;
  onApproved: () => void;
  onRejected: () => void;
}

function ApplicationCard({
  app,
  onApproved,
  onRejected,
}: ApplicationCardProps) {
  const [rejecting, setRejecting] = useState(false);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [certUrl, setCertUrl] = useState<string | null>(null);
  const [certLoading, setCertLoading] = useState(false);

  const district = app.district ? findDistrict(app.district) : null;

  const approveMutation = useMutation({
    mutationFn: async () => {
      const { error: rpcError } = await supabase.rpc(
        "approve_lawyer_application",
        { p_application_id: app.id },
      );
      if (rpcError) throw new Error(rpcError.message);
    },
    onSuccess: () => {
      setError(null);
      onApproved();
    },
    onError: (err: Error) => setError(err.message ?? "Onaylanamadı."),
  });

  const rejectMutation = useMutation({
    mutationFn: async () => {
      if (notes.trim().length < 5) {
        throw new Error("Reddetme nedeni en az 5 karakter olmalı.");
      }
      const { error: rpcError } = await supabase.rpc(
        "reject_lawyer_application",
        { p_application_id: app.id, p_notes: notes.trim() },
      );
      if (rpcError) throw new Error(rpcError.message);
    },
    onSuccess: () => {
      setError(null);
      setRejecting(false);
      setNotes("");
      onRejected();
    },
    onError: (err: Error) => setError(err.message ?? "Reddedilemedi."),
  });

  const openCertificate = async () => {
    if (!app.certificate_url) return;
    setCertLoading(true);
    const { data, error: signError } = await supabase.storage
      .from("lawyer-documents")
      .createSignedUrl(app.certificate_url, 60 * 5);
    setCertLoading(false);
    if (signError || !data?.signedUrl) {
      setError("Belge önizlemesi alınamadı.");
      return;
    }
    setCertUrl(data.signedUrl);
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const isPending = app.application_status === "pending";

  return (
    <article
      className={cn(
        "bg-card rounded-xl border p-5 sm:p-6",
        isPending ? "border-amber-200/70" : "border-border/70",
      )}
    >
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <StatusPill status={app.application_status} />
        <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {new Date(app.created_at).toLocaleString("tr-TR")}
        </span>
      </div>

      <h2 className="font-serif text-xl font-semibold tracking-tight">
        {app.full_name}
      </h2>

      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-muted-foreground">
        <Item icon={Building2}>
          {app.bar_association}
          {app.bar_number ? ` · Sicil ${app.bar_number}` : " · sicil belirtilmemiş"}
        </Item>
        <Item icon={MapPin}>
          {district?.name ?? app.city}
          {app.years_of_experience ? ` · ${app.years_of_experience} yıl` : ""}
        </Item>
        <Item icon={Mail}>
          <a
            href={`mailto:${app.email}`}
            className="hover:text-accent transition-colors"
          >
            {app.email}
          </a>
        </Item>
        <Item icon={Phone}>
          <a
            href={`tel:${app.phone}`}
            className="hover:text-accent transition-colors"
          >
            {app.phone}
          </a>
        </Item>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {app.practice_areas.map((slug) => {
          const cat = findCategory(slug);
          return (
            <span
              key={slug}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary text-foreground/85 text-xs font-medium"
            >
              <Briefcase className="w-3 h-3 mr-1" />
              {cat?.shortName ?? slug}
            </span>
          );
        })}
      </div>

      {app.bio ? (
        <p className="mt-4 text-sm text-foreground/85 leading-relaxed line-clamp-3 whitespace-pre-line">
          {app.bio}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2 items-center">
        {app.certificate_url ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={openCertificate}
            disabled={certLoading}
          >
            {certLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileText className="w-4 h-4" />
            )}
            Baro belgesi
            <ExternalLink className="w-3 h-3" />
          </Button>
        ) : (
          <span className="text-xs text-amber-700 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200/70">
            <AlertCircle className="w-3.5 h-3.5" />
            Baro belgesi yüklenmemiş
          </span>
        )}

        {certUrl ? (
          <span className="text-xs text-muted-foreground">
            Belge sekmesi 5 dakika geçerli.
          </span>
        ) : null}
      </div>

      {app.notes ? (
        <div className="mt-4 p-3 rounded-md bg-muted/50 text-sm">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
            Yönetici notu
          </p>
          <p className="whitespace-pre-line text-foreground/85">{app.notes}</p>
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 px-3.5 py-2.5 rounded-md bg-destructive/10 text-destructive text-sm"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      {isPending ? (
        <div className="mt-5 pt-4 border-t border-border/70">
          {rejecting ? (
            <RejectForm
              notes={notes}
              setNotes={setNotes}
              onCancel={() => {
                setRejecting(false);
                setNotes("");
                setError(null);
              }}
              onConfirm={() => {
                setError(null);
                rejectMutation.mutate();
              }}
              submitting={rejectMutation.isPending}
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="cta"
                size="md"
                onClick={() => approveMutation.mutate()}
                disabled={approveMutation.isPending}
              >
                {approveMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                Onayla ve doğrula
              </Button>
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setRejecting(true)}
                disabled={approveMutation.isPending}
              >
                <X className="w-4 h-4" />
                Reddet…
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </article>
  );
}

interface RejectFormProps {
  notes: string;
  setNotes: (s: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  submitting: boolean;
}

function RejectForm({
  notes,
  setNotes,
  onCancel,
  onConfirm,
  submitting,
}: RejectFormProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        maxLength={600}
        placeholder="Reddetme nedeniniz (avukata gösterilir): örneğin 'Belgenin güncel tarihli olmadığı tespit edildi'."
      />
      <div className="flex gap-2">
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={submitting || notes.trim().length < 5}
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <X className="w-4 h-4" />
          )}
          Reddet
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={onCancel}
          disabled={submitting}
        >
          Vazgeç
        </Button>
      </div>
    </form>
  );
}

function Item({
  icon: Icon,
  children,
}: {
  icon: typeof Mail;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-start gap-1.5">
      <Icon className="w-3.5 h-3.5 mt-0.5 shrink-0" />
      <span className="break-words">{children}</span>
    </span>
  );
}

function StatusPill({
  status,
}: {
  status: "pending" | "approved" | "rejected";
}) {
  const map = {
    pending: { label: "Bekliyor", className: "bg-amber-100 text-amber-800" },
    approved: { label: "Onaylandı", className: "bg-accent/15 text-accent" },
    rejected: { label: "Reddedildi", className: "bg-destructive/10 text-destructive" },
  } as const;
  const { label, className } = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
        className,
      )}
    >
      {status === "approved" ? <CheckCircle2 className="w-3 h-3" /> : null}
      {label}
    </span>
  );
}

function EmptyState({ status }: { status: AppStatus }) {
  const message =
    status === "pending"
      ? "Şu anda bekleyen başvuru yok. Bekleyen başvurular doğrulama için buraya düşer."
      : status === "approved"
        ? "Onaylanan başvuru bulunmuyor."
        : status === "rejected"
          ? "Reddedilen başvuru bulunmuyor."
          : "Hiç başvuru kaydı yok.";
  return (
    <div className="bg-card rounded-xl border border-border/70 p-10 text-center">
      <div className="grid place-items-center w-12 h-12 rounded-md bg-secondary text-primary mx-auto">
        <FileText className="w-6 h-6" strokeWidth={1.75} />
      </div>
      <p className="mt-4 text-muted-foreground max-w-md mx-auto">{message}</p>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-44 bg-muted/50 animate-pulse rounded-xl" />
      ))}
    </div>
  );
}
