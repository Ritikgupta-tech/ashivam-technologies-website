import { z } from 'zod';

export const contactPayloadSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  workEmail: z.string().trim().email(),
  phone: z.string().trim().max(20).optional().or(z.literal('')),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  service: z.enum([
    'Web Development',
    'Mobile App',
    'Software Development',
    'ERP',
    'AI & Automation',
    'UI/UX',
    'Full Stack',
    'Other',
  ]),
  budget: z.string().trim().max(60).optional().or(z.literal('')),
  projectDetails: z.string().trim().min(20).max(4000),
  // Honeypot — must be empty. A filled value indicates a bot.
  companyWebsite: z.string().max(0).optional().or(z.literal('')),
  // Client-generated key, stable across retries of the same form-fill.
  // Lets the server treat a resubmission (e.g. after a network timeout)
  // as a no-op instead of creating a duplicate record.
  idempotencyKey: z.string().trim().min(10).max(100).optional(),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;

export const careerApplicationPayloadSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7).max(20),
  role: z.string().trim().min(1),
  linkedin: z.string().trim().url().optional().or(z.literal('')),
  github: z.string().trim().url().optional().or(z.literal('')),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  companyWebsite: z.string().max(0).optional().or(z.literal('')),
  idempotencyKey: z.string().trim().min(10).max(100).optional(),
});

export type CareerApplicationPayload = z.infer<typeof careerApplicationPayloadSchema>;

export const leadStatusUpdateSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED', 'SPAM']),
});

export const applicationStatusUpdateSchema = z.object({
  status: z.enum(['RECEIVED', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'HIRED']),
});
