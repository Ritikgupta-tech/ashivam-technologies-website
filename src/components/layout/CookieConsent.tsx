import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadAnalyticsIfConsented } from '@/lib/analytics';

const CONSENT_KEY = 'ashivam-cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted') {
      loadAnalyticsIfConsented(true);
    } else if (stored !== 'declined') {
      setVisible(true);
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    window.localStorage.setItem(CONSENT_KEY, accepted ? 'accepted' : 'declined');
    setVisible(false);
    if (accepted) loadAnalyticsIfConsented(true);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[150] border-t border-line bg-paper p-5 shadow-lifted"
    >
      <div className="container flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-700">
          We use optional analytics cookies to understand how the site is used. Read our{' '}
          <Link to="/privacy-policy" className="link-underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button className="btn-ghost" onClick={() => handleChoice(false)}>
            Decline
          </button>
          <button className="btn-primary" onClick={() => handleChoice(true)}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
