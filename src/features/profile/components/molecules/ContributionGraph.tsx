'use client';

import { useMemo } from 'react';

import { Card, CardContent } from '@/components/ui/card';

import {
  Contribution,
  COLORS,
  getLevel,
  getLastYearDates,
  padStartByWeekday,
  chunkByWeek,
  calculateStreak,
} from '../../utils/contribution-utils';

export function ContributionGraph({ data }: { data: Contribution[] }) {
  const { weeks, streak } = useMemo(() => {
    const dates = getLastYearDates();
    const padded = padStartByWeekday(dates);
    const map = new Map(data.map((d) => [d.date, d.count]));

    const weeks = chunkByWeek(padded.map((d) => (d ? { date: d, count: map.get(d) ?? 0 } : null)));
    const streak = calculateStreak(data);

    return { weeks, streak };
  }, [data]);

  return (
    <Card className="h-[177px] w-full shadow-none">
      <CardContent className="flex h-full flex-col items-start justify-center gap-4 p-4">
        <p className="text-muted-foreground text-sm font-bold">{streak}일 연속 스트릭</p>
        <div className="flex gap-[4px]">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-[4px]">
              {week.map((day, j) =>
                day ? (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} contributions`}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 2,
                      backgroundColor: COLORS[getLevel(day.count)],
                    }}
                  />
                ) : (
                  <div key={j} style={{ width: 12, height: 12 }} />
                ),
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
