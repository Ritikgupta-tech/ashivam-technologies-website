import { PrismaClient } from '@prisma/client';

/**
 * Singleton Prisma client.
 *
 * In development, tsx watch can re-execute this module after file changes.
 * The global cache prevents creating multiple Prisma clients and exhausting
 * the PostgreSQL connection pool.
 */

declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  global.__prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn']
        : ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.__prisma = prisma;
}