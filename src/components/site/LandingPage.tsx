import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { waLink } from "@/lib/site-data";

export interface LandingSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface LandingLink {
  to: string;
  label: string;
}

export function LandingPage({
  eyebrow,
  h1,
  intro,
  heroImage,
  heroAlt,
  icon: Icon,
  highlights,
  sections,
  faqs,
  related,
  ctaService,
  arabic,
}: {
  eyebrow: string;
  h1: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  icon: LucideIcon;
  highlights: string[];
  sections: LandingSection[];
  faqs: { q: string; a: string }[];
  related: LandingLink[];
  ctaService: string;
  arabic?: { heading: string; body: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="pt-24"
    >
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImage}
            alt={heroAlt}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={1600}
            height={900}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B2545]/95 via-[#0B2545]/85 to-[#134074]/70" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <nav aria-label="Breadcrumb" className="text-xs text-white/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-[#D4AF37]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/services" className="hover:text-[#D4AF37]">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#D4AF37]">{eyebrow}</li>
            </ol>
          </nav>
          <div className="mt-8 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-gold text-[#0B2545] shadow-lg">
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">{eyebrow}</p>
          </div>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold text-white sm:text-5xl">
            {h1}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {intro}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              search={{ service: ctaService }}
              className="inline-flex items-center justify-center gap-2 rounded-full gradient-gold px-7 py-3.5 text-sm font-semibold text-[#0B2545] shadow-lg transition-transform hover:scale-[1.02]"
            >
              Get a Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={waLink(`Hello, I'd like to inquire about: ${ctaService}`)}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:border-[#25D366] hover:bg-[#25D366]"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#D4AF37]" /> {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#F8F9FA] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {sections.map((s) => (
            <article
              key={s.heading}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <h2 className="font-serif text-2xl font-bold text-[#0B2545]">{s.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.body}</p>
              {s.bullets && (
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        {arabic && (
          <div
            dir="rtl"
            lang="ar"
            className="mx-auto mt-10 max-w-7xl rounded-3xl border border-[#D4AF37]/40 bg-white p-7 text-right shadow-sm"
          >
            <h2 className="font-serif text-2xl font-bold text-[#0B2545]">{arabic.heading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{arabic.body}</p>
          </div>
        )}

        <div className="mx-auto mt-12 max-w-7xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-[#0B2545]">
            Frequently asked questions
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-sm font-semibold text-[#0B2545]">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl">
          <h2 className="font-serif text-xl font-bold text-[#0B2545]">Related services</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {related.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-[#0B2545] transition-colors hover:border-[#D4AF37] hover:text-[#134074]"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
