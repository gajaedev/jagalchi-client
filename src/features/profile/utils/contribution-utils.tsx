export interface Contribution {
  date: string;
  count: number;
}

export const COLORS = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];

export function getLevel(count: number): number {
  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

export function getLastYearDates(): string[] {
  const dates: string[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }

  return dates;
}

export function padStartByWeekday(dates: string[]): (string | null)[] {
  const firstDate = new Date(dates[0]);
  const weekday = firstDate.getDay();

  return [...Array(weekday).fill(null), ...dates];
}

export function chunkByWeek<T>(arr: T[]): T[][] {
  const weeks: T[][] = [];

  for (let i = 0; i < arr.length; i += 7) {
    weeks.push(arr.slice(i, i + 7));
  }

  return weeks;
}

export function calculateStreak(data: Contribution[]): number {
  if (!data || data.length === 0) return 0;

  const sortedData = [...data].sort((a, b) => b.date.localeCompare(a.date));
  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  const mostRecent = sortedData.find((d) => d.count > 0);
  if (!mostRecent || (mostRecent.date !== today && mostRecent.date !== yesterday)) {
    return 0;
  }

  let expectedDate = mostRecent.date;
  for (const contribution of sortedData) {
    if (contribution.date === expectedDate) {
      if (contribution.count > 0) {
        streak++;
        const date = new Date(expectedDate);
        date.setDate(date.getDate() - 1);
        expectedDate = date.toISOString().slice(0, 10);
      } else {
        break;
      }
    } else if (contribution.date < expectedDate) {
      break;
    }
  }

  return streak;
}
