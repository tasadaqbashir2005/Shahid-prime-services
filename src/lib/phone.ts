/**
 * Production-grade international phone normalization.
 *
 * Every phone number entered anywhere in the app must pass through
 * `normalizePhone()` before it is stored, sent to the CRM, forwarded to
 * n8n/Zapier, or used with the WhatsApp API. The raw user input is never used.
 *
 * Parsing/validation is delegated to libphonenumber-js (a port of Google's
 * libphonenumber) — no regex-only guessing.
 */
import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
  type CountryCode,
} from "libphonenumber-js";

/** Fallback country used when the input carries no country information. */
export const DEFAULT_COUNTRY: CountryCode = "PK";

/**
 * Countries we try (in order) when the input has no explicit country code.
 * Ordered by the audience of this site.
 */
const CANDIDATE_COUNTRIES: CountryCode[] = [
  "SA",
  "PK",
  "AE",
  "IN",
  "BD",
  "QA",
  "KW",
  "BH",
  "OM",
  "GB",
  "US",
  "CA",
];

/** Loose name/code -> ISO country code map for the free-text country field. */
const COUNTRY_NAME_TO_ISO: Record<string, CountryCode> = {
  pakistan: "PK",
  pk: "PK",
  "saudi arabia": "SA",
  saudia: "SA",
  saudi: "SA",
  ksa: "SA",
  sa: "SA",
  uae: "AE",
  "united arab emirates": "AE",
  dubai: "AE",
  "abu dhabi": "AE",
  ae: "AE",
  uk: "GB",
  "united kingdom": "GB",
  england: "GB",
  britain: "GB",
  gb: "GB",
  usa: "US",
  us: "US",
  "united states": "US",
  america: "US",
  canada: "CA",
  ca: "CA",
  qatar: "QA",
  kuwait: "KW",
  bahrain: "BH",
  oman: "OM",
  turkey: "TR",
  india: "IN",
  bangladesh: "BD",
};

export type PhoneNormalizationResult =
  | {
      valid: true;
      /** E.164 value, e.g. "+923114811886" — the only value that may be stored. */
      e164: string;
      /** Digits only, e.g. "923114811886" — for wa.me / WhatsApp Business API. */
      whatsapp: string;
      /** Human-friendly international display, e.g. "+92 311 4811886". */
      international: string;
      country?: CountryCode;
    }
  | { valid: false; error: string };

export const INVALID_PHONE_MESSAGE = "Please enter a valid mobile number.";

/**
 * Strip everything that is not a digit, keeping a single leading "+".
 * Handles spaces, hyphens, dots, slashes, brackets, letters, duplicate pluses
 * and copy-pasted WhatsApp formatting.
 */
export function cleanPhoneInput(raw: string): string {
  const trimmed = (raw ?? "").trim();
  const hasPlus = trimmed.startsWith("+") || /^00\d/.test(trimmed.replace(/[^\d+]/g, ""));
  const digits = trimmed.replace(/\D/g, "");
  return (hasPlus && !digits.startsWith("00") ? "+" : "") + digits;
}

/** Resolve a free-text country field (or ISO code) to an ISO country code. */
export function resolveCountry(country?: string | null): CountryCode | undefined {
  if (!country) return undefined;
  const key = country.trim().toLowerCase();
  return COUNTRY_NAME_TO_ISO[key];
}

/**
 * Deterministic mobile rules per market.
 *
 * `nsn` = national significant number (trunk "0" already stripped).
 * These run BEFORE the generic libphonenumber guessing so that e.g. a Saudi
 * number can never be mistaken for a Pakistani one.
 */
const MOBILE_RULES: { country: CountryCode; cc: string; nsn: RegExp }[] = [
  { country: "SA", cc: "966", nsn: /^5\d{8}$/ }, // +966 5XXXXXXXX
  { country: "AE", cc: "971", nsn: /^5\d{8}$/ }, // +971 5XXXXXXXX
  { country: "PK", cc: "92", nsn: /^3\d{9}$/ }, // +92 3XXXXXXXXX
  { country: "IN", cc: "91", nsn: /^[6-9]\d{9}$/ }, // +91 [6-9]XXXXXXXXX
  { country: "BD", cc: "880", nsn: /^1[3-9]\d{8}$/ }, // +880 1XXXXXXXXX
  { country: "QA", cc: "974", nsn: /^[3567]\d{7}$/ },
  { country: "KW", cc: "965", nsn: /^[569]\d{7}$/ },
  { country: "BH", cc: "973", nsn: /^[3]\d{7}$/ },
  { country: "OM", cc: "968", nsn: /^[79]\d{7}$/ },
  { country: "GB", cc: "44", nsn: /^7\d{9}$/ },
  { country: "US", cc: "1", nsn: /^[2-9]\d{9}$/ },
  { country: "CA", cc: "1", nsn: /^[2-9]\d{9}$/ },
];

