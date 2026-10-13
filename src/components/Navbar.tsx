import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { studioStatus } from '../lib/booking';

const LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#avaliacoes', label: 'Avaliações' },
  { href: '#agendar', label: 'Agendar' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState(() => studioStatus());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => setStatus(studioStatus()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
    >
      <nav
        aria-label="Navegação principal"
        className={`mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-5 ${
          scrolled
            ? 'border-rose/30 bg-white/80 shadow-float backdrop-blur-xl'
            : 'border-white/50 bg-white/60 shadow-card backdrop-blur-xl'
        }`}
      >
        <a href="#topo" className="flex items-center gap-2.5" aria-label="Studio Letícia Fernandes — início">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-lg font-bold text-rose">
            L
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-semibold tracking-tight sm:text-base">
              Studio Letícia Fernandes
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint">
              Nail Design · Feira de Santana
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition hover:bg-rose-faint hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold sm:inline-flex ${
              status.open
                ? 'border-open/40 bg-open/10 text-green-800'
                : 'border-ink/10 bg-ink/5 text-ink-faint'
            }`}
            role="status"
            aria-live="polite"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${status.open ? 'bg-open animate-pulse-dot' : 'bg-ink-faint'}`}
              aria-hidden="true"
            />
            • {status.label}
          </span>
          <motion.a
            href="#agendar"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="inline-flex min-h-[48px] items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-cream shadow-gold transition-colors hover:bg-charcoal-soft"
          >
            <Sparkles className="h-4 w-4 text-rose-soft" aria-hidden="true" />
            Agendar
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
}
