import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

/**
 * ASHIVAM TECHNOLOGIES — DESIGN SYSTEM (dark navy / gold / sky)
 * ------------------------------------------------------------------
 * Visual direction: premium enterprise technology partner — Linear /
 * Vercel / Stripe inspired dark canvas, editorial serif display type,
 * gold used sparingly as the "premium" accent, sky blue for
 * technology/interactive accents.
 *
 * Same token names as before so every existing component (which was
 * built strictly against these semantic tokens, never raw hex)
 * re-themes automatically — only the underlying values changed.
 *
 * THEME SUPPORT: every token below resolves through a CSS custom
 * property (see src/styles/index.css for the `:root`/`.dark` and
 * `.light` variable definitions) instead of a literal hex value. This
 * is what lets the same `bg-paper` / `text-ink` / `border-line` classes
 * used everywhere in the app automatically repaint for light, dark, or
 * system-driven theming — no component needs a `dark:` variant class.
 * `withOpacity()` preserves support for Tailwind's `/NN` opacity
 * modifiers (e.g. `text-ink/60`, `bg-paper/80`) on top of a CSS
 * variable, which a plain `var(--x)` reference can't do on its own.
 *
 * Palette (dark theme values — the historical, unchanged defaults):
 *   ink        #F8FAFC   heading / primary text (light, for dark bg)
 *   paper      #0B1120   navy-deep — primary page background
 *   surface    #0F172A   navy-surface — cards, elevated/secondary bg
 *   line       #1E293B   navy-border — hairline borders
 *   line-dark  #334155   navy-elevated — stronger borders / hover states
 *   primary    #38BDF8   sky blue — technology/interactive accents, links
 *   primary-600#0284C7   pressed/hover state of primary
 *   signal     #D4AF37   gold — the ONE premium accent (CTAs, highlights)
 *   slate-*    neutral text scale between muted and body-bright
 *   on-signal  a fixed, always-dark tone (not theme-swapped) used only
 *              for text/icons sitting on top of a signal/gold surface,
 *              so gold buttons and chips stay readable in both themes.
 *
 * Type:
 *   Display/headline — "Fraunces" (serif, editorial-premium)
 *   Body/UI — "Inter" (grotesk sans, high legibility at small sizes)
 *   Mono (code labels, data tags only) — "JetBrains Mono"
 */

/** Reads a `--color-*` CSS variable holding "R G B" channels, with Tailwind opacity-modifier support (e.g. `bg-paper/80`). */
function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue === undefined ? `rgb(var(${variableName}))` : `rgb(var(${variableName}) / ${opacityValue})`;
}

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '2rem', lg: '2.5rem', xl: '3rem' },
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1200px', '2xl': '1360px' },
    },
    extend: {
      colors: {
        ink: withOpacity('--color-ink'),
        'ink-soft': withOpacity('--color-ink-soft'),
        // Fixed-contrast text for content on a signal/gold background —
        // intentionally not theme-swapped (see comment above).
        'on-signal': withOpacity('--color-on-signal'),
        paper: withOpacity('--color-paper'),
        surface: withOpacity('--color-surface'),
        line: withOpacity('--color-line'),
        'line-dark': withOpacity('--color-line-dark'),
        primary: {
          DEFAULT: withOpacity('--color-primary'),
          600: withOpacity('--color-primary-600'),
          100: ({ opacityValue }: { opacityValue?: string }) => `rgb(var(--color-primary) / ${opacityValue ?? '0.14'})`,
        },
        signal: {
          DEFAULT: withOpacity('--color-signal'),
          600: withOpacity('--color-signal-600'),
          100: ({ opacityValue }: { opacityValue?: string }) => `rgb(var(--color-signal) / ${opacityValue ?? '0.14'})`,
        },
        gold: { DEFAULT: withOpacity('--color-signal'), soft: withOpacity('--color-gold-soft'), muted: withOpacity('--color-signal-600') },
        sky: { DEFAULT: withOpacity('--color-primary'), interactive: withOpacity('--color-primary-600') },
        slate: {
          50: withOpacity('--color-slate-50'),
          100: withOpacity('--color-slate-100'),
          300: withOpacity('--color-slate-300'),
          500: withOpacity('--color-slate-500'),
          600: withOpacity('--color-slate-600'),
          700: withOpacity('--color-slate-700'),
          900: withOpacity('--color-slate-900'),
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Modular scale, ratio ~1.25, tuned for editorial display type
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.55' }],
        base: ['1rem', { lineHeight: '1.65' }],
        lg: ['1.125rem', { lineHeight: '1.65' }],
        xl: ['1.375rem', { lineHeight: '1.5' }],
        '2xl': ['1.75rem', { lineHeight: '1.35' }],
        '3xl': ['2.25rem', { lineHeight: '1.2' }],
        '4xl': ['2.85rem', { lineHeight: '1.12' }],
        '5xl': ['3.6rem', { lineHeight: '1.06' }],
        '6xl': ['4.5rem', { lineHeight: '1.02' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        section: '7rem',
        'section-sm': '4rem',
      },
      maxWidth: {
        prose: '65ch',
        content: '1200px',
      },
      borderRadius: {
        none: '0',
        sm: '4px',
        DEFAULT: '6px',
        md: '10px',
        lg: '16px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(18, 21, 27, 0.06)',
        card: '0 1px 3px rgba(18, 21, 27, 0.08), 0 1px 2px rgba(18, 21, 27, 0.04)',
        lifted: '0 12px 32px -12px rgba(18, 21, 27, 0.22)',
        focus: '0 0 0 3px rgba(56, 189, 248, 0.35)',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'node-pulse': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'node-pulse': 'node-pulse 3.2s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [forms],
} satisfies Config;
