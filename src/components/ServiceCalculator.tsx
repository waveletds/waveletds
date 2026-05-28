import React, { useState, useEffect } from "react";
import { Calculator, Check, ArrowRight, ShieldCheck, ListPlus, Send, Sparkles } from "lucide-react";
import { SERVICES_DATA, ServicePackage } from "../types";
import { motion } from "motion/react";

interface ServiceCalculatorProps {
  onSuccessLead: (msg: string, invoiceId: string) => void;
}

export default function ServiceCalculator({ onSuccessLead }: ServiceCalculatorProps) {
  // Config selection categories
  const [webDevTier, setWebDevTier] = useState<string>("none");
  const [designTier, setDesignTier] = useState<string>("none");
  const [seoTier, setSeoTier] = useState<string>("none");
  const [gmbTier, setGmbTier] = useState<string>("none");
  const [aiTier, setAiTier] = useState<string>("none");

  // Additional options checkboxes
  const [fastTrack, setFastTrack] = useState<boolean>(false);
  const [monthlySupport, setMonthlySupport] = useState<boolean>(false);

  // Form states
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Totals calculations
  const [rawTotal, setRawTotal] = useState<number>(0);
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number>(0);

  // Service lookup function
  const findPrice = (pkgId: string): number => {
    const found = SERVICES_DATA.find(pkg => pkg.id === pkgId);
    return found ? found.priceValue : 0;
  };

  const findName = (pkgId: string): string => {
    const found = SERVICES_DATA.find(pkg => pkg.id === pkgId);
    return found ? found.name : "";
  };

  // Re-calculate pricing whenever values update
  useEffect(() => {
    let t = 0;
    
    // Add base package items
    if (webDevTier !== "none") t += findPrice(webDevTier);
    if (designTier !== "none") t += findPrice(designTier);
    if (seoTier !== "none") t += findPrice(seoTier);
    if (gmbTier !== "none") t += findPrice(gmbTier);
    if (aiTier !== "none") t += findPrice(aiTier);

    // Add checkboxes configuration values
    if (fastTrack) t += 50000; // 50k Naira
    if (monthlySupport) t += 30000; // 30k Naira

    // Calculate package combo discount (15% off if 3 or more services selected, or total > 300,000)
    let selectedCount = 0;
    if (webDevTier !== "none") selectedCount++;
    if (designTier !== "none") selectedCount++;
    if (seoTier !== "none") selectedCount++;
    if (gmbTier !== "none") selectedCount++;
    if (aiTier !== "none") selectedCount++;

    let discount = 0;
    if (selectedCount >= 3 || t >= 300000) {
      discount = Math.round(t * 0.15); // 15% Nigerian VIP Combo Discount
    }

    setRawTotal(t);
    setDiscountValue(discount);
    setFinalTotal(t - discount);
  }, [webDevTier, designTier, seoTier, gmbTier, aiTier, fastTrack, monthlySupport]);

  // Form trigger
  const handleSubmitPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || (!email && !phone)) {
      setSubmitError("Please provide your Name and at least one contact channel (Email or WhatsApp).");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    // Assemble dynamic packages listing string
    const activePackages: string[] = [];
    if (webDevTier !== "none") activePackages.push(findName(webDevTier));
    if (designTier !== "none") activePackages.push(findName(designTier));
    if (seoTier !== "none") activePackages.push(findName(seoTier));
    if (gmbTier !== "none") activePackages.push(findName(gmbTier));
    if (aiTier !== "none") activePackages.push(findName(aiTier));
    if (fastTrack) activePackages.push("Fast-Track Delivery Option (₦50,000)");
    if (monthlySupport) activePackages.push("Ongoing Quality Care SLA (₦30,000)");

    const compiledMessage = `
--- CLIENT CUSTOM INVOICE GENERATOR ---
[Active Tiers]: ${activePackages.join(" | ")}
[Original Estimate]: ₦${rawTotal.toLocaleString()}
[Interactive Combo Discount]: ₦${discountValue.toLocaleString()}
[Final Quoted Quote]: ₦${finalTotal.toLocaleString()}
[Client Request Note]: ${message || "No custom message provided."}
    `;

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: "Custom Calculated Lab Package",
          packageType: "Calculated Budget",
          customBudget: `₦${finalTotal.toLocaleString()}`,
          message: compiledMessage,
          source: "Service Calculator",
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "A networking error popped up.");
      }

      // Transition forward
      onSuccessLead(resData.message, resData.referenceId);
      
      // Clear form inputs
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please check again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="service-calculator-section" className="border-t border-purple-900/10 bg-[#06060c] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14" id="calculator-headers">
          <span className="inline-flex items-center space-x-1 border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300 rounded-md">
            <Calculator className="h-3.5 w-3.5" />
            <span>AI PROFIT LAB BUDGET CALCULATOR</span>
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white">
            Build Your Custom <span className="bg-gradient-to-r from-amber-300 to-purple-400 bg-clip-text text-transparent">Naira Package</span>
          </h2>
          <p className="mt-3.5 text-xs text-gray-400">
            Combine development hours, GMB maps packs, digital mentorship options, and support retainers to see your pricing updated instantenously with discounts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Config options selectors selector - 7 Cols */}
          <div className="lg:col-span-7 bg-[#0d0d14]/75 border border-purple-900/20 rounded-2xl p-6 space-y-7" id="calculator-controls">
            
            {/* 1. Custom Web Dev */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-200 block">1. Custom Web Architecture</label>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setWebDevTier("none")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    webDevTier === "none" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  None
                </button>
                <button
                  type="button"
                  onClick={() => setWebDevTier("web-1")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    webDevTier === "web-1" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  Portal (₦120k)
                </button>
                <button
                  type="button"
                  onClick={() => setWebDevTier("web-2")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    webDevTier === "web-2" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  Pro App (₦250k)
                </button>
                <button
                  type="button"
                  onClick={() => setWebDevTier("web-3")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    webDevTier === "web-3" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  Enterprise (₦450k)
                </button>
              </div>
            </div>

            {/* 2. Graphic Design */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-200 block">2. Graphic Design & Identity Visage</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDesignTier("none")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    designTier === "none" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  None
                </button>
                <button
                  type="button"
                  onClick={() => setDesignTier("design-1")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    designTier === "design-1" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  SVG Logo Pack (₦35k)
                </button>
                <button
                  type="button"
                  onClick={() => setDesignTier("design-2")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    designTier === "design-2" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  Brand Visuals (₦180k)
                </button>
              </div>
            </div>

            {/* 3. SEO Services */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-200 block">3. Organic SEO Target Tuning</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSeoTier("none")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    seoTier === "none" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  None
                </button>
                <button
                  type="button"
                  onClick={() => setSeoTier("seo-1")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    seoTier === "seo-1" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  SEO Kickstart (₦80k)
                </button>
                <button
                  type="button"
                  onClick={() => setSeoTier("seo-2")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    seoTier === "seo-2" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  Rank Retainer (₦250k)
                </button>
              </div>
            </div>

            {/* 4. GMB maps mapping */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-200 block">4. Google My Business Maps Positioning</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setGmbTier("none")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    gmbTier === "none" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  None
                </button>
                <button
                  type="button"
                  onClick={() => setGmbTier("gmb-1")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    gmbTier === "gmb-1" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  Map Setup (₦45k)
                </button>
                <button
                  type="button"
                  onClick={() => setGmbTier("gmb-2")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    gmbTier === "gmb-2" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  Maps Dominator (₦120k)
                </button>
              </div>
            </div>

            {/* 5. AI Education Course */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-200 block">5. AI Money Mastery & Direct Mentorship</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setAiTier("none")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    aiTier === "none" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  None
                </button>
                <button
                  type="button"
                  onClick={() => setAiTier("ai-money-1")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    aiTier === "ai-money-1" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  Essentials Cohort (₦45k)
                </button>
                <button
                  type="button"
                  onClick={() => setAiTier("ai-money-2")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all ${
                    aiTier === "ai-money-2" ? "bg-purple-950/40 border-purple-500 text-purple-300" : "bg-[#08080d] border-purple-900/10 text-gray-400"
                  }`}
                >
                  VIP Group Coaching (₦150k)
                </button>
              </div>
            </div>

            {/* Extra Options Chekboxes */}
            <div className="pt-4 border-t border-purple-950/60 space-y-3">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-widest block">Add-On SLA Features</label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center space-x-3 text-xs text-gray-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={fastTrack}
                    onChange={(e) => setFastTrack(e.target.checked)}
                    className="h-4 w-4 rounded border-purple-900 text-purple-600 focus:ring-purple-900 cursor-pointer bg-black/60 focus:bg-[#07070a]"
                  />
                  <span><strong>Fast-Track Timeline Delivery</strong> (Deliver websites in under 3 business days) - <strong>+₦50,000</strong></span>
                </label>

                <label className="flex items-center space-x-3 text-xs text-gray-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={monthlySupport}
                    onChange={(e) => setMonthlySupport(e.target.checked)}
                    className="h-4 w-4 rounded border-purple-900 text-purple-600 focus:ring-purple-900 cursor-pointer bg-black/60 focus:bg-[#07070a]"
                  />
                  <span><strong>Dedicated Ongoing Site Care</strong> (Security auditing, daily backups, speed maintenance) - <strong>+₦30,000 / month</strong></span>
                </label>
              </div>
            </div>

          </div>

          {/* Checkout & Quote Card - 5 Cols */}
          <div className="lg:col-span-5 space-y-6" id="calculator-sidebar">
            <div className="rounded-2xl border border-purple-950 bg-[#0e0e16]/85 p-6 shadow-2xl relative">
              <div className="absolute top-0 right-0 h-24 w-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none"></div>
              
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <ListPlus className="h-5 w-5 text-amber-400" />
                <span>Your Core Invoice Draft</span>
              </h3>

              {/* Dynamic cost listing details */}
              <div className="mt-5 space-y-3.5 border-b border-purple-950 pb-5 text-xs text-gray-300">
                {webDevTier !== "none" && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Web Dev: {findName(webDevTier)}</span>
                    <span className="font-mono text-white">₦{findPrice(webDevTier).toLocaleString()}</span>
                  </div>
                )}
                {designTier !== "none" && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Branding: {findName(designTier)}</span>
                    <span className="font-mono text-white">₦{findPrice(designTier).toLocaleString()}</span>
                  </div>
                )}
                {seoTier !== "none" && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">SEO Strategy: {findName(seoTier)}</span>
                    <span className="font-mono text-white">₦{findPrice(seoTier).toLocaleString()}</span>
                  </div>
                )}
                {gmbTier !== "none" && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">GMB Maps Setup: {findName(gmbTier)}</span>
                    <span className="font-mono text-white">₦{findPrice(gmbTier).toLocaleString()}</span>
                  </div>
                )}
                {aiTier !== "none" && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">AI Mentorship: {findName(aiTier)}</span>
                    <span className="font-mono text-white">₦{findPrice(aiTier).toLocaleString()}</span>
                  </div>
                )}
                {fastTrack && (
                  <div className="flex justify-between text-purple-400">
                    <span>TIMELINE: Fast-Track (3-day target)</span>
                    <span className="font-mono text-white">₦50,000</span>
                  </div>
                )}
                {monthlySupport && (
                  <div className="flex justify-between text-purple-400">
                    <span>SECURITY: Quality Site Care Retention</span>
                    <span className="font-mono text-white">₦30,000</span>
                  </div>
                )}

                {/* If nothing selected */}
                {webDevTier === "none" && designTier === "none" && seoTier === "none" && gmbTier === "none" && aiTier === "none" && !fastTrack && !monthlySupport && (
                  <p className="text-sm text-center text-gray-500 py-6 italic">No products added yet. Select options on the left to activate computation.</p>
                )}
              </div>

              {/* Subtotal & Combo Discount Alerts */}
              <div className="pt-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Gross Subtotal:</span>
                  <span className="font-mono text-white">₦{rawTotal.toLocaleString()}</span>
                </div>
                {discountValue > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/25">
                    <span className="flex items-center space-x-1">
                      <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-400" />
                      <span>15% VIP Combo Discount Applied!</span>
                    </span>
                    <span className="font-mono">-₦{discountValue.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex items-baseline justify-between pt-3 border-t border-purple-950">
                  <span className="text-sm font-bold text-white">Final Estimated Quote:</span>
                  <span className="text-2xl font-extrabold text-amber-400 font-mono">₦{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Quick checkout lead capture form */}
            <form onSubmit={handleSubmitPackage} className="rounded-2xl border border-purple-950/40 bg-[#0a0a0e]/95 p-6 space-y-4 shadow-xl" id="calculator-lead-form">
              <h4 className="text-sm font-bold text-gray-200 uppercase tracking-widest pl-1 border-l-2 border-purple-500">Secure Your Quote & Book Now</h4>
              
              <div className="space-y-1">
                <label className="text-[11px] text-gray-400 uppercase tracking-wider block">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Al-Salam Sinner Client"
                  className="w-full rounded-xl border border-purple-900/30 bg-[#0d0d14] px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] text-gray-400 uppercase tracking-wider block">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-purple-900/30 bg-[#0d0d14] px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-gray-400 uppercase tracking-wider block">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., +234 80 1234 5678"
                    className="w-full rounded-xl border border-purple-900/30 bg-[#0d0d14] px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-gray-400 uppercase tracking-wider block">Custom Project Brief Description</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Need customized database features? Share your design references here..."
                  rows={2.5}
                  className="w-full rounded-xl border border-purple-900/30 bg-[#0d0d14] px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:border-purple-500 focus:outline-none resize-none"
                />
              </div>

              {submitError && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-2.5 text-xs text-red-400 text-center">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                id="submit-custom-quote-btn"
                disabled={isSubmitting || finalTotal === 0}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-purple-900/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <span>Booking Your Slots...</span>
                ) : (
                  <>
                    <span>Submit & Claim This Quote</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-500">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>SSL encrypted lead capture channel</span>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
