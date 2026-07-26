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
    process.env.HUPSPOT_ACCESS_TOKEN ??
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
  const { url, headers, query } = transport;

  const [firstname, ...rest] = lead.fullName.split(/\s+/);
  const details = [
    `Full Name: ${lead.fullName}`,
    `Phone: ${lead.phone}`,
    `Country: ${lead.country}`,
    `Requested Service: ${lead.service}`,
    `Message: ${lead.message?.trim() || "—"}`,
  ].join("\n");

  // Full property set. `message` is the standard HubSpot contact property used by
  // forms; `service_requested` / `description` may not exist on every portal, so
  // invalid ones are dropped automatically on retry (see sendProperties below).
  const properties: Record<string, string> = {
    firstname,
    lastname: rest.join(" ") || "-",
    phone: lead.phone,
    country: lead.country,
    service_requested: lead.service,
    message: details,
    description: details,
  };

  /**
   * POST/PATCH properties, and if HubSpot rejects a property that doesn't exist
   * in the portal, drop just that property and retry (max 5 passes). Guarantees
   * Country + Service + Message land in whichever fields the portal supports.
   */
  async function sendProperties(
    target: string,
    method: "POST" | "PATCH",
    props: Record<string, string>,
  ): Promise<{ res: Response; body: string; props: Record<string, string> }> {
    let current = { ...props };
    for (let attempt = 0; attempt < 5; attempt++) {
      const res = await fetch(target, {
        method,
        headers,
        body: JSON.stringify({ properties: current }),
      });
      if (res.ok) return { res, body: "", props: current };
      const body = await res.text();

      // "Property \"service_requested\" does not exist" / PROPERTY_DOESNT_EXIST
      const invalid = new Set<string>();
      for (const m of body.matchAll(/"([A-Za-z0-9_]+)"\s*(?:does not exist|is not a valid)/g)) {
        invalid.add(m[1]);
      }
      for (const m of body.matchAll(/Property\s+"?([A-Za-z0-9_]+)"?\s+does not exist/gi)) {
        invalid.add(m[1]);
      }
      const droppable = [...invalid].filter((k) => k in current && !["firstname", "lastname", "phone"].includes(k));
      if (res.status === 400 && droppable.length > 0) {
        console.error(`HubSpot rejected unknown properties, retrying without: ${droppable.join(", ")}`);
        droppable.forEach((k) => delete current[k]);
        continue;
      }
      return { res, body, props: current };
    }
    return {
      res: new Response(null, { status: 400 }),
      body: "Exhausted property retries",
      props: current,
    };
  }

  const created = await sendProperties(`${url}/crm/v3/objects/contacts${query}`, "POST", properties);

  if (created.res.ok) {
    const json = (await created.res.json()) as { id?: string };
    return { ok: true, id: json.id ?? null };
  }

  console.error(`HubSpot contact create failed [${created.res.status}]: ${created.body}`);

  // Duplicate contact -> update the existing record instead of failing the lead.
  if (created.res.status === 409) {
    const existingId = created.body.match(/Existing ID:\s*(\d+)/)?.[1];
    if (existingId) {
      const patched = await sendProperties(
        `${url}/crm/v3/objects/contacts/${existingId}${query}`,
        "PATCH",
        created.props,
      );
      if (patched.res.ok) return { ok: true, id: existingId };
      console.error(`HubSpot contact update failed [${patched.res.status}]: ${patched.body}`);
      return { ok: false, error: `HubSpot update failed (${patched.res.status})` };
    }
  }

  return { ok: false, error: `HubSpot request failed (${created.res.status})` };
}

