import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-md border border-dashed border-line py-16 text-center">
      <h3 className="text-lg font-medium text-ink">{title}</h3>
      {description && <p className="max-w-sm text-slate-600">{description}</p>}
      {action}
    </div>
  );
}
