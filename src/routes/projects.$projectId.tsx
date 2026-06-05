import { createFileRoute, useNavigate } from "@tanstack/react-router"
import React from "react"
const { ViewTransition } = React
import {
  IconArrowLeft,
  IconExternalLink,
  IconBrandGithub,
} from "@tabler/icons-react"
import { ActivityGraph } from "@/components/kibo-ui/contribution-graph/activity-graph"
import { generateDemoData } from "@/components/kibo-ui/contribution-graph/data"

export const Route = createFileRoute("/projects/$projectId")({
  component: ProjectPage,
})

const projectData: Record<
  string,
  {
    name: string
    tagline: string
    description: string
    stack: string[]
    github?: string
    live?: string
    image?: string
    features: string[]
  }
> = {
  "pi-streak": {
    name: "pi-streak",
    tagline:
      "CLI tool that generates GitHub-style contribution graphs from your pi sessions.",
    description:
      "pi-streak tracks your pi coding sessions and visualizes them as a contribution graph, similar to GitHub's commit history. It helps you stay consistent and see your progress over time. Built to gamify the daily habit of shipping code.",
    stack: ["TypeScript", "Node.js", "CLI"],
    github: "https://github.com/abboskhonov/pi-streak",
    features: [
      "GitHub-style contribution heatmap from session data",
      "CLI interface with colored output",
      "Tracks streaks and daily session counts",
      "Lightweight and fast — no external dependencies",
    ],
  },
  biruniy: {
    name: "biruniy.uz",
    tagline: "An educational platform for learning management.",
    description:
      "Built at Etamin, biruniy.uz is a full-stack educational platform for managing courses, students, and learning progress. I am one of the key developers shipping core features and maintaining the architecture.",
    stack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    features: [
      "Course management and content delivery",
      "Student progress tracking",
      "Responsive design for all devices",
      "Scalable architecture for growing user base",
    ],
  },
  "crm-cognilabs": {
    name: "Cognilabs CRM",
    tagline: "CRM systems built for B2B clients.",
    description:
      "Custom CRM dashboards and client management systems built at Cognilabs. Designed to handle complex B2B workflows with clean interfaces and reliable data handling.",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    features: [
      "Custom dashboards for client analytics",
      "Lead and deal management pipelines",
      "Real-time data updates",
      "Role-based access control",
    ],
  },
  hermium: {
    name: "Hermium",
    tagline: "Self-hosted AI chat dashboard for your Hermes agent.",
    description:
      "A port of Hermes Web UI into a modern TanStack Start + Hono + Bun monorepo. Gives you a clean, fast chat interface that connects to your Hermes Agent. One command to install. Zero config to run.",
    stack: ["TanStack Start", "Hono", "Bun", "React", "Zustand", "SQLite"],
    github: "https://github.com/abboskhonov/hermium",
    live: "https://hermium.vercel.app",
    image: "/hermium-demo.png",
    features: [
      "TanStack Start SPA with file-based routing",
      "Hono BFF server with bun:sqlite database",
      "Zustand stores for client state",
      "shadcn/ui with base-nova preset",
      "SSE interception for streaming chat",
      "One-command install, zero-config run",
    ],
  },
}

function ProjectPage() {
  const { projectId } = Route.useParams()
  const project = projectData[projectId]
  const navigate = useNavigate()

  const handleBack = () => {
    navigate({ to: "/", viewTransition: { types: ["nav-back"] } })
  }

  if (!project) {
    return (
      <div className="min-h-svh bg-white font-sans text-lg leading-[1.7] text-neutral-600 transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-neutral-400">
        <main className="mx-auto max-w-prose px-6 py-24">
          <button
            onClick={handleBack}
            className="mb-12 inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-xl font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
            Project not found
          </h1>
        </main>
      </div>
    )
  }

  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "none",
      }}
      default="none"
    >
      <div className="view-transition-page min-h-svh bg-white font-sans text-lg leading-[1.7] text-neutral-600 transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-neutral-400">
        <main className="mx-auto max-w-prose px-6 py-24 md:py-32">
          {/* Back link */}
          <button
            onClick={handleBack}
            className="mb-16 inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back
          </button>

          {/* Project header */}
          <header className="mb-12">
            <h1
              style={{ viewTransitionName: `project-title-${projectId}` }}
              className="mb-3 w-fit text-2xl font-semibold text-neutral-900 transition-colors dark:text-neutral-100"
            >
              {project.name}
            </h1>
            <p
              style={{ viewTransitionName: `project-description-${projectId}` }}
              className="text-neutral-500 transition-colors dark:text-neutral-500"
            >
              {project.tagline}
            </p>
          </header>

          {/* Image */}
          {project.image && (
            <section className="mb-12">
              <img
                src={project.image}
                alt={`${project.name} demo`}
                className="w-full rounded-lg border border-neutral-200 transition-colors dark:border-neutral-800"
              />
            </section>
          )}

          {/* Description */}
          <section className="mb-12">
            <p className="text-neutral-600 transition-colors dark:text-neutral-400">
              {project.description}
            </p>
          </section>

          {/* Stack */}
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

          {/* Features */}
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

          {/* Demo — only for pi-streak */}
          {projectId === "pi-streak" && (
            <section className="mb-12">
              <h2 className="mb-4 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
                Demo
              </h2>
              <p className="mb-6 text-neutral-600 transition-colors dark:text-neutral-400">
                A live preview of the contribution graph generated from sample session data.
              </p>
              <div className="rounded-lg border border-neutral-200 p-4 transition-colors dark:border-neutral-800">
                <ActivityGraph data={generateDemoData({ density: 0.5 })} showTotal={false} />
              </div>
            </section>
          )}

          {/* Links */}
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

          {/* Footer */}
          <footer className="border-t border-neutral-200 pt-8 transition-colors dark:border-neutral-800">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              <IconArrowLeft className="h-4 w-4" />
              Back to all projects
            </button>
          </footer>
        </main>
      </div>
    </ViewTransition>
  )
}
