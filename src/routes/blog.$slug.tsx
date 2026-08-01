import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MessageCircle, Tag } from "lucide-react";
import { BLOG_POSTS, getPostBySlug, BLOG_AUTHOR } from "@/lib/blog-data";
import { waLink } from "@/lib/site-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found — Shahid Prime" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.post;
    const url = `https://sprimeservices.com/blog/${params.slug}`;
    return {
      meta: [
        { title: `${p.title} | Shahid Prime` },
        { name: "description", content: p.description },
        { name: "keywords", content: p.keywords.join(", ") },
        { name: "author", content: BLOG_AUTHOR },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: p.cover },
        { property: "article:published_time", content: p.publishedAt },
        { property: "article:modified_time", content: p.updatedAt },
        { property: "article:author", content: BLOG_AUTHOR },
        { property: "article:section", content: p.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: p.cover },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            description: p.description,
            image: p.cover,
            datePublished: p.publishedAt,
            dateModified: p.updatedAt,
            author: { "@type": "Person", name: BLOG_AUTHOR },
            publisher: {
              "@type": "TravelAgency",
              name: "Shahid Prime Travel and Tours",
              logo: {
                "@type": "ImageObject",
                url: "https://sprimeservices.com/favicon.ico",
              },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            keywords: p.keywords.join(", "),
            articleSection: p.category,
          }),
        },
        ...(p.faqs && p.faqs.length
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: p.faqs.map((f: { q: string; a: string }) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="pt-32 pb-20 text-center">
      <h1 className="font-serif text-3xl font-bold text-[#0B2545]">Article not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-[#D4AF37] hover:underline">
        ← Back to the blog
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="pt-32 pb-20 text-center">
      <h1 className="font-serif text-3xl font-bold text-[#0B2545]">Something went wrong</h1>
      <Link to="/blog" className="mt-4 inline-block text-[#D4AF37] hover:underline">
        ← Back to the blog
      </Link>
    </div>
  ),
  component: BlogArticle,
});

function BlogArticle() {
  const { post: p } = Route.useLoaderData();
  const related = BLOG_POSTS.filter((x) => x.slug !== p.slug && x.category === p.category).slice(
    0,
    3,
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="pt-24"
    >
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={p.cover} alt={p.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B2545]/95 via-[#0B2545]/85 to-[#134074]/70" />
        </div>
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur hover:bg-white/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Articles
          </Link>
          <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Tag className="h-3.5 w-3.5" /> {p.category}
          </div>
          <h1 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {p.title}
          </h1>
          <p className="mt-4 max-w-3xl text-white/80">{p.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/70">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> Updated{" "}
              {new Date(p.updatedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {p.readMinutes} min read
            </span>
            <span>By {BLOG_AUTHOR}</span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <article
            className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-[#0B2545] prose-a:text-[#D4AF37] prose-strong:text-[#0B2545]"
            dangerouslySetInnerHTML={{ __html: p.html }}
          />

          {p.faqs && p.faqs.length > 0 && (
            <div className="mt-14">
              <h2 className="font-serif text-2xl font-bold text-[#0B2545]">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 space-y-4">
                {p.faqs.map((f: { q: string; a: string }) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-slate-200 bg-[#F8F9FA] p-5"
                  >
                    <summary className="cursor-pointer list-none font-semibold text-[#0B2545]">
                      {f.q}
                    </summary>
                    <p className="mt-3 text-sm text-slate-600">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-br from-[#0B2545] to-[#134074] p-8 text-white">
            <h3 className="font-serif text-2xl font-bold">Need help with your visa?</h3>
            <p className="mt-2 text-sm text-white/80">
              Speak to Shahid Prime directly on WhatsApp — free consultation, real-time updates and
              premium service.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={waLink(
                  `Hello, I read your article: ${p.title}. I'd like a free consultation.`,
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#1EBE57]"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="bg-[#F8F9FA] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-serif text-2xl font-bold text-[#0B2545]">Related articles</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:border-[#D4AF37]/60 hover:shadow-lg transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={r.cover}
                      alt={r.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-base font-bold text-[#0B2545]">{r.title}</h3>
                    <p className="mt-2 line-clamp-2 text-xs text-slate-600">{r.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}
