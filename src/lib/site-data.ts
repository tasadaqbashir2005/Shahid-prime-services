export const WHATSAPP_NUMBER = "966599569397";
export const WHATSAPP_DISPLAY = "+966 59 956 9397";
export const CONTACT_EMAIL = "info@shahidprimeservices.com";
export const CONTACT_ADDRESS = "Jeddah, Saudi Arabia";
export const BRAND_NAME = "SHAHID PRIME SERVICES";
export const INSTAGRAM_URL = "https://instagram.com/shahidprimeservices";
export const FACEBOOK_URL = "https://facebook.com/shahidprimeservices";
export const INSTAGRAM_HANDLE = "shahidprimeservices";
export const FACEBOOK_HANDLE = "Shahid Prime Services";
export const SITE_URL = "https://sprimeservices.com";
export const CR_NUMBER = "7052788051";

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
  "Last Minute Deals",
];

export const CR_SERVICES = [
  "Sole Proprietorship",
  "LLC Formation",
  "Establishment",
  "Renewals & Amendments",
];

/** Main service categories and their sub-services (used by the contact form). */
export const SERVICE_GROUPS: { category: string; items: string[] }[] = [
  { category: "Schengen Visit Visa", items: SCHENGEN_COUNTRIES },
  { category: "Global Visit Visa", items: GLOBAL_COUNTRIES },
  { category: "Work Permit", items: WORK_PERMIT_COUNTRIES },
  { category: "Study Visa", items: STUDY_COUNTRIES },
  { category: "Umrah Visa", items: ["1 Month", "3 Month"] },
  { category: "Saudi Khidmat", items: SAUDI_SERVICES },
  { category: "Airline Ticketing", items: AIRLINE_SERVICES },
  { category: "CR Provider", items: CR_SERVICES },
];

/** Separator used between a main service and its sub-service. */
export const SERVICE_SEPARATOR = " — ";

export const ALL_SERVICES: string[] = SERVICE_GROUPS.flatMap((g) =>
  g.items.map((i) => `${g.category}${SERVICE_SEPARATOR}${i}`),
);

