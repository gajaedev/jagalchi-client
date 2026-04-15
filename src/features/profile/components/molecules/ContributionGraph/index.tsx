'use client';

import { useMemo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card
      className="w-full gap-0 rounded-xl shadow-none"
      role="img"
      aria-label={`기여 그래프: ${streak}일 연속 스트릭`}
    >
      <CardHeader className="px-6 pb-4">
        <CardTitle className="text-muted-foreground text-sm font-semibold">
          {streak}일 연속 스트릭
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="w-full overflow-x-auto py-2">
          <div className="flex min-w-max gap-[2px]">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[2px]">
                {week.map((day, j) =>
                  day ? (
                    <div
                      key={day.date}
                      title={`${day.date}: ${day.count}건의 기여`}
                      aria-label={`${day.date}: ${day.count}건의 기여`}
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 2,
                        backgroundColor: COLORS[getLevel(day.count)],
                      }}
                    />
                  ) : (
                    <div key={j} style={{ width: 16, height: 16 }} />
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
