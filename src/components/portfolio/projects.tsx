import { IconExternalLink } from "@tabler/icons-react";

interface Project {
  id: string;
  name: string;
  description: string;
  image?: string;
}

interface ProjectsProps {
  projects: Project[];
  onProjectClick: (id: string) => void;
}

export function Projects({ projects, onProjectClick }: ProjectsProps) {
  return (
    <section className="mb-20">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
        <div className="shrink-0 lg:w-40">
          <h2 className="text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
            Projects
          </h2>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => onProjectClick(project.id)}
              className="group block text-left"
            >
              <div className="relative mb-5 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 transition-colors dark:border-neutral-800 dark:bg-neutral-900">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="block w-full"
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-[16/10] flex items-center justify-center">
                    <span className="text-sm font-bold tracking-[0.2em] text-neutral-400 transition-colors dark:text-neutral-600">
                      {project.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-neutral-900/0 transition-colors group-hover:bg-neutral-900/5 dark:group-hover:bg-white/5" />
              </div>
              <div className="flex items-center gap-1.5 text-neutral-800 transition-colors group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-neutral-100">
                <span className="font-medium">{project.name}</span>
                <IconExternalLink className="h-3.5 w-3.5 text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-neutral-600" />
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 transition-colors dark:text-neutral-500">
                {project.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
