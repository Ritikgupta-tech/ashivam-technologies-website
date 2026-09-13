import { Loader2 } from 'lucide-react';

export function LoadingState({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-slate-600" role="status" aria-live="polite">
      <Loader2 className="animate-spin" size={18} aria-hidden="true" />
      <span>{label}...</span>
    </div>
  );
}
