import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';

interface FinalCtaProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export function FinalCta({
  title = 'Have an idea? Let\u2019s turn it into something real.',
  description = 'Tell us what you\u2019re trying to build and we\u2019ll get back to you within one business day.',
  primaryLabel = 'Start a Project',
  primaryTo = '/contact',
  secondaryLabel = 'Talk to Our Team',
  secondaryTo = '/contact',
}: FinalCtaProps) {
  return (
    <section className="section section-dark">
      <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="max-w-xl text-3xl font-semibold text-ink md:text-4xl">{title}</h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <p className="max-w-xs text-ink/70 sm:hidden">{description}</p>
          <Link to={primaryTo} className="btn-signal">
            {primaryLabel}
          </Link>
          <Link to={secondaryTo} className="btn-on-dark">
            {secondaryLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
