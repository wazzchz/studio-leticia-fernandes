import type { RequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

/** Whitelisted frontend origins — strict CORS. */
const ALLOWED_ORIGINS = (process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

export const corsMiddleware = cors({
  origin: (origin, cb) => {
    // Allow same-origin / curl / health checks without Origin header
    if (!origin) return cb(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error('CORS: origin not allowed'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  maxAge: 600,
});

export const helmetMiddleware = helmet({
  // HSTS (preload-ready), noSniff, frameguard, strict CSP
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'", ...ALLOWED_ORIGINS],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false, // keep Vite preview compatible
});

/** Max 5 requests/min per IP on public endpoints (spam/DoS guard). */
export const publicRateLimit = rateLimit({
  windowMs: 60_000,
  max: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, message: 'Muitas tentativas. Aguarde 1 minuto e tente de novo.' },
  // Skip preflight
  skip: (req) => req.method === 'OPTIONS',
});

/** Body-size + shape guard before Zod (defense in depth). */
export const bodyGuard: RequestHandler = (req, _res, next) => {
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 10) {
    return next(new Error('Payload rejeitado: muitos campos.'));
  }
  next();
};
