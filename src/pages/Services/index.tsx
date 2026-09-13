import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceExplorer } from '@/components/sections/ServiceExplorer';
import { Container } from '@/components/ui/Container';
import { breadcrumbSchema } from '@/lib/structuredData';

export function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        description="Software development, web and mobile applications, ERP systems, AI & automation, and UI/UX design — explore what Ashivam Technologies builds."
        path="/services"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        title="Services"
        description="Eight areas of focus, grouped into three disciplines. Select one to see capabilities, technologies, and what it's built to solve."
      />
      <section className="section">
        <Container>
          <ServiceExplorer />
        </Container>
      </section>
    </>
  );
}
