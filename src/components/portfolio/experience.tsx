import type { ReactNode } from "react"

interface TimelineEntry {
  period: string
  text: ReactNode
}

interface ExperienceProps {
  items: TimelineEntry[]
}

export function Experience({ items }: ExperienceProps) {
  return (
    <section className="mt-14">
      <h2 className="sr-only">Experience</h2>
      <ol className="space-y-3">
        {/* The period sits at the right edge, or under the role on phones. */}
        {items.map((item, i) => (
          <li
            key={i}
            className="flex flex-col sm:flex-row sm:justify-between sm:gap-x-4"
          >
            <span className="text-neutral-900 dark:text-neutral-200">
              {item.text}
            </span>
            <span className="text-neutral-500 tabular-nums">{item.period}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
