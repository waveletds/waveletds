export type ServiceCategory = "phone-numbers" | "otp-services" | "web-sales" | "social-accounts" | "airtime-to-cash" | "gmb" | "combo";

export interface ServicePackage {
  id: string;
  category: ServiceCategory;
  name: string;
  priceValue: number; // in Naira, e.g., 45000
  priceLabel: string; // e.g., "₦45,000" or "₦80,000/month"
  shortDesc: string;
  description: string;
  features: string[];
  duration: string;
  tag?: string; // e.g., "Best Value"
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: "all" | "web" | "design" | "ai-art" | "seo-gmb";
  image: string; // fallback or generated URL
  description: string;
  stats?: { label: string; value: string }; // e.g. "Revenue", "+320k"
  technologies: string[];
  link?: string;
  client?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: "AI Money" | "SEO Hacks" | "Branding" | "Web Trends";
  excerpt: string;
  content: string; // markdown content
  readTime: string;
  date: string;
  views: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: ServiceCategory | "general";
}

// Global Static Data
export const SERVICES_DATA: ServicePackage[] = [
  {
    id: "phone-num-1",
    category: "phone-numbers",
    name: "Global Virtual Phone Numbers",
    priceValue: 12000,
    priceLabel: "₦12,000 / month",
    shortDesc: "Rent or buy high-quality verified foreign/local virtual numbers for global operations.",
    description: "Secure dedicated lines covering USA, UK, Canada, and 50+ European and African locations for seamless voice routing, call forwarding, and digital accounts setup.",
    features: [
      "Lease certified virtual DID communication lines",
      "Compatible with major client outreach platforms",
      "Saves high roaming and foreign setups costs",
      "Instant activation and custom status configuration"
    ],
    duration: "Monthly Retainer Active"
  },
  {
    id: "otp-service-1",
    category: "otp-services",
    name: "Automated SIM & SMS OTP Bypassing",
    priceValue: 1500,
    priceLabel: "₦1,500 / code",
    shortDesc: "Instant, real-time OTP verification bypass streams for WhatsApp, Telegram, Google, and more.",
    description: "Fully automated secure verification solution running on active sim gateways. Instantly bypass verification locks with real-time text rendering directly on our dashboard.",
    features: [
      "Receive verification codes for all global systems",
      "Backed by local pools of real active physical SIM lines",
      "High privacy standards — never logs client data",
      "Integrated with our Fintech Reseller workspace API"
    ],
    duration: "Instant Automations Delivery",
    tag: "High Demand"
  },
  {
    id: "web-sale-1",
    category: "web-sales",
    name: "Interactive Premium Website Sales",
    priceValue: 120000,
    priceLabel: "₦120,000",
    shortDesc: "Rent or purchase beautifully responsive modern presentation portfolios and e-commerce websites.",
    description: "Engineered in robust React and Tailwind CSS for extreme speed. Perfect display, responsive, fully loaded with WhatsApp instant buttons and organic leads capture forms.",
    features: [
      "Custom responsive design & branding templates",
      "Optimized with fast assets (PWA mobile ready)",
      "Free Custom Domain and integrated SSL lifetime deployment",
      "1 Month priority bug fixing support included"
    ],
    duration: "5-7 Days Dispatch"
  },
  {
    id: "social-acc-1",
    category: "social-accounts",
    name: "Aged Organic Social Media Accounts",
    priceValue: 25000,
    priceLabel: "₦25,000+",
    shortDesc: "Purchase aged, highly organic pre-verified TikTok, Instagram, Twitter/X, or Facebook accounts.",
    description: "Avoid direct restrictions. Buy pre-registered accounts with natural historical activity and organic audiences to accelerate marketing campaigns and secure immediate authority.",
    features: [
      "Pre-verified aged profiles (Insta, TikTok, X, Facebook)",
      "High trust score indicators of previous usage history",
      "Safe handover procedure and setup assistance",
      "48-hour replacement warrant if verification error triggers"
    ],
    duration: "2 Hours Handover"
  },
  {
    id: "airtime-cash-1",
    category: "airtime-to-cash",
    name: "Instant Airtime to Cash Swap Converter",
    priceValue: 1000,
    priceLabel: "Best Exchange Rates",
    shortDesc: "Swap your MTN, Airtel, Glo, and 9mobile airtime pin/VTU for instant withdrawable cash.",
    description: "Convert accumulated airtime values into withdrawable Naira cash directly inside your local bank account. Fully transparent exchange rates with instant auto-transfers.",
    features: [
      "All major networks accepted (MTN, Airtel, Glo, 9mobile)",
      "Best conversion payout percentage (up to 85% liquid rate)",
      "Instant bank payouts (under 5 minutes average speed)",
      "Invoice reference trackable on our administrative panel"
    ],
    duration: "Under 5 Mins Transfer",
    tag: "Lowest fee"
  },
  {
    id: "gmb-service-1",
    category: "gmb",
    name: "Google My Business Google Maps Rank Boot",
    priceValue: 45000,
    priceLabel: "₦45,000",
    shortDesc: "Claim your Google Map address, configure local rankings, and rank on first page.",
    description: "Flood your store with buyer calls. We claim, verify, register local map listings, build high-index maps citations, and configure search schema tags to pull nearby searchers.",
    features: [
      "Full map listing claim & profile optimization",
      "Strategic local keywords insertion and metadata rewrite",
      "High-authority geo-posts & digital citation uploads",
      "Direct guidance to collect reliable 5-star Google reviews"
    ],
    duration: "4 Days Delivery"
  },
  {
    id: "combo-pack-1",
    category: "combo",
    name: "Ultimate Small Business Combo Pack",
    priceValue: 180000,
    priceLabel: "₦180,000",
    shortDesc: "Premium Landing Page + GMB Verification + 5 Virtual Numbers. Saves ₦45,000.",
    description: "The complete setup to start trading instantly in Nigeria. Get a stunning web portal to display your services, rank top spot on Google searches, and receive calls via UK/US lines.",
    features: [
      "Basic Custom Website (₦120,000 value)",
      "Google My Business ranking verification (₦45,000 value)",
      "5 Virtual foreign leased lines (₦30,000 value)",
      "Unified custom WhatsApp leads capture setup",
      "Massive combo discount — Save ₦45,000 instantly!"
    ],
    duration: "10 Days Setup",
    tag: "Best Value"
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "port-1",
    title: "EcoNigeria Logistics Platform",
    category: "web",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80",
    description: "A fast cargo-tracking web application built for a mid-scale shipping brand. Integrated conversion-optimized interactive pricing tools and localized GMB sync.",
    stats: { label: "Booking Vol", value: "+210%" },
    technologies: ["React", "Express", "Tailwind CSS", "WhatsApp Dispatch API"],
    client: "EcoNigeria Shipping"
  },
  {
    id: "port-2",
    title: "ChicStyle Brand Identity Design",
    category: "design",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    description: "Complete visual redesign for a premium African fashion house. Includes vector logo patterns, luxury social templates, and printed package material standards.",
    stats: { label: "Brand Equity", value: "Verified Logo" },
    technologies: ["Illustrator", "Brand Typography Standards", "SVG Vectors"],
    client: "ChicStyle House"
  },
  {
    id: "port-3",
    title: "Abuja Dental Hub - Local SEO Sweep",
    category: "seo-gmb",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80",
    description: "Optimized Google My Business profile and deployed a fast booking portal. Attained top 3 rank positions for searches containing 'dentist in Abuja' in 30 days.",
    stats: { label: "Map Views", value: "+380% MoM" },
    technologies: ["GMB Citations", "Review Funnels", "Local Schema Markup"],
    client: "Dental Hub FCT"
  },
  {
    id: "port-4",
    title: "Afrisell AI-Powered Retail Automator",
    category: "web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    description: "Integrated an automated product catalog with a server-side Gemini AI content assistant to write sales descriptions, paired with a custom WhatsApp checkout.",
    stats: { label: "Desc Speed", value: "10x Faster" },
    technologies: ["React", "Gemini API Proxy", "Tailwind CSS", "Express"],
    client: "Afrisell Global"
  },
  {
    id: "port-5",
    title: "UrbanBite Food Co Branding",
    category: "design",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80",
    description: "Engaging commercial illustrations, menus, and visual flyers for a high-traffic Lagos restaurant chain, boosting social CTR by 45%.",
    stats: { label: "Social CTR", value: "+45%" },
    technologies: ["Commercial Illustration", "Social Templates", "Typography Mastery"],
    client: "UrbanBite F&B"
  },
  {
    id: "port-6",
    title: "NaijaTech Agency National SEO Rank Audit",
    category: "seo-gmb",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    description: "Advanced national-scale search optimization program targeting professional development keywords in Nigeria.",
    stats: { label: "Rankings", value: "Top 2 Organic" },
    technologies: ["Competitorial SEO", "PageSpeed Index Boost", "Rank Tracking"],
    client: "NaijaTech Agency"
  }
];

