/**
 * Generates public/sitemap.xml from the same route list the app uses.
 * Run with: npm run sitemap
 * Re-run this whenever a page is added or removed.
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE_URL = process.env.VITE_SITE_URL || 'https://ashivam.com';

const staticServiceSlugs = [
  'software-development',
  'web-development',
  'full-stack-development',
  'mobile-development',
  'enterprise-erp',
  'ai-automation',
  'ui-ux-design',
  'digital-products',
];

const routes: { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  ...staticServiceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  })),
  { path: '/solutions', priority: '0.7', changefreq: 'monthly' },
  { path: '/industries', priority: '0.6', changefreq: 'monthly' },
  { path: '/projects', priority: '0.7', changefreq: 'weekly' },
  { path: '/careers', priority: '0.6', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'yearly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const outputPath = resolve(process.cwd(), 'public/sitemap.xml');
writeFileSync(outputPath, xml, 'utf-8');
console.log(`Sitemap written to ${outputPath} with ${routes.length} URLs.`);
