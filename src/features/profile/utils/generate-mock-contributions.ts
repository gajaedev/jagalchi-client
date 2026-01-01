import { Contribution } from './contribution-utils';

// Simple hash function for deterministic pseudo-random values
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function GenerateMockContributions(): Contribution[] {
  const result: Contribution[] = [];
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);

    result.push({
      date: dateStr,
      count: hashCode(dateStr) % 12,
    });
  }

  return result;
}
