import React, { useState } from "react";
import { 
  Rocket, Code, Palette, Search, GraduationCap, ArrowRight, CheckCircle, 
  ChevronRight, Sparkles, MessageSquare, ShieldCheck, HelpCircle, 
  X, AlertCircle, BookmarkCheck, Calendar, Star, MapPin
} from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import ServiceCalculator from "./components/ServiceCalculator";
import AIMoneyGenerator from "./components/AIMoneyGenerator";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import WhatsAppButton from "./components/WhatsAppButton";
import LeadCaptureModal from "./components/LeadCaptureModal";
import { SERVICES_DATA, PORTFOLIO_DATA, BLOG_DATA, ServicePackage, PortfolioItem } from "./types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeView, setActiveView] = useState<string>("home");
  
  // Funnel Booking State
  const [selectedPkg, setSelectedPkg] = useState<ServicePackage | null>(null);
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  
  // State for success feedback cards
  const [successReceipt, setSuccessReceipt] = useState<{ msg: string; invoiceId: string } | null>(null);

  // Detail Modal Portfolio States
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  // Dynamic Trigger to open the Booking Funnel modal
  const handleOpenBookingWithPackage = (pkg: ServicePackage) => {
    setSelectedPkg(pkg);
    setSuccessReceipt(null);
  };

  const handleOpenGeneralQuote = () => {
    // Treat as "Basic Business Portal" default selection
    const defaultPkg = SERVICES_DATA.find(pkg => pkg.id === "web-1") || SERVICES_DATA[2];
    setSelectedPkg(defaultPkg);
    setSuccessReceipt(null);
  };

  const handleSuccessLeadReceived = (msg: string, invoiceId: string) => {
    setSuccessReceipt({ msg, invoiceId });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || (!bookingEmail && !bookingPhone)) {
      alert("Please provide at least one contact channel (Email or Phone).");
      return;
    }

    setIsBookingSubmitting(true);
    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: bookingName,
          email: bookingEmail,
          phone: bookingPhone,
          service: selectedPkg ? selectedPkg.name : "Custom Package Inquiry",
          packageType: selectedPkg ? selectedPkg.category : "Custom Bundle",
          customBudget: selectedPkg ? selectedPkg.priceLabel : "N/A",
          message: bookingMessage || `Client requested package: ${selectedPkg?.name || "None"}`,
          source: "Global Booking Funnel Overlay",
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || "A submission error occurred.");
      }

      setSuccessReceipt({
        msg: resData.message,
        invoiceId: resData.referenceId,
      });

      // Reset Form fields
      setBookingName("");
      setBookingEmail("");
      setBookingPhone("");
      setBookingMessage("");
    } catch (error: any) {
      alert(error.message || "Failed to submit booking. Please try again.");
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  return (
    <div id="app-root-shell" className="min-h-screen bg-[#06060a] text-gray-100 font-sans selection:bg-purple-600/30 selection:text-amber-300">
      
      {/* Top Banner Global Trust */}
      <div id="top-alert-banner" className="bg-[#0b0b14] border-b border-purple-900/30 text-center py-2 px-3 text-[10px] md:text-xs">
        <span className="inline-flex items-center space-x-1">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
          <span className="text-gray-300 font-bold">Nigeria AI & Web Development Integration Specialist</span>
          <span className="text-amber-300 underline pl-1 cursor-pointer" onClick={() => setActiveView("ai-advisor")}>Launch Dynamic Profit Advisor &rarr;</span>
        </span>
      </div>

      {/* Global Navigation Component */}
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        openBookingModal={handleOpenGeneralQuote} 
      />

      {/* Main Page View Engine */}
      <main id="app-viewport" className="relative">
        
        {/* HOMEPAGE VIEW */}
        {activeView === "home" && (
          <div id="view-home-container" className="animate-fade-in">
            <Hero 
              setActiveView={setActiveView} 
              openBookingModal={handleOpenGeneralQuote} 
            />

            {/* Quick Pricing Showcase Segment */}
            <section className="bg-[#08080c] py-16 border-t border-purple-950/20" id="home-services-summary">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h3 className="text-xs font-bold text-[#a855f7] uppercase tracking-widest font-mono">POPULAR WORK CHOICES</h3>
                  <h2 className="text-3xl font-extrabold text-white mt-1">Direct Profit Solutions</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {SERVICES_DATA.slice(0, 3).map((pkg) => (
                    <div 
                      key={pkg.id} 
                      className={`rounded-2xl border bg-[#0d0d15]/80 p-6 relative overflow-hidden transition-all hover:scale-[1.01] hover:border-purple-600/30 flex flex-col justify-between ${
                        pkg.tag ? "border-amber-400/30 ring-1 ring-amber-400/10" : "border-purple-950"
                      }`}
                    >
                      <div>
                        {pkg.tag && (
                          <span className="absolute -top-3 right-5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-1 text-[10px] font-bold text-black uppercase tracking-wider">{pkg.tag}</span>
                        )}
                        <span className="text-[10px] font-mono uppercase text-purple-400 font-bold tracking-wider">{pkg.category.replace("-", " ")}</span>
                        <h4 className="text-lg font-bold text-white mt-1.5">{pkg.name}</h4>
                        <p className="text-2xl font-black text-white font-mono mt-3">{pkg.priceLabel}</p>
                        <p className="text-xs text-gray-400 mt-2 min-h-[48px] leading-relaxed">{pkg.shortDesc}</p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-purple-950 flex flex-col gap-3">
                        <button
                          id={`home-rent-pkg-${pkg.id}`}
                          onClick={() => handleOpenBookingWithPackage(pkg)}
                          className={`w-full text-xs font-bold py-3.5 rounded-xl transition-all ${
                            pkg.tag 
                              ? "bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:brightness-110" 
                              : "bg-purple-950 border border-purple-500/10 text-white hover:bg-purple-900/40"
                          }`}
                        >
                          Rent This Package
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-10">
                  <button
                    id="home-explore-all-services"
                    onClick={() => setActiveView("services")}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-purple-400 hover:text-purple-300"
                  >
                    <span>Explore All Pricing Tiers & Packages</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* Testimonials Review Slider */}
            <section className="bg-[#050508] py-16 border-t border-purple-950/20" id="home-customer-reviews">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-12">
                  <h3 className="text-xs font-bold text-amber-300 tracking-wider uppercase">TRUST SIGNALS</h3>
                  <h2 className="text-2xl font-black text-white mt-1.5">Client Feedbacks (Naija & Abroad)</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {[
                    {
                      name: "Prince Adebayo",
                      role: "CEO, Adebayo Cargo Services",
                      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
                      feedback: "Al-Salam built our booking portal in 6 days flat! He also claimed our Google Map location and ranked us top 3. Our phones haven't stopped ringing! Instant value in Nigeria.",
                      stars: 5,
                      pkg: "Custom Web Dev"
                    },
                    {
                      name: "Ngozi Obi",
                      role: "Director of Marketing, ChicFashion",
                      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
                      feedback: "As a designer, Al-Salam is flawless. SVG logos were delivered on schedule with exact color guidelines, plus 12 social templates that tripled our click-through-rates.",
                      stars: 5,
                      pkg: "Branding Pack"
                    }
                  ].map((rev, idx) => (
                    <div key={idx} className="rounded-2xl border border-purple-950 bg-[#0d0d15]/50 p-6 relative">
                      <div className="flex items-center space-x-1 text-amber-400 mb-3.5">
                        {[...Array(rev.stars)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed italic">"{rev.feedback}"</p>
                      
                      <div className="mt-5 border-t border-purple-950 pt-4.5 flex items-center space-x-3">
                        <img 
                          referrerPolicy="no-referrer"
                          src={rev.image} alt={rev.name} className="h-10 w-10 rounded-full object-cover" />
                        <div>
                          <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                          <p className="text-[10px] text-gray-500">{rev.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* SERVICES AND DETAILED PRICING VIEW */}
        {activeView === "services" && (
          <div id="view-services-container" className="animate-fade-in">
            <Services 
              onSelectPackage={handleOpenBookingWithPackage} 
              setActiveView={setActiveView} 
            />
            {/* Embedded interactive Service pricing Calculator */}
            <div id="app-service-calculator-wrapper">
              <ServiceCalculator onSuccessLead={handleSuccessLeadReceived} />
            </div>
          </div>
        )}

        {/* INTERACTIVE AI MONEY ADVISOR SIDE-HUSTLE BLUEPRINT */}
        {activeView === "ai-advisor" && (
          <div id="view-advisor-container" className="animate-fade-in">
            <AIMoneyGenerator />
          </div>
        )}

        {/* PORTFOLIO GRID MULTIPAGE VIEW */}
        {activeView === "portfolio" && (
          <div id="view-portfolio-container" className="animate-fade-in">
            <Portfolio onSelectProject={setSelectedProject} />
          </div>
        )}

        {/* BIOGRAPHY HISTORY ABOUT ME VIEW */}
        {activeView === "about" && (
          <div id="view-about-container" className="animate-fade-in">
            <About />
          </div>
        )}

        {/* SEO BLOG CONTENT HUB VIEW */}
        {activeView === "blog" && (
          <div id="view-blog-container" className="animate-fade-in">
            <Blog />
          </div>
        )}

        {/* CONTACT GMB BOOKING FORM VIEW */}
        {activeView === "contact" && (
          <div id="view-contact-container" className="animate-fade-in">
            <Contact onSuccessLead={handleSuccessLeadReceived} />
          </div>
        )}

      </main>

      {/* FOOTER METRICS AREA */}
      <footer id="app-footer-bar" className="bg-[#040407] border-t border-purple-950/40 py-12 text-xs text-gray-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-purple-950/40">
            {/* C1 Brand */}
            <div className="space-y-3">
              <h4 className="text-white text-sm font-bold flex items-center space-x-1.5 font-sans">
                <Rocket className="h-4.5 w-4.5 text-purple-400" />
                <span>Wavelet Digital Solutions</span>
              </h4>
              <p className="text-[11px] leading-relaxed text-gray-500">
                A modern professional workshop connecting AI capabilities with client-centric web architecture, design assets, and organic maps search.
              </p>
            </div>
            {/* C2 Services */}
            <div>
              <h5 className="text-white font-bold mb-3.5 text-xs text-gray-200">Our Services</h5>
              <ul className="space-y-2 text-[11px]">
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveView("services")}>AI Money Making Mastery</li>
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveView("services")}>Custom Websites Development</li>
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveView("services")}>Google My Business Boost</li>
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveView("services")}>Strategic Search Audits (SEO)</li>
              </ul>
            </div>
            {/* C3 Resources */}
            <div>
              <h5 className="text-white font-bold mb-3.5 text-xs text-gray-200">Interactive Tools</h5>
              <ul className="space-y-2 text-[11px]">
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveView("ai-advisor")}>AI Side-Hustle Advisor</li>
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveView("services")}>Instant Naira Calculator</li>
                <li className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveView("blog")}>Secret Conversion Hub</li>
              </ul>
            </div>
            {/* C4 Local verification */}
            <div>
              <h5 className="text-white font-bold mb-3.5 text-xs text-gray-200 font-mono text-amber-400 uppercase tracking-widest pl-1.5 border-l border-amber-400/30">Lagos Head Office</h5>
              <p className="text-[11px] leading-relaxed text-gray-500">
                Yaba, mainland district, LagosState, Nigeria. Support worldwide bookings via direct WhatsApp channels.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-650" id="compliance-text">
            <span>&copy; {new Date().getFullYear()} Wavelet Digital Solutions. All Rights Reserved. Crafted by Al-Salam Sinner (Web Developer & AI Educator).</span>
            <span className="flex items-center space-x-1 mt-3 md:mt-0 text-[10px]">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Full compliance verified. SSL Active</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Floating conversational trigger links */}
      <WhatsAppButton />

      {/* Launch Exit/Timer Lead captures Modal */}
      <LeadCaptureModal />

      {/* --- FLOATING OVERLAY DIALOGS --- */}

      {/* 1. Global Funnel Invoice Booking Modal */}
      <AnimatePresence>
        {selectedPkg && (
          <motion.div
            id="booking-funnel-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            onClick={() => setSelectedPkg(null)}
          >
            <motion.div
              id="booking-funnel-modal"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[95vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-purple-900/30 bg-[#0a0a0f] p-6.5 shadow-2xl relative scrollbar-thin scrollbar-thumb-purple-900"
            >
              {/* Close button */}
              <button
                id="close-booking-modal-btn"
                onClick={() => setSelectedPkg(null)}
                className="absolute top-5 right-5 rounded-lg border border-purple-900/30 bg-purple-950/20 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Body: Success Feedback Overlay or Booking Form */}
              {successReceipt ? (
                <div className="text-center py-6" id="booking-success-container">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-5 text-center">
                    <BookmarkCheck className="h-8 w-8 text-emerald-400 animate-pulse" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white">Your Request is Active!</h3>
                  <div className="mt-3 inline-flex items-center justify-center rounded-xl bg-purple-950/40 border border-purple-500/25 px-4 py-1.5 font-mono text-xs text-purple-300">
                    INVOICE REF: {successReceipt.invoiceId}
                  </div>

                  <p className="mt-4 text-xs text-gray-300 px-4 leading-relaxed">
                    Thank you! Al-Salam Sinner has logged your inquiry. Our first reply speed target is under 12 hours. We will connect with you on WhatsApp or Email soon.
                  </p>

                  <div className="mt-8 pt-5 border-t border-purple-950 flex flex-col gap-3">
                    <a
                      href={`https://wa.me/${((import.meta as any).env.VITE_WHATSAPP_NUMBER || "+2348012345678").replace(/\D/g, "")}?text=Hello%20Al-Salam%20Sinner%21%20I%20just%20submitted%20a%20booking%20request%20with%20invoice%20reference%20${successReceipt.invoiceId}.%20Please%20verify%20my%20slots%21`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-950/25"
                    >
                      <MessageSquare className="h-4.5 w-4.5" />
                      <span>Verify Live via WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        setSelectedPkg(null);
                        setSuccessReceipt(null);
                      }}
                      className="w-full rounded-xl bg-purple-950/40 border border-purple-500/20 py-2.5 text-xs font-bold text-gray-300 hover:text-white"
                    >
                      Back to Services
                    </button>
                  </div>
                </div>
              ) : (
                <div id="booking-funnel-form-wrapper">
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-widest font-mono mb-2">
                    BOOKING INQUIRY FOR PACKAGES
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-white">
                    Submit Request for: <br />
                    <span className="text-amber-300">{selectedPkg.name}</span>
                  </h3>
                  
                  <p className="mt-2 text-xs text-gray-400 leading-tight">
                    Total Naira budget rate: <strong className="text-white font-mono">{selectedPkg.priceLabel}</strong>
                  </p>

                  <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
                    
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        placeholder="e.g. Al-Salam student"
                        className="w-full text-xs rounded-xl border border-purple-900/40 bg-[#0c0c14] px-4 py-3 text-white placeholder-gray-650 focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">Business Email *</label>
                        <input
                          type="email"
                          required
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          placeholder="client@growthbrand.com"
                          className="w-full text-xs rounded-xl border border-purple-900/40 bg-[#0c0c14] px-4 py-3 text-white placeholder-gray-655 focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">WhatsApp Mobile *</label>
                        <input
                          type="tel"
                          required
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          placeholder="+234..."
                          className="w-full text-xs rounded-xl border border-purple-900/40 bg-[#0c0c14] px-4 py-3 text-white placeholder-gray-655 focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-gray-400 font-bold block">Provide additional requests / instructions</label>
                      <textarea
                        value={bookingMessage}
                        onChange={(e) => setBookingMessage(e.target.value)}
                        placeholder="e.g., I would like to pay in 2 installments of 50/50. Or I need custom logo patterns..."
                        rows={3}
                        className="w-full text-xs rounded-xl border border-purple-900/40 bg-[#0c0c14] px-4 py-3 text-white placeholder-gray-650 focus:border-purple-500 focus:outline-none resize-none"
                      />
                    </div>

                    <div className="pt-4 border-t border-purple-950 flex flex-col gap-3">
                      <button
                        type="submit"
                        id="submit-funnel-btn"
                        disabled={isBookingSubmitting}
                        className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-650 py-3.5 text-xs font-bold text-white shadow-lg cursor-pointer hover:scale-[1.01] transition-all disabled:opacity-50"
                      >
                        {isBookingSubmitting ? (
                          <span>Dispatching Booking Slots...</span>
                        ) : (
                          <>
                            <span>Request Booking & Contract Tiers</span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <p className="text-[9px] text-[#9ca3af] text-center italic">
                        By submitting, you align package requirements for Al-Salam Sinner's review.
                      </p>
                    </div>

                  </form>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Detailed Case Study/Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            id="project-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              id="project-modal"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-purple-900/30 bg-[#0a0a0f] p-6.5 shadow-2xl relative scrollbar-thin scrollbar-thumb-purple-905"
            >
              <button
                id="close-project-btn"
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 rounded-lg border border-purple-900/30 bg-purple-950/20 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer animate-pulse"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="aspect-video w-full rounded-xl overflow-hidden mb-5">
                <img 
                  referrerPolicy="no-referrer"
                  src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                <span className="text-purple-400 uppercase tracking-widest font-bold">{selectedProject.client || "CONFIDENTIAL CLIENT"}</span>
                {selectedProject.stats && (
                  <span className="text-amber-400 font-bold uppercase tracking-wider">RESULT: {selectedProject.stats.label} {selectedProject.stats.value}</span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {selectedProject.title}
              </h2>

              <p className="mt-4 text-xs text-gray-300 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="mt-6 border-t border-purple-950/60 pt-5 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Technologies & Scope Deployed:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="rounded-md bg-[#12121b] border border-purple-950 px-2.5 py-1 text-[10px] font-semibold text-gray-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl bg-purple-950/15 border border-purple-500/10 p-4 font-normal text-xs text-gray-400">
                  <p className="font-bold text-white mb-1">Execution Metrics Breakdown:</p>
                  We structured the asset rendering sequence, automated keyword alignments, deployed standard React components over fast server networks, and verified the address listings via proper maps parameters, hitting standard target conversions easily.
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-purple-950/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-500 font-mono">
                  AL-SALAM SINNER • DESIGN EXPERTISE
                </div>
                
                <button
                  id="project-inquire-btn"
                  onClick={() => {
                    setSelectedProject(null);
                    setActiveView("contact");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-650 px-5 py-3 text-xs font-bold text-white hover:brightness-110 cursor-pointer"
                >
                  <span>Inquire About Similar setup</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
