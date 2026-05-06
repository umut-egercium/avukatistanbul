import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, AlertCircle, Scale } from "lucide-react";

import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MetaTags } from "@/components/seo/MetaTags";
import { useAuth } from "@/hooks/useAuth";

export default function Giris() {
  const { user, loading: authLoading, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get("next") ?? "/panel";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      navigate(next, { replace: true });
    }
  }, [authLoading, user, navigate, next]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: signInError } = await signIn(email.trim(), password);
    setSubmitting(false);
    if (signInError) {
      setError(translateAuthError(signInError.message));
      return;
    }
    navigate(next, { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title="Giriş Yap"
        description="AvukatIstanbul hesabınıza giriş yapın."
        path="/giris"
        noindex
      />

      <main className="flex-1 grid place-items-center py-16">
        <div className="w-full max-w-md container-main">
          <Link
            to="/"
            className="flex items-center gap-2.5 group mb-8 justify-center"
          >
            <span className="grid place-items-center w-9 h-9 rounded-md bg-primary text-primary-foreground shadow-soft">
              <Scale className="w-5 h-5" strokeWidth={1.75} />
            </span>
            <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
              Avukat<span className="text-accent">Istanbul</span>
            </span>
          </Link>

          <div className="bg-card border border-border/70 rounded-xl p-7 sm:p-9 shadow-soft">
            <h1 className="font-serif text-3xl font-semibold tracking-tight">
              Tekrar hoş geldiniz
            </h1>
            <p className="mt-2 text-muted-foreground">
              Avukat panelinize giriş yapmak için bilgilerinizi girin.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@buroniz.com"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Şifre</Label>
                  <Link
                    to="/sifre-sifirla"
                    className="text-xs font-medium text-accent hover:underline"
                  >
                    Şifremi unuttum
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error ? (
                <div
                  role="alert"
                  className="flex items-start gap-2 px-3 py-2.5 rounded-md bg-destructive/10 text-destructive text-sm"
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
                disabled={submitting || !email || !password}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Giriş yapılıyor…
                  </>
                ) : (
                  "Giriş yap"
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border/60 text-center text-sm text-muted-foreground">
              Avukat hesabınız yok mu?{" "}
              <Link
                to="/avukat-kayit"
                className="font-medium text-accent hover:underline"
              >
                Avukat olarak kaydol
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Müvekkil misiniz?{" "}
            <Link to="/talep-olustur" className="hover:underline">
              Avukat talebi oluşturmak için tıklayın
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function translateAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) {
    return "E-posta veya şifre hatalı.";
  }
  if (m.includes("email not confirmed")) {
    return "E-posta adresiniz doğrulanmamış. Doğrulama e-postanızı kontrol edin.";
  }
  if (m.includes("rate limit")) {
    return "Çok fazla deneme yapıldı. Lütfen bir kaç dakika sonra tekrar deneyin.";
  }
  return "Giriş yapılamadı. Lütfen tekrar deneyin.";
}
