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
    <Card className="w-[552px] shadow-none">
      <CardContent className="flex flex-col items-center">
        <p className="text-muted-foreground w-full text-sm font-bold">{streak}일 연속 스트릭</p>
        <div className="flex gap-[1px]">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-[1px]">
              {week.map((day, j) =>
                day ? (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} contributions`}
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: 2,
                      backgroundColor: COLORS[getLevel(day.count)],
                    }}
                  />
                ) : (
                  <div key={j} style={{ width: 9, height: 9 }} />
                ),
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
