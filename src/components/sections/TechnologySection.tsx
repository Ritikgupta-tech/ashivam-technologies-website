import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { technologies } from '@/data/technologies';

export function TechnologySection() {
  return (
    <section className="section section-dark">
      <Container>
        <SectionHeading
          tone="dark"
          title="The technology we build with"
          description="A focused, well-supported toolset — chosen for reliability over novelty."
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {technologies.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium uppercase tracking-[0.08em] text-signal/80">{group.category}</h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 font-mono text-sm text-ink">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-sky" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
