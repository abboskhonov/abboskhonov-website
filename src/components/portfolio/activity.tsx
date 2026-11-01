import { useEffect, useState } from "react"
import { ActivityGraph } from "@/components/kibo-ui/contribution-graph/activity-graph"
import type { Activity as ActivityData } from "@/components/kibo-ui/contribution-graph"
import { getGithubContributions } from "@/lib/github"

// Fetched in the browser after the page is shown, so GitHub never delays the
// first paint. Kept for the session so returning to the page is instant.
let request: Promise<ActivityData[]> | undefined
let loaded: ActivityData[] | undefined

// Stand-in shown blurred while the real graph loads. Seeded and fixed to set
// dates, so the server and the browser render identical markup.
const DEMO_CONTRIBUTIONS: ActivityData[] = (() => {
  let seed = 7
  const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  const start = Date.UTC(2025, 0, 5) // a Sunday: 371 days = 53 full weeks
  return Array.from({ length: 371 }, (_, i) => {
    const r = random()
    const level = r < 0.3 ? 0 : r < 0.6 ? 1 : r < 0.8 ? 2 : r < 0.93 ? 3 : 4
    const date = new Date(start + i * 86_400_000).toISOString().slice(0, 10)
    return { date, count: level, level }
  })
})()

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
      <ActivityGraph
        data={data ?? DEMO_CONTRIBUTIONS}
        loading={!data}
        className="mt-4"
      />
    </section>
  )
}
