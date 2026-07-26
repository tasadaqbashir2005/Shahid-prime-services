import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Plane, GraduationCap, Moon, Building2, Ticket, FileText } from "lucide-react";

const cardImages = [
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=70&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=70&auto=format&fit=crop",
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Visas, Umrah, Saudi Khidmat & Airline Tickets | SHAHID PRIME" },
      {
        name: "description",
        content:
          "Explore our flagship services: Visit Visa, Study Visa, Umrah, Saudi Khidmat and Airline Ticketing — click any card to see full details.",
      },
      { property: "og:title", content: "Services — SHAHID PRIME SERVICES" },
      {
        property: "og:description",
        content: "Visit Visa, Study Visa, Umrah, Saudi Khidmat & Airline Ticketing.",
      },
    ],
    links: cardImages.map((href) => ({ rel: "preload", as: "image", href })),
  }),
  component: ServicesHub,
});

const cards = [
  {
    to: "/services/visit-visa" as const,
    title: "Visit Visa",
    desc: "Schengen, UK, USA, Canada, Australia & global destinations — plus work permits.",
    icon: Plane,
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=70&auto=format&fit=crop",
  },
  {
    to: "/services/study-visa" as const,
    title: "Study Visa",
    desc: "Top European universities and scholarship guidance for ambitious students.",
    icon: GraduationCap,
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=70&auto=format&fit=crop",
  },
  {
    to: "/services/umrah" as const,
    title: "Umrah Visa",
    desc: "1-Month and 3-Month Umrah packages arranged with complete peace of mind.",
    icon: Moon,
    image:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=70&auto=format&fit=crop",
  },
  {
    to: "/services/saudi-khidmat" as const,
    title: "Saudi Khidmat Services",
    desc: "Wakala, Naqal Kafala, Azad Visa, Amal Manzali & other in-country services.",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800&q=70&auto=format&fit=crop",
  },
  {
    to: "/services/airline-ticketing" as const,
    title: "Airline Ticketing",
    desc: "Airline tickets for all major international and domestic airlines at highly competitive and discounted prices.",
    icon: Ticket,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=70&auto=format&fit=crop",
  },
  {
    to: "/services/cr-provider" as const,
    title: "CR Provider",
    desc: "Commercial Registration (CR) in Saudi Arabia — we set up and grow your business end-to-end.",
    icon: FileText,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=70&auto=format&fit=crop",
  },
];

function ServicesHub() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-32"
    >
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">Our Portfolio</p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-[#0B2545] sm:text-5xl md:text-6xl">
            Services That Move You Forward
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Choose a service to view every destination, package and option we handle end-to-end.
          </p>
        </div>
      </section>

      <section className="mt-16 px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex"
            >
              <Link
                to={c.to}
                className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading={i < 3 ? "eager" : "lazy"}
                    fetchPriority={i < 3 ? "high" : "auto"}
                    decoding="async"
                    width={800}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/80 via-[#0B2545]/20 to-transparent" />
                  <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl gradient-gold text-[#0B2545] shadow-lg">
                    <c.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif text-2xl font-bold text-[#0B2545]">{c.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">{c.desc}</p>
                  <span className="mt-6 inline-flex items-center justify-center gap-2 rounded-full gradient-royal px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-md transition-transform group-hover:scale-[1.02]">
                    Explore Options{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
