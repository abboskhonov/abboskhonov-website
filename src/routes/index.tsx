import { createFileRoute, useNavigate } from "@tanstack/react-router"
import React from "react"
const { ViewTransition } = React
import { IconExternalLink } from "@tabler/icons-react"
import { ActivityGraph } from "@/components/kibo-ui/contribution-graph/activity-graph"
import { getGithubContributions } from "@/lib/github"

export const Route = createFileRoute("/")({
  component: Portfolio,
  loader: async () => {
    const contributions = await getGithubContributions()
    return { contributions }
  },
  errorComponent: ({ error }) => {
    return (
      <div className="min-h-svh bg-white px-6 py-24 text-neutral-600 dark:bg-[#0a0a0a] dark:text-neutral-400">
        <main className="mx-auto max-w-prose">
          <p className="text-sm text-neutral-500">
            Could not load GitHub contributions: {error.message}
          </p>
        </main>
      </div>
    )
  },
})

const projects = [
  {
    id: "hermium",
    name: "Hermium",
    description:
      "Self-hosted AI chat dashboard for your Hermes agent. TanStack Start + Hono + Bun.",
  },
  {
    id: "pi-streak",
    name: "pi-streak",
    description:
      "A CLI tool that generates GitHub-style contribution graphs from your pi sessions.",
  },
  {
    id: "biruniy",
    name: "biruniy.uz",
    description:
      "An educational platform built at Etamin. Full-stack application for learning management.",
  },
  {
    id: "crm-cognilabs",
    name: "Cognilabs CRM",
    description:
      "CRM systems built for B2B clients at Cognilabs. Custom dashboards and client management.",
  },
]

const experiences = [
  {
    company: "Etamin",
    title: "Software Engineer",
    period: "Nov 2025 – Now",
    description:
      "Building biruniy.uz, an educational platform. One of the key developers shipping features fast and maintaining a clean codebase.",
    stack: "React, TypeScript, Next.js, Tailwind CSS",
  },
  {
    company: "Cognilabs",
    title: "Software Engineer",
    period: "May 2025 – Nov 2025",
    description:
      "Joined as an intern and became one of the main developers in under six months. Built CRM systems for B2B clients from scratch.",
    stack: "React, TypeScript, Node.js, PostgreSQL",
  },
]

const recommendations = [
  {
    text: "Abror is an excellent teammate and a talented developer. His thoughtful approach to producing work and attention to detail make him a strong collaborator.",
    author: "Colleague Name",
    role: "Senior Developer",
  },
  {
    text: "A natural problem solver with a keen eye for design. Abror is able to interpret designs with care and detail that is rare.",
    author: "Another Colleague",
    role: "Product Designer",
  },
]

const oss = [
  {
    repo: "shadcn-ui/ui",
    pr: "#1234",
    description: "Add support for custom variants",
  },
  {
    repo: "vercel/next.js",
    pr: "#5678",
    description: "Improve layout flexibility",
  },
  {
    repo: "tailwindlabs/tailwindcss",
    pr: "#9012",
    description: "Fix plugin resolution",
  },
]

const footerLinks = [
  { label: "GitHub", handle: "@abrorkhon", href: "https://github.com" },
  { label: "X", handle: "@abrorkhon", href: "https://x.com" },
  { label: "LinkedIn", handle: "@abrorkhon", href: "https://linkedin.com" },
]

