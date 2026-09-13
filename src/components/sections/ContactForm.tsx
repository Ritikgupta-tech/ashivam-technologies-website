import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormValues } from '@/lib/validation';
import { submitContactForm } from '@/services/contactService';
import { useIdempotencyKey } from '@/lib/idempotency';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const SERVICE_OPTIONS = [
  'Web Development',
  'Mobile App',
  'Software Development',
  'ERP',
  'AI & Automation',
  'UI/UX',
  'Full Stack',
  'Other',
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });
  const { getKey, rotate } = useIdempotencyKey();

  const onSubmit = async (values: ContactFormValues) => {
    setStatus('submitting');
    const result = await submitContactForm(values, getKey());
    setServerMessage(result.message);
    if (result.success) {
      setStatus('success');
      rotate();
      reset();
    } else {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="card border-signal/30 bg-signal-100 text-center">
        <p className="text-lg font-medium text-signal-600">Message sent.</p>
        <p className="mt-2 text-slate-700">{serverMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
      {/* Step 01 */}
      <fieldset>
        <legend className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-signal">01</span>
          <span className="text-lg font-medium text-ink">What are you building?</span>
        </legend>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="service" className="field-label">
              Service
            </label>
            <select
              id="service"
              className="field-input"
              defaultValue=""
              {...register('service')}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? 'service-error' : undefined}
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.service && (
              <p id="service-error" className="field-error">
                {errors.service.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="budget" className="field-label">
              Budget (optional)
            </label>
            <input id="budget" placeholder="e.g. ₹2,00,000 – ₹5,00,000" className="field-input" {...register('budget')} />
          </div>
        </div>
      </fieldset>

      {/* Step 02 */}
      <fieldset className="border-t border-line pt-10">
        <legend className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-signal">02</span>
          <span className="text-lg font-medium text-ink">Who should we get back to?</span>
        </legend>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="field-label">
              Full name
            </label>
            <input
              id="fullName"
              className="field-input"
              {...register('fullName')}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && (
              <p id="fullName-error" className="field-error">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="workEmail" className="field-label">
              Work email
            </label>
            <input
              id="workEmail"
              type="email"
              className="field-input"
              {...register('workEmail')}
              aria-invalid={!!errors.workEmail}
              aria-describedby={errors.workEmail ? 'workEmail-error' : undefined}
            />
            {errors.workEmail && (
              <p id="workEmail-error" className="field-error">
                {errors.workEmail.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="field-label">
              Phone (optional)
            </label>
            <input id="phone" type="tel" className="field-input" {...register('phone')} />
          </div>
          <div>
            <label htmlFor="company" className="field-label">
              Company (optional)
            </label>
            <input id="company" className="field-input" {...register('company')} />
          </div>
        </div>
      </fieldset>

      {/* Step 03 */}
      <fieldset className="border-t border-line pt-10">
        <legend className="flex items-baseline gap-3">
          <span className="font-mono text-sm text-signal">03</span>
          <span className="text-lg font-medium text-ink">Tell us about the project</span>
        </legend>
        <div className="mt-5">
          <label htmlFor="projectDetails" className="field-label">
            Project details
          </label>
          <textarea
            id="projectDetails"
            rows={6}
            className="field-input"
            placeholder="What are you trying to build, and what problem should it solve?"
            {...register('projectDetails')}
            aria-invalid={!!errors.projectDetails}
            aria-describedby={errors.projectDetails ? 'projectDetails-error' : undefined}
          />
          {errors.projectDetails && (
            <p id="projectDetails-error" className="field-error">
              {errors.projectDetails.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* Honeypot field for spam bots — visually and semantically hidden from real users */}
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
        {status === 'submitting' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
