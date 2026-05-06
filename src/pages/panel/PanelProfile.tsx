import { useEffect, useRef, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  Loader2,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LEGAL_CATEGORIES } from "@/data/legalCategories";
import { ISTANBUL_DISTRICTS } from "@/data/istanbulDistricts";
import {
  getAvatarPublicUrl,
  initialsFromName,
  uploadAvatar,
} from "@/lib/avatar";
import { cn } from "@/lib/utils";

interface ProfileRow {
  id: string;
  slug: string;
  full_name: string;
  bio: string | null;
  district: string | null;
  practice_areas: string[];
  years_of_experience: number | null;
  show_email: boolean;
  show_phone: boolean;
  avatar_url: string | null;
  bar_association: string;
  bar_number: string | null;
  verification_status: "pending" | "verified" | "rejected";
}

export default function PanelProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["lawyer-profile-edit", user?.id ?? null],
    enabled: !!user,
    queryFn: async (): Promise<ProfileRow | null> => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("lawyer_profiles")
        .select(
          "id, slug, full_name, bio, district, practice_areas, years_of_experience, show_email, show_phone, avatar_url, bar_association, bar_number, verification_status",
        )
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data as ProfileRow | null;
    },
  });

  const [bio, setBio] = useState("");
  const [district, setDistrict] = useState("");
  const [practiceAreas, setPracticeAreas] = useState<string[]>([]);
  const [yearsRaw, setYearsRaw] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Hydrate local state from server row once.
  const hydratedRef = useRef(false);
  useEffect(() => {
    if (hydratedRef.current) return;
    const p = profileQuery.data;
    if (!p) return;
    hydratedRef.current = true;
    setBio(p.bio ?? "");
    setDistrict(p.district ?? "");
    setPracticeAreas(p.practice_areas ?? []);
    setYearsRaw(p.years_of_experience?.toString() ?? "");
    setShowEmail(p.show_email);
    setShowPhone(p.show_phone);
  }, [profileQuery.data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!user || !profileQuery.data) throw new Error("Profil bulunamadı.");
      const yearsParsed =
        yearsRaw.trim() === "" ? null : Number.parseInt(yearsRaw, 10);
      const { error: updateError } = await supabase
        .from("lawyer_profiles")
        .update({
          bio: bio.trim() || null,
          district: district || null,
          practice_areas: practiceAreas,
          years_of_experience:
            yearsParsed !== null && Number.isFinite(yearsParsed)
              ? yearsParsed
              : null,
          show_email: showEmail,
          show_phone: showPhone,
        })
        .eq("user_id", user.id);
      if (updateError) throw updateError;
    },
    onSuccess: () => {
      setError(null);
      setSavedAt(Date.now());
      queryClient.invalidateQueries({
        queryKey: ["lawyer-profile-edit", user?.id ?? null],
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
    if (practiceAreas.length === 0) {
      setError("En az bir uzmanlık alanı seçin.");
      return;
    }
    setError(null);
    saveMutation.mutate();
  };

  const togglePracticeArea = (slug: string) => {
    setPracticeAreas((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  if (profileQuery.isLoading) {
    return <ProfileSkeleton />;
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

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-medium text-muted-foreground">Profilim</p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-semibold tracking-tight">
          Profil bilgileriniz
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Burada düzenlediğiniz alanlar, müvekkil adaylarının sizi
          görüntülediği <code className="text-foreground/85">/avukat/{profile.slug}</code>{" "}
          sayfasında görünür.
        </p>
      </header>

      <AvatarSection profile={profile} />

      <form
        onSubmit={handleSubmit}
        className="bg-card rounded-xl border border-border/70 p-6 sm:p-8 space-y-6"
        noValidate
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Ad Soyad" hint="Hesap oluştururken belirlenmiştir">
            <Input value={profile.full_name} disabled />
          </Field>
          <Field label="Profil URL" hint="Otomatik üretilir">
            <Input value={`/avukat/${profile.slug}`} disabled />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Bağlı Baro" hint="Doğrulama sonrası değiştirilemez">
            <Input value={profile.bar_association} disabled />
          </Field>
          <Field label="Sicil Numarası" hint="Doğrulamada güncellenir">
            <Input value={profile.bar_number ?? "—"} disabled />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Çalıştığınız İlçe" htmlFor="district">
            <select
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className={cn(
                "flex h-11 w-full rounded-md border border-input bg-card px-3.5 py-2 text-base shadow-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
              )}
            >
              <option value="">İlçe seçin…</option>
              {ISTANBUL_DISTRICTS.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Mesleki Deneyim (yıl)" htmlFor="years">
            <Input
              id="years"
              type="number"
              min={0}
              max={70}
              value={yearsRaw}
              onChange={(e) => setYearsRaw(e.target.value)}
              placeholder="Örn. 8"
            />
          </Field>
        </div>

        <Field label="Uzmanlık Alanları" hint="En az bir alan seçin">
          <div className="flex flex-wrap gap-2">
            {LEGAL_CATEGORIES.map((cat) => {
              const selected = practiceAreas.includes(cat.slug);
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => togglePracticeArea(cat.slug)}
                  aria-pressed={selected}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors",
                    selected
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-card text-foreground/85 border-border hover:border-accent/50 hover:bg-accent/5",
                  )}
                >
                  {selected ? <Check className="w-3.5 h-3.5" /> : null}
                  {cat.shortName}
                </button>
              );
            })}
          </div>
        </Field>

        <Field
          label="Tanıtım Yazısı"
          htmlFor="bio"
          hint="Public profilinizin üst kısmında görünür"
        >
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={5}
            maxLength={1200}
            placeholder="Boşanma ve aile hukuku alanında 8 yıllık deneyim. Anlaşmalı ve çekişmeli boşanma davaları, nafaka ve velayet uyuşmazlıkları."
          />
          <p className="text-xs text-muted-foreground">
            {bio.length}/1200 karakter
          </p>
        </Field>

        <div className="rounded-lg border border-border/70 p-5 space-y-4">
          <div>
            <p className="font-medium">Profil görünürlüğü</p>
            <p className="text-sm text-muted-foreground">
              Aşağıdakileri açtığınızda iletişim bilgileriniz, talep
              gönderen kullanıcı giriş yaptığında profilinizde görünür.
            </p>
          </div>
          <ToggleRow
            label="E-posta adresimi göster"
            checked={showEmail}
            onChange={setShowEmail}
          />
          <ToggleRow
            label="Telefon numaramı göster"
            checked={showPhone}
            onChange={setShowPhone}
          />
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

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button
            type="submit"
            variant="cta"
            size="lg"
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Kaydediliyor…
              </>
            ) : (
              "Değişiklikleri kaydet"
            )}
          </Button>
          {savedAt && Date.now() - savedAt < 4000 ? (
            <span className="inline-flex items-center gap-1.5 text-sm text-accent">
              <CheckCircle2 className="w-4 h-4" /> Kaydedildi
            </span>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function AvatarSection({ profile }: { profile: ProfileRow }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    if (!user) return;
    setUploadError(null);
    if (!file.type.startsWith("image/")) {
      setUploadError("Lütfen bir resim dosyası seçin (jpg, png, webp).");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setUploadError("Dosya 4 MB'dan büyük olamaz.");
      return;
    }
    setUploading(true);
    const { path, error } = await uploadAvatar(user.id, file);
    if (error || !path) {
      setUploading(false);
      setUploadError("Yükleme başarısız oldu. Lütfen tekrar deneyin.");
      return;
    }
    const { error: updateError } = await supabase
      .from("lawyer_profiles")
      .update({ avatar_url: path })
      .eq("user_id", user.id);
    setUploading(false);
    if (updateError) {
      setUploadError("Profil güncellenemedi.");
      return;
    }
    queryClient.invalidateQueries({
      queryKey: ["lawyer-profile-edit", user.id],
    });
    queryClient.invalidateQueries({
      queryKey: ["lawyer-profile", user.id],
    });
  };

  const avatarSrc = getAvatarPublicUrl(profile.avatar_url);

  return (
    <div className="bg-card rounded-xl border border-border/70 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-secondary grid place-items-center shrink-0">
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={profile.full_name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span className="font-serif text-3xl text-muted-foreground">
              {initialsFromName(profile.full_name)}
            </span>
          )}
          {uploading ? (
            <div className="absolute inset-0 grid place-items-center bg-foreground/40">
              <Loader2 className="w-6 h-6 animate-spin text-primary-foreground" />
            </div>
          ) : null}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-medium">Profil fotoğrafı</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Net bir vesikalık önerilir. JPG/PNG/WebP, en fazla 4 MB.
          </p>
          {uploadError ? (
            <p className="mt-2 text-sm text-destructive">{uploadError}</p>
          ) : null}
          <div className="mt-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleUpload(file);
              }}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Camera className="w-4 h-4" />
              {avatarSrc ? "Fotoğrafı değiştir" : "Fotoğraf yükle"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}

function ToggleRow({ label, checked, onChange }: ToggleRowProps) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          checked ? "bg-accent" : "bg-muted",
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 rounded-full bg-card shadow transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    </label>
  );
}

interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
}

function Field({ label, htmlFor, hint, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={htmlFor}>{label}</Label>
        {hint ? (
          <span className="text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-7 w-40 bg-muted animate-pulse rounded" />
      <div className="h-32 bg-muted/60 animate-pulse rounded-xl" />
      <div className="h-96 bg-muted/40 animate-pulse rounded-xl" />
    </div>
  );
}
