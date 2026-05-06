// Customer-facing analytics.
//
// Public API (Agent 2 owns; Agent 3 may extend with `trackLawyerPanelEvent` etc.,
// but MUST NOT redefine these signatures):
//   - trackEvent
//   - trackCustomerRequestStep
//   - getAttributionParams
//   - newEventId
//
// The thin wrapper around `window.gtag` no-ops gracefully when GA isn't loaded
// (e.g. local dev, ad-blockers). Server-side relay (`ga-mp-track` edge fn) is
// out of scope for this file and lives on Agent 3's side.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const ATTRIBUTION_KEYS = ["gclid", "gbraid", "wbraid"] as const;
type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];

const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days
const STORAGE_KEY = "ai_attribution"; // localStorage payload
const COOKIE_KEY = "ai_attr"; // cookie fallback (cross-tab, browser-restart)

const CLICK_ID_RE = /^[A-Za-z0-9_-]+$/;

interface AttributionPayload {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  capturedAt: number;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isValidClickId(value: string): boolean {
  return value.length >= 8 && value.length <= 512 && CLICK_ID_RE.test(value);
}

function readFromUrl(): Partial<Record<AttributionKey, string>> {
  if (!isBrowser()) return {};
  const params = new URLSearchParams(window.location.search);
  const out: Partial<Record<AttributionKey, string>> = {};
  for (const key of ATTRIBUTION_KEYS) {
    const raw = params.get(key);
    if (raw && isValidClickId(raw)) out[key] = raw;
  }
  return out;
}

function readFromStorage(): AttributionPayload | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AttributionPayload;
    if (!parsed.capturedAt || Date.now() - parsed.capturedAt > ATTRIBUTION_TTL_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function readFromCookie(): AttributionPayload | null {
  if (!isBrowser()) return null;
  try {
    const match = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${COOKIE_KEY}=`));
    if (!match) return null;
    const raw = decodeURIComponent(match.slice(COOKIE_KEY.length + 1));
    const parsed = JSON.parse(raw) as AttributionPayload;
    if (!parsed.capturedAt || Date.now() - parsed.capturedAt > ATTRIBUTION_TTL_MS) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function persist(payload: AttributionPayload): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage quota / private mode — silently skip.
  }
  try {
    const expires = new Date(Date.now() + ATTRIBUTION_TTL_MS).toUTCString();
    document.cookie = `${COOKIE_KEY}=${encodeURIComponent(JSON.stringify(payload))}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {
    // Cookies disabled — skip.
  }
}

export function getAttributionParams(): {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
} {
  if (!isBrowser()) return {};

  const fromUrl = readFromUrl();
  if (Object.keys(fromUrl).length > 0) {
    const payload: AttributionPayload = { ...fromUrl, capturedAt: Date.now() };
    persist(payload);
    const { capturedAt: _captured, ...rest } = payload;
    return rest;
  }

  const stored = readFromStorage() ?? readFromCookie();
  if (!stored) return {};
  const { capturedAt: _captured, ...rest } = stored;
  return rest;
}

export function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback: timestamp + random — only used in environments without crypto.
  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 10)}`;
}

export function trackEvent(event: string, params?: Record<string, unknown>): void {
  if (!isBrowser()) return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", event, params ?? {});
  } catch {
    // Never let analytics throw into product code.
  }
}

export type CustomerRequestStep = 1 | 2;
export type CustomerRequestPhase = "view" | "complete";

const REQUEST_STEP_EVENT: Record<
  CustomerRequestStep,
  Record<CustomerRequestPhase, string>
> = {
  1: {
    view: "customer_request_flow_step_one_view",
    complete: "customer_request_flow_step_one_complete",
  },
  2: {
    view: "customer_request_flow_step_two_view",
    complete: "customer_request_flow_step_two_complete",
  },
};

export function trackCustomerRequestStep(
  step: CustomerRequestStep,
  phase: CustomerRequestPhase,
  params?: Record<string, unknown>,
): void {
  const event = REQUEST_STEP_EVENT[step][phase];
  trackEvent(event, {
    event_id: newEventId(),
    ...params,
  });
}
