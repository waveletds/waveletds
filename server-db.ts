import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db.json");

export interface ServicePackage {
  id: string;
  category: string;
  name: string;
  priceValue: number;
  priceLabel: string;
  shortDesc: string;
  features: string[];
  duration: string;
  tag?: string;
}

export interface ScriptOrWebsite {
  id: string;
  type: "website" | "script" | "service";
  name: string;
  price: number;
  category: string;
  shortDesc: string;
  features: string[];
  techStack: string[];
  approxSize?: string;
}

export interface OTPService {
  id: string;
  appName: string;
  price: number;
  availableNumbers: number;
  icon: string;
}

export interface VirtualNumberLease {
  id: string;
  country: string;
  flag: string;
  prefix: string;
  monthlyCost: number;
  type: "US" | "UK" | "Foreign";
}

export interface LeadSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  packageType: string;
  customBudget: string;
  message: string;
  source: string;
  status: "new" | "contacted" | "archived";
}

export interface Transaction {
  id: string;
  type: "funding" | "purchase";
  amount: number;
  serviceName: string;
  date: string;
  status: "success" | "pending" | "failed";
  reference: string;
}

export interface PurchasedItem {
  id: string;
  purchaseId: string;
  name: string;
  price: number;
  date: string;
  key?: string;
  downloadLink?: string;
  phoneDetails?: {
    number: string;
    expiresAt: string;
    country: string;
  };
}

export interface SmsTemplate {
  id: string;
  title: string;
  body: string;
  senderId?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  walletBalance: number;
  createdAt: string;
  inventory: PurchasedItem[];
  transactions: Transaction[];
}

export interface DbSchema {
  apiKeys: {
    GEMINI_API_KEY: string;
    VITE_WHATSAPP_NUMBER: string;
    PAYSTACK_SECRET_KEY: string;
    BULK_SMS_API_KEY: string;
    ADMIN_LOGIN_PASSWORD?: string;
  };
  nairaPackages: ServicePackage[];
  digitalAssets: ScriptOrWebsite[];
  otpApps: OTPService[];
  virtualNumbers: VirtualNumberLease[];
  miscRates: {
    fastTrackPrice: number;
    monthlySupportPrice: number;
  };
  leads: LeadSubmission[];
  users: UserProfile[];
  smsTemplates: SmsTemplate[];
}

