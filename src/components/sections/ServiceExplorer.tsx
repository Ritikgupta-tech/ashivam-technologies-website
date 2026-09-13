import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { services } from '@/data/services';
import { cn } from '@/lib/cn';

/**
 * Replaces a flat 8-card grid with an explorer: a numbered service list
 * on the left drives a large preview on the right, closer to a product
 * interface than a marketing grid. Collapses to an accordion on mobile,
 * where a side-by-side explorer doesn't fit.
 */
export function ServiceExplorer() {
  const [activeSlug, setActiveSlug] = useState(services[0].slug);
  const active = services.find((s) => s.slug === activeSlug) ?? services[0];
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* Desktop / tablet: side-by-side explorer */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-[0.85fr_1.15fr]">
        <ul className="border-t border-line">
          {services.map((service, index) => {
            const isActive = service.slug === activeSlug;
            return (
              <li key={service.slug} className="border-b border-line">
                <button
                  type="button"
                  onMouseEnter={() => setActiveSlug(service.slug)}
                  onFocus={() => setActiveSlug(service.slug)}
                  onClick={() => setActiveSlug(service.slug)}
                  aria-current={isActive}
                  className={cn(
                    'flex w-full items-center gap-4 py-4 text-left transition-colors',
                    isActive ? 'text-ink' : 'text-slate-500 hover:text-ink',
                  )}
                >
                  <span className="font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
                  <span className={cn('text-xl font-medium transition-colors', isActive && 'text-primary')}>
                    {service.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="card min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col"
            >
              <ServicePreviewBody service={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile / small tablet: accordion */}
      <div className="divide-y divide-line border-y border-line lg:hidden">
        {services.map((service, index) => (
          <details key={service.slug} className="group py-2">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-1 py-3">
              <span className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-500">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-lg font-medium text-ink">{service.name}</span>
              </span>
              <ChevronDown size={18} className="shrink-0 text-slate-500 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="px-1 pb-5">
              <ServicePreviewBody service={service} />
            </div>
          </details>
        ))}
      </div>
    </>
  );
}

function ServicePreviewBody({ service }: { service: (typeof services)[number] }) {
  const Icon = service.icon;
  return (
    <>
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded bg-surface text-ink">
          <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
        </div>
        <span className="font-mono text-xs text-slate-500">{service.category}</span>
      </div>

      <p className="mt-6 text-lg text-slate-700">{service.heroDescription}</p>

      <ul className="mt-6 space-y-2">
        {service.capabilities.slice(0, 4).map((capability) => (
          <li key={capability} className="flex items-start gap-2 text-sm text-slate-600">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
            {capability}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {service.technologies.map((tech) => (
          <span key={tech} className="rounded-full border border-line px-3 py-1 font-mono text-xs text-slate-600">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-4 pt-8">
        <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          View full details
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
        <Link to="/contact" className="link-underline text-sm font-medium text-slate-600">
          Start a project
        </Link>
      </div>
    </>
  );
}
