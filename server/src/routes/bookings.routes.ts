import { Router } from 'express';
import { bookingSchema } from '../validators/booking.validator.js';
import { sanitizePhone, sanitizeText } from '../utils/sanitize.js';
import { saveBooking } from '../services/booking.service.js';
import { maxDateISO, todayISO } from '../utils/dates.js';

export const bookingsRouter = Router();

/** GET /api/bookings/window — exposes the 30-day rule to the client picker. */
bookingsRouter.get('/window', (_req, res) => {
  res.json({ ok: true, min: todayISO(), max: maxDateISO(), maxAdvanceDays: 30 });
});

/** POST /api/bookings — strict validate → sanitize → store. */
bookingsRouter.post('/', (req, res) => {
  // 1) Pre-sanitize (XSS) before schema — defense in depth
  const raw = req.body ?? {};
  const pre = {
    name: sanitizeText(raw.name, 80),
    phone: sanitizePhone(typeof raw.phone === 'string' ? raw.phone : ''),
    serviceId: typeof raw.serviceId === 'string' ? raw.serviceId.slice(0, 60) : '',
    date: typeof raw.date === 'string' ? raw.date.slice(0, 10) : '',
    time: typeof raw.time === 'string' ? raw.time.slice(0, 5) : '',
    notes: sanitizeText(raw.notes ?? '', 300),
  };

  // 2) Zod strict validation (incl. profanity + 30-day window)
  const parsed = bookingSchema.safeParse(pre);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((i) => ({
      field: String(i.path[0] ?? 'general'),
      message: i.message,
    }));
    return res.status(400).json({
      ok: false,
      message: 'Verifique os dados do agendamento.',
      errors,
    });
  }

  // 3) Store (parameterized-ready) + return clean confirmation
  const saved = saveBooking(parsed.data);
  return res.status(201).json({
    ok: true,
    bookingId: saved.id,
    message: `Recebido, ${saved.name.split(' ')[0]}! Finalize no WhatsApp 🤍`,
    window: { min: todayISO(), max: maxDateISO() },
  });
});
