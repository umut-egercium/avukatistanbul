// Turkish mobile phone helpers.
// Storage format: digits-only, 11 chars starting with "05" (e.g. "05551234567").
// Display format: "0### ### ## ##" via formatPhone().

const DIGIT_RE = /\D+/g;

export function digitsOnly(input: string): string {
  return input.replace(DIGIT_RE, "");
}

export function isValidTurkishMobile(input: string): boolean {
  const digits = digitsOnly(input);
  return digits.length === 11 && digits.startsWith("05");
}

/**
 * Format input as the user types: "0### ### ## ##".
 * Pure formatter — caller manages caret position (we don't try to be clever).
 */
export function formatPhone(input: string): string {
  const d = digitsOnly(input).slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 4) return d;
  if (d.length <= 7) return `${d.slice(0, 4)} ${d.slice(4)}`;
  if (d.length <= 9) return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
  return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9)}`;
}
