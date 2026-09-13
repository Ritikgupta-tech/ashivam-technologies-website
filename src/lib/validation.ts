import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name.').max(100),
  workEmail: z.string().trim().email('Enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Enter a valid phone number.')
    .max(20)
    .optional()
    .or(z.literal('')),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  service: z.enum(
    [
      'Web Development',
      'Mobile App',
      'Software Development',
      'ERP',
      'AI & Automation',
      'UI/UX',
      'Full Stack',
      'Other',
    ],
    { errorMap: () => ({ message: 'Select a service.' }) },
  ),
  budget: z.string().trim().max(60).optional().or(z.literal('')),
  projectDetails: z
    .string()
    .trim()
    .min(20, 'Add a few more details so we can understand the project (min. 20 characters).')
    .max(4000),
  // Honeypot field — must stay empty. Bots that fill every field trip this.
  companyWebsite: z.string().max(0).optional().or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const careerApplicationSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name.').max(100),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().min(7, 'Enter a valid phone number.').max(20),
  role: z.string().trim().min(1, 'Select the role you are applying for.'),
  linkedin: z.string().trim().url('Enter a valid LinkedIn URL.').optional().or(z.literal('')),
  github: z.string().trim().url('Enter a valid GitHub URL.').optional().or(z.literal('')),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  companyWebsite: z.string().max(0).optional().or(z.literal('')),
});

export type CareerApplicationValues = z.infer<typeof careerApplicationSchema>;
