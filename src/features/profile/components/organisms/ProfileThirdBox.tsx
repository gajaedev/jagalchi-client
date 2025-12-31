import { RoadmapList } from '../molecules/RoadmapList';

export function ProfileThirdBox() {
  return (
    <div className="flex flex-row justify-between">
      <RoadmapList variant="end" />
      <RoadmapList variant="process" />
    </div>
  );
}