const DEFAULT_NAIRA_PACKAGES: ServicePackage[] = [
  {
    id: "ai-money-1",
    category: "ai-mastery",
    name: "AI Money Making Mastery (Essentials)",
    priceValue: 45000,
    priceLabel: "₦45,000",
    shortDesc: "Complete starter course & mentorship on making money online with AI tools.",
    features: [
      "Lifetime access to Al-Salam's video modules",
      "5 practical AI side-hustle templates",
      "Weekly private access group chat",
      "Bonus: Upwork & Fiverr optimization secrets"
    ],
    duration: "4 Weeks Mentorship"
  },
  {
    id: "ai-money-2",
    category: "ai-mastery",
    name: "Wavelet VIP Mentorship Program",
    priceValue: 150000,
    priceLabel: "₦150,000",
    shortDesc: "Comprehensive 1-on-1 mentorship, personalized roadmap & automation scripts.",
    features: [
      "Everything in Essentials package",
      "Four 1-on-1 direct Zoom consults (1 hour each)",
      "Custom business landing pages (designed by Al-Salam)",
      "Direct WhatsApp support channel with Al-Salam",
      "Certified Al-Salam Sinner completion badge"
    ],
    duration: "8 Weeks Elite Care",
    tag: "Most Requested"
  },
  {
    id: "web-1",
    category: "web-dev",
    name: "Basic Business Portal",
    priceValue: 120000,
    priceLabel: "₦120,000",
    shortDesc: "Elegant single-page presentation website for small businesses.",
    features: [
      "Responsive Single Page design",
      "Interactive WhatsApp & email leads capture",
      "SEO semantic tag structure",
      "Custom domain connection & SSL deployment"
    ],
    duration: "5-7 Days Delivery"
  },
  {
    id: "web-2",
    category: "web-dev",
    name: "Custom Web Application (Pro)",
    priceValue: 250000,
    priceLabel: "₦250,000",
    shortDesc: "Robust multi-page website with custom layouts & lightweight backend modules.",
    features: [
      "Up to 5 Fully Modular pages",
      "Custom admin layout or automated lead capture tracking",
      "Interactive service calculators",
      "1 month post-launch bug support"
    ],
    duration: "14 Days Delivery",
    tag: "Popular Choice"
  },
  {
    id: "web-3",
    category: "web-dev",
    name: "Enterprise Commerce & AI Integration",
    priceValue: 450000,
    priceLabel: "₦450,000+",
    shortDesc: "Full-scale custom platform, payment systems, & Gemini smart solutions.",
    features: [
      "Unlimited clean pages & secure products catalog",
      "Full Flutterwave/Paystack payments checkout",
      "Integrated Google/Gemini API assistant proxy",
      "Advanced caching, PWA mobile-ready",
      "3 Months priority technical maintenance"
    ],
    duration: "21-30 Days Delivery"
  },
  {
    id: "design-1",
    category: "graphic-design",
    name: "Brand Logo & Style Palette",
    priceValue: 35000,
    priceLabel: "₦35,000",
    shortDesc: "Professional typography & SVG vector logos to define your brand.",
    features: [
      "3 original logo proposals",
      "High-res vector source files included",
      "Premium typography recommendations",
      "Social media profile sizing variants"
    ],
    duration: "3 Days Delivery"
  },
  {
    id: "design-2",
    category: "graphic-design",
    name: "Commercial Visual Branding Pack",
    priceValue: 180000,
    priceLabel: "₦180,000",
    shortDesc: "Full-spectrum branding: flyers, business cards, social media assets.",
    features: [
      "Premium logo redesign + typography palette",
      "12 custom high-converting social templates",
      "Print-ready business card & letterhead designs",
      "3 professional marketing flyer concepts"
    ],
    duration: "10 Days Delivery"
  },
  {
    id: "seo-1",
    category: "seo",
    name: "Strategic Local SEO Kickstart",
    priceValue: 80000,
    priceLabel: "₦80,000",
    shortDesc: "Local keyword deployment and fast indexing to rank your local shop.",
    features: [
      "Targeted local keyword directory search",
      "Perfect Meta Title & Meta Description rewrite",
      "Search Console setup + Index request dispatch",
      "Competitor digital audit roadmap"
    ],
    duration: "7 Days Audit + Setup"
  },
  {
    id: "seo-2",
    category: "seo",
    name: "Ongoing Authority Organic SEO",
    priceValue: 250000,
    priceLabel: "₦250,000 / month",
    shortDesc: "Monthly content orchestration, strategic backlinking, & high rankings.",
    features: [
      "Monthly 4 deep-dive SEO optimized blog articles",
      "Weekly performance analytics dashboard report",
      "Technical index debugging & page score maintenance",
      "Backlink outreach directory activation"
    ],
    duration: "Monthly Retainer"
  },
  {
    id: "gmb-1",
    category: "gmb",
    name: "Google My Business Map Pack Setup",
    priceValue: 45000,
    priceLabel: "₦45,000",
    shortDesc: "Perfect claim, keyword configuration, and map visibility configuration.",
    features: [
      "Claim and optimization setup",
      "Optimized geo-targeted business descriptions",
      "Strategic Q&A directory uploads",
      "Template guide to get instant 5-star reviews"
    ],
    duration: "4 Days Delivery"
  },
  {
    id: "gmb-2",
    category: "gmb",
    name: "GMB Dominator Retainer",
    priceValue: 120000,
    priceLabel: "₦120,000 / month",
    shortDesc: "Monthly review management, local Map posts, and active rank protection.",
    features: [
      "3 custom optimized geo-posts per week",
      "Review response crafting with keyword injection",
      "Local map citation audits",
      "Product listings and service catalog synced monthly"
    ],
    duration: "Monthly Retainer"
  },
  {
    id: "combo-1",
    category: "combo",
    name: "Wavelet 'Local Business' Ultimate Combo",
    priceValue: 350000,
    priceLabel: "₦350,000",
    shortDesc: "Core Web Dev + Full GMB Setup + SEO Starter Package. Best value.",
    features: [
      "Basic Business Portal (₦120k value)",
      "GMB Map Pack Setup (₦45k value)",
      "Strategic Local SEO Kickstart (₦80k value)",
      "Combined Branding Social Kit & WhatsApp setup",
      "Amazing combo discount - Save over ₦95,000!"
    ],
    duration: "14 Days Setup",
    tag: "Best Value"
  },
  {
    id: "combo-2",
    category: "combo",
    name: "Wavelet 'Grand Growth' Combo",
    priceValue: 650050,
    priceLabel: "₦650,050",
    shortDesc: "Pro Web Application + Full Visual Branding pack + GMB + 1 Month Pro SEO.",
    features: [
      "Custom Web Application (₦250k value)",
      "Commercial Visual Branding Pack (₦180k value)",
      "GMB Map Pack Setup (₦45k value)",
      "Ongoing Organic Traffic SEO - 1st Month (₦250k value)",
      "Save more than ₦175,000 with this bundle!"
    ],
    duration: "21 Days Delivery",
    tag: "Scale Elite"
  }
];

