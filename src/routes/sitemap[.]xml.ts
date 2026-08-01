import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { BLOG_POSTS } from "@/lib/blog-data";

const BASE_URL = "https://sprimeservices.com";

const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/business-setup-saudi-arabia", priority: "0.95", changefreq: "weekly" },
  { path: "/business-setup-jeddah", priority: "0.9", changefreq: "weekly" },
  { path: "/services", priority: "0.9", changefreq: "weekly" },
  { path: "/services/cr-provider", priority: "0.9", changefreq: "monthly" },
  { path: "/services/pro-services", priority: "0.9", changefreq: "monthly" },
  { path: "/services/vat-accounting", priority: "0.9", changefreq: "monthly" },
  { path: "/services/visit-visa", priority: "0.8", changefreq: "monthly" },
  { path: "/services/study-visa", priority: "0.8", changefreq: "monthly" },
  { path: "/services/umrah", priority: "0.8", changefreq: "monthly" },
  { path: "/services/saudi-khidmat", priority: "0.8", changefreq: "monthly" },
  { path: "/services/airline-ticketing", priority: "0.8", changefreq: "monthly" },
  { path: "/blog", priority: "0.9", changefreq: "weekly" },
  ...BLOG_POSTS.map((p) => ({ path: `/blog/${p.slug}`, priority: "0.7", changefreq: "monthly" })),
  { path: "/about", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
];


export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = routes
          .map(
            (r) =>
              `  <url>\n    <loc>${BASE_URL}${r.path}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
