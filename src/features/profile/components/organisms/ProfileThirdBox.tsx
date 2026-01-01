import { RoadmapList } from '../molecules/RoadmapList';

const MOCK_COMPLETED_ROADMAPS = [
  { id: '1', title: '유저 님의 프론트엔드 로드맵' },
  { id: '2', title: '유저 님의 프론트엔드 로드맵' },
];

const MOCK_IN_PROGRESS_ROADMAPS = [
  { id: '3', title: '유저 님의 프론트엔드 로드맵' },
  { id: '4', title: '유저 님의 프론트엔드 로드맵' },
  { id: '5', title: '유저 님의 프론트엔드 로드맵' },
  { id: '6', title: '유저 님의 프론트엔드 로드맵' },
  { id: '7', title: '유저 님의 프론트엔드 로드맵' },
  { id: '8', title: '유저 님의 프론트엔드 로드맵' },
  { id: '9', title: '유저 님의 프론트엔드 로드맵' },
];

export function ProfileThirdBox() {
  return (
    <div className="grid w-full grid-cols-2 gap-8">
      <RoadmapList variant="end" items={MOCK_COMPLETED_ROADMAPS} />
      <RoadmapList variant="process" items={MOCK_IN_PROGRESS_ROADMAPS} />
    </div>
  );
}
