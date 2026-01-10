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
} from '../../../utils/contribution-utils';

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
    <Card className="w-full rounded-lg p-4 shadow-none sm:px-0 sm:py-2">
      <CardContent className="flex flex-col">
        <p className="text-muted-foreground w-full py-3 text-sm font-bold sm:mb-0 sm:py-3">
          {streak}일 연속 스트릭
        </p>
        <div className="w-full overflow-x-auto py-2">
          <div className="flex min-w-max gap-[1px]">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[1px]">
                {week.map((day, j) =>
                  day ? (
                    <div
                      key={day.date}
                      title={`${day.date}: ${day.count} contributions`}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 2,
                        backgroundColor: COLORS[getLevel(day.count)],
                      }}
                    />
                  ) : (
                    <div key={j} style={{ width: 8, height: 8 }} />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
