import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import multer from 'multer';
import { Prisma } from '@prisma/client';
import { careerApplicationPayloadSchema } from '../lib/validation.js';
import { sendEmail } from '../services/mailer.js';
import { prisma } from '../lib/prisma.js';
import { resumeKeyFor, resumeUpload, resumeUrlFor, saveResume } from '../lib/upload.js';

export const careersRouter = Router();

/**
 * The form is submitted as multipart/form-data (text fields + an
 * optional `resume` file) rather than JSON, so the resumeUpload.single()
 * middleware runs first and populates req.body (text fields) and
 * req.file (the resume, if provided).
 */
careersRouter.post(
  '/apply',
  (req, res, next) => {
    resumeUpload.single('resume')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        const message =
          err.code === 'LIMIT_FILE_SIZE'
            ? 'Resume must be under 5MB.'
            : 'There was a problem with the uploaded file.';
        res.status(400).json({ message });
        return;
      }
      if (err) {
        // Thrown by the fileFilter in lib/upload.ts for a disallowed type.
        res.status(400).json({ message: 'Resume must be a PDF or Word document.' });
        return;
      }
      next();
    });
  },
  async (req, res) => {
    const parsed = careerApplicationPayloadSchema.safeParse(req.body);

    if (!parsed.success) {
      // Multer is configured with memoryStorage — nothing was ever
      // written to disk/object storage for this request, so there is
      // nothing to clean up here.
      res.status(400).json({ message: 'Please check the form for errors and try again.' });
      return;
    }

    const data = parsed.data;

    if (data.companyWebsite) {
      res.status(200).json({ message: 'Application received.' });
      return;
    }

    // Computed up front (no I/O yet) so the same value can both be
    // written into the create payload below and compared against the
    // row the upsert returns, to detect a retried/duplicate request.
    const resumeKey = req.file ? resumeKeyFor(req.file.originalname) : null;
    const resumeUrl = resumeKey ? resumeUrlFor(resumeKey) : null;

    try {
      const application = await prisma.careerApplication.upsert({
        where: {
          idempotencyKey: data.idempotencyKey ?? `no-key:${randomUUID()}`,
        },
        update: {},
        create: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          role: data.role,
          linkedin: data.linkedin || null,
          github: data.github || null,
          message: data.message || null,
          idempotencyKey: data.idempotencyKey ?? null,
          // The admin API serves the file back out through this path —
          // it is never exposed as a public static URL, since resumes
          // contain personal data. See routes/admin.ts.
          resumeUrl,
          resumeFileName: req.file ? req.file.originalname : null,
        },
      });

      // Only hand the file to the active storage provider once we know
      // this request is the one that actually created the row — a
      // retried/duplicate request's upsert left the row untouched via
      // `update: {}`, so its resumeUrl won't match the key generated
      // above, and a newly-uploaded file (if any) has nothing to
      // attach to and is simply never persisted anywhere.
      if (req.file && resumeKey && application.resumeUrl === resumeUrl) {
        await saveResume(resumeKey, req.file.buffer);
      }

      try {
        const toEmail = process.env.CONTACT_TO_EMAIL || 'teamashivam@gmail.com';
        const fromEmail = process.env.CONTACT_FROM_EMAIL || 'no-reply@ashivam.com';

        await sendEmail({
          to: toEmail,
          from: fromEmail,
          replyTo: data.email,
          subject: `New application — ${data.role}`,
          text: [
            `Application ID: ${application.id}`,
            `Name: ${data.fullName}`,
            `Email: ${data.email}`,
            `Phone: ${data.phone}`,
            `Role: ${data.role}`,
            `LinkedIn: ${data.linkedin || 'Not provided'}`,
            `GitHub: ${data.github || 'Not provided'}`,
            `Resume: ${application.resumeFileName || 'Not provided'}`,
            '',
            'Message:',
            data.message || 'Not provided',
          ].join('\n'),
        });
      } catch (emailError) {
        console.error('[careers] email notification failed (application already persisted):', emailError);
      }

      res.status(200).json({ message: 'Application received.' });
    } catch (error) {
      // Nothing was written to storage yet at this point either — the
      // file is only ever persisted after a successful upsert above —
      // so there is nothing to clean up on a database error.
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        res.status(200).json({ message: 'Application received.' });
        return;
      }
      console.error('[careers] failed to persist application:', error);
      res.status(500).json({ message: 'Something went wrong on our end. Please try again shortly.' });
    }
  },
);
