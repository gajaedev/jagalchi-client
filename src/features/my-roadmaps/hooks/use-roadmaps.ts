import { useQuery } from '@tanstack/react-query';

import { getRoadmaps } from '@/api/roadmap';
import type { RoadmapListParams, RoadmapListResponse } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

export function useRoadmaps(params: RoadmapListParams = {}) {
  return useQuery<RoadmapListResponse>({
    queryKey: [...queryKeys.roadmaps.lists(), params],
    queryFn: () => getRoadmaps(params),
  });
}
