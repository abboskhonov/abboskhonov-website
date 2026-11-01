import { createFileRoute } from "@tanstack/react-router"
import {
  Header,
  Hero,
  Projects,
  Activity,
  Experience,
  Footer,
} from "@/components/portfolio"
import { ChatButton } from "@/components/portfolio/chat-button"
import { TextLink } from "@/components/portfolio/text-link"
import { projects } from "@/data/projects"

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
})

const timeline = [
  {
    period: "aug 2026 – now",
    text: (
      <>
        founding engineer at{" "}
        <TextLink href="https://allline.app">allline</TextLink>
      </>
    ),
  },
  {
    period: "nov 2025 – jul 2026",
    text: (
      <>
        software engineer at etamin, building{" "}
        <TextLink href="https://biruniy.uz">biruniy.uz</TextLink>
      </>
    ),
  },
  {
    period: "may 2025 – nov 2025",
    text: "frontend developer at cognilabs",
  },
]

function Portfolio() {
  return (
    <div className="view-transition-page flex min-h-svh justify-center bg-white text-sm leading-[23px] text-neutral-500 transition-colors duration-300 dark:bg-[#0a0a0a]">
      <main className="w-full max-w-[580px] px-5 py-16 md:py-20">
        <Header name="abror abboskhonov" title="software engineer" />

        <Hero
          bio={
            <>
              <p>
                i'm a software engineer based in tashkent, uzbekistan. right now
                i'm a founding engineer at{" "}
                <TextLink href="https://allline.app">allline</TextLink>, where i
                build agentic customer-support tools.
              </p>
              <p>
                on the side i build small tools i actually use, like{" "}
                <TextLink href="/projects/whisply">whisply</TextLink> for voice
                dictation on linux and{" "}
                <TextLink href="/projects/pi-streak">pi-streak</TextLink> for
                tracking my coding sessions.
              </p>
            </>
          }
          socialLinks={[
            { label: "github", href: "https://github.com/abboskhonov" },
            { label: "telegram", href: "https://t.me/abboskhonow" },
            { label: "x", href: "https://x.com/abboskhonovv" },
            {
              label: "linkedin",
              href: "https://www.linkedin.com/in/abboskhonov",
            },
            { label: "email", href: "mailto:abboskhonow@gmail.com" },
          ]}
          actions={<ChatButton />}
        />

        <Experience items={timeline} />

        <Activity />

        <Projects projects={projects} />

        <Footer />
      </main>
    </div>
  )
}
