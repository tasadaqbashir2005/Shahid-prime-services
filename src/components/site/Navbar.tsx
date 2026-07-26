import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { waLink, BRAND_NAME, WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from "@/lib/site-data";
import logoAsset from "@/assets/logo-v2.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-white/85 backdrop-blur-md shadow-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={logoAsset.url}
            alt={`${BRAND_NAME} logo`}
            className="h-11 w-11 rounded-full object-cover shadow-md ring-2 ring-[#D4AF37]/40 sm:h-12 sm:w-12"
          />
          <div className="min-w-0 leading-tight">
            <div className="font-serif text-sm font-bold text-[#0B2545] sm:text-base">
              {BRAND_NAME}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500">
              Travel | Visa | Consultancy
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#0B2545]"
              activeProps={{ className: "text-[#0B2545] font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="hidden items-center gap-1.5 rounded-full border border-[#D4AF37]/60 bg-gradient-to-r from-[#D4AF37]/15 to-[#D4AF37]/5 px-3 py-1.5 text-[11px] font-semibold text-[#0B2545] shadow-sm xl:inline-flex"
            title="Officially Registered Business — Commercial Registration No. 7052788051"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5 text-[#D4AF37]"
            >
              <path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="tracking-wide">
              CR <span className="font-bold">7052788051</span>
            </span>
          </div>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="hidden items-center gap-2 rounded-full border border-[#0B2545]/15 bg-white px-3.5 py-2.5 text-sm font-semibold text-[#0B2545] shadow-sm transition-all hover:scale-[1.03] hover:border-[#D4AF37] hover:text-[#0B2545] md:inline-flex"
            aria-label={`Call ${WHATSAPP_DISPLAY}`}
          >
            <Phone className="h-4 w-4 text-[#D4AF37]" />
            <span className="tracking-tight">{WHATSAPP_DISPLAY}</span>
          </a>

          <a
            href={waLink("Hello, I want to inquire about your services.")}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-md ring-1 ring-[#25D366]/40 transition-all hover:scale-[1.03] hover:bg-[#1EBE57] hover:shadow-lg sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/80 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mx-4 mb-3 rounded-2xl px-4 py-3 shadow-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-white/60"
                  activeProps={{ className: "bg-white/70 text-[#0B2545] font-semibold" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 bg-gradient-to-r from-[#D4AF37]/15 to-[#D4AF37]/5 px-3 py-2 text-xs font-semibold text-[#0B2545]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-[#D4AF37]"
                >
                  <path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>
                  Officially Registered — CR <span className="font-bold">7052788051</span>
                </span>
              </div>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-[#0B2545]/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#0B2545]"
              >
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                {WHATSAPP_DISPLAY}
              </a>
              <a
                href={waLink("Hello, I want to inquire about your services.")}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#1EBE57]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
