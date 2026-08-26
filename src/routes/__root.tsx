import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { ThemeProvider } from "@/components/theme-toggle"

import appCss from "../styles.css?url"

const SITE_URL = "https://abboskhonov.uz"
const SITE_NAME = "Abror Abboskhonov"
const DESCRIPTION = "Founding Engineer at Finch. Building frontend interfaces, full-stack applications, and the tools people use. Based in Tashkent, Uzbekistan."
const OG_IMAGE = "/og-image.png"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Abror Abboskhonov — Software Engineer",
      },
      {
        name: "description",
        content: DESCRIPTION,
      },
      {
        name: "keywords",
        content: "Abror Abboskhonov, abboskhonov, abror abboskhonov, abror abbosxonov, abror, abboskhonovv, software engineer, frontend developer, tashkent, uzbekistan",
      },
      {
        name: "author",
        content: SITE_NAME,
      },
      {
        name: "robots",
        content: "index, follow",
      },
      {
        name: "theme-color",
        content: "#0a0a0a",
      },
      // Open Graph
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:site_name",
        content: SITE_NAME,
      },
      {
        property: "og:title",
        content: "Abror Abboskhonov — Software Engineer",
      },
      {
        property: "og:description",
        content: DESCRIPTION,
      },
      {
        property: "og:image",
        content: `${SITE_URL}${OG_IMAGE}`,
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:url",
        content: SITE_URL,
      },
      // Twitter Card
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Abror Abboskhonov — Software Engineer",
      },
      {
        name: "twitter:description",
        content: DESCRIPTION,
      },
      {
        name: "twitter:image",
        content: `${SITE_URL}${OG_IMAGE}`,
      },
      {
        name: "twitter:creator",
        content: "@abboskhonovv",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "canonical",
        href: SITE_URL,
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/favicon.svg",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        href: "/favicon.ico",
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  ),
  shellComponent: RootDocument,
})

const themeScript = `
(function () {
  try {
    var theme = localStorage.getItem('theme') || 'dark';
    var root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  } catch (_) {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  }
})();
`

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Abror Abboskhonov",
  "jobTitle": "Founding Engineer",
  "url": "https://abboskhonov.uz",
  "sameAs": [
    "https://github.com/abboskhonov",
    "https://www.linkedin.com/in/abboskhonov",
    "https://x.com/abboskhonovv",
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Finch",
    "url": "https://tryfinch.app",
  },
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark bg-background" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="bg-background">
        <ThemeProvider>{children}</ThemeProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.finchSettings = {
  channelId: "01a03ff3-2c40-78e8-a88f-b5d5f3f0c8f9",
};`,
          }}
        />
        <script src="https://widget.tryfinch.dev/loader.js" async />
        <Scripts />
      </body>
    </html>
  )
}
