import { useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { careerApplicationSchema, type CareerApplicationValues } from '@/lib/validation';
import { jobs } from '@/data/jobs';
import { siteConfig } from '@/config/site';
import { useIdempotencyKey } from '@/lib/idempotency';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function CareerApplicationForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState<string>(
    'Something went wrong submitting your application. Please try again.',
  );
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CareerApplicationValues>({ resolver: zodResolver(careerApplicationSchema) });
  const { getKey, rotate } = useIdempotencyKey();

  const onSubmit = async (values: CareerApplicationValues) => {
    if (resumeError) return;

    setStatus('submitting');
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries({ ...values, idempotencyKey: getKey() })) {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      }
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      // No Content-Type header here — the browser sets
      // multipart/form-data with the correct boundary automatically.
      const response = await fetch(siteConfig.careersApiUrl, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setServerMessage(body?.message || 'Something went wrong sending your application. Please try again.');
        throw new Error('failed');
      }
      setStatus('success');
      rotate();
      reset();
      setResumeFile(null);
    } catch {
      setStatus('error');
    }
  };

  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setResumeFile(null);
      setResumeError(null);
      return;
    }
    const isPdfOrDoc = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
    const isUnderLimit = file.size <= 5 * 1024 * 1024;
    if (!isPdfOrDoc) {
      setResumeError('Upload a PDF or Word document.');
      setResumeFile(null);
    } else if (!isUnderLimit) {
      setResumeError('File must be under 5MB.');
      setResumeFile(null);
    } else {
      setResumeError(null);
      setResumeFile(file);
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="card border-signal/30 bg-signal-100 text-center">
        <p className="text-lg font-medium text-signal-600">Application received.</p>
        <p className="mt-2 text-slate-700">
          Thank you for applying — our team will review your application and reach out if there's
          a fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="field-label">Full name</label>
          <input id="fullName" className="field-input" {...register('fullName')} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />
          {errors.fullName && <p id="fullName-error" className="field-error">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="field-label">Email</label>
          <input id="email" type="email" className="field-input" {...register('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
          {errors.email && <p id="email-error" className="field-error">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="field-label">Phone</label>
          <input id="phone" type="tel" className="field-input" {...register('phone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} />
          {errors.phone && <p id="phone-error" className="field-error">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="role" className="field-label">Role</label>
          <select id="role" className="field-input" {...register('role')} aria-invalid={!!errors.role} aria-describedby={errors.role ? 'role-error' : undefined}>
            <option value="">Select a role</option>
            {jobs.map((job) => (
              <option key={job.slug} value={job.title}>{job.title}</option>
            ))}
          </select>
          {errors.role && <p id="role-error" className="field-error">{errors.role.message}</p>}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="linkedin" className="field-label">LinkedIn (optional)</label>
          <input id="linkedin" type="url" placeholder="https://linkedin.com/in/..." className="field-input" {...register('linkedin')} aria-invalid={!!errors.linkedin} aria-describedby={errors.linkedin ? 'linkedin-error' : undefined} />
          {errors.linkedin && <p id="linkedin-error" className="field-error">{errors.linkedin.message}</p>}
        </div>
        <div>
          <label htmlFor="github" className="field-label">GitHub (optional)</label>
          <input id="github" type="url" placeholder="https://github.com/..." className="field-input" {...register('github')} aria-invalid={!!errors.github} aria-describedby={errors.github ? 'github-error' : undefined} />
          {errors.github && <p id="github-error" className="field-error">{errors.github.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="resume" className="field-label">Resume (PDF or Word, max 5MB)</label>
        <input
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeChange}
          className="field-input file:mr-4 file:rounded file:border-0 file:bg-surface file:px-4 file:py-2 file:text-sm file:font-medium"
          aria-describedby={resumeError ? 'resume-error' : undefined}
        />
        {resumeError && <p id="resume-error" className="field-error">{resumeError}</p>}
      </div>

      <div>
        <label htmlFor="message" className="field-label">Message (optional)</label>
        <textarea id="message" rows={4} className="field-input" {...register('message')} />
      </div>

      {/* Honeypot field for spam bots — hidden from real users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="companyWebsite">Leave this field empty</label>
        <input id="companyWebsite" tabIndex={-1} autoComplete="off" {...register('companyWebsite')} />
      </div>

      {status === 'error' && (
        <p role="alert" className="field-error">
          {serverMessage}
        </p>
      )}

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting...' : 'Submit application'}
      </button>
    </form>
  );
}
