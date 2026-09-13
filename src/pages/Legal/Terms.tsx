import type { ReactNode } from 'react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { company } from '@/data/company';

export function TermsPage() {
  return (
    <>
      <Seo
        title="Terms & Conditions"
        description="Terms governing the use of the Ashivam Technologies website."
        path="/terms-and-conditions"
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]}
        title="Terms & Conditions"
        description="Last updated: September 2026"
      />
      <section className="section">
        <Container className="max-w-prose space-y-10">
          <PolicySection title="Acceptance of terms">
            <p>
              By accessing this website, you agree to these terms and conditions. If you do not
              agree, please do not use this site.
            </p>
          </PolicySection>

          <PolicySection title="Use of this website">
            <p>
              This website is provided for informational purposes about Ashivam Technologies and
              its services. You agree not to misuse the site, including attempting to gain
              unauthorized access to any part of it or its underlying systems.
            </p>
          </PolicySection>

          <PolicySection title="Intellectual property">
            <p>
              All content on this website — including text, graphics, logos and code — is the
              property of Ashivam Technologies unless otherwise noted, and may not be reproduced
              without permission.
            </p>
          </PolicySection>

          <PolicySection title="Submitted information">
            <p>
              Information submitted through the contact or careers forms is used solely for the
              purpose it was submitted for, as described in our{' '}
              <a href="/privacy-policy" className="link-underline">
                Privacy Policy
              </a>
              .
            </p>
          </PolicySection>

          <PolicySection title="No warranty">
            <p>
              This website is provided "as is" without warranties of any kind. While we aim to
              keep information accurate and up to date, we do not guarantee that the site is free
              of errors or uninterrupted.
            </p>
          </PolicySection>

          <PolicySection title="Changes to these terms">
            <p>
              We may update these terms from time to time. Continued use of the site after
              changes constitutes acceptance of the revised terms.
            </p>
          </PolicySection>

          <PolicySection title="Contact">
            <p>
              Questions about these terms can be directed to{' '}
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
