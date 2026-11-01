import { useEffect, useState } from "react"
import { ActivityGraph } from "@/components/kibo-ui/contribution-graph/activity-graph"
import type { Activity as ActivityData } from "@/components/kibo-ui/contribution-graph"
import { getGithubContributions } from "@/lib/github"

// Fetched in the browser after the page is shown, so GitHub never delays the
// first paint. Kept for the session so returning to the page is instant.
let request: Promise<ActivityData[]> | undefined
let loaded: ActivityData[] | undefined

function loadContributions() {
  request ??= getGithubContributions()
    .catch(() => [])
    .then((data) => (loaded = data))
  return request
}

export function Activity() {
  const [data, setData] = useState(loaded)

  useEffect(() => {
    if (loaded) return
    let active = true
    loadContributions().then((result) => active && setData(result))
    return () => {
      active = false
    }
  }, [])

  // Hidden rather than showing an error when GitHub data is unavailable.
  if (data?.length === 0) return null

  return (
    <section className="mt-14">
      <h2 className="text-neutral-900 dark:text-neutral-200">github</h2>
      {data ? (
        <ActivityGraph data={data} className="mt-4" />
      ) : (
        // Same height as the graph and its caption, so nothing shifts.
        <div className="mt-4 h-[127px]" />
      )}
    </section>
  )
}
