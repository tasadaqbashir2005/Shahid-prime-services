import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/site-data";
import waIcon from "@/assets/whatsapp-v2.png.asset.json";

const MESSAGE = "Hello SHAHID PRIME SERVICES, I have an inquiry.";

export function WhatsAppFab() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  const openChat = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined") {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
      if (isMobile) {
        e.preventDefault();
        window.location.href = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(MESSAGE)}`;
      }
    }
  };

  return (
    <motion.a
      href={href}
      onClick={openChat}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full shadow-2xl sm:bottom-8 sm:right-8 sm:h-[70px] sm:w-[70px]"
      style={{ animation: "pulse-green 2s infinite" }}
      aria-label="Chat on WhatsApp"
    >
      <img
        src={waIcon.url}
        alt="Contact us on WhatsApp"
        className="h-full w-full drop-shadow-lg"
        style={{ filter: "drop-shadow(0 4px 10px rgba(37,211,102,0.55))" }}
      />
      <style>{`
        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55); }
          70% { box-shadow: 0 0 0 18px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
      `}</style>
    </motion.a>
  );
}
