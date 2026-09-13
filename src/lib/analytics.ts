import { siteConfig } from '@/config/site';

/**
 * Analytics is architected but inert until:
 *  1. an environment variable supplies a real ID, and
 *  2. the visitor has granted cookie consent (see CookieConsent component).
 * Nothing is loaded before both conditions are met.
 */
export function loadAnalyticsIfConsented(consent: boolean): void {
  if (!consent) return;

  const { gaId, gtmId, metaPixelId } = siteConfig.analytics;

  if (gaId) {
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`);
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', gaId);
  }

  if (gtmId) {
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${gtmId}`);
  }

  if (metaPixelId) {
    // Placeholder hook point for the Meta Pixel bootstrap snippet.
    // Intentionally left as a no-op until a real pixel ID is supplied
    // and the snippet is added, to avoid loading third-party trackers
    // silently.
    console.info(`Meta Pixel ready to initialize with ID: ${metaPixelId}`);
  }
}

function injectScript(src: string): void {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
