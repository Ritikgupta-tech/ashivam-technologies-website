import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Something went wrong. Please try again.', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-md border border-line bg-surface py-12 text-center" role="alert">
      <AlertTriangle className="text-red-400" size={22} aria-hidden="true" />
      <p className="max-w-sm text-slate-700">{message}</p>
      {onRetry && (
        <button className="btn-outline" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
