import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/Home';
import { AboutPage } from '@/pages/About';
import { ServicesPage } from '@/pages/Services';
import { ServiceDetailPage } from '@/pages/Services/ServiceDetail';
import { SolutionsPage } from '@/pages/Solutions';
import { IndustriesPage } from '@/pages/Industries';
import { ProjectsPage } from '@/pages/Projects';
import { CareersPage } from '@/pages/Careers';
import { CareerApplyPage } from '@/pages/Careers/Apply';
import { ContactPage } from '@/pages/Contact';
import { PrivacyPolicyPage } from '@/pages/Legal/PrivacyPolicy';
import { TermsPage } from '@/pages/Legal/Terms';
import { AdminPage } from '@/pages/Admin';
import { NotFoundPage } from '@/pages/NotFound';

export function App() {
  return (
    <Routes>
      {/* Internal tool — deliberately outside the public Layout (no
          navbar/footer, no public nav link). Gated by the ADMIN_API_TOKEN
          bearer token at the API layer; see src/pages/Admin/index.tsx. */}
      <Route path="/admin" element={<AdminPage />} />

      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/careers/apply" element={<CareerApplyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
