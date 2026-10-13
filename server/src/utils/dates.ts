/** Dynamic Date Validation Engine — today <= date <= today + 30 days. */
export const MAX_ADVANCE_DAYS = 30;

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
  d.setDate(d.getDate() + MAX_ADVANCE_DAYS);
  return toISODate(d);
}

export function parseLocalDate(iso: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  if (Number.isNaN(dt.getTime())) return null;
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
  return dt;
}

export function isInBookingWindow(iso: string): boolean {
  const dt = parseLocalDate(iso);
  if (!dt) return false;
  return iso >= todayISO() && iso <= maxDateISO();
}

/** Sunday (0) = closed. */
export function isSunday(iso: string): boolean {
  const dt = parseLocalDate(iso);
  return dt ? dt.getDay() === 0 : false;
}
