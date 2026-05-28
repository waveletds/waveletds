import { useState } from "react";
import { Check, ArrowRight, Shield, Clock, HelpCircle } from "lucide-react";
import { SERVICES_DATA, ServiceCategory, ServicePackage } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ServicesProps {
  onSelectPackage: (pkg: ServicePackage) => void;
  setActiveView: (view: string) => void;
}

export default function Services({ onSelectPackage, setActiveView }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | ServiceCategory>("all");
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  const categories: { id: "all" | ServiceCategory; label: string }[] = [
    { id: "all", label: "All Services" },
    { id: "ai-mastery", label: "AI Money Making Mastery" },
    { id: "web-dev", label: "Custom Web Dev" },
    { id: "graphic-design", label: "Graphic Design" },
    { id: "seo", label: "SEO Optimization" },
    { id: "gmb", label: "Google My Business" },
    { id: "combo", label: "Combo Packs" },
  ];

  const filteredServices = activeCategory === "all"
    ? SERVICES_DATA
    : SERVICES_DATA.filter(pkg => pkg.category === activeCategory);

  const faqs = [
    {
      q: "What makes your style different from standard Nigerian agencies?",
      a: "No fluff, no delays. As an individual builder who teaches AI, I leverage high-speed AI tools to research and develop your web architecture, design assets, and local GMB mappings. You get premium global quality in half the time and at a fraction of standard budget scopes."
    },
    {
      q: "Can I bundle more than one service?",
      a: "Yes! Bundling is highly recommended. Our 'Ultimate Combo Packs' combine Custom Web Development with Map Optimization & Local SEO, saving you up to ₦175,000 immediately."
    },
    {
      q: "How does the 'AI Money Making Mastery' course work?",
      a: "Once enrolled, you join a close cohort. Al-Salam teaches you practical recipes to trade AI output for real income (copywriting, design, basic web portals). It's focused entirely on results, not theoretical jargon."
    },
    {
      q: "Can I pay in local Nigerian channels (Naira transfer)?",
      a: "Yes! We accept simple local bank transfers, or card payments via Flutterwave / Paystack. For projects over ₦200k, we accept a 50% deposit and 50% balance upon final staging."
    }
  ];

  return (
    <section id="services-page" className="bg-[#09090d] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page title header */}
        <div id="services-headline" className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center space-x-1 border border-purple-500/20 bg-purple-950/20 px-3 py-1 text-xs font-semibold text-purple-300 rounded-md">
            <Shield className="h-3 w-3 text-amber-400" />
            <span>Premium Transparent Pricing (No Hidden Fees)</span>
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Select the Perfect Solution for{" "}
            <span className="bg-gradient-to-r from-purple-400 to-amber-300 bg-clip-text text-transparent">Your Budget</span>
          </h2>
          <p className="mt-4 text-sm text-gray-400">
            From complete high-ticket business platforms to premium visual identity packs, pick a package or build your own customized retainer below!
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div id="services-categories" className="mt-12 flex flex-wrap items-center justify-center gap-2 border-b border-purple-900/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-lg px-4 py-2.5 text-xs md:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/20"
                  : "bg-[#0f0f16]/60 text-gray-400 hover:text-white hover:bg-[#12121e]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Showcase Cards Grid */}
        <div id="services-grid" className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className={`relative flex flex-col justify-between rounded-2xl border bg-[#0d0d14]/70 p-6.5 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:bg-[#12121b]/80 group ${
                  pkg.tag 
                    ? "border-amber-400/35 shadow-amber-950/5 ring-1 ring-amber-400/20" 
                    : "border-purple-900/25"
                }`}
              >
                {/* Banner tag for Highlighted packages */}
                {pkg.tag && (
                  <span className="absolute -top-3 right-5 inline-flex items-center space-x-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-1 text-[11px] font-bold text-black uppercase tracking-wide">
                    <span>{pkg.tag}</span>
                  </span>
                )}

                <div>
                  {/* Category Identifier */}
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7]">
                    {pkg.category.replace("-", " ")}
                  </span>
                  
                  {/* Title & Price */}
                  <h3 className="mt-2 text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {pkg.name}
                  </h3>
                  <div className="mt-3.5 flex items-baseline">
                    <span className="text-3xl font-extrabold text-white font-mono">{pkg.priceLabel}</span>
                  </div>
                  
                  <p className="mt-3.5 text-xs text-gray-400 leading-relaxed min-h-[50px]">
                    {pkg.shortDesc}
                  </p>

                  <div className="mt-5 border-t border-purple-950/60 pt-5">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">WHAT IS DELIVERED:</h4>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2.5">
                          <Check className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />
                          <span className="text-xs text-gray-300 leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-purple-950/60 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5 text-purple-400" />
                      <span>{pkg.duration}</span>
                    </span>
                    <span>No surprise costs</span>
                  </div>
                  
                  <button
                    id={`buy-pkg-${pkg.id}`}
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full flex items-center justify-center space-x-2 rounded-xl py-3 text-xs font-bold transition-all ${
                      pkg.tag
                        ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:brightness-110"
                        : "bg-purple-950/80 border border-purple-500/20 text-white hover:bg-purple-900/60"
                    }`}
                  >
                    <span>Rent / Start Service</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Service Calculator Prompt Callout */}
        <div id="calculator-slug" className="mt-20 rounded-2xl border border-purple-500/10 bg-gradient-to-tr from-purple-950/20 via-[#0d0d15] to-[#040407] p-8 md:p-12 text-center relative overflow-hidden">
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-purple-500/5 blur-2xl"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white">Need a Specialized Combo or Monthly Retainer?</h3>
            <p className="mt-3 text-sm text-gray-400">
              Calculate exact contract pricing in Nigeria instantly. Toggle different development cycles, GMB packs, logo vectors, and SEO terms to compile a bespoke quote.
            </p>
            <button
              id="goto-calculator-btn"
              onClick={() => {
                const calcEl = document.getElementById("service-calculator-section");
                if (calcEl) {
                  calcEl.scrollIntoView({ behavior: "smooth" });
                } else {
                  // Fallback: active tab switcher handled parentally
                  setActiveView("services");
                  setTimeout(() => {
                    const el = document.getElementById("service-calculator-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 200);
                }
              }}
              className="mt-6 inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-950/20 transition-all hover:scale-[1.02]"
            >
              <span>Launch Interactive Service Calculator</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Pricing FAQs Section */}
        <div id="services-faq" className="mt-20 md:mt-28">
          <div className="text-center mb-12">
            <h3 className="text-sm font-semibold text-amber-300 tracking-wider uppercase">PRICING & WORKFLOW CLEARANCE</h3>
            <h2 className="mt-2 text-2xl font-bold text-white">Frequently Answered Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="rounded-xl border border-purple-900/15 bg-[#0a0a0e]/40 p-5.5 cursor-pointer hover:border-purple-600/20 transition-colors"
                onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <h4 className="text-sm font-bold text-gray-200">{faq.q}</h4>
                  </div>
                </div>
                <div className={`mt-3 text-xs text-gray-400 leading-relaxed pl-8 transition-all overflow-hidden ${
                  selectedFaq === index ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
