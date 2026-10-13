import { Router } from 'express';

/**
 * GET /api/settings — public studio settings (booking WhatsApp number).
 * Rate-limited like other public endpoints. The number lives in the
 * WHATSAPP_NUMBER env var so it can change without a frontend redeploy.
 */
export const settingsRouter = Router();

function formatDisplay(digits: string): string {
  if (digits.length === 13) return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 9)}-${digits.slice(9)}`;
  if (digits.length === 12) return `+${digits.slice(0, 2)} (${digits.slice(2, 4)}) ${digits.slice(4, 8)}-${digits.slice(8)}`;
  if (digits.length === 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  return digits;
}

settingsRouter.get('/', (_req, res) => {
  const digits = (process.env.WHATSAPP_NUMBER ?? '557583644779').replace(/\D/g, '');
  const display = process.env.WHATSAPP_DISPLAY ?? formatDisplay(digits);
  res.json({ ok: true, whatsappNumber: digits, whatsappDisplay: display });
});
