import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

const SHOTS = [
  { title: 'Almond nude rosé', meta: 'Fibra · gloss', g: 'from-[#EAD5CD] via-[#D4B2A7] to-[#A9885E]', n: '01' },
  { title: 'Babyboomer delicada', meta: 'Gel · degradê', g: 'from-[#FAFAF9] via-[#E4CFAF] to-[#78716C]', n: '02' },
  { title: 'Coffin vinho editorial', meta: 'Fibra · premium', g: 'from-[#1C1917] via-[#5A4E36] to-[#B76E5B]', n: '03' },
  { title: 'Aura lilás + chrome', meta: 'Nail art · autoral', g: 'from-[#D4B2A7] via-[#A9885E] to-[#1C1917]', n: '04' },
  { title: 'Francesinha reversa', meta: 'Gel · clássica', g: 'from-[#F5F0EB] via-[#C5A880] to-[#44403C]', n: '05' },
  { title: 'Spa glow nos pés', meta: 'Pedicure · ritual', g: 'from-[#E9E2D8] via-[#D4B2A7] to-[#1C1917]', n: '06' },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="scroll-mt-24 bg-charcoal py-14 text-cream sm:py-20" aria-label="Portfólio">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-soft">02 — Portfólio</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Feitas à mão, <span className="text-rose-soft">uma a uma.</span>
          </h2>
          <p className="inline-flex items-center gap-2 text-sm text-cream/70">
            <Camera className="h-4 w-4" aria-hidden="true" /> Arraste para explorar →
          </p>
        </div>
      </div>
      <div className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]">
        {SHOTS.map((s, i) => (
          <motion.figure
            key={s.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="w-60 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-charcoal-soft sm:w-72"
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className={`relative h-72 bg-gradient-to-br ${s.g} p-5 sm:h-80`}>
              <span className="font-display text-6xl font-bold tracking-tight text-white/30">{s.n}</span>
              {/* stylized hand/nail abstraction */}
              <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden="true">
                {[0, 1, 2, 3].map((f) => (
                  <span
                    key={f}
                    className="block w-5 rounded-full bg-gradient-to-b from-white/90 to-white/40 shadow-lg"
                    style={{ height: `${64 - f * 7}px`, transform: `rotate(${(f - 1.5) * 6}deg)` }}
                  />
                ))}
              </div>
              <span className="absolute left-4 top-4 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                {s.meta}
              </span>
            </div>
            <figcaption className="p-4">
              <p className="font-display text-base font-semibold">{s.title}</p>
              <p className="text-xs text-cream/60">Studio Letícia Fernandes · Feira de Santana</p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
