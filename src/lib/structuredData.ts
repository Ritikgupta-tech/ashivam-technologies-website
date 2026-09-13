import { company } from '@/data/company';
import { siteConfig } from '@/config/site';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: siteConfig.url,
    email: company.email,
    sameAs: [company.social.linkedin, company.social.github, company.social.instagram],
    address: {
      '@type': 'PostalAddress',
      addressLocality: company.location.city,
      addressCountry: 'IN',
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: company.name,
    url: siteConfig.url,
  };
}

export function serviceSchema(params: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: params.name,
    name: params.name,
    description: params.description,
    url: params.url,
    provider: {
      '@type': 'Organization',
      name: company.name,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function jobPostingSchema(params: {
  title: string;
  description: string;
  datePosted: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: params.title,
    description: params.description,
    datePosted: params.datePosted,
    hiringOrganization: {
      '@type': 'Organization',
      name: company.name,
      sameAs: siteConfig.url,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: company.location.city,
        addressCountry: 'IN',
      },
    },
  };
}
