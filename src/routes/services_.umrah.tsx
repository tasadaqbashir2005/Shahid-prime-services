import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Moon } from "lucide-react";
import { waLink } from "@/lib/site-data";

export const Route = createFileRoute("/services_/umrah")({
  head: () => ({
    meta: [
      { title: "Umrah Visa — 1 & 3 Month Packages | SHAHID PRIME" },
      {
        name: "description",
        content:
          "1-Month and 3-Month Umrah visa packages with priority processing, full documentation support and WhatsApp assistance.",
      },
      { property: "og:title", content: "Umrah Visa Packages — SHAHID PRIME" },
      { property: "og:description", content: "Blessed journeys, professionally arranged." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Umrah Visa",
          description: "Umrah visa packages with priority processing and documentation support.",
          provider: { "@type": "TravelAgency", name: "SHAHID PRIME SERVICES" },
          areaServed: "Saudi Arabia",
        }),
      },
    ],
  }),
  component: UmrahPage,
});

const plans = [
  {
    name: "1 Month Umrah",
    features: [
      "1 Month Visa",
      "Umrah eligibility guaranteed",
      "Ziyarat allowed in Makkah & Madinah",
      "Full documentation support",
      "Same day update",
    ],
    service: "Umrah Visa — 1 Month",
  },
  {
    name: "3 Month Umrah",
    featured: true,
    features: [
      "3 Month Visa",
      "Extended stay for family Umrah",
      "Ziyarat & Rawdah access support",
      "Full documentation support",
      "Same day update",
      "Free WhatsApp assistance",
    ],
    service: "Umrah Visa — 3 Month",
  },
];

function UmrahPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-24"
    >
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1600&q=75&auto=format&fit=crop"
            alt="Makkah — Umrah packages"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B2545]/95 via-[#0B2545]/85 to-[#134074]/70" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur hover:bg-white/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Services
          </Link>
          <div className="mt-8 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-gold text-[#0B2545] shadow-lg">
              <Moon className="h-6 w-6" />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">Umrah Visa</p>
          </div>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Umrah Visa
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Blessed journeys, professionally arranged. Choose the package that fits your plans and
            let us handle the paperwork.
          </p>
        </div>
      </section>

      <section className="bg-[#F8F9FA] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`relative overflow-hidden rounded-3xl border p-8 shadow-lg ${p.featured ? "gradient-royal text-white border-transparent" : "bg-white border-slate-200"}`}
            >
              {p.featured && (
                <span className="absolute right-6 top-6 rounded-full gradient-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0B2545]">
                  Most Popular
                </span>
              )}
              <div className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                Umrah Visa
              </div>
              <h4
                className={`mt-2 font-serif text-2xl font-bold ${p.featured ? "text-white" : "text-[#0B2545]"}`}
              >
                {p.name}
              </h4>
              <ul
                className={`mt-6 space-y-3 text-sm ${p.featured ? "text-white/85" : "text-slate-600"}`}
              >
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-2">
                <Link
                  to="/contact"
                  search={{ service: p.service }}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${p.featured ? "gradient-gold text-[#0B2545]" : "gradient-royal text-white"}`}
                >
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={waLink(`Hello, I'd like details about: ${p.service}`)}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${p.featured ? "border border-white/30 text-white hover:bg-[#25D366] hover:border-[#25D366]" : "border border-[#0B2545]/15 text-[#0B2545] hover:bg-[#25D366] hover:border-[#25D366] hover:text-white"}`}
                >
                  <MessageCircle className="h-4 w-4" /> Contact on WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
