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

  // Calculate how many days we need to go back to get exactly 52 weeks (364 days)
  // accounting for the current day of the week to align the end.
  // Actually, usually we want to show the last 52 weeks ending today or this week.
  // To get exactly 52 columns (52 * 7 = 364 cells) where the first cell is the start of a week (Sunday):
  // We need to count backwards 364 days from the *end of this week*?
  // Or simply: We want dates.length + padding = 364.
  // Let's rely on today.
  // If we generate 364 days ending today?
  // 364 days is exactly 52 weeks.
  // If today is e.g. Wednesday, and we go back 364 days, we land on a Wednesday.
  // Padding will depend on that Wednesday.
  // If we want the *entire grid* to be 52x7.
  // We usually want the last cell to be today? Or the last column to be this week?
  // Let's assume we want the last column to include today.
  // If we want exactly 52 columns, and we want to fill them as much as possible up to today.

  // Strategy:
  // 1. Determine the end date (today).
  // 2. We want a total of 52 * 7 = 364 cells.
  // 3. The graph is built from left to right.
  // 4. `chunkByWeek` chunks every 7 items.
  // 5. `padStartByWeekday` pads the start.
  // So we need the start date to be a Sunday?
  // If start date is Sunday, padding is 0.
  // Then dates.length must be 364.
  // Then the end date will be 363 days after that Sunday.
  // If we fix the length to 364, and start on a Sunday, we get 52 full weeks.
  // But we want the graph to end around "today".
  // So let's find the Sunday that is 51 weeks before the current week's Sunday?

  // Let's simplify:
  // We want to generate days such that the total slots = 364.
  // Start from today, go back.
  // But padding is added at the start.
  // Total slots = padding + days.
  // We don't know padding until we know start date.

  // Let's try:
  // Target total squares = 364.
  // Let `daysToGenerate` be an estimate.
  // We want `startDay.getDay() + numberOfDays = 364`.
  // `startDay` is `today - (numberOfDays - 1)`.
  // This logic is circular.

  // Alternative:
  // Find the 'End of this week' (Saturday).
  // Go back 363 days from that Saturday?
  // If we end on Saturday, we assume the week is full.
  // If today is Wednesday, allow empty slots after today?
  // Usually graph shows future days as empty or just doesn't render them?
  // But `weeks` array structure needs to be full 7 days to keep grid 7 high.
  // `chunkByWeek` does slices of 7.

  // Let's find the Saturday of the current week.
  const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
  const daysUntilSaturday = 6 - dayOfWeek;
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + daysUntilSaturday);

  // Now we want 52 weeks ending on that Saturday.
  // 52 * 7 = 364 days.
  // So start date is 363 days before endOfWeek.

  for (let i = 363; i >= 0; i--) {
    const d = new Date(endOfWeek);
    d.setDate(endOfWeek.getDate() - i);
    // We only want to include dates up to today?
    // The user asked for "52*7 size". visually.
    // If we include future dates, we should handle them (e.g. they won't have contributions).
    // My logic in ContributionGraph handles dates.
    // If the date is in the future, it just has 0 count.
    // This ensures the grid is perfectly 52x7.

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
