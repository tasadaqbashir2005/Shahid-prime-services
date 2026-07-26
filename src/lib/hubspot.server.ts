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
};

/**
 * Two supported transports so the lead syncs no matter where the site is hosted:
 *  1. HUBSPOT_ACCESS_TOKEN (HubSpot private app token) -> direct HubSpot API.
 *     Works on any host (Vercel, Netlify, self-hosted).
 *  2. Lovable connector gateway (LOVABLE_API_KEY + HUBSPOT_API_KEY) -> used on
 *     Lovable preview/published deployments where those secrets are injected.
 */
function resolveTransport(): Transport | null {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (token) {
    return {
      url: HUBSPOT_API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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
    };
  }

  return null;
}

export async function createHubspotContact(lead: HubspotLead): Promise<HubspotLeadResult> {
  const transport = resolveTransport();
  if (!transport) {
    console.error(
      "HubSpot is not configured on this deployment: set HUBSPOT_ACCESS_TOKEN (private app token) in the hosting environment.",
    );
    return { ok: false, error: "HubSpot is not configured on this deployment" };
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

  const { url, headers } = transport;

  const res = await fetch(`${url}/crm/v3/objects/contacts`, {
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
      const patch = await fetch(`${url}/crm/v3/objects/contacts/${existingId}`, {
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
