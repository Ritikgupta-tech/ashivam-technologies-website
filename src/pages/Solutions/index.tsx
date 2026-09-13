import { Link } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { solutions } from '@/data/solutions';
import { breadcrumbSchema } from '@/lib/structuredData';

export function SolutionsPage() {
  return (
    <>
      <Seo
        title="Solutions"
        description="Automate operations, modernize legacy systems, launch digital products, and more — framed around the outcome, not the technology."
        path="/solutions"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Solutions', path: '/solutions' },
        ])}
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
        title="Solutions"
        description="Framed around the problem you're solving, not the technology behind it."
      />
      <section className="section">
        <Container>
          <div className="divide-y divide-line border-y border-line">
            {solutions.map((solution) => (
              <div key={solution.slug} id={solution.slug} className="grid gap-6 py-10 scroll-mt-24 md:grid-cols-[0.9fr_2fr]">
                <h2 className="text-2xl font-semibold text-ink">{solution.name}</h2>
                <div className="grid gap-6 sm:grid-cols-3">
                  <SolutionField label="Problem" value={solution.problem} />
                  <SolutionField label="Approach" value={solution.approach} />
                  <SolutionField label="Outcome" value={solution.outcome} accent />
                </div>
                <div className="md:col-start-2 md:flex md:flex-wrap md:gap-2">
                  {solution.relatedServiceSlugs.map((slug) => (
                    <Link
                      key={slug}
                      to={`/services/${slug}`}
                      className="mr-2 mt-2 inline-block rounded-full border border-line px-3 py-1 text-xs text-slate-700 hover:border-ink md:mt-0"
                    >
                      {slug.replace(/-/g, ' ')}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function SolutionField({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="font-mono text-xs text-slate-500">{label}</p>
      <p className={accent ? 'mt-2 text-sm font-medium text-signal-600' : 'mt-2 text-sm text-slate-600'}>{value}</p>
    </div>
  );
}
