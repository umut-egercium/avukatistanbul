import { useEffect, useRef, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  FileUp,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  Clock as ClockIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface ProfileBits {
  id: string;
  bar_number: string | null;
  bar_association: string;
  verification_status: "pending" | "verified" | "rejected";
}

interface ApplicationBits {
  id: string;
  bar_number: string | null;
  certificate_url: string | null;
  application_status: "pending" | "approved" | "rejected";
  notes: string | null;
  created_at: string;
}

const DOCS_BUCKET = "lawyer-documents";

export default function PanelVerification() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["lawyer-profile-verify", user?.id ?? null],
    enabled: !!user,
    queryFn: async (): Promise<ProfileBits | null> => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("lawyer_profiles")
        .select("id, bar_number, bar_association, verification_status")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data as ProfileBits | null;
    },
  });

  const applicationQuery = useQuery({
    queryKey: ["lawyer-application-latest", user?.id ?? null],
    enabled: !!user,
    queryFn: async (): Promise<ApplicationBits | null> => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("lawyer_applications")
        .select(
          "id, bar_number, certificate_url, application_status, notes, created_at",
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as ApplicationBits | null;
    },
  });

  const [barNumber, setBarNumber] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (hydratedRef.current) return;
    const profile = profileQuery.data;
    const app = applicationQuery.data;
    if (!profile && !app) return;
    hydratedRef.current = true;
    setBarNumber(app?.bar_number ?? profile?.bar_number ?? "");
  }, [profileQuery.data, applicationQuery.data]);

  const submitMutation = useMutation({
    mutationFn: async () => {
      if (!user || !profileQuery.data || !applicationQuery.data) {
        throw new Error("Profil veya başvuru bulunamadı.");
      }
      if (barNumber.trim().length < 2) {
        throw new Error("Lütfen geçerli bir baro sicil numarası girin.");
      }

      let certificatePath = applicationQuery.data.certificate_url ?? null;

      if (file) {
        if (file.size > 8 * 1024 * 1024) {
          throw new Error("Dosya 8 MB'dan büyük olamaz.");
        }
        const ext = file.name.split(".").pop()?.toLowerCase() ?? "pdf";
        const path = `${user.id}/baro-belgesi-${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from(DOCS_BUCKET)
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (uploadError) {
          throw new Error("Belge yüklenemedi. Lütfen tekrar deneyin.");
        }
        certificatePath = path;
      }

      const trimmedBar = barNumber.trim();

      const { error: appError } = await supabase
        .from("lawyer_applications")
        .update({
          bar_number: trimmedBar,
          certificate_url: certificatePath,
          application_status: "pending",
        })
        .eq("id", applicationQuery.data.id);
      if (appError) throw new Error(appError.message);

      const { error: profileError } = await supabase
        .from("lawyer_profiles")
        .update({ bar_number: trimmedBar })
        .eq("user_id", user.id);
      if (profileError) throw new Error(profileError.message);
    },
    onSuccess: () => {
      setError(null);
      setFile(null);
      setSavedAt(Date.now());
      if (fileInputRef.current) fileInputRef.current.value = "";
      queryClient.invalidateQueries({
        queryKey: ["lawyer-profile-verify", user?.id ?? null],
      });
      queryClient.invalidateQueries({
        queryKey: ["lawyer-application-latest", user?.id ?? null],
      });
      queryClient.invalidateQueries({
        queryKey: ["lawyer-profile", user?.id ?? null],
      });
    },
    onError: (err: Error) => {
      setError(err.message ?? "Kaydedilemedi.");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    submitMutation.mutate();
  };

  if (profileQuery.isLoading || applicationQuery.isLoading) {
    return <Skeleton />;
  }
  if (!profileQuery.data) {
    return (
      <div className="bg-card rounded-xl border border-border/70 p-8">
        <p className="text-muted-foreground">
          Profil bilgileriniz yüklenemedi. Lütfen sayfayı yenileyin.
        </p>
      </div>
    );
  }

  const profile = profileQuery.data;
  const app = applicationQuery.data;
  const status = profile.verification_status;

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-muted-foreground">Doğrulama</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
          Hesap doğrulaması
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          AvukatIstanbul, dizinde yer alan tüm avukatların {profile.bar_association}'na
          kayıtlı olduğunu doğrular. Sicil numaranızı ve baro
          belgenizi yükleyin; ekibimiz 1-2 iş günü içinde inceleyip
          hesabınızı doğrular.
        </p>
      </header>

      <StatusCard status={status} notes={app?.notes ?? null} />

      {status === "verified" ? null : (
        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-xl border border-border/70 p-6 sm:p-8 space-y-6"
          noValidate
        >
          <div className="space-y-1.5">
            <Label htmlFor="bar-number">Baro sicil numarası *</Label>
            <Input
              id="bar-number"
              value={barNumber}
              onChange={(e) => setBarNumber(e.target.value)}
              placeholder="Örn. 12345"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Baro Belgeniz *</Label>
            <p className="text-sm text-muted-foreground">
              {profile.bar_association} tarafından düzenlenmiş güncel
              kimlik veya levha belgesinin PDF veya yüksek çözünürlüklü
              taranmış görüntüsü. En fazla 8 MB.
            </p>

            {app?.certificate_url ? (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-secondary text-sm">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span className="font-medium">Mevcut belge yüklü.</span>
                <span className="text-muted-foreground">
                  Yeni dosya seçerseniz onun üzerine yazılmaz, yeni
                  sürüm olarak eklenir.
                </span>
              </div>
            ) : null}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,image/*,application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-secondary file:px-4 file:py-2 file:text-sm file:font-medium file:text-foreground hover:file:bg-secondary/80 cursor-pointer"
            />
            {file ? (
              <p className="text-sm text-foreground/85">
                <FileUp className="inline w-4 h-4 mr-1.5" />
                Seçildi: <strong>{file.name}</strong>{" "}
                <span className="text-muted-foreground">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </p>
            ) : null}
          </div>

          {error ? (
            <div
              role="alert"
              className="flex items-start gap-2 px-3.5 py-3 rounded-md bg-destructive/10 text-destructive text-sm"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-4">
            <Button
              type="submit"
              variant="cta"
              size="lg"
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gönderiliyor…
                </>
              ) : (
                "Doğrulamayı gönder"
              )}
            </Button>
            {savedAt && Date.now() - savedAt < 4000 ? (
              <span className="inline-flex items-center gap-1.5 text-sm text-accent">
                <CheckCircle2 className="w-4 h-4" /> Gönderildi, inceleniyor
              </span>
            ) : null}
          </div>

          <p className="text-xs text-muted-foreground">
            Belge yalnızca AvukatIstanbul doğrulama ekibi tarafından
            görüntülenir; kamuya kapalı bir alanda saklanır ve
            doğrulama tamamlandıktan sonra yalnızca denetim amacıyla
            tutulur.
          </p>
        </form>
      )}
    </div>
  );
}

function StatusCard({
  status,
  notes,
}: {
  status: "pending" | "verified" | "rejected";
  notes: string | null;
}) {
  if (status === "verified") {
    return (
      <div className="rounded-xl border border-accent/25 bg-accent/10 p-6 flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-accent shrink-0 mt-0.5" />
        <div>
          <h2 className="font-serif text-lg font-semibold">
            Hesabınız doğrulandı
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Profiliniz dizinde "Doğrulanmış Avukat" rozeti ile
            listeleniyor. Sicil numaranızı veya baro bağlantınızı
            değiştirmek isterseniz destek ekibine yazın.
          </p>
        </div>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 flex items-start gap-4">
        <ShieldAlert className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
        <div>
          <h2 className="font-serif text-lg font-semibold">
            Doğrulama reddedildi
          </h2>
          {notes ? (
            <p className="mt-1 text-sm text-foreground/85 whitespace-pre-line">
              <strong>Yönetici notu:</strong> {notes}
            </p>
          ) : null}
          <p className="mt-2 text-sm text-muted-foreground">
            Aşağıdaki formdan bilgilerinizi güncelleyip belgenizi tekrar
            yükleyebilirsiniz; başvurunuz yeniden incelenecektir.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200/70 bg-amber-50 p-6 flex items-start gap-4">
      <ClockIcon className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
      <div>
        <h2 className="font-serif text-lg font-semibold">
          Doğrulama bekliyor
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Sicil numaranızı ve baro belgenizi gönderin; ekibimiz 1-2 iş
          günü içinde değerlendirip hesabınızı dizinde "Doğrulanmış
          Avukat" olarak yayınlar. Doğrulanmadan profiliniz dizinde
          görünmez.
        </p>
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-6">
      <div className="h-7 w-40 bg-muted animate-pulse rounded" />
      <div className="h-24 bg-muted/60 animate-pulse rounded-xl" />
      <div className="h-72 bg-muted/40 animate-pulse rounded-xl" />
    </div>
  );
}
