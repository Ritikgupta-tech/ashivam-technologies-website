export interface TechGroup {
  category: string;
  items: string[];
}

/**
 * Edit this single file to change the technology ecosystem section
 * across the site. Keep this list limited to technologies the team is
 * actually capable of delivering with.
 */
export const technologies: TechGroup[] = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript'] },
  { category: 'Backend', items: ['Node.js', 'Java', 'Spring Boot', 'Python'] },
  { category: 'Database', items: ['PostgreSQL', 'MySQL', 'MongoDB'] },
  { category: 'Cloud & DevOps', items: ['Docker', 'AWS', 'GitHub Actions', 'CI/CD'] },
  { category: 'AI', items: ['Generative AI', 'Machine Learning', 'LLM APIs', 'Automation'] },
];
