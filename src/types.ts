export type ServiceCategory = "ai-mastery" | "web-dev" | "graphic-design" | "seo" | "gmb" | "ai-consulting" | "combo";

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
    id: "ai-money-1",
    category: "ai-mastery",
    name: "AI Money Making Mastery (Essentials)",
    priceValue: 45000,
    priceLabel: "₦45,000",
    shortDesc: "Complete starter course & mentorship on making money online with AI tools.",
    description: "Launch your side-hustle. Master high-demand prompt engineering, content brokerage, AI-supported freelancing (Fiverr/Upwork), and basic workflow automations.",
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
    description: "Go full-time with AI. Work directly with Al-Salam Sinner to craft customized AI templates for your business, deploy automation bots, and scale high-value service arbitrage.",
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
    description: "Fast, fully responsive React/Tailwind site designed for visual persuasion. Optimized with contact channels and WhatsApp buttons to maximize conversions.",
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
    description: "Your business at a premium level. Complete custom database forms, interactive components, client booking software, and advanced visuals.",
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
    description: "Enterprise grade. High-fidelity layouts, complex catalogs, safe online checkout flow, custom staff portals, and integrated AI assistant chat capabilities.",
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
    description: "Establish instant authority. Includes conceptual sketches, polished final logo files (SVG/PNG/PDF), and custom hex color style guidelines for your designers.",
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
    description: "A complete aesthetic refresh. Make sure your business looks like an industry leader online and offline. Hand-coded and standard graphic standards combined.",
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
    description: "Get discovered by buyers near you. We perform deep competitor analysis, local keyword setup, metadata overhaul, and set up Google search alerts.",
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
    description: "Dominate search pages organically. We generate target landing pages, research authoritative backlink channels, write weekly blog copy, and keep code lightning fast.",
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
    description: "Show up instantly on Google Maps when clients look for web services, designers, or your shop nearby. Includes verification coaching and review templates.",
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
    description: "Maintain #1 map status. Weekly optimized posts, photo uploads, real-time review styling replies, and spam reviews protection monitoring.",
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
    description: "Launch your business in Nigeria with total authority. We build a gorgeous website, set up your GMB profile, rank you locally, and tie everything to high-converting WhatsApp links.",
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
    priceValue: 650000,
    priceLabel: "₦650,000",
    shortDesc: "Pro Web Application + Full Visual Branding pack + GMB + 1 Month Pro SEO.",
    description: "The complete package for high-growth businesses. We construct your website, establish your professional social visuals, claim GMB map packs, and execute pro SEO to bring inbound clients.",
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
    question: "Do I need technical skills to join 'AI Money Making Mastery'?",
    answer: "Absolutely not! This mentorship is styled for beginners. We start from basic AI tool usage, prompt templates, and how to find clients. Basic computer literacy is all you need.",
    category: "ai-mastery"
  },
  {
    question: "How long does a Custom Website Development take?",
    answer: "A Basic Business Portal takes between 5-7 days. Pro Custom applications take about 14 days, and major Enterprise-level portals take 21-30 days to build, test, and host.",
    category: "web-dev"
  },
  {
    question: "Is GMB optimization safe? Can my profile get suspended?",
    answer: "GMB optimization is 100% legal. However, Google is strict about address verification and keyword stuffing. We practice safe white-hat tactics to ensure your map ranking is permanent without trigger warnings.",
    category: "gmb"
  },
  {
    question: "Can I pay in installments?",
    answer: "Yes! For major design, web development, and combo retainers over ₦200,000, we support a 50% deposit and 50% on project completion. Mentorship courses are paid in full upfront to secure resources and active coaching.",
    category: "general"
  },
  {
    question: "Do you integrate local payment processors like Flutterwave or Paystack?",
    answer: "Yes, we are custom web developer experts. We can integrate secure local payments solutions (Flutterwave, Paystack) or global processors (Stripe, PayPal) seamlessly based on your goals.",
    category: "web-dev"
  }
];
