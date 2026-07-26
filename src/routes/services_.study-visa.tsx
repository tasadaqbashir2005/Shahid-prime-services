import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { SubServicePage } from "@/components/site/SubServicePage";
import { STUDY_COUNTRIES } from "@/lib/site-data";

export const Route = createFileRoute("/services_/study-visa")({
  head: () => ({
    meta: [
      { title: "Study Visa — European Universities | SHAHID PRIME" },
      {
        name: "description",
        content:
          "Study visa consulting for top European universities with scholarship guidance and full application support.",
      },
      { property: "og:title", content: "Study Visa — SHAHID PRIME" },
      {
        property: "og:description",
        content: "Accredited European universities with end-to-end application support.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Study Visa Services",
          description:
            "Study visa consulting for top European universities with scholarship guidance and full application support.",
          provider: { "@type": "TravelAgency", name: "SHAHID PRIME SERVICES" },
          areaServed: "Europe",
        }),
      },
    ],
  }),
  component: () => (
    <SubServicePage
      eyebrow="Study Visa"
      title="Study Visa Destinations"
      description="Accredited universities across Europe with scholarship guidance, admission support and complete visa documentation."
      heroImage="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80"
      icon={GraduationCap}
      groups={[
        {
          title: "Study Destinations",
          subtitle: "Choose your future — we handle the rest",
          items: STUDY_COUNTRIES.map((c) => ({
            title: c,
            subtitle: "Study Visa",
            service: `Study Visa — ${c}`,
          })),
        },
      ]}
    />
  ),
});
