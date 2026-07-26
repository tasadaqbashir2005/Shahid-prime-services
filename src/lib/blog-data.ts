export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readMinutes: number;
  publishedAt: string;
  updatedAt: string;
  cover: string;
  keywords: string[];
  /** HTML body — safe, authored by us. */
  html: string;
  /** Optional FAQ for FAQPage JSON-LD */
  faqs?: { q: string; a: string }[];
};

const author = "Shahid Bashir";

export const BLOG_CATEGORIES = [
  "Umrah & Hajj",
  "Visit Visa",
  "Study Visa",
  "Saudi Services",
  "Airline Ticketing",
  "Business Setup",
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "umrah-visa-from-pakistan-2026-guide",
    title: "Umrah Visa from Pakistan in 2026 — Complete Step-by-Step Guide",
    description:
      "How to apply for an Umrah visa from Pakistan in 2026 — requirements, fees, processing time, Nusuk platform, and common rejection reasons explained by Shahid Prime.",
    category: "Umrah & Hajj",
    readMinutes: 9,
    publishedAt: "2026-07-01",
    updatedAt: "2026-07-18",
    cover: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1600&q=80",
    keywords: [
      "umrah visa from pakistan",
      "umrah visa 2026",
      "how to apply for umrah visa",
      "nusuk umrah visa",
      "umrah package from pakistan",
      "umrah visa requirements",
      "umrah visa fees",
    ],
    html: `
      <p>Planning your <strong>Umrah journey from Pakistan in 2026</strong> is easier than ever thanks to Saudi Arabia's digital Nusuk platform — but only if you have the right documents, a trusted agent, and a clear timeline. In this guide, our Jeddah-based team at <em>Shahid Prime Travel and Tours</em> walks you through every step, from passport preparation to arrival in Makkah.</p>
      <h2>What is an Umrah visa?</h2>
      <p>The Umrah visa is a short-term religious visa issued by the Kingdom of Saudi Arabia allowing Muslims to perform Umrah and visit the holy cities of Makkah and Madinah. Since 2023, most Umrah visas are single-entry electronic visas issued via <strong>Nusuk</strong>.</p>
      <h2>Umrah visa requirements from Pakistan (2026)</h2>
      <ul>
        <li>Passport valid for at least <strong>6 months</strong> from date of travel</li>
        <li>Recent passport-size photograph with white background</li>
        <li>Confirmed return ticket and hotel booking in Makkah/Madinah</li>
        <li>Meningitis (ACWY) vaccination certificate</li>
        <li>Mahram documents for women under 45 (where applicable)</li>
      </ul>
      <h2>How long does the Umrah visa take?</h2>
      <p>With Shahid Prime, most Umrah visas are approved within <strong>24–72 hours</strong> once documents are complete. We provide same-day status updates via WhatsApp.</p>
      <h2>Common reasons Umrah visas get rejected</h2>
      <ol>
        <li>Passport validity under 6 months</li>
        <li>Incomplete vaccination records</li>
        <li>Duplicate or mismatched applicant data</li>
        <li>Previous overstay in Saudi Arabia</li>
      </ol>
      <h2>Why apply through Shahid Prime Travel and Tours</h2>
      <p>Based in Jeddah with 15+ years of experience serving pilgrims from Pakistan, UAE and across the Gulf, we combine local Saudi expertise with fast digital processing. From visa to ziyarat, we handle the entire journey.</p>
    `,
    faqs: [
      {
        q: "How much does an Umrah visa cost from Pakistan?",
        a: "Umrah visa government fees vary by season. Contact Shahid Prime on WhatsApp for the latest package pricing including visa, ticket and hotel.",
      },
      {
        q: "Can women perform Umrah without a Mahram?",
        a: "Yes, since 2022 women above 18 can perform Umrah without a Mahram provided they travel with an organized group.",
      },
      {
        q: "How many times can I perform Umrah in a year?",
        a: "Under current Nusuk rules, one Umrah per pilgrim per Hijri year is permitted; additional permits may be issued in specific windows.",
      },
    ],
  },
  {
    slug: "schengen-visit-visa-guide-2026",
    title: "Schengen Visit Visa 2026 — Requirements, Countries & Approval Tips",
    description:
      "A complete guide to the Schengen visit visa in 2026 — 29 countries, documents, financial requirements, appointment booking and approval tips from Shahid Prime.",
    category: "Visit Visa",
    readMinutes: 10,
    publishedAt: "2026-06-20",
    updatedAt: "2026-07-18",
    cover: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&q=80",
    keywords: [
      "schengen visa",
      "schengen visit visa 2026",
      "schengen visa from pakistan",
      "schengen visa from saudi arabia",
      "europe tourist visa",
      "how to apply schengen visa",
    ],
    html: `
      <p>One <strong>Schengen visa</strong> gives you access to <strong>29 European countries</strong> including France, Germany, Italy, Spain, the Netherlands, Switzerland and more. This 2026 guide from <em>Shahid Prime Travel and Tours</em> explains everything applicants from Pakistan, Saudi Arabia and the Gulf need to know.</p>
      <h2>Which countries are in the Schengen area in 2026?</h2>
      <p>As of 2026 the Schengen zone includes 29 countries: all EU states except Ireland and Cyprus, plus Iceland, Norway, Switzerland, Liechtenstein — and the newest members Romania and Bulgaria.</p>
      <h2>Schengen visa document checklist</h2>
      <ul>
        <li>Passport valid 3+ months beyond return, with 2 blank pages</li>
        <li>Completed visa application form</li>
        <li>2 recent biometric photographs</li>
        <li>Confirmed return flight itinerary</li>
        <li>Hotel bookings for entire stay</li>
        <li>Travel insurance covering €30,000 minimum</li>
        <li>Bank statements — last 6 months</li>
        <li>Employment / business proof</li>
        <li>Cover letter explaining purpose of visit</li>
      </ul>
      <h2>Financial requirements</h2>
      <p>Most consulates expect at least <strong>€50–100 per day</strong> of stay in your account, with stable inflows over the past 6 months.</p>
      <h2>How to increase your Schengen approval chances</h2>
      <ol>
        <li>Apply through the country you'll spend the most days in</li>
        <li>Show strong ties to your home country (job, family, property)</li>
        <li>Book flexible refundable itineraries — never fake tickets</li>
        <li>Provide a clear, honest cover letter</li>
      </ol>
      <p>Our team has helped thousands of clients secure Schengen visas with high approval rates. Message us on WhatsApp for a free eligibility review.</p>
    `,
    faqs: [
      {
        q: "How long is a Schengen tourist visa valid?",
        a: "Typically up to 90 days within any 180-day period. Multiple-entry visas can be valid for 1–5 years.",
      },
      {
        q: "Can I apply for a Schengen visa from Saudi Arabia?",
        a: "Yes — residents of Saudi Arabia can apply through the consulate of their intended primary destination in Riyadh or Jeddah.",
      },
    ],
  },
  {
    slug: "saudi-work-visa-guide",
    title: "Saudi Work Visa Guide — Kafala, Iqama & Employer Sponsorship",
    description:
      "Everything you need to know about the Saudi work visa in 2026 — Kafala system, Iqama, block visa, sponsor transfer (Naqal Kafala) and Azad Visa options.",
    category: "Saudi Services",
    readMinutes: 8,
    publishedAt: "2026-06-10",
    updatedAt: "2026-07-18",
    cover: "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1600&q=80",
    keywords: [
      "saudi work visa",
      "kafala saudi arabia",
      "iqama saudi",
      "azad visa",
      "naqal kafala",
      "saudi sponsor transfer",
      "saudi work permit from pakistan",
    ],
    html: `
      <p>Saudi Arabia remains the top destination for skilled and semi-skilled workers from Pakistan and South Asia. This guide covers the <strong>Saudi work visa</strong>, the <em>Kafala</em> (sponsorship) system, Iqama residency, and the popular <strong>Azad Visa</strong> route.</p>
      <h2>Types of Saudi work visas</h2>
      <ul>
        <li><strong>Employment visa</strong> — issued to a specific employer under Kafala</li>
        <li><strong>Block visa</strong> — bulk visas issued to companies for a category of workers</li>
        <li><strong>Azad Visa (Free Visa)</strong> — a work visa without a fixed employer</li>
        <li><strong>Business visa</strong> — for meetings and site visits</li>
      </ul>
      <h2>What is Naqal Kafala (sponsor transfer)?</h2>
      <p>Naqal Kafala allows a worker in Saudi Arabia to transfer their sponsorship from one employer to another without leaving the Kingdom, subject to consent rules under the Labor Reform Initiative.</p>
      <h2>How Shahid Prime helps</h2>
      <p>We handle end-to-end Saudi Khidmat: Wakala, Naqal Kafala, Azad Visa processing, Amal Manzali (Domestic Worker), Saie Khas and MOFA attestations — all managed by our Jeddah office.</p>
    `,
  },
  {
    slug: "cheap-flights-tips-2026",
    title: "How to Find Cheap Flights in 2026 — 10 Insider Tips from a Travel Agent",
    description:
      "Insider tips from a Jeddah travel agency to book cheap international and domestic flights in 2026 — best days, tools, and hidden fare tricks.",
    category: "Airline Ticketing",
    readMinutes: 6,
    publishedAt: "2026-06-01",
    updatedAt: "2026-07-18",
    cover: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80",
    keywords: [
      "cheap flights 2026",
      "cheap airline tickets",
      "how to book cheap flights",
      "cheap flights from jeddah",
      "cheap flights to pakistan",
      "airline ticketing agent",
    ],
    html: `
      <p>Airfare is one of the biggest travel costs, but a good agent knows how to shave 20–40% off the sticker price. Here are our top 10 tips.</p>
      <ol>
        <li>Book Tuesday-Wednesday, fly mid-week</li>
        <li>Use flexible date matrix search</li>
        <li>Consider nearby airports (JED ↔ MED, DXB ↔ SHJ)</li>
        <li>Split one-way tickets on different carriers</li>
        <li>Fly with a stopover — sometimes 50% cheaper</li>
        <li>Book 6–8 weeks in advance for international</li>
        <li>Use travel-agent GDS rates (that's us!)</li>
        <li>Bundle Umrah + flight + hotel for group discounts</li>
        <li>Watch for airline error fares</li>
        <li>Ask your agent about corporate & seaman fares</li>
      </ol>
      <p>Contact Shahid Prime on WhatsApp for real-time GDS quotes across all major airlines — Saudia, PIA, Emirates, Qatar, flynas, flyadeal and more.</p>
    `,
  },
  {
    slug: "study-visa-europe-guide",
    title: "Study Visa to Europe — Best Countries, Scholarships & Requirements",
    description:
      "The best European countries for study visas in 2026 — Hungary, Italy, Germany, Bulgaria — plus scholarship options and step-by-step application from Shahid Prime.",
    category: "Study Visa",
    readMinutes: 8,
    publishedAt: "2026-05-15",
    updatedAt: "2026-07-18",
    cover: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80",
    keywords: [
      "study visa europe",
      "study in germany",
      "study in hungary",
      "study in italy",
      "european student visa",
      "cheap universities in europe",
      "scholarships europe 2026",
    ],
    html: `
      <p>Europe offers world-class education at a fraction of US or UK costs. Here are the best study-visa destinations in 2026 for students from Pakistan and the Gulf.</p>
      <h2>Top countries</h2>
      <ul>
        <li><strong>Germany</strong> — many public universities are tuition-free</li>
        <li><strong>Hungary</strong> — Stipendium Hungaricum scholarship</li>
        <li><strong>Italy</strong> — DSU regional grants + low tuition</li>
        <li><strong>Bulgaria</strong> — English programs at low cost</li>
        <li><strong>Romania &amp; Slovakia</strong> — emerging affordable options</li>
      </ul>
      <h2>General study visa requirements</h2>
      <ul>
        <li>University admission / offer letter</li>
        <li>Proof of tuition payment or scholarship</li>
        <li>Blocked account / financial proof (~€11,000/yr for Germany)</li>
        <li>Health insurance</li>
        <li>Accommodation proof</li>
        <li>Academic transcripts + IELTS/TOEFL where required</li>
      </ul>
      <p>Shahid Prime handles admissions, embassy documentation, visa filing and pre-departure guidance.</p>
    `,
  },
  {
    slug: "cr-commercial-registration-saudi-arabia-guide",
    title: "How to Get a Commercial Registration (CR) in Saudi Arabia — 2026 Guide",
    description:
      "Step-by-step guide to getting a Saudi Commercial Registration (CR) in 2026 — sole proprietorship vs LLC, MISA, Chamber of Commerce, ZATCA and GOSI explained.",
    category: "Business Setup",
    readMinutes: 9,
    publishedAt: "2026-07-05",
    updatedAt: "2026-07-18",
    cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80",
    keywords: [
      "commercial registration saudi arabia",
      "saudi cr",
      "business setup saudi arabia",
      "MISA license",
      "how to open company in saudi",
      "cr provider jeddah",
    ],
    html: `
      <p>Vision 2030 has opened Saudi Arabia to entrepreneurs like never before. Whether you want a sole proprietorship, an establishment (<em>Muassasah</em>), or a full LLC with foreign ownership, this guide explains how a <strong>Commercial Registration (CR)</strong> works.</p>
      <h2>What is a Saudi CR?</h2>
      <p>The Commercial Registration is the official record proving your business legally exists in the Kingdom. It's issued by the Ministry of Commerce and is required to open a bank account, sign contracts, sponsor employees, or invoice clients.</p>
      <h2>Options for foreigners</h2>
      <ul>
        <li><strong>MISA license</strong> — 100% foreign ownership in most sectors</li>
        <li><strong>Saudi partner LLC</strong> — traditional route with local partner</li>
        <li><strong>Establishment</strong> — for Saudi/GCC nationals</li>
      </ul>
      <h2>Post-CR compliance</h2>
      <p>After CR, you'll need Chamber of Commerce membership, a Baladiya (municipality) license, ZATCA (VAT/tax) registration, GOSI (social insurance) enrollment, and MOFA attestation for foreign documents.</p>
      <p>Shahid Prime provides <a href="/services/cr-provider">end-to-end CR issuance</a> and post-setup compliance in Jeddah and across KSA.</p>
    `,
  },
  {
    slug: "dubai-visit-visa-from-pakistan",
    title: "Dubai Visit Visa from Pakistan — Types, Fees & Approval Time",
    description:
      "Complete 2026 guide to the Dubai visit visa from Pakistan — 30-day, 60-day, multiple-entry options, documents and how to apply through Shahid Prime.",
    category: "Visit Visa",
    readMinutes: 7,
    publishedAt: "2026-05-01",
    updatedAt: "2026-07-18",
    cover: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80",
    keywords: [
      "dubai visit visa",
      "uae tourist visa from pakistan",
      "dubai visa fees",
      "60 day dubai visa",
      "dubai multiple entry visa",
    ],
    html: `
      <p>Dubai remains one of the easiest and fastest visit-visa destinations for Pakistani travelers. Here's what you need in 2026.</p>
      <h2>Types of UAE visit visas</h2>
      <ul>
        <li>30-day single-entry tourist visa</li>
        <li>60-day single-entry tourist visa</li>
        <li>Multiple-entry 1-year and 5-year tourist visas</li>
        <li>Transit visa (48 or 96 hours)</li>
      </ul>
      <h2>Documents required</h2>
      <ul>
        <li>Passport valid 6+ months + photo</li>
        <li>Confirmed return ticket</li>
        <li>Hotel booking or host details</li>
        <li>Bank statement (last 3 months)</li>
      </ul>
      <p>Most visas are issued in <strong>3–5 working days</strong>. Contact us for the latest fees and fast-track processing.</p>
    `,
  },
  {
    slug: "hajj-vs-umrah-difference",
    title: "Hajj vs Umrah — Key Differences Every Muslim Should Know",
    description:
      "Understand the difference between Hajj and Umrah — timing, rituals, obligation, cost and how to prepare. A concise guide by Shahid Prime Travel and Tours.",
    category: "Umrah & Hajj",
    readMinutes: 5,
    publishedAt: "2026-04-20",
    updatedAt: "2026-07-18",
    cover: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1600&q=80",
    keywords: [
      "hajj vs umrah",
      "difference hajj umrah",
      "umrah rituals",
      "hajj packages",
      "umrah packages",
    ],
    html: `
      <p>Both Hajj and Umrah are sacred pilgrimages to Makkah, but they differ in several important ways.</p>
      <h2>Timing</h2>
      <p><strong>Hajj</strong> is performed only during Dhul Hijjah (8–13). <strong>Umrah</strong> can be performed any time of the year.</p>
      <h2>Obligation</h2>
      <p>Hajj is one of the five pillars of Islam — obligatory once in a lifetime for those able. Umrah is highly recommended (Sunnah/Mustahabb) but not obligatory.</p>
      <h2>Rituals</h2>
      <p>Umrah consists of Ihram, Tawaf, Sa'i and Halq/Taqsir. Hajj adds Wuquf at Arafah, Muzdalifah, stoning at Jamarat, and animal sacrifice.</p>
      <h2>Cost</h2>
      <p>Hajj packages are considerably more expensive because of the fixed dates and Mina/Arafat accommodation. Umrah is much more flexible and affordable.</p>
      <p>Ready to plan your journey? <a href="/services/umrah">See our Umrah services</a> or message us on WhatsApp.</p>
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const BLOG_AUTHOR = author;
