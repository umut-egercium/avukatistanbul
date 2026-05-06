import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Combobox, type ComboboxOption } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { LEGAL_CATEGORIES } from "@/data/legalCategories";
import { ISTANBUL_DISTRICTS } from "@/data/istanbulDistricts";
import { supabase } from "@/integrations/supabase/client";
import {
  getAttributionParams,
  trackCustomerRequestStep,
  trackEvent,
} from "@/lib/analytics";
import { digitsOnly, formatPhone, isValidTurkishMobile } from "@/lib/phone";
import { cn } from "@/lib/utils";

const URGENCY_VALUES = ["urgent", "soon", "flexible"] as const;
type Urgency = (typeof URGENCY_VALUES)[number];

const URGENCY_LABELS: Record<Urgency, { title: string; subtitle: string }> = {
  urgent: { title: "Acil", subtitle: "Bu hafta içinde" },
  soon: { title: "Yakında", subtitle: "2-4 hafta içinde" },
  flexible: { title: "Esnek", subtitle: "Acil değil" },
};

const OTHER_CASE_TYPE = "__other__";

const schema = z.object({
  practiceArea: z.string().min(1, "Hukuk dalı seçiniz"),
  caseType: z.string().optional(),
  caseTypeOther: z.string().max(120, "En fazla 120 karakter").optional(),
  district: z.string().optional(),
  urgency: z.enum(URGENCY_VALUES).optional(),
  fullName: z.string().trim().min(2, "Adınızı tam giriniz"),
  phone: z
    .string()
    .refine(isValidTurkishMobile, "0 ile başlayan 11 haneli cep numarası giriniz"),
  email: z
    .string()
    .trim()
    .email("Geçerli bir e-posta giriniz")
    .optional()
    .or(z.literal("")),
  description: z.string().max(1500, "En fazla 1500 karakter").optional(),
  kvkk: z.boolean().refine((value) => value === true, {
    message: "Devam etmek için onayınız gerekiyor",
  }),
});

type FormValues = z.infer<typeof schema>;

const PRACTICE_AREA_OPTIONS: ComboboxOption[] = LEGAL_CATEGORIES.map((cat) => ({
  value: cat.slug,
  label: cat.name,
  description: cat.shortName,
  keywords: [cat.shortName, cat.searchTerm],
}));

const DISTRICT_OPTIONS: ComboboxOption[] = ISTANBUL_DISTRICTS.map((district) => ({
  value: district.slug,
  label: district.name,
  description: district.side === "avrupa" ? "Avrupa Yakası" : "Anadolu Yakası",
  keywords: [district.name, district.side],
}));

interface CreateRequestRow {
  id: string;
  anonymous_token: string;
  is_anonymous: boolean;
}

interface AnonymousRequestEntry {
  request_id: string;
  token: string;
  created_at: string;
}

const TOKEN_STORAGE_KEY = "anonymous_request_tokens";

function persistAnonymousToken(entry: AnonymousRequestEntry): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    const list: AnonymousRequestEntry[] = raw ? JSON.parse(raw) : [];
    if (list.some((item) => item.request_id === entry.request_id)) return;
    list.push(entry);
    window.localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Storage unavailable — caller still has the token in URL.
  }
}

