# abboskhonov.com

Personal portfolio of [Abror Abboskhonov](https://abboskhonov.com) — software engineer building frontend interfaces, full-stack apps, and dev tools.

Built with [TanStack Start](https://tanstack.com/start/latest) (React Server Components), [TanStack Router](https://tanstack.com/router/latest), [shadcn/ui](https://ui.shadcn.com/), and [Tailwind CSS v4](https://tailwindcss.com/).

## Stack

| Layer | Tech |
|---|---|
| Framework | TanStack Start (RSC) |
| Routing | TanStack Router |
| Styling | Tailwind CSS v4, shadcn/ui |
| Language | TypeScript |
| Package Manager | Bun |
| Deployment | Vercel |

## Getting Started

```bash
bun install
bun dev       # http://localhost:3000
bun run build # production build
```

## Structure

```
src/
├── components/
│   ├── portfolio/   # Portfolio sections (Hero, Projects, Experience, etc.)
│   ├── ui/           # shadcn/ui primitives
│   └── kibo-ui/      # Custom UI components (contribution graph)
├── routes/           # TanStack Router file-based routes
├── lib/              # Utilities and API helpers
└── styles.css        # Global styles
```

## Features

- Personal portfolio with Hero, Projects, Experience, and GitHub Activity sections
- View-transition animations for project detail navigation
- GitHub contributions graph
- Dark mode with theme toggle
- Responsive design
- Social links (GitHub, Telegram, LinkedIn, X, Email)

