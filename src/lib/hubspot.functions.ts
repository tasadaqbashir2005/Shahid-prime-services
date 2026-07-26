import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/hubspot";

const leadSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(20),
  country: z.string().trim().min(2).max(60),
  service: z.string().trim().min(2).max(120),
  message: z.string().trim().max(1000).optional().default(""),
});

export const submitHubspotLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
    if (!LOVABLE_API_KEY || !HUBSPOT_API_KEY) {
      return { ok: false as const, error: "HubSpot is not configured" };
    }

    const [firstname, ...rest] = data.fullName.split(/\s+/);
    const properties: Record<string, string> = {
      firstname,
      lastname: rest.join(" ") || "-",
      phone: data.phone,
      country: data.country,
      // Free-text notes field available on all portals
      message: [
        `Requested Service: ${data.service}`,
        data.message ? `Message: ${data.message}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    };

    const headers = {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": HUBSPOT_API_KEY,
      "Content-Type": "application/json",
    };

    const res = await fetch(`${GATEWAY_URL}/crm/v3/objects/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({ properties }),
    });

    if (res.ok) {
      const created = (await res.json()) as { id?: string };
      return { ok: true as const, id: created.id ?? null };
    }

    const body = await res.text();
    console.error(`HubSpot contact create failed [${res.status}]: ${body}`);

    // Existing contact (409) → update it instead of failing the submission.
    if (res.status === 409) {
      const existingId = body.match(/Existing ID:\s*(\d+)/)?.[1];
      if (existingId) {
        const patch = await fetch(`${GATEWAY_URL}/crm/v3/objects/contacts/${existingId}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({ properties }),
        });
        if (patch.ok) return { ok: true as const, id: existingId };
        const patchBody = await patch.text();
        console.error(`HubSpot contact update failed [${patch.status}]: ${patchBody}`);
        return { ok: false as const, error: `HubSpot update failed (${patch.status})` };
      }
    }

    return { ok: false as const, error: `HubSpot request failed (${res.status})` };
  });
