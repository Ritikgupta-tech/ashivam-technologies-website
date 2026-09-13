import type { Request, Response, NextFunction } from 'express';

/**
 * Minimal bearer-token guard for the admin API. Suitable for a small
 * internal team accessing a handful of endpoints from a trusted admin
 * tool. If real multi-user admin accounts are needed later (per-user
 * login, roles), replace this with the AdminUser model + session/JWT
 * auth described in the project brief — the route handlers themselves
 * won't need to change.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const configuredToken = process.env.ADMIN_API_TOKEN;

  if (!configuredToken) {
    // Fail closed: an unset token means admin routes are disabled
    // entirely rather than silently open.
    res.status(503).json({ message: 'Admin API is not configured.' });
    return;
  }

  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || token !== configuredToken) {
    res.status(401).json({ message: 'Unauthorized.' });
    return;
  }

  next();
}
