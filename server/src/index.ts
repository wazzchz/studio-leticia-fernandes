import 'dotenv/config';
import express from 'express';
import {
  bodyGuard,
  corsMiddleware,
  helmetMiddleware,
  publicRateLimit,
} from './middlewares/security.js';
import { bookingsRouter } from './routes/bookings.routes.js';

const app = express();
const PORT = Number(process.env.PORT ?? 3333);

// ── Middleware stack (order matters) ──
app.disable('x-powered-by');
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: '16kb', strict: true }));
app.use(bodyGuard);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'studio-leticia-fernandes', time: new Date().toISOString() });
});

// Public endpoints: rate-limited to 5 req/min per IP
app.use('/api/bookings', publicRateLimit, bookingsRouter);

// 404 + centralized error handler (never leak internals)
app.use((_req, res) => res.status(404).json({ ok: false, message: 'Rota não encontrada.' }));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err.message.startsWith('CORS')) {
    return res.status(403).json({ ok: false, message: 'Origem não autorizada.' });
  }
  return res.status(400).json({ ok: false, message: 'Requisição inválida.' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[api] Studio Letícia Fernandes rodando em http://localhost:${PORT}`);
});
