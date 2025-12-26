import { Contribution } from './contribution-utils';

export function GenerateMockContributions(): Contribution[] {
  const result: Contribution[] = [];
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    result.push({
      date: d.toISOString().slice(0, 10),
      count: Math.floor(Math.random() * 12),
    });
  }

  return result;
}
