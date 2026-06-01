import React, { useState, useEffect } from "react";
import { Calculator, Check, ArrowRight, ShieldCheck, ListPlus, Send, Sparkles } from "lucide-react";
import { SERVICES_DATA, ServicePackage } from "../types";
import { motion } from "motion/react";

interface ServiceCalculatorProps {
  onSuccessLead: (msg: string, invoiceId: string) => void;
}

export default function ServiceCalculator({ onSuccessLead }: ServiceCalculatorProps) {
  // Config selection categories
  const [phoneTier, setPhoneTier] = useState<string>("none");
  const [otpTier, setOtpTier] = useState<string>("none");
  const [webTier, setWebTier] = useState<string>("none");
  const [socialTier, setSocialTier] = useState<string>("none");
  const [airtimeTier, setAirtimeTier] = useState<string>("none");
  const [gmbTier, setGmbTier] = useState<string>("none");

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
    if (phoneTier !== "none") t += findPrice(phoneTier);
    if (otpTier !== "none") t += findPrice(otpTier);
    if (webTier !== "none") t += findPrice(webTier);
    if (socialTier !== "none") t += findPrice(socialTier);
    if (airtimeTier !== "none") t += findPrice(airtimeTier);
    if (gmbTier !== "none") t += findPrice(gmbTier);

    // Add checkboxes configuration values
    if (fastTrack) t += 20000; 
    if (monthlySupport) t += 15000; 

    // Calculate package combo discount (15% off if 3 or more services selected, or total > 150,000)
    let selectedCount = 0;
    if (phoneTier !== "none") selectedCount++;
    if (otpTier !== "none") selectedCount++;
    if (webTier !== "none") selectedCount++;
    if (socialTier !== "none") selectedCount++;
    if (airtimeTier !== "none") selectedCount++;
    if (gmbTier !== "none") selectedCount++;

    let discount = 0;
    if (selectedCount >= 3 || t >= 150000) {
      discount = Math.round(t * 0.15); // 15% VIP Combo Discount
    }

    setRawTotal(t);
    setDiscountValue(discount);
    setFinalTotal(t - discount);
  }, [phoneTier, otpTier, webTier, socialTier, airtimeTier, gmbTier, fastTrack, monthlySupport]);

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
    if (phoneTier !== "none") activePackages.push(findName(phoneTier));
    if (otpTier !== "none") activePackages.push(findName(otpTier));
    if (webTier !== "none") activePackages.push(findName(webTier));
    if (socialTier !== "none") activePackages.push(findName(socialTier));
    if (airtimeTier !== "none") activePackages.push(findName(airtimeTier));
    if (gmbTier !== "none") activePackages.push(findName(gmbTier));
    if (fastTrack) activePackages.push("Fast-Track Delivery Option (₦20,000)");
    if (monthlySupport) activePackages.push("Ongoing Quality Care SLA (₦15,000)");

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
    <section id="service-calculator-section" className="border-t border-gray-200 bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14" id="calculator-headers">
          <span className="inline-flex items-center space-x-1 border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 rounded-md">
            <Calculator className="h-3.5 w-3.5 text-orange-600" />
            <span>AI PROFIT LAB BUDGET CALCULATOR</span>
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-950 font-display">
            Build Your Custom <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Naira Package</span>
          </h2>
          <p className="mt-3.5 text-xs text-slate-550 max-w-lg mx-auto leading-relaxed">
            Combine development hours, GMB maps packs, digital mentorship options, and support retainers to see your pricing updated instantenously with discounts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">          {/* Config options selectors selector - 7 Cols */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 space-y-7 shadow-sm" id="calculator-controls">
            
            {/* 1. Custom Website Sales */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-900 block font-sans">1. Custom Website Sales & Projects</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setWebTier("none")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all cursor-pointer ${
                    webTier === "none" ? "bg-orange-600 border-orange-600 text-white shadow-inner" : "bg-slate-50 border-gray-200 text-slate-600 lg:hover:bg-slate-100 lg:hover:text-slate-950"
                  }`}
                >
                  None
                </button>
                <button
                  type="button"
                  onClick={() => setWebTier("web-sale-1")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all cursor-pointer ${
                    webTier === "web-sale-1" ? "bg-orange-600 border-orange-600 text-white shadow-inner" : "bg-slate-50 border-gray-200 text-slate-600 lg:hover:bg-slate-100 lg:hover:text-slate-955"
                  }`}
                >
                  Premium Responsive Website (₦120k)
                </button>
              </div>
            </div>

            {/* 2. Google My Business Maps Positioning */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-900 block font-sans">2. Google My Business Maps Positioning</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGmbTier("none")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all cursor-pointer ${
                    gmbTier === "none" ? "bg-orange-600 border-orange-600 text-white shadow-inner" : "bg-slate-50 border-gray-200 text-slate-600 lg:hover:bg-slate-100 lg:hover:text-slate-950"
                  }`}
                >
                  None
                </button>
                <button
                  type="button"
                  onClick={() => setGmbTier("gmb-service-1")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all cursor-pointer ${
                    gmbTier === "gmb-service-1" ? "bg-orange-600 border-orange-600 text-white shadow-inner" : "bg-slate-50 border-gray-200 text-slate-605 lg:hover:bg-slate-100 lg:hover:text-slate-955"
                  }`}
                >
                  GMB Setup & Rank Promotion (₦45k)
                </button>
              </div>
            </div>

            {/* 3. Virtual Phone Numbers Lease */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-900 block font-sans">3. Virtual Phone Numbers (All Kinds)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPhoneTier("none")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all cursor-pointer ${
                    phoneTier === "none" ? "bg-orange-600 border-orange-600 text-white shadow-inner" : "bg-slate-50 border-gray-200 text-slate-600 lg:hover:bg-slate-100 lg:hover:text-slate-950"
                  }`}
                >
                  None
                </button>
                <button
                  type="button"
                  onClick={() => setPhoneTier("phone-num-1")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all cursor-pointer ${
                    phoneTier === "phone-num-1" ? "bg-orange-600 border-orange-600 text-white shadow-inner" : "bg-slate-50 border-gray-200 text-slate-605 lg:hover:bg-slate-100 lg:hover:text-slate-955"
                  }`}
                >
                  Global Virtual Number Lease (₦12k/mo)
                </button>
              </div>
            </div>

            {/* 4. SMS OTP Verification Streams */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-900 block font-sans">4. SMS OTP Bypass & SIM Verification</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOtpTier("none")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all cursor-pointer ${
                    otpTier === "none" ? "bg-orange-600 border-orange-600 text-white shadow-inner" : "bg-slate-50 border-gray-200 text-slate-650 lg:hover:bg-slate-100 lg:hover:text-slate-955"
                  }`}
                >
                  None
                </button>
                <button
                  type="button"
                  onClick={() => setOtpTier("otp-service-1")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all cursor-pointer ${
                    otpTier === "otp-service-1" ? "bg-orange-600 border-orange-600 text-white shadow-inner" : "bg-slate-50 border-gray-200 text-slate-650 lg:hover:bg-slate-100 lg:hover:text-slate-955"
                  }`}
                >
                  SIM SMS Verification Code (₦1.5k/code)
                </button>
              </div>
            </div>

            {/* 5. Aged Organic Social Accounts */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-900 block font-sans">5. Aged Organic Social Accounts Store</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSocialTier("none")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all cursor-pointer ${
                    socialTier === "none" ? "bg-orange-600 border-orange-600 text-white shadow-inner" : "bg-slate-50 border-gray-200 text-slate-600 lg:hover:bg-slate-100 lg:hover:text-slate-950 font-sans"
                  }`}
                >
                  None
                </button>
                <button
                  type="button"
                  onClick={() => setSocialTier("social-acc-1")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all cursor-pointer ${
                    socialTier === "social-acc-1" ? "bg-orange-600 border-orange-600 text-white shadow-inner" : "bg-slate-50 border-gray-200 text-slate-605 lg:hover:bg-slate-100 lg:hover:text-slate-955"
                  }`}
                >
                  Aged High-Engagement Account (₦25k)
                </button>
              </div>
            </div>

            {/* 6. Naira Airtime Cash swapping */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-900 block font-sans">6. Naira Airtime to Cash Exchange Swapping</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAirtimeTier("none")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all cursor-pointer ${
                    airtimeTier === "none" ? "bg-orange-600 border-orange-600 text-white shadow-inner" : "bg-slate-50 border-gray-200 text-slate-600 lg:hover:bg-slate-100 lg:hover:text-slate-950 font-sans"
                  }`}
                >
                  None
                </button>
                <button
                  type="button"
                  onClick={() => setAirtimeTier("airtime-cash-1")}
                  className={`border rounded-xl p-3 text-xs font-semibold text-center transition-all cursor-pointer ${
                    airtimeTier === "airtime-cash-1" ? "bg-orange-600 border-orange-600 text-white shadow-inner" : "bg-slate-50 border-gray-200 text-slate-605 lg:hover:bg-slate-100 lg:hover:text-slate-955"
                  }`}
                >
                  Swap Airtel/MTN Airtime VTU (₦1k min swapping rate)
                </button>
              </div>
            </div>

            {/* Extra Options Chekboxes */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <label className="text-xs font-bold text-slate-705 uppercase tracking-widest block font-sans">Add-On SLA Features</label>
              <div className="flex flex-col gap-3">
                <label className="flex items-center space-x-3 text-xs text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={fastTrack}
                    onChange={(e) => setFastTrack(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer bg-slate-50"
                  />
                  <span><strong>Priority Rapid Setup</strong> (Process credentials & accounts in under 1 hour) - <strong>+₦20,000</strong></span>
                </label>

                <label className="flex items-center space-x-3 text-xs text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={monthlySupport}
                    onChange={(e) => setMonthlySupport(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 cursor-pointer bg-slate-50"
                  />
                  <span><strong>Replacement Guard Insurance</strong> (Premium continuous replacements for leased profiles/OTP SIM blocks) - <strong>+₦15,000</strong></span>
                </label>
              </div>
            </div>

          </div>

          {/* Checkout & Quote Card - 5 Cols */}
          <div className="lg:col-span-5 space-y-6" id="calculator-sidebar">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm relative">
              <div className="absolute top-0 right-0 h-24 w-24 bg-orange-100/10 rounded-full blur-xl pointer-events-none"></div>
              
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <ListPlus className="h-5 w-5 text-orange-600" />
                <span>Your Core Invoice Draft</span>
              </h3>

              {/* Dynamic cost listing details */}
              <div className="mt-5 space-y-3.5 border-b border-gray-200 pb-5 text-xs text-slate-650">
                {webTier !== "none" && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Website Sale: {findName(webTier)}</span>
                    <span className="font-mono text-slate-950 font-bold">₦{findPrice(webTier).toLocaleString()}</span>
                  </div>
                )}
                {gmbTier !== "none" && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Maps SEO: {findName(gmbTier)}</span>
                    <span className="font-mono text-slate-950 font-bold">₦{findPrice(gmbTier).toLocaleString()}</span>
                  </div>
                )}
                {phoneTier !== "none" && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone Lease: {findName(phoneTier)}</span>
                    <span className="font-mono text-slate-950 font-bold">₦{findPrice(phoneTier).toLocaleString()}</span>
                  </div>
                )}
                {otpTier !== "none" && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">OTP Bypass SIM: {findName(otpTier)}</span>
                    <span className="font-mono text-slate-950 font-bold">₦{findPrice(otpTier).toLocaleString()}</span>
                  </div>
                )}
                {socialTier !== "none" && (
                  <div className="flex justify-between">
                    <span className="text-slate-550">Aged Social Acc: {findName(socialTier)}</span>
                    <span className="font-mono text-slate-950 font-bold">₦{findPrice(socialTier).toLocaleString()}</span>
                  </div>
                )}
                {airtimeTier !== "none" && (
                  <div className="flex justify-between">
                    <span className="text-slate-550">VTU Airtime Convert: {findName(airtimeTier)}</span>
                    <span className="font-mono text-slate-950 font-bold">₦{findPrice(airtimeTier).toLocaleString()}</span>
                  </div>
                )}
                {fastTrack && (
                  <div className="flex justify-between text-orange-600 font-semibold">
                    <span>TIMELINE: Priority Rapid Setup</span>
                    <span className="font-mono text-slate-950 font-bold">₦20,000</span>
                  </div>
                )}
                {monthlySupport && (
                  <div className="flex justify-between text-orange-600 font-semibold">
                    <span>PROTECTION: Replacement Guard Insurance</span>
                    <span className="font-mono text-slate-950 font-bold">₦15,000</span>
                  </div>
                )}

                {/* If nothing selected */}
                {webTier === "none" && gmbTier === "none" && phoneTier === "none" && otpTier === "none" && socialTier === "none" && airtimeTier === "none" && !fastTrack && !monthlySupport && (
                  <p className="text-sm text-center text-slate-400 py-6 italic">No products added yet. Select options on the left to activate computation.</p>
                )}
              </div>

              {/* Subtotal & Combo Discount Alerts */}
              <div className="pt-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Gross Subtotal:</span>
                  <span className="font-mono text-slate-950 font-bold">₦{rawTotal.toLocaleString()}</span>
                </div>
                {discountValue > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-150">
                    <span className="flex items-center space-x-1">
                      <Sparkles className="h-3.5 w-3.5 animate-pulse text-orange-500" />
                      <span>15% VIP Combo Discount Applied!</span>
                    </span>
                    <span className="font-mono">-₦{discountValue.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex items-baseline justify-between pt-3 border-t border-gray-200">
                  <span className="text-sm font-bold text-slate-900">Final Estimated Quote:</span>
                  <span className="text-2xl font-extrabold text-orange-600 font-mono">₦{finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Quick checkout lead capture form */}
            <form onSubmit={handleSubmitPackage} className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4 shadow-sm" id="calculator-lead-form">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest pl-1.5 border-l-2 border-orange-600">Secure Your Quote & Book Now</h4>
              
              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Al-Salam Sinner Client"
                  className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-950 placeholder-slate-400 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-950 placeholder-slate-400 focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., +234 80 1234 5678"
                    className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-950 placeholder-slate-400 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">Custom Project Brief Description</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Need customized database features? Share your design references here..."
                  rows={2.5}
                  className="w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-950 placeholder-slate-400 focus:border-orange-500 focus:outline-none resize-none"
                />
              </div>

              {submitError && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-2.5 text-xs text-red-600 text-center">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                id="submit-custom-quote-btn"
                disabled={isSubmitting || finalTotal === 0}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-orange-600 py-3.5 text-xs font-bold text-white shadow-md shadow-orange-100 hover:bg-orange-700 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
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

              <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400">
                <ShieldCheck className="h-4 w-4 text-orange-600 shrink-0" />
                <span>SSL encrypted lead capture channel</span>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
