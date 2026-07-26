const GATEWAY_URL = "https://connector-gateway.lovable.dev/hubspot";
const HUBSPOT_API_URL = "https://api.hubapi.com";

export type HubspotLead = {
  fullName: string;
  phone: string;
  country: string;
  service: string;
  message?: string;
};

export type HubspotLeadResult =
  | { ok: true; id: string | null }
  | { ok: false; error: string };

type Transport = {
  url: string;
  headers: Record<string, string>;
  /** Query string (with leading "?") appended to every request — legacy hapikey auth. */
  query: string;
};

/**
 * Two supported transports so the lead syncs no matter where the site is hosted:
 *  1. HUBSPOT_ACCESS_TOKEN (HubSpot private app token) -> direct HubSpot API.
 *     Works on any host (Vercel, Netlify, self-hosted).
 *  2. Lovable connector gateway (LOVABLE_API_KEY + HUBSPOT_API_KEY) -> used on
 *     Lovable preview/published deployments where those secrets are injected.
 */
function resolveTransport(): Transport | null {
  const token =
    process.env.HUBSPOT_ACCESS_TOKEN ??
    process.env.HUBSPOT_PRIVATE_APP_TOKEN ??
    process.env.HUBSPOT_TOKEN;
  if (token) {
    return {
      url: HUBSPOT_API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      query: "",
    };
  }

  // Legacy HubSpot API key (hapikey). Only works on portals that still have a
  // legacy key enabled — HubSpot retired these for most accounts.
  const legacyKey =
    process.env.HUBSPOT_LEGACY_API_KEY ??
    process.env.HUBSPOT_HAPIKEY ??
    process.env.HAPIKEY;
  if (legacyKey) {
    return {
      url: HUBSPOT_API_URL,
      headers: { "Content-Type": "application/json" },
      query: `?hapikey=${encodeURIComponent(legacyKey)}`,
    };
  }

  const lovableApiKey = process.env.LOVABLE_API_KEY;
  const hubspotApiKey = process.env.HUBSPOT_API_KEY;
  if (lovableApiKey && hubspotApiKey) {
    return {
      url: GATEWAY_URL,
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "X-Connection-Api-Key": hubspotApiKey,
        "Content-Type": "application/json",
      },
      query: "",
    };
  }

  return null;
}

export async function createHubspotContact(lead: HubspotLead): Promise<HubspotLeadResult> {
  const transport = resolveTransport();
  if (!transport) {
    const seen = Object.keys(process.env ?? {})
      .filter((k) => /HUBSPOT|LOVABLE|HAPIKEY/i.test(k))
      .join(", ");
    console.error(
      `HubSpot is not configured on this deployment. Set HUBSPOT_ACCESS_TOKEN in the hosting environment. Related env keys visible to the server: [${seen || "none"}]`,
    );
    return {
      ok: false,
      error: `HubSpot token missing on server (env keys seen: ${seen || "none"}; total env vars: ${Object.keys(process.env ?? {}).length})`,
    };
  }


  const [firstname, ...rest] = lead.fullName.split(/\s+/);
  const properties: Record<string, string> = {
    firstname,
    lastname: rest.join(" ") || "-",
    phone: lead.phone,
    country: lead.country,
    message: [
      `Requested Service: ${lead.service}`,
      lead.message?.trim() ? `Message: ${lead.message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  };

  const { url, headers, query } = transport;

  const res = await fetch(`${url}/crm/v3/objects/contacts${query}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ properties }),
  });

  if (res.ok) {
    const created = (await res.json()) as { id?: string };
    return { ok: true, id: created.id ?? null };
  }

  const body = await res.text();
  console.error(`HubSpot contact create failed [${res.status}]: ${body}`);

  // Duplicate contact -> update the existing record instead of failing the lead.
  if (res.status === 409) {
    const existingId = body.match(/Existing ID:\s*(\d+)/)?.[1];
    if (existingId) {
      const patch = await fetch(`${url}/crm/v3/objects/contacts/${existingId}${query}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ properties }),
      });
      if (patch.ok) return { ok: true, id: existingId };
      console.error(`HubSpot contact update failed [${patch.status}]: ${await patch.text()}`);
      return { ok: false, error: `HubSpot update failed (${patch.status})` };
    }
  }

  return { ok: false, error: `HubSpot request failed (${res.status})` };
}
