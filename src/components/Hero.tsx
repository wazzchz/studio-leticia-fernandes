import { motion } from 'framer-motion';
import { ArrowDown, CalendarCheck, MapPin, MessageCircle, Star } from 'lucide-react';
import { STUDIO } from '../lib/config';

export default function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6 sm:pt-36" aria-label="Apresentação">
      {/* ambient editorial blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-blush-soft/70 via-rose-faint/50 to-transparent blur-3xl" />
        <div className="absolute -right-24 top-40 h-64 w-64 rounded-full bg-rose/15 blur-3xl" />
        <div className="absolute -left-24 top-64 h-64 w-64 rounded-full bg-blush/25 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose/40 bg-white/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-rose-deep" aria-hidden="true" />
              {STUDIO.city}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream">
              <Star className="h-3.5 w-3.5 fill-rose text-rose" aria-hidden="true" />
              Google {STUDIO.rating} ★★★★★
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.2rem]"
          >
            Unhas que vestem
            <br />
            <span className="bg-gradient-to-r from-rose-deep via-[#B76E5B] to-blush bg-clip-text font-extrabold text-transparent">
              autoestima.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-lg"
          >
            Manicure de precisão, alongamento em gel & fibra e nail art autoral —
            atendimento boutique no coração de Feira de Santana. Escolha o serviço,
            pick a data e confirme no WhatsApp em menos de 30 segundos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.a
              href="#agendar"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-[15px] font-semibold text-cream shadow-float transition-colors hover:bg-charcoal-soft"
            >
              <MessageCircle className="h-5 w-5 text-rose-soft" aria-hidden="true" />
              Agendar pelo WhatsApp
            </motion.a>
            <motion.a
              href="#servicos"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/70 px-7 py-4 text-[15px] font-semibold text-ink backdrop-blur transition-colors hover:border-rose/50 hover:bg-rose-faint"
            >
              <CalendarCheck className="h-5 w-5 text-rose-deep" aria-hidden="true" />
              Ver catálogo
            </motion.a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-ink/10 pt-6"
          >
            {[
              ['+2,4 mil', 'atendimentos'],
              ['5.0 ★', 'nota no Google'],
              ['30 dias', 'agenda aberta'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-xl font-semibold sm:text-2xl">{v}</dd>
                <dd className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Editorial visual card */}
        <motion.aside
          initial={{ opacity: 0, y: 26, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm"
          aria-label="Destaque editorial do studio"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-rose/30 via-blush/20 to-transparent blur-2xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[1.8rem] border border-white/60 bg-white/75 shadow-float backdrop-blur-xl">
            <div className="relative bg-gradient-to-br from-charcoal via-ink-soft to-rose-deep p-7 text-cream">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-soft">
                N° 01 — Editorial de unhas
              </p>
              <p className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight">
                Almond, coffin,
                <br />
                babyboomer & aura.
              </p>
              <div className="mt-5 flex items-end justify-between">
                <div className="flex -space-x-2" aria-hidden="true">
                  {['LF', 'AM', 'BR', '+'].map((t, i) => (
                    <span
                      key={t}
                      className={`grid h-9 w-9 place-items-center rounded-full border-2 border-charcoal text-[11px] font-bold ${
                        i === 3 ? 'bg-rose text-ink' : 'bg-cream/15 text-cream backdrop-blur'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-right text-xs leading-tight text-cream/80">
                  Seg–Sáb
                  <br />
                  <span className="font-semibold text-cream">08:00–19:00</span>
                </p>
              </div>
              {/* decorative nails */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gradient-to-br from-rose-soft/50 to-transparent blur-xl" aria-hidden="true" />
            </div>
            <div className="space-y-3 p-5">
              {[
                ['Fibra de vidro', '2h30 · R$ 189'],
                ['Nail art assinatura', '2h00 · R$ 149'],
                ['Spa dos pés completo', '1h20 · R$ 85'],
              ].map(([n, d]) => (
                <div key={n} className="flex items-center justify-between rounded-xl border border-ink/8 bg-cream px-4 py-3">
                  <span className="text-sm font-semibold">{n}</span>
                  <span className="text-xs font-medium text-ink-faint">{d}</span>
                </div>
              ))}
              <motion.a
                href="#agendar"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-charcoal-soft"
              >
                Reservar meu horário <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
