import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Inbox,
  Clock,
  ShieldAlert,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface LawyerProfileRow {
  full_name: string;
  slug: string;
  verification_status: "pending" | "verified" | "rejected";
  bar_number: string | null;
  practice_areas: string[];
}

export default function PanelDashboard() {
  const { user } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["lawyer-profile", user?.id ?? null],
    enabled: !!user,
    queryFn: async (): Promise<LawyerProfileRow | null> => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("lawyer_profiles")
        .select("full_name, slug, verification_status, bar_number, practice_areas")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data as LawyerProfileRow | null;
    },
  });

  const firstName = profile?.full_name?.trim().split(/\s+/)[0] ?? "";
  const status = profile?.verification_status ?? "pending";

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-muted-foreground">Pano</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
          {isLoading
            ? "Hoş geldiniz"
            : firstName
              ? `Hoş geldiniz, ${firstName}`
              : "Hoş geldiniz"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          AvukatIstanbul üzerinden size ulaşan tüm talepleri, tekliflerinizi
          ve hesap durumunuzu burada takip edersiniz.
        </p>
      </header>

      <VerificationBanner status={status} hasBarNumber={!!profile?.bar_number} />

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          icon={Inbox}
          label="Son 7 günde gelen lead"
          value="0"
          hint="Henüz lead gelmedi."
          cta={{ to: "/panel/talepler", label: "Talepleri gör" }}
        />
        <StatCard
          icon={Clock}
          label="Ortalama yanıt süresi"
          value="—"
          hint="İlk teklifinizden sonra hesaplanacak."
        />
      </section>

      <section>
        <h2 className="font-serif text-xl font-semibold tracking-tight">
          Sırada ne var?
        </h2>
        <ol className="mt-4 space-y-3">
          <NextStep
            done={status === "verified"}
            number={1}
            title="Hesabınızı doğrulayın"
            body="Baro sicil numaranızı ve baro belgenizi yükleyerek 'doğrulanmış avukat' rozetinizi alın. Doğrulanmadan dizinde görünmezsiniz ve lead almazsınız."
            cta={{ to: "/panel/dogrulama", label: "Doğrulamaya git" }}
          />
          <NextStep
            done={false}
            number={2}
            title="Profilinizi tamamlayın"
            body="Müvekkillerin sizi seçmesi için kısa tanıtım, deneyim ve uzmanlık alanlarınızı yazın."
            cta={{ to: "/panel/profil", label: "Profili düzenle" }}
          />
        </ol>
      </section>
    </div>
  );
}

function VerificationBanner({
  status,
  hasBarNumber,
}: {
  status: "pending" | "verified" | "rejected";
  hasBarNumber: boolean;
}) {
  if (status === "verified") {
    return (
      <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
        <CheckCircle2 className="w-5 h-5 mt-0.5 text-accent shrink-0" />
        <div>
          <p className="font-medium text-foreground">
            Hesabınız doğrulandı
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Profiliniz İstanbul Barosu'na kayıtlı doğrulanmış avukat
            olarak listeleniyor.
          </p>
        </div>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
        <ShieldAlert className="w-5 h-5 mt-0.5 text-destructive shrink-0" />
        <div>
          <p className="font-medium text-foreground">
            Doğrulama başvurunuz reddedildi
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Detay için panelinizdeki Doğrulama sekmesini kontrol edin
            veya destek ekibine yazın.
          </p>
        </div>
      </div>
    );
  }

  // pending
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200/70">
      <AlertTriangle className="w-5 h-5 mt-0.5 text-amber-600 shrink-0" />
      <div className="flex-1">
        <p className="font-medium text-foreground">
          Hesabınız doğrulama bekliyor
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {hasBarNumber
            ? "Baro belgenizi yüklediğinizde hesabınız 1-2 iş günü içinde admin tarafından doğrulanacaktır. O zamana kadar profiliniz dizinde görünmez."
            : "Sicil numaranızı ve baro belgenizi yükleyerek doğrulamayı tamamlayın. Doğrulanmadan önce profiliniz dizinde görünmez."}
        </p>
        <Link
          to="/panel/dogrulama"
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:underline"
        >
          Doğrulamayı tamamla
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: typeof Inbox;
  label: string;
  value: string;
  hint?: string;
  cta?: { to: string; label: string };
}

function StatCard({ icon: Icon, label, value, hint, cta }: StatCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border/70 p-5">
      <div className="flex items-start gap-3">
        <span className="grid place-items-center w-10 h-10 rounded-md bg-secondary text-primary">
          <Icon className="w-5 h-5" strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 font-serif text-3xl font-semibold tracking-tight">
            {value}
          </p>
        </div>
      </div>
      {hint ? (
        <p className="mt-3 text-xs text-muted-foreground">{hint}</p>
      ) : null}
      {cta ? (
        <Link
          to={cta.to}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          {cta.label}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      ) : null}
    </div>
  );
}

interface NextStepProps {
  done: boolean;
  number: number;
  title: string;
  body: string;
  cta: { to: string; label: string };
}

function NextStep({ done, number, title, body, cta }: NextStepProps) {
  return (
    <li
      className={`flex gap-4 p-4 rounded-xl border bg-card ${
        done ? "border-accent/30 bg-accent/5" : "border-border/70"
      }`}
    >
      <span
        className={`grid place-items-center w-9 h-9 rounded-full text-sm font-serif shrink-0 ${
          done
            ? "bg-accent text-accent-foreground"
            : "bg-secondary text-primary"
        }`}
      >
        {done ? <CheckCircle2 className="w-5 h-5" /> : number}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
          {body}
        </p>
        {!done ? (
          <Link
            to={cta.to}
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            {cta.label}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : null}
      </div>
    </li>
  );
}
