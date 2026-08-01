import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { LandingPage } from "@/components/site/LandingPage";
import { abs, breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "@/lib/seo";

const PATH = "/business-setup-jeddah";

const faqs = [
  {
    q: "Where is your business setup office in Jeddah?",
    a: "We are based in Jeddah, Saudi Arabia and open daily from 10am to 10pm. Message us on WhatsApp and we will share exact directions and book a consultation.",
  },
  {
    q: "Do you register companies only in Jeddah?",
    a: "No. Jeddah is our base, but we register CRs and handle PRO work across the Kingdom, including Riyadh, Makkah, Madinah and Dammam.",
  },
  {
    q: "Who owns Shahid Prime Travel and Tours?",
    a: "The company is led by Shahid Bashir and operates under Commercial Registration No. 7052788051.",
  },
  {
    q: "Do you offer services in Arabic and Urdu?",
    a: "Yes — our team supports clients in Arabic, English and Urdu, which is why many Pakistani and expatriate business owners in Jeddah work with us.",
  },
];

export const Route = createFileRoute("/business-setup-jeddah")({
  head: () => ({
    meta: pageMeta({
      title: "Business Setup Consultant in Jeddah | CR & Company Formation",
      description:
        "Local business setup consultants in Jeddah: Commercial Registration, MISA licence, PRO services, VAT and visa support. Open 10am–10pm, CR No. 7052788051.",
      path: PATH,
      keywords:
        "business setup Jeddah, business consultant near me, company registration Jeddah, CR provider Jeddah, PRO services Jeddah, مستشار أعمال جدة",
    }),
    links: [{ rel: "canonical", href: abs(PATH) }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "Business Setup Consultancy in Jeddah",
            description:
              "Local company formation, Commercial Registration, PRO and visa consultancy services for businesses in Jeddah, Saudi Arabia.",
            path: PATH,
            serviceType: "Business Consultancy",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Business Setup in Jeddah", path: PATH },
          ]),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqSchema(faqs)) },
    ],
  }),
  component: () => (
    <LandingPage
      eyebrow="Jeddah"
      h1="Business Setup Consultant in Jeddah, Saudi Arabia"
      intro="Shahid Prime Travel and Tours is a Jeddah-based consultancy helping local and foreign entrepreneurs register companies, obtain Commercial Registration, manage PRO work and secure visas. Led by Shahid Bashir, open daily 10am–10pm, CR No. 7052788051."
      heroImage="https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1600&q=75&auto=format&fit=crop"
      heroAlt="Jeddah city skyline in Saudi Arabia where our business setup office is located"
      icon={MapPin}
      highlights={[
        "Office in Jeddah",
        "Open 10am–10pm daily",
        "Arabic · English · Urdu",
        "Serving all of KSA",
      ]}
      sections={[
        {
          heading: "Company registration in Jeddah",
          body: "We register establishments, LLCs and branches with the Ministry of Commerce and follow the file to issuance.",
          bullets: [
            "Trade name reservation",
            "Commercial Registration (CR) issuance",
            "Chamber of Commerce membership",
            "Municipality (Baladiya) licence",
          ],
        },
        {
          heading: "For foreign investors",
          body: "Investors entering the Saudi market get structure advice, MISA licensing and post-licence compliance in one place.",
          bullets: [
            "MISA investment licence",
            "100% foreign ownership guidance",
            "Document attestation and translation",
            "Corporate bank account support",
          ],
        },
        {
          heading: "Ongoing support after launch",
          body: "Registration is the start. We stay on as your PRO and compliance partner in Makkah Province.",
          bullets: [
            "Iqama, work permits and Naqal Kafala",
            "VAT registration and filing with ZATCA",
            "Bookkeeping and payroll",
            "CR renewals and amendments",
          ],
        },
        {
          heading: "Travel and visa services too",
          body: "As a licensed travel and tours company we also handle the mobility side of your business.",
          bullets: [
            "Business and visit visas worldwide",
            "Umrah visas and packages",
            "Study visas for Europe",
            "Discounted airline ticketing",
          ],
        },
      ]}
      arabic={{
        heading: "مستشار تأسيس الأعمال في جدة",
        body: "مكتبنا في جدة يقدّم خدمات تأسيس الشركات، استخراج السجل التجاري، رخصة الاستثمار الأجنبي، خدمات برو، تسجيل الضريبة والتأشيرات — من الساعة ١٠ صباحاً حتى ١٠ مساءً، سجل تجاري رقم ٧٠٥٢٧٨٨٠٥١.",
      }}
      faqs={faqs}
      related={[
        { to: "/business-setup-saudi-arabia", label: "Business Setup Saudi Arabia" },
        { to: "/services/cr-provider", label: "Commercial Registration (CR)" },
        { to: "/services/pro-services", label: "PRO Services" },
        { to: "/contact", label: "Contact Our Jeddah Office" },
      ]}
      ctaService="Business Setup Jeddah"
    />
  ),
});
