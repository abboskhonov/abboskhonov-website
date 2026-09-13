import { createFileRoute } from "@tanstack/react-router"
import { InfoPage } from "@/components/portfolio/info-page"

const description =
  "Privacy information for abboskhonov.uz, including hosting, GitHub activity, theme preferences, external links, and the Finch support widget."

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy — Abror Abboskhonov" },
      { name: "description", content: description },
      { property: "og:title", content: "Privacy — Abror Abboskhonov" },
      { property: "og:description", content: description },
      { property: "og:url", content: "https://abboskhonov.uz/privacy" },
    ],
    links: [
      { rel: "canonical", href: "https://abboskhonov.uz/privacy" },
      {
        rel: "alternate",
        type: "text/markdown",
        href: "https://abboskhonov.uz/privacy.md",
      },
    ],
  }),
})

function PrivacyPage() {
  return (
    <InfoPage
      title="Privacy"
      intro="This page explains the limited data involved when you visit abboskhonov.uz."
    >
      <p>
        This is a personal portfolio, not an account-based service. The site
        does not ask you to create an account, submit payment information, or
        provide personal details to view its public pages. The interface stores
        your light or dark theme preference in your browser’s local storage so
        the choice can persist between visits. That preference stays in your
        browser unless browser settings, extensions, or synchronization features
        move it elsewhere.
      </p>
      <p>
        The site is delivered through Cloudflare, which may process standard
        request information such as IP address, user agent, requested URL,
        timing, and security signals to serve and protect the website. The
        activity section requests public contribution information from GitHub on
        the server and does not require access to a visitor’s GitHub account.
        Normal infrastructure logs may be retained temporarily for reliability,
        abuse prevention, and debugging.
      </p>
      <p>
        A Finch customer-support widget is loaded on the site. If you interact
        with that widget, Finch may process the messages and technical metadata
        needed to provide the conversation. External links—including GitHub,
        Telegram, LinkedIn, X, npm, and project websites—are governed by those
        services’ own privacy practices after you leave this domain. Avoid
        placing secrets or sensitive personal data into messages. For privacy
        questions or deletion requests relating to a conversation you sent,
        email <a href="mailto:abboskhonow@gmail.com">abboskhonow@gmail.com</a>
        with enough context to locate the request.
      </p>
      <p>Last updated: September 13, 2026.</p>
    </InfoPage>
  )
}
