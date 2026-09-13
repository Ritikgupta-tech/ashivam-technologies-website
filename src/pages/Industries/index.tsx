import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { IndustriesExplorer } from '@/components/sections/IndustriesExplorer';
import { Container } from '@/components/ui/Container';
import { breadcrumbSchema } from '@/lib/structuredData';

export function IndustriesPage() {
  return (
    <>
      <Seo
        title="Industries"
        description="Technology patterns for startups, education, healthcare, e-commerce, finance, manufacturing, professional services, and enterprise."
        path="/industries"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
        ])}
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
        title="Technology patterns for modern industries"
        description="This reflects where our capabilities apply well — not a client history."
      />
      <section className="section">
        <Container>
          <IndustriesExplorer />
        </Container>
      </section>
    </>
  );
}
