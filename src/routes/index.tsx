import { createFileRoute } from "@tanstack/react-router"
import {
  Header,
  Hero,
  Projects,
  Activity,
  Experience,
  Footer,
} from "@/components/portfolio"
import { projects } from "@/data/projects"
import { getGithubContributions } from "@/lib/github"

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    links: [
      { rel: "canonical", href: "https://abboskhonov.uz" },
      {
        rel: "alternate",
        type: "text/markdown",
        href: "https://abboskhonov.uz/index.md",
      },
    ],
  }),
  loader: async () => {
    try {
      const contributions = await getGithubContributions()
      return { contributions, error: null }
    } catch (err) {
      return {
        contributions: [],
        error: err instanceof Error ? err.message : "Unknown error",
      }
    }
  },
})

const experiences = [
  {
    company: "Finch",
    title: "Founding Engineer",
    period: "Aug 2026 – Now",
    description: "Building agentic customer support tools.",
    logo: "/finch-logo.svg",
  },
  {
    company: "Etamin",
    title: "Software Engineer",
    period: "Nov 2025 – Jul 2026",
    description: "Built biruniy.uz and voice data infrastructure for AI.",
    stack: "Next.js, React, TypeScript, Bun, Hono, Tailwind CSS",
    logo: "/etamin-logo.webp",
  },
  {
    company: "Cognilabs",
    title: "Frontend Developer",
    period: "May 2025 – Nov 2025",
    description:
      "Built b2b crm dashboards — complex data tables, multi-step forms, and real-time views.",
    stack: "React, TypeScript, Tailwind CSS",
    logo: "/cognilabs-logo.webp",
  },
]

function Portfolio() {
  const { contributions, error } = Route.useLoaderData()

  return (
    <div className="view-transition-page flex min-h-svh justify-center bg-white font-mono text-lg leading-[1.7] text-neutral-600 transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-neutral-400">
      <main className="w-full max-w-6xl px-6 py-24 md:py-32">
        <Header
          name="Abror Abboskhonov"
          title="founding engineer"
          company="finch"
          companyHref="https://tryfinch.app"
          location="Tashkent, Uzbekistan"
        />

        <Hero
          bio={
            <>
              <p>
                i love building things and solving problems. i enjoy working on
                frontend interfaces, full-stack apps, and the tools people
                actually use. i care about design, performance, and code that
                just works.
              </p>
              <p>
                i do my best work on small teams that ship often and obsess over
                the details. if i'm not coding, i'm probably exploring new dev
                tools, deep in a tech talk, or tweaking my setup.
              </p>
            </>
          }
          socialLinks={[
            { label: "GitHub", href: "https://github.com/abboskhonov" },
            { label: "Telegram", href: "https://t.me/abboskhonow" },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/abboskhonov",
            },
            { label: "X", href: "https://x.com/abboskhonovv" },
            { label: "Email", href: "mailto:abboskhonow@gmail.com" },
          ]}
        />

        <Projects projects={projects} />

        <Activity data={contributions} error={error} />

        <Experience items={experiences} />

        <Footer />
      </main>
    </div>
  )
}
