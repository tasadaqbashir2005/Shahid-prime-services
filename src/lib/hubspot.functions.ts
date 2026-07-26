import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { createHubspotContact } from "./hubspot.server";

export const submitHubspotLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        fullName: z.string().trim().min(2).max(100),
        phone: z.string().trim().min(7).max(20),
        country: z.string().trim().min(2).max(60),
        service: z.string().trim().min(2).max(120),
        message: z.string().trim().max(1000).optional().default(""),
      })
      .parse(data),
  )
  .handler(async ({ data }) => createHubspotContact(data));
