import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { industries } from '@/data/industries';
import { cn } from '@/lib/cn';

export function IndustriesExplorer() {
  const [activeSlug, setActiveSlug] = useState(industries[0].slug);
  const active = industries.find((i) => i.slug === activeSlug) ?? industries[0];
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
        {industries.map((industry) => {
          const isActive = industry.slug === activeSlug;
          return (
            <button
              key={industry.slug}
              type="button"
              onClick={() => setActiveSlug(industry.slug)}
              onMouseEnter={() => setActiveSlug(industry.slug)}
              aria-current={isActive}
              className={cn(
                'rounded-full px-4 py-2 text-left text-sm font-medium transition-colors lg:rounded lg:px-3 lg:py-2.5',
                isActive ? 'bg-signal text-on-signal' : 'bg-surface text-slate-700 hover:bg-line lg:bg-transparent lg:hover:bg-surface',
              )}
            >
              {industry.name}
            </button>
          );
        })}
      </div>

      <div className="card min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.slug}
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-2xl font-semibold text-ink">{active.name}</h3>
            <p className="mt-2 text-slate-600">{active.note}</p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="font-mono text-xs text-slate-500">Problems we see</p>
                <ul className="mt-3 space-y-2.5">
                  {active.problemExamples.map((item) => (
                    <li key={item} className="text-sm text-slate-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-xs text-slate-500">Patterns we apply</p>
                <ul className="mt-3 space-y-2.5">
                  {active.solutionPatterns.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
