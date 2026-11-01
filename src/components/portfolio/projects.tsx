import { Link } from "@tanstack/react-router"
import type { Project } from "@/data/projects"

interface ProjectsProps {
  projects: Project[]
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId: project.id }}
      className="group block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-500"
    >
      <div
        style={{
          viewTransitionName: `project-image-${project.id}`,
          viewTransitionClass: "project-morph project-image",
        }}
        className="aspect-[16/10] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
      >
        {project.image && (
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="h-full w-full object-cover object-left-top transition-opacity group-hover:opacity-85"
          />
        )}
      </div>
      <p className="mt-2.5">
        <span
          style={{
            viewTransitionName: `project-title-${project.id}`,
            viewTransitionClass: "project-morph",
          }}
          className="text-neutral-900 lowercase dark:text-neutral-200"
        >
          {project.name}
        </span>
      </p>
      <p
        style={{
          viewTransitionName: `project-desc-${project.id}`,
          viewTransitionClass: "project-morph",
        }}
        className="text-neutral-500 lowercase"
      >
        {project.tagline.replace(/\.$/, "")}
      </p>
    </Link>
  )
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section className="mt-14">
      <h2 className="text-neutral-900 dark:text-neutral-200">projects</h2>
      <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