/** Older UAE/Saudi style numbers sometimes come as 9 digits with no trunk 0. */
function buildResult(e164: string): PhoneNormalizationResult {
  const parsed = parsePhoneNumberFromString(e164);
  if (!parsed?.isValid()) return { valid: false, error: INVALID_PHONE_MESSAGE };
  return {
    valid: true,
    e164: parsed.number,
    whatsapp: parsed.number.replace(/\D/g, ""),
    international: parsed.formatInternational(),
    country: parsed.country,
  };
}

/**
 * Normalize any phone input into E.164 (the only format WhatsApp Business API
 * and HubSpot ever receive).
 *
 * Detection order:
 *  1. Explicit "+" / "00" international prefix
 *  2. Digits already carrying a country calling code (e.g. 966566726277)
 *  3. Explicit per-country mobile rules, preferring the country the user typed
 *  4. libphonenumber pattern match against candidate countries
 *  5. DEFAULT_COUNTRY fallback (Pakistan)
 */
export function normalizePhone(
  raw: string,
  options: { country?: string | null; defaultCountry?: CountryCode } = {},
): PhoneNormalizationResult {
  const input = (raw ?? "").trim();
  if (!input) return { valid: false, error: INVALID_PHONE_MESSAGE };

  const cleaned = cleanPhoneInput(input);
  let digits = cleaned.replace(/\D/g, "");
  if (digits.length < 6) return { valid: false, error: INVALID_PHONE_MESSAGE };
  // Reject placeholder junk like 000000 / 999999 / 1111111.
  if (/^(\d)\1+$/.test(digits)) return { valid: false, error: INVALID_PHONE_MESSAGE };

  const selected = resolveCountry(options.country);
  const fallback = options.defaultCountry ?? DEFAULT_COUNTRY;
  const hasIntlPrefix = cleaned.startsWith("+") || digits.startsWith("00");
  if (digits.startsWith("00")) digits = digits.slice(2);

  // 1 + 2 — international form: trust the country calling code as written.
  if (hasIntlPrefix) {
    const direct = buildResult(`+${digits}`);
    if (direct.valid) return direct;
  }

  /** Rules ordered so the country the visitor typed always wins. */
  const rules = selected
    ? [...MOBILE_RULES.filter((r) => r.country === selected), ...MOBILE_RULES]
    : MOBILE_RULES;

  if (!hasIntlPrefix) {
    // 2 — digits already prefixed with a calling code, no "+" (966566726277).
    for (const rule of rules) {
      if (digits.startsWith(rule.cc) && rule.nsn.test(digits.slice(rule.cc.length))) {
        const result = buildResult(`+${digits}`);
        if (result.valid) return result;
      }
    }

    // 3 — local format, with or without the national trunk "0".
    const nsn = digits.replace(/^0+/, "");
    for (const rule of rules) {
      if (rule.nsn.test(nsn)) {
        const result = buildResult(`+${rule.cc}${nsn}`);
        if (result.valid) return result;
      }
    }
  }

  // 4 — generic libphonenumber fallback for every other country.
  const attempts: { value: string; country?: CountryCode }[] = [];
  if (hasIntlPrefix) {
    attempts.push({ value: `+${digits}` });
  } else {
    if (selected) attempts.push({ value: digits, country: selected });
    if (!digits.startsWith("0")) attempts.push({ value: `+${digits}` });
    for (const c of [selected, ...CANDIDATE_COUNTRIES, fallback]) {
      if (c) attempts.push({ value: digits, country: c });
    }
  }

  for (const attempt of attempts) {
    try {
      const parsed = parsePhoneNumberFromString(attempt.value, attempt.country);
      if (parsed?.isValid()) {
        return {
          valid: true,
          e164: parsed.number,
          whatsapp: parsed.number.replace(/\D/g, ""),
          international: parsed.formatInternational(),
          country: parsed.country,
        };
      }
    } catch {
      /* try the next candidate */
    }
  }

  // Last resort: possible-but-unconfirmed numbers are still rejected.
  if (cleaned.startsWith("+") && isValidPhoneNumber(cleaned)) {
    return {
      valid: true,
      e164: cleaned,
      whatsapp: cleaned.slice(1),
      international: cleaned,
    };
  }

  return { valid: false, error: INVALID_PHONE_MESSAGE };
}

/** Convenience: returns the E.164 string or null. */
export function toE164(raw: string, country?: string | null): string | null {
  const result = normalizePhone(raw, { country });
  return result.valid ? result.e164 : null;
}

/** Convenience: digits-only number for the WhatsApp API, or null. */
export function toWhatsAppNumber(raw: string, country?: string | null): string | null {
  const result = normalizePhone(raw, { country });
  return result.valid ? result.whatsapp : null;
}
