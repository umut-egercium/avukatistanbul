import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ClipboardList,
  Inbox,
  Loader2,
  ShieldCheck,
  TimerReset,
  Users,
  XCircle,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  pending_applications: number;
  rejected_applications: number;
  verified_lawyers: number;
  active_lawyers: number;
  total_requests: number;
  requests_last_24h: number;
  requests_last_7d: number;
  open_requests: number;
}

export default function AdminDashboard() {
  const statsQuery = useQuery({
    queryKey: ["admin-dashboard-stats"],
    staleTime: 60_000,
    queryFn: async (): Promise<DashboardStats | null> => {
      const { data, error } = await supabase.rpc("get_admin_dashboard_stats");
      if (error) throw error;
      const row = Array.isArray(data) ? data[0] : data;
      return (row ?? null) as DashboardStats | null;
    },
  });

  if (statsQuery.isLoading) {
    return (
      <div className="grid place-items-center min-h-[40vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const stats = statsQuery.data;

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-muted-foreground">Yönetim panosu</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
          Sistem durumu
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Bekleyen başvuruları onaylayın, doğrulanmış avukat sayısını
          takip edin, gelen taleplerin akışını izleyin.
        </p>
      </header>

      {stats?.pending_applications && stats.pending_applications > 0 ? (
        <Link
          to="/admin/basvurular"
          className="group flex items-start gap-4 p-5 rounded-xl bg-amber-50 border border-amber-200/70 hover:border-amber-300 transition-colors"
        >
          <ClipboardList className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-foreground">
              <strong>{stats.pending_applications}</strong> bekleyen avukat
              başvurusu var
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Başvuruları inceleyin ve onaylayın; doğrulanmış avukatlar
              dizinde anında listelenir.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-amber-600 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      ) : null}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={ClipboardList}
          label="Bekleyen başvuru"
          value={stats?.pending_applications ?? 0}
          tone="amber"
          link={{ to: "/admin/basvurular", label: "Başvurular" }}
        />
        <StatCard
          icon={ShieldCheck}
          label="Doğrulanmış avukat"
          value={stats?.verified_lawyers ?? 0}
          tone="accent"
          link={{ to: "/admin/avukatlar", label: "Avukatlar" }}
        />
        <StatCard
          icon={Users}
          label="Aktif avukat"
          value={stats?.active_lawyers ?? 0}
          tone="default"
        />
        <StatCard
          icon={XCircle}
          label="Reddedilen başvuru"
          value={stats?.rejected_applications ?? 0}
          tone="default"
        />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Inbox}
          label="Açık talep"
          value={stats?.open_requests ?? 0}
          tone="accent"
        />
        <StatCard
          icon={TimerReset}
          label="Son 24 saatte talep"
          value={stats?.requests_last_24h ?? 0}
          tone="default"
        />
        <StatCard
          icon={TimerReset}
          label="Son 7 günde talep"
          value={stats?.requests_last_7d ?? 0}
          tone="default"
        />
        <StatCard
          icon={Inbox}
          label="Toplam talep"
          value={stats?.total_requests ?? 0}
          tone="default"
        />
      </section>
    </div>
  );
}

interface StatCardProps {
  icon: typeof Inbox;
  label: string;
  value: number;
  tone: "default" | "accent" | "amber";
  link?: { to: string; label: string };
}

function StatCard({ icon: Icon, label, value, tone, link }: StatCardProps) {
  const iconBg =
    tone === "accent"
      ? "bg-accent/10 text-accent"
      : tone === "amber"
        ? "bg-amber-100 text-amber-700"
        : "bg-secondary text-primary";

  return (
    <div className="bg-card rounded-xl border border-border/70 p-5">
      <div className="flex items-start gap-3">
        <span className={`grid place-items-center w-10 h-10 rounded-md ${iconBg}`}>
          <Icon className="w-5 h-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 font-serif text-3xl font-semibold tracking-tight tabular-nums">
            {value.toLocaleString("tr-TR")}
          </p>
        </div>
      </div>
      {link ? (
        <Link
          to={link.to}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
        >
          {link.label}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      ) : null}
    </div>
  );
}
