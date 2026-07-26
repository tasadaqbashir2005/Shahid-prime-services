import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { SubServicePage } from "@/components/site/SubServicePage";
import { SAUDI_SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services_/saudi-khidmat")({
  head: () => ({
    meta: [
      { title: "Saudi Khidmat Services — Kafala, Wakala, Azad Visa | SHAHID PRIME" },
      {
        name: "description",
        content:
          "Complete in-country Saudi services: Wakala, Naqal Kafala, Azad Visa, Amal Manzali and more — managed on your behalf.",
      },
      { property: "og:title", content: "Saudi Khidmat Services — SHAHID PRIME" },
      { property: "og:description", content: "In-country Saudi services handled end-to-end." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Saudi Khidmat Services",
          description:
            "In-country Saudi services — Wakala, Naqal Kafala, Azad Visa, Amal Manzali and more.",
          provider: { "@type": "TravelAgency", name: "SHAHID PRIME SERVICES" },
          areaServed: "Saudi Arabia",
        }),
      },
    ],
  }),
  component: () => (
    <SubServicePage
      eyebrow="Saudi Khidmat"
      title="Saudi Khidmat Services"
      description="Complete in-country services managed on your behalf — Wakala, Kafala, Azad Visa, Amal Manzali and more."
      heroImage="https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1600&q=80"
      icon={Building2}
      groups={[
        {
          title: "Saudi Services",
          subtitle: "Professionally handled from Pakistan",
          items: SAUDI_SERVICES.map((s) => ({
            title: s,
            subtitle: "Saudi Khidmat",
            service: `Saudi Khidmat — ${s}`,
          })),
        },
      ]}
    />
  ),
});
