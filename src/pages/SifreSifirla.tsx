import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Loader2, AlertCircle, CheckCircle2, Scale } from "lucide-react";

import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MetaTags } from "@/components/seo/MetaTags";
import { supabase } from "@/integrations/supabase/client";

export default function SifreSifirla() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo: `${window.location.origin}/giris` },
    );

    setSubmitting(false);
    if (resetError) {
      setError("Sıfırlama bağlantısı gönderilemedi. Lütfen tekrar deneyin.");
      return;
    }
    setSent(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MetaTags
        title="Şifremi Sıfırla"
        description="AvukatIstanbul hesabınızın şifresini sıfırlayın."
        path="/sifre-sifirla"
        noindex
      />

      <main className="flex-1 grid place-items-center py-16">
        <div className="w-full max-w-md container-main">
          <Link
            to="/"
            className="flex items-center gap-2.5 mb-8 justify-center"
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
              Şifremi sıfırla
            </h1>

            {sent ? (
              <div className="mt-6 flex items-start gap-3 p-4 rounded-md bg-accent/10 text-foreground">
                <CheckCircle2 className="w-5 h-5 mt-0.5 text-accent shrink-0" />
                <div className="text-sm leading-relaxed">
                  <strong className="font-semibold">{email}</strong> adresine
                  şifre sıfırlama bağlantısı gönderdik. Gelen kutunuzu (ve
                  spam klasörünü) kontrol edin.
                </div>
              </div>
            ) : (
              <>
                <p className="mt-2 text-muted-foreground">
                  Hesabınızın e-postasını girin, size sıfırlama bağlantısı
                  gönderelim.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-4"
                  noValidate
                >
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
                    disabled={submitting || !email}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Gönderiliyor…
                      </>
                    ) : (
                      "Sıfırlama bağlantısı gönder"
                    )}
                  </Button>
                </form>
              </>
            )}

            <div className="mt-6 pt-6 border-t border-border/60 text-center text-sm text-muted-foreground">
              <Link
                to="/giris"
                className="font-medium text-accent hover:underline"
              >
                Giriş ekranına dön
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
