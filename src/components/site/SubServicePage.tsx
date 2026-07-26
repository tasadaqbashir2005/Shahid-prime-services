import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site-data";
import type { LucideIcon } from "lucide-react";

export type SubService = {
  title: string;
  subtitle?: string;
  service: string;
};

export type SubGroup = {
  title: string;
  subtitle?: string;
  items: SubService[];
};

export function SubServicePage({
  eyebrow,
  title,
  description,
  heroImage,
  icon: Icon,
  groups,
}: {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  icon: LucideIcon;
  groups: SubGroup[];
}) {
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
            src={heroImage}
            alt={title}
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
              <Icon className="h-6 w-6" />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">{eyebrow}</p>
          </div>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>
        </div>
      </section>

      {/* GROUPS */}
      <section className="bg-[#F8F9FA] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {groups.map((g, gi) => (
            <div key={g.title} className={gi > 0 ? "mt-16" : ""}>
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0B2545] sm:text-3xl">
                    {g.title}
                  </h2>
                  {g.subtitle && <p className="mt-1 text-sm text-slate-500">{g.subtitle}</p>}
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {g.items.map((it, i) => (
                  <motion.div
                    key={it.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-xl"
                  >
                    <div>
                      {it.subtitle && (
                        <div className="text-[10px] font-semibold uppercase tracking-widest text-[#D4AF37]">
                          {it.subtitle}
                        </div>
                      )}
                      <h4 className="mt-1 font-serif text-lg font-bold text-[#0B2545]">
                        {it.title}
                      </h4>
                    </div>
                    <div className="mt-5 flex flex-col gap-2">
                      <Link
                        to="/contact"
                        search={{ service: it.service }}
                        className="inline-flex items-center justify-center gap-2 rounded-full gradient-royal px-4 py-2.5 text-xs font-semibold text-white transition-transform group-hover:scale-[1.03]"
                      >
                        Apply Now <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <a
                        href={waLink(`Hello, I'd like to inquire about: ${it.service}`)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0B2545]/15 bg-white px-4 py-2.5 text-xs font-semibold text-[#0B2545] transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> Contact
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
