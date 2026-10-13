import { randomUUID } from 'node:crypto';

/** In-memory store (swap for parameterized SQL in production — see comment). */
export interface StoredBooking {
  id: string;
  name: string;
  phone: string;
  serviceId: string;
  date: string;
  time: string;
  notes: string;
  createdAt: string;
}

const store = new Map<string, StoredBooking>();

export function saveBooking(b: Omit<StoredBooking, 'id' | 'createdAt'>): StoredBooking {
  const row: StoredBooking = {
    ...b,
    id: `LF-${randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
  store.set(row.id, row);
  return row;
}

/*
// PRODUCTION (Postgres, injection-safe — parameterized, never interpolated):
import { sql } from './db.js';
await sql`
  INSERT INTO bookings (name, phone, service_id, date, time, notes)
  VALUES (${b.name}, ${b.phone}, ${b.serviceId}, ${b.date}, ${b.time}, ${b.notes})
`;
*/
