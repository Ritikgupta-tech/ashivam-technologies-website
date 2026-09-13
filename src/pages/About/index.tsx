import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { company, values } from '@/data/company';
import { breadcrumbSchema } from '@/lib/structuredData';

export function AboutPage() {
  return (
    <>
      <Seo
        title="About Ashivam Technologies"
        description="Ashivam Technologies is a technology company based in Agra, India, building software, digital products and AI-driven automation for growing businesses."
        path="/about"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        title="Technology built by people who care how it holds up."
        description={company.foundedContext}
      />

      <section className="section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-2xl font-semibold">Our mission</h2>
              <p className="mt-4 text-lg text-slate-600">{company.mission}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Our vision</h2>
              <p className="mt-4 text-lg text-slate-600">{company.vision}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section-surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <SectionHeading
              title="What we believe"
              description="The principles that guide how we scope, build, and hand off every project."
            />
            <dl className="divide-y divide-line border-t border-line">
              {values.map((value) => (
                <div key={value.title} className="grid gap-2 py-6 sm:grid-cols-[220px_1fr] sm:gap-8">
                  <dt className="text-lg font-medium text-ink">{value.title}</dt>
                  <dd className="text-slate-600">{value.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <SectionHeading title="Our approach to technology" />
            <div className="max-w-2xl space-y-5 text-lg text-slate-600">
              <p>
                We treat architecture decisions as commitments, not defaults — choosing tools
                because they fit the problem, not because they are trending. That means a mix of
                established, well-supported technology (React, Node.js, PostgreSQL) alongside
                newer capabilities like generative AI and automation, applied only where they
                genuinely improve the outcome.
              </p>
              <p>
                Every engagement starts with understanding the business problem before any design
                or code work begins, and continues with monitoring and iteration after launch —
                software is a living system, not a one-time delivery.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section-surface">
        <Container>
          <SectionHeading
            title="Team"
            description="Ashivam is built by a small, focused team of engineers and designers based in Agra, India. Individual team profiles will be added here as the company grows its public presence."
          />
        </Container>
      </section>

    </>
  );
}
