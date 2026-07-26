import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

import { useMemo, useState, type FormEvent } from "react";
import { z } from "zod";

import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2 } from "lucide-react";
import { submitHubspotLead } from "@/lib/hubspot.functions";
import {
  ALL_SERVICES,
  BRAND_NAME,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  waLink,
} from "@/lib/site-data";

const searchSchema = z.object({
  service: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Contact — SHAHID PRIME SERVICES" },
      {
        name: "description",
        content:
          "Speak with a visa consultant today. Submit your inquiry and start a WhatsApp conversation with our consultants instantly.",
      },
      { property: "og:title", content: "Contact SHAHID PRIME SERVICES" },
      {
        property: "og:description",
        content: "Submit your inquiry and chat with our visa consultants on WhatsApp.",
      },
    ],
  }),
  component: ContactPage,
});

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[+\d][\d\s\-()]{6,19}$/, "Enter a valid phone number (digits, spaces, dashes only)"),
  country: z.string().trim().min(2, "Enter your country").max(60),
  service: z.string().trim().min(2, "Select a service").max(120),
  message: z.string().trim().max(1000).optional().default(""),
});

type FormData = z.infer<typeof formSchema>;

function ContactPage() {
  const search = useSearch({ from: "/contact" });
  const incomingService = (search.service ?? "").trim();
  // Keep the pre-selected service from the page the visitor came from, even if
  // its exact wording isn't in the master list.
  const serviceOptions = useMemo(() => {
    const match = ALL_SERVICES.find(
      (s) => s.toLowerCase() === incomingService.toLowerCase(),
    );
    if (!incomingService || match) return ALL_SERVICES;
    return [incomingService, ...ALL_SERVICES];
  }, [incomingService]);
  const selectedService =
    ALL_SERVICES.find((s) => s.toLowerCase() === incomingService.toLowerCase()) ??
    incomingService;
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    country: "",
    service: selectedService,
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [syncWarning, setSyncWarning] = useState<string | null>(null);
  const sendToHubspot = useServerFn(submitHubspotLead);

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };


  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return; // prevent duplicate submissions
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Partial<Record<keyof FormData, string>> = {};
      parsed.error.issues.forEach((iss) => {
        const key = iss.path[0] as keyof FormData;
        if (!errs[key]) errs[key] = iss.message;
      });
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      const d = parsed.data;
      // Push the lead into HubSpot (non-blocking for the user's WhatsApp flow)
      setSyncWarning(null);
      let serverError: string | null = null;
      try {
        const result = await sendToHubspot({ data: d });
        if (!result.ok) serverError = result.error;
      } catch (hubspotError) {
        console.error("HubSpot lead sync failed:", hubspotError);
        serverError = "CRM sync unavailable on this deployment";
      }
      if (serverError) {
        console.error("HubSpot lead sync failed:", serverError);
        setSyncWarning(serverError);
      }

      const text =
        `*NEW CLIENT INQUIRY — ${BRAND_NAME}*\n\n` +
        `*Name:* ${d.fullName}\n` +
        `*Phone:* ${d.phone}\n` +
        `*Country:* ${d.country}\n` +
        `*Requested Service:* ${d.service}\n` +
        `*Message:* ${d.message?.trim() || "—"}`;
      // Cross-platform WhatsApp handoff (mobile uses api.whatsapp.com deep link)
      const isMobile =
        typeof window !== "undefined" &&
        /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
      const url = isMobile
        ? `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`
        : waLink(text);
      window.open(url, "_blank", "noopener,noreferrer");
      setDone(true);
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        message: "Something went wrong. Please try again or WhatsApp us directly.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative bg-slate-50">
      <section className="relative overflow-hidden gradient-royal px-4 pt-36 pb-32 sm:px-6 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.25),transparent_60%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-slate-50"
        />
        <div className="relative mx-auto max-w-7xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-white/5 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.3em] text-[#D4AF37] backdrop-blur">
            Get in Touch
          </span>
          <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Let's plan your{" "}
            <span className="bg-gradient-to-r from-[#F4D06F] via-[#D4AF37] to-[#F4D06F] bg-clip-text text-transparent">
              next journey
            </span>
          </h1>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#D4AF37]" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-white/75">
            Fill the form to submit your inquiry and start a WhatsApp conversation with our
            consultants instantly.
          </p>
        </div>
      </section>

      <section className="relative z-10 -mt-24 px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Left - contact info */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/20 gradient-royal p-8 text-white shadow-2xl">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#D4AF37]/25 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#D4AF37]/10 blur-3xl" />
              <h3 className="font-serif text-2xl font-bold">Contact Details</h3>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-px w-10 bg-[#D4AF37]" />
                <span className="h-1 w-1 rotate-45 bg-[#D4AF37]" />
              </div>
              <p className="mt-4 text-sm text-white/70">
                Reach us any time. We reply on WhatsApp within minutes.
              </p>

              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-gold text-[#0B2545] shadow-md">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-[#D4AF37]">
                      Phone / WhatsApp
                    </div>
                    <a
                      href={`tel:+${WHATSAPP_NUMBER}`}
                      className="mt-0.5 block font-semibold hover:text-[#D4AF37] transition-colors"
                    >
                      {WHATSAPP_DISPLAY}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-gold text-[#0B2545] shadow-md">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-[#D4AF37]">Email</div>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="mt-0.5 block break-all font-semibold hover:text-[#D4AF37] transition-colors"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-gold text-[#0B2545] shadow-md">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-[#D4AF37]">Office</div>
                    <div className="mt-0.5 font-semibold">{CONTACT_ADDRESS}</div>
                  </div>
                </li>
              </ul>

              <a
                href={waLink("Hello SHAHID PRIME SERVICES, I'd like a free consultation.")}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:border-[#25D366] hover:bg-[#25D366]"
              >
                <Phone className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right - form */}
          <form
            onSubmit={onSubmit}
            noValidate
            className="group relative overflow-hidden rounded-3xl border-2 border-[#D4AF37]/40 bg-gradient-to-br from-white via-white to-[#F8F5EC] p-6 shadow-[0_25px_60px_-15px_rgba(11,37,69,0.35)] ring-1 ring-white/60 backdrop-blur-xl sm:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-[#D4AF37] via-[#F4D06F] to-[#D4AF37]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#D4AF37]/15 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#0B2545]/10 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.9),transparent_60%)]"
            />
            <div className="relative">
              {done && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <div className="font-semibold">Inquiry sent — WhatsApp is opening!</div>
                    <div className="mt-0.5 text-emerald-700/80">
                      Your details have been sent to our WhatsApp with your phone number attached.
                      Our consultant will reply shortly.
                    </div>
                  </div>
                </div>
              )}

              {syncWarning && (
                <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  <span className="font-semibold">CRM sync notice:</span> {syncWarning}. Your
                  WhatsApp message was still sent.
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" error={errors.fullName}>
                  <input
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Muhammad Ahmed"
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone Number" error={errors.phone}>
                  <input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+92 300 0000000"
                    className={inputCls}
                  />
                </Field>
                <Field label="Country" error={errors.country}>
                  <input
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                    placeholder="Saudi Arabia"
                    className={inputCls}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Select Service" error={errors.service}>
                    <select
                      value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                      className={inputCls}
                    >
                      <option value="">— Choose a service —</option>
                      {ALL_SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field label="Message (optional)" error={errors.message}>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Tell us about your travel plans, timeline, and any questions..."
                      className={`${inputCls} resize-none`}
                    />
                  </Field>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-royal px-6 py-4 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {submitting ? "Submitting..." : "Submit Inquiry"}
              </button>
              <p className="mt-3 text-center text-xs text-slate-500">
                Your details are used only to process your inquiry. We respect your privacy.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-600">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
