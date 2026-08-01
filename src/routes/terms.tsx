import { createFileRoute } from "@tanstack/react-router";
import { BRAND_NAME } from "@/lib/site-data";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — SHAHID PRIME SERVICES" },
      {
        name: "description",
        content:
          "Terms and conditions governing visa consultation, travel, and Saudi Khidmat services provided by SHAHID PRIME SERVICES.",
      },
      { property: "og:title", content: "Terms & Conditions — SHAHID PRIME SERVICES" },
      {
        property: "og:description",
        content: "Read the terms and conditions for our visa, travel, and consultancy services.",
      },
    ],
    links: [{ rel: "canonical", href: "https://sprimeservices.com/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="bg-slate-50">
      <section className="gradient-royal px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#D4AF37]">
            Legal
          </span>
          <h1 className="mt-5 font-serif text-4xl font-bold text-white sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-white/70">Last Updated: July 18, 2026</p>
        </div>
      </section>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-4xl rounded-3xl border border-[#D4AF37]/20 bg-white p-8 shadow-xl sm:p-12 prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-[#0B2545] prose-a:text-[#0B2545]">
          <p>
            By using the services of <strong>{BRAND_NAME}</strong>, you agree to the following Terms
            and Conditions.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By submitting your documents, making a payment, or requesting any travel-related
            service, you acknowledge and accept these Terms and Conditions.
          </p>

          <h2>2. Visa Approval</h2>
          <p>
            Our agency provides professional visa consultation and application processing services
            only. Visa approval or rejection is solely at the discretion of the relevant Embassy,
            Consulate, or Immigration Authority. We cannot guarantee visa approval.
          </p>

          <h2>3. Service Charges</h2>
          <p>
            All consultation fees, processing charges, documentation fees, and service fees are
            non-refundable once work on the application has begun.
          </p>

          <h2>4. Visa Refusal</h2>
          <p>
            If a visa application is refused, rejected, delayed, or cancelled by the Embassy or
            Immigration Authority:
          </p>
          <ul>
            <li>Our agency shall not be held responsible for the decision.</li>
            <li>Service charges already paid will not be refunded.</li>
            <li>
              Government, embassy, biometric, courier, insurance, translation, and other third-party
              fees are non-refundable.
            </li>
            <li>
              Any refund of embassy fees will only be possible if the embassy itself officially
              refunds those fees.
            </li>
          </ul>

          <h2>5. Customer Responsibilities</h2>
          <p>The customer is responsible for:</p>
          <ul>
            <li>Providing genuine and accurate information.</li>
            <li>Submitting valid documents.</li>
            <li>Informing us of any previous visa refusals or immigration issues.</li>
            <li>Attending interviews or biometric appointments if required.</li>
          </ul>
          <p>
            Providing false information may result in visa refusal, for which the agency accepts no
            liability.
          </p>

          <h2>6. Processing Time</h2>
          <p>
            Visa processing times are determined by embassies and immigration authorities. Estimated
            processing times are not guaranteed.
          </p>

          <h2>7. Flights and Hotels</h2>
          <p>
            Flight tickets and hotel bookings are subject to airline and hotel policies.
            Cancellation, rescheduling, or refund requests will be handled according to the
            applicable supplier's terms.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            Our agency shall not be liable for: visa refusal, processing delays, embassy decisions,
            airline cancellations, flight delays, immigration decisions, natural disasters,
            government restrictions, or force majeure events.
          </p>

          <h2>9. Refund Policy</h2>
          <p>
            Refunds are only applicable where expressly stated in writing. The following payments
            are generally non-refundable after processing has started: consultation fees, visa
            processing charges, documentation fees, embassy fees (unless refunded by the embassy),
            translation fees, courier charges, insurance charges, and third-party service fees.
          </p>

          <h2>10. Changes to Services</h2>
          <p>
            We reserve the right to modify or discontinue any service without prior notice where
            necessary due to legal, operational, or governmental requirements.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by the applicable laws of the Kingdom of
            Saudi Arabia, where the agency is legally registered and operates.
          </p>

          <h2>12. Contact Information</h2>
          <p>
            For any questions regarding these Terms and Conditions, please contact our customer
            support through the contact details provided on our website.
          </p>
        </article>
      </section>
    </div>
  );
}
