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
    <header id="nav-header" className="sticky top-0 z-50 w-full border-b border-purple-900/40 bg-[#0a0a0e]/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick("home")}
          className="flex cursor-pointer items-center space-x-2.5"
          id="brand-logo-container"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-400 p-[1.5px] shadow-lg shadow-purple-950/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0c0c12]">
              <Rocket className="h-5 w-5 text-purple-400" />
            </div>
            {/* Glowing spot */}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
            </span>
          </div>
          <div>
            <h1 className="font-sans text-lg font-bold tracking-tight text-white md:text-xl">
              Wavelet <span className="bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-transparent">Digital</span>
            </h1>
            <p className="font-mono text-[9px] uppercase tracking-widest text-amber-400/80">Solutions</p>
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
                    ? "text-amber-300" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-500/20 -z-10"
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
          <div className="flex items-center space-x-1 text-xs text-gray-400 border-r border-purple-900/40 pr-4">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Over 80+ Projects</span>
          </div>
          <button
            id="nav-book-btn"
            onClick={openBookingModal}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-5  py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-950/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></span>
            <span>Get Quote</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none"
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
            className="lg:hidden border-t border-purple-900/30 bg-[#0a0a0e] overflow-hidden shadow-2xl"
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
                        ? "bg-purple-950/50 text-amber-300 border-l-2 border-amber-400 pl-3.5" 
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-purple-900/30">
                <button
                  id="mobile-nav-book-btn"
                  onClick={() => {
                    setIsOpen(false);
                    openBookingModal();
                  }}
                  className="w-full flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 text-center text-base font-bold text-white shadow-lg transition-all"
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
