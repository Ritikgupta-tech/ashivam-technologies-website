export interface Project {
  slug: string;
  title: string;
  category: string;
  isPlaceholder: boolean;
  featured?: boolean;
  description: string;
  technologies: string[];
  challenge?: string;
  solution?: string;
  result?: string;
  caseStudyUrl?: string;
}

/**
 * FEATURED PROJECT CONCEPTS — not real client case studies.
 *
 * No fabricated client names, dates, revenue, or measured outcomes.
 * Every entry below is marked isPlaceholder: true and describes a
 * realistic, concrete *type* of system Ashivam builds — what it would
 * include and why — without claiming it was delivered for a named
 * client or produced a specific measured result. This is intentional:
 * it is more honest to show a well-described concept than a vague
 * "case study coming soon" card with no substance, and more honest
 * than inventing a client story.
 *
 * Replace an entry (and flip isPlaceholder to false) once a real,
 * approved project is ready to publish with actual details.
 * The first `featured: true` entry renders as the large showcase in
 * ProjectShowcase; the rest render as smaller supporting entries.
 * `challenge` / `solution` / `result` describe the pattern this kind
 * of build addresses — not an outcome that was actually measured.
 */
export const projects: Project[] = [
  {
    slug: 'concept-business-web-platform',
    title: 'Custom Web Platform for a Growing Business',
    category: 'Web Development',
    isPlaceholder: true,
    featured: true,
    description:
      'A representative example of the web platforms Ashivam builds: a customer-facing site backed by an admin area for managing content, orders, or leads — built as one connected system instead of a static site bolted onto a spreadsheet.',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    challenge:
      'A business is running its public-facing site and its day-to-day operations as two disconnected things — a website that looks fine, and a separate manual process behind it for anything that actually needs updating.',
    solution:
      'A single platform: a fast, accessible public site paired with an authenticated admin area so the team can update content, respond to inquiries, or manage listings without a developer in the loop.',
    result:
      'This pattern is designed to remove the gap between "what the website shows" and "what the business is actually doing" — replacing manual updates with a system the team can operate directly.',
  },
  {
    slug: 'concept-erp-module',
    title: 'Departmental ERP Module',
    category: 'Enterprise & ERP',
    isPlaceholder: true,
    description:
      'A representative example of the ERP work Ashivam builds: a focused module — inventory, HR records, or finance tracking — that replaces one specific spreadsheet-driven process with a proper system of record.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL'],
    challenge:
      'One department is tracking critical data — stock levels, staff records, approvals — in spreadsheets that get emailed around and go out of sync.',
    solution:
      'A scoped module with role-based access, an audit trail, and validation rules, built to integrate with the systems the rest of the business already uses rather than replacing everything at once.',
    result:
      'This pattern is designed to give one department a single, current source of truth, and a foundation that can extend to neighboring departments later.',
  },
  {
    slug: 'concept-mobile-app',
    title: 'Field-Ready Mobile Application',
    category: 'Mobile Development',
    isPlaceholder: true,
    description:
      'A representative example of the mobile applications Ashivam builds: an Android app designed to keep working when the network doesn\u2019t \u2014 for field teams, delivery staff, or on-site inspections.',
    technologies: ['Kotlin', 'React Native'],
    challenge:
      'Staff working outside the office need to log data or check information on a phone, but the connection at their location is unreliable.',
    solution:
      'An offline-first app that queues actions locally and syncs when connectivity returns, with a lightweight interface built for quick use in the field rather than a desk.',
    result:
      'This pattern is designed so a bad connection stops nothing — work keeps moving and syncs automatically once the phone is back online.',
  },
  {
    slug: 'concept-ai-automation-feature',
    title: 'Applied AI Feature for an Existing Workflow',
    category: 'AI & Automation',
    isPlaceholder: true,
    description:
      'A representative example of the applied-AI work Ashivam builds: a single AI-powered feature — document summarization, intelligent search, or an internal assistant — added to a workflow a team already uses, scoped to one measurable job.',
    technologies: ['Python', 'LLM APIs', 'Automation tooling'],
    challenge:
      'A team spends real time on a repetitive information task \u2014 reading long documents, searching scattered records, answering the same questions \u2014 that a model is well suited to help with.',
    solution:
      'One AI feature, scoped to that specific task, integrated into the tool the team already uses, with monitoring in place rather than a one-off demo.',
    result:
      'This pattern is designed to target a specific, measurable chunk of manual work \u2014 not to add AI for its own sake.',
  },
];
