"use client";

import { useMemo, useState, useCallback } from "react";
import {
  formatISO,
  parseISO,
  getMonth,
  getYear,
  differenceInCalendarDays,
  eachDayOfInterval,
  subWeeks,
  nextDay,
  getDay,
} from "date-fns";
import type { Activity } from "./index";
import { cn } from "@/lib/utils";

interface ActivityGraphProps {
  data: Activity[];
  className?: string;
  showTotal?: boolean;
  showLegend?: boolean;
  title?: string;
  error?: string | null;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function fillHoles(activities: Activity[]): Activity[] {
  if (activities.length === 0) return [];
  const sorted = [...activities].sort((a, b) => a.date.localeCompare(b.date));
  const calendar = new Map(activities.map((a) => [a.date, a]));
  const first = sorted[0];
  const last = sorted.at(-1);
  if (!last) return [];
  return eachDayOfInterval({
    start: parseISO(first.date),
    end: parseISO(last.date),
  }).map((day) => {
    const date = formatISO(day, { representation: "date" });
    return calendar.get(date) ?? { date, count: 0, level: 0 };
  });
}

function groupByWeeks(activities: Activity[]): Array<Array<Activity | undefined>> {
  if (activities.length === 0) return [];
  const normalized = fillHoles(activities);
  const first = normalized[0];
  const firstDate = parseISO(first.date);
  const weekStart = 0;
  const firstCalendarDate =
    getDay(firstDate) === weekStart
      ? firstDate
      : subWeeks(nextDay(firstDate, weekStart), 1);
  const padded = [
    ...(new Array(
      differenceInCalendarDays(firstDate, firstCalendarDate)
    ).fill(undefined) as Activity[]),
    ...normalized,
  ];
  const numWeeks = Math.ceil(padded.length / 7);
  return Array.from({ length: numWeeks }, (_, i) =>
    padded.slice(i * 7, i * 7 + 7)
  );
}

function getMonthLabels(
  weeks: Array<Array<Activity | undefined>>
): Array<{ weekIndex: number; label: string }> {
  return weeks
    .reduce<{ weekIndex: number; label: string }[]>((labels, week, i) => {
      const first = week.find((a) => a !== undefined);
      if (!first) return labels;
      const month = MONTHS[getMonth(parseISO(first.date))];
      const prev = labels.at(-1);
      if (i === 0 || !prev || prev.label !== month) {
        labels.push({ weekIndex: i, label: month });
      }
      return labels;
    }, [])
    .filter(({ weekIndex }, i, arr) => {
      const min = 3;
      if (i === 0) return arr[1] && arr[1].weekIndex - weekIndex >= min;
      if (i === arr.length - 1) return weeks.slice(weekIndex).length >= min;
      return true;
    });
}



export function ActivityGraph({
  data,
  className,
  showTotal = true,
  showLegend = true,
  title,
  error,
}: ActivityGraphProps) {
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    activity: Activity;
    visible: boolean;
  } | null>(null);

  const handleEnter = useCallback(
    (e: React.MouseEvent, activity: Activity) => {
      setTooltip({
        x: e.clientX,
        y: e.clientY,
        activity,
        visible: true,
      });
    },
    []
  );

  const handleMove = useCallback((e: React.MouseEvent) => {
    setTooltip((prev) =>
      prev
        ? {
            ...prev,
            x: e.clientX,
            y: e.clientY,
          }
        : null
    );
  }, []);

