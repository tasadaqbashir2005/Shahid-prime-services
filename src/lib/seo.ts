import {
  BRAND_NAME,
  CONTACT_EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  SITE_URL,
  WHATSAPP_NUMBER,
  CR_NUMBER,
} from "@/lib/site-data";

export const abs = (path: string) => `${SITE_URL}${path}`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "Shahid Prime Travel and Tours",
  alternateName: [BRAND_NAME, "Shahid Prime Services", "شاهد برايم للخدمات"],
  url: SITE_URL,
  email: CONTACT_EMAIL,
  telephone: `+${WHATSAPP_NUMBER}`,
  founder: { "@type": "Person", name: "Shahid Bashir" },
  description:
    "Business setup, company formation, Commercial Registration (CR), MISA licensing, PRO services, VAT (ZATCA) registration, accounting and visa consultancy in Jeddah and across Saudi Arabia.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jeddah",
    addressRegion: "Makkah Province",
    addressCountry: "SA",
  },
  areaServed: [
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "City", name: "Jeddah" },
    { "@type": "City", name: "Riyadh" },
    { "@type": "Country", name: "Pakistan" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "22:00",
    },
  ],
  priceRange: "$$",
  identifier: { "@type": "PropertyValue", name: "Commercial Registration", value: CR_NUMBER },
  sameAs: [INSTAGRAM_URL, FACEBOOK_URL],
};

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceSchema = ({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  serviceType,
  url: abs(path),
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: [
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "City", name: "Jeddah" },
  ],
});

/** Standard meta block for a landing page (title 50–60, description 150–160 chars). */
export const pageMeta = ({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string;
}) => [
  { title },
  { name: "description", content: description },
  ...(keywords ? [{ name: "keywords", content: keywords }] : []),
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:type", content: "website" },
  { property: "og:url", content: abs(path) },
  { property: "og:locale", content: "en_SA" },
  { property: "og:locale:alternate", content: "ar_SA" },
  { property: "og:site_name", content: BRAND_NAME },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: title },
  { name: "twitter:description", content: description },
  { name: "geo.region", content: "SA-02" },
  { name: "geo.placename", content: "Jeddah" },
];
