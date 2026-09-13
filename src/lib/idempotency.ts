import { useRef } from 'react';

/**
 * Generates one stable key per "attempt" at filling out a form, and lets
 * the caller mint a fresh one after a successful submit. Sent to the
 * backend as `idempotencyKey` so that a retried request (double-click,
 * a network timeout followed by the browser auto-retrying, etc.) is
 * recognized as the same submission instead of creating a duplicate row.
 */
export function useIdempotencyKey() {
  const keyRef = useRef<string>(crypto.randomUUID());

  const rotate = () => {
    keyRef.current = crypto.randomUUID();
  };

  return { getKey: () => keyRef.current, rotate };
}
