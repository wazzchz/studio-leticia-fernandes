import { STUDIO } from './config';
import { serviceById } from '../data/services';
import type { BookingPayload } from '../types';

/* ── Date engine: today <= date <= today+30 (local, no TZ drift) ── */

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function maxDateISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + STUDIO.maxAdvanceDays);
  return toISODate(d);
}

export function isDateInWindow(iso: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  if (Number.isNaN(dt.getTime())) return false;
  // Guard against overflow dates like 2026-02-31
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return false;
  const t = toISODate(new Date());
  const max = maxDateISO();
  return iso >= t && iso <= max;
}

/** Sundays (0) are closed. */
export function isSunday(iso: string): boolean {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).getDay() === 0;
}

/** Business slots 08:00–19:00, every 60 min (grid simplificado). */
export function timeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 8; h <= 18; h++) slots.push(`${String(h).padStart(2, '0')}:00`);
  return slots;
}

export function isValidTime(t: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(t);
}

export function isWithinBusinessHours(t: string): boolean {
  if (!isValidTime(t)) return false;
  const [h, m] = t.split(':').map(Number);
  const mins = h * 60 + m;
  return mins >= 8 * 60 && mins <= 19 * 60;
}

/* ── Client-side validation (mirrors server Zod schema) ── */

export interface FieldError {
  field: keyof BookingPayload | 'date' | 'general';
  message: string;
}

const PROFANITY = [
  'otari', 'idiot', 'imbecil', 'retardad', 'burro', 'trouxa', 'palha',
  'xinga', 'porra', 'caralho', 'merda', 'puta', 'vagabund', 'safad',
  'fuck', 'shit', 'bitch', 'asshole', 'dick',
  'teste fake', 'nome falso', 'fulano de tal', 'asdasd', 'qqq',
];

export function containsProfanity(name: string): boolean {
  const n = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return PROFANITY.some((w) => n.includes(w));
}

export function validateBooking(p: BookingPayload): FieldError[] {
  const errs: FieldError[] = [];
  const name = p.name.trim();
  if (name.length < 2) errs.push({ field: 'name', message: 'Informe seu nome (mín. 2 letras).' });
  else if (name.length > 80) errs.push({ field: 'name', message: 'Nome muito longo (máx. 80).' });
  else if (!/^[\p{L}\p{M} .'\-]+$/u.test(name))
    errs.push({ field: 'name', message: 'Use apenas letras e espaços no nome.' });
  else if (containsProfanity(name))
    errs.push({ field: 'name', message: 'Esse nome não é aceito. Use seu nome real. 💅' });

  const digits = p.phone.replace(/\D/g, '');
  if (!/^\d{10,11}$/.test(digits))
    errs.push({ field: 'phone', message: 'Informe um WhatsApp válido com DDD.' });

  if (!serviceById(p.serviceId)) errs.push({ field: 'serviceId', message: 'Escolha um serviço.' });

  if (!isDateInWindow(p.date))
    errs.push({ field: 'date', message: `Escolha uma data de hoje até +${STUDIO.maxAdvanceDays} dias.` });
  else if (isSunday(p.date))
    errs.push({ field: 'date', message: 'Fechamos aos domingos. Escolha outro dia. 🤍' });

  if (!isWithinBusinessHours(p.time))
    errs.push({ field: 'time', message: 'Horário entre 08:00 e 19:00.' });

  if (p.notes && p.notes.length > 300)
    errs.push({ field: 'notes', message: 'Observação muito longa (máx. 300).' });

  return errs;
}

/* ── WhatsApp serializer ── */

export function buildWhatsAppMessage(p: BookingPayload): string {
  const svc = serviceById(p.serviceId);
  const [y, m, d] = p.date.split('-').map(Number);
  const pretty = new Date(y, m - 1, d).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  const lines = [
    '✨ *NOVO AGENDAMENTO — STUDIO LETÍCIA FERNANDES* ✨',
    '',
    `👤 Nome: ${p.name.trim()}`,
    `📞 Telefone: ${p.phone.trim()}`,
    `💅 Serviço: ${svc ? svc.name : p.serviceId}`,
    `📅 Data: ${pretty}`,
    `⏰ Horário: ${p.time}`,
  ];
  if (p.notes?.trim()) lines.push(`📝 Obs: ${p.notes.trim()}`);
  lines.push('', 'Aguardo confirmação 🤍');
  return lines.join('\n');
}

export function buildWhatsAppURL(p: BookingPayload, number = STUDIO.whatsappNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(buildWhatsAppMessage(p))}`;
}

/* ── Real-time open status (Seg–Sáb 08:00–19:00) ── */
export function studioStatus(now = new Date()): { open: boolean; label: string } {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const open = day !== 0 && mins >= 8 * 60 && mins < 19 * 60;
  return open
    ? { open: true, label: 'Aberto hoje' }
    : { open: false, label: day === 0 ? 'Fechado · dom' : 'Fechado no momento' };
}
