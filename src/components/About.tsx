import { Award, Briefcase, GraduationCap, Laptop, Sparkles, MapPin, Search, Grid } from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const skillsMatrix = [
    { title: "Website Sales & Delivery", percentage: 95, icon: Laptop, color: "bg-orange-600" },
    { title: "Virtual Number & OTP Bypassing", percentage: 98, icon: Sparkles, color: "bg-orange-550" },
    { title: "Google My Business SEO Maps", percentage: 90, icon: Search, color: "bg-amber-500" },
    { title: "Airtime to Cash VTU Swapping", percentage: 92, icon: Grid, color: "bg-orange-400" },
  ];

  return (
    <section id="about-page" className="bg-white py-16 md:py-24 border-t border-gray-100 relative overflow-hidden">
      <div className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-orange-100/50 blur-3xl"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main layout grid banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Presentation Area - 5 Cols */}
          <div className="lg:col-span-5 relative" id="about-visuals-panel">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-slate-50 p-2.5 shadow-xl">
              
              {/* Main Avatar Presentation Card */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-gradient-to-t from-gray-100 via-white to-gray-50">
                <img
                  referrerPolicy="no-referrer"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                  alt="Al-Salam Sinner"
                  className="h-full w-full object-cover grayscale opacity-95 transition-all duration-300 hover:scale-[1.03] hover:grayscale-0"
                />
                
                {/* Floating badge */}
                <div className="absolute top-4 left-4 rounded-xl border border-orange-200 bg-white/90 px-3 py-1.5 backdrop-blur-sm shadow-md">
                  <span className="flex items-center space-x-1 border-0">
                    <MapPin className="h-3.5 w-3.5 text-orange-600 animate-pulse" />
                    <span className="text-[10px] font-bold text-orange-750">LAGOS, NIGERIA</span>
                  </span>
                </div>

                {/* Ambient bio text overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <h3 className="text-xl font-extrabold text-white">Al-Salam Sinner</h3>
                  <p className="text-xs text-orange-450 font-mono mt-1 font-bold uppercase tracking-wider">Virtual Telecomm & Web Exec</p>
                </div>
              </div>

            </div>

            {/* Quick trust metrics panel offset */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex flex-col items-center justify-center p-4.5 rounded-2xl bg-white border border-orange-200 shadow-xl max-w-[170px] text-center select-none" id="trust-badge">
              <Award className="h-7 w-7 text-orange-600 animate-pulse" />
              <p className="text-xs font-bold text-slate-900 mt-1.5 leading-tight">DID Connection Specialist</p>
              <p className="text-[9px] text-slate-500 mt-1 uppercase">SIM Gateways Certified</p>
            </div>
          </div>

          {/* Interactive Biography Bio Copy - 7 Cols */}
          <div className="lg:col-span-7 space-y-6" id="about-text-panel">
            <span className="inline-flex items-center space-x-1 rounded-md bg-orange-50 border border-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
              <GraduationCap className="h-4.5 w-4.5 text-orange-600" />
              <span>THE MIND BEHIND THE LAB</span>
            </span>

            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight sm:text-4xl md:text-5xl leading-tight font-display">
              One Expert. <br />
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Multi-Skill Arbitrage.</span>
            </h2>

            <p className="text-xs text-slate-650 leading-relaxed md:text-sm">
              Hello! I am <strong>Al-Salam Sinner</strong>, senior systems architect of **Wavelet Systems** based in Nigeria. We specialize in provisioning secure high-trust virtual communications, direct website transactions, pre-verified organic accounts, and VTU airtime liquidity.
            </p>

            <p className="text-xs text-slate-650 leading-relaxed md:text-sm">
              In a crowded digital market, obtaining reliable telecom channels, bypassing strict cellular OTP codes, securing high-converting responsive sites, and claiming authentic social handles shouldn't be a tedious hassle. My operations leverage fully automated cellular SIM arrays, instant validation terminals, and responsive web builds to dispatch secure configurations directly to your business in record time under 5 minutes average speed.
            </p>

            <div className="pt-4 border-t border-gray-150" id="about-skills">
              <h3 className="text-xs font-bold text-slate-950 uppercase tracking-wider mb-5">PROFESSIONAL SPECIALTY DEPTH</h3>
              <div className="space-y-4">
                {skillsMatrix.map((skill, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="flex items-center space-x-2 text-slate-700">
                        <skill.icon className="h-4 w-4 text-orange-600" />
                        <span>{skill.title}</span>
                      </span>
                      <span className="font-mono text-slate-950 text-[10px]">{skill.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`h-full rounded-full ${skill.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical experience blocks */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4" id="about-experience">
              <div className="rounded-xl bg-slate-50 border border-gray-250 p-4 flex items-start space-x-3 hover:bg-white transition-colors duration-150">
                <Briefcase className="h-5 w-5 text-orange-600 mt-1 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-950 leading-tight">8+ Years Operating</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Direct experience in structural web development and design layouts.</p>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 border border-gray-250 p-4 flex items-start space-x-3 hover:bg-white transition-colors duration-150">
                <GraduationCap className="h-5 w-5 text-orange-600 mt-1 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-950 leading-tight">4,500+ Swaps Completed</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Providing instant, audited VTU cashouts to local bank accounts.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
