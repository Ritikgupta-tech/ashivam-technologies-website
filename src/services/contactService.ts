import { siteConfig } from '@/config/site';
import type { ContactFormValues } from '@/lib/validation';

export interface SubmitResult {
  success: boolean;
  message: string;
}

/**
 * Thin abstraction over the contact API so the transport (fetch to our
 * own Express endpoint, which in turn talks to Resend/SendGrid/SMTP) can
 * change without touching any form component.
 */
export async function submitContactForm(
  values: ContactFormValues,
  idempotencyKey: string,
): Promise<SubmitResult> {
  try {
    const response = await fetch(siteConfig.contactApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, idempotencyKey }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return {
        success: false,
        message: body?.message || 'Something went wrong sending your message. Please try again.',
      };
    }

    return { success: true, message: "Thanks — we've received your message and will be in touch shortly." };
  } catch {
    return {
      success: false,
      message: 'We could not reach the server. Check your connection and try again.',
    };
  }
}
