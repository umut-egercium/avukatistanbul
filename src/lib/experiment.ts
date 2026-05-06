// Lightweight A/B testing helper.
// - Stable assignment: hashes (experiment_id, visitor_id) with FNV-1a, modulo
//   the variants count. Same visitor + same experiment → same variant.
// - Visitor id: persisted UUID in localStorage (`ai_visitor_id`).
// - Fires `experiment_variant` GA4 event once per session per experiment for
//   exposure tracking (skipped on SSR / when gtag is unavailable).
//
// Usage:
//   const variant = useExperiment("hero_cta_copy", ["a", "b"] as const);
//
// Caveat: Hash → modulo is not perfectly uniform when `variants.length` doesn't
// divide cleanly into 2^32, but the bias is below 1e-6 for any sane variant
// count and is fine for marketing-grade A/B tests.

import { useEffect, useState } from "react";

import { trackEvent } from "@/lib/analytics";

const VISITOR_ID_KEY = "ai_visitor_id";
const SESSION_FIRED_KEY = "ai_experiment_fired";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function getOrCreateVisitorId(): string {
  if (!isBrowser()) return "ssr";
  try {
    const existing = window.localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;
    const fresh =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `v-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(VISITOR_ID_KEY, fresh);
    return fresh;
  } catch {
    return "ephemeral";
  }
}

function fnv1a(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    // 32-bit FNV prime multiplication
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function useExperiment<V extends string>(
  name: string,
  variants: readonly V[],
): V {
  if (variants.length === 0) {
    throw new Error(`useExperiment: "${name}" needs at least one variant`);
  }

  const [variant] = useState<V>(() => {
    const visitorId = getOrCreateVisitorId();
    const bucket = fnv1a(`${name}:${visitorId}`) % variants.length;
    return variants[bucket]!;
  });

  useEffect(() => {
    if (!isBrowser()) return;
    try {
      const raw = window.sessionStorage.getItem(SESSION_FIRED_KEY);
      const fired: string[] = raw ? JSON.parse(raw) : [];
      const key = `${name}:${variant}`;
      if (fired.includes(key)) return;
      fired.push(key);
      window.sessionStorage.setItem(SESSION_FIRED_KEY, JSON.stringify(fired));
    } catch {
      // Storage unavailable — fire anyway, accept dup events.
    }
    trackEvent("experiment_variant", {
      experiment_id: name,
      variant,
    });
  }, [name, variant]);

  return variant;
}
