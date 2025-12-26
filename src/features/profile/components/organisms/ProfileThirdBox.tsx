import RoadmapList from '../atoms/RoadmapList';

export default function ProfileThirdBox() {
  return (
    <div className="flex flex-row justify-between">
      <RoadmapList variant="end" />
      <RoadmapList variant="process" />
    </div>
  );
}
