import type { ReactNode } from "react"
import { Link } from "@tanstack/react-router"

interface TextLinkProps {
  href: string
  children: ReactNode
}

const className =
  "text-neutral-900 underline decoration-neutral-300 underline-offset-[3px] transition-colors hover:decoration-neutral-900 dark:text-neutral-200 dark:decoration-neutral-700 dark:hover:decoration-neutral-200"

export function TextLink({ href, children }: TextLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    )
  }

  const external = /^https?:\/\//.test(href)

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
    >
      {children}
    </a>
  )
}