const DEFAULT_DIGITAL_ASSETS: ScriptOrWebsite[] = [
  {
    id: "dw-1",
    type: "website",
    name: "Complete Advanced E-Commerce Platform",
    price: 180000,
    category: "E-Commerce",
    shortDesc: "Complete deployed visual retail platform with cart, payment gateway, and beautiful management admin board.",
    features: ["Custom UI storefront", "Paystack/Stripe checkout", "Real-time Order tracking dashboard", "PWA Support"],
    techStack: ["React", "Express", "Tailwind CSS", "MongoDB/Postgres"],
    approxSize: "45MB Deployed Package"
  },
  {
    id: "ds-1",
    type: "script",
    name: "E-Commerce Retail Laravel Engine Source Code",
    price: 45000,
    category: "E-Commerce",
    shortDesc: "The fully engineered source code script. Just upload and configure your credentials. Clean modules, pre-integrated with SMS reminders and automatic orders.",
    features: ["Modular design patterns", "Standard API routers", "Secure Auth protection", "Automatic invoice dispatcher"],
    techStack: ["PHP Laravel 11", "Vite JS", "MySQL"],
    approxSize: "12.4MB Source ZIP"
  },
  {
    id: "dw-2",
    type: "website",
    name: "Airtime, Data & Multi-VTU Client Portal",
    price: 210000,
    category: "VTU Telecoms",
    shortDesc: "Turnkey ready-made automated telecoms portal. Deployed with API pipelines checking for topups, bills payment, and subscription automation.",
    features: ["Auto wallets synchronization", "Instant commissions configuration", "99% uptime direct routes", "WhatsApp notifications system"],
    techStack: ["Next.js", "Fastify Server", "React Query", "Tailwind"],
    approxSize: "60MB Portal Bundle"
  },
  {
    id: "ds-2",
    type: "script",
    name: "Telecom Service Topup React Native Script",
    price: 50000,
    category: "VTU Telecoms",
    shortDesc: "Mobile application template script with billing algorithms, local API gateways pre-installed.",
    features: ["Android & iOS cross-platform compile", "Fluid transitions layout", "Secure payment hooks", "Dark mode toggling system"],
    techStack: ["React Native", "Expo Core", "Tailwind CSS Mobile"],
    approxSize: "8.1MB Application Code"
  },
  {
    id: "ds-3",
    type: "script",
    name: "Crypto Arbitrage Dashboard UI Template",
    price: 95000,
    category: "Fintech Scripts",
    shortDesc: "Premium dashboard showcasing live tickers, user trade history panels, coin swap calculators, and elegant dark visualization panels.",
    features: ["Stunning high fidelity charts", "Mock live trade generator code", "Perfect mobile responsive wrappers", "D3.js metrics animations"],
    techStack: ["React", "Vite", "Recharts", "Lucide React Icons"],
    approxSize: "4.8MB Front-End Code"
  },
  {
    id: "dw-3",
    type: "website",
    name: "Comprehensive School Portal System (LMS)",
    price: 240000,
    category: "LMS Systems",
    shortDesc: "Fully deployed school registration, custom course portal, marks database, and online fees collection infrastructure with premium UI.",
    features: ["Beautiful teacher dashboards", "Instant PDF card generator", "Dynamic assignment hubs", "Online test portal modules"],
    techStack: ["React SPA", "Express API Base", "Prisma ORM", "Docker container"],
    approxSize: "110MB Full System Stack"
  },
  {
    id: "ds-4",
    type: "script",
    name: "LMS Admin Dashboard & Course Coordinator Script",
    price: 65000,
    category: "LMS Systems",
    shortDesc: "Full backend core script package to route student requests, handle exams scoring, and save cloud resources.",
    features: ["Secure course assignment algorithms", "CSV batch upload ready", "Clean REST API schema", "Comprehensive role guards"],
    techStack: ["TypeScript Node.js", "PostgreSQL schema", "Zod validations"],
    approxSize: "15.2MB Server Script"
  },
  {
    id: "dserv-1",
    type: "service",
    name: "Custom Payment Node & API Configuration",
    price: 30000,
    category: "Web Engineering",
    shortDesc: "Professional configuration of Flutterwave, Paystack, Stripe, credit cards, or bespoke SMS billing triggers into your existing script.",
    features: ["Complete web hook validation setup", "Detailed API logging & testing", "3 days priority support", "Anti-payload forgery security"],
    techStack: ["Active API Setup", "Full Sandbox Testing"],
  },
  {
    id: "dserv-2",
    type: "service",
    name: "Legacy Website Refresh & Tailwind Styling Repair",
    price: 60000,
    category: "Web Engineering",
    shortDesc: "Complete rebuild of ancient sluggish portals into clean, lightning-fast high contrast websites optimized for conversions.",
    features: ["Upgrade layout architecture", "Integrate responsive mobile breakpoints", "Aesthetic typography pairings", "Improve PageSpeed core metrics to 95+"],
    techStack: ["Tailwind Utility Polish", "Aesthetic UI Standards"],
  }
];

