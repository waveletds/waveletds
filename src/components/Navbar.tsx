import { useState } from "react";
import { Menu, X, Rocket, Award, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  openBookingModal: () => void;
}

export default function Navbar({ activeView, setActiveView, openBookingModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "dashboard", label: "SaaS Dashboard & Store" },
    { id: "services", label: "Services & Pricing" },
    { id: "ai-advisor", label: "AI Money Advisor" },
    { id: "portfolio", label: "Portfolio" },
    { id: "about", label: "About Me" },
    { id: "blog", label: "SEO Blog" },
    { id: "contact", label: "Contact & Book" },
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setIsOpen(false);
    // Scroll smoothly to top when switching views
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header id="nav-header" className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick("home")}
          className="flex cursor-pointer items-center space-x-2.5"
          id="brand-logo-container"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-orange-600 p-[1.5px] shadow-md shadow-orange-100">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
              <Rocket className="h-5 w-5 text-orange-600" />
            </div>
            {/* Glowing spot */}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500"></span>
            </span>
          </div>
          <div>
            <h1 className="font-sans text-lg font-bold tracking-tight text-slate-900 md:text-xl font-display">
              Wavelet <span className="text-orange-600">Digital</span>
            </h1>
            <p className="font-mono text-[9px] uppercase tracking-widest text-orange-600/90 font-bold">Solutions</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-1.5">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-all rounded-lg duration-300 ${
                  isActive 
                    ? "text-orange-600 font-bold" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 rounded-lg bg-orange-50 border border-orange-200/50 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button & Trust elements */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-xs text-slate-500 border-r border-gray-200 pr-4">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Over 80+ Projects</span>
          </div>
          <button
            id="nav-book-btn"
            onClick={openBookingModal}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-orange-600 hover:bg-orange-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-100 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get Quote</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden shadow-xl"
          >
            <div className="space-y-1.5 px-4 pt-4 pb-6">
              {navItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left rounded-lg px-4 py-3 text-base font-semibold transition-all ${
                      isActive 
                        ? "bg-orange-50 text-orange-600 border-l-2 border-orange-500 pl-3.5" 
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-gray-150">
                <button
                  id="mobile-nav-book-btn"
                  onClick={() => {
                    setIsOpen(false);
                    openBookingModal();
                  }}
                  className="w-full flex items-center justify-center rounded-lg bg-orange-600 hover:bg-orange-700 py-3.5 text-center text-sm font-bold text-white shadow-lg transition-all"
                >
                  Book Instant Consultancy
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
