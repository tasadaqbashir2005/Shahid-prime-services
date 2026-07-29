export const WHATSAPP_NUMBER = "966599569397";
export const WHATSAPP_DISPLAY = "+966 59 956 9397";
export const CONTACT_EMAIL = "info@shahidprimeservices.com";
export const CONTACT_ADDRESS = "Jeddah, Saudi Arabia";
export const BRAND_NAME = "SHAHID PRIME SERVICES";
export const INSTAGRAM_URL = "https://instagram.com/sshahidprime";
export const FACEBOOK_URL = "https://facebook.com/sshahidprime";

export const waLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const SCHENGEN_COUNTRIES = [
  "Italy",
  "Germany",
  "Netherlands",
  "Switzerland",
  "Czech Republic",
  "Spain",
  "Portugal",
];
export const GLOBAL_COUNTRIES = [
  "USA",
  "UK",
  "Australia",
  "Japan",
  "Canada",
  "New Zealand",
  "Albania",
];
export const WORK_PERMIT_COUNTRIES = ["Portugal", "Albania", "Bulgaria"];
export const STUDY_COUNTRIES = [
  "Hungary",
  "Italy",
  "Bulgaria",
  "Romania",
  "Slovenia",
  "Slovakia",
  "Germany",
  "France",
];
export const SAUDI_SERVICES = [
  "Wakala",
  "Agency Services",
  "Naqal Kafala",
  "Azad Visa",
  "Amal Manzali",
  "Saie Khas",
];
export const AIRLINE_SERVICES = [
  "International Flights",
  "Domestic Flights",
  "One Way Tickets",
  "Round Trip Tickets",
  "Group Bookings",
  "Corporate Bookings",
  "Umrah Packages",
  "Holiday Packages",
  "Last Minute Deals",
];

export const CR_SERVICES = [
  "Sole Proprietorship",
  "LLC Formation",
  "Establishment",
  "Renewals & Amendments",
];

export const ALL_SERVICES: string[] = [
  ...SCHENGEN_COUNTRIES.map((c) => `Schengen Visit Visa — ${c}`),
  ...GLOBAL_COUNTRIES.map((c) => `Global Visit Visa — ${c}`),
  ...WORK_PERMIT_COUNTRIES.map((c) => `Work Permit — ${c}`),
  ...STUDY_COUNTRIES.map((c) => `Study Visa — ${c}`),
  "Umrah Visa — 1 Month",
  "Umrah Visa — 3 Month",
  ...SAUDI_SERVICES.map((s) => `Saudi Khidmat — ${s}`),
  ...AIRLINE_SERVICES.map((s) => `Airline Ticketing — ${s}`),
  ...CR_SERVICES.map((s) => `CR Provider — ${s}`),
];
