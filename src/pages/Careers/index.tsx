import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { jobs } from '@/data/jobs';
import { breadcrumbSchema } from '@/lib/structuredData';

export function CareersPage() {
  const disciplines = [...new Set(jobs.map((job) => job.department))];

  return (
    <>
      <Seo
        title="Careers"
        description="Ashivam Technologies is building its team thoughtfully. Learn about our engineering culture and register your interest."
        path="/careers"
        structuredData={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Careers', path: '/careers' }])}
      />
      <PageHero
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
        title="Build with us."
        description="We're a small, focused team based in Agra, working across software, design and applied AI."
      />

      <section className="section">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">Ownership from day one</h2>
              <p className="mt-4 text-slate-600">
                You'll work directly on client systems from day one — not shadowing for months
                before touching real code. Small teams mean your decisions matter and your name is
                on the work.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Learning & growth</h2>
              <p className="mt-4 text-slate-600">
                Projects span multiple industries and technologies, so you'll pick up breadth
                quickly — from ERP systems to AI-driven features — alongside people who review
                your work closely.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Engineering culture</h2>
              <p className="mt-4 text-slate-600">
                We value clear communication, honest estimates, and code that the next person can
                maintain — over impressive-sounding but fragile solutions.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Research & product thinking</h2>
              <p className="mt-4 text-slate-600">
                We treat applied AI and automation as an area to keep learning in, not a label —
                research work here is scoped to real problems, with mentorship from the core team.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section-dark" id="expression-of-interest">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold text-ink md:text-4xl">
                We're building our team thoughtfully.
              </h2>
              <p className="mt-4 max-w-xl text-ink/70">
                We don't have open positions listed right now, but we hire across{' '}
                {disciplines.join(', ')} as client work grows. If that sounds like where you want
                to work, register your interest — we review every submission personally and reach
                out when a fit opens up.
              </p>
            </div>
            <Link
              to="/careers/apply"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-signal px-6 py-3.5 font-medium text-on-signal transition-transform hover:-translate-y-0.5"
            >
              Register your interest
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