const DEFAULT_OTP_APPS: OTPService[] = [
  { id: "otp-wa", appName: "WhatsApp Messenger", price: 2500, availableNumbers: 420, icon: "MessagesSquare" },
  { id: "otp-tg", appName: "Telegram Messenger", price: 2000, availableNumbers: 512, icon: "Send" },
  { id: "otp-google", appName: "Google / YouTube Account", price: 1800, availableNumbers: 1240, icon: "Sparkles" },
  { id: "otp-fb", appName: "Meta / Facebook / IG", price: 1500, availableNumbers: 240, icon: "Laptop" },
  { id: "otp-discord", appName: "Discord Server Access", price: 1300, availableNumbers: 189, icon: "Server" },
];

const DEFAULT_VIRTUAL_NUMBERS: VirtualNumberLease[] = [
  { id: "vn-us", country: "United States (US)", flag: "🇺🇸", prefix: "+1", monthlyCost: 12000, type: "US" },
  { id: "vn-uk", country: "United Kingdom (UK)", flag: "🇬🇧", prefix: "+44", monthlyCost: 14000, type: "UK" },
  { id: "vn-ca", country: "Canada (CA)", flag: "🇨🇦", prefix: "+1", monthlyCost: 13000, type: "Foreign" },
  { id: "vn-nl", country: "Netherlands (NL)", flag: "🇳🇱", prefix: "+31", monthlyCost: 15000, type: "Foreign" },
  { id: "vn-za", country: "South Africa (ZA)", flag: "🇿🇦", prefix: "+27", monthlyCost: 16500, type: "Foreign" },
];

const DEFAULT_LEADS: LeadSubmission[] = [
  {
    id: "ALPL-771251",
    timestamp: "2026-06-01T15:20:00.000Z",
    name: "Al-Salam First Tester",
    email: "tester@wavelet.com",
    phone: "+2347039988221",
    service: "AI Money Making Mastery (Essentials)",
    packageType: "ai-mastery",
    customBudget: "₦45,000",
    message: "Interested in scaling high-ticket service arbitrage",
    source: "Global Booking Funnel Overlay",
    status: "new"
  }
];

