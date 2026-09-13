import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { contactRouter } from './routes/contact.js';
import { careersRouter } from './routes/careers.js';
import { adminRouter } from './routes/admin.js';
import { rateLimit } from './middleware/rateLimit.js';
import { requireAdmin } from './middleware/adminAuth.js';
import { prisma } from './lib/prisma.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Comma-separated list of allowed origins, e.g.
// "https://ashivam.com,https://www.ashivam.com". Falls back to the local
// Vite dev server so `npm run dev` + `npm run server` work out of the box.
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server / curl requests with no Origin header,
      // and any origin present in the allow-list.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
  }),
);
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    // Health endpoint stays a safe 200/503 signal only — never leak
    // connection strings or driver error detail to the caller.
    res.status(503).json({ status: 'degraded', database: 'unreachable' });
  }
});

app.use('/api/contact', rateLimit, contactRouter);
app.use('/api/careers', rateLimit, careersRouter);
app.use('/api/admin', requireAdmin, adminRouter);

// Central error handler — never leaks stack traces to the client.
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong on our end. Please try again shortly.' });
});

app.listen(PORT, () => {
  console.log(`Ashivam API server listening on port ${PORT}`);
});

// Close the database pool cleanly on shutdown (important on platforms
// like Render/Railway that send SIGTERM before restarting a container).
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
