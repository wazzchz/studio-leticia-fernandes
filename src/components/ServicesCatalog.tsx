import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, MessageCircle } from 'lucide-react';
import { CATEGORIES, SERVICES } from '../data/services';
import { formatBRL, formatDuration } from '../lib/format';
import type { ServiceCategory } from '../types';

interface Props {
  onBook: (serviceId: string) => void;
}

const TAG_STYLE: Record<string, string> = {
  'Mais pedida': 'bg-ink text-cream',
  Novidade: 'bg-blush text-ink',
  Premium: 'bg-rose text-ink',
  Express: 'bg-open/20 text-green-900 border border-open/40',
};

export default function ServicesCatalog({ onBook }: Props) {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('Todas');

  const list = useMemo(
    () => (cat === 'Todas' ? SERVICES : SERVICES.filter((s) => s.category === (cat as ServiceCategory))),
    [cat],
  );

  return (
    <section id="servicos" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20" aria-label="Catálogo de serviços">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-deep">01 — Catálogo</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
          Serviços & <span className="text-rose-deep">menu</span>
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
          Preço fechado, duração real e botão direto pro WhatsApp. Sem surpresa, sem espera.
        </p>
      </div>

      <div className="editorial-rule mt-6" aria-hidden="true" />

      <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filtrar por categoria">
        {CATEGORIES.map((c) => {
          const active = cat === c;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={active}
              onClick={() => setCat(c)}
              className={`relative min-h-[48px] whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                active ? 'text-cream' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-ink shadow-card"
                  aria-hidden="true"
                />
              )}
              <span
                className={`absolute inset-0 rounded-full border ${
                  active ? 'border-ink' : 'border-ink/15 bg-white/70 backdrop-blur'
                }`}
                aria-hidden="true"
              />
              <span className="relative">{c}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((s, i) => (
            <motion.article
              key={s.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white/75 shadow-card backdrop-blur-xl hover:shadow-float"
            >
            <div className={`relative bg-gradient-to-br ${s.gradient} p-5`}>
              {s.tag && (
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${TAG_STYLE[s.tag] ?? 'bg-ink text-cream'}`}>
                  {s.tag}
                </span>
              )}
              <div className="mt-6 flex items-end justify-between">
                <span className="font-display text-4xl font-bold tracking-tight text-white/95 drop-shadow-sm">{s.initials}</span>
                <span className="rounded-full bg-black/25 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  {s.category}
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-lg font-semibold leading-snug">{s.name}</h3>
              <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-ink-soft">{s.description}</p>
              <div className="mt-4 flex items-center justify-between border-t border-ink/8 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-faint">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {formatDuration(s.durationMin)}
                </span>
                <span className="rounded-full border border-rose/40 bg-rose-faint px-3 py-1 text-sm font-bold text-ink">
                  {formatBRL(s.priceCents)}
                </span>
              </div>
              <motion.button
                onClick={() => onBook(s.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-cream transition-colors hover:bg-charcoal-soft"
                aria-label={`Agendar ${s.name}`}
              >
                <MessageCircle className="h-4 w-4 text-rose-soft" aria-hidden="true" />
                Agendar horário
              </motion.button>
            </div>
          </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
