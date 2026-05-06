import { useState, useMemo, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Loader2,
  ShieldCheck,
  Users,
  Coins,
  TrendingUp,
  ChevronRight,
  Check,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MetaTags } from "@/components/seo/MetaTags";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { LEGAL_CATEGORIES } from "@/data/legalCategories";
import { ISTANBUL_DISTRICTS } from "@/data/istanbulDistricts";
import { cn } from "@/lib/utils";

const VALUE_PROPS = [
  {
    icon: Users,
    title: "Aradığı sizi bulan müvekkil",
    body:
      "Boşanma, ceza, iş, miras gibi yüksek niyetli arama yapan kullanıcılar size yönlendirilir; soğuk satış yapmazsınız.",
  },
  {
    icon: ShieldCheck,
    title: "Onaylı baro kaydı",
    body:
      "Profilinizde İstanbul Barosu sicil numaranız ve doğrulama rozetiniz yer alır; güven aşamasında müvekkil daha hızlı karar verir.",
  },
  {
    icon: Coins,
    title: "Sadece aldığınız lead için ödeyin",
    body:
      "Aylık abonelik yok. Yalnızca size ulaşan ve iletişim bilgilerini açtığınız davalar için kredi kullanırsınız.",
  },
  {
    icon: TrendingUp,
    title: "Görünür panel ve istatistikler",
    body:
      "Aldığınız teklif daveti, gönderdiğiniz teklif, kazanılan davalar ve ortalama yanıt sürenizi tek panelden takip edersiniz.",
  },
];

const stripPhone = (raw: string) =>
  raw.replace(/\D+/g, "").slice(0, 11);

