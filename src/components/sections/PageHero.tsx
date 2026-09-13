import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-14 pt-12 md:pb-20 md:pt-16">
      <div
        className="pointer-events-none absolute -top-20 right-0 h-[300px] w-[300px] rounded-full bg-signal/[0.08] blur-[100px]"
        aria-hidden="true"
      />
      <Container>
        {breadcrumbs && (
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        {description && <p className="mt-6 max-w-2xl text-lg text-slate-600">{description}</p>}
        {children}
      </Container>
    </section>
  );
}
