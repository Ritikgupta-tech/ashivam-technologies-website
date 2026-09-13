import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceExplorer } from '@/components/sections/ServiceExplorer';

export function ServicesSection() {
  return (
    <section className="section">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title="What we build"
            description="Select a capability to see what's included — this isn't a brochure, it's how we actually scope work."
          />
          <Link to="/services" className="link-underline hidden shrink-0 text-sm font-medium sm:block">
            View all services
          </Link>
        </div>
        <div className="mt-12">
          <ServiceExplorer />
        </div>
      </Container>
    </section>
  );
}
