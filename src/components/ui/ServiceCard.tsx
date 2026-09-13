import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/data/services';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon;
  return (
    <Link
      to={`/services/${service.slug}`}
      className="card-interactive group flex flex-col justify-between"
      aria-label={`Explore ${service.name}`}
    >
      <div>
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded bg-surface text-ink">
            <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
          </div>
          <span className="font-mono text-xs text-slate-500">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="mt-6 text-xl font-semibold text-ink">{service.name}</h3>
        <p className="mt-2 text-slate-600">{service.shortDescription}</p>
      </div>
      <div className="mt-8 flex items-center gap-1.5 text-sm font-medium text-primary">
        Explore service
        <ArrowUpRight
          size={16}
          className="transition-transform duration-200 ease-standard group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
