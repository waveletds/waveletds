import { ArrowRight, Sparkles, Code, Palette, Search, GraduationCap, MapPin, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  setActiveView: (view: string) => void;
  openBookingModal: () => void;
}

export default function Hero({ setActiveView, openBookingModal }: HeroProps) {
  const expertSpecs = [
    { icon: Code, label: "Web Dev", desc: "React, Next.js, Node, Custom Portals", borderClr: "border-purple-500/30" },
    { icon: Palette, label: "Graphic Design", desc: "Logos, Flyers, Brand Identities", borderClr: "border-blue-500/30" },
    { icon: Search, label: "SEO Guru", desc: "Local Map Booster & Google Rankings", borderClr: "border-amber-500/30" },
    { icon: GraduationCap, label: "AI Specialist", desc: "Prompt Mastery & Workflow Automation", borderClr: "border-emerald-500/30" },
  ];

  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#07070a] pt-12 pb-24 md:pt-16 md:pb-32">
      {/* Background radial ambient lights */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-900/15 blur-[120px] lg:h-[800px] lg:w-[800px]"></div>
      <div className="pointer-events-none absolute top-[40%] right-10 h-[300px] w-[300px] rounded-full bg-indigo-950/20 blur-[90px]"></div>
      <div className="pointer-events-none absolute bottom-5 left-10 h-[250px] w-[250px] rounded-full bg-amber-500/5 blur-[80px]"></div>

      {/* Decorative Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Location Badge */}
        <div className="flex justify-center" id="location-badge-wrapper">
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 rounded-full border border-purple-500/20 bg-purple-950/25 px-4 py-1.5 text-xs font-semibold text-purple-300"
          >
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            <span>Serving Clients Worldwide from Lagos, Nigeria</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </motion.div>
        </div>

        {/* Core Slogan Titles */}
        <div className="mt-8 text-center max-w-4xl mx-auto" id="hero-headlines">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-flex items-center space-x-1.5 rounded-md bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-400/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>THE AI PROFIT LAB EXPERIMENT</span>
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12]"
          >
            I Help You{" "}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-amber-300 bg-clip-text text-transparent">
              Build, Design, Rank
            </span>{" "}
            &{" "}
            <span className="relative inline-block text-white">
              <span className="relative z-10">Make Money</span>
              <span className="absolute bottom-1 left-0 h-3 w-full bg-purple-600/50 -z-10 skew-x-3"></span>
            </span>{" "}
            with AI
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-md text-gray-400 sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Meet <strong>Al-Salam Sinner</strong>: Web Architect, Graphic Visualizer, SEO Strategist, and AI Educator. Stop guessing. Deploy high-ticket digital platforms and cash in on the AI revolution today.
          </motion.p>
        </div>

        {/* Action Callouts */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" id="hero-actions">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            id="hero-book-btn"
            onClick={openBookingModal}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-purple-950/50 transition-all hover:scale-[1.03] active:scale-[0.97]"
          >
            <span>Book a Strategy Call</span>
            <ArrowRight className="h-4.5 w-4.5" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            id="hero-advisor-btn"
            onClick={() => {
              setActiveView("ai-advisor");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl border border-purple-500/20 bg-purple-950/15 backdrop-blur px-8 py-4 text-base font-bold text-gray-300 hover:text-white hover:bg-purple-900/10 hover:border-purple-400/40 transition-all"
          >
            <Sparkles className="h-4.5 w-4.5 text-amber-400" />
            <span>Try Free AI Side-Hustle Advisor</span>
          </motion.button>
        </div>

        {/* Dynamic Interactive Stats/Dashboard Grid */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="hero-showcase">
          
          {/* Main left features list */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="text-sm font-semibold text-amber-300 tracking-wider uppercase">HOW WE GUARANTEE INBOUND PROFITS</h3>
            <ul className="space-y-4">
              {[
                { title: "No Tech Jargon", text: "Transparent pricing in Naira, clean milestones, and functional delivery without excuses." },
                { title: "Mobile Conversions Optimized", text: "Web sites built for extremely fast delivery, styled in modern Tailwind with ready WhatsApp hooks." },
                { title: "AI Integration Built-In", text: "We connect Google GenAI models and custom forms directly to secure storage or CRM portals." },
                { title: "Map Packs Domination", text: "Our GMB setup gets your office into Google's top 3, prompting cold client calls within days." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="h-5.5 w-5.5 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-200">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Graphical custom CSS canvas representing of Al-Salam Sinner's Dashboard */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-purple-900/30 bg-[#0e0e15]/85 p-6 shadow-2xl shadow-purple-950/10 backdrop-blur-md">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-purple-600/10 blur-xl"></div>
              
              {/* Fake IDE Header */}
              <div className="flex items-center justify-between border-b border-purple-950 pb-4 mb-5">
                <div className="flex items-center space-x-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]"></span>
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]"></span>
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]"></span>
                  <span className="font-mono text-xs text-gray-500 pl-2">ai-profit-lab-core.tsx</span>
                </div>
                <div className="font-mono text-[10px] text-amber-400/70 select-none bg-amber-500/10 px-2.5 py-1 rounded border border-amber-400/15">
                  ACTIVE HOSTING SERVER
                </div>
              </div>

              {/* Grid content inside fake panel */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#06060c] p-4.5 border border-purple-500/5 hover:border-purple-500/20 transition-all">
                  <span className="text-xs text-gray-400">Total Client Leads Generated</span>
                  <div className="mt-1 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold font-mono text-white">+1,240</span>
                    <span className="text-[10px] text-emerald-400">+45% wk</span>
                  </div>
                  <div className="mt-3.5 h-[5px] w-full rounded-full bg-purple-900/30 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div className="rounded-xl bg-[#06060c] p-4.5 border border-purple-500/5 hover:border-purple-500/20 transition-all">
                  <span className="text-xs text-gray-400">Nigeria Rank Growth (SEO)</span>
                  <div className="mt-1 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold font-mono text-amber-300">#1 Spot</span>
                    <span className="text-[10px] text-indigo-400">GMB verified</span>
                  </div>
                  <div className="mt-3.5 h-[5px] w-full rounded-full bg-purple-900/30 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: "95%" }}></div>
                  </div>
                </div>

                <div className="col-span-2 rounded-xl bg-[#06060c] p-4 border border-purple-500/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400 font-bold">Nigeria & Global Market Arbitrage Estimator</span>
                    <span className="text-[10px] text-purple-400 font-mono">Real-time</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs py-1 border-b border-purple-950/40">
                      <span className="text-gray-400">Custom Web Dev Package</span>
                      <span className="text-emerald-400 font-bold">₦250,000 / avg</span>
                    </div>
                    <div className="flex justify-between text-xs py-1 border-b border-purple-950/40">
                      <span className="text-gray-400">Local Maps Optimizations</span>
                      <span className="text-emerald-400 font-bold">₦45,000 / item</span>
                    </div>
                    <div className="flex justify-between text-xs py-1">
                      <span className="text-gray-400 font-bold">Combo Package Discount</span>
                      <span className="text-amber-300 font-bold">Save ₦175,000+</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini prompt prompt layout demo */}
              <div className="mt-5 rounded-xl bg-purple-950/15 border border-purple-500/10 p-4">
                <div className="flex items-center space-x-2 text-xs text-purple-300">
                  <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
                  <span className="font-bold">Al-Salam Sinner Prompt System:</span>
                </div>
                <p className="mt-1.5 font-mono text-[11px] text-gray-300 leading-relaxed italic">
                  {"\"Generate landingPageConfig with max conversion score based on Lagos digital product metrics...\""}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Categories Overview Specs Grid */}
        <div id="service-specs" className="mt-20 md:mt-28 border-t border-purple-900/25 pt-16">
          <div className="text-center mb-10">
            <h2 className="text-sm font-semibold text-purple-400 tracking-wider uppercase">ALL SUPPORTING EXPERTISE IN ONE LAB</h2>
            <p className="mt-2 text-2xl font-bold text-white">Why Al-Salam Sinner is Your Ideal Partner</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertSpecs.map((spec, index) => (
              <div 
                key={index}
                className={`rounded-xl border ${spec.borderClr} bg-[#0c0c12]/60 p-5.5 hover:bg-[#12121e]/85 hover:scale-[1.02] hover:-y-1 transition-all duration-300 group`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-950-20 border border-purple-900/30 group-hover:bg-gradient-to-tr group-hover:from-purple-600 group-hover:to-indigo-600 transition-colors">
                  <spec.icon className="h-6 w-6 text-purple-400 group-hover:text-white" />
                </div>
                <h4 className="mt-4 text-lg font-bold text-white leading-snug">{spec.label}</h4>
                <p className="mt-1 text-xs text-gray-400 leading-relaxed">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
