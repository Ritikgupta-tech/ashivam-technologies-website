export interface Job {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Contract';
  isOpen: boolean;
  summary: string;
}

/**
 * Feeds the role dropdown on the careers expression-of-interest form
 * (see src/components/sections/CareerApplicationForm.tsx) and the list
 * of disciplines named on the Careers page. isOpen is not currently
 * rendered anywhere — the site does not list per-role open/closed
 * status (per the redesign brief's instruction not to show job listings
 * without verified openings); it's kept on the type for whenever real,
 * confirmed vacancies are ready to be listed again.
 */
export const jobs: Job[] = [
  {
    slug: 'software-developer',
    title: 'Software Developer',
    department: 'Engineering',
    location: 'Agra, India',
    type: 'Full-time',
    isOpen: false,
    summary: 'Build and maintain custom software across the stack for client projects.',
  },
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Agra, India',
    type: 'Full-time',
    isOpen: false,
    summary: 'Build accessible, performant interfaces with React and TypeScript.',
  },
  {
    slug: 'backend-developer',
    title: 'Backend Developer',
    department: 'Engineering',
    location: 'Agra, India',
    type: 'Full-time',
    isOpen: false,
    summary: 'Design APIs, data models and services that power client applications.',
  },
  {
    slug: 'android-developer',
    title: 'Android Developer',
    department: 'Engineering',
    location: 'Agra, India',
    type: 'Full-time',
    isOpen: false,
    summary: 'Develop and maintain native Android applications for client products.',
  },
  {
    slug: 'ui-ux-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Agra, India',
    type: 'Full-time',
    isOpen: false,
    summary: 'Research, wireframe and design interfaces across web and mobile products.',
  },
  {
    slug: 'ai-ml-intern',
    title: 'AI/ML Intern',
    department: 'Research',
    location: 'Agra, India',
    type: 'Internship',
    isOpen: false,
    summary: 'Support applied machine learning and automation projects.',
  },
  {
    slug: 'research-intern',
    title: 'Research Intern',
    department: 'Research',
    location: 'Agra, India',
    type: 'Internship',
    isOpen: false,
    summary: 'Explore emerging technologies and evaluate their fit for client work.',
  },
  {
    slug: 'business-development',
    title: 'Business Development',
    department: 'Business',
    location: 'Agra, India',
    type: 'Full-time',
    isOpen: false,
    summary: 'Identify and develop new client relationships and partnerships.',
  },
];
