import React, { useState, useEffect } from "react";
import { Sparkles, X, Gift, Send, ShieldAlert, DownloadCloud } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Check if user has already seen or submitted during current session
    const shown = sessionStorage.getItem("ai_lab_lead_shown");
    if (!shown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("ai_lab_lead_shown", "true");
      }, 7000); // Popup after 7 seconds of browsing
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setErrorMsg("Please fill in both name and email options.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          service: "Free AI Side-Hustle Toolkit Guide",
          packageType: "Lead Magnet Download",
          message: "User subscribed to newsletter and downloaded Al-Salam's PDF kit.",
          source: "Entry Lead Magnet Popup",
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "Failed to submit lead data.");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please check your network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="lead-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            id="lead-modal-content"
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white p-6.5 shadow-2xl relative"
          >
            {/* Close absolute */}
            <button
              id="close-lead-modal-btn"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 rounded-lg bg-slate-100 p-1.5 text-slate-500 hover:text-slate-950 transition-colors cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            {/* Main Visual content */}
            {!submitted ? (
              <div id="lead-form-overlay">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 border border-orange-200 text-orange-600 mb-5 relative">
                  <Gift className="h-6 w-6 text-orange-600 animate-pulse" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </div>

                <h3 className="text-lg font-black text-slate-950 leading-snug">
                  Claim Al-Salam's Free <br />
                  <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">AI Automation Toolkit (PDF)</span>
                </h3>
                
                <p className="mt-2.5 text-xs text-slate-500 leading-relaxed">
                  Join our elite cohort newsletter! Grab the copy-paste prompt templates making freelancers ₦200,000+ monthly in Nigeria.
                </p>

                <form onSubmit={handleLeadSubmit} className="mt-5 space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">First Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Al-Salam student"
                      className="w-full text-xs rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-slate-950 placeholder-slate-450 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Your Best Email address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full text-xs rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 text-slate-955 placeholder-slate-455 focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-[11px] text-red-600 text-center bg-red-50 py-1.5 rounded">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    id="submit-lead-modal-btn"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2 rounded-xl bg-orange-600 py-3.5 text-xs font-bold text-white shadow-lg cursor-pointer hover:bg-orange-700 hover:scale-[1.01] transition-all disabled:opacity-50"
                  >
                    <span>Download Instant Guide</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>

                  <div className="flex items-center justify-center space-x-1.5 text-[9px] text-slate-400">
                    <ShieldAlert className="h-3 w-3 text-orange-600" />
                    <span>Free of spam, unsubscribe easily at anytime.</span>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6" id="lead-success-overlay">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 mb-5 text-center">
                  <DownloadCloud className="h-7 w-7 animate-bounce" />
                </div>
                
                <h3 className="text-lg font-black text-slate-950 leading-snug">Blueprint Dispatching!</h3>
                <p className="mt-2.5 text-xs text-slate-650 px-2 leading-relaxed">
                  Welcome to Wavelet Digital Solutions! An email carrying the direct PDF download link of **Al-Salam Sinner's AI Side-Hustle Toolkit** with copyable prompt templates has been dispatched!
                </p>

                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-6 inline-flex items-center justify-center rounded-xl bg-orange-50 border border-orange-200 px-6 py-2.5 text-xs font-bold text-orange-700 hover:text-orange-850 hover:bg-orange-100 transition-all cursor-pointer"
                >
                  Enter Site
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
