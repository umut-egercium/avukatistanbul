// notify-lawyers — dispatches a customer request to up to 3 verified lawyers.
//
// Triggered by the public.requests AFTER INSERT trigger
// (dispatch_request_notifications) which POSTs { request_id } here with a
// shared secret in the X-Notify-Secret header.
//
// Idempotent: re-firing for the same request never double-charges (the SQL
// helper public.record_lead_notification() short-circuits when a notification
// log row already exists).
//
// Email send: Resend if RESEND_API_KEY is set, console-log fallback otherwise
// (so the migration + function can be deployed before email is wired up).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const SHARED_SECRET = Deno.env.get("NOTIFY_SHARED_SECRET");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RESEND_FROM =
  Deno.env.get("RESEND_FROM") ??
  "AvukatIstanbul <noreply@avukatistanbul.net>";

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error(
    "[notify-lawyers] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
  );
}

const supabase = createClient(SUPABASE_URL ?? "", SERVICE_ROLE ?? "", {
  auth: { persistSession: false, autoRefreshToken: false },
});

interface RequestRow {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  city: string;
  district: string | null;
  practice_area: string;
  case_type: string | null;
  description: string | null;
  urgency: "urgent" | "soon" | "flexible" | null;
  created_at: string;
}

interface LawyerRow {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  district: string | null;
  practice_areas: string[];
}

// Mirrors src/data/legalCategories.ts. Kept duplicated intentionally — the
// edge function can't import from src/. Update both when the canonical list
// changes (rare).
const CATEGORY_NAMES: Record<string, string> = {
  "bosanma-hukuku": "Boşanma Hukuku",
  "ceza-hukuku": "Ceza Hukuku",
  "is-hukuku": "İş Hukuku",
  "tazminat-hukuku": "Trafik & Tazminat Hukuku",
  "miras-hukuku": "Miras Hukuku",
  "gayrimenkul-kira-hukuku": "Gayrimenkul & Kira Hukuku",
  "ticaret-hukuku": "Ticaret Hukuku",
  "icra-iflas-hukuku": "İcra & İflas Hukuku",
  "aile-hukuku": "Aile Hukuku",
  "tuketici-hukuku": "Tüketici Hukuku",
  "yabancilar-hukuku": "Yabancılar & Vatandaşlık Hukuku",
  "kvkk-bilisim-hukuku": "KVKK & Bilişim Hukuku",
};

const URGENCY_LABEL: Record<string, string> = {
  urgent: "Acil",
  soon: "Yakın zamanda",
  flexible: "Esnek",
};

interface ResultEntry {
  lawyer_id: string;
  email_status: string;
  charged: boolean;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // 1. Verify shared secret if configured
  if (SHARED_SECRET) {
    const presented = req.headers.get("X-Notify-Secret");
    if (presented !== SHARED_SECRET) {
      return new Response("Forbidden", { status: 403 });
    }
  }

  // 2. Parse body
  let payload: { request_id?: string };
  try {
    payload = await req.json();
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }
  const requestId = payload.request_id;
  if (!requestId) {
    return new Response("request_id required", { status: 400 });
  }

  // 3. Idempotency short-circuit
  const { count: existing } = await supabase
    .from("request_notification_logs")
    .select("id", { count: "exact", head: true })
    .eq("request_id", requestId);

  if (existing !== null && existing > 0) {
    return json({
      status: "already_processed",
      existing_log_count: existing,
    });
  }

  // 4. Load the request
  const { data: requestData, error: reqError } = await supabase
    .from("requests")
    .select(
      "id, customer_name, customer_email, customer_phone, city, district, practice_area, case_type, description, urgency, created_at",
    )
    .eq("id", requestId)
    .maybeSingle();
  if (reqError || !requestData) {
    return json(
      {
        status: "request_not_found",
        error: reqError?.message ?? null,
      },
      404,
    );
  }
  const r = requestData as RequestRow;

