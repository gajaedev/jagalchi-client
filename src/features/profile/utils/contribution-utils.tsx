/* =========================
 * Types
 * ========================= */
export interface Contribution {
  date: string; // YYYY-MM-DD
  count: number;
}

/* =========================
 * Color & Level
 * ========================= */
export const COLORS = [
  '#ebedf0', // 0 contributions
  '#9be9a8',
  '#40c463',
  '#30a14e',
  '#216e39',
];

export function getLevel(count: number): number {
  if (count <= 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

/* =========================
 * Date Utils
 * ========================= */

// 최근 1년(365일) 날짜 생성
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

// 첫 날짜의 요일만큼 앞에 null padding
// (GitHub 잔디 핵심 로직)
export function padStartByWeekday(dates: string[]): (string | null)[] {
  const firstDate = new Date(dates[0]);
  const weekday = firstDate.getDay(); // 0 = Sunday

  return [...Array(weekday).fill(null), ...dates];
}

// 7일 단위로 쪼개서 week 배열 생성
export function chunkByWeek<T>(arr: T[]): T[][] {
  const weeks: T[][] = [];

  for (let i = 0; i < arr.length; i += 7) {
    weeks.push(arr.slice(i, i + 7));
  }

  return weeks;
}
