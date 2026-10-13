import { motion } from 'framer-motion';
import { BadgeCheck, Quote, Star } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Camila R.',
    text: 'A fibra mais natural que já fiz. Curvatura perfeita, zero descolamento em 25 dias. Virei cliente fiel.',
    service: 'Fibra de vidro',
  },
  {
    name: 'Beatriz S.',
    text: 'Atendimento de outro nível: pontual, cuidadoso e o studio é impecável. Minha babyboomer saiu do Pinterest.',
    service: 'Nail art assinatura',
  },
  {
    name: 'Larissa M.',
    text: 'Agendei pelo WhatsApp em 1 minuto. Spa dos pés + esmaltação em gel: melhor investimento do mês.',
    service: 'Spa dos pés',
  },
];

export default function Testimonials() {
  return (
    <section id="avaliacoes" className="mx-auto max-w-5xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20" aria-label="Avaliações">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-deep">03 — Prova social</p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
        5.0 no Google, <span className="text-rose-deep">por um motivo.</span>
      </h2>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-rose/30 bg-white/70 px-4 py-2 text-sm font-semibold backdrop-blur">
        <span className="flex" aria-label="5 de 5 estrelas">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-rose text-rose" aria-hidden="true" />
          ))}
        </span>
        5.0 · 180+ avaliações no Google
        <BadgeCheck className="h-4 w-4 text-green-700" aria-hidden="true" />
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <motion.blockquote
            key={r.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col rounded-2xl border border-ink/8 bg-white/75 p-5 shadow-card backdrop-blur-xl hover:shadow-float"
          >
            <Quote className="h-6 w-6 text-rose" aria-hidden="true" />
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">“{r.text}”</p>
            <footer className="mt-4 border-t border-ink/8 pt-3">
              <p className="text-sm font-bold">{r.name}</p>
              <p className="text-xs text-ink-faint">{r.service} · verificada</p>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
