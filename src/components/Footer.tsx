import { motion } from 'framer-motion';
import { Clock, Instagram, MapPin, MessageCircle, Star } from 'lucide-react';
import { STUDIO } from '../lib/config';

export default function Footer() {
  return (
    <footer className="bg-ink px-4 pb-28 pt-12 text-cream sm:px-6" aria-label="Rodapé">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-rose font-display text-xl font-bold text-ink">
                L
              </span>
              <div className="leading-tight">
                <p className="font-display text-lg font-semibold">{STUDIO.name}</p>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream/60">
                  Manicure · Nail Design
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              Boutique de unhas em Feira de Santana. Técnica, estética editorial e
              atendimento que respeita seu tempo.
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-soft">
              <Star className="h-4 w-4 fill-rose text-rose" aria-hidden="true" /> {STUDIO.rating} no Google · 180+ avaliações
            </p>
          </div>
          <nav aria-label="Atendimento">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cream/50">Atendimento</p>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex items-start gap-2 text-cream/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-soft" aria-hidden="true" /> {STUDIO.address}
              </li>
              <li className="flex items-center gap-2 text-cream/80">
                <Clock className="h-4 w-4 shrink-0 text-rose-soft" aria-hidden="true" /> {STUDIO.hours}
              </li>
              <li className="flex items-center gap-2 text-cream/80">
                <Instagram className="h-4 w-4 shrink-0 text-rose-soft" aria-hidden="true" /> {STUDIO.instagram}
              </li>
            </ul>
          </nav>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cream/50">Agende</p>
            <motion.a
              href="#agendar"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="mt-3 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-rose px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-rose-soft"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> {STUDIO.whatsappDisplay}
            </motion.a>
            <p className="mt-3 text-xs leading-relaxed text-cream/50">
              Janela de agendamento: hoje até +{STUDIO.maxAdvanceDays} dias. Domingos fechado.
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {STUDIO.name} · {STUDIO.city}. Todos os direitos reservados.</p>
          <p>Feito com precisão editorial em Feira de Santana 🤍</p>
        </div>
      </div>
    </footer>
  );
}
