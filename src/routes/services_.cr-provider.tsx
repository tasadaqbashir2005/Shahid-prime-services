import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  FileText,
  ShieldCheck,
  Building,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { waLink } from "@/lib/site-data";

export const Route = createFileRoute("/services_/cr-provider")({
  head: () => ({
    meta: [
      { title: "Commercial Registration Saudi Arabia | CR Registration Service" },
      {
        name: "description",
        content:
          "Commercial registration in Saudi Arabia made simple: CR registration, company formation, Chamber of Commerce, ZATCA, GOSI and municipality licensing from our Jeddah office.",
      },
      {
        name: "keywords",
        content:
          "commercial registration saudi arabia, cr registration saudi arabia, company formation saudi arabia, CR provider Jeddah, business setup in saudi arabia",
      },
      { property: "og:title", content: "Commercial Registration Saudi Arabia | CR Registration" },
      {
        property: "og:description",
        content:
          "CR registration and company formation in Saudi Arabia — full commercial registration support in Jeddah and across KSA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://sprimeservices.com/services/cr-provider" },
    ],
    links: [{ rel: "canonical", href: "https://sprimeservices.com/services/cr-provider" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "CR Provider — Commercial Registration in Saudi Arabia",
          description:
            "Commercial Registration (CR) issuance and full business setup support in Saudi Arabia — MOFA, Chamber of Commerce, ZATCA, municipality (Baladiya) and GOSI.",
          provider: { "@type": "TravelAgency", name: "SHAHID PRIME SERVICES" },
          areaServed: "Saudi Arabia",
        }),
      },
    ],
  }),
  component: CRProviderPage,
});

const packages = [
  {
    title: "Sole Proprietorship CR",
    subtitle: "For individual owners",
    icon: Briefcase,
    points: [
      "Issuance of CR (Commercial Registration)",
      "Chamber of Commerce membership",
      "MOFA & municipality filings",
      "Bank account guidance",
    ],
    service: "CR Provider — Sole Proprietorship",
  },
  {
    title: "LLC / Company Formation",
    subtitle: "Limited Liability Company",
    icon: Building,
    points: [
      "MISA (foreign investment) support",
      "Articles of Association drafting",
      "CR + Chamber of Commerce",
      "ZATCA (Tax) & GOSI registration",
    ],
    service: "CR Provider — LLC Formation",
  },
  {
    title: "Establishment (Muassasah)",
    subtitle: "For local Saudi setup",
    icon: FileText,
    points: [
      "Full CR issuance",
      "Municipality (Baladiya) license",
      "Chamber membership & attestations",
      "Trade name reservation",
    ],
    service: "CR Provider — Establishment",
  },
  {
    title: "Renewals & Amendments",
    subtitle: "Keep your business compliant",
    icon: ShieldCheck,
    points: [
      "CR renewal & activity update",
      "Partner / capital amendments",
      "Chamber & municipality renewals",
      "Full compliance & liaison",
    ],
    service: "CR Provider — Renewals & Amendments",
  },
];

const included = [
  "Trade name search & reservation",
  "Commercial Registration (CR) issuance",
  "Chamber of Commerce membership",
  "Municipality (Baladiya) license",
  "ZATCA / VAT registration",
  "GOSI (social insurance) enrollment",
  "MOFA attestations where required",
  "Ongoing renewal & compliance support",
];

function CRProviderPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24"
    >
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80"
            alt="Commercial Registration and business setup in Saudi Arabia"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B2545]/95 via-[#0B2545]/85 to-[#134074]/70" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur transition-colors hover:bg-white/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Services
          </Link>
          <div className="mt-8 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-gold text-[#0B2545] shadow-lg">
              <FileText className="h-6 w-6" />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">CR Provider</p>
          </div>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Commercial Registration in Saudi Arabia
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            We handle CR registration in Saudi Arabia end to end — trade name reservation,
            commercial registration issuance, Chamber of Commerce, ZATCA, GOSI and municipality
            licensing — so your company formation in Saudi Arabia is complete and compliant.
          </p>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="bg-[#F8F9FA] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">Setup Packages</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#0B2545] sm:text-4xl">
              Choose your business structure
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {packages.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-gold text-[#0B2545]">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-[#D4AF37]">
                      {p.subtitle}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#0B2545]">{p.title}</h3>
                  </div>
                </div>
                <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-600">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <Link
                    to="/contact"
                    search={{ service: p.service }}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full gradient-royal px-5 py-3 text-xs font-semibold text-white transition-transform group-hover:scale-[1.02]"
                  >
                    Apply Now <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href={waLink(`Hello, I'd like to inquire about: ${p.service}`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#0B2545]/15 bg-white px-5 py-3 text-xs font-semibold text-[#0B2545] transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Included */}
          <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#0B2545]">What&rsquo;s included</h3>
            <p className="mt-2 text-sm text-slate-500">
              A complete, hands-on setup so you can focus on running your business.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {included.map((it) => (
                <li key={it} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
