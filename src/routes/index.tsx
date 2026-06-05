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
      "Drop-in design skills for your coding agent. Premium dark-themed agency and marketing sites with animated gradient spheres.",
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
      "Building biruniy.uz, an educational platform. One of the key developers shipping features fast and maintaining a clean codebase.",
    stack: "Next.js, React, TypeScript, Bun, Hono, Tailwind CSS",
    logo: "/etamin-logo.webp",
  },
  {
    company: "Cognilabs",
    title: "Frontend Developer",
    period: "May 2025 – Nov 2025",
    description:
      "Mostly worked on building B2B CRM frontends. Owned complex UI features, built reusable component libraries, and collaborated closely with backend teams to deliver clean, performant client dashboards.",
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
          title="Software Engineer"
          location="Namangan, Uzbekistan"
        />

        <Hero
          bio={
            <>
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
                , I mostly worked on building B2B CRM frontends — complex UI
                features, reusable component libraries, and performant client
                dashboards.
              </p>
              <p>
                I care about design, performance, and interfaces that just work. I
                do my best work on small, collaborative teams that ship often.
              </p>
              <p>
                I'm always open for new opportunities to learn and grow.
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