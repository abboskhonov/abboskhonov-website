"use client";
import React, { useEffect, useState } from "react";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type ContributionData = {
  total: { lastYear: number };
  contributions: ContributionDay[];
};

const API_URL =
  "https://github-contributions-api.jogruber.de/v4/abboskhonov?y=";

const COLOR_SCHEMES = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

function getColor(intensity: number, mode: "light" | "dark") {
  return COLOR_SCHEMES[mode][intensity];
}

export default function GitContribution() {
  const [data, setData] = useState<ContributionData | null>(null);
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [selectedYear, setSelectedYear] = useState("2025");

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setMode(root.classList.contains("dark") ? "dark" : "light");
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    setMode(root.classList.contains("dark") ? "dark" : "light");
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch(API_URL + selectedYear)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData(null));
  }, [selectedYear]);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Loading contributions…
      </div>
    );
  }

  if (!data.contributions || !Array.isArray(data.contributions)) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-500">
        Unable to load contribution data.
      </div>
    );
  }

  // Group days into weeks
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < data.contributions.length; i += 7) {
    weeks.push(data.contributions.slice(i, i + 7));
  }

  // Calculate month positions
  const monthLabels = [
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
  ];
  const monthPositions: { month: string; index: number }[] = [];

  weeks.forEach((week, index) => {
    if (week.length > 0) {
      const weekDate = new Date(week[0].date);
      const month = weekDate.getMonth();
      const day = weekDate.getDate();

      if (
        day <= 7 &&
        (monthPositions.length === 0 ||
          monthPositions[monthPositions.length - 1].month !==
            monthLabels[month])
      ) {
        monthPositions.push({ month: monthLabels[month], index });
      }
    }
  });

  const years = ["2025", "2024", "2023"];

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 p-0 overflow-scroll">
      {/* Month labels */}
      <div
        className="flex mb-1 relative "
        style={{ height: "15px", paddingLeft: "28px" }}
      >
        {monthPositions.map(({ month, index }) => (
          <span
            key={`${month}-${index}`}
            className="absolute text-xs text-gray-600 dark:text-gray-400"
            style={{ left: `${28 + index * 13}px` }}
          >
            {month}
          </span>
        ))}
      </div>

      {/* Contribution grid */}
      <div className="flex mb-4 ">
        {/* Day labels */}
        <div
          className="flex flex-col text-xs text-gray-600 dark:text-gray-400 pr-1"
          style={{ paddingTop: "11px", gap: "18px" }}
        >
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        {/* Weeks grid */}
        <div className="flex gap-[3px] ">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px] ">
              {week.map((day, di) => (
                <div
                  key={di}
                  title={`${day.count} contributions on ${day.date}`}
                  className="w-[9px] h-[9px] transition-all hover:ring-1 hover:ring-gray-400 cursor-pointer rounded-[1px]"
                  style={{ backgroundColor: getColor(day.level, mode) }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Summary and legend */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-gray-900 dark:text-gray-100">
          <span className="font-semibold">
            {data.total.lastYear} contributions
          </span>{" "}
          in {selectedYear}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">less</span>
          <div className="flex items-center gap-[3px]">
            {COLOR_SCHEMES[mode].map((c, i) => (
              <div
                key={i}
                className="w-[10px] h-[10px]"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">more</span>
        </div>
      </div>

      {/* Year selector */}
      <div className="flex justify-center gap-3">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-6 py-2 text-base font-medium transition-all border-2 rounded-lg ${
              selectedYear === year
                ? "bg-transparent text-gray-900 dark:text-gray-100 border-gray-900 dark:border-gray-100"
                : "bg-transparent text-gray-400 dark:text-gray-600 border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}
