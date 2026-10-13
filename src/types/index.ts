export type ServiceCategory =
  | 'Manicure & Esmaltação'
  | 'Alongamento em Gel / Fibra'
  | 'Nail Art Exclusiva'
  | 'Spa dos Pés';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  durationMin: number;
  priceCents: number;
  tag?: 'Mais pedida' | 'Novidade' | 'Premium' | 'Express';
  gradient: string;
  initials: string;
}

export interface BookingPayload {
  name: string;
  phone: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM 24h
  notes?: string;
}

export interface BookingValidationError {
  field: string;
  message: string;
}