function Portfolio() {
  const navigate = useNavigate()
  const { contributions } = Route.useLoaderData()

  const handleProjectClick = (projectId: string) => {
    navigate({
      to: "/projects/$projectId",
      params: { projectId },
      viewTransition: { types: ["nav-forward"] },
    })
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
          {/* Header with avatar */}
          <header className="mb-20">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-lg font-semibold text-neutral-600 transition-colors dark:bg-neutral-800 dark:text-neutral-400">
                AA
              </div>
              <div>
                <div className="text-xl font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
                  Abror Abboskhonov
                </div>
                <div className="text-neutral-500 transition-colors dark:text-neutral-500">
                  Software Engineer
                </div>
              </div>
            </div>
            <div className="text-neutral-400 transition-colors dark:text-neutral-600">
              Namangan, Uzbekistan
            </div>
          </header>

          {/* Hero / Bio */}
          <section className="mb-20">
            <div className="space-y-5 text-neutral-600 transition-colors dark:text-neutral-400">
              <p>
                I'm Abror Abboskhonov, a software engineer at{" "}
                <a
                  href="https://etamin.uz"
                  className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-900 dark:text-neutral-200 dark:decoration-neutral-700 dark:hover:text-neutral-100"
                >
                  Etamin
                </a>
                . I've been building software since 2024. I work on frontend
                interfaces, full-stack applications, and the tools people use.
              </p>
              <p>
                Earlier, at{" "}
                <a
                  href="https://cognilabs.org"
                  className="font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-900 dark:text-neutral-200 dark:decoration-neutral-700 dark:hover:text-neutral-100"
                >
                  Cognilabs
                </a>
                , I joined as an intern and became one of the main developers
                in under six months. I worked on CRM systems for B2B clients
                from scratch.
              </p>
              <p>
                I care about design, performance, and interfaces that just work.
                I do my best work on small, collaborative teams that ship
                often.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-neutral-500 transition-colors dark:text-neutral-500">
              <a
                href="https://github.com/abboskhonov"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-neutral-800 dark:hover:text-neutral-200"
              >
                <IconExternalLink className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://x.com"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-neutral-800 dark:hover:text-neutral-200"
              >
                <IconExternalLink className="h-4 w-4" />
                X
              </a>
              <a
                href="https://linkedin.com"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-neutral-800 dark:hover:text-neutral-200"
              >
                <IconExternalLink className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-20">
            <h2 className="mb-8 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className="group block text-left"
                >
                  <div className="flex items-center gap-2 text-neutral-800 transition-colors group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-neutral-100">
                    <span className="font-medium">{project.name}</span>
                    <IconExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="mt-1 text-neutral-500 transition-colors dark:text-neutral-500">
                    {project.description}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Activity */}
          <section className="mb-20">
            <h2 className="mb-8 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
              Activity
            </h2>
            <ActivityGraph data={contributions} />
          </section>

          {/* Experience */}
          <section className="mb-20">
            <h2 className="mb-8 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
              Experience
            </h2>
            <div className="space-y-10">
              {experiences.map((exp) => (
                <div key={exp.company}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-medium text-neutral-800 transition-colors dark:text-neutral-300">
                      {exp.company}
                    </span>
                    <span className="text-neutral-500 transition-colors dark:text-neutral-500">
                      {exp.title}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-neutral-400 transition-colors dark:text-neutral-600">
                    {exp.period}
                  </div>
                  <p className="mt-3 text-neutral-600 transition-colors dark:text-neutral-400">
                    {exp.description}
                  </p>
                  <p className="mt-2 text-sm text-neutral-400 transition-colors dark:text-neutral-600">
                    {exp.stack}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Recommendations */}
          <section className="mb-20">
            <h2 className="mb-8 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
              Recommendations
            </h2>
            <div className="space-y-10">
              {recommendations.map((rec) => (
                <blockquote key={rec.author}>
                  <p className="text-neutral-600 transition-colors dark:text-neutral-400">
                    {rec.text}
                  </p>
                  <footer className="mt-4">
                    <div className="font-medium text-neutral-800 transition-colors dark:text-neutral-300">
                      {rec.author}
                    </div>
                    <div className="text-sm text-neutral-500 transition-colors dark:text-neutral-500">
                      {rec.role}
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>

          {/* OSS */}
          <section className="mb-20">
            <h2 className="mb-8 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
              OSS Contributions
            </h2>
            <div className="space-y-4">
              {oss.map((item) => (
                <a
                  key={`${item.repo}-${item.pr}`}
                  href="#"
                  className="group block"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600 transition-colors dark:text-purple-400">
                      ⎇
                    </span>
                    <span className="font-medium text-neutral-800 transition-colors group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-neutral-100">
                      {item.repo}
                    </span>
                    <IconExternalLink className="h-4 w-4 text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-neutral-600" />
                  </div>
                  <p className="mt-1 pl-5 text-neutral-500 transition-colors dark:text-neutral-500">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-neutral-200 pt-12 transition-colors dark:border-neutral-800">
            <div className="mb-8 text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
              Connect
            </div>
            <div className="space-y-4">
              {footerLinks.map((link) => (
                <div key={link.label}>
                  <div className="text-sm text-neutral-500 transition-colors dark:text-neutral-500">
                    {link.label}
                  </div>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 font-medium text-neutral-800 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
                  >
                    {link.handle}
                    <IconExternalLink className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-12 flex items-center justify-between text-sm text-neutral-300 transition-colors dark:text-neutral-700">
              <span>Version</span>
              <span>v1.0.0</span>
            </div>
          </footer>
        </main>
      </div>
    </ViewTransition>
  )
}
