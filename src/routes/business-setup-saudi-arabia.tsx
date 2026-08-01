import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { LandingPage } from "@/components/site/LandingPage";
import { abs, breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "@/lib/seo";

const PATH = "/business-setup-saudi-arabia";

const faqs = [
  {
    q: "How do I open a company in Saudi Arabia?",
    a: "Reserve a trade name, choose your legal structure (LLC or establishment), obtain a MISA investment licence if you are a foreign investor, issue the Commercial Registration (CR), join the Chamber of Commerce, register with ZATCA and GOSI, then open a corporate bank account. We handle every step for you.",
  },
  {
    q: "How long does company formation in Saudi Arabia take?",
    a: "A local establishment CR is usually issued within a few working days. Foreign-owned LLCs take longer because the MISA licence and attested documents must be approved first — typically two to four weeks with complete paperwork.",
  },
  {
    q: "Can foreigners own 100% of a company in Saudi Arabia?",
    a: "Yes. Under MISA rules foreign investors can hold 100% ownership in most activities. We advise on the activity codes, capital requirements and documents needed for your sector.",
  },
  {
    q: "What does business setup in Saudi Arabia cost?",
    a: "Cost depends on legal structure, activity, MISA licensing and municipality fees. Share your plan on WhatsApp and we return a transparent, itemised quotation with government fees listed separately.",
  },
  {
    q: "Do you provide business setup services in Jeddah?",
    a: "Yes — our office is in Jeddah and we serve clients across the Kingdom, including Riyadh, Makkah, Madinah and Dammam, with PRO support after your CR is issued.",
  },
];

export const Route = createFileRoute("/business-setup-saudi-arabia")({
  head: () => ({
    meta: pageMeta({
      title: "Business Setup in Saudi Arabia | Company Formation Services",
      description:
        "Business setup in Saudi Arabia and company formation made simple — commercial registration, MISA licence, PRO services, VAT (ZATCA) and corporate banking from Jeddah.",
      path: PATH,
      keywords:
        "business setup Saudi Arabia, company formation Saudi Arabia, commercial registration Saudi Arabia, CR Jeddah, MISA investment license, business consultant Jeddah, LLC registration Saudi Arabia, تأسيس شركة في السعودية",
    }),
    links: [{ rel: "canonical", href: abs(PATH) }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Business Setup & Company Formation in Saudi Arabia",
            description:
              "End-to-end company formation in Saudi Arabia — trade name, MISA licence, Commercial Registration (CR), Chamber of Commerce, municipality licence, ZATCA VAT, GOSI and corporate bank account.",
            path: PATH,
            serviceType: "Business Setup and Company Formation",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "Business Setup in Saudi Arabia", path: PATH },
          ]),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqSchema(faqs)) },
    ],
  }),
  component: () => (
    <LandingPage
      eyebrow="Business Setup"
      h1="Business Setup in Saudi Arabia — Company Formation Made Simple"
      intro="Shahid Prime Travel and Tours handles business setup in Saudi Arabia for entrepreneurs, investors and SMEs — company formation, commercial registration (CR), MISA investment licensing, municipality permits, VAT registration and corporate banking. Based in Jeddah, licensed under CR No. 7052788051, serving the entire Kingdom."
      heroImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=75&auto=format&fit=crop"
      heroAlt="Business setup and company formation consultants in Jeddah, Saudi Arabia"
      icon={Building2}
      highlights={[
        "100% foreign ownership guidance",
        "Jeddah office · 10am–10pm",
        "CR No. 7052788051",
        "Arabic & English support",
      ]}
      sections={[
        {
          heading: "Company formation for every structure",
          body: "We match your activity and budget to the right legal entity, then run the full registration process with the Ministry of Commerce so your company is trading legally and quickly.",
          bullets: [
            "LLC registration in Saudi Arabia (local and foreign-owned)",
            "Establishment (Muassasah) for sole owners",
            "Branch of a foreign company",
            "Trade name reservation and Articles of Association",
          ],
        },
        {
          heading: "Commercial Registration (CR) and licensing",
          body: "The CR is the licence that makes your business real. We prepare, submit and follow up every government file until your certificate is issued.",
          bullets: [
            "Commercial Registration (CR) issuance, renewal and amendments",
            "MISA investment licence for foreign investors",
            "Municipality (Baladiya) licence",
            "Chamber of Commerce membership and attestations",
          ],
        },
        {
          heading: "Tax, accounting and banking",
          body: "Compliance starts on day one. We register you with the authorities and keep your books audit-ready so you avoid penalties.",
          bullets: [
            "VAT registration with ZATCA and e-invoicing setup",
            "Corporate bank account opening support",
            "Bookkeeping, payroll and annual accounting",
            "GOSI enrolment and Saudization advisory",
          ],
        },
        {
          heading: "PRO services and visas after launch",
          body: "Once your CR is live we keep operations moving with government liaison and immigration support for you and your team.",
          bullets: [
            "Iqama issuance, renewal and transfers (Naqal Kafala)",
            "Work permits, block visas and family visas",
            "Business visit visas for partners and clients",
            "Document attestation and Absher/Qiwa/Muqeem filings",
          ],
        },
      ]}
      arabic={{
        heading: "تأسيس شركة في السعودية وخدمات السجل التجاري",
        body: "نقدّم خدمات تأسيس الشركات في السعودية وجدة: استخراج سجل تجاري، رخصة استثمار أجنبي من وزارة الاستثمار، رخصة بلدية، عضوية الغرفة التجارية، تسجيل ضريبة القيمة المضافة، فتح حساب بنكي للشركة وخدمات برو والتأشيرات — بإشراف مستشار أعمال في جدة وبخبرة تمتد لسنوات.",
      }}
      faqs={faqs}
      related={[
        { to: "/services/cr-provider", label: "Commercial Registration (CR)" },
        { to: "/services/pro-services", label: "PRO Services" },
        { to: "/services/vat-accounting", label: "VAT & Accounting" },
        { to: "/services/visit-visa", label: "Visa Consultancy" },
      ]}
      ctaService="Business Setup Saudi Arabia"
    />
  ),
});
