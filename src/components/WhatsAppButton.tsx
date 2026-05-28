import { MessageSquare, PhoneCall } from "lucide-react";
import { motion } from "motion/react";

export default function WhatsAppButton() {
  const rawNumber = (import.meta as any).env.VITE_WHATSAPP_NUMBER || "+2348012345678";
  const whatsappNumber = rawNumber.replace(/\D/g, "");
  const defaultMessage = "Hello Al-Salam Sinner, I am visiting the Wavelet Digital Solutions site and would like to inquire about your custom services and mentorship packages!";
  const encodedMsg = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-40" id="whatsapp-floating-trigger">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-950/40 hover:bg-emerald-400 border border-emerald-400/20 relative group"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="h-6.5 w-6.5" />
        
        {/* Pulsing indicator */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500"></span>
        </span>

        {/* Floating Tag Hover Label */}
        <span className="absolute right-16 scale-x-0 group-hover:scale-x-100 transition-transform origin-right bg-[#09090d] border border-emerald-500/20 text-emerald-400 text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xl duration-250 whitespace-nowrap">
          WhatsApp Al-Salam Sinner
        </span>

      </motion.a>
    </div>
  );
}
