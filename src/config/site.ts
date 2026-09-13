export const siteConfig = {
  url: import.meta.env.VITE_SITE_URL || 'https://ashivam.com',
  contactApiUrl: import.meta.env.VITE_CONTACT_API_URL || '/api/contact',
  careersApiUrl: import.meta.env.VITE_CAREERS_API_URL || '/api/careers/apply',
  adminApiUrl: import.meta.env.VITE_ADMIN_API_URL || '/api/admin',
  analytics: {
    gaId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
    gtmId: import.meta.env.VITE_GTM_CONTAINER_ID || '',
    metaPixelId: import.meta.env.VITE_META_PIXEL_ID || '',
  },
} as const;

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'Projects', href: '/projects' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Software Development', href: '/services/software-development' },
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'Mobile Development', href: '/services/mobile-development' },
    { label: 'AI & Automation', href: '/services/ai-automation' },
    { label: 'Enterprise & ERP', href: '/services/enterprise-erp' },
    { label: 'UI/UX Design', href: '/services/ui-ux-design' },
  ],
  solutions: [
    { label: 'Automate Operations', href: '/solutions#business-automation' },
    { label: 'Modernize Legacy Systems', href: '/solutions#legacy-modernization' },
    { label: 'Launch Digital Products', href: '/solutions#digital-products' },
    { label: 'Build Internal Platforms', href: '/solutions#internal-platforms' },
  ],
  resources: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  ],
} as const;
