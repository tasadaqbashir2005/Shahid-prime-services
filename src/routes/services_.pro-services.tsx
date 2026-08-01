import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { LandingPage } from "@/components/site/LandingPage";
import { abs, breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "@/lib/seo";

const PATH = "/services/pro-services";

const faqs = [
  {
    q: "What are PRO services in Saudi Arabia?",
    a: "PRO (Public Relations Officer) services cover government paperwork for companies — Iqama issuance and renewal, work permits, Qiwa and Muqeem filings, Chamber attestations and municipality follow-ups — handled by a representative on your behalf.",
  },
  {
    q: "Do you offer PRO services near me in Jeddah?",
    a: "Yes. Our Jeddah office handles government transactions across Makkah Province and coordinates remotely for clients in Riyadh, Dammam and other cities.",
  },
  {
    q: "Can you transfer an employee's sponsorship (Naqal Kafala)?",
    a: "Yes. We prepare the Qiwa request, verify Saudization status and follow the transfer until the new Iqama is issued.",
  },
  {
    q: "Do you handle family visas for employees?",
    a: "We process family visit and family residence visas, including the required Absher and Muqeem steps and document attestation.",
  },
];

export const Route = createFileRoute("/services_/pro-services")({
  head: () => ({
    meta: pageMeta({
      title: "PRO Services in Jeddah, Saudi Arabia | Iqama & Work Permits",
      description:
        "PRO services in Saudi Arabia: Iqama renewal, work permits, Naqal Kafala, family visas, Qiwa, Muqeem and Chamber attestations — managed from our Jeddah office.",
      path: PATH,
      keywords:
        "PRO services near me, PRO services Jeddah, work permit Saudi Arabia, Iqama renewal, Naqal Kafala, family visa Saudi Arabia, خدمات برو",
    }),
    links: [{ rel: "canonical", href: abs(PATH) }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "PRO Services in Saudi Arabia",
            description:
              "Government relations and PRO services — Iqama, work permits, sponsorship transfer, family visas, Qiwa, Muqeem and attestations.",
            path: PATH,
            serviceType: "PRO and Government Liaison Services",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "PRO Services", path: PATH },
          ]),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqSchema(faqs)) },
    ],
  }),
  component: () => (
    <LandingPage
      eyebrow="PRO Services"
      h1="PRO Services in Saudi Arabia — Government Paperwork, Handled"
      intro="From Iqama renewals and work permits to sponsorship transfers and family visas, our Jeddah-based PRO team keeps your company compliant with the Ministry of Human Resources, Qiwa, Muqeem, Absher and the Chamber of Commerce."
      heroImage="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=75&auto=format&fit=crop"
      heroAlt="PRO services team processing government documents in Jeddah, Saudi Arabia"
      icon={Briefcase}
      highlights={["Same-day submissions", "Jeddah office", "Arabic-speaking PRO", "Fixed pricing"]}
      sections={[
        {
          heading: "Employee and Iqama services",
          body: "Keep your workforce legal without spending your own time in government portals.",
          bullets: [
            "Iqama issuance, renewal and cancellation",
            "Work permit issuance and renewal",
            "Naqal Kafala (sponsorship transfer)",
            "Exit and re-entry visas",
          ],
        },
        {
          heading: "Company government filings",
          body: "We represent your establishment across the portals your business depends on.",
          bullets: [
            "Qiwa, Muqeem, Absher and GOSI transactions",
            "Chamber of Commerce attestations",
            "Municipality (Baladiya) licence renewals",
            "CR amendments and activity updates",
          ],
        },
        {
          heading: "Visas for owners and families",
          body: "Bring in partners, staff and dependents with correctly prepared applications.",
          bullets: [
            "Family visit and family residence visas",
            "Business visit visas for partners and clients",
            "Block visa applications and quota advice",
            "Document translation and attestation",
          ],
        },
        {
          heading: "Ongoing compliance retainer",
          body: "A monthly retainer means renewals never lapse and fines never surprise you.",
          bullets: [
            "Renewal calendar and reminders",
            "Saudization (Nitaqat) monitoring",
            "Single point of contact, 10am–10pm",
            "Bundled with accounting and VAT filing",
          ],
        },
      ]}
      arabic={{
        heading: "خدمات برو والخدمات الحكومية في جدة",
        body: "نتولى جميع المعاملات الحكومية: إصدار وتجديد الإقامة، رخص العمل، نقل الكفالة، تأشيرات العائلة، منصات قوى ومقيم وأبشر، تصديق الغرفة التجارية وتجديد الرخصة البلدية — بسرعة ودقة من مكتبنا في جدة.",
      }}
      faqs={faqs}
      related={[
        { to: "/business-setup-saudi-arabia", label: "Business Setup Saudi Arabia" },
        { to: "/services/cr-provider", label: "Commercial Registration (CR)" },
        { to: "/services/vat-accounting", label: "VAT & Accounting" },
        { to: "/services/saudi-khidmat", label: "Saudi Khidmat Services" },
      ]}
      ctaService="PRO Services"
    />
  ),
});
