import { Contribution } from './contribution-utils';

/**
 * Generates a deterministic hash from a string using the Java String.hashCode() algorithm.
 * Produces consistent pseudo-random values for the same input, enabling reproducible mock data.
 * @param str - The input string to hash
 * @returns A positive integer hash value
 */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Generates mock contribution data for the past 365 days using deterministic hashing.
 * Each day receives a contribution count (0-11) derived from hashing its date string,
 * creating a reproducible pattern useful for testing and demonstrations.
 * @returns Array of 365 contribution objects with dates and pseudo-random counts
 */
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
