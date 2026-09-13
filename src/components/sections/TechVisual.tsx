import { useRef, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Custom product visual for the hero — built to look like a real system
 * status panel (deploy status, connected modules, live data flow)
 * rather than an abstract illustration. This is a stand-in for what an
 * internal Ashivam dashboard might look like — not a claim about any
 * specific client system.
 *
 * Desktop pointer interaction: the panel tilts subtly toward the
 * cursor (a few degrees, spring-damped) and the connector dots keep
 * flowing regardless — motion here communicates "live system," not
 * decoration. Fully inert under prefers-reduced-motion or on touch
 * devices (no mousemove events fire there, so it degrades naturally).
 */
export function TechVisual() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    mouseX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    mouseY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const modules = [
    { id: 'api', label: 'API Gateway', x: 24, y: 24 },
    { id: 'queue', label: 'Job Queue', x: 236, y: 24 },
    { id: 'db', label: 'PostgreSQL', x: 24, y: 168 },
    { id: 'ai', label: 'LLM Service', x: 236, y: 168 },
  ];

  const connections: [string, string][] = [
    ['api', 'queue'],
    ['api', 'db'],
    ['queue', 'ai'],
    ['db', 'ai'],
  ];

  const findModule = (id: string) => modules.find((m) => m.id === id)!;

  return (
    <div style={{ perspective: 1000 }} className="w-full max-w-[440px]">
      <motion.div
        ref={ref}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="overflow-hidden rounded-md border border-line bg-surface shadow-lifted"
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>
          <span className="font-mono text-[11px] text-slate-500">system.status</span>
          <span className="flex items-center gap-1.5 rounded-full bg-signal-100 px-2.5 py-1 text-[11px] font-medium text-signal-600">
            <span className="relative flex h-1.5 w-1.5">
              {!shouldReduceMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              )}
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            Live
          </span>
        </div>

        {/* Module diagram */}
        <div className="relative h-[300px] bg-paper/40 p-6" aria-hidden="true">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" fill="none">
            <defs>
              <pattern id="hero-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" strokeWidth="1" className="stroke-line" />
              </pattern>
            </defs>
            <rect width="400" height="300" fill="url(#hero-grid)" opacity="0.6" />

            {connections.map(([a, b], i) => {
              const from = findModule(a);
              const to = findModule(b);
              const x1 = from.x + 70;
              const y1 = from.y + 24;
              const x2 = to.x + 70;
              const y2 = to.y + 24;
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.5" className="stroke-line-dark" />
                  {!shouldReduceMotion && (
                    <motion.circle
                      r="3"
                      className="fill-signal"
                      animate={{
                        cx: [x1, x2],
                        cy: [y1, y2],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: 'linear' }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {modules.map((module) => (
            <div
              key={module.id}
              className="absolute flex h-12 w-[140px] items-center rounded border border-line bg-surface px-3 shadow-sm"
              style={{ left: module.x, top: module.y }}
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span className="ml-2.5 font-mono text-xs text-ink">{module.label}</span>
            </div>
          ))}
        </div>

        {/* Status line */}
        <div className="border-t border-line bg-surface px-4 py-2.5">
          <p className="font-mono text-[11px] text-slate-500">
            <span className="text-signal">✓</span> deployment healthy · 4 services connected
          </p>
        </div>
      </motion.div>
    </div>
  );
}
