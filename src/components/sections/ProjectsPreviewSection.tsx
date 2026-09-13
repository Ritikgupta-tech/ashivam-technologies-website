import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';

export function ProjectsPreviewSection() {
  return (
    <section className="section section-surface">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title="Featured project concepts"
            description="A concrete look at the kind of systems we build. Real case studies are published as projects are approved for release."
          />
          <Link to="/projects" className="link-underline hidden shrink-0 text-sm font-medium sm:block">
            View all projects
          </Link>
        </div>
        <div className="mt-10">
          <ProjectShowcase />
        </div>
      </Container>
    </section>
  );
}
