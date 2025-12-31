import { GenerateMockContributions } from '../../utils/generate-mock-contributions';

import { ContributionGraph } from './ContributionGraph';

export function ProfileStreak() {
  const data = GenerateMockContributions();
  return <ContributionGraph data={data} />;
}
