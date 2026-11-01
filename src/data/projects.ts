export interface Project {
  id: string
  name: string
  tagline: string
  metaDescription: string
  description: string
  stack: string[]
  github?: string
  live?: string
  npm?: string
  image?: string
  // Pixel size of `image`; resized copies (-640, -1280) sit next to it.
  imageSize?: [width: number, height: number]
  // For link previews, which handle WebP unreliably. Defaults to `image`.
  ogImage?: string
  gallery?: string[]
  features: string[]
  quickStart?: string[]
}

export const projects: Project[] = [
  {
    id: "whisply",
    name: "Whisply",
    tagline: "Private, local-first voice dictation for Linux.",
    metaDescription:
      "Whisply is a local-first Linux desktop dictation app that transcribes speech on-device and inserts it into the app already in focus.",
    description:
      "Whisply is a Linux desktop dictation app for people who want the speed of speaking without handing their voice to a transcription service. It transcribes speech locally, then places the finished text into the app already in focus.",
    stack: ["Tauri", "React", "TypeScript", "Rust", "sherpa-onnx"],
    github: "https://github.com/abboskhonov/whisply",
    image: "/projects/whisply-demo.webp",
    imageSize: [1920, 1080],
    ogImage: "/projects/whisply-demo.png",
    features: [
      "Local, CPU-backed speech recognition with models you choose",
      "Global shortcut for press-and-hold or tap-to-toggle dictation",
      "Text insertion into the currently focused Linux app",
      "Dictation history, insights, and reusable voice-triggered snippets",
      "A lightweight recording overlay and tray icon that keep focus in your work",
    ],
  },
  {
    id: "tasteui",
    name: "TasteUI",
    tagline: "Drop-in design skills for your coding agent.",
    metaDescription:
      "TasteUI provides drop-in design skill files for coding agents. Browse brand-inspired design systems, install them via CLI, and let AI build matching UI instead of generic templates.",
    description:
      "Design skills for your coding agent. Drop-in markdown files that capture real brand aesthetics so AI builds matching UI instead of generic templates.",
    stack: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/abboskhonov/tasteui",
    live: "https://tasteui.dev",
    image: "/projects/tasteui-home.webp",
    imageSize: [1920, 1033],
    gallery: ["/projects/tasteui-2.webp"],
    features: [
      "Browse design system inspirations from popular brands",
      "Install skills via CLI into your project",
      "AI agents read SKILL.md and build matching UI",
    ],
    quickStart: [
      "Browse skills from popular brands and pick one that matches your aesthetic",
      "Install a skill into your project:",
      "npx tasteui add <skill>",
      "Tell your AI agent to use the skill file as a design reference",
      "The agent reads the markdown and builds UI matching the design system",
    ],
  },
  {
    id: "pi-streak",
    name: "pi-streak",
    tagline:
      "CLI tool that generates GitHub-style contribution graphs from your pi sessions.",
    metaDescription:
      "pi-streak tracks your coding sessions and generates GitHub-style contribution graphs from the command line. Stay consistent, build streaks, and visualize your daily progress in the terminal.",
    description:
      "pi-streak tracks your pi coding sessions and visualizes them as a contribution graph, similar to GitHub's commit history. It helps you stay consistent and see your progress over time. Built to gamify the daily habit of shipping code.",
    stack: ["TypeScript", "Node.js", "CLI"],
    github: "https://github.com/abboskhonov/pi-streak",
    npm: "https://www.npmjs.com/package/pi-streak",
    image: "/projects/pi-streak-home.webp",
    imageSize: [771, 400],
    gallery: [
      "/projects/pi-streak-models.webp",
      "/projects/pi-streak-rank.webp",
      "/projects/pi-streak-review1.webp",
      "/projects/pi-streak-review2.webp",
      "/projects/pi-streak-review3.webp",
    ],
    features: [
      "GitHub-style contribution heatmap from session data",
      "CLI interface with colored output",
      "Tracks streaks and daily session counts",
      "Lightweight and fast — no external dependencies",
    ],
  },
  {
    id: "hermium",
    name: "Hermium",
    tagline: "Self-hosted AI chat dashboard for your Hermes agent.",
    metaDescription:
      "Hermium is a self-hosted AI chat dashboard for Hermes Agent built with TanStack Start, Hono, and Bun. One-command install, zero-config setup, and a clean chat interface with streaming.",
    description:
      "A port of Hermes Web UI into a modern TanStack Start + Hono + Bun monorepo. Gives you a clean, fast chat interface that connects to your Hermes Agent. One command to install. Zero config to run.",
    stack: ["TanStack Start", "Hono", "Bun", "React", "Zustand", "SQLite"],
    github: "https://github.com/abboskhonov/hermium",
    live: "https://hermium.vercel.app",
    image: "/hermium-demo.webp",
    imageSize: [1920, 1080],
    gallery: ["/projects/hermium-review.webp"],
    features: [
      "TanStack Start SPA with file-based routing",
      "Hono BFF server with bun:sqlite database",
      "Zustand stores for client state",
      "shadcn/ui with base-nova preset",
      "SSE interception for streaming chat",
      "One-command install, zero-config run",
    ],
  },
]

export function getProject(projectId: string) {
  return projects.find((project) => project.id === projectId)
}

const RESIZED_WIDTHS = [640, 1280]

// `srcSet` for a project image from its resized copies, plus the intrinsic
// size so the browser reserves space before it loads.
export function projectImageProps(project: Project) {
  if (!project.image || !project.imageSize) return { src: project.image }
  const [width, height] = project.imageSize
  const base = project.image.replace(/\.webp$/, "")
  const srcSet = [
    ...RESIZED_WIDTHS.filter((w) => w < width).map(
      (w) => `${base}-${w}.webp ${w}w`
    ),
    `${project.image} ${width}w`,
  ].join(", ")
  return { src: project.image, srcSet, width, height }
}

// Loads and decodes an image off-screen, settling early after `timeout` ms so
// a slow network never holds things up for long.
export function preloadImage(
  props: { src?: string; srcSet?: string; sizes?: string },
  timeout = 800
) {
  if (typeof window === "undefined" || !props.src) return Promise.resolve()
  const img = new Image()
  if (props.sizes) img.sizes = props.sizes
  if (props.srcSet) img.srcset = props.srcSet
  img.src = props.src
  return Promise.race([
    img.decode().catch(() => {}),
    new Promise((resolve) => setTimeout(resolve, timeout)),
  ])
}

// A copy of the project image this page already downloaded (say, the
// homepage card's), to show while a larger one loads. Browser only.
export function loadedImageCopy(project: Project) {
  if (typeof window === "undefined" || !project.image) return undefined
  const base = new URL(project.image, location.href).href.replace(/\.webp$/, "")
  return performance
    .getEntriesByType("resource")
    .find((entry) => entry.name.startsWith(base))?.name
}