const DEFAULT_USERS: UserProfile[] = [
  {
    id: "usr-main-salam",
    name: "Al-Salam Developer Client",
    email: "iqleadsbloger@gmail.com",
    phone: "+234 80 0000 1234",
    walletBalance: 45000,
    createdAt: "2026-05-30T10:00:00.000Z",
    inventory: [
      {
        id: "purch-1",
        purchaseId: "web-dev-vtu",
        name: "VTU & Airtime Topup Script V2.4",
        price: 15000,
        date: "2026-05-30 15:45",
        key: "WVL-WSC-9981-VTU3",
        downloadLink: "https://wavelet-solutions.dynamic-filehost.com/dl/scripts/vtu-airtime-v24_sc.zip"
      }
    ],
    transactions: [
      {
        id: "tx-1",
        type: "funding",
        amount: 30000,
        serviceName: "Funded via Paystack Simulator",
        date: "2026-05-30 14:12",
        status: "success",
        reference: "WVL-TX-PYSK-77121"
      },
      {
        id: "tx-2",
        type: "funding",
        amount: 15000,
        serviceName: "System Welcome Credit",
        date: "2026-05-28 09:30",
        status: "success",
        reference: "WVL-TX-INIT-0010"
      }
    ]
  }
];

export function getInitialDbState(): DbSchema {
  return {
    apiKeys: {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
      VITE_WHATSAPP_NUMBER: process.env.VITE_WHATSAPP_NUMBER || "+2348012345678",
      PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY || "sk_test_mock771239920",
      BULK_SMS_API_KEY: process.env.BULK_SMS_API_KEY || "bulk_sms_default_prod_key",
      ADMIN_LOGIN_PASSWORD: process.env.ADMIN_LOGIN_PASSWORD || "salamadmin77",
    },
    nairaPackages: DEFAULT_NAIRA_PACKAGES,
    digitalAssets: DEFAULT_DIGITAL_ASSETS,
    otpApps: DEFAULT_OTP_APPS,
    virtualNumbers: DEFAULT_VIRTUAL_NUMBERS,
    miscRates: {
      fastTrackPrice: 50050,
      monthlySupportPrice: 30050
    },
    leads: DEFAULT_LEADS,
    users: DEFAULT_USERS,
    smsTemplates: [
      {
        id: "tmpl-welcome",
        title: "Welcome New Member",
        body: "Hello {name}, welcome to Wavelet Digital Solutions! Your account is active, use code {code} to verify. For mentoring call Al-Salam Sinner.",
        senderId: "Wavelet",
        createdAt: new Date().toISOString()
      },
      {
        id: "tmpl-payment",
        title: "Deposit Successful Alert",
        body: "Wavelet CreditAlert: Account {email} has been credited with ₦{amount} via Paystack Secure checkout. New Balance: ₦{balance}.",
        senderId: "WVLAlert",
        createdAt: new Date().toISOString()
      }
    ],
  };
}

export function loadDb(): DbSchema {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const state = getInitialDbState();
      fs.writeFileSync(DB_PATH, JSON.stringify(state, null, 2), "utf-8");
      return state;
    }
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    const data = JSON.parse(raw);
    
    // Ensure standard keys are present
    const defaultState = getInitialDbState();
    return {
      apiKeys: { ...defaultState.apiKeys, ...(data.apiKeys || {}) },
      nairaPackages: data.nairaPackages || defaultState.nairaPackages,
      digitalAssets: data.digitalAssets || defaultState.digitalAssets,
      otpApps: data.otpApps || defaultState.otpApps,
      virtualNumbers: data.virtualNumbers || defaultState.virtualNumbers,
      miscRates: data.miscRates || defaultState.miscRates,
      leads: data.leads || defaultState.leads,
      users: data.users || defaultState.users,
      smsTemplates: data.smsTemplates || defaultState.smsTemplates || [],
    };
  } catch (err) {
    console.error("Error loading JSON db, fallback to defaults", err);
    return getInitialDbState();
  }
}

export function saveDb(data: DbSchema): boolean {
  try {
    const parent = path.dirname(DB_PATH);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error saving JSON db", err);
    return false;
  }
}
