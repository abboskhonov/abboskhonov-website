import { createServerFn } from "@tanstack/react-start"
import type { Activity } from "@/components/kibo-ui/contribution-graph"

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

function mapCountToLevel(count: number, maxCount: number): number {
  if (count === 0) return 0
  if (maxCount <= 1) return count > 0 ? 1 : 0
  const step = maxCount / 4
  return Math.min(Math.ceil(count / step), 4)
}

export const getGithubContributions = createServerFn({ method: "GET" })
  .handler(async () => {
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

    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
      json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ??
      []

    const days = weeks.flatMap((week) => week.contributionDays)

    const maxCount = Math.max(...days.map((d) => d.contributionCount), 1)

    const activities: Activity[] = days.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: mapCountToLevel(day.contributionCount, maxCount),
    }))

    return activities
  })
