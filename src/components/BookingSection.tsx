import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, MessageCircle, ShieldCheck } from 'lucide-react';
import { SERVICES, serviceById } from '../data/services';
import { STUDIO } from '../lib/config';
import { formatBRL, formatDateLong, maskPhoneBR } from '../lib/format';
import {
  buildWhatsAppURL,
  isSunday,
  maxDateISO,
  timeSlots,
  todayISO,
  validateBooking,
} from '../lib/booking';
import type { BookingPayload } from '../types';
import { submitBooking } from '../services/api';

interface Props {
  preselected: string;
  onSelectService: (id: string) => void;
}

export default function BookingSection({ preselected, onSelectService }: Props) {
  const [form, setForm] = useState<BookingPayload>({
    name: '',
    phone: '',
    serviceId: preselected,
    date: '',
    time: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState('');

  const service = serviceById(form.serviceId || preselected);
  const slots = useMemo(() => timeSlots(), []);
  const min = todayISO();
  const max = maxDateISO();

  // keep preselected service in sync when user clicks "Agendar" on a card
  if (preselected && form.serviceId !== preselected && !form.serviceId) {
    setForm((f) => ({ ...f, serviceId: preselected }));
  }

  const set = (k: keyof BookingPayload, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      const n = { ...e };
      delete n[k];
      return n;
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: BookingPayload = {
      ...form,
      serviceId: form.serviceId || preselected,
      name: form.name.trim(),
      phone: form.phone.trim(),
      notes: form.notes?.trim(),
    };
    const fieldErrors = validateBooking(payload);
    if (fieldErrors.length) {
      setErrors(Object.fromEntries(fieldErrors.map((x) => [x.field, x.message])));
      setStatus('error');
      setServerMsg('Revise os campos destacados.');
      return;
    }
    setStatus('sending');
    setServerMsg('');
    const api = await submitBooking(payload);
    if (!api.ok && api.message !== 'offline-fallback') {
      const map: Record<string, string> = {};
      api.errors?.forEach((x) => (map[x.field] = x.message));
      setErrors(map);
      setStatus('error');
      setServerMsg(api.message || 'Não foi possível validar. Tente novamente.');
      return;
    }
    setStatus('done');
    // Open WhatsApp with the clean encoded string
    window.open(buildWhatsAppURL(payload), '_blank', 'noopener,noreferrer');
  }

  const inputCls = (bad?: string) =>
    `w-full rounded-xl border bg-white/80 px-4 py-3.5 text-[15px] font-medium text-ink placeholder:font-normal placeholder:text-ink-faint/80 backdrop-blur transition focus:border-rose ${
      bad ? 'border-red-400' : 'border-ink/15'
    }`;

  return (
    <section id="agendar" className="mx-auto max-w-5xl scroll-mt-24 px-4 pb-16 sm:px-6" aria-label="Agendamento">
      <div className="overflow-hidden rounded-[1.8rem] border border-ink/10 bg-white/75 shadow-float backdrop-blur-xl">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          {/* Editorial side */}
          <div className="relative bg-ink p-7 text-cream sm:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-soft">
              04 — Reserva instantânea
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Agende em <span className="text-rose-soft">30 segundos.</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/75">
              Escolha o serviço, a data e o horário. A gente valida tudo na hora e abre
              seu WhatsApp com a mensagem pronta — sem cadastro, sem app.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                `Agenda aberta: hoje → +${STUDIO.maxAdvanceDays} dias`,
                'Seg–Sáb · 08:00–19:00 · dom fechado',
                'Confirmação humana no WhatsApp',
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-cream/85">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-open" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
            {service && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-soft">Sua escolha</p>
                <p className="mt-1 font-display text-lg font-semibold">{service.name}</p>
                <p className="text-sm text-cream/70">
                  {formatBRL(service.priceCents)}
                  {form.date && ` · ${formatDateLong(form.date)}`}
                  {form.time && ` · ${form.time}`}
                </p>
              </div>
            )}
            <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-cream/60">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Validado por Zod no servidor · anti-spam · anti-XSS
            </p>
          </div>

          {/* Form side */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4 p-6 sm:p-8" aria-label="Formulário de agendamento">
            <div>
              <label htmlFor="bk-service" className="mb-1.5 block text-sm font-semibold">
                Serviço
              </label>
              <select
                id="bk-service"
                value={form.serviceId || preselected}
                onChange={(e) => {
                  set('serviceId', e.target.value);
                  onSelectService(e.target.value);
                }}
                className={inputCls(errors.serviceId)}
                aria-invalid={!!errors.serviceId}
              >
                <option value="">Selecione…</option>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — {formatBRL(s.priceCents)}
                  </option>
                ))}
              </select>
              {errors.serviceId && <FieldErr msg={errors.serviceId} />}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-name" className="mb-1.5 block text-sm font-semibold">
                  Seu nome
                </label>
                <input
                  id="bk-name"
                  autoComplete="name"
                  maxLength={80}
                  placeholder="Ex.: Maria Silva"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  className={inputCls(errors.name)}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <FieldErr msg={errors.name} />}
              </div>
              <div>
                <label htmlFor="bk-phone" className="mb-1.5 block text-sm font-semibold">
                  WhatsApp
                </label>
                <input
                  id="bk-phone"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(75) 99999-9999"
                  value={form.phone}
                  onChange={(e) => set('phone', maskPhoneBR(e.target.value))}
                  className={inputCls(errors.phone)}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <FieldErr msg={errors.phone} />}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-date" className="mb-1.5 block text-sm font-semibold">
                  Data <span className="font-normal text-ink-faint">(máx. +{STUDIO.maxAdvanceDays} dias)</span>
                </label>
                <input
                  id="bk-date"
                  type="date"
                  min={min}
                  max={max}
                  value={form.date}
                  onChange={(e) => set('date', e.target.value)}
                  className={inputCls(errors.date)}
                  aria-invalid={!!errors.date}
                  aria-describedby="bk-date-hint"
                />
                <p id="bk-date-hint" className="mt-1 text-xs text-ink-faint">
                  {form.date && isSunday(form.date)
                    ? '⛪ Fechamos aos domingos — escolha outro dia.'
                    : `Janela: ${min.split('-').reverse().join('/')} → ${max.split('-').reverse().join('/')}`}
                </p>
                {errors.date && <FieldErr msg={errors.date} />}
              </div>
              <div>
                <label htmlFor="bk-time" className="mb-1.5 block text-sm font-semibold">
                  Horário
                </label>
                <select
                  id="bk-time"
                  value={form.time}
                  onChange={(e) => set('time', e.target.value)}
                  className={inputCls(errors.time)}
                  aria-invalid={!!errors.time}
                >
                  <option value="">Selecione…</option>
                  {slots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.time && <FieldErr msg={errors.time} />}
              </div>
            </div>

            <div>
              <label htmlFor="bk-notes" className="mb-1.5 block text-sm font-semibold">
                Observação <span className="font-normal text-ink-faint">(opcional)</span>
              </label>
              <textarea
                id="bk-notes"
                rows={2}
                maxLength={300}
                placeholder="Ex.: quero almond média com babyboomer…"
                value={form.notes}
                onChange={(e) => set('notes', e.target.value)}
                className={`${inputCls(errors.notes)} resize-none`}
              />
              {errors.notes && <FieldErr msg={errors.notes} />}
            </div>

            <AnimatePresence>
              {serverMsg && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role={status === 'error' ? 'alert' : 'status'}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
                    status === 'error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
                  }`}
                >
                  {status === 'error' ? (
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  )}
                  {serverMsg}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={status === 'sending' ? undefined : { scale: 1.02 }}
              whileTap={status === 'sending' ? undefined : { scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-4 text-[15px] font-bold text-cream shadow-gold transition-colors hover:bg-charcoal-soft disabled:opacity-60"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Validando…
                </>
              ) : (
                <>
                  <MessageCircle className="h-5 w-5 text-rose-soft" aria-hidden="true" /> Confirmar no WhatsApp
                </>
              )}
            </motion.button>
            <p className="text-center text-xs text-ink-faint">
              Ao confirmar você concorda em ser chamada no WhatsApp · {STUDIO.hours}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function FieldErr({ msg }: { msg: string }) {
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-[13px] font-semibold text-red-700">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {msg}
    </p>
  );
}
