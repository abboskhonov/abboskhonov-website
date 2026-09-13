import { useState, useRef, useCallback, useEffect } from "react"
import { Link, createFileRoute, notFound } from "@tanstack/react-router"
import {
  IconArrowLeft,
  IconExternalLink,
  IconBrandGithub,
  IconX,
} from "@tabler/icons-react"
import { Gallery } from "@/components/portfolio/gallery"
import { getProject } from "@/data/projects"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectPage,
  beforeLoad: ({ params }) => {
    if (!getProject(params.projectId)) {
      throw notFound()
    }
  },
  head: ({ params }) => {
    const project = getProject(params.projectId)
    const title = project
      ? `${project.name} — Abror Abboskhonov`
      : "Project — Abror Abboskhonov"
    const description =
      project?.metaDescription ??
      project?.tagline ??
      "Project by Abror Abboskhonov"
    const image = project?.image ?? "/og-image.png"
    const url = `https://abboskhonov.uz/projects/${params.projectId}`

    const softwareSchema = project
      ? {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: project.name,
          description: project.metaDescription,
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Cross-platform",
          author: {
            "@type": "Person",
            name: "Abror Abboskhonov",
            url: "https://abboskhonov.uz",
          },
        }
      : null

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: `https://abboskhonov.uz${image}` },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `https://abboskhonov.uz${image}` },
      ],
      links: [
        { rel: "canonical", href: url },
        {
          rel: "alternate",
          type: "text/markdown",
          href: `${url}.md`,
        },
      ],
      scripts: softwareSchema
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify(softwareSchema),
            },
          ]
        : [],
    }
  },
})

function ProjectPage() {
  const { projectId } = Route.useParams()
  const project = getProject(projectId)

  const [coverViewerOpen, setCoverViewerOpen] = useState(false)
  const [coverViewerVisible, setCoverViewerVisible] = useState(false)
  const coverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openCoverViewer = useCallback(() => {
    setCoverViewerOpen(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setCoverViewerVisible(true))
    })
  }, [])

  const closeCoverViewer = useCallback(() => {
    setCoverViewerVisible(false)
    if (coverTimerRef.current) clearTimeout(coverTimerRef.current)
    coverTimerRef.current = setTimeout(() => setCoverViewerOpen(false), 300)
  }, [])

  useEffect(() => {
    if (!coverViewerOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCoverViewer()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [coverViewerOpen, closeCoverViewer])

  if (!project) return null

  return (
    <div className="view-transition-page flex min-h-svh justify-center bg-white font-mono text-lg leading-[1.7] text-neutral-600 transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-neutral-400">
      <main className="w-full max-w-prose px-6 py-24 md:py-32">
        <Link
          to="/"
          viewTransition={{ types: ["nav-back"] }}
          className="mb-16 inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          <IconArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <header className="mb-12">
          <h1
            style={{ viewTransitionName: `project-title-${projectId}` }}
            className="mb-3 w-fit text-2xl font-semibold text-neutral-900 transition-colors dark:text-neutral-100"
          >
            {project.name}
          </h1>
          <p
            style={{ viewTransitionName: `project-desc-${projectId}` }}
            className="text-neutral-500 transition-colors dark:text-neutral-500"
          >
            {project.tagline}
          </p>
        </header>

        {project.image && (
          <section className="mb-12">
            <div style={{ viewTransitionName: `project-image-${projectId}` }}>
              <button
                onClick={openCoverViewer}
                className="w-full cursor-zoom-in"
              >
                <img
                  src={project.image}
                  alt={`${project.name} demo`}
                  className="w-full rounded-lg border border-neutral-200 transition-colors dark:border-neutral-800"
                />
              </button>
            </div>
          </section>
        )}

        {/* Cover image viewer */}
        {coverViewerOpen && project.image && (
          <div
            className={cn(
              "fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm transition-all duration-300 ease-out",
              coverViewerVisible ? "opacity-100" : "opacity-0"
            )}
            onClick={closeCoverViewer}
          >
            <button
              onClick={closeCoverViewer}
              className={cn(
                "absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-all duration-300 ease-out hover:bg-white/20",
                coverViewerVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-2 opacity-0"
              )}
              aria-label="Close viewer"
            >
              <IconX className="h-5 w-5" />
            </button>
            <img
              src={project.image}
              alt={`${project.name} demo`}
              className={cn(
                "max-h-[90vh] max-w-[90vw] rounded-lg object-contain transition-all duration-300 ease-out",
                coverViewerVisible
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0"
              )}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
              Gallery
            </h2>
            <Gallery
              images={project.gallery}
              altPrefix={`${project.name} screenshot`}
            />
          </section>
        )}

        <section className="mb-12">
          <p className="text-neutral-600 transition-colors dark:text-neutral-400">
            {project.description}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
            Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-neutral-200 px-3 py-1.5 text-sm text-neutral-500 transition-colors dark:border-neutral-800 dark:text-neutral-500"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
            Features
          </h2>
          <ul className="space-y-3">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 text-neutral-600 transition-colors dark:text-neutral-400"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400 transition-colors dark:bg-neutral-600" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        {project.quickStart && project.quickStart.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
              Quick Start
            </h2>
            <ol className="list-none space-y-3">
              {(() => {
                let stepNum = 1
                return project.quickStart.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-neutral-600 transition-colors dark:text-neutral-400"
                  >
                    {step.startsWith("npx") ? (
                      <pre className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 transition-colors dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                        <code>{step}</code>
                      </pre>
                    ) : (
                      <>
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-600 transition-colors dark:bg-neutral-800 dark:text-neutral-400">
                          {stepNum++}
                        </span>
                        {step}
                      </>
                    )}
                  </li>
                ))
              })()}
            </ol>
          </section>
        )}

        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
            Links
          </h2>
          <div className="space-y-3">
            {project.github && (
              <a
                href={project.github}
                className="group inline-flex items-center gap-2 font-medium text-neutral-800 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
              >
                <IconBrandGithub className="h-5 w-5" />
                <span>View on GitHub</span>
                <IconExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            )}
            {project.npm && (
              <a
                href={project.npm}
                className="group inline-flex items-center gap-2 font-medium text-neutral-800 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
              >
                <IconExternalLink className="h-5 w-5" />
                <span>npm package</span>
                <IconExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                className="group inline-flex items-center gap-2 font-medium text-neutral-800 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
              >
                <IconExternalLink className="h-5 w-5" />
                <span>Live site</span>
                <IconExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            )}
          </div>
        </section>

        <footer className="border-t border-neutral-200 pt-8 transition-colors dark:border-neutral-800">
          <Link
            to="/"
            viewTransition={{ types: ["nav-back"] }}
            className="inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to all projects
          </Link>
        </footer>
      </main>
    </div>
  )
}
