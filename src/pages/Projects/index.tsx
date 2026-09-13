import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';
import { Container } from '@/components/ui/Container';
import { breadcrumbSchema } from '@/lib/structuredData';

export function ProjectsPage() {
  return (
    <>
      <Seo
        title="Featured Project Concepts"
        description="A look at the kind of systems Ashivam Technologies builds, described concretely. Real client case studies are published here once approved for release."
        path="/projects"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
        title="Featured project concepts"
        description="These describe the kind of systems we build — the problem, the approach, and what each is designed to achieve — rather than a named client engagement. Real case studies, with actual outcomes, will replace these as projects are confirmed and approved for public release."
      />
      <section className="section">
        <Container>
          <ProjectShowcase />
        </Container>
      </section>
    </>
  );
}
