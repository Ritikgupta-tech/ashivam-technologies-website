import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme, type ThemeMode } from '@/lib/theme';
import { cn } from '@/lib/cn';

const OPTIONS: { mode: ThemeMode; label: string; Icon: typeof Sun }[] = [
  { mode: 'system', label: 'System', Icon: Monitor },
  { mode: 'light', label: 'Light', Icon: Sun },
  { mode: 'dark', label: 'Dark', Icon: Moon },
];

/**
 * Compact 3-state segmented control for Light / Dark / System, styled to
 * match the site's existing pill/chip language (see the active-state
 * treatment in IndustriesExplorer / ProcessSection: a signal-gold fill
 * with `text-on-signal` for contrast). Deliberately small — a row of
 * three 28px icon buttons — so it drops into the navbar without
 * disturbing existing navigation.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { mode, setMode } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn('inline-flex items-center gap-0.5 rounded-full border border-line bg-surface p-0.5 sm:p-1', className)}
    >
      {OPTIONS.map(({ mode: optionMode, label, Icon }) => {
        const active = mode === optionMode;
        return (
          <button
            key={optionMode}
            type="button"
            role="radio"
            aria-checked={active}
            title={`Theme: ${label}`}
            aria-label={`Theme: ${label}`}
            onClick={() => setMode(optionMode)}
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-full transition-colors duration-200 sm:h-7 sm:w-7',
              active ? 'bg-signal text-on-signal' : 'text-slate-600 hover:bg-line hover:text-ink',
            )}
          >
            <Icon size={13} strokeWidth={2} aria-hidden="true" className="sm:hidden" />
            <Icon size={14} strokeWidth={2} aria-hidden="true" className="hidden sm:block" />
          </button>
        );
      })}
    </div>
  );
}
