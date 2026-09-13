import type { ReactNode } from 'react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { company } from '@/data/company';

export function PrivacyPolicyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="How Ashivam Technologies collects, uses and protects information submitted through this website."
        path="/privacy-policy"
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
        title="Privacy Policy"
        description="Last updated: September 2026"
      />
      <section className="section">
        <Container className="max-w-prose space-y-10">
          <PolicySection title="Overview">
            <p>
              This Privacy Policy explains what information Ashivam Technologies ("we," "us")
              collects through this website, how it is used, and the choices available to you.
              This policy applies to ashivam.com and does not cover third-party sites we may link
              to.
            </p>
          </PolicySection>

          <PolicySection title="Information we collect">
            <p>We collect information in two ways:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Information you provide directly</strong> — such as your name, email
                address, phone number, company, and project details, when you submit the contact
                form, careers application, or email us directly.
              </li>
              <li>
                <strong>Information collected automatically</strong> — such as pages visited and
                general usage patterns, but only if you have accepted analytics cookies via the
                cookie banner. No analytics are loaded before consent is given.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="How we use information">
            <p>Information submitted through this site is used to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Respond to inquiries and project requests</li>
              <li>Evaluate job applications submitted through the careers page</li>
              <li>Understand how the website is used, in order to improve it (only with consent)</li>
            </ul>
            <p>We do not sell personal information to third parties.</p>
          </PolicySection>

          <PolicySection title="Cookies">
            <p>
              This site uses a cookie consent banner to gate optional analytics cookies. You can
              decline analytics cookies and continue to use the site normally. Essential cookies
              required for basic site functionality may still be used.
            </p>
          </PolicySection>

          <PolicySection title="Data retention">
            <p>
              Information submitted through contact and career forms is retained only as long as
              necessary to respond to your inquiry or process your application, unless a longer
              retention period is required by law.
            </p>
          </PolicySection>

          <PolicySection title="Your rights">
            <p>
              You may request access to, correction of, or deletion of personal information you
              have submitted to us by emailing{' '}
              <a href={`mailto:${company.email}`} className="link-underline">
                {company.email}
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection title="Contact">
            <p>
              Questions about this policy can be directed to{' '}
              <a href={`mailto:${company.email}`} className="link-underline">
                {company.email}
              </a>
              .
            </p>
          </PolicySection>
        </Container>
      </section>
    </>
  );
}

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-slate-700">{children}</div>
    </div>
  );
}
