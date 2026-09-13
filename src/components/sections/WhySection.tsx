import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { values } from '@/data/company';

export function WhySection() {
  return (
    <section className="section section-surface">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionHeading
            title="Why teams work with Ashivam"
            description="Six principles that shape how we scope, build and hand off every project."
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
  );
}
