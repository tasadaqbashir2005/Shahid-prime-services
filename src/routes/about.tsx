import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Award,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  ArrowRight,
  Compass,
} from "lucide-react";
import aboutBanner from "@/assets/about-banner.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — SHAHID PRIME SERVICES" },
      {
        name: "description",
        content:
          "A decade of embassy-level expertise. Learn about our mission, vision, and why thousands of travelers trust SHAHID PRIME SERVICES.",
      },
      { property: "og:title", content: "About SHAHID PRIME SERVICES" },
      { property: "og:description", content: "A decade of embassy-level visa expertise." },
    ],
  }),
  component: AboutPage,
});

const whys = [
  {
    icon: ShieldCheck,
    title: "Embassy Expertise",
    text: "Decade-long relationships with consulate protocols and documentation standards.",
  },
  {
    icon: Award,
    title: "98% Approval Rate",
    text: "Meticulously vetted files translate into industry-leading success rates.",
  },
  {
    icon: HeartHandshake,
    title: "Personal Consultation",
    text: "Every client gets a dedicated case manager, not a call-center agent.",
  },
  {
    icon: Sparkles,
    title: "Transparent Pricing",
    text: "No hidden fees. Clear itemized quotes before you commit.",
  },
  {
    icon: Users,
    title: "5,200+ Happy Clients",
    text: "From students to families to business travelers — we've served them all.",
  },
  {
    icon: Compass,
    title: "Global Reach",
    text: "32+ countries actively processed across Europe, Americas, Asia and Oceania.",
  },
];

function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-32"
    >
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">Our Story</p>
            <h1 className="mt-3 font-serif text-4xl font-bold text-[#0B2545] sm:text-5xl md:text-6xl">
              A decade of moving <span className="italic">dreams</span> across borders.
            </h1>
            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed">
              <p>
                SHAHID PRIME SERVICES was born from a simple belief: travel should never be
                intimidating. We started in a small office serving a handful of families and grew
                into a trusted name synonymous with visa success.
              </p>
              <p>
                Today, our team of consultants, case managers and legal advisors process files
                across Europe, the UK, USA, Canada, Australia, and the entire Gulf. Every
                application receives the same white-glove attention that built our reputation.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full gradient-royal px-6 py-3 text-sm font-semibold text-white shadow-md hover:scale-[1.03] transition-transform"
              >
                Explore Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-[#0B2545] hover:bg-[#F8F9FA]"
              >
                Talk to a Consultant
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] gradient-gold opacity-20 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border border-white/40 shadow-2xl">
              <img
                src={aboutBanner.url}
                alt="SHAHID PRIME SERVICES — travel, visa & consultancy"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="glass absolute -bottom-6 -left-6 hidden rounded-2xl p-5 shadow-xl sm:block">
              <div className="font-serif text-3xl font-bold text-[#0B2545]">10+ Yrs</div>
              <div className="text-xs uppercase tracking-widest text-slate-500">Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mt-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {[
            {
              icon: Target,
              title: "Our Mission",
              text: "To empower every traveler with transparent, expert-led visa services that eliminate uncertainty and unlock global opportunity.",
            },
            {
              icon: Compass,
              title: "Our Vision",
              text: "To become the most trusted visa consultancy in South Asia, setting the gold standard for professionalism and client care.",
            },
          ].map((it) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full gradient-gold opacity-10 blur-2xl" />
              <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-gold text-[#0B2545]">
                <it.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-6 font-serif text-2xl font-bold text-[#0B2545]">{it.title}</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">{it.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mt-24 bg-[#F8F9FA] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">Why Choose Us</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#0B2545] sm:text-4xl md:text-5xl">
              Six reasons travelers pick us
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whys.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl gradient-royal text-[#D4AF37]">
                  <w.icon className="h-5 w-5" />
                </div>
                <h4 className="mt-5 font-serif text-lg font-bold text-[#0B2545]">{w.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{w.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
