import type { Request, Response, NextFunction } from 'express';

/**
 * Minimal in-memory rate limiter, sufficient for a single-instance
 * deployment. For multi-instance deployments (Render, Railway with
 * multiple replicas), replace the Map below with a Redis-backed store —
 * the middleware signature stays the same.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const requestLog = new Map<string, number[]>();

export function rateLimit(req: Request, res: Response, next: NextFunction): void {
  const key = req.ip || 'unknown';
  const now = Date.now();
  const timestamps = (requestLog.get(key) || []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    res.status(429).json({ message: 'Too many requests. Please try again in a minute.' });
    return;
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);
  next();
}
