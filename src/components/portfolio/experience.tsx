import type { ReactNode } from "react"

interface TimelineEntry {
  year: string
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
        {items.map((item, i) => (
          <li key={i} className="flex">
            <span className="w-[70px] shrink-0 text-neutral-500">
              {item.year !== items[i - 1]?.year ? item.year : null}
            </span>
            <span className="text-neutral-900 dark:text-neutral-200">
              {item.text}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
