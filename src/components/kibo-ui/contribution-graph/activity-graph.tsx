import { useEffect, useMemo, useRef, useState } from "react"
import type { Activity } from "./index"
import { getMonthLabels, groupByWeeks } from "./utils"
import { cn } from "@/lib/utils"

interface ActivityGraphProps {
  data: Activity[]
  className?: string
  // Shows `data` blurred and inert while the real contributions load.
  loading?: boolean
}

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
]

// 53 weeks × (8 + 2) − 2 = 528px: a year fits the 540px content column at
// native size, so blocks and labels never get scaled.
const WEEKS = 53
const BLOCK = 8
const GAP = 2
const LABEL_HEIGHT = 24

const LEVEL_FILL = cn(
  'data-[level="0"]:fill-neutral-100 dark:data-[level="0"]:fill-neutral-900',
  'data-[level="1"]:fill-neutral-200 dark:data-[level="1"]:fill-neutral-800',
  'data-[level="2"]:fill-neutral-300 dark:data-[level="2"]:fill-neutral-700',
  'data-[level="3"]:fill-neutral-400 dark:data-[level="3"]:fill-neutral-600',
  'data-[level="4"]:fill-neutral-600 dark:data-[level="4"]:fill-neutral-400'
)

export function ActivityGraph({
  data,
  className,
  loading = false,
}: ActivityGraphProps) {
  const [hovered, setHovered] = useState<Activity | null>(null)
  // Only animate the caption if this graph actually went through loading.
  const [startedLoading] = useState(loading)
  const scrollRef = useRef<HTMLDivElement>(null)

  const weeks = useMemo(() => groupByWeeks(data).slice(-WEEKS), [data])
  const monthLabels = useMemo(() => getMonthLabels(weeks, MONTHS), [weeks])
  const total = useMemo(() => data.reduce((sum, a) => sum + a.count, 0), [data])

  // On narrow screens the graph scrolls; start at the most recent weeks.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollLeft = el.scrollWidth
  }, [])

  const width = weeks.length * (BLOCK + GAP) - GAP
  const height = LABEL_HEIGHT + 7 * (BLOCK + GAP) - GAP

  return (
    <div className={className}>
      <div
        ref={scrollRef}
        aria-busy={loading}
        className={cn(
          "scrollbar-none overflow-x-auto transition-[filter,opacity] duration-700 ease-out motion-reduce:transition-none",
          loading && "pointer-events-none opacity-70 blur-[2px]"
        )}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block"
          onMouseLeave={() => setHovered(null)}
        >
          <title>GitHub contributions in the last year</title>
          <g className="fill-neutral-500 text-sm">
            {monthLabels.map(({ label, weekIndex }) => (
              <text
                key={weekIndex}
                x={weekIndex * (BLOCK + GAP)}
                y={0}
                dominantBaseline="hanging"
              >
                {label}
              </text>
            ))}
          </g>
          {weeks.map((week, w) =>
            week.map((activity, d) =>
              activity ? (
                <rect
                  key={`${w}-${d}`}
                  x={w * (BLOCK + GAP)}
                  y={LABEL_HEIGHT + d * (BLOCK + GAP)}
                  width={BLOCK}
                  height={BLOCK}
                  rx={2}
                  data-level={activity.level}
                  className={cn(
                    LEVEL_FILL,
                    "transition-[fill] duration-700 ease-out motion-reduce:transition-none"
                  )}
                  onMouseEnter={() => setHovered(activity)}
                />
              ) : null
            )
          )}
        </svg>
      </div>
      {/* Keyed on loading only: the caption resolves in alongside the graph,
          while hover readouts still update instantly. */}
      <p
        key={loading ? "loading" : "loaded"}
        className={cn(
          "mt-3 text-neutral-500 tabular-nums",
          !loading &&
            startedLoading &&
            "animate-[resolve-in_700ms_ease-out] motion-reduce:animate-none"
        )}
      >
        {loading
          ? "\u00a0" // keeps the line's height so nothing shifts
          : hovered
            ? `${hovered.count} ${hovered.count === 1 ? "contribution" : "contributions"} on ${formatDate(hovered.date)}`
            : `${total.toLocaleString("en-US")} contributions in the last year`}
      </p>
    </div>
  )
}

function formatDate(iso: string) {
  const [, m, d] = iso.split("-").map(Number)
  return `${MONTHS[m - 1]} ${d}`
}
