import { RoadmapList } from '../../molecules/RoadmapList';

// TODO: GET /roadmaps 응답의 RoadmapListItemResponse에 progress 필드가 없어
// 완주/진행중 구분을 단일 요청으로 할 수 없다.
// 백엔드에서 progressPercentage 기준 필터 파라미터를 지원하거나,
// GET /roadmaps/{id}/my-progress 를 roadmap별로 호출하는 N+1 방식이 필요하다.
// 현재는 연동 대기 중 — 데이터 없이 빈 목록으로 표시한다.

interface ProfileThirdBoxProps {
  userName: string;
}

export function ProfileThirdBox({ userName: _userName }: ProfileThirdBoxProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2">
      <RoadmapList variant="end" items={[]} />
      <RoadmapList variant="process" items={[]} />
    </div>
  );
}
