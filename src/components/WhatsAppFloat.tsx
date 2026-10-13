import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { STUDIO } from '../lib/config';

export default function WhatsAppFloat() {
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9, type: 'spring', stiffness: 320, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      href={`https://wa.me/${STUDIO.whatsappNumber}?text=${encodeURIComponent('Olá, Letícia! Quero agendar um horário ✨')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-float"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-cream bg-open animate-pulse-dot" aria-hidden="true" />
    </motion.a>
  );
}
