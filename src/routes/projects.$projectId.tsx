import {
  useState,
  useCallback,
  useEffect,
  useRef,
  startTransition,
  ViewTransition,
} from "react"
import { Link, createFileRoute, notFound } from "@tanstack/react-router"
import { IconX } from "@tabler/icons-react"
import { Footer } from "@/components/portfolio"
import { Gallery } from "@/components/portfolio/gallery"
import { TextLink } from "@/components/portfolio/text-link"
import {
  getProject,
  loadedImageCopy,
  preloadImage,
  projectImageProps,
} from "@/data/projects"
import type { Project } from "@/data/projects"

const COVER_SIZES = "(min-width: 580px) 540px, calc(100vw - 40px)"

const coverImageProps = (project: Project) => ({
  ...projectImageProps(project),
  sizes: COVER_SIZES,
})

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectPage,
  beforeLoad: ({ params }) => {
    if (!getProject(params.projectId)) {
      throw notFound()
    }
  },
  // The homepage card shows a smaller copy than the cover, so without this
  // the image would morph into an empty box. It runs when a card is hovered
  // or touched, and before the view transition starts. If the cover is still
  // loading after that, the card's copy stands in for it.
  loader: async ({ params }) => {
    const project = getProject(params.projectId)
    if (!project?.image) return { coverPlaceholder: undefined }
    const coverPlaceholder = loadedImageCopy(project)
    await preloadImage(coverImageProps(project))
    return { coverPlaceholder }
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
    const image = project?.ogImage ?? project?.image ?? "/og-image.png"
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
  const { coverPlaceholder: pagePlaceholder } = Route.useLoaderData()

  const [coverViewerOpen, setCoverViewerOpen] = useState(false)
  const coverRef = useRef<HTMLImageElement>(null)
  // The copy the page already shows, displayed behind the full-size image
  // in the viewer so it never morphs into an empty box while that loads.
  const [coverPlaceholder, setCoverPlaceholder] = useState<string>()

  const preloadFullCover = useCallback(() => {
    if (project?.image) preloadImage({ src: project.image })
  }, [project?.image])

  // Inside startTransition so <ViewTransition> morphs the image between the
  // page and the viewer.
  const openCoverViewer = useCallback(() => {
    const placeholder = coverRef.current?.currentSrc
    startTransition(() => {
      setCoverPlaceholder(placeholder)
      setCoverViewerOpen(true)
    })
  }, [])

  const closeCoverViewer = useCallback(() => {
    startTransition(() => setCoverViewerOpen(false))
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

  const coverImage = coverImageProps(project)
  const [coverWidth, coverHeight] = project.imageSize ?? []

  const links = [
    project.github && { label: "github", href: project.github },
    project.npm && { label: "npm", href: project.npm },
    project.live && { label: "live site", href: project.live },
  ].filter((link) => !!link)

  return (
    <div className="view-transition-page flex min-h-svh justify-center bg-white text-sm leading-[23px] text-neutral-500 transition-colors duration-300 dark:bg-[#0a0a0a]">
      <main className="w-full max-w-[580px] px-5 py-16 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 transition-colors hover:text-neutral-900 dark:hover:text-neutral-200"
        >
          {/* An SVG rather than "←": Geist's arrow glyph sits below the
              letters' center. */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden
          >
            <path d="M19 12H5m6 6-6-6 6-6" />
          </svg>
          back
        </Link>

        {/* Same text as the homepage card, so the morph is a pure move. */}
        <header className="mt-10">
          <h1
            style={{
              viewTransitionName: `project-title-${projectId}`,
              viewTransitionClass: "project-morph",
            }}
            className="w-fit text-neutral-900 lowercase dark:text-neutral-200"
          >
            {project.name}
          </h1>
          <p
            style={{
              viewTransitionName: `project-desc-${projectId}`,
              viewTransitionClass: "project-morph",
            }}
            className="w-fit lowercase"
          >
            {project.tagline.replace(/\.$/, "")}
          </p>
          {links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {links.map((link) => (
                <TextLink key={link.label} href={link.href}>
                  {link.label}
                </TextLink>
              ))}
            </div>
          )}
        </header>

        {project.image && (
          <section className="mt-8">
            <div
              style={{
                viewTransitionName: `project-image-${projectId}`,
                viewTransitionClass: "project-morph project-image",
              }}
            >
              <button
                onClick={openCoverViewer}
                onPointerEnter={preloadFullCover}
                onFocus={preloadFullCover}
                className="w-full cursor-zoom-in"
              >
                {/* Only one element may hold the shared name at a time: while
                    the viewer is open, a hidden copy keeps the layout. */}
                {coverViewerOpen ? (
                  <img
                    {...coverImage}
                    alt=""
                    className="invisible w-full rounded-lg border"
                  />
                ) : (
                  <ViewTransition
                    name={`cover-${projectId}`}
                    share="image-morph"
                    default="none"
                  >
                    <img
                      ref={coverRef}
                      {...coverImage}
                      alt={`${project.name} demo`}
                      fetchPriority="high"
                      style={
                        pagePlaceholder
                          ? { backgroundImage: `url("${pagePlaceholder}")` }
                          : undefined
                      }
                      className="w-full rounded-lg border border-neutral-200 bg-cover dark:border-neutral-800"
                    />
                  </ViewTransition>
                )}
              </button>
            </div>
          </section>
        )}

        {/* Cover image viewer */}
        {coverViewerOpen && project.image && (
          <ViewTransition
            enter="lightbox-backdrop"
            exit="lightbox-backdrop"
            default="none"
          >
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
              onClick={closeCoverViewer}
            >
              <button
                onClick={closeCoverViewer}
                className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                aria-label="Close viewer"
              >
                <IconX className="h-5 w-5" />
              </button>
              <ViewTransition
                name={`cover-${projectId}`}
                share="image-morph"
                default="none"
              >
                <img
                  src={project.image}
                  alt={`${project.name} demo`}
                  style={
                    coverWidth && coverHeight
                      ? {
                          // Sized up front, so the box is right before the
                          // image arrives.
                          aspectRatio: `${coverWidth} / ${coverHeight}`,
                          width: `min(90vw, 90vh * ${coverWidth / coverHeight})`,
                          backgroundImage: coverPlaceholder
                            ? `url("${coverPlaceholder}")`
                            : undefined,
                        }
                      : undefined
                  }
                  className="max-h-[90vh] max-w-[90vw] rounded-lg bg-cover object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </ViewTransition>
            </div>
          </ViewTransition>
        )}

        <p className="mt-8 text-neutral-900 dark:text-neutral-200">
          {project.description}
        </p>

        <Section title="stack">
          <p>{project.stack.join(" · ")}</p>
        </Section>

        <Section title="features">
          <ul className="space-y-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex">
                <span className="w-6 shrink-0">–</span>
                <span className="text-neutral-900 dark:text-neutral-200">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {project.quickStart && project.quickStart.length > 0 && (
          <Section title="quick start">
            <ol className="space-y-2">
              {(() => {
                let stepNum = 1
                return project.quickStart.map((step, i) =>
                  step.startsWith("npx") ? (
                    <li key={i} className="pl-6">
                      <pre className="overflow-x-auto rounded-md bg-neutral-100 px-3 py-2 font-mono text-[13px] text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
                        <code>{step}</code>
                      </pre>
                    </li>
                  ) : (
                    <li key={i} className="flex">
                      <span className="w-6 shrink-0 tabular-nums">
                        {stepNum++}
                      </span>
                      <span className="text-neutral-900 dark:text-neutral-200">
                        {step}
                      </span>
                    </li>
                  )
                )
              })()}
            </ol>
          </Section>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <Section title="gallery">
            <Gallery
              images={project.gallery}
              altPrefix={`${project.name} screenshot`}
            />
          </Section>
        )}

        <Footer />
      </main>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-14">
      <h2 className="mb-4 text-neutral-900 dark:text-neutral-200">{title}</h2>
      {children}
    </section>
  )
}
