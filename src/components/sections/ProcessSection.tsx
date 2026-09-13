import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { processSteps } from '@/data/process';
import { cn } from '@/lib/cn';

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const active = processSteps[activeStep];

  return (
    <section className="section">
      <Container>
        <SectionHeading title="How we build" description="Select a stage to see what it actually involves." />

        <div className="mt-12">
          {/* Stage rail */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-4 h-px bg-line" aria-hidden="true" />
            <div className="relative flex flex-wrap gap-y-6 md:flex-nowrap md:justify-between">
              {processSteps.map((step, index) => {
                const isActive = index === activeStep;
                return (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className="group flex flex-col items-center gap-3 px-2"
                    aria-current={isActive}
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full border font-mono text-xs transition-colors',
                        isActive
                          ? 'border-signal bg-signal text-on-signal'
                          : 'border-line bg-paper text-slate-500 group-hover:border-signal/40',
                      )}
                    >
                      {step.step}
                    </span>
                    <span className={cn('text-sm font-medium', isActive ? 'text-ink' : 'text-slate-500')}>
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="card mt-10 min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.step}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-8 md:grid-cols-[1fr_1.2fr]"
              >
                <div>
                  <span className="font-mono text-sm text-signal">{active.step}</span>
                  <h3 className="mt-2 text-2xl font-semibold text-ink">{active.title}</h3>
                  <p className="mt-3 text-slate-600">{active.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">What this stage delivers</p>
                  <ul className="mt-3 space-y-2.5">
                    {active.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
