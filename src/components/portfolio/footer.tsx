import { Link } from "@tanstack/react-router"

const footerLinks = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy", to: "/privacy" },
] as const

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-prose flex-wrap gap-x-5 gap-y-2 border-t border-neutral-200 pt-8 text-sm transition-colors dark:border-neutral-800">
      {footerLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-800 dark:decoration-neutral-700 dark:hover:text-neutral-200"
        >
          {link.label}
        </Link>
      ))}
      <a
        href="/llms.txt"
        className="text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-800 dark:decoration-neutral-700 dark:hover:text-neutral-200"
      >
        llms.txt
      </a>
    </footer>
  )
}
