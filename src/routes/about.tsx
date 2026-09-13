import { createFileRoute, Link } from "@tanstack/react-router"
import { InfoPage } from "@/components/portfolio/info-page"

const description =
  "About Abror Abboskhonov, a software engineer in Tashkent building thoughtful frontend systems, full-stack products, developer tools, and AI applications."

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Abror Abboskhonov" },
      { name: "description", content: description },
      { property: "og:title", content: "About — Abror Abboskhonov" },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://abboskhonov.uz/about" },
    ],
    links: [
      { rel: "canonical", href: "https://abboskhonov.uz/about" },
      {
        rel: "alternate",
        type: "text/markdown",
        href: "https://abboskhonov.uz/about.md",
      },
    ],
  }),
})

function AboutPage() {
  return (
    <InfoPage
      title="About"
      intro="I build useful software with a focus on clarity, speed, and dependable details."
    >
      <p>
        I’m Abror Abboskhonov, a software engineer based in Tashkent,
        Uzbekistan. I work across frontend engineering and full-stack product
        development, with particular interest in developer tools, AI products,
        local-first software, and interfaces that make complicated workflows
        feel straightforward. I care about accessible structure, responsive
        performance, maintainable TypeScript, and design decisions that support
        the job a person is trying to finish.
      </p>
      <p>
        I’m currently a founding engineer at Finch, where I build agentic
        customer-support tools. Previously, I worked at Etamin on biruniy.uz and
        voice-data infrastructure for AI, and at Cognilabs on B2B CRM dashboards
        with complex tables, forms, permissions, and real-time views. My
        strongest work happens in small teams that ship frequently, talk
        directly about tradeoffs, and keep improving the details after the first
        release.
      </p>
      <p>
        My independent projects include{" "}
        <Link to="/projects/$projectId" params={{ projectId: "whisply" }}>
          Whisply
        </Link>
        ,{" "}
        <Link to="/projects/$projectId" params={{ projectId: "tasteui" }}>
          TasteUI
        </Link>
        ,{" "}
        <Link to="/projects/$projectId" params={{ projectId: "pi-streak" }}>
          pi-streak
        </Link>
        , and{" "}
        <Link to="/projects/$projectId" params={{ projectId: "hermium" }}>
          Hermium
        </Link>
        . Together they reflect the kind of engineering I enjoy: practical
        tools, direct ownership, careful UI, and technology chosen to serve the
        product rather than impress by itself.
      </p>
    </InfoPage>
  )
}