export const BLOG_DATA: BlogPost[] = [
  {
    id: "blog-1",
    title: "5 AI Side-Hustles Making Nigerians At Least ₦200k/Month Today",
    category: "AI Money",
    excerpt: "Discover the exact, simple AI tools and copy-paste steps you can deploy from Lagos or Abuja to service international freelancing clients right from your bed.",
    readTime: "6 min read",
    date: "May 25, 2026",
    views: 1240,
    content: `### 5 High-Demand AI Side Hustles To Launch In Nigeria

The digital landscape is shifting rapidly. With tools like ChatGPT, Midjourney, and v0, freelancers are producing top-tier work in minutes. Here's a realistic guide on how Al-Salam Sinner helps his students make money with AI:

#### 1. AI-Driven Copy Brokerage
Many international brands pay $50–$150 per SEO article. By learning how to craft highly nuanced system prompts for Gemini-2.5 models and editing them manually, you can deliver 3 complete articles daily that pass quality tests. 
*   **The Al-Salam Sinner Trick**: Never deliver a raw AI response. Inject local Nigerian proverbs or human warmth.

#### 2. High-converting GMB Setup & Optimization
Local business owners are brilliant at trade but have zero knowledge of SEO. Offer to claim, optimize, and write 3 weekly GMB automated updates using AI for a flat fee of ₦45,000 setup. Once they verify on the map, their maps views rise.

#### 3. Social Media Graphics & Layout Arbitrage
Pair AI image models with standard Canva mockup grids. Generate high-fidelity marketing visuals for local shops. You collect ₦35,000 for a set of logo drafts or flyer collections that takes under 2 hours.

#### 4. Automatic Web Copywriting Systems
Deploy automated customer landing pages using lightweight HTML templates filled with Gemini-written copy. You charge ₦120,000 while utilizing pre-designed UI elements.

#### 5. Local AI Consulting & Automation training
Host training for small companies on how to utilize ChatGPT for customer support or newsletter generation. Charges start from ₦25,000/hour.

Want to master these fast? Sign up for the **AI Money Making Mastery Essentials Course**! Al-Salam Sinner gives you templates and active guidance to book your first client.`
  },
  {
    id: "blog-2",
    title: "The Ultimate Guide to Google My Business (GMB) Mastery in Nigeria",
    category: "SEO Hacks",
    excerpt: "Top ranking hacks to get your local business into Google's coveted Local Map Pack and get flooded with calls.",
    readTime: "8 min read",
    date: "May 18, 2026",
    views: 890,
    content: `### Google My Business (GMB) Map Pack Secrets Explained

When someone in Ikeja types "best print shop near me," Google doesn't display normal blogs. It shows a **Map Pack** containing the top 3 verified businesses. If your business isn't there, you are losing 70% of local traffic.

#### Top Ranking Factors for GMB In Nigeria:
1.  **Perfect Keyword Proximity Map**: Inject search phrases naturally in your services catalog. Do not stuff keywords in the business name (this risks account suspension).
2.  **Continuous Reviews Inflow**: Encourage past customers to write reviews. Create a QR code using Al-Salam's templates linking directly to your map feedback.
3.  **Active GMB Posts**: Google rewards active users. Post regular updates.

We offer full setup from just **₦45,000** once-off, or monthly retainer domination. Book a call using our calculator!`
  },
  {
    id: "blog-3",
    title: "Why Your Small Business Must Avoid Slow CSS Frameworks In 2026",
    category: "Web Trends",
    excerpt: "Slow load times destroy small business trust. Learn how Tailwind V4 and clean React architectures can triple your conversion rate.",
    readTime: "5 min read",
    date: "May 10, 2026",
    views: 654,
    content: `### Speed is King: Landing Pages in Nigeria

Nigeria features mobile internet connections that can vary in stability. If your website takes more than 3 seconds to load, searchers will hit the back button. 

#### The Architecture of High-Converting sites:
*   **Zero heavy JavaScript bloat**: Use native React components styled in utility-first Tailwind CSS.
*   **Pre-compressed assets**: Use next-gen WebP instead of heavy JPG files.
*   **No unrequested scripts/widgets**: Keep pixels focused strictly on lead capturing.

Get Al-Salam Sinner to analyze and rebuild your portal starting from **₦120,000**.`
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    question: "Do I need any special routing setup to use the leased Virtual Phone Numbers?",
    answer: "No, none at all. Our virtual lines feature automatic incoming SMS and call forwarding. You can easily configure SMS codes to forward directly to your active WhatsApp line or email inbox instantly.",
    category: "phone-numbers"
  },
  {
    question: "How long does a Ready Website Sales installation or custom setup take?",
    answer: "Pre-built premium websites are customized and deployed live on your registered domain in under 3 hours. Tailor-made web portals with advanced databases take between 4 to 7 business days max.",
    category: "web-sales"
  },
  {
    question: "Is Google My Business optimization safe? Can my map profile get suspended?",
    answer: "GMB optimization is 100% legal. We practice strictly certified white-hat local search techniques and bypass automated review filters to increase your search visibility safely without suspension triggers.",
    category: "gmb"
  },
  {
    question: "Is there a maximum limit for converting Airtime to Cash?",
    answer: "Yes, our automated merchant SIM gateways support custom bulk daily transfers. Single swaps can range safely from ₦1,000 to ₦250,000 per transaction slot with instant local bank deposits.",
    category: "airtime-to-cash"
  },
  {
    question: "How does the VTU Airtime Swapping exchange operate?",
    answer: "Securely and instantly. You transfer your Airtel, MTN, Glo, or 9mobile VTU or pin code through our automated gateway terminal, and Naira is instantly dispatched to your local Nigerian bank account in under 5 minutes.",
    category: "airtime-to-cash"
  }
];
