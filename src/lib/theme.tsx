import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

/**
 * Site-wide theme engine.
 *
 * Three user-facing modes:
 *   - "light"  — force the light palette
 *   - "dark"   — force the dark palette (the site's original, unchanged look)
 *   - "system" — follow the OS/browser `prefers-color-scheme`, live (default
 *                for every new visitor — see THEME_STORAGE_KEY below)
 *
 * The resolved ("light" | "dark") theme is applied as a class on
 * <html> (`.light` / `.dark`), matching Tailwind's `darkMode: ['class']`
 * setting in tailwind.config.ts and the CSS variable blocks defined in
 * src/styles/index.css. A blocking inline script in index.html applies
 * the same resolved class before first paint, so there is no
 * flash-of-wrong-theme on load — this module re-derives and re-applies
 * the same result once React mounts, so the two are always in sync.
 */

export type ThemeMode = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'ashivam-theme';

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark';
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === 'system' ? getSystemTheme() : mode;
}

function readStoredMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
  } catch {
    // localStorage can throw in private-browsing / storage-blocked contexts —
    // fall back to the default instead of breaking the page.
    return 'system';
  }
}

function applyResolvedTheme(resolved: ResolvedTheme): void {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
}

interface ThemeContextValue {
  /** The user's chosen mode — what the toggle UI should reflect. */
  mode: ThemeMode;
  /** The actual light/dark palette currently applied (mode with "system" resolved). */
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => readStoredMode());
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(mode));

  // Apply whenever the chosen mode changes (the inline script in
  // index.html already applied the correct class before first paint —
  // this keeps it in sync with React state from here on).
  useEffect(() => {
    const resolved = resolveTheme(mode);
    setResolvedTheme(resolved);
    applyResolvedTheme(resolved);
  }, [mode]);

  // While "system" is selected, react live to OS-level theme changes
  // without requiring a page refresh.
  useEffect(() => {
    if (mode !== 'system' || typeof window === 'undefined' || !window.matchMedia) return undefined;
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => {
      const resolved = getSystemTheme();
      setResolvedTheme(resolved);
      applyResolvedTheme(resolved);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [mode]);

  const setMode = (next: ThemeMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Selection still applies for this session even if it can't persist.
    }
  };

  const value = useMemo<ThemeContextValue>(() => ({ mode, resolvedTheme, setMode }), [mode, resolvedTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
