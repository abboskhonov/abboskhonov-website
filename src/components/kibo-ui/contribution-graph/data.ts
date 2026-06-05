import { formatISO } from "date-fns";
import type { Activity } from "./index";

export function generateDemoData(options: {
  startDate?: Date;
  endDate?: Date;
  maxLevel?: number;
  density?: number; // 0 to 1, probability of a day having activity
} = {}): Activity[] {
  const {
    startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
    endDate = new Date(),
    maxLevel = 4,
    density = 0.4,
  } = options;

  const data: Activity[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    if (Math.random() < density) {
      const count = Math.floor(Math.random() * 20) + 1;
      const level = Math.min(Math.floor(count / 4), maxLevel);
      data.push({
        date: formatISO(current, { representation: "date" }),
        count,
        level,
      });
    }
    current.setDate(current.getDate() + 1);
  }

  return data;
}

export function generateStreakData(
  startDate: Date,
  endDate: Date,
  maxLevel: number = 4
): Activity[] {
  const data: Activity[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    const dayOfWeek = current.getDay();
    // Skip weekends
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const count = Math.floor(Math.random() * 15) + 3;
      const level = Math.min(Math.floor(count / 4), maxLevel);
      data.push({
        date: formatISO(current, { representation: "date" }),
        count,
        level,
      });
    }
    current.setDate(current.getDate() + 1);
  }

  return data;
}