  const handleLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  const weeks = useMemo(() => groupByWeeks(data), [data]);
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);

  const totalCount = data.reduce((sum, a) => sum + a.count, 0);
  const year =
    data.length > 0 ? getYear(parseISO(data[0].date)) : new Date().getFullYear();

  const blockSize = 10;
  const blockMargin = 3;
  const blockRadius = 2;
  const labelHeight = 14;
  const dayLabelWidth = 28;
  const fontSize = 12;

  const svgWidth = weeks.length * (blockSize + blockMargin) - blockMargin;
  const svgHeight = labelHeight + (blockSize + blockMargin) * 7 - blockMargin;

  const viewBoxWidth = svgWidth + dayLabelWidth;
  const viewBoxHeight = svgHeight;

  const xOffset = dayLabelWidth;

  if (error) {
    return (
      <div className={cn("relative", className)}>
        {title && (
          <h3 className="mb-4 text-sm font-medium text-neutral-800 transition-colors dark:text-neutral-300">
            {title}
          </h3>
        )}
        <div className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-500">
          Could not load contributions: {error}
        </div>
      </div>
    );
  }

  if (data.length === 0) return null;

  return (
    <div className={cn("relative", className)}>
      {title && (
        <h3 className="mb-4 text-sm font-medium text-neutral-800 transition-colors dark:text-neutral-300">
          {title}
        </h3>
      )}
      <div className="max-w-full overflow-x-auto">
        <svg
          className="block overflow-visible"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          width={viewBoxWidth}
          height={viewBoxHeight}
          style={{ fontSize }}
        >
          <title>GitHub Contribution Graph</title>

          {/* Month labels */}
          <g className="fill-current text-neutral-500 transition-colors dark:text-neutral-400">
            {monthLabels.map(({ label, weekIndex }) => (
              <text
                key={weekIndex}
                x={xOffset + (blockSize + blockMargin) * weekIndex}
                y={0}
                dominantBaseline="hanging"
              >
                {label}
              </text>
            ))}
          </g>

          {/* Day labels */}
          <g className="fill-current text-neutral-500 transition-colors dark:text-neutral-400">
            {DAY_LABELS.map((label, dayIndex) => {
              if (!label) return null;
              return (
                <text
                  key={dayIndex}
                  x={0}
                  y={
                    labelHeight +
                    (blockSize + blockMargin) * dayIndex +
                    blockSize / 2
                  }
                  dominantBaseline="middle"
                >
                  {label}
                </text>
              );
            })}
          </g>

          {/* Blocks */}
          {weeks.map((week, weekIndex) =>
            week.map((activity, dayIndex) => {
              if (!activity) return null;
              return (
                <g
                  key={`${weekIndex}-${dayIndex}`}
                  onMouseEnter={(e) => handleEnter(e, activity)}
                  onMouseMove={handleMove}
                  onMouseLeave={handleLeave}
                  className="cursor-pointer"
                >
                  <rect
                    x={
                      xOffset + (blockSize + blockMargin) * weekIndex
                    }
                    y={
                      labelHeight +
                      (blockSize + blockMargin) * dayIndex
                    }
                    width={blockSize}
                    height={blockSize}
                    rx={blockRadius}
                    ry={blockRadius}
                    className={cn(
                      'data-[level="0"]:fill-neutral-200 dark:data-[level="0"]:fill-neutral-800',
                      'data-[level="1"]:fill-neutral-300 dark:data-[level="1"]:fill-neutral-700',
                      'data-[level="2"]:fill-neutral-400 dark:data-[level="2"]:fill-neutral-600',
                      'data-[level="3"]:fill-neutral-500 dark:data-[level="3"]:fill-neutral-500',
                      'data-[level="4"]:fill-neutral-600 dark:data-[level="4"]:fill-neutral-400',
                    )}
                    data-level={activity.level}
                    stroke="none"
                    style={{
                      transition: "fill 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as SVGRectElement).setAttribute(
                        "stroke",
                        "#8b949e"
                      );
                      (e.target as SVGRectElement).setAttribute(
                        "stroke-width",
                        "1.5"
                      );
                    }}
                    onMouseLeave={(e) => {
                      (e.target as SVGRectElement).setAttribute(
                        "stroke",
                        "none"
                      );
                    }}
                  />
                </g>
              );
            })
          )}
        </svg>
      </div>

      {/* Footer */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          {showTotal && (
            <span className="text-xs text-neutral-500 transition-colors dark:text-neutral-500">
              {totalCount} contributions in {year}
            </span>
          )}
          <a
            href="https://docs.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-500 transition-colors hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-300"
          >
            Learn how we count contributions
          </a>
        </div>

        {showLegend && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-neutral-500 transition-colors dark:text-neutral-500">
              Less
            </span>
            {new Array(5).fill(undefined).map((_, level) => (
              <svg
                key={level}
                width={blockSize}
                height={blockSize}
                className="block"
              >
                <rect
                  width={blockSize}
                  height={blockSize}
                  rx={blockRadius}
                  ry={blockRadius}
                  className={cn(
                    'data-[level="0"]:fill-neutral-200 dark:data-[level="0"]:fill-neutral-800',
                    'data-[level="1"]:fill-neutral-300 dark:data-[level="1"]:fill-neutral-700',
                    'data-[level="2"]:fill-neutral-400 dark:data-[level="2"]:fill-neutral-600',
                    'data-[level="3"]:fill-neutral-500 dark:data-[level="3"]:fill-neutral-500',
                    'data-[level="4"]:fill-neutral-600 dark:data-[level="4"]:fill-neutral-400',
                  )}
                  data-level={level}
                />
              </svg>
            ))}
            <span className="text-xs text-neutral-500 transition-colors dark:text-neutral-500">
              More
            </span>
          </div>
        )}
      </div>

      {/* Tooltip */}
      {tooltip?.visible && (
        <div
          className="pointer-events-none fixed z-50 rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs text-white shadow-lg"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 12,
          }}
        >
          <div className="font-medium">
            {tooltip.activity.count}{" "}
            {tooltip.activity.count === 1
              ? "contribution"
              : "contributions"}
          </div>
          <div className="text-neutral-400">
            {tooltip.activity.date}
          </div>
        </div>
      )}
    </div>
  );
}