  // 5. Pick candidate lawyers via RPC
  const { data: candidates, error: pickError } = await supabase.rpc(
    "pick_lawyers_for_request",
    { p_request_id: requestId },
  );
  if (pickError) {
    return json(
      { status: "pick_error", error: pickError.message },
      500,
    );
  }
  const lawyers = (candidates ?? []) as LawyerRow[];

  // 6. For each: atomic charge+log, then email on success
  const results: ResultEntry[] = [];

  for (const lawyer of lawyers) {
    const { data: recordData, error: recordError } = await supabase.rpc(
      "record_lead_notification",
      { p_request_id: r.id, p_lawyer_id: lawyer.id },
    );
    if (recordError) {
      results.push({
        lawyer_id: lawyer.id,
        email_status: `record_error:${recordError.message}`,
        charged: false,
      });
      continue;
    }

    const row = Array.isArray(recordData) ? recordData[0] : recordData;
    const charged: boolean = row?.charged ?? false;

    if (!charged) {
      results.push({
        lawyer_id: lawyer.id,
        email_status: "skipped_not_charged",
        charged: false,
      });
      continue;
    }

    const emailStatus = await sendEmail(lawyer, r);
    results.push({
      lawyer_id: lawyer.id,
      email_status: emailStatus,
      charged: true,
    });
  }

  return json({
    status: "ok",
    request_id: requestId,
    candidates: lawyers.length,
    notified: results.filter((x) => x.charged).length,
    results,
  });
});

async function sendEmail(
  lawyer: LawyerRow,
  r: RequestRow,
): Promise<string> {
  if (!lawyer.email) return "no_email_on_file";

  const subject = `Yeni İstanbul lead'i: ${
    CATEGORY_NAMES[r.practice_area] ?? r.practice_area
  }`;
  const html = renderHtml(lawyer, r);
  const text = renderText(lawyer, r);

  if (!RESEND_API_KEY) {
    console.log(
      "[notify-lawyers] RESEND_API_KEY missing; would email",
      lawyer.email,
      "·",
      subject,
    );
    return "skipped_no_api_key";
  }

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: lawyer.email,
        subject,
        html,
        text,
      }),
    });
    if (!resp.ok) {
      const errText = await resp.text();
      console.error(
        "[notify-lawyers] resend error:",
        resp.status,
        errText,
      );
      return `resend_error_${resp.status}`;
    }
    return "sent";
  } catch (err) {
    console.error("[notify-lawyers] resend exception:", err);
    return "resend_exception";
  }
}

