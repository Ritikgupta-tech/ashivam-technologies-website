import { Link } from 'react-router-dom';
import { Linkedin, Github, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { footerLinks } from '@/config/site';
import { company } from '@/data/company';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-dark">
      <Container className="py-16 md:py-20">
        {/* Large closing statement */}
        <div className="flex flex-col gap-8 border-b border-ink/10 pb-14 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-lg text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-5xl">
            Have an idea?
            <br />
            Let&rsquo;s make it real.
          </h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3.5 text-ink transition-colors hover:border-signal hover:text-signal"
          >
            Start a Project
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-12 pt-14 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5" aria-label="Ashivam Technologies — homepage">
              <img src="/logo/ashivam-icon.png" alt="" className="h-9 w-auto shrink-0" />
              <span className="font-display text-xl font-semibold text-ink">Ashivam Technologies</span>
            </Link>
            <p className="mt-4 max-w-sm text-ink/60">{company.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={company.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ashivam Technologies on LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-signal hover:text-signal"
              >
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <a
                href={company.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ashivam Technologies on GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-signal hover:text-signal"
              >
                <Github size={18} aria-hidden="true" />
              </a>
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ashivam Technologies on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-signal hover:text-signal"
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a
                href={`mailto:${company.email}`}
                aria-label={`Email ${company.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-signal hover:text-signal"
              >
                <Mail size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Services" links={footerLinks.services} />
          <FooterColumn title="Solutions" links={footerLinks.solutions} />
          <FooterColumn title="Resources" links={footerLinks.resources} />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink/10 pt-8 text-sm text-ink/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ashivam Technologies. All rights reserved.</p>
          <p>{company.location.display}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-ink">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link to={link.href} className="text-ink/60 hover:text-signal">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
