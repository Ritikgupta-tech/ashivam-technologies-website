import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-slate-500">{project.category}</span>
        {project.isPlaceholder && (
          <span className="rounded-full bg-surface px-3 py-1 text-xs text-slate-600">
            Project concept
          </span>
        )}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-ink">{project.title}</h3>
      <p className="mt-3 text-slate-600">{project.description}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-slate-700">
            {tech}
          </li>
        ))}
      </ul>
      {(project.challenge || project.solution || project.result) && (
        <dl className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
          {project.challenge && (
            <div>
              <dt className="font-medium text-ink">{project.isPlaceholder ? 'Typical challenge' : 'Challenge'}</dt>
              <dd className="text-slate-600">{project.challenge}</dd>
            </div>
          )}
          {project.solution && (
            <div>
              <dt className="font-medium text-ink">{project.isPlaceholder ? 'Our approach' : 'Solution'}</dt>
              <dd className="text-slate-600">{project.solution}</dd>
            </div>
          )}
          {project.result && (
            <div>
              <dt className="font-medium text-ink">{project.isPlaceholder ? "What it's designed to achieve" : 'Result'}</dt>
              <dd className="text-slate-600">{project.result}</dd>
            </div>
          )}
        </dl>
      )}
    </article>
  );
}
