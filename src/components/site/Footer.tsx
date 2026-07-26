import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import {
  BRAND_NAME,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
  INSTAGRAM_URL,
  FACEBOOK_URL,
} from "@/lib/site-data";
import logoAsset from "@/assets/logo-v2.png.asset.json";

export function Footer() {
  return (
    <footer className="mt-20 gradient-royal text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt={`${BRAND_NAME} logo`}
              className="h-14 w-14 shrink-0 rounded-full object-cover shadow-md ring-2 ring-[#D4AF37]/50 sm:h-16 sm:w-16"
            />
            <div className="min-w-0 leading-tight">
              <div className="font-serif text-base font-bold text-white sm:text-lg">
                {BRAND_NAME}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
                Travel | Visa | Consultancy
              </div>
            </div>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Trusted visa consultants delivering premium international visa and Saudi Khidmat
            services with unmatched expertise and personal care.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              aria-label="Instagram — @sshahidprime"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              aria-label="Facebook — sshahidprime"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>

          {/* Official CR Registration — trust badge */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-4 py-3 shadow-[0_0_20px_rgba(212,175,55,0.15)] backdrop-blur-sm">
            <div
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#D4AF37] text-[#0a1e3f]"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Officially Registered
              </div>
              <div className="text-sm font-bold text-white">
                CR No. <span className="tracking-wider">7052788051</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg text-[#D4AF37]">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link to="/" className="hover:text-[#D4AF37]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#D4AF37]">
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#D4AF37]">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-[#D4AF37]">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#D4AF37]">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-[#D4AF37]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-[#D4AF37]">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-[#D4AF37]">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link to="/services/visit-visa" className="hover:text-[#D4AF37]">
                Visit Visa
              </Link>
            </li>
            <li>
              <Link to="/services/study-visa" className="hover:text-[#D4AF37]">
                Study Visa
              </Link>
            </li>
            <li>
              <Link to="/services/umrah" className="hover:text-[#D4AF37]">
                Umrah Visa
              </Link>
            </li>
            <li>
              <Link to="/services/saudi-khidmat" className="hover:text-[#D4AF37]">
                Saudi Khidmat Services
              </Link>
            </li>
            <li>
              <Link to="/services/airline-ticketing" className="hover:text-[#D4AF37]">
                Airline Ticketing
              </Link>
            </li>
            <li>
              <Link to="/services/cr-provider" className="hover:text-[#D4AF37]">
                CR Provider
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-[#D4AF37]">Get in Touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-[#D4AF37]" /> {WHATSAPP_DISPLAY}
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-[#D4AF37]" /> {CONTACT_EMAIL}
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-[#D4AF37]" /> {CONTACT_ADDRESS}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/terms" className="hover:text-[#D4AF37]">
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" className="hover:text-[#D4AF37]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
