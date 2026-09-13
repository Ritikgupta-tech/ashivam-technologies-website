/**
 * Verified company information only. Do not add unverified facts here —
 * anything not confirmed by the company should live as clearly-labelled
 * placeholder content in the page components instead, not in this file.
 */
export const company = {
  name: 'Ashivam Technologies',
  tagline: 'Building Technology. Creating Possibilities.',
  descriptionShort:
    'We design and build custom software, web and mobile applications, ERP systems, and AI-driven automation for growing businesses.',
  positioningStatement:
    'We engineer digital systems that turn complex business problems into useful, scalable products.',
  location: {
    city: 'Agra',
    country: 'India',
    display: 'Agra, India',
  },
  email: 'teamashivam@gmail.com',
  social: {
    linkedin: 'https://www.linkedin.com/company/ashivam/',
    github: 'https://github.com/AshivamTech',
    instagram: 'https://www.instagram.com/ashivamtech/',
  },
  website: 'https://ashivam.com/',
  mission:
    'Turn ideas and real-world problems into scalable, reliable and user-friendly technology solutions.',
  vision:
    'Leverage technology to solve real-world challenges and contribute to a smarter, more connected future.',
  foundedContext:
    'Ashivam Technologies is a technology company based in Agra, India, working across software engineering, digital product design, and AI-driven automation.',
} as const;

export const values = [
  {
    title: 'Business-first thinking',
    description:
      'Every technical decision is weighed against the business problem it needs to solve, not the other way around.',
  },
  {
    title: 'Modern engineering',
    description:
      'We build with current, well-supported tools and write code that the next engineer can actually maintain.',
  },
  {
    title: 'Scalable by design',
    description:
      'Architecture decisions account for the system you will need in two years, not just the one you need today.',
  },
  {
    title: 'User-centered design',
    description:
      'Interfaces are shaped around how people actually work, tested against real tasks rather than assumptions.',
  },
  {
    title: 'Transparent collaboration',
    description:
      'You see progress as it happens — clear scope, honest timelines, and no surprises at delivery.',
  },
  {
    title: 'Continuous improvement',
    description:
      'We treat launch as a starting point. Systems are monitored, measured, and refined after they ship.',
  },
] as const;
