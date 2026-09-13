import { useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { CareerApplicationForm } from '@/components/sections/CareerApplicationForm';
import { Container } from '@/components/ui/Container';
import { getJobBySlug } from '@/data/jobsHelpers';
import { breadcrumbSchema } from '@/lib/structuredData';

export function CareerApplyPage() {
  const [searchParams] = useSearchParams();
  const roleSlug = searchParams.get('role');
  const job = roleSlug ? getJobBySlug(roleSlug) : undefined;

  return (
    <>
      <Seo
        title="Apply — Careers"
        description="Submit your application to join Ashivam Technologies."
        path="/careers/apply"
        noIndex
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Careers', path: '/careers' },
          { name: 'Apply', path: '/careers/apply' },
        ])}
      />
      <PageHero
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Careers', href: '/careers' },
          { label: 'Apply' },
        ]}
        title={job ? `Apply — ${job.title}` : 'Apply'}
        description="Fill in your details below. We review every application personally."
      />
      <section className="section">
        <Container className="max-w-2xl">
          <CareerApplicationForm />
        </Container>
      </section>
    </>
  );
}
