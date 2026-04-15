import { useMemo } from 'react';

import type { StreakActivity } from '@/api/profile';

import { ContributionGraph } from '../ContributionGraph';

import type { Contribution } from '../../../utils/contribution-utils';

interface ProfileStreakProps {
  activities?: StreakActivity[];
  currentStreak?: number;
}

export function ProfileStreak({ activities, currentStreak: _currentStreak }: ProfileStreakProps) {
  const data: Contribution[] = useMemo(() => {
    if (!activities?.length) return [];
    return activities.map((a) => ({ date: a.date, count: a.count }));
  }, [activities]);

  return <ContributionGraph data={data} />;
}
