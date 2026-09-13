export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    description: 'Understand business goals, constraints and requirements before any design or code.',
    deliverables: ['Stakeholder interviews', 'Requirements brief', 'Technical constraints map'],
  },
  {
    step: '02',
    title: 'Define',
    description: 'Translate discovery into a concrete product scope and technical architecture.',
    deliverables: ['Scope document', 'System architecture', 'Effort estimate'],
  },
  {
    step: '03',
    title: 'Design',
    description: 'Create intuitive, tested user experiences grounded in real workflows.',
    deliverables: ['Wireframes', 'Interactive prototype', 'Design system'],
  },
  {
    step: '04',
    title: 'Build',
    description: 'Build scalable, reliable technology using a modern, maintainable stack.',
    deliverables: ['Working software, in increments', 'Code review on every change', 'Staging environment'],
  },
  {
    step: '05',
    title: 'Validate',
    description: 'Run quality assurance, security review and performance testing before launch.',
    deliverables: ['Test coverage report', 'Security review', 'Performance benchmarks'],
  },
  {
    step: '06',
    title: 'Launch',
    description: 'Deploy to production with monitoring and a rollback plan in place.',
    deliverables: ['Production deployment', 'Monitoring & alerting', 'Launch checklist'],
  },
  {
    step: '07',
    title: 'Improve',
    description: 'Watch real usage and continue refining after release.',
    deliverables: ['Usage analytics review', 'Iteration backlog', 'Ongoing support plan'],
  },
];
