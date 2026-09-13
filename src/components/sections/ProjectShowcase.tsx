import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';

/**
 * One large featured case study instead of a uniform card grid — the
 * featured slot uses a generated pattern block instead of a stock photo
 * or a fabricated screenshot, since no real project imagery exists yet.
 */
export function ProjectShowcase() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.slug !== featured.slug);

  return (
    <div className="space-y-10">
      <article className="grid overflow-hidden rounded-md border border-line md:grid-cols-2">
        <div className="relative flex min-h-[220px] items-center justify-center bg-surface p-8 md:min-h-[320px]">
          <svg viewBox="0 0 200 200" className="h-32 w-32 opacity-80" aria-hidden="true">
            <rect x="20" y="20" width="160" height="160" rx="8" fill="none" strokeWidth="1" className="stroke-line-dark" />
            <rect x="45" y="45" width="110" height="110" rx="6" fill="none" strokeWidth="1" className="stroke-signal" />
            <circle cx="100" cy="100" r="30" fill="none" strokeWidth="1" className="stroke-ink" />
          </svg>
          <span className="absolute left-6 top-6 rounded-full bg-ink/10 px-3 py-1 font-mono text-xs text-ink/80">
            {featured.category}
          </span>
        </div>
        <div className="flex flex-col justify-center p-8 md:p-10">
          {featured.isPlaceholder && (
            <span className="mb-4 inline-block w-fit rounded-full bg-surface px-3 py-1 text-xs text-slate-600">
              Project concept
            </span>
          )}
          <h3 className="text-2xl font-semibold text-ink md:text-3xl">{featured.title}</h3>
          <p className="mt-3 text-slate-600">{featured.description}</p>
          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-6 text-sm">
            <div>
              <dt className="font-mono text-xs text-slate-500">
                {featured.isPlaceholder ? 'Typical challenge' : 'Challenge'}
              </dt>
              <dd className="mt-1 text-slate-600">{featured.challenge}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-slate-500">
                {featured.isPlaceholder ? 'Our approach' : 'Solution'}
              </dt>
              <dd className="mt-1 text-slate-600">{featured.solution}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs text-slate-500">
                {featured.isPlaceholder ? 'Designed to achieve' : 'Result'}
              </dt>
              <dd className="mt-1 text-slate-600">{featured.result}</dd>
            </div>
          </dl>
          <ul className="mt-6 flex flex-wrap gap-2">
            {featured.technologies.map((tech) => (
              <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-slate-700">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </article>

      {rest.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
