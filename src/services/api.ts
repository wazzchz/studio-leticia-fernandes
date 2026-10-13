import type { BookingPayload } from '../types';
import { API_BASE } from '../lib/config';

export interface ApiBookingResponse {
  ok: boolean;
  bookingId?: string;
  message?: string;
  errors?: Array<{ field: string; message: string }>;
}

export interface StudioSettings {
  whatsappNumber: string;
  whatsappDisplay: string;
}

/** GET /api/settings — número oficial do studio (fallback local se a API estiver fora). */
export async function fetchSettings(): Promise<StudioSettings | null> {
  try {
    const res = await fetch(`${API_BASE}/api/settings`);
    if (!res.ok) return null;
    const data = (await res.json().catch(() => null)) as {
      whatsappNumber?: unknown;
      whatsappDisplay?: unknown;
    } | null;
    if (data && typeof data.whatsappNumber === 'string' && /^\d{10,13}$/.test(data.whatsappNumber)) {
      return {
        whatsappNumber: data.whatsappNumber,
        whatsappDisplay:
          typeof data.whatsappDisplay === 'string' && data.whatsappDisplay
            ? data.whatsappDisplay
            : data.whatsappNumber,
      };
    }
    return null;
  } catch {
    return null;
  }
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
