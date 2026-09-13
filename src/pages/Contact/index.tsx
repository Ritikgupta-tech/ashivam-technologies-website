import type { ReactNode } from 'react';
import { Mail, Linkedin, Github, Instagram, MapPin } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { ContactForm } from '@/components/sections/ContactForm';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { company } from '@/data/company';
import { breadcrumbSchema } from '@/lib/structuredData';

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Have a problem worth solving? Tell us about your project and we'll get back to you shortly. Ashivam Technologies is based in Agra, India."
        path="/contact"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <section className="section">
        <Container>
          <div className="mb-12">
            <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
          </div>

          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h1 className="max-w-md text-4xl font-semibold tracking-tight md:text-5xl">
                Have a problem worth solving?
              </h1>
              <p className="mt-6 max-w-sm text-lg text-slate-600">
                Share a few details about your project and our team will follow up within one
                business day.
              </p>

              <div className="mt-10 space-y-7 border-t border-line pt-10">
                <ContactChannel
                  icon={<Mail size={18} aria-hidden="true" />}
                  label="Email"
                  value={company.email}
                  href={`mailto:${company.email}`}
                />
                <ContactChannel
                  icon={<Linkedin size={18} aria-hidden="true" />}
                  label="LinkedIn"
                  value="linkedin.com/company/ashivam"
                  href={company.social.linkedin}
                  external
                />
                <ContactChannel
                  icon={<Github size={18} aria-hidden="true" />}
                  label="GitHub"
                  value="github.com/AshivamTech"
                  href={company.social.github}
                  external
                />
                <ContactChannel
                  icon={<Instagram size={18} aria-hidden="true" />}
                  label="Instagram"
                  value="instagram.com/ashivamtech"
                  href={company.social.instagram}
                  external
                />
                <ContactChannel
                  icon={<MapPin size={18} aria-hidden="true" />}
                  label="Location"
                  value={company.location.display}
                />
              </div>

              <p className="mt-8 text-sm text-slate-600">
                Prefer to see more of our work first?{' '}
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="link-underline">
                  Visit ashivam.com
                </a>
                .
              </p>
            </div>

            <div className="card">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactChannel({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface text-ink">
        {icon}
      </span>
      <div>
        <p className="text-sm text-slate-600">{label}</p>
        <p className="font-medium text-ink">{value}</p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      {content}
    </a>
  );
}
