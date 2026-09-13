import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IndustriesExplorer } from '@/components/sections/IndustriesExplorer';

export function IndustriesSection() {
  return (
    <section className="section">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title="Technology patterns for modern industries" />
          <Link to="/industries" className="link-underline hidden shrink-0 text-sm font-medium sm:block">
            See all industries
          </Link>
        </div>
        <div className="mt-10">
          <IndustriesExplorer />
        </div>
      </Container>
    </section>
  );
}
