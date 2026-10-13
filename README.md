# Studio Letícia Fernandes — Manicure & Nail Design · Feira de Santana/BA

Editorial mobile-first + reserva instantânea via WhatsApp. Frontend Vite/React/TS/Tailwind ·
API Express/TS com validação Zod, Helmet, CORS restrito e rate-limit.

## Rodar

```bash
npm install
npm run dev            # http://localhost:5173

cd server && npm install && npm run dev   # http://localhost:3333
```

Ou duplo-clique em `run-dev.cmd`.

## Regras de negócio

- **Janela de agendamento:** `hoje ≤ data ≤ hoje + 30 dias` — validada no date-picker
  (`min`/`max`), no `validateBooking()` do front e no schema Zod do back (`isInBookingWindow`).
- **Domingos fechados**, expediente 08:00–19:00.
- **Filtro de nomes:** profanity/joke filter PT-BR+EN → HTTP 400.
- **XSS:** sanitização `xss` antes do Zod; **CORS whitelist** via `FRONTEND_ORIGIN`;
  **Helmet** (HSTS + CSP estrita); **rate-limit 5 req/min** em `/api/bookings`.
- **WhatsApp:** `buildWhatsAppURL()` serializa serviço+data+hora em string URL-encoded
  (`https://wa.me/<numero>?text=...`). Trocar `STUDIO.whatsappNumber` pelo número oficial.

## Estrutura

```
src/                    # frontend
  components/ Navbar Hero Marquee ServicesCatalog Portfolio Testimonials BookingSection Footer WhatsAppFloat
  data/services.ts      # 12 serviços, 4 categorias
  lib/booking.ts        # date engine + validação + serializer wa.me + status
  lib/format.ts lib/config.ts
  services/api.ts       # POST /api/bookings
server/src/             # backend
  index.ts middlewares/security.ts routes/bookings.routes.ts
  validators/booking.validator.ts utils/{sanitize,profanity,dates}.ts
```
