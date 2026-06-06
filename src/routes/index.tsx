import { createFileRoute, useNavigate } from "@tanstack/react-router"
import {
  Header,
  Hero,
  Projects,
  Activity,
  Experience,
  Footer,
} from "@/components/portfolio"
import { getGithubContributions } from "@/lib/github"

export const Route = createFileRoute("/")({
  component: Portfolio,
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

const projects = [
  {
    id: "tasteui",
    name: "TasteUI",
    description:
      "Design system inspirations for AI agents. Drop-in SKILL.md files that describe real brand aesthetics so your coding agent builds matching UI instead of generic averages.",
    image: "/projects/tasteui-home.png",
  },
  {
    id: "pi-streak",
    name: "pi-streak",
    description:
      "A CLI tool that generates GitHub-style contribution graphs from your pi sessions.",
    image: "/projects/pi-streak-home.png",
  },
  {
    id: "hermium",
    name: "Hermium",
    description:
      "Self-hosted AI chat dashboard for your Hermes agent. TanStack Start + Hono + Bun.",
    image: "/hermium-demo.png",
  },
]

const experiences = [
  {
    company: "Etamin",
    title: "Software Engineer",
    period: "Nov 2025 – Now",
    description:
      "Building biruniy.uz and voice data infrastructure for AI.",
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
    logo: "/cognilabs-logo.png",
  },
]

function Portfolio() {
  const navigate = useNavigate()
  const { contributions, error } = Route.useLoaderData()

  const handleProjectClick = (projectId: string) => {
    navigate({
      to: "/projects/$projectId",
      params: { projectId },
      viewTransition: { types: ["nav-forward"] },
    })
  }

  return (
    <div className="view-transition-page flex min-h-svh justify-center bg-white font-mono text-lg leading-[1.7] text-neutral-600 transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-neutral-400">
      <main className="w-full max-w-6xl px-6 py-24 md:py-32">
        <Header
          name="Abror Abboskhonov"
          title="software engineer"
          company="etamin"
          companyHref="https://etamin.uz"
          location="Namangan, Uzbekistan"
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
                i do my best work on small teams that ship often and obsess
                over the details. if i'm not coding, i'm probably exploring new
                dev tools, deep in a tech talk, or tweaking my setup.
              </p>
            </>
          }
          socialLinks={[
            { label: "GitHub", href: "https://github.com/abboskhonov" },
            { label: "Telegram", href: "https://t.me/abboskhonow" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/abboskhonov" },
            { label: "X", href: "https://x.com/abboskhonovv" },
            { label: "Email", href: "mailto:abboskhonow@gmail.com" },
          ]}
        />

        <Projects
          projects={projects}
          onProjectClick={handleProjectClick}
        />

        <Activity data={contributions} error={error} />

        <Experience items={experiences} />

        <Footer />
      </main>
    </div>
  )
}