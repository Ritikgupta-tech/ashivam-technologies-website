import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import { Prisma } from '@prisma/client';
import { contactPayloadSchema } from '../lib/validation.js';
import { sendEmail } from '../services/mailer.js';
import { prisma } from '../lib/prisma.js';

export const contactRouter = Router();

contactRouter.post('/', async (req, res) => {
  const parsed = contactPayloadSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ message: 'Please check the form for errors and try again.' });
    return;
  }

  const data = parsed.data;

  // Honeypot tripped — silently accept without persisting or sending,
  // so bots don't learn their submission was rejected.
  if (data.companyWebsite) {
    res.status(200).json({ message: "Thanks — we've received your message." });
    return;
  }

  try {
    // Database persistence is the source of truth. This happens before
    // any email attempt — if the mail provider is down or unconfigured,
    // the inquiry is still safely stored and visible to admin tooling.
    const inquiry = await prisma.contactInquiry.upsert({
      where: {
        // A shared placeholder key would collide across every submission
        // that omits idempotencyKey, so route those through a per-request
        // key that can never collide instead of the unique column.
        idempotencyKey: data.idempotencyKey ?? `no-key:${randomUUID()}`,
      },
      update: {},
      create: {
        fullName: data.fullName,
        workEmail: data.workEmail,
        phone: data.phone || null,
        company: data.company || null,
        service: data.service,
        budget: data.budget || null,
        projectDetails: data.projectDetails,
        idempotencyKey: data.idempotencyKey ?? null,
      },
    });

    // Email is a best-effort secondary notification. A failure here must
    // never surface as a failure to the person submitting the form — the
    // record above is already durably stored.
    try {
      const toEmail = process.env.CONTACT_TO_EMAIL || 'teamashivam@gmail.com';
      const fromEmail = process.env.CONTACT_FROM_EMAIL || 'no-reply@ashivam.com';

      await sendEmail({
        to: toEmail,
        from: fromEmail,
        replyTo: data.workEmail,
        subject: `New project inquiry — ${data.service}`,
        text: [
          `Inquiry ID: ${inquiry.id}`,
          `Name: ${data.fullName}`,
          `Email: ${data.workEmail}`,
          `Phone: ${data.phone || 'Not provided'}`,
          `Company: ${data.company || 'Not provided'}`,
          `Service: ${data.service}`,
          `Budget: ${data.budget || 'Not provided'}`,
          '',
          'Project details:',
          data.projectDetails,
        ].join('\n'),
      });
    } catch (emailError) {
      console.error('[contact] email notification failed (inquiry already persisted):', emailError);
    }

    res.status(200).json({ message: "Thanks — we've received your message and will be in touch shortly." });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      // Unique constraint hit on idempotencyKey — this exact submission
      // was already recorded. Report the same success the original call
      // would have received rather than erroring or duplicating it.
      res.status(200).json({ message: "Thanks — we've received your message and will be in touch shortly." });
      return;
    }
    console.error('[contact] failed to persist inquiry:', error);
    res.status(500).json({ message: 'Something went wrong on our end. Please try again shortly.' });
  }
});
