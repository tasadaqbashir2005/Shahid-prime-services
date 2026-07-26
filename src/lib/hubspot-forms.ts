/**
 * Browser-side HubSpot lead capture (no server secrets required).
 *
 * The HubSpot Forms submission endpoint is public: it only needs the portal ID
 * and a form GUID, both of which are safe to ship to the browser. This is the
 * host-independent fallback used when the server-side private-app token is not
 * available on the deployment (e.g. Vercel without HUBSPOT_ACCESS_TOKEN).
 */

export const HUBSPOT_PORTAL_ID = "246867099";

/** Set VITE_HUBSPOT_FORM_GUID in the hosting env to enable the browser fallback. */
export const HUBSPOT_FORM_GUID: string =
  (import.meta.env.VITE_HUBSPOT_FORM_GUID as string | undefined)?.trim() || "";

export type HubspotFormLead = {
  fullName: string;
  phone: string;
  country: string;
  service: string;
  message?: string;
};

export function hubspotFormsEnabled() {
  return HUBSPOT_FORM_GUID.length > 0;
}

export async function submitHubspotForm(lead: HubspotFormLead): Promise<{ ok: boolean; error?: string }> {
  if (!hubspotFormsEnabled()) {
    return { ok: false, error: "HubSpot form fallback not configured" };
  }

  const [firstname, ...rest] = lead.fullName.trim().split(/\s+/);
  const fields = [
    { name: "firstname", value: firstname || lead.fullName },
    { name: "lastname", value: rest.join(" ") || "-" },
    { name: "phone", value: lead.phone },
    { name: "country", value: lead.country },
    {
      name: "message",
      value: `Requested service: ${lead.service}\n${lead.message?.trim() || ""}`.trim(),
    },
  ];

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          context: {
            pageUri: typeof window !== "undefined" ? window.location.href : undefined,
            pageName: "Contact — Shahid Prime Travel and Tours",
          },
        }),
      },
    );

    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `HubSpot form submit failed [${res.status}]: ${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}
