export interface Industry {
  slug: string;
  name: string;
  note: string;
  problemExamples: string[];
  solutionPatterns: string[];
}

/**
 * These describe technology patterns our services are well-suited for —
 * not a client history. Do not present this list as past client work.
 */
export const industries: Industry[] = [
  {
    slug: 'startups',
    name: 'Startups',
    note: 'Technology patterns for early-stage teams validating a product.',
    problemExamples: ['No in-house engineering team yet', 'Need to validate an idea quickly'],
    solutionPatterns: ['MVP scoped to one core workflow', 'Architecture that can scale after validation'],
  },
  {
    slug: 'education',
    name: 'Education',
    note: 'Technology patterns for learning platforms and institutions.',
    problemExamples: ['Manual student record-keeping', 'Disconnected tools for courses and admin'],
    solutionPatterns: ['Unified student and course portals', 'Administrative dashboards'],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    note: 'Technology patterns for care providers and clinics.',
    problemExamples: ['Scheduling handled by phone and paper', 'Records scattered across systems'],
    solutionPatterns: ['Digital scheduling and records systems', 'Role-based access for staff'],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    note: 'Technology patterns for online retail operations.',
    problemExamples: ['Inventory out of sync across channels', 'Manual order processing'],
    solutionPatterns: ['Unified inventory systems', 'Automated order and fulfillment workflows'],
  },
  {
    slug: 'finance',
    name: 'Finance',
    note: 'Technology patterns for financial services operations.',
    problemExamples: ['Manual reconciliation processes', 'Legacy tools slowing down reporting'],
    solutionPatterns: ['Internal reporting and reconciliation tools', 'Customer-facing account platforms'],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    note: 'Technology patterns for production and operations tracking.',
    problemExamples: ['Production tracked on paper or spreadsheets', 'No real-time inventory visibility'],
    solutionPatterns: ['Production tracking systems', 'Inventory and supply chain dashboards'],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    note: 'Technology patterns for client-based service businesses.',
    problemExamples: ['Client work tracked across scattered tools', 'No clear view of project status'],
    solutionPatterns: ['Client and project management platforms', 'Automated status reporting'],
  },
  {
    slug: 'enterprise',
    name: 'Enterprise',
    note: 'Technology patterns for larger, multi-department organizations.',
    problemExamples: ['Departments running on disconnected systems', 'Manual cross-team reporting'],
    solutionPatterns: ['ERP systems connecting departments', 'Centralized internal tooling'],
  },
];
