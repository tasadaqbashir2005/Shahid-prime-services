import { createFileRoute } from "@tanstack/react-router";
import { Calculator } from "lucide-react";
import { LandingPage } from "@/components/site/LandingPage";
import { abs, breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "@/lib/seo";

const PATH = "/services/vat-accounting";

const faqs = [
  {
    q: "When must a company register for VAT in Saudi Arabia?",
    a: "Registration with ZATCA is mandatory once taxable supplies exceed the annual threshold, and voluntary below it. We assess your turnover, register your CR and configure compliant e-invoicing (Fatoora).",
  },
  {
    q: "Do you file VAT returns as well as register?",
    a: "Yes. We prepare and submit monthly or quarterly VAT returns, keep the supporting ledgers, and respond to ZATCA queries on your behalf.",
  },
  {
    q: "Can you help open a corporate bank account?",
    a: "We prepare the CR, Articles of Association, national address and beneficial-owner file that Saudi banks require, and coordinate the account opening appointment.",
  },
  {
    q: "Do you serve small businesses and startups?",
    a: "Yes — most of our accounting clients are SMEs and new companies in Jeddah that need bookkeeping, payroll and Zakat filing without an in-house finance team.",
  },
];

export const Route = createFileRoute("/services_/vat-accounting")({
  head: () => ({
    meta: pageMeta({
      title: "VAT Registration Saudi Arabia (ZATCA) | Accounting Services",
      description:
        "VAT registration in Saudi Arabia with ZATCA — e-invoicing, bookkeeping, payroll, Zakat filing and corporate bank account support for companies in Jeddah and across KSA.",
      path: PATH,
      keywords:
        "vat registration saudi arabia, ZATCA VAT registration, tax consultant Saudi Arabia, accounting services Jeddah, Zakat filing, bookkeeping Jeddah, تسجيل ضريبة القيمة المضافة",
    }),
    links: [{ rel: "canonical", href: abs(PATH) }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          serviceSchema({
            name: "VAT Registration, Accounting & Corporate Banking Support",
            description:
              "ZATCA VAT registration and filing, e-invoicing setup, bookkeeping, payroll, Zakat and corporate bank account opening in Saudi Arabia.",
            path: PATH,
            serviceType: "Accounting and Tax Services",
          }),
        ),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "VAT & Accounting", path: PATH },
          ]),
        ),
      },
      { type: "application/ld+json", children: JSON.stringify(faqSchema(faqs)) },
    ],
  }),
  component: () => (
    <LandingPage
      eyebrow="VAT & Accounting"
      h1="VAT Registration (ZATCA), Accounting & Corporate Banking"
      intro="Stay compliant from your first invoice. We register your company with ZATCA, set up Fatoora e-invoicing, keep your books, file VAT and Zakat returns, and prepare the documentation Saudi banks need to open your corporate account."
      heroImage="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=75&auto=format&fit=crop"
      heroAlt="Accountant preparing VAT and ZATCA filings for a Saudi company"
      icon={Calculator}
      highlights={[
        "ZATCA e-invoicing ready",
        "Monthly bookkeeping",
        "Zakat & VAT returns",
        "Bank account support",
      ]}
      sections={[
        {
          heading: "VAT registration and filing",
          body: "We handle the full ZATCA cycle so your invoices are valid and your returns are on time.",
          bullets: [
            "VAT registration and TIN issuance",
            "Fatoora e-invoicing integration",
            "Monthly and quarterly VAT returns",
            "ZATCA correspondence and audits",
          ],
        },
        {
          heading: "Accounting and bookkeeping",
          body: "Clean, audit-ready records maintained to Saudi standards, delivered as monthly reports.",
          bullets: [
            "Bookkeeping and reconciliations",
            "Payroll processing and WPS",
            "Financial statements and management reports",
            "Zakat and corporate income tax filing",
          ],
        },
        {
          heading: "Corporate bank account opening",
          body: "Bank onboarding fails on paperwork. We assemble the file the bank expects, first time.",
          bullets: [
            "CR, AoA and national address preparation",
            "Beneficial-owner and KYC pack",
            "Bank selection and appointment coordination",
            "Post-opening online banking setup",
          ],
        },
        {
          heading: "Advisory for growing companies",
          body: "Practical business consulting for owners scaling in the Kingdom.",
          bullets: [
            "Activity and structure optimisation",
            "Budgeting and cash-flow planning",
            "GOSI and Saudization cost modelling",
            "Bundled PRO and compliance retainer",
          ],
        },
      ]}
      arabic={{
        heading: "تسجيل ضريبة القيمة المضافة والمحاسبة",
        body: "نساعدك في تسجيل ضريبة القيمة المضافة لدى هيئة الزكاة والضريبة والجمارك، وإعداد الفوترة الإلكترونية، ومسك الدفاتر، وإعداد الرواتب، وتقديم الإقرارات الضريبية والزكوية، وفتح حساب بنكي للشركة في السعودية.",
      }}
      faqs={faqs}
      related={[
        { to: "/business-setup-saudi-arabia", label: "Business Setup Saudi Arabia" },
        { to: "/services/cr-provider", label: "Commercial Registration (CR)" },
        { to: "/services/pro-services", label: "PRO Services" },
        { to: "/contact", label: "Talk to a Consultant" },
      ]}
      ctaService="VAT Registration & Accounting"
    />
  ),
});