function renderHtml(lawyer: LawyerRow, r: RequestRow): string {
  const category = CATEGORY_NAMES[r.practice_area] ?? r.practice_area;
  const urgency = r.urgency ? URGENCY_LABEL[r.urgency] : null;
  const phoneFormatted = formatPhone(r.customer_phone);
  const phoneLink = `tel:${r.customer_phone}`;

  return `<!doctype html>
<html lang="tr">
<head><meta charset="UTF-8" /><title>Yeni Lead</title></head>
<body style="margin:0;padding:0;font-family:Inter,Arial,sans-serif;background:#f7f3ec;color:#10182b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;border:1px solid #d9d2c4;overflow:hidden;">
          <tr><td style="padding:24px 24px 8px 24px;">
            <p style="font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#a87a2e;margin:0 0 4px 0;font-weight:600;">Yeni Lead</p>
            <h1 style="font-family:Georgia,serif;font-size:24px;font-weight:600;margin:0;letter-spacing:-0.01em;line-height:1.2;">
              ${escapeHtml(category)}${
    r.case_type ? ` · ${escapeHtml(r.case_type)}` : ""
  }
            </h1>
          </td></tr>
          <tr><td style="padding:0 24px 8px 24px;">
            <p style="margin:0;color:#566;line-height:1.5;">Sayın ${escapeHtml(
              lawyer.full_name,
            )},</p>
            <p style="margin:8px 0 0 0;color:#566;line-height:1.5;">İstanbul${
              r.district ? ` ${escapeHtml(formatDistrictName(r.district))}` : ""
            } bölgesinde, uzmanlık alanınıza uygun yeni bir müvekkil talebi var.</p>
          </td></tr>
          <tr><td style="padding:16px 24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f3ec;border-radius:8px;">
              <tr><td style="padding:16px;">
                <p style="margin:0 0 4px 0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;">Müvekkil</p>
                <p style="margin:0 0 14px 0;font-weight:600;font-size:16px;">${escapeHtml(
                  r.customer_name,
                )}</p>

                <p style="margin:0 0 4px 0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;">Telefon</p>
                <p style="margin:0 0 14px 0;font-size:16px;"><a href="${phoneLink}" style="color:#10182b;text-decoration:none;font-weight:600;">${phoneFormatted}</a></p>

                ${
                  r.customer_email
                    ? `<p style="margin:0 0 4px 0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;">E-posta</p><p style="margin:0 0 14px 0;font-size:14px;"><a href="mailto:${escapeHtml(
                        r.customer_email,
                      )}" style="color:#10182b;text-decoration:none;">${escapeHtml(
                        r.customer_email,
                      )}</a></p>`
                    : ""
                }

                ${
                  urgency
                    ? `<p style="margin:0 0 4px 0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;">Aciliyet</p><p style="margin:0;font-size:14px;">${escapeHtml(
                        urgency,
                      )}</p>`
                    : ""
                }
              </td></tr>
            </table>
          </td></tr>
          ${
            r.description
              ? `<tr><td style="padding:0 24px 16px 24px;"><p style="margin:0 0 4px 0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#888;">Müvekkil notu</p><p style="margin:0;line-height:1.6;color:#333;white-space:pre-wrap;">${escapeHtml(
                  r.description,
                )}</p></td></tr>`
              : ""
          }
          <tr><td style="padding:8px 24px 24px 24px;">
            <a href="https://avukatistanbul.net/panel/talepler" style="display:inline-block;background:#10182b;color:#f7f3ec;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px;">Panele git ve teklif gönder</a>
          </td></tr>
          <tr><td style="padding:16px 24px;border-top:1px solid #ece8db;">
            <p style="margin:0;font-size:12px;color:#888;line-height:1.5;">Bu lead için bakiyenizden 1 kredi düşüldü. Detaylar: <a href="https://avukatistanbul.net/panel/krediler" style="color:#a87a2e;">panel/krediler</a>.</p>
            <p style="margin:8px 0 0 0;font-size:11px;color:#aaa;">AvukatIstanbul · İstanbul · avukatistanbul.net</p>
          </td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function renderText(lawyer: LawyerRow, r: RequestRow): string {
  const category = CATEGORY_NAMES[r.practice_area] ?? r.practice_area;
  const urgency = r.urgency ? URGENCY_LABEL[r.urgency] : "—";
  const lines = [
    `Sayın ${lawyer.full_name},`,
    "",
    "İstanbul'da yeni bir müvekkil talebi geldi.",
    "",
    `Hukuk dalı: ${category}${r.case_type ? ` · ${r.case_type}` : ""}`,
    `İlçe: ${r.district ? formatDistrictName(r.district) : "—"}`,
    `Aciliyet: ${urgency}`,
    "",
    `Müvekkil: ${r.customer_name}`,
    `Telefon: ${formatPhone(r.customer_phone)}`,
    r.customer_email ? `E-posta: ${r.customer_email}` : "",
    "",
    r.description ? `Notu:\n${r.description}\n` : "",
    "Panelinize gidin: https://avukatistanbul.net/panel/talepler",
    "",
    "Bu lead için bakiyenizden 1 kredi düşüldü.",
    "AvukatIstanbul · avukatistanbul.net",
  ].filter(Boolean);
  return lines.join("\n");
}

function formatDistrictName(slug: string): string {
  // Slugs are ASCII (e.g. "kadikoy"); display names need TR diacritics.
  // We only need a rough capitalization here — when a verified lawyer
  // sees this email, they'll already know their own district. Doing a
  // best-effort title case + leaving the slug-form is fine for v1.
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function formatPhone(raw: string): string {
  const d = raw.replace(/\D+/g, "");
  if (d.length !== 11) return raw;
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9, 11)}`;
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
