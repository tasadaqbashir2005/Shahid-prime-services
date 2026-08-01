import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/lib/blog-data";
import { useState } from "react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Travel & Visa Blog — Umrah, Schengen, Study Visa Guides | Shahid Prime" },
      {
        name: "description",
        content:
          "Expert travel and visa guides from Shahid Prime Travel and Tours — Umrah, Schengen, Saudi work visa, study visa, Dubai tourist visa and business setup in KSA.",
      },
      {
        name: "keywords",
        content:
          "travel blog, visa blog, umrah guide, schengen visa, saudi work visa, study visa europe, dubai visit visa, cr saudi arabia",
      },
      { property: "og:title", content: "Travel & Visa Blog — Shahid Prime Travel and Tours" },
      {
        property: "og:description",
        content:
          "SEO-optimized guides on Umrah, Schengen, Saudi work visa, study visa and airline ticketing.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sprimeservices.com/blog" },
    ],
    links: [{ rel: "canonical", href: "https://sprimeservices.com/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Shahid Prime Travel and Tours — Blog",
          url: "https://sprimeservices.com/blog",
          publisher: {
            "@type": "TravelAgency",
            name: "Shahid Prime Travel and Tours",
          },
          blogPost: BLOG_POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.description,
            datePublished: p.publishedAt,
            dateModified: p.updatedAt,
            url: `https://sprimeservices.com/blog/${p.slug}`,
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [cat, setCat] = useState<string>("All");
  const posts = cat === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === cat);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="pt-24"
    >
      {/* HERO */}
      <section className="gradient-royal px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center text-white">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-gold text-[#0B2545]">
            <BookOpen className="h-6 w-6" />
          </div>
          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#D4AF37]">
            Travel & Visa Insights
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold sm:text-5xl">The Shahid Prime Blog</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Practical, research-driven guides on Umrah, Schengen &amp; global visas, Saudi work
            permits, study abroad and airline ticketing — written by our team in Jeddah.
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="bg-[#F8F9FA] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center gap-2">
            {["All", ...BLOG_CATEGORIES].map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all ${
                  cat === c
                    ? "border-[#0B2545] bg-[#0B2545] text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-[#D4AF37] hover:text-[#0B2545]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-xl"
              >
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="block">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={p.cover}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-[#D4AF37]">
                      <span>{p.category}</span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="h-3 w-3" /> {p.readMinutes} min
                      </span>
                    </div>
                    <h2 className="mt-3 font-serif text-lg font-bold leading-snug text-[#0B2545] group-hover:text-[#134074]">
                      {p.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">{p.description}</p>
                    <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />{" "}
                        {new Date(p.updatedAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-[#0B2545] group-hover:gap-2 transition-all">
                        Read <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
