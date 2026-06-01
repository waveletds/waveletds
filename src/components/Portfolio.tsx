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
    <section id="portfolio-page" className="bg-white py-16 md:py-24 border-t border-gray-150">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div id="portfolio-header" className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-orange-50 border border-orange-200 px-3 py-1.5 text-xs font-bold text-orange-705">
            <Cpu className="h-3.5 w-3.5 text-orange-600" />
            <span>CASE STUDIES & PROOFS</span>
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-4xl font-display">
            Delivering <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Real Business Numbers</span>
          </h2>
          <p className="mt-3.5 text-xs text-slate-550 leading-relaxed max-w-lg mx-auto">
            Browse true client milestones from Lagos to worldwide. We don't just build sites or logos — we craft monetization structures that scale.
          </p>
        </div>

        {/* Filter Navigation */}
        <div id="portfolio-filters" className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-gray-150 pb-6">
          {filterOpts.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                activeFilter === opt.id
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-slate-50 border border-gray-200 text-slate-600 hover:text-slate-950 hover:bg-slate-100"
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
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-250 bg-white shadow-sm hover:shadow-md transition-all hover:border-orange-500/30"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-85"></div>
                  
                  {/* Key Stats highlight badging */}
                  {item.stats && (
                    <div className="absolute top-4 right-4 rounded-xl bg-orange-600 border border-orange-500 px-3 py-1.5 text-center shadow-lg">
                      <p className="text-[9px] uppercase tracking-widest text-orange-100 font-bold leading-tight">{item.stats.label}</p>
                      <p className="text-sm font-extrabold text-white font-mono leading-tight">{item.stats.value}</p>
                    </div>
                  )}

                  {/* Icon badge based on category */}
                  <div className="absolute bottom-4 left-4 inline-flex items-center space-x-1.5 rounded-lg bg-black/55 backdrop-blur-md px-2.5 py-1 border border-white/10 text-[9px] font-bold text-gray-200 uppercase tracking-widest">
                    <span>{item.category.replace("-", " ")}</span>
                  </div>
                </div>

                {/* Content info wrapper */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-orange-600 text-[10px] font-bold tracking-widest uppercase font-mono mb-1">{item.client || "CONFIDENTIAL BRAND"}</h4>
                    <h3 className="text-lg font-bold text-slate-905 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs text-slate-500 leading-relaxed min-h-[55px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags and interaction link buttons */}
                  <div className="mt-5 pt-4 border-t border-gray-150 flex flex-col gap-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.slice(0, 3).map((tech, tIdx) => (
                        <span key={tIdx} className="rounded-md bg-slate-50 border border-gray-200 px-2 py-0.5 text-[10px] text-slate-600 font-semibold uppercase">
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 3 && (
                        <span className="text-[10px] text-orange-600 pt-0.5 font-bold">+{item.technologies.length - 3} more</span>
                      )}
                    </div>

                    <button
                      id={`view-details-${item.id}`}
                      onClick={() => onSelectProject(item)}
                      className="w-full inline-flex items-center justify-center space-x-1.5 rounded-xl bg-orange-50 hover:bg-orange-100/70 border border-orange-150 py-2.5 text-xs font-bold text-orange-700 hover:text-orange-800 transition-all cursor-pointer"
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
        <div id="portfolio-trust" className="mt-16 flex flex-col md:flex-row items-center justify-around gap-6 border-t border-gray-200 pt-12 text-center max-w-4xl mx-auto">
          <div>
            <span className="text-2xl font-black text-orange-600 font-mono">80+</span>
            <p className="text-xs text-slate-500 mt-1">Delivered Global Jobs</p>
          </div>
          <div className="hidden md:block h-8 w-px bg-gray-200"></div>
          <div>
            <span className="text-2xl font-black text-slate-950 font-mono">₦24M+</span>
            <p className="text-xs text-slate-500 mt-1">Naira Revenue Generated for Clients</p>
          </div>
          <div className="hidden md:block h-8 w-px bg-gray-200"></div>
          <div>
            <span className="text-2xl font-black text-slate-950 font-mono">100%</span>
            <p className="text-xs text-slate-500 mt-1">Client Retention Score</p>
          </div>
        </div>

      </div>
    </section>
  );
}
