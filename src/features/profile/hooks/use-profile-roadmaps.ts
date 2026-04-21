import { useQuery } from '@tanstack/react-query';

import { getRoadmaps } from '@/api/roadmap';
import type { RoadmapListItemResponse } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

interface UseProfileRoadmapsParams {
  userName: string;
  enabled?: boolean;
}

/**
 * 특정 사용자가 제작한 공개 로드맵 목록을 조회한다.
 * GET /roadmaps 전체 목록을 가져온 뒤 owner.nickname으로 클라이언트 필터링한다.
 *
 * TODO: 백엔드에서 userId 기반 필터링을 지원하면 QueryUserDto에 id를 추가하고
 * getRoadmaps({ userId }) 방식으로 교체할 것.
 */
export function useProfileRoadmaps({ userName, enabled = true }: UseProfileRoadmapsParams) {
  return useQuery<RoadmapListItemResponse[]>({
    queryKey: queryKeys.roadmaps.lists({ ownerName: userName }),
    queryFn: async () => {
      const response = await getRoadmaps({ size: 50, isPublic: true });
      return response.content.filter((roadmap) => roadmap.owner.nickname === userName);
    },
    enabled: enabled && !!userName,
  });
}
