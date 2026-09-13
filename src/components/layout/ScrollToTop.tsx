import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll position on route change, matching native browser
 * navigation. If the destination includes a hash (e.g. a footer link to
 * /solutions#business-automation), scrolls to that element instead of
 * the top — the target element needs `scroll-mt-*` set so it isn't
 * hidden behind the sticky navbar.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a tick for the destination page to render before measuring.
      const id = hash.slice(1);
      const target = window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
      return () => window.cancelAnimationFrame(target);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