const formatPhone = (raw: string): string => {
  const d = stripPhone(raw);
  if (d.length <= 4) return d;
  if (d.length <= 7) return `${d.slice(0, 4)} ${d.slice(4)}`;
  if (d.length <= 9) return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9, 11)}`;
};

const isValidTurkishMobile = (raw: string) => {
  const d = stripPhone(raw);
  return d.length === 11 && d.startsWith("05");
};

export default function AvukatKayit() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [barAssociation, setBarAssociation] = useState("İstanbul Barosu");
  const [barNumber, setBarNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [practiceAreas, setPracticeAreas] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [yearsRaw, setYearsRaw] = useState("");
  const [kvkkConsent, setKvkkConsent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Already authed lawyers shouldn't see signup; bounce them to panel.
  if (!authLoading && user) {
    navigate("/panel", { replace: true });
  }

  const togglePracticeArea = (slug: string) => {
    setPracticeAreas((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  const validation = useMemo(() => {
    if (fullName.trim().length < 3) return "Lütfen tam adınızı girin.";
    if (!email.includes("@")) return "Geçerli bir e-posta adresi girin.";
    if (!isValidTurkishMobile(phone))
      return "Geçerli bir Türk cep telefonu girin (0 5XX … formatında).";
    if (password.length < 8) return "Şifre en az 8 karakter olmalı.";
    if (barAssociation.trim().length < 3)
      return "Bağlı olduğunuz baroyu girin.";
    if (!district) return "Çalıştığınız İstanbul ilçesini seçin.";
    if (practiceAreas.length === 0)
      return "En az bir uzmanlık alanı seçin.";
    if (!kvkkConsent) return "Kayıt için KVKK metnini kabul etmelisiniz.";
    return null;
  }, [
    fullName,
    email,
    phone,
    password,
    barAssociation,
    district,
    practiceAreas,
    kvkkConsent,
  ]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (validation) {
      setError(validation);
      return;
    }

    setSubmitting(true);

    const phoneDigits = stripPhone(phone);
    const yearsParsed =
      yearsRaw.trim() === "" ? null : Number.parseInt(yearsRaw, 10);

    // 1. Create the auth user with role + name in metadata. The
    //    on_auth_user_created trigger handles profiles + user_roles inserts.
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          role: "lawyer",
          full_name: fullName.trim(),
          phone: phoneDigits,
        },
      },
    });

    if (signUpError) {
      setSubmitting(false);
      setError(translateAuthError(signUpError.message));
      return;
    }

    const userId = signUpData.user?.id ?? null;
    if (!userId) {
      setSubmitting(false);
      setError(
        "Kayıt oluşturuldu ancak oturum başlatılamadı. Lütfen e-posta doğrulamasını tamamlayın ve tekrar giriş yapın.",
      );
      return;
    }

    // 2. Insert the lawyer application. Trigger handle_new_lawyer_application
    //    creates the matching pending lawyer_profiles row with a unique slug.
    const { error: appError } = await supabase
      .from("lawyer_applications")
      .insert({
        user_id: userId,
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phoneDigits,
        bar_association: barAssociation.trim(),
        bar_number: barNumber.trim() || null,
        city: "İstanbul",
        district,
        practice_areas: practiceAreas,
        bio: bio.trim() || null,
        years_of_experience:
          yearsParsed !== null && Number.isFinite(yearsParsed)
            ? yearsParsed
            : null,
      });

    setSubmitting(false);

    if (appError) {
      setError(
        "Hesabınız oluşturuldu fakat başvurunuz kaydedilemedi. Panelden başvurunuzu tamamlayabilirsiniz.",
      );
      navigate("/panel", { replace: true });
      return;
    }

    navigate("/panel", { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title="Avukat Olarak Kaydolun — İstanbul'da Yeni Müvekkillere Ulaşın"
        description="İstanbul Barosu'na kayıtlı avukatlar için: Yüksek niyetli müvekkil adaylarına dakikalar içinde ulaşın. Sadece aldığınız lead için ödeme yapın."
        path="/avukat-kayit"
      />

      <Header />
      <main className="flex-1">
        <Hero />

        <section className="py-12 lg:py-16">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <aside className="lg:col-span-5 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {VALUE_PROPS.map((p) => {
                    const Icon = p.icon;
                    return (
                      <div
                        key={p.title}
                        className="bg-card rounded-xl border border-border/70 p-5"
                      >
                        <span className="grid place-items-center w-10 h-10 rounded-md bg-accent/10 text-accent">
                          <Icon className="w-5 h-5" strokeWidth={1.75} />
                        </span>
                        <h3 className="mt-3 font-serif text-base font-semibold tracking-tight">
                          {p.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                          {p.body}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Hesabınız oluşturulduktan sonra panelinizden baro
                  belgenizi yükleyebilir, profilinizi düzenleyebilir ve
                  kredi yükleyerek lead almaya başlayabilirsiniz.
                  Hesabınız İstanbul Barosu sicil numaranız ile
                  eşleştirildikten sonra "doğrulanmış avukat" rozetiniz
                  yayınlanır.
                </p>
              </aside>

              <div className="lg:col-span-7">
                <form
                  onSubmit={handleSubmit}
                  className="bg-card rounded-xl border border-border/70 p-6 sm:p-9 shadow-soft"
                  noValidate
                >
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">
                    Avukat hesabı oluşturun
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Tüm alanlar yıldız (*) ile işaretli olanlar dışında
                    isteğe bağlıdır.
                  </p>

                  <div className="mt-7 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Ad Soyad *" htmlFor="fullName">
                        <Input
                          id="fullName"
                          autoComplete="name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Av. Ayşe Yılmaz"
                          required
                        />
                      </Field>
                      <Field label="Cep Telefonu *" htmlFor="phone">
                        <Input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          value={formatPhone(phone)}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0 5XX XXX XX XX"
                          required
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="E-posta *" htmlFor="email">
                        <Input
                          id="email"
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ornek@buroniz.com"
                          required
                        />
                      </Field>
                      <Field label="Şifre *" htmlFor="password">
                        <Input
                          id="password"
                          type="password"
                          autoComplete="new-password"
                          minLength={8}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="En az 8 karakter"
                          required
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Bağlı Baro *" htmlFor="barAssociation">
                        <Input
                          id="barAssociation"
                          value={barAssociation}
                          onChange={(e) => setBarAssociation(e.target.value)}
                          required
                        />
                      </Field>
                      <Field
                        label="Baro Sicil Numarası"
                        htmlFor="barNumber"
                        hint="Sonra da girebilirsiniz"
                      >
                        <Input
                          id="barNumber"
                          value={barNumber}
                          onChange={(e) => setBarNumber(e.target.value)}
                          placeholder="Örn. 12345"
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Çalıştığınız İlçe *" htmlFor="district">
                        <select
                          id="district"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          required
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
                      <Field
                        label="Mesleki Deneyim (yıl)"
                        htmlFor="years"
                        hint="İsteğe bağlı"
                      >
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

                    <Field
                      label="Uzmanlık Alanları *"
                      hint="En az bir alan seçin"
                    >
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
                              {selected ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : null}
                              {cat.shortName}
                            </button>
                          );
                        })}
                      </div>
                    </Field>

                    <Field
                      label="Kısa Tanıtım"
                      htmlFor="bio"
                      hint="İsteğe bağlı — profilinizde görünür"
                    >
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={4}
                        maxLength={600}
                        placeholder="Boşanma ve aile hukuku alanında 8 yıllık deneyim. Anlaşmalı ve çekişmeli boşanma davaları, nafaka ve velayet uyuşmazlıkları."
                      />
                    </Field>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={kvkkConsent}
                        onChange={(e) => setKvkkConsent(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-input text-accent focus-visible:ring-2 focus-visible:ring-ring"
                        required
                      />
                      <span className="text-sm text-foreground/80 leading-relaxed">
                        <span className="font-medium">KVKK Aydınlatma
                        Metni'ni</span> okudum ve kişisel verilerimin
                        AvukatIstanbul tarafından işlenmesini kabul
                        ediyorum. *
                      </span>
                    </label>

                    {error ? (
                      <div
                        role="alert"
                        className="flex items-start gap-2 px-3.5 py-3 rounded-md bg-destructive/10 text-destructive text-sm"
                      >
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{error}</span>
                      </div>
                    ) : null}

                    <Button
                      type="submit"
                      variant="cta"
                      size="lg"
                      className="w-full"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Hesap oluşturuluyor…
                        </>
                      ) : (
                        <>
                          Hesabımı oluştur
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Zaten hesabınız var mı?{" "}
                      <Link
                        to="/giris"
                        className="text-accent font-medium hover:underline"
                      >
                        Giriş yapın
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-gradient border-b border-border/40">
      <div className="container-main py-12 lg:py-16">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-primary-foreground/65 mb-4"
        >
          <Link to="/" className="hover:text-primary-foreground transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-primary-foreground/85">Avukat Kayıt</span>
        </nav>
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent mb-3">
          Avukatlar için
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-primary-foreground tracking-tight text-balance max-w-3xl">
          İstanbul'da yeni müvekkillere ulaşmanın{" "}
          <span className="text-accent">en doğrudan yolu</span>
        </h1>
        <p className="mt-4 text-lg text-primary-foreground/75 max-w-2xl">
          AvukatIstanbul'a katılın; aktif olarak avukat arayan kullanıcıların
          taleplerini panelinizde görün, dilediğinize teklif gönderin.
        </p>
      </div>
    </section>
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

function translateAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("user already registered") || m.includes("already exists")) {
    return "Bu e-posta adresi ile daha önce kayıt yapılmış. Lütfen giriş yapın.";
  }
  if (m.includes("password")) {
    return "Şifre çok zayıf. En az 8 karakter, harf ve rakam içermeli.";
  }
  if (m.includes("rate limit")) {
    return "Çok fazla deneme yapıldı. Lütfen bir kaç dakika sonra tekrar deneyin.";
  }
  if (m.includes("invalid email")) {
    return "Geçerli bir e-posta adresi girin.";
  }
  return "Hesap oluşturulamadı. Lütfen tekrar deneyin.";
}
