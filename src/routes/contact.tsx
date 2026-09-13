import { createFileRoute } from "@tanstack/react-router"
import { InfoPage } from "@/components/portfolio/info-page"

const description =
  "Contact Abror Abboskhonov about software engineering, frontend systems, full-stack product work, developer tools, and AI applications."

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Abror Abboskhonov" },
      { name: "description", content: description },
      { property: "og:title", content: "Contact — Abror Abboskhonov" },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://abboskhonov.uz/contact" },
    ],
    links: [
      { rel: "canonical", href: "https://abboskhonov.uz/contact" },
      {
        rel: "alternate",
        type: "text/markdown",
        href: "https://abboskhonov.uz/contact.md",
      },
    ],
  }),
})

function ContactPage() {
  return (
    <InfoPage
      title="Contact"
      intro="The best way to reach me is by email or Telegram."
    >
      <p>
        Contact me about software engineering roles, focused product work,
        technical collaboration, or questions about one of my open-source
        projects. I’m most useful on small teams building frontend-heavy
        products, full-stack TypeScript applications, developer tools, voice
        interfaces, or AI-assisted workflows. A helpful first message includes
        what you are building, the problem you want to solve, the expected
        scope, and any relevant timeline or technical constraints.
      </p>
      <p>
        Email is the most reliable channel:{" "}
        <a href="mailto:abboskhonow@gmail.com">abboskhonow@gmail.com</a>. You
        can also message me on <a href="https://t.me/abboskhonow">Telegram</a>,
        review my work on <a href="https://github.com/abboskhonov">GitHub</a>,
        or connect through{" "}
        <a href="https://www.linkedin.com/in/abboskhonov">LinkedIn</a>. These
        are my canonical public contact profiles; messages claiming to be me
        from unrelated accounts should be treated cautiously.
      </p>
      <p>
        I’m based in Tashkent, Uzbekistan, and can collaborate remotely across
        time zones. Please do not send unsolicited bulk sales messages,
        credential requests, private customer data, or confidential material in
        an initial message. For security reports concerning one of my public
        repositories, identify the affected repository and describe a safe way
        to reproduce the issue without publishing an active exploit.
      </p>
    </InfoPage>
  )
}
