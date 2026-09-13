import { Seo } from '@/components/common/Seo';
import { Hero } from '@/components/sections/Hero';
import { IntroSection } from '@/components/sections/IntroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhySection } from '@/components/sections/WhySection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TechnologySection } from '@/components/sections/TechnologySection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { ProjectsPreviewSection } from '@/components/sections/ProjectsPreviewSection';
import { organizationSchema, websiteSchema } from '@/lib/structuredData';

export function HomePage() {
  return (
    <>
      <Seo
        title="Ashivam Technologies — Building Technology. Creating Possibilities."
        description="Ashivam Technologies designs and builds custom software, web and mobile applications, ERP systems, and AI-driven automation for growing businesses."
        path="/"
        structuredData={[organizationSchema(), websiteSchema()]}
      />
      <Hero />
      <IntroSection />
      <ServicesSection />
      <WhySection />
      <ProcessSection />
      <TechnologySection />
      <IndustriesSection />
      <ProjectsPreviewSection />
    </>
  );
}
