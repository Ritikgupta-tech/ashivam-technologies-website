import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { TechVisual } from '@/components/sections/TechVisual';

const CAPABILITIES = ['Software Engineering', 'AI & Automation', 'Digital Products', 'Enterprise Systems'];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? undefined : { opacity: 0, y: 16 };
  const animate = shouldReduceMotion ? undefined : { opacity: 1, y: 0 };

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-14 md:pb-24 md:pt-20">
        <div
          className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-signal/[0.10] blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full bg-primary/[0.08] blur-[120px]"
          aria-hidden="true"
        />
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <motion.p
                initial={initial}
                animate={animate}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-xs uppercase tracking-[0.14em] text-slate-500"
              >
                Engineering · Product · AI
              </motion.p>
              <motion.h1
                initial={initial}
                animate={animate}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5 text-4xl font-semibold tracking-tight text-ink md:text-6xl"
              >
                Technology that moves
                <br />
                business forward.
              </motion.h1>
              <motion.p
                initial={initial}
                animate={animate}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-xl text-lg text-slate-600"
              >
                We engineer digital systems that turn complex business problems into useful,
                scalable products — software, platforms, and AI-driven automation built to hold up
                well past launch.
              </motion.p>
              <motion.div
                initial={initial}
                animate={animate}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Link to="/contact" className="btn-primary">
                  Start a Project
                </Link>
                <Link to="/services" className="btn-outline">
                  Explore Capabilities
                </Link>
              </motion.div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <TechVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* Capability strip — technical credibility, not fabricated numbers */}
      <section className="border-y border-line">
        <Container>
          <div className="grid grid-cols-2 divide-x divide-y divide-line sm:grid-cols-4 sm:divide-y-0">
            {CAPABILITIES.map((capability) => (
              <div key={capability} className="px-5 py-5 text-center">
                <p className="font-mono text-xs text-slate-600 sm:text-sm">{capability}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
