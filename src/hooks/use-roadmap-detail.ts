import { useQuery } from '@tanstack/react-query';

import { getRoadmap, type RoadmapDetailResponse } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

export function useRoadmapDetail(roadmapId: number) {
  return useQuery<RoadmapDetailResponse>({
    queryKey: queryKeys.roadmaps.detail(roadmapId),
    queryFn: () => getRoadmap(roadmapId),
    enabled: !!roadmapId,
  });
}
