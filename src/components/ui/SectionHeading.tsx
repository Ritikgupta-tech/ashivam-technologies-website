import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
}

export function SectionHeading({
  title,
  description,
  align = 'left',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <h2 className="text-3xl md:text-4xl font-semibold text-ink">{title}</h2>
      {description && (
        <p className={cn('mt-4 text-lg', tone === 'dark' ? 'text-ink/70' : 'text-slate-600')}>
          {description}
        </p>
      )}
    </div>
  );
}
