import type { LucideIcon } from 'lucide-react';
import {
  Code2,
  Globe,
  Layers,
  Smartphone,
  Building2,
  Sparkles,
  PenTool,
  Rocket,
} from 'lucide-react';

export type ServiceCategory = 'Development' | 'Product' | 'Intelligence';

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  icon: LucideIcon;
  heroDescription: string;
  capabilities: string[];
  technologies: string[];
  benefits: string[];
}

export const services: Service[] = [
  {
    slug: 'software-development',
    category: 'Development',
    name: 'Software Development',
    shortDescription: 'Custom software designed around business requirements.',
    icon: Code2,
    heroDescription:
      'We design and build software around the way your business actually operates — not around a generic template. From internal tools to customer-facing platforms, every system is scoped to a real workflow.',
    capabilities: [
      'Requirements discovery and technical scoping',
      'Custom application architecture',
      'API design and third-party integrations',
      'Legacy system modernization',
      'Ongoing maintenance and support',
    ],
    technologies: ['Node.js', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'MySQL'],
    benefits: [
      'Software that matches your process instead of forcing you to adapt to it',
      'A codebase your team can extend without starting over',
      'Fewer manual workarounds and support tickets over time',
    ],
  },
  {
    slug: 'web-development',
    category: 'Development',
    name: 'Web Development',
    shortDescription: 'High-performance modern web applications.',
    icon: Globe,
    heroDescription:
      'From marketing sites to complex web applications, we build for speed, accessibility, and long-term maintainability — using a modern stack that your team or ours can keep building on.',
    capabilities: [
      'Marketing and corporate websites',
      'Web application front ends',
      'Performance and Core Web Vitals optimization',
      'Content architecture and CMS integration',
      'SEO-ready technical foundations',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    benefits: [
      'Fast-loading pages that hold up under real traffic',
      'A site structure search engines can actually understand',
      'Component-based builds that are cheaper to extend later',
    ],
  },
  {
    slug: 'full-stack-development',
    category: 'Development',
    name: 'Full Stack Development',
    shortDescription: 'End-to-end frontend and backend engineering.',
    icon: Layers,
    heroDescription:
      'One team, accountable for the whole system — interface, application logic, database, and deployment. No handoff gaps between "the frontend team" and "the backend team."',
    capabilities: [
      'End-to-end product architecture',
      'Database design and data modelling',
      'Authentication and authorization',
      'CI/CD pipeline setup',
      'Cloud deployment and monitoring',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
    benefits: [
      'A single accountable team across the entire stack',
      'Fewer integration bugs between layers',
      'Faster iteration once the system is live',
    ],
  },
  {
    slug: 'mobile-development',
    category: 'Development',
    name: 'Mobile App Development',
    shortDescription: 'Modern Android and mobile experiences.',
    icon: Smartphone,
    heroDescription:
      'Mobile applications built around how people actually use their phones — fast to open, simple to navigate, and reliable on inconsistent networks.',
    capabilities: [
      'Native Android application development',
      'Cross-platform mobile builds',
      'Offline-first and low-bandwidth design patterns',
      'App store release management',
      'Post-launch monitoring and updates',
    ],
    technologies: ['Kotlin', 'Java', 'React Native'],
    benefits: [
      'An app built for real-world network conditions, not just demos',
      'A release process that gets updates out reliably',
      'A codebase structured for adding features, not just shipping v1',
    ],
  },
  {
    slug: 'enterprise-erp',
    category: 'Intelligence',
    name: 'Enterprise & ERP',
    shortDescription: 'Business systems designed to streamline operations.',
    icon: Building2,
    heroDescription:
      'Enterprise resource planning systems and internal business tools designed around your existing operations — inventory, finance, HR, and the processes that connect them.',
    capabilities: [
      'ERP requirements mapping across departments',
      'Custom module development',
      'Data migration from legacy systems',
      'Role-based access and audit trails',
      'Integration with existing business tools',
    ],
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'MySQL'],
    benefits: [
      'One system of record instead of scattered spreadsheets',
      'Fewer manual handoffs between departments',
      'Reporting that reflects what is actually happening operationally',
    ],
  },
  {
    slug: 'ai-automation',
    category: 'Intelligence',
    name: 'AI & Automation',
    shortDescription: 'Intelligent automation and AI-powered solutions.',
    icon: Sparkles,
    heroDescription:
      'Practical applications of AI and automation aimed at removing repetitive work and surfacing better information — not AI for its own sake.',
    capabilities: [
      'Process automation for repetitive workflows',
      'LLM-powered features (search, summarization, assistants)',
      'Data pipeline and integration automation',
      'Applied machine learning for specific business problems',
      'Evaluation and monitoring of AI features in production',
    ],
    technologies: ['Python', 'LLM APIs', 'Machine Learning', 'Automation tooling'],
    benefits: [
      'Hours reclaimed from repetitive manual tasks',
      'AI features scoped to a measurable outcome, not a demo',
      'Systems that are monitored, not just switched on and forgotten',
    ],
  },
  {
    slug: 'ui-ux-design',
    category: 'Product',
    name: 'UI/UX Design',
    shortDescription: 'Human-centered interfaces and digital experiences.',
    icon: PenTool,
    heroDescription:
      'Interfaces designed around how your users actually think and work — from early wireframes through a polished, tested design system.',
    capabilities: [
      'User research and journey mapping',
      'Wireframing and prototyping',
      'Design systems and component libraries',
      'Usability testing',
      'Accessibility-first interface design',
    ],
    technologies: ['Figma', 'Design Systems', 'Prototyping'],
    benefits: [
      'Interfaces validated with real users before development starts',
      'A design system your product can grow into',
      'Fewer usability issues discovered after launch',
    ],
  },
  {
    slug: 'digital-products',
    category: 'Product',
    name: 'Digital Product Development',
    shortDescription: 'From idea to scalable digital product.',
    icon: Rocket,
    heroDescription:
      'End-to-end product development for teams taking an idea from concept to a live, scalable product — strategy, design, and engineering under one roof.',
    capabilities: [
      'Product strategy and scoping',
      'MVP definition and roadmapping',
      'Design and engineering execution',
      'Analytics and product instrumentation',
      'Post-launch iteration support',
    ],
    technologies: ['React', 'Node.js', 'Cloud infrastructure', 'Analytics tooling'],
    benefits: [
      'A clear path from idea to a shippable first version',
      'Product decisions grounded in usage data, not guesswork',
      'A technical foundation built to support future iterations',
    ],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);
