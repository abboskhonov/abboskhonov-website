import { createServerFn } from "@tanstack/react-start"
import { setResponseHeader } from "@tanstack/react-start/server"
import type { Activity } from "@/components/kibo-ui/contribution-graph"

// Simple in-memory cache so every page load doesn't hit GitHub's API
const cache = new Map<string, { data: Activity[]; expiresAt: number }>()
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour
// Only set on success, so browsers and Cloudflare's edge never cache a failure.
const CACHE_CONTROL = "public, max-age=3600"

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql"

const CONTRIBUTIONS_QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

// Levels follow quartiles of active days, like GitHub's own graph. Scaling
// by the busiest day instead puts almost every day in level 1.
function getLevelThresholds(counts: number[]): number[] {
  const active = counts.filter((c) => c > 0).sort((a, b) => a - b)
  if (active.length === 0) return [Infinity, Infinity, Infinity]
  const at = (q: number) => active[Math.floor((active.length - 1) * q)]
  return [at(0.25), at(0.5), at(0.75)]
}

function mapCountToLevel(count: number, thresholds: number[]): number {
  if (count === 0) return 0
  return 1 + thresholds.filter((t) => count > t).length
}

async function fetchContributions(
  token: string,
  login: string,
  from: string,
  to: string
): Promise<Activity[]> {
  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "abboskhonov-website",
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { login, from, to },
    }),
  })

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    )
  }

  const json = (await response.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions: number
            weeks: Array<{
              contributionDays: Array<{
                date: string
                contributionCount: number
              }>
            }>
          }
        }
      }
    }
    errors?: Array<{ message: string }>
  }

  if (json.errors && json.errors.length > 0) {
    throw new Error(
      `GitHub GraphQL error: ${json.errors.map((e) => e.message).join(", ")}`
    )
  }

  const weeks =
    json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? []

  const days = weeks.flatMap((week) => week.contributionDays)

  const thresholds = getLevelThresholds(days.map((d) => d.contributionCount))

  return days.map((day) => ({
    date: day.date,
    count: day.contributionCount,
    level: mapCountToLevel(day.contributionCount, thresholds),
  }))
}

export const getGithubContributions = createServerFn({ method: "GET" })
  .handler(async () => {
    const cacheKey = "contributions"
    const cached = cache.get(cacheKey)
    if (cached && Date.now() < cached.expiresAt) {
      setResponseHeader("Cache-Control", CACHE_CONTROL)
      return cached.data
    }

    const token = process.env.GITHUB_TOKEN
    if (!token) {
      throw new Error("GITHUB_TOKEN is not set in environment variables")
    }

    const login = process.env.GITHUB_LOGIN || "abboskhonov"
    const now = new Date()
    const oneYearAgo = new Date(now)
    oneYearAgo.setDate(now.getDate() - 364)
    const to = now.toISOString()
    const from = oneYearAgo.toISOString()

    const data = await fetchContributions(token, login, from, to)

    cache.set(cacheKey, { data, expiresAt: Date.now() + CACHE_TTL_MS })
    setResponseHeader("Cache-Control", CACHE_CONTROL)

    return data
  })