export function RequestForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      practiceArea: searchParams.get("practiceArea") ?? "",
      caseType: searchParams.get("caseType") ?? "",
      caseTypeOther: "",
      district: searchParams.get("district") ?? "",
      urgency: undefined,
      fullName: "",
      phone: "",
      email: "",
      description: "",
      kvkk: false,
    },
  });

  const practiceArea = form.watch("practiceArea");
  const caseType = form.watch("caseType");

  const caseTypeOptions = useMemo<ComboboxOption[]>(() => {
    const cat = LEGAL_CATEGORIES.find((c) => c.slug === practiceArea);
    if (!cat) return [];
    return [
      ...cat.caseTypes.map((label) => ({
        value: label,
        label,
        keywords: [label],
      })),
      { value: OTHER_CASE_TYPE, label: "Diğer (yazarak belirteceğim)" },
    ];
  }, [practiceArea]);

  // Reset case type when practice area changes (unless it's still in the new list).
  useEffect(() => {
    if (!caseType) return;
    if (caseType === OTHER_CASE_TYPE) return;
    const stillValid = caseTypeOptions.some((opt) => opt.value === caseType);
    if (!stillValid) form.setValue("caseType", "");
  }, [caseTypeOptions, caseType, form]);

  // Fire step-one view event once on mount.
  const stepOneViewedRef = useRef(false);
  useEffect(() => {
    if (stepOneViewedRef.current) return;
    stepOneViewedRef.current = true;
    trackCustomerRequestStep(1, "view");
  }, []);

  // Fire step-two view event when transitioning forward.
  const stepTwoViewedRef = useRef(false);
  useEffect(() => {
    if (step === 2 && !stepTwoViewedRef.current) {
      stepTwoViewedRef.current = true;
      trackCustomerRequestStep(2, "view", {
        practice_area: form.getValues("practiceArea"),
        district: form.getValues("district") || undefined,
        urgency: form.getValues("urgency"),
      });
    }
  }, [step, form]);

  async function onContinue() {
    const ok = await form.trigger(
      ["practiceArea", "caseType", "caseTypeOther"],
      { shouldFocus: true },
    );
    if (!ok) return;
    if (caseType === OTHER_CASE_TYPE) {
      const other = form.getValues("caseTypeOther")?.trim();
      if (!other) {
        form.setError("caseTypeOther", {
          message: "Lütfen kısaca belirtiniz",
        });
        return;
      }
    }
    trackCustomerRequestStep(1, "complete", {
      practice_area: form.getValues("practiceArea"),
      district: form.getValues("district") || undefined,
      urgency: form.getValues("urgency"),
    });
    setStep(2);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    const attribution = getAttributionParams();
    const resolvedCaseType =
      values.caseType === OTHER_CASE_TYPE
        ? values.caseTypeOther?.trim() || null
        : values.caseType?.trim() || null;

    const { data, error } = await supabase.rpc("create_request", {
      p_full_name: values.fullName,
      p_phone: digitsOnly(values.phone),
      p_email: values.email?.trim() || "",
      p_practice_area: values.practiceArea,
      p_district: values.district || null,
      p_case_type: resolvedCaseType,
      p_urgency: values.urgency ?? null,
      p_description: values.description?.trim() || null,
      p_gclid: attribution.gclid ?? null,
      p_gbraid: attribution.gbraid ?? null,
      p_wbraid: attribution.wbraid ?? null,
    });

    if (error) {
      setSubmitting(false);
      toast.error("Talep gönderilemedi", {
        description: error.message,
      });
      trackEvent("customer_request_submit_error", {
        message: error.message,
      });
      return;
    }

    const row = (Array.isArray(data) ? data[0] : data) as
      | CreateRequestRow
      | undefined;
    if (!row?.id || !row.anonymous_token) {
      setSubmitting(false);
      toast.error("Talep gönderilemedi", {
        description: "Beklenmedik bir sunucu yanıtı.",
      });
      return;
    }

    trackCustomerRequestStep(2, "complete", {
      practice_area: values.practiceArea,
      request_id: row.id,
    });
    trackEvent("generate_lead", {
      practice_area: values.practiceArea,
      district: values.district || undefined,
    });

    persistAnonymousToken({
      request_id: row.id,
      token: row.anonymous_token,
      created_at: new Date().toISOString(),
    });

    navigate(
      `/talep-basarili?id=${row.id}&token=${row.anonymous_token}`,
      { replace: true },
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        noValidate
      >
        <StepIndicator current={step} />

        {step === 1 ? (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="practiceArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hangi hukuk dalında destek arıyorsunuz?</FormLabel>
                  <FormControl>
                    <Combobox
                      options={PRACTICE_AREA_OPTIONS}
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("caseType", "");
                      }}
                      placeholder="Hukuk dalı seçiniz"
                      searchPlaceholder="Hukuk dalı ara…"
                      aria-invalid={!!form.formState.errors.practiceArea}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {practiceArea ? (
              <FormField
                control={form.control}
                name="caseType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Davanızın türü</FormLabel>
                    <FormControl>
                      <Combobox
                        options={caseTypeOptions}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Dava türü seçiniz"
                        searchPlaceholder="Dava türü ara…"
                      />
                    </FormControl>
                    <FormDescription>
                      Tam karşılığını bulamazsanız "Diğer" seçeneğini
                      işaretleyip kısaca yazabilirsiniz.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            {caseType === OTHER_CASE_TYPE ? (
              <FormField
                control={form.control}
                name="caseTypeOther"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Davanızı kısaca belirtin</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Örn: Apartman yönetimine karşı dava"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İlçeniz (opsiyonel)</FormLabel>
                  <FormControl>
                    <Combobox
                      options={DISTRICT_OPTIONS}
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                      placeholder="İlçe seçiniz"
                      searchPlaceholder="İlçe ara…"
                    />
                  </FormControl>
                  <FormDescription>
                    Yakınınızdaki avukatları öne çıkarmak için kullanılır.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aciliyet (opsiyonel)</FormLabel>
                  <FormControl>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {URGENCY_VALUES.map((value) => {
                        const active = field.value === value;
                        const meta = URGENCY_LABELS[value];
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() =>
                              field.onChange(active ? undefined : value)
                            }
                            aria-pressed={active}
                            className={cn(
                              "rounded-lg border px-4 py-3 text-left transition-colors",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              active
                                ? "border-accent bg-accent/10 text-foreground"
                                : "border-border bg-card hover:border-foreground/20",
                            )}
                          >
                            <div className="font-medium">{meta.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {meta.subtitle}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end pt-2">
              <Button
                type="button"
                variant="cta"
                size="lg"
                onClick={onContinue}
              >
                Devam et
                <ArrowRight />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ad Soyad</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="name"
                      placeholder="Örn: Mehmet Yılmaz"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon</FormLabel>
                  <FormControl>
                    <Input
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="0### ### ## ##"
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(formatPhone(event.target.value))
                      }
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormDescription>
                    Sadece tarafınıza dönüş için kullanılır, kimseyle paylaşılmaz.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-posta (opsiyonel)</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="ornek@eposta.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Davanızı kısaca anlatın (opsiyonel)</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      maxLength={1500}
                      placeholder="Olayın özeti, ne zaman yaşandı, beklentiniz ne…"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Avukatların size daha doğru teklif verebilmesi için
                    yardımcı olur. Kişisel bilgi paylaşmak zorunda değilsiniz.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kvkk"
              render={({ field, fieldState }) => (
                <FormItem className="flex items-start gap-3 space-y-0 rounded-lg border border-border bg-card/60 p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 rounded border-input text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      checked={field.value === true}
                      onChange={(event) => field.onChange(event.target.checked)}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      aria-invalid={!!fieldState.error}
                    />
                  </FormControl>
                  <div className="flex-1 space-y-1">
                    <FormLabel className="text-sm font-normal text-foreground/85">
                      <Link
                        to="/kvkk"
                        target="_blank"
                        className="text-accent link-underline"
                      >
                        KVKK aydınlatma metnini
                      </Link>{" "}
                      okudum, bilgilerimin doğrulanmış İstanbul avukatlarıyla
                      paylaşılmasına onay veriyorum.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={() => setStep(1)}
                disabled={submitting}
              >
                <ArrowLeft />
                Geri
              </Button>
              <Button
                type="submit"
                variant="cta"
                size="lg"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Gönderiliyor…
                  </>
                ) : (
                  <>
                    Talebimi gönder
                    <ArrowRight />
                  </>
                )}
              </Button>
            </div>

            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
              Bilgileriniz yalnızca doğrulanmış avukatlarla paylaşılır.
            </p>
          </div>
        )}
      </form>
    </Form>
  );
}

function StepIndicator({ current }: { current: 1 | 2 }) {
  return (
    <ol className="flex items-center gap-3 text-sm" aria-label="Form adımı">
      {[1, 2].map((step) => {
        const active = current === step;
        const done = current > step;
        return (
          <li key={step} className="flex items-center gap-3">
            <span
              className={cn(
                "inline-flex h-7 w-7 items-center justify-center rounded-full border text-sm font-medium",
                active && "border-accent bg-accent text-accent-foreground",
                done && "border-accent bg-accent/20 text-accent",
                !active && !done && "border-border bg-card text-muted-foreground",
              )}
              aria-current={active ? "step" : undefined}
            >
              {step}
            </span>
            <span className={cn(active ? "text-foreground" : "text-muted-foreground")}>
              {step === 1 ? "Davanız" : "İletişim"}
            </span>
            {step === 1 ? (
              <span className="mx-2 h-px w-10 bg-border" aria-hidden />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
