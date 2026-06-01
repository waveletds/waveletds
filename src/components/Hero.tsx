import { useState, useEffect } from "react";
import { 
  ArrowRight, Sparkles, Code, MapPin, CheckCircle, Phone, Share2, 
  Smartphone, Key, Laptop, DollarSign, Check, RefreshCw, Wifi, 
  Globe, Send, Database, Lock 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroProps {
  setActiveView: (view: string) => void;
  openBookingModal: () => void;
}

export default function Hero({ setActiveView, openBookingModal }: HeroProps) {
  const [activeLabTab, setActiveLabTab] = useState<"numbers" | "otp" | "websites" | "airtime">("numbers");
  
  // Numbers Tab test animation state
  const [isTestRouting, setIsTestRouting] = useState(false);
  const [testStage, setTestStage] = useState(0); // 0: Idle, 1: US Node Ping, 2: Passing through Gateway, 3: Delivered to WhatsApp!
  const [incomingSms, setIncomingSms] = useState("");

  // OTP Tab states
  const [simSlots, setSimSlots] = useState([
    { id: "slot-1", country: "US", active: true, number: "+1 (302) 404-5827", service: "WhatsApp Bypass", cooldown: 0, lastPing: "1.2s ago" },
    { id: "slot-2", country: "UK", active: true, number: "+44 7911 123456", service: "Google Verification", cooldown: 0, lastPing: "0.8s ago" },
    { id: "slot-3", country: "NG", active: false, number: "+234 810 938 1221", service: "Glo Merchant Terminal", cooldown: 45, lastPing: "Offline in 45s" },
    { id: "slot-4", country: "CA", active: true, number: "+1 (587) 221-9302", service: "Telegram Gateway", cooldown: 0, lastPing: "Just now" }
  ]);
  const [isRequestingSlot, setIsRequestingSlot] = useState(false);
  const [liveOtpLog, setLiveOtpLog] = useState<string[]>([
    "System Ready. physical cellular grids in Lagos online.",
    "US line +1 (302) listening for SMS webhook triggers..."
  ]);

  // Websites Tab States
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile">("desktop");
  const [activeTemplate, setActiveTemplate] = useState<"ecommerce" | "services" | "vtu_script">("ecommerce");

  // Airtime Swap States
  const [swapAmount, setSwapAmount] = useState<number>(15000);
  const [selectedNetwork, setSelectedNetwork] = useState<"mtn" | "airtel" | "glo" | "9mobile">("mtn");
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapResult, setSwapResult] = useState<{ id: string; naira: number } | null>(null);

  // Trigger test DID routing sequence
  const startRoutingTest = () => {
    if (isTestRouting) return;
    setIsTestRouting(true);
    setTestStage(1);
    setIncomingSms("");

    setTimeout(() => {
      setTestStage(2);
      setIncomingSms("Verification Code for TikTok: 938-120");
    }, 1000);

    setTimeout(() => {
      setTestStage(3);
    }, 2000);

    setTimeout(() => {
      setIsTestRouting(false);
      setTestStage(0);
    }, 4500);
  };

  // Trigger simulated OTP request
  const requestSimOTP = () => {
    if (isRequestingSlot) return;
    setIsRequestingSlot(true);
    
    // Add pending log line
    const randNum = Math.floor(100000 + Math.random() * 900000);
    const services = ["Google API", "Telegram VIP", "WhatsApp Web", "Stripe Checkout", "Paystack Gate"];
    const servSelected = services[Math.floor(Math.random() * services.length)];
    
    setLiveOtpLog(prev => [`[WAITING] Booking slot on active SIM-bank for ${servSelected}...`, ...prev.slice(0, 5)]);

    setTimeout(() => {
      setLiveOtpLog(prev => [
        `[SUCCESS] SMS Recieved! Code is [${randNum}] (Dispatched to webhook in 0.2s)`,
        ...prev
      ]);
      setIsRequestingSlot(false);
    }, 1500);
  };

  // Trigger simulated VTU Airtime Swap
  const triggerAirtimeSwap = () => {
    if (isSwapping) return;
    setIsSwapping(true);
    setSwapResult(null);

    setTimeout(() => {
      // Calculate realistic payout (Approx 82% to 85% rate)
      const exactPayout = Math.round(swapAmount * 0.85);
      setSwapResult({
        id: "WVL-TX-" + Math.floor(100000 + Math.random() * 900000),
        naira: exactPayout
      });
      setIsSwapping(false);
    }, 1800);
  };

  const expertSpecs = [
    { icon: Phone, label: "Virtual Phone Numbers & OTP", desc: "Rent UK, US, and global numbers with instant automatic OTP verification forwarding.", borderClr: "border-gray-200" },
    { icon: Code, label: "Website Sales", desc: "Purchase or rent high-speed presentation pages, e-commerce storefronts, and web portals.", borderClr: "border-gray-200" },
    { icon: Share2, label: "Social Media Accounts Store", desc: "Acquire organic, aged pre-verified TikTok, Instagram, Twitter/X, and marketing profiles.", borderClr: "border-gray-200" },
    { icon: Smartphone, label: "Airtime Cash Out & GMB", desc: "Convert airtime credit to instantaneous withdrawable Naira; optimize and verify GMB maps.", borderClr: "border-gray-200" },
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
            Buy{" "}
            <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
              Numbers, Websites & Accounts
            </span>{" "}
            &{" "}
            <span className="relative inline-block text-slate-950">
              <span className="relative z-10">Convert Airtime</span>
              <span className="absolute bottom-1 left-0 h-3 w-full bg-orange-200 -z-10 skew-x-3"></span>
            </span>{" "}
            Instantly
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm text-slate-600 sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Welcome to **Wavelet Systems**: Your secure terminal to purchase global virtual phone numbers, lease instant OTP bypass SIMs, buy responsive high-converting websites, acquire organic social media accounts, swap VTU airtime to cash, and optimize Google My Business map rankings.
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
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-orange-100 transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
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
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl border border-orange-200 bg-orange-50/60 px-8 py-4 text-sm font-bold text-orange-700 hover:bg-orange-50 transition-all cursor-pointer"
          >
            <Sparkles className="h-4.5 w-4.5 text-orange-600 animate-pulse" />
            <span>Try Free AI Side-Hustle Advisor</span>
          </motion.button>
        </div>

        {/* Dynamic Interactive Stats/Dashboard Grid */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="hero-showcase">
          
          {/* Main left features list */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-orange-600 tracking-wider uppercase bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-md font-mono">
                ENGINEERING SPECIFICATIONS
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                Accelerate Your Business Connectivity
              </h2>
              <p className="text-xs text-slate-550 leading-relaxed">
                Click any of our active service terminals on the right to simulate live routing speeds, VTU Naira exchange rates, and pre-configured web layouts.
              </p>
            </div>

            <ul className="space-y-4 pt-4 border-t border-gray-100">
              {[
                { title: "No Tech Jargon", text: "Transparent pricing in Naira, clean milestones, and functional delivery without excuses." },
                { title: "Mobile Conversions Optimized", text: "Web sites built for extremely fast delivery, styled in modern Tailwind with custom instant widgets." },
                { title: "AI Integration Built-In", text: "We connect Gemini models and custom web calculators directly to standard database portals." },
                { title: "Map Packs Domination", text: "Our GMB setup gets your office into Google's top spots, sparking client interest within days." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-550 mt-0.5 leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Live Service Motion Lab */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-2xl border border-gray-200 bg-slate-950 p-5 md:p-6 shadow-2xl flex flex-col h-full text-white">
              
              {/* Decorative Glow elements */}
              <div className="absolute top-1/4 -right-10 h-32 w-32 rounded-full bg-orange-500/10 blur-2xl pointer-events-none"></div>
              
              {/* Fake IDE Header Terminal style */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-4 mb-5 gap-3.5">
                <div className="flex items-center space-x-2">
                  <span className="h-3 w-3 rounded-full bg-red-400"></span>
                  <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                  <span className="h-3 w-3 rounded-full bg-green-400"></span>
                  <span className="font-mono text-xs text-slate-400 pl-2">wavelet-systems.config.tsx</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-[9px] text-[#22c55e] uppercase tracking-wider font-bold">
                    SYSTEMS STATUS: RESELLER NODE OK
                  </span>
                </div>
              </div>

              {/* Lab Tabs Control - Dynamic Icons */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 mb-5">
                {[
                  { id: "numbers", icon: Phone, label: "Virtual Number leases" },
                  { id: "otp", icon: Key, label: "SIM OTP Bypass Gate" },
                  { id: "websites", icon: Laptop, label: "Prebuilt Web Storefronts" },
                  { id: "airtime", icon: Smartphone, label: "VTU Swap Cashout" }
                ].map((tab) => {
                  const IconComponent = tab.icon;
                  const isCur = activeLabTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveLabTab(tab.id as any)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                        isCur
                          ? "bg-orange-600 text-white shadow-md shadow-orange-950/45"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      <IconComponent className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Lab Content Area with robust Framer Motion graphics */}
              <div className="grow bg-slate-900/40 rounded-xl border border-slate-900/90 p-4 min-h-[290px] flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  {activeLabTab === "numbers" && (
                    <motion.div
                      key="tab-numbers"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div>
                        <div className="flex items-center space-x-1 text-[11px] font-bold text-orange-400 uppercase tracking-wider font-mono">
                          <Globe className="h-3.5 w-3.5" />
                          <span>GLOBAL DID COMMUNICATIONS LATENCY</span>
                        </div>
                        <h4 className="text-md font-bold text-white mt-0.5">Virtual SMS & Incoming Forwarding Router</h4>
                        <p className="text-[11px] text-slate-400 leading-normal mt-1">
                          Our leased UK/US/CA lines feature zero roaming costs. We route incoming codes straight to your target chat or hook within milliseconds.
                        </p>
                      </div>

                      {/* Visual Routing Graphic */}
                      <div className="bg-[#0c0c14] border border-slate-800 rounded-xl p-4 flex flex-col space-y-4.5 relative overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-450 font-semibold uppercase">US REGIONAL LEASE</span>
                          <span className="text-[10px] text-[#a855f7] font-semibold uppercase">SECURE VPN ROUTER</span>
                          <span className="text-[10px] text-emerald-400 font-semibold uppercase">TARGET WA INBOX</span>
                        </div>
                        
                        <div className="flex items-center justify-between relative px-3 py-2">
                          {/* Animated pipeline connectors */}
                          <div className="absolute left-1/4 right-1/4 top-1/2 -translate-y-1/2 h-[2px] bg-slate-800 -z-5">
                            {isTestRouting && (
                              <motion.div
                                initial={{ left: "0%" }}
                                animate={{ left: "100%" }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute top-1/2 -translate-y-1/2 h-[6px] w-[6px] rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]"
                              />
                            )}
                          </div>
                          
                          {/* Left node */}
                          <div className={`p-2.5 rounded-xl border text-center transition-colors ${
                            testStage === 1 ? "border-orange-500 bg-orange-950/20 shadow-[0_0_12px_rgba(249,115,22,0.25)]" : "border-slate-800 bg-slate-900"
                          } z-10`}>
                            <Phone className="h-5 w-5 text-orange-400 mx-auto" />
                            <span className="text-[10px] font-mono mt-1 block">+1 (212) 555-0144</span>
                          </div>

                          {/* Center system node */}
                          <div className={`h-11 w-11 rounded-full border flex items-center justify-center transition-colors ${
                            testStage === 2 ? "border-purple-500 bg-purple-950/20" : "border-slate-800 bg-slate-900"
                          } z-10`}>
                            <Database className="h-4.5 w-4.5 text-purple-400" />
                          </div>

                          {/* Right node */}
                          <div className={`p-2.5 rounded-xl border text-center transition-colors ${
                            testStage === 3 ? "border-emerald-500 bg-emerald-950/20 shadow-[0_0_12px_rgba(16,185,129,0.25)]" : "border-slate-800 bg-slate-900"
                          } z-10`}>
                            <Share2 className="h-5 w-5 text-emerald-400 mx-auto" />
                            <span className="text-[10px] font-mono mt-1 block">Your Nigerian WA</span>
                          </div>
                        </div>

                        {/* Event Feed */}
                        <div className="h-9 font-mono text-[10px] flex items-center justify-center rounded-lg bg-slate-950 px-3 text-center border border-slate-900">
                          {testStage === 0 && <span className="text-slate-500">Inactive. Hit button below to run telemetry test.</span>}
                          {testStage === 1 && <span className="text-amber-400 animate-pulse">PING REQUEST: Sending test packet verification to NYC terminal...</span>}
                          {testStage === 2 && <span className="text-purple-400 font-bold">ROUTE CAPTURED: SMS [{incomingSms.split(": ")[1]}] incoming! Processing in routing core...</span>}
                          {testStage === 3 && <span className="text-emerald-400 font-bold">SUCCESSFULLY DISPATCHED to WhatsApp at +234 810... [Lossless 0.4s]</span>}
                        </div>
                      </div>

                      <button
                        onClick={startRoutingTest}
                        disabled={isTestRouting}
                        className="w-full flex items-center justify-center space-x-1.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:bg-slate-750 text-xs py-2.5 font-bold cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw className={`h-3.5 w-3.5 text-orange-500 ${isTestRouting ? 'animate-spin' : ''}`} />
                        <span>{isTestRouting ? "Simulating Webhook Route..." : "Simulate Live SMS Forwarding"}</span>
                      </button>
                    </motion.div>
                  )}

                  {activeLabTab === "otp" && (
                    <motion.div
                      key="tab-otp"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div>
                        <div className="flex items-center space-x-1 text-[11px] font-bold text-[#a855f7] uppercase tracking-wider font-mono">
                          <Lock className="h-3.5 w-3.5" />
                          <span>CELLULAR SIM BANKS & OTP TERMINATION</span>
                        </div>
                        <h4 className="text-md font-bold text-white mt-0.5">Instant OTP Code Verification Slots</h4>
                        <p className="text-[11px] text-slate-400 leading-normal mt-1">
                          Direct physical sim endpoints on active servers ensure high-success verifications for social accounts, foreign fintech platforms & merchants.
                        </p>
                      </div>

                      {/* Active SIM slot banks */}
                      <div className="grid grid-cols-2 gap-3" id="sim-grid-viewport">
                        {simSlots.map((slot) => (
                          <div key={slot.id} className="rounded-xl bg-[#0b0b13] border border-slate-800/80 p-3 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-white bg-slate-800 px-2 py-0.5 rounded uppercase font-mono">
                                {slot.country} SLOT
                              </span>
                              <div className="flex items-center space-x-1.5">
                                <span className={`h-1.5 w-1.5 rounded-full ${slot.active ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                <span className="font-mono text-[9px] text-slate-400 uppercase">{slot.active ? 'idle' : 'locked'}</span>
                              </div>
                            </div>
                            
                            <p className="mt-2 text-xs font-mono font-bold text-slate-200">{slot.number}</p>
                            
                            <div className="mt-1 flex items-center justify-between text-[9px] text-slate-450 border-t border-slate-900 pt-1.5 font-semibold">
                              <span>{slot.service}</span>
                              <span className="text-gray-400 font-normal font-mono">{slot.lastPing}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Log Screen */}
                      <div className="rounded-lg bg-slate-950 border border-slate-900 p-2.5 font-mono text-[9.5px] text-slate-400 space-y-1 h-20 overflow-y-auto">
                        {liveOtpLog.map((log, i) => (
                          <p key={i} className={log.includes("[SUCCESS]") ? "text-emerald-400 font-bold" : log.includes("[WAITING]") ? "text-amber-500" : ""}>
                            {log}
                          </p>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={requestSimOTP}
                          disabled={isRequestingSlot}
                          className="flex-1 flex items-center justify-center space-x-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-xs py-2.5 font-bold cursor-pointer transition-all disabled:opacity-50"
                        >
                          <Key className="h-3.5 w-3.5 text-white animate-pulse" />
                          <span>{isRequestingSlot ? "Provisioning Sim Line..." : "Simulate Incoming SMS Verify"}</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setLiveOtpLog(["System feeds cleared.", "Ready."]);
                          }}
                          className="px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-400 cursor-pointer"
                        >
                          Clear Logs
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {activeLabTab === "websites" && (
                    <motion.div
                      key="tab-websites"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div>
                        <div className="flex items-center space-x-1 text-[11px] font-bold text-[#10b981] uppercase tracking-wider font-mono">
                          <Laptop className="h-3.5 w-3.5" />
                          <span>HIGH-SPEED PREMIUM RESPONSIVES</span>
                        </div>
                        <h4 className="text-md font-bold text-white mt-0.5">Prebuilt & Tailored E-Commerce Launchpads</h4>
                        <p className="text-[11px] text-slate-400 leading-normal mt-1">
                          No broken templates. We sell beautifully loaded, responsive websites equipped with automated local payment checkouts and quick-leads triggers.
                        </p>
                      </div>

                      {/* Interactive Viewport simulator */}
                      <div className="bg-[#0b0b13] border border-slate-800 rounded-xl p-3 flex flex-col space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-905 pb-2">
                          <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Previewing: {activeTemplate === "ecommerce" ? "Afrisell Storefront" : activeTemplate === "services" ? "Abuja Cargo Hub" : "VTU Reseller script v2.4"}</span>
                          </div>
                          
                          <div className="flex space-x-1 p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-[10px]">
                            <button
                              onClick={() => setViewportMode("desktop")}
                              className={`px-2.5 py-1 rounded font-semibold transition-all ${viewportMode === "desktop" ? 'bg-orange-600 text-white' : 'text-slate-450 hover:text-white'}`}
                            >
                              Desktop
                            </button>
                            <button
                              onClick={() => setViewportMode("mobile")}
                              className={`px-2.5 py-1 rounded font-semibold transition-all ${viewportMode === "mobile" ? 'bg-orange-600 text-white' : 'text-slate-455 hover:text-white'}`}
                            >
                              Mobile
                            </button>
                          </div>
                        </div>

                        {/* Animated Viewport container */}
                        <div className="flex items-center justify-center p-1.5 min-h-[120px] bg-slate-950 rounded-lg">
                          <motion.div
                            animate={{ width: viewportMode === "desktop" ? "100%" : "180px" }}
                            transition={{ type: "spring", stiffness: 120, damping: 15 }}
                            className="bg-[#0d0d16] border border-slate-800 rounded shadow-lg p-2.5 flex flex-col justify-between overflow-hidden aspect-video relative max-w-full"
                          >
                            <div className="flex items-center justify-between pb-1.5 border-b border-slate-900">
                              <span className="text-[7.5px] font-bold text-white font-mono">AFRISELL STORE</span>
                              <div className="flex space-x-1 text-[5px] text-slate-400">
                                <span>Home</span>
                                <span>Shop</span>
                                <span>Contact</span>
                              </div>
                            </div>
                            
                            <div className="py-2 flex items-center justify-between gap-1.5">
                              <div>
                                <h5 className="text-[8px] font-black leading-tight text-white">Lagos Delivery</h5>
                                <p className="text-[5.5px] text-slate-450 leading-normal max-w-[85px] mt-0.5">High converting React shop. Click payouts below.</p>
                              </div>
                              <div className="h-7 w-7 rounded bg-slate-800 shrink-0 border border-slate-700 flex items-center justify-center text-[7px]" />
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-900 pt-1">
                              <span className="text-[6.5px] font-mono text-emerald-400 font-bold">₦120,000 Setup Done</span>
                              <span className="bg-emerald-500/10 text-emerald-400 text-[5px] px-1 rounded font-bold uppercase py-0.5 flex items-center">
                                WA Paystack Checked
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      {/* Selector templates buttons */}
                      <div className="flex gap-2">
                        {[
                          { id: "ecommerce", label: "Store Portal" },
                          { id: "services", label: "Agency Layout" },
                          { id: "vtu_script", label: "Naira Reseller App" }
                        ].map((temp) => (
                          <button
                            key={temp.id}
                            onClick={() => setActiveTemplate(temp.id as any)}
                            className={`flex-1 text-[10.5px] font-medium py-1.5 rounded-lg border text-center transition-all ${
                              activeTemplate === temp.id 
                                ? "bg-slate-800 text-orange-400 border-slate-700" 
                                : "bg-transparent text-slate-500 border-slate-800 hover:text-slate-350"
                            }`}
                          >
                            {temp.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeLabTab === "airtime" && (
                    <motion.div
                      key="tab-airtime"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div>
                        <div className="flex items-center space-x-1 text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                          <DollarSign className="h-3.5 w-3.5" />
                          <span>VTU AIRTIME LIQUIDITY EXCHANGE</span>
                        </div>
                        <h4 className="text-md font-bold text-white mt-0.5">Automated VTU Swaps to Direct cash</h4>
                        <p className="text-[11px] text-slate-400 leading-normal mt-1">
                          Our automated merchant SIM slots accept bulk Airtel, MTN, Glo & 9mobile pins, releasing instant Naira to your Nigerian bank.
                        </p>
                      </div>

                      {/* Interactive Swap Card slider */}
                      <div className="bg-[#0b0b13] border border-slate-800 rounded-xl p-4.5 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-450 font-bold">Select Mobile Carrier:</span>
                          <span className="text-[10px] text-orange-400 font-mono font-bold">Reseller Rate: 85% Cashout</span>
                        </div>

                        {/* Network picker UI */}
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { id: "mtn", label: "MTN NG", bClr: "border-yellow-400 bg-yellow-400/5 text-yellow-400" },
                            { id: "airtel", label: "Airtel", bClr: "border-red-500 bg-red-500/5 text-red-500" },
                            { id: "glo", label: "Glo", bClr: "border-emerald-500 bg-emerald-500/5 text-emerald-500" },
                            { id: "9mobile", label: "9Mobile", bClr: "border-teal-500 bg-teal-500/5 text-teal-500" }
                          ].map((net) => (
                            <button
                              key={net.id}
                              onClick={() => { setSelectedNetwork(net.id as any); setSwapResult(null); }}
                              className={`rounded-xl border text-center p-2 text-xs font-bold transition-all ${
                                selectedNetwork === net.id 
                                  ? net.bClr + " ring-2 ring-orange-500/10 scale-102 shadow-md" 
                                  : "border-slate-800 text-slate-400 bg-transparent hover:text-white"
                              }`}
                            >
                              {net.label}
                            </button>
                          ))}
                        </div>

                        {/* Range slider */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-slate-450">Airtime Volume</span>
                            <span className="text-white font-bold font-mono">₦{swapAmount.toLocaleString()}</span>
                          </div>
                          
                          <input
                            type="range"
                            min="1000"
                            max="100000"
                            step="1000"
                            value={swapAmount}
                            onChange={(e) => { setSwapAmount(Number(e.target.value)); setSwapResult(null); }}
                            className="w-full h-[5px] accent-orange-600 rounded-lg bg-slate-800 outline-none cursor-pointer"
                          />
                        </div>

                        {/* Receipt rendering */}
                        <div className="h-10.5 flex items-center justify-center rounded-lg bg-slate-950 font-mono text-xs text-center border border-slate-900 px-3">
                          {isSwapping ? (
                            <span className="text-amber-500 animate-pulse flex items-center space-x-1">
                              <RefreshCw className="h-3.5 w-3.5 animate-spin pl-0.5 text-amber-500" />
                              <span>Validating Carrier Channel on SIM terminal...</span>
                            </span>
                          ) : swapResult ? (
                            <span className="text-[#22c55e] font-bold flex items-center space-x-1">
                              <Check className="h-4 w-4" />
                              <span>₦{swapResult.naira.toLocaleString()} Paid to Bank! Ref: {swapResult.id}</span>
                            </span>
                          ) : (
                            <span className="text-slate-500">
                              Estimated payout Naira value: <strong className="text-white">₦{Math.round(swapAmount * 0.85).toLocaleString()}</strong>
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={triggerAirtimeSwap}
                        disabled={isSwapping}
                        className="w-full flex items-center justify-center space-x-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-xs py-2.5 font-bold cursor-pointer transition-all disabled:opacity-50"
                      >
                        <RefreshCw className={`h-3.5 w-3.5 ${isSwapping ? 'animate-spin' : ''}`} />
                        <span>Swap This Airtime Vol Now</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Bot-Right Action */}
              <div className="mt-5 pt-4.5 border-t border-slate-800 flex items-center justify-between text-xs" id="lab-quick-routing">
                <span className="text-slate-500">Need immediate setup?</span>
                <button
                  onClick={() => setActiveView("services")}
                  className="inline-flex items-center space-x-1 text-orange-400 font-bold hover:text-orange-300"
                >
                  <span>Go to Checkout Store</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Categories Overview Specs Grid with Icons */}
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
                <p className="mt-1 text-xs text-slate-550 leading-relaxed">{spec.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
