import { useState } from "react";
import { ExternalLink, CheckSquare, Award, Monitor, Palette, LineChart, Cpu } from "lucide-react";
import { PORTFOLIO_DATA, PortfolioItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface PortfolioProps {
  onSelectProject: (proj: PortfolioItem) => void;
}

export default function Portfolio({ onSelectProject }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "web" | "design" | "ai-art" | "seo-gmb">("all");

  const filterOpts: { id: "all" | "web" | "design" | "ai-art" | "seo-gmb"; label: string; icon: any }[] = [
    { id: "all", label: "All Masterpieces", icon: Award },
    { id: "web", label: "Web Applications", icon: Monitor },
    { id: "design", label: "Visual Branding", icon: Palette },
    { id: "seo-gmb", label: "SEO & Google Maps", icon: LineChart },
  ];

  const filteredItems = activeFilter === "all"
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio-page" className="bg-[#06060a]/95 py-16 md:py-24 border-t border-purple-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div id="portfolio-header" className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 px-3 py-1.5 text-xs font-bold text-purple-300">
            <Cpu className="h-3.5 w-3.5" />
            <span>CASE STUDIES & PROOFS</span>
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Delivering <span className="bg-gradient-to-r from-purple-400 to-amber-300 bg-clip-text text-transparent">Real Business Numbers</span>
          </h2>
          <p className="mt-3.5 text-xs text-gray-400">
            Browse true client milestones from Lagos to worldwide. We don't just build sites or logos — we craft monetization structures that scale.
          </p>
        </div>

        {/* Filter Navigation */}
        <div id="portfolio-filters" className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-purple-950/20 pb-6">
          {filterOpts.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                activeFilter === opt.id
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "bg-[#0d0d14]/70 text-gray-400 hover:text-white hover:bg-[#12121b]"
              }`}
            >
              <opt.icon className="h-4 w-4" />
              <span>{opt.label}</span>
            </button>
          ))}
        </div>

        {/* Portfolio grid display */}
        <div id="portfolio-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-950 bg-[#0d0d15]/80 shadow-xl transition-all hover:border-purple-600/40"
              >
                {/* Image card wrapper */}
                <div className="relative overflow-hidden aspect-video cursor-pointer" onClick={() => onSelectProject(item)}>
                  <img
                    referrerPolicy="no-referrer"
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Backdrop blur overlay on image hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e15] via-[#0e0e15]/40 to-transparent opacity-90"></div>
                  
                  {/* Key Stats highlight badging */}
                  {item.stats && (
                    <div className="absolute top-4 right-4 rounded-xl bg-purple-950/90 border border-purple-500/30 backdrop-blur px-3 py-1.5 text-center shadow-lg">
                      <p className="text-[9px] uppercase tracking-widest text-purple-300 font-bold leading-tight">{item.stats.label}</p>
                      <p className="text-sm font-extrabold text-amber-300 font-mono leading-tight">{item.stats.value}</p>
                    </div>
                  )}

                  {/* Icon badge based on category */}
                  <div className="absolute bottom-4 left-4 inline-flex items-center space-x-1.5 rounded-lg bg-black/50 backdrop-blur-md px-2.5 py-1 border border-white/5 text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                    <span>{item.category.replace("-", " ")}</span>
                  </div>
                </div>

                {/* Content info wrapper */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-[#a855f7] text-[10px] font-bold tracking-widest uppercase font-mono mb-1">{item.client || "CONFIDENTIAL BRAND"}</h4>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs text-gray-400 leading-relaxed min-h-[55px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags and interaction link buttons */}
                  <div className="mt-5 pt-4 border-t border-purple-950 flex flex-col gap-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.slice(0, 3).map((tech, tIdx) => (
                        <span key={tIdx} className="rounded-md bg-purple-950/40 border border-purple-900/20 px-2 py-0.5 text-[10px] text-gray-400 font-semibold uppercase">
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 3 && (
                        <span className="text-[10px] text-purple-400 pt-0.5 font-bold">+{item.technologies.length - 3} more</span>
                      )}
                    </div>

                    <button
                      id={`view-details-${item.id}`}
                      onClick={() => onSelectProject(item)}
                      className="w-full inline-flex items-center justify-center space-x-1.5 rounded-xl bg-purple-950/20 hover:bg-purple-900/25 border border-purple-500/10 hover:border-purple-400/30 py-2.5 text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer"
                    >
                      <span>Examine Case Study</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom banner for high trust callouts */}
        <div id="portfolio-trust" className="mt-16 flex flex-col md:flex-row items-center justify-around gap-6 border-t border-purple-950/40 pt-12 text-center max-w-4xl mx-auto">
          <div>
            <span className="text-2xl font-black text-amber-300 font-mono">80+</span>
            <p className="text-xs text-gray-400 mt-1">Delivered Global Jobs</p>
          </div>
          <div className="hidden md:block h-8 w-px bg-purple-950"></div>
          <div>
            <span className="text-2xl font-black text-white font-mono">₦24M+</span>
            <p className="text-xs text-gray-400 mt-1">Naira Revenue Generated for Clients</p>
          </div>
          <div className="hidden md:block h-8 w-px bg-purple-950"></div>
          <div>
            <span className="text-2xl font-black text-white font-mono">100%</span>
            <p className="text-xs text-gray-400 mt-1">Client Retention Score</p>
          </div>
        </div>

      </div>
    </section>
  );
}
