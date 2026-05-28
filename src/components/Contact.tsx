import React, { useState } from "react";
import { Mail, Phone, Calendar, Send, ShieldCheck, MessageSquare, ClipboardCheck, Clock } from "lucide-react";

interface ContactProps {
  onSuccessLead: (msg: string, invoiceId: string) => void;
}

export default function Contact({ onSuccessLead }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("ai-mastery");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || (!email && !phone)) {
      setFormError("Please fill in your Name and at least one contact channel (Email or Phone).");
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          packageType: "Standard Direct Contact",
          message,
          source: "Direct Contact Form Overlay",
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "A networking error popped up.");
      }

      onSuccessLead(resData.message, resData.referenceId);

      // Reset
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      setFormError(err.message || "Failed to submit. Please try checking your connections.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-page" className="bg-[#09090d] py-16 md:py-24 border-t border-purple-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Details */}
        <div id="contact-header" className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-purple-950/25 border border-purple-500/20 px-3 py-1.5 text-xs font-bold text-purple-300">
            <MessageSquare className="h-4 w-4 text-purple-300" />
            <span>LET'S ENGAGE ON CORRELATION</span>
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Book a Strategy <span className="bg-gradient-to-r from-purple-400 to-amber-300 bg-clip-text text-transparent">Naira Session</span>
          </h2>
          <p className="mt-3.5 text-xs text-gray-400">
            Tell me about your product or business. Secure your spots. Receive tailored implementation feedback from Nigeria's topmost AI developer within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Informatives Left Column - 5 Cols */}
          <div className="lg:col-span-5 bg-[#0e0e16]/65 border border-purple-900/15 rounded-2xl p-6 md:p-8 flex flex-col justify-between" id="contact-info">
            <div>
              <h3 className="text-lg font-bold text-white mb-5">Connect Directly</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-8">
                Skip the lines. Send an instant proposal. Or grab a coffee in Lagos and let's structure an organic map packs domination plan.
              </p>

              <div className="space-y-5">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono uppercase">Direct eMail</p>
                    <p className="text-xs font-bold text-white mt-0.5">iqleadsbloger@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono uppercase">WhatsApp Callouts</p>
                    <p className="text-xs font-bold text-white mt-0.5">
                      {(import.meta as any).env.VITE_WHATSAPP_NUMBER || "+234 80 1234 5678"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/40 border border-purple-500/20 text-purple-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono uppercase">Consultancy hours</p>
                    <p className="text-xs font-bold text-white mt-0.5">Mon – Sat (9am – 6pm WAT)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick trust metrics panel */}
            <div className="mt-8 pt-6 border-t border-purple-950/60 text-[10px] text-gray-500 space-y-2">
              <div className="flex items-center space-x-2">
                <ClipboardCheck className="h-4 w-4 text-emerald-400" />
                <span>NDA Agreement signed by default on client projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-amber-400" />
                <span>Standard first-reply speed target under 12 hours</span>
              </div>
            </div>
          </div>

          {/* Form questionnaire - 7 Cols */}
          <div className="lg:col-span-7 bg-[#0d0d14]/75 border border-purple-900/15 rounded-2xl p-6.5" id="contact-form-wrapper">
            <h3 className="text-md font-bold text-white mb-6">Dispatch Lead Form</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase block">Inquirer Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Al-Salam Sinner Client"
                  className="w-full text-xs rounded-xl border border-purple-900/30 bg-[#07070a]/80 px-4 py-3 text-white placeholder-gray-650 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full text-xs rounded-xl border border-purple-900/30 bg-[#07070a]/80 px-4 py-3 text-white placeholder-gray-650 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300 uppercase block">WhatsApp / Mobile *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234..."
                    className="w-full text-xs rounded-xl border border-purple-900/30 bg-[#07070a]/80 px-4 py-3 text-white placeholder-gray-650 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase block">Target Service Domain</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full text-xs rounded-xl border border-purple-900/30 bg-[#07070a]/80 px-3 py-3.5 text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="ai-mastery">AI Money Making Mastery Course (₦45k – ₦150k)</option>
                  <option value="web-dev">Custom Web Development (₦120k – ₦450k+)</option>
                  <option value="graphic-design">Graphic Design and Branding (₦35k – ₦180k)</option>
                  <option value="seo">SEO and Search Optimizations (₦80k – ₦250k)</option>
                  <option value="gmb">Google My Business Map Packs (₦45k – ₦120k)</option>
                  <option value="combo">Combo Business Expansion Pack (₦350k – ₦650k)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase block">Briefly share your milestones/goals</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Need local Abuja dentist rank? Or build global Shopify integrations?"
                  rows={4.5}
                  className="w-full text-xs rounded-xl border border-purple-900/30 bg-[#07070a]/80 px-4 py-3 text-white placeholder-gray-650 focus:border-purple-500 focus:outline-none resize-none"
                />
              </div>

              {formError && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400 text-center">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                id="submit-contact-btn"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-650 py-3.5 text-xs font-bold text-white shadow-lg shadow-purple-950/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Sending Your Details securely...</span>
                ) : (
                  <>
                    <span>Dispatch Premium Request</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[10px] text-gray-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Encrypted connection with prompt response guaranteed</span>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
