import { createFileRoute } from "@tanstack/react-router";
import { Plane } from "lucide-react";
import { SubServicePage } from "@/components/site/SubServicePage";
import { SCHENGEN_COUNTRIES, GLOBAL_COUNTRIES, WORK_PERMIT_COUNTRIES } from "@/lib/site-data";

export const Route = createFileRoute("/services_/visit-visa")({
  head: () => ({
    meta: [
      { title: "Visit Visa — Schengen, Global & Work Permits | SHAHID PRIME" },
      {
        name: "description",
        content:
          "Apply for Schengen, global visit visas, and work permits with high approval rates and full documentation support.",
      },
      { property: "og:title", content: "Visit Visa Services — SHAHID PRIME" },
      {
        property: "og:description",
        content: "Schengen, global destinations and work permit programs.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Visit Visa Services",
          description: "Schengen, global visit visas and work permits with high approval rates.",
          provider: { "@type": "TravelAgency", name: "SHAHID PRIME SERVICES" },
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  component: () => (
    <SubServicePage
      eyebrow="Visit Visa"
      title="Visit Visa Destinations"
      description="From the 29 Schengen states to the UK, USA, Canada, Australia and beyond — we prepare, review and submit every file to embassy standards."
      heroImage="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&q=80"
      icon={Plane}
      groups={[
        {
          title: "Schengen Visit Visa",
          subtitle: "One visa — access 29 European countries",
          items: SCHENGEN_COUNTRIES.map((c) => ({
            title: c,
            subtitle: "Schengen",
            service: `Schengen Visit Visa — ${c}`,
          })),
        },
        {
          title: "Global Visit Visa",
          subtitle: "Popular destinations worldwide",
          items: GLOBAL_COUNTRIES.map((c) => ({
            title: c,
            subtitle: "Global",
            service: `Global Visit Visa — ${c}`,
          })),
        },
        {
          title: "Work Permits",
          subtitle: "Employment-based visa programs",
          items: WORK_PERMIT_COUNTRIES.map((c) => ({
            title: c,
            subtitle: "Work Permit",
            service: `Work Permit — ${c}`,
          })),
        },
      ]}
    />
  ),
});
