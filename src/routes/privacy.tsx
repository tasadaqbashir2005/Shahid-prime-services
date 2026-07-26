import { createFileRoute } from "@tanstack/react-router";
import { BRAND_NAME } from "@/lib/site-data";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SHAHID PRIME SERVICES" },
      {
        name: "description",
        content:
          "How SHAHID PRIME SERVICES collects, uses, and protects your personal information for visa and travel services.",
      },
      { property: "og:title", content: "Privacy Policy — SHAHID PRIME SERVICES" },
      {
        property: "og:description",
        content: "Our commitment to protecting your privacy and personal data.",
      },
    ],
    links: [{ rel: "canonical", href: "https://dream-route-hub.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="bg-slate-50">
      <section className="gradient-royal px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#D4AF37]">
            Legal
          </span>
          <h1 className="mt-5 font-serif text-4xl font-bold text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-white/70">Last Updated: July 18, 2026</p>
        </div>
      </section>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-4xl rounded-3xl border border-[#D4AF37]/20 bg-white p-8 shadow-xl sm:p-12 prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-[#0B2545]">
          <p>
            At <strong>{BRAND_NAME}</strong>, we are committed to protecting your privacy and
            ensuring that your personal information remains safe and confidential. This Privacy
            Policy explains how we collect, use, store, and protect your information when you use
            our website or travel services.
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li>Full Name</li>
            <li>Passport Copy</li>
            <li>National ID / CNIC (where required)</li>
            <li>Contact Number</li>
            <li>Email Address</li>
            <li>Residential Address</li>
            <li>Date of Birth</li>
            <li>Travel History (if required)</li>
            <li>Visa-related supporting documents</li>
            <li>Payment details necessary for processing your application</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>Your personal information is used only for legitimate business purposes, including:</p>
          <ul>
            <li>Processing visa applications</li>
            <li>Flight and hotel reservations</li>
            <li>Travel insurance (if requested)</li>
            <li>Communication regarding your application</li>
            <li>Compliance with embassy, immigration, airline, or government requirements</li>
            <li>Customer support and service improvements</li>
          </ul>
          <p>
            We do not sell, rent, or share your personal information with third parties for
            marketing purposes.
          </p>

          <h2>Information Sharing</h2>
          <p>
            Your information may only be shared with Embassies and Consulates, Immigration
            Authorities, Airlines, Hotels, Government Departments, and Authorized Business Partners
            involved in processing your travel services. Only the information necessary for
            completing your requested service will be shared.
          </p>

          <h2>Data Security</h2>
          <p>
            We use appropriate administrative and technical measures to protect your personal
            information against unauthorized access, misuse, alteration, or disclosure.
          </p>

          <h2>Document Confidentiality</h2>
          <p>
            All documents submitted by clients are treated as strictly confidential and are used
            solely for processing the requested travel service.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website may use cookies to improve user experience and website performance. You may
            disable cookies through your browser settings if you prefer.
          </p>

          <h2>Your Rights</h2>
          <p>
            You may request to access your personal information, correct inaccurate information,
            request deletion of your data where legally permissible, or withdraw consent where
            applicable.
          </p>

          <h2>Policy Updates</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be published on
            this page.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy, please contact us using the
            contact information available on our website.
          </p>
        </article>
      </section>
    </div>
  );
}
