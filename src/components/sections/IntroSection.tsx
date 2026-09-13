import { Container } from '@/components/ui/Container';

export function IntroSection() {
  return (
    <section className="section">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl">
            We build systems
            <br />
            that last.
          </h2>
          <p className="max-w-xl self-end text-lg text-slate-600">
            From internal platforms to customer-facing products, we combine engineering, design
            and business thinking to create technology that stays useful long after launch — not
            just software that works in the demo.
          </p>
        </div>
      </Container>
    </section>
  );
}
