import { useParams, Link, Navigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { getServiceBySlug, services } from '@/data/services';
import { breadcrumbSchema, serviceSchema } from '@/lib/structuredData';
import { siteConfig } from '@/config/site';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  const Icon = service.icon;
  const otherServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={service.name}
        description={service.heroDescription}
        path={`/services/${service.slug}`}
        structuredData={[
          serviceSchema({
            name: service.name,
            description: service.heroDescription,
            url: `${siteConfig.url}/services/${service.slug}`,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <PageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]}
        title={service.name}
        description={service.heroDescription}
      >
        <div className="mt-8 flex h-14 w-14 items-center justify-center rounded bg-surface text-ink">
          <Icon size={26} strokeWidth={1.75} aria-hidden="true" />
        </div>
      </PageHero>

      <section className="section">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">What's included</h2>
              <ul className="mt-6 space-y-4">
                {service.capabilities.map((capability) => (
                  <li key={capability} className="flex items-start gap-3">
                    <Check size={18} className="mt-1 shrink-0 text-signal" aria-hidden="true" />
                    <span className="text-slate-700">{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Why it matters</h2>
              <ul className="mt-6 space-y-4">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="border-l-2 border-signal pl-4 text-slate-700">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 border-t border-line pt-10">
            <h2 className="text-2xl font-semibold">Technologies</h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {service.technologies.map((tech) => (
                <li key={tech} className="rounded-full border border-line px-4 py-2 font-mono text-sm text-slate-700">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section section-surface">
        <Container>
          <h2 className="text-2xl font-semibold">Related services</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {otherServices.map((item) => (
              <Link key={item.slug} to={`/services/${item.slug}`} className="card-interactive">
                <h3 className="text-lg font-semibold text-ink">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.shortDescription}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
