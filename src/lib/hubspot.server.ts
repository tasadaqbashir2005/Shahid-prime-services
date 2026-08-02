const GATEWAY_URL = "https://connector-gateway.lovable.dev/hubspot";
const HUBSPOT_API_URL = "https://api.hubapi.com";

export type HubspotLead = {
  fullName: string;
  phone: string;
  country: string;
  service: string;
  message?: string;
  /** Hidden form field — always "NEW" so staff can spot fresh website leads. */
  leadStatus?: string;
};

export type HubspotLeadResult = { ok: true; id: string | null } | { ok: false; error: string };

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
    process.env.HUBSPOT_LEGACY_API_KEY ?? process.env.HUBSPOT_HAPIKEY ?? process.env.HAPIKEY;
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

  // Which contact properties actually exist in this portal? Sending an unknown
  // property makes HubSpot reject the whole request with 400, so we only send
  // fields the portal really has and fold the rest into a note.
  type PortalProp = {
    name: string;
    label: string;
    type?: string;
    fieldType?: string;
    readOnly?: boolean;
  };
  const portalProps: PortalProp[] = [];
  const existing = new Set<string>();
  try {
    const propsRes = await fetch(`${url}/crm/v3/properties/contacts${query}`, {
      method: "GET",
      headers,
    });
    if (propsRes.ok) {
      const json = (await propsRes.json()) as {
        results?: {
          name?: string;
          label?: string;
          type?: string;
          fieldType?: string;
          modificationMetadata?: { readOnlyValue?: boolean };
        }[];
      };
      json.results?.forEach((p) => {
        if (!p.name) return;
        existing.add(p.name);
        portalProps.push({
          name: p.name,
          label: p.label ?? "",
          type: p.type,
          fieldType: p.fieldType,
          readOnly: p.modificationMetadata?.readOnlyValue === true,
        });
      });
    } else {
      console.error(`HubSpot property list failed [${propsRes.status}]: ${await propsRes.text()}`);
    }
  } catch (e) {
    console.error("HubSpot property list error:", e);
  }
  const has = (name: string) => existing.size === 0 || existing.has(name);

  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  /**
   * Resolve a portal field by internal name OR by its visible label, so custom
   * columns the user created in HubSpot ("Selected services", "Description")
   * are found even when their internal name differs from our guess.
   */
  const findField = (candidates: string[]) => {
    const wanted = candidates.map(norm);
    // exact internal-name match first
    for (const c of candidates) {
      const p = portalProps.find((x) => x.name === c && !x.readOnly);
      if (p) return p.name;
    }
    // then normalized name / label match
    for (const w of wanted) {
      const p = portalProps.find((x) => !x.readOnly && (norm(x.name) === w || norm(x.label) === w));
      if (p) return p.name;
    }
    // finally a contains match on the label
    for (const w of wanted) {
      const p = portalProps.find(
        (x) => !x.readOnly && (norm(x.label).includes(w) || norm(x.name).includes(w)),
      );
      if (p) return p.name;
    }
    return undefined;
  };

  const properties: Record<string, string> = {
    firstname,
    lastname: rest.join(" ") || "-",
    phone: lead.phone,
  };
  if (has("country")) properties.country = lead.country;

  // Service goes into a dedicated field when one exists (matched by name or label).
  const serviceField = findField([
    "selected_services",
    "selected_service",
    "service_requested",
    "requested_service",
    "services",
    "service",
  ]);
  if (serviceField) properties[serviceField] = lead.service;

  // Message/Description goes into the first matching long-text field.
  const notesField = findField(["description", "message", "notes", "comments"]);
  if (notesField && notesField !== serviceField) {
    properties[notesField] = lead.message?.trim() ? lead.message.trim() : details;
  }

  console.log(
    `HubSpot field mapping -> service: ${serviceField ?? "none"}, description: ${notesField ?? "none"} (portal props: ${portalProps.length})`,
  );

  /**
   * POST/PATCH properties; if HubSpot still rejects a property, drop it and retry.
   */
  async function sendProperties(
    target: string,
    method: "POST" | "PATCH",
    props: Record<string, string>,
  ): Promise<{ res: Response; body: string; props: Record<string, string> }> {
    const current = { ...props };
    for (let attempt = 0; attempt < 5; attempt++) {
      const res = await fetch(target, {
        method,
        headers,
        body: JSON.stringify({ properties: current }),
      });
      if (res.ok) return { res, body: "", props: current };
      const body = await res.text();

      const invalid = new Set<string>();
      try {
        const parsed = JSON.parse(body) as {
          message?: string;
          errors?: { name?: string; message?: string }[];
        };
        parsed.errors?.forEach((err) => err.name && invalid.add(err.name));
        for (const m of (parsed.message ?? "").matchAll(/"([A-Za-z0-9_]+)"/g)) invalid.add(m[1]);
      } catch {
        /* fall through to regex scan */
      }
      for (const m of body.matchAll(
        /\\?"([A-Za-z0-9_]+)\\?"\s*(?:does not exist|is not valid)/gi,
      )) {
        invalid.add(m[1]);
      }
      const droppable = [...invalid].filter(
        (k) => k in current && !["firstname", "lastname", "phone"].includes(k),
      );
      if (res.status === 400 && droppable.length > 0) {
        console.error(`HubSpot rejected properties, retrying without: ${droppable.join(", ")}`);
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

  /** Attach the full lead details as a HubSpot note so nothing is lost. */
  async function attachNote(contactId: string) {
    try {
      const res = await fetch(`${url}/crm/v3/objects/notes${query}`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          properties: {
            hs_note_body: `Website contact form submission\n\n${details}`,
            hs_timestamp: new Date().toISOString(),
          },
          associations: [
            {
              to: { id: contactId },
              types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }],
            },
          ],
        }),
      });
      if (!res.ok) console.error(`HubSpot note create failed [${res.status}]: ${await res.text()}`);
    } catch (e) {
      console.error("HubSpot note create error:", e);
    }
  }

  const created = await sendProperties(
    `${url}/crm/v3/objects/contacts${query}`,
    "POST",
    properties,
  );

  if (created.res.ok) {
    const json = (await created.res.json()) as { id?: string };
    if (json.id) await attachNote(json.id);
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
      if (patched.res.ok) {
        await attachNote(existingId);
        return { ok: true, id: existingId };
      }
      console.error(`HubSpot contact update failed [${patched.res.status}]: ${patched.body}`);
      return { ok: false, error: `HubSpot update failed (${patched.res.status})` };
    }
  }

  return { ok: false, error: `HubSpot request failed (${created.res.status})` };
}
