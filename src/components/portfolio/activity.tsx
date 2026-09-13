import { useEffect, useState } from "react"
import { ActivityGraph } from "@/components/kibo-ui/contribution-graph/activity-graph"
import type { Activity as ActivityData } from "@/components/kibo-ui/contribution-graph"

interface ActivityProps {
  data: ActivityData[]
  error?: string | null
}

export function Activity({ data, error }: ActivityProps) {
  const [showGraph, setShowGraph] = useState(false)
  const totalContributions = data.reduce((total, day) => total + day.count, 0)

  useEffect(() => {
    setShowGraph(true)
  }, [])

  return (
    <section className="mb-20">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
        <div className="shrink-0 lg:w-40">
          <h2 className="text-lg font-semibold text-neutral-900 transition-colors dark:text-neutral-100">
            Activity
          </h2>
        </div>
        <div className="flex-1">
          {showGraph ? (
            <ActivityGraph data={data} error={error} />
          ) : (
            <p className="text-neutral-600 transition-colors dark:text-neutral-400">
              {error
                ? "GitHub activity is temporarily unavailable."
                : `${totalContributions} contributions in the last year.`}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
