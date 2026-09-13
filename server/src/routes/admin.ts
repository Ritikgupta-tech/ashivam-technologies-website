import { Router } from 'express';
import path from 'node:path';
import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import { leadStatusUpdateSchema, applicationStatusUpdateSchema } from '../lib/validation.js';
import { isSafeResumeKey, readResume, resumeUrlFor } from '../lib/upload.js';

export const adminRouter = Router();

const PAGE_SIZE = 50;

function parsePage(value: unknown): number {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

// GET /api/admin/leads?page=1
adminRouter.get('/leads', async (req, res) => {
  const page = parsePage(req.query.page);

  const [leads, total] = await Promise.all([
    prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.contactInquiry.count(),
  ]);

  res.json({ data: leads, page, pageSize: PAGE_SIZE, total });
});

// GET /api/admin/applications?page=1
adminRouter.get('/applications', async (req, res) => {
  const page = parsePage(req.query.page);

  const [applications, total] = await Promise.all([
    prisma.careerApplication.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.careerApplication.count(),
  ]);

  res.json({ data: applications, page, pageSize: PAGE_SIZE, total });
});

// PATCH /api/admin/leads/:id  { status }
adminRouter.patch('/leads/:id', async (req, res) => {
  const parsed = leadStatusUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid status value.' });
    return;
  }

  try {
    const lead = await prisma.contactInquiry.update({
      where: { id: req.params.id },
      data: { status: parsed.data.status },
    });
    res.json({ data: lead });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Lead not found.' });
      return;
    }
    console.error('[admin] failed to update lead:', error);
    res.status(500).json({ message: 'Something went wrong on our end.' });
  }
});

// PATCH /api/admin/applications/:id  { status }
adminRouter.patch('/applications/:id', async (req, res) => {
  const parsed = applicationStatusUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid status value.' });
    return;
  }

  try {
    const application = await prisma.careerApplication.update({
      where: { id: req.params.id },
      data: { status: parsed.data.status },
    });
    res.json({ data: application });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ message: 'Application not found.' });
      return;
    }
    console.error('[admin] failed to update application:', error);
    res.status(500).json({ message: 'Something went wrong on our end.' });
  }
});

// GET /api/admin/resumes/:filename
//
// Resumes are never served as public static files (they contain
// applicants' personal data) — this route sits behind the same
// requireAdmin bearer-token guard as the rest of /api/admin/*, and
// reads through the storage abstraction in lib/upload.ts so it works
// unchanged regardless of which STORAGE_PROVIDER ("local", "cloudinary",
// or "s3") is active.
adminRouter.get('/resumes/:filename', async (req, res) => {
  const { filename: key } = req.params;

  if (!isSafeResumeKey(key)) {
    res.status(400).json({ message: 'Invalid file reference.' });
    return;
  }

  const application = await prisma.careerApplication.findFirst({
    where: { resumeUrl: resumeUrlFor(key) },
  });

  if (!application) {
    // No CareerApplication row references this key at all — either a
    // stale/incorrect link or a guessed filename. Distinct from the
    // case below (row exists, but the file itself is gone).
    console.warn('[admin] resume download: no application references key', key);
    res.status(404).json({ message: 'File not found.' });
    return;
  }

  try {
    const buffer = await readResume(key);
    const downloadName = (application.resumeFileName || key).replace(/"/g, '');
    res.setHeader('Content-Disposition', `attachment; filename="${downloadName}"`);
    res.type(path.extname(key) || 'application/octet-stream');
    res.send(buffer);
  } catch (error) {
    // The DB row exists, but the active storage provider doesn't have
    // the file. In production this almost always means the resume was
    // uploaded while STORAGE_PROVIDER=local on Render's ephemeral disk
    // and was wiped by a later deploy/restart — the application needs
    // to re-upload their resume; this is a real 404, not a routing bug.
    console.error(
      `[admin] resume record found (application ${application.id}) but the file is unreadable from storage (key: ${key}):`,
      error,
    );
    res.status(404).json({ message: 'This resume file is no longer available. The applicant may need to resubmit it.' });
  }
});
