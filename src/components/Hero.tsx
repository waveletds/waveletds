import { ArrowRight, Sparkles, Code, Palette, Search, GraduationCap, MapPin, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  setActiveView: (view: string) => void;
  openBookingModal: () => void;
}

export default function Hero({ setActiveView, openBookingModal }: HeroProps) {
  const expertSpecs = [
    { icon: Code, label: "Web Dev", desc: "React, Next.js, Node, Custom Portals", borderClr: "border-gray-200" },
    { icon: Palette, label: "Graphic Design", desc: "Logos, Flyers, Brand Identities", borderClr: "border-gray-200" },
    { icon: Search, label: "SEO Guru", desc: "Local Map Booster & Google Rankings", borderClr: "border-gray-200" },
    { icon: GraduationCap, label: "AI Specialist", desc: "Prompt Mastery & Workflow Automation", borderClr: "border-gray-200" },
  ];

  return (
    <section id="hero-section" className="relative overflow-hidden bg-white pt-12 pb-24 md:pt-16 md:pb-32 border-b border-gray-100">
      {/* Background radial ambient lights */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/5 blur-[120px] lg:h-[800px] lg:w-[800px]"></div>
      <div className="pointer-events-none absolute top-[40%] right-10 h-[300px] w-[300px] rounded-full bg-orange-400/5 blur-[90px]"></div>

      {/* Decorative Matrix Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] opacity-35"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Location Badge */}
        <div className="flex justify-center" id="location-badge-wrapper">
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 rounded-full border border-orange-200 bg-orange-50/70 px-4 py-1.5 text-xs font-semibold text-orange-700"
          >
            <MapPin className="h-3.5 w-3.5 text-orange-600 animate-bounce" />
            <span>Serving Clients Worldwide from Lagos, Nigeria</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </motion.div>
        </div>

        {/* Core Slogan Titles */}
        <div className="mt-8 text-center max-w-4xl mx-auto" id="hero-headlines">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-flex items-center space-x-1.5 rounded-md bg-orange-600/10 px-3 py-1 text-xs font-bold text-orange-750 border border-orange-600/20">
              <Sparkles className="h-3.5 w-3.5 text-orange-600" />
              <span>DIGITAL ACCELERATION SUITE</span>
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12] font-display"
          >
            I Help You{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Build, Design, Rank
            </span>{" "}
            &{" "}
            <span className="relative inline-block text-slate-950">
              <span className="relative z-10">Automate</span>
              <span className="absolute bottom-1 left-0 h-3 w-full bg-orange-200 -z-10 skew-x-3"></span>
            </span>{" "}
            With Ease
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm text-slate-600 sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Meet <strong>Al-Salam Sinner</strong>: Web Architect, Graphic Visualizer, SEO Strategist, and AI Automation expert. We build custom platforms, deploy high-ticket scripts, and power business-critical systems.
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
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-orange-100 transition-all hover:scale-[1.03] active:scale-[0.97]"
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
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl border border-orange-200 bg-orange-50/60 px-8 py-4 text-sm font-bold text-orange-700 hover:bg-orange-50 transition-all"
          >
            <Sparkles className="h-4.5 w-4.5 text-orange-600 animate-pulse" />
            <span>Try Free AI Side-Hustle Advisor</span>
          </motion.button>
        </div>

        {/* Dynamic Interactive Stats/Dashboard Grid */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="hero-showcase">
          
          {/* Main left features list */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="text-xs font-bold text-orange-600 tracking-wider uppercase font-mono">HOW WE GUARANTEE INBOUND VALUE</h3>
            <ul className="space-y-4">
              {[
                { title: "No Tech Jargon", text: "Transparent pricing in Naira, clean milestones, and functional delivery without excuses." },
                { title: "Mobile Conversions Optimized", text: "Web sites built for extremely fast delivery, styled in modern Tailwind with custom instant widgets." },
                { title: "AI Integration Built-In", text: "We connect Gemini models and custom web calculators directly to standard database portals." },
                { title: "Map Packs Domination", text: "Our GMB setup gets your office into Google's top spots, sparking client interest within days." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="h-5.5 w-5.5 text-orange-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-550 mt-0.5 leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Graphical custom CSS canvas representing of Al-Salam Sinner's Dashboard */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-gray-200 bg-gray-50/50 p-6 shadow-xl backdrop-blur-md">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-orange-100/50 blur-xl"></div>
              
              {/* Fake IDE Header */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-5">
                <div className="flex items-center space-x-2">
                  <span className="h-3 w-3 rounded-full bg-red-400"></span>
                  <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                  <span className="h-3 w-3 rounded-full bg-green-400"></span>
                  <span className="font-mono text-xs text-slate-500 pl-2">wavelet-systems.config.tsx</span>
                </div>
                <div className="font-mono text-[10px] text-orange-600 select-none bg-orange-50 px-2.5 py-1 rounded border border-orange-100 font-bold">
                  ACTIVE PIPELINE STATUS: OK
                </div>
              </div>

              {/* Grid content inside fake panel */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white p-4.5 border border-gray-150 shadow-sm">
                  <span className="text-xs text-slate-500 font-medium">Digital Assets Distributed</span>
                  <div className="mt-1 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold font-mono text-slate-950">+1,420</span>
                    <span className="text-[10px] text-emerald-600 font-bold font-mono">+45%</span>
                  </div>
                  <div className="mt-3.5 h-[5px] w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-orange-500" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div className="rounded-xl bg-white p-4.5 border border-gray-150 shadow-sm">
                  <span className="text-xs text-slate-500 font-medium">Local Visibility Index</span>
                  <div className="mt-1 flex items-baseline space-x-2">
                    <span className="text-2xl font-bold font-mono text-orange-600">Top Spot</span>
                    <span className="text-[10px] text-slate-500 font-mono font-bold">Verified</span>
                  </div>
                  <div className="mt-3.5 h-[5px] w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-slate-900" style={{ width: "95%" }}></div>
                  </div>
                </div>

                <div className="col-span-2 rounded-xl bg-white p-4 border border-gray-150 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-700 font-bold">Nigeria & Global Digital Assets Matrix</span>
                    <span className="text-[10px] text-orange-600 font-mono font-bold">Update Active</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs py-1 border-b border-gray-100">
                      <span className="text-slate-550">Web scripts deployment</span>
                      <span className="text-orange-600 font-bold font-mono">From ₦45,000</span>
                    </div>
                    <div className="flex justify-between text-xs py-1 border-b border-gray-100">
                      <span className="text-slate-550">Virtual SMS / OTP numbers</span>
                      <span className="text-orange-600 font-bold font-mono">From ₦1,300</span>
                    </div>
                    <div className="flex justify-between text-xs py-1">
                      <span className="text-slate-550">Foreign Lines (DID routes)</span>
                      <span className="text-slate-950 font-bold font-mono">From ₦12,000/mo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini prompt prompt layout demo */}
              <div className="mt-5 rounded-xl bg-orange-50 border border-orange-100 p-4">
                <div className="flex items-center space-x-2 text-xs text-orange-700 font-bold">
                  <Sparkles className="h-4 w-4 text-orange-600" />
                  <span>Command Prompt Shell:</span>
                </div>
                <p className="mt-1.5 font-mono text-[11px] text-slate-750 leading-relaxed italic">
                  {"\"Route incoming verification webhook to client webhook buffer with SMS notification trigger...\""}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Categories Overview Specs Grid */}
        <div id="service-specs" className="mt-20 md:mt-28 border-t border-gray-150 pt-16">
          <div className="text-center mb-10">
            <h2 className="text-xs font-bold text-orange-600 font-mono tracking-wider uppercase">ALL SUPPORTING SYSTEMS IN ONE HUB</h2>
            <p className="mt-2 text-2xl font-black text-slate-950 font-display">Why Wavelet Digital is Your Trusted Partner</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertSpecs.map((spec, index) => (
              <div 
                key={index}
                className={`rounded-xl border ${spec.borderClr} bg-white p-6 hover:shadow-lg hover:border-orange-500/20 transition-all duration-300 group`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 border border-orange-100 group-hover:bg-orange-600 transition-colors">
                  <spec.icon className="h-5 w-5 text-orange-600 group-hover:text-white" />
                </div>
                <h4 className="mt-4 text-sm font-bold text-slate-950 leading-snug">{spec.label}</h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
