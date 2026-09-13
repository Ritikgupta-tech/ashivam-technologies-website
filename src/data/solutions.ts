export interface Solution {
  slug: string;
  name: string;
  problem: string;
  approach: string;
  outcome: string;
  relatedServiceSlugs: string[];
}

export const solutions: Solution[] = [
  {
    slug: 'business-automation',
    name: 'Automate operations',
    problem: 'Manual, repetitive steps are eating hours your team could spend on real work.',
    approach:
      'We map the repetitive parts of your workflow and connect the tools you already use so those steps run themselves.',
    outcome: 'Fewer manual handoffs, fewer errors, and hours back on the calendar every week.',
    relatedServiceSlugs: ['ai-automation', 'software-development'],
  },
  {
    slug: 'legacy-modernization',
    name: 'Modernize legacy systems',
    problem: 'An old system still runs the business, but nobody wants to touch it and it can\u2019t keep up.',
    approach:
      'We migrate functionality in scoped phases — never a risky rewrite-and-pray — so the business keeps running throughout.',
    outcome: 'A system your current team can actually maintain and extend, without the fragility.',
    relatedServiceSlugs: ['software-development', 'full-stack-development'],
  },
  {
    slug: 'digital-products',
    name: 'Launch digital products',
    problem: 'You have a product idea and a deadline, but no in-house engineering team to build it.',
    approach:
      'One team covers strategy, design and engineering, scoped to a shippable first version rather than a wishlist.',
    outcome: 'A live product, validated by real users, with a technical foundation built to keep iterating on.',
    relatedServiceSlugs: ['digital-products', 'ui-ux-design'],
  },
  {
    slug: 'internal-platforms',
    name: 'Build internal platforms',
    problem: 'Your team is running the business out of spreadsheets, email threads, and tribal knowledge.',
    approach:
      'We build focused internal tools scoped tightly to what your team actually does day to day.',
    outcome: 'One place for the work to live, with fewer "who has the latest version" conversations.',
    relatedServiceSlugs: ['software-development', 'ui-ux-design'],
  },
  {
    slug: 'connect-workflows',
    name: 'Connect fragmented workflows',
    problem: 'Data lives in five different tools that don\u2019t talk to each other.',
    approach:
      'We design the integration layer — APIs, sync jobs, or a unifying platform — so information moves without manual re-entry.',
    outcome: 'One consistent source of truth instead of five slightly different ones.',
    relatedServiceSlugs: ['full-stack-development', 'enterprise-erp'],
  },
  {
    slug: 'introduce-ai',
    name: 'Introduce AI into existing processes',
    problem: 'AI seems relevant to your business, but it\u2019s not obvious where it would actually help.',
    approach:
      'We start with one process, one measurable outcome, and scope an AI feature to that — not AI for its own sake.',
    outcome: 'A working feature you can point to a specific result for, with a path to expand from there.',
    relatedServiceSlugs: ['ai-automation'],
  },
];
