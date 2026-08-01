import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { organizationSchema } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-data";

import { WhatsAppFab } from "@/components/site/WhatsAppFab";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-[#0B2545]">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-slate-500">The page you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#0B2545] px-6 py-3 text-sm font-medium text-white hover:bg-[#134074] transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-slate-500">Try refreshing or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#0B2545] px-6 py-3 text-sm font-medium text-white hover:bg-[#134074]"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-medium"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SHAHID PRIME SERVICES — Visa, Umrah, Saudi Khidmat & Airline Tickets" },
      {
        name: "description",
        content:
          "Trusted travel agency for Schengen, Study & Umrah visas, Saudi Khidmat (Wakala, Kafala, Azad Visa) and airline ticketing. 99.9% success • 15+ years • 52+ countries.",
      },
      {
        property: "og:title",
        content: "SHAHID PRIME SERVICES — Visa, Umrah, Saudi Khidmat & Airline Tickets",
      },
      {
        property: "og:description",
        content:
          "Trusted travel agency for Schengen, Study & Umrah visas, Saudi Khidmat (Wakala, Kafala, Azad Visa) and airline ticketing. 99.9% success • 15+ years • 52+ countries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "SHAHID PRIME SERVICES — Visa, Umrah, Saudi Khidmat & Airline Tickets",
      },
      {
        name: "twitter:description",
        content:
          "Trusted travel agency for Schengen, Study & Umrah visas, Saudi Khidmat (Wakala, Kafala, Azad Visa) and airline ticketing. 99.9% success • 15+ years • 52+ countries.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7be786e9-ef4b-4146-b02c-2b4a2eb785c0/id-preview-46c54571--e0bbb59c-4133-4b9f-8a88-e50a6cef92e1.lovable.app-1784370974410.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7be786e9-ef4b-4146-b02c-2b4a2eb785c0/id-preview-46c54571--e0bbb59c-4133-4b9f-8a88-e50a6cef92e1.lovable.app-1784370974410.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://images.unsplash.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: "Shahid Prime Travel and Tours",
          inLanguage: ["en", "ar"],
          publisher: { "@id": `${SITE_URL}/#organization` },
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppFab />
      </div>
    </QueryClientProvider>
  );
}
