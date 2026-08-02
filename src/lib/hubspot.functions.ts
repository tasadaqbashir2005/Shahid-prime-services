import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { createHubspotContact } from "./hubspot.server";
import { INVALID_PHONE_MESSAGE, normalizePhone } from "./phone";

export const submitHubspotLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const parsed = z
      .object({
        fullName: z.string().trim().min(2).max(100),
        phone: z.string().trim().min(6).max(30),
        country: z.string().trim().min(2).max(60),
        service: z.string().trim().min(2).max(120),
        message: z.string().trim().max(1000).optional().default(""),
        // Hidden field — locked server-side so it is always "NEW".
        leadStatus: z.string().trim().optional().default("NEW"),
      })
      .parse(data);

    // Never trust client-side formatting: re-normalize server-side.
    const phone = normalizePhone(parsed.phone, { country: parsed.country });
    if (!phone.valid) throw new Error(INVALID_PHONE_MESSAGE);
    return { ...parsed, phone: phone.e164 };
  })
  .handler(async ({ data }) => createHubspotContact(data));

