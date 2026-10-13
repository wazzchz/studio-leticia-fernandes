import { z } from 'zod';
import { SERVICE_IDS } from '../data/services.js';
import { isInBookingWindow, isSunday, parseLocalDate } from '../utils/dates.js';
import { isBlockedName } from '../utils/profanity.js';

/**
 * Strict booking schema — Senior grade:
 * - type coercion denied (strict strings), formats enforced by regex
 * - name: letters-only + profanity filter (refine → 400)
 * - phone: 10–11 digits (BR with DDD)
 * - date: real calendar date + 30-day window + no Sundays
 * - time: HH:MM + business hours 08:00–19:00
 */
export const bookingSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório.' })
    .trim()
    .min(2, 'Informe seu nome (mín. 2 letras).')
    .max(80, 'Nome muito longo (máx. 80).')
    .regex(/^[\p{L}\p{M} .'\-]+$/u, 'Use apenas letras e espaços no nome.')
    .refine((v) => !isBlockedName(v), 'Esse nome não é aceito. Use seu nome real. 💅'),
  phone: z
    .string({ required_error: 'WhatsApp é obrigatório.' })
    .trim()
    .transform((v) => v.replace(/\D/g, ''))
    .pipe(z.string().regex(/^\d{10,11}$/, 'Informe um WhatsApp válido com DDD.')),
  serviceId: z.enum(SERVICE_IDS as unknown as [string, ...string[]], {
    errorMap: () => ({ message: 'Escolha um serviço válido.' }),
  }),
  date: z
    .string({ required_error: 'Data é obrigatória.' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data inválida (use AAAA-MM-DD).')
    .refine((v) => parseLocalDate(v) !== null, 'Data inexistente no calendário.')
    .refine((v) => isInBookingWindow(v), 'Escolha uma data de hoje até +30 dias.')
    .refine((v) => !isSunday(v), 'Fechamos aos domingos. Escolha outro dia. 🤍'),
  time: z
    .string({ required_error: 'Horário é obrigatório.' })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Horário inválido (use HH:MM).')
    .refine((v) => {
      const [h, m] = v.split(':').map(Number);
      const mins = h * 60 + m;
      return mins >= 8 * 60 && mins <= 19 * 60;
    }, 'Horário entre 08:00 e 19:00.'),
  notes: z
    .string()
    .trim()
    .max(300, 'Observação muito longa (máx. 300).')
    .optional()
    .default(''),
});

export type BookingInput = z.infer<typeof bookingSchema>;
