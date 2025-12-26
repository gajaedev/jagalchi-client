'use client';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';
import {
  Contribution,
  COLORS,
  getLevel,
  getLastYearDates,
  padStartByWeekday,
  chunkByWeek,
} from '@/features/profile/utils/contribution-utils';

export default function ContributionGraph({ data }: { data: Contribution[] }) {
  const dates = getLastYearDates();
  const padded = padStartByWeekday(dates);

  const map = new Map(data.map((d) => [d.date, d.count]));

  const weeks = chunkByWeek(padded.map((d) => (d ? { date: d, count: map.get(d) ?? 0 } : null)));

  return (
    <div className="flex h-[137px] w-[552px] flex-col items-center justify-center rounded-md border">
      <div className="w-[100%] p-2">
        <p
          style={{
            ...typography.paragraph.bold,
            color: colors.slate[500],
          }}
        >
          348일 연속 스트릭
        </p>
      </div>
      <div className="flex gap-[3px] p-2">
        {weeks.map((week, i) => (
          <div key={i} className="flex w-[7px] flex-col gap-[3px]">
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
  );
}
