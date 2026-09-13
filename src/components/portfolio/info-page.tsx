import type { ReactNode } from "react"
import { Link } from "@tanstack/react-router"
import { IconArrowLeft } from "@tabler/icons-react"

interface InfoPageProps {
  title: string
  intro: string
  children: ReactNode
}

export function InfoPage({ title, intro, children }: InfoPageProps) {
  return (
    <div className="flex min-h-svh justify-center bg-white font-mono text-lg leading-[1.7] text-neutral-600 transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-neutral-400">
      <main className="w-full max-w-prose px-6 py-24 md:py-32">
        <Link
          to="/"
          className="mb-16 inline-flex items-center gap-1 text-neutral-500 transition-colors hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          <IconArrowLeft className="h-4 w-4" />
          Home
        </Link>
        <header className="mb-10">
          <h1 className="mb-3 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </h1>
          <p className="text-neutral-500">{intro}</p>
        </header>
        <div className="space-y-6">{children}</div>
        <footer className="mt-16 flex flex-wrap gap-4 border-t border-neutral-200 pt-8 text-sm dark:border-neutral-800">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
          <a href="/llms.txt">llms.txt</a>
        </footer>
      </main>
    </div>
  )
}
