import { createFileRoute } from "@tanstack/react-router";
import { Ticket } from "lucide-react";
import { SubServicePage } from "@/components/site/SubServicePage";
import { AIRLINE_SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services_/airline-ticketing")({
  head: () => ({
    meta: [
      { title: "Airline Ticketing — International & Domestic | SHAHID PRIME" },
      {
        name: "description",
        content:
          "Airline tickets for all major international and domestic airlines at highly competitive and discounted prices.",
      },
      { property: "og:title", content: "Airline Ticketing — SHAHID PRIME" },
      {
        property: "og:description",
        content: "Discounted international, domestic, group and corporate airline tickets.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Airline Ticketing",
          description:
            "International and domestic airline tickets at competitive, discounted prices.",
          provider: { "@type": "TravelAgency", name: "SHAHID PRIME SERVICES" },
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  component: () => (
    <SubServicePage
      eyebrow="Airline Ticketing"
      title="Airline Tickets — Anywhere You Fly"
      description="We provide airline tickets for all major international and domestic airlines at highly competitive and discounted prices."
      heroImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
      icon={Ticket}
      groups={[
        {
          title: "Ticketing Options",
          subtitle: "Choose the option that fits your travel",
          items: AIRLINE_SERVICES.map((s) => ({
            title: s,
            subtitle: "Airline Ticketing",
            service: `Airline Ticketing — ${s}`,
          })),
        },
      ]}
    />
  ),
});
