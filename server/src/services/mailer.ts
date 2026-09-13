/**
 * Mailer abstraction.
 *
 * The email provider is selected through the EMAIL_PROVIDER
 * environment variable.
 *
 * Supported providers:
 * - resend
 * - sendgrid
 * - smtp
 *
 * For Resend:
 * 1. Install the package:
 *      npm install resend
 *
 * 2. Add these variables to .env:
 *      EMAIL_PROVIDER=resend
 *      RESEND_API_KEY=your_resend_api_key
 *      CONTACT_FROM_EMAIL=onboarding@resend.dev
 *
 * 3. For production, use a verified domain sender such as:
 *      no-reply@ashivam.com
 */

export interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  text: string;
  replyTo?: string;
}

/**
 * Sends an email using the provider configured in EMAIL_PROVIDER.
 */
export async function sendEmail(
  message: EmailMessage,
): Promise<void> {
  const provider = (
    process.env.EMAIL_PROVIDER || ''
  ).toLowerCase();

  switch (provider) {
    case 'resend':
      return sendViaResend(message);

    case 'sendgrid':
      return sendViaSendGrid(message);

    case 'smtp':
      return sendViaSmtp(message);

    default:
      console.warn(
        '[mailer] No valid EMAIL_PROVIDER configured.',
      );

      console.info('[mailer] Email message:', {
        to: message.to,
        from: message.from,
        subject: message.subject,
        replyTo: message.replyTo,
        text: message.text,
      });

      return;
  }
}

/**
 * Sends email through Resend.
 */
async function sendViaResend(
  message: EmailMessage,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error(
      '[mailer] RESEND_API_KEY is not configured.',
    );
  }

  const { Resend } = await import('resend');

  const resend = new Resend(apiKey);

  const emailPayload = {
    from: message.from,
    to: [message.to],
    subject: message.subject,
    text: message.text,
    ...(message.replyTo
      ? {
          replyTo: message.replyTo,
        }
      : {}),
  };

  const { data, error } = await resend.emails.send(
    emailPayload,
  );

  if (error) {
    console.error(
      '[mailer] Resend email failed:',
      error,
    );

    throw new Error(error.message);
  }

  console.info(
    '[mailer] Email sent successfully through Resend:',
    data?.id || 'no-email-id',
  );
}

/**
 * SendGrid provider placeholder.
 */
async function sendViaSendGrid(
  message: EmailMessage,
): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    throw new Error(
      '[mailer] SENDGRID_API_KEY is not configured.',
    );
  }

  console.warn(
    '[mailer] SendGrid provider is not implemented.',
    {
      to: message.to,
      subject: message.subject,
    },
  );
}

/**
 * SMTP provider placeholder.
 */
async function sendViaSmtp(
  message: EmailMessage,
): Promise<void> {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
  } = process.env;

  if (
    !SMTP_HOST ||
    !SMTP_USER ||
    !SMTP_PASSWORD
  ) {
    throw new Error(
      '[mailer] SMTP credentials are incomplete.',
    );
  }

  console.warn(
    '[mailer] SMTP provider is not implemented.',
    {
      host: SMTP_HOST,
      port: SMTP_PORT || '587',
      to: message.to,
      subject: message.subject,
    },
  );
}