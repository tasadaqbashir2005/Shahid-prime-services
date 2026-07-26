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
 * Normalize any phone input into E.164.
 *
 * Detection order:
 *  1. Explicit "+" prefix (kept as-is, only validated)
 *  2. "00" international prefix
 *  3. The country selected/typed by the user
 *  4. Pattern match against candidate countries
 *  5. DEFAULT_COUNTRY fallback (Pakistan)
 */
export function normalizePhone(
  raw: string,
  options: { country?: string | null; defaultCountry?: CountryCode } = {},
): PhoneNormalizationResult {
  const input = (raw ?? "").trim();
  if (!input) return { valid: false, error: INVALID_PHONE_MESSAGE };

  const cleaned = cleanPhoneInput(input);
  const digits = cleaned.replace(/\D/g, "");
  if (digits.length < 6) return { valid: false, error: INVALID_PHONE_MESSAGE };
  // Reject placeholder junk like 000000 / 999999 / 1111111.
  if (/^(\d)\1+$/.test(digits)) return { valid: false, error: INVALID_PHONE_MESSAGE };

  const selected = resolveCountry(options.country);
  const fallback = options.defaultCountry ?? DEFAULT_COUNTRY;

  /** Ordered list of candidate strings to hand to libphonenumber. */
  const attempts: { value: string; country?: CountryCode }[] = [];

  if (cleaned.startsWith("+")) {
    attempts.push({ value: cleaned });
  } else if (digits.startsWith("00")) {
    attempts.push({ value: `+${digits.slice(2)}` });
  } else {
    // National number for the country the user told us about.
    if (selected) attempts.push({ value: digits, country: selected });
    // Already carries a country calling code without "+" (e.g. 923114811886).
    attempts.push({ value: `+${digits}` });
    // Local format for each supported market, then the default fallback.
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
