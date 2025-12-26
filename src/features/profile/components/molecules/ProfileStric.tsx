import { GenerateMockContributions } from '../../utils/generate-mock-contributions';
import ContributionGraph from '../atoms/ContributionGraph';

export default function ProfileStric() {
  const data = GenerateMockContributions();
  return (
    <div>
      <ContributionGraph data={data} />
    </div>
  );
}
