import type { BookingPayload } from '../types';
import { API_BASE } from '../lib/config';

export interface ApiBookingResponse {
  ok: boolean;
  bookingId?: string;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
}

/** POST /api/bookings — valida no backend antes de abrir o WhatsApp. */
export async function submitBooking(payload: BookingPayload): Promise<ApiBookingResponse> {
  try {
    const res = await fetch(`${API_BASE}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => null)) as ApiBookingResponse | null;
    if (!data) return { ok: false, message: 'Resposta inválida do servidor.' };
    return data;
  } catch {
    // Backend offline (preview estático): permite fallback direto p/ WhatsApp.
    return { ok: true, message: 'offline-fallback' };
  }
}
