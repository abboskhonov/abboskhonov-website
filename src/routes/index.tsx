import { createFileRoute } from "@tanstack/react-router"
import {
  Header,
  Hero,
  Projects,
  Experience,
  Footer,
} from "@/components/portfolio"
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
    year: "2026",
    text: (
      <>
        founding engineer at{" "}
        <TextLink href="https://allline.app">allline</TextLink>
      </>
    ),
  },
  {
    year: "2025",
    text: (
      <>
        software engineer at etamin, building{" "}
        <TextLink href="https://biruniy.uz">biruniy.uz</TextLink>
      </>
    ),
  },
  { year: "2025", text: "frontend developer at cognilabs" },
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
                i'm a software engineer in tashkent, uzbekistan. i'm a founding
                engineer at <TextLink href="https://allline.app">allline</TextLink>
                , building agentic customer-support tools. before that i worked
                on biruniy.uz at etamin and crm dashboards at cognilabs.
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
        />

        <Experience items={timeline} />

        <Projects projects={projects} />

        <Footer />
      </main>
    </div>
  )
}
