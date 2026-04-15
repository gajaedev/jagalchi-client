import { useQuery } from '@tanstack/react-query';

import { getForkStatus, type RoadmapForkStatusResponse } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

export function useForkStatus(roadmapId: number) {
  return useQuery<RoadmapForkStatusResponse>({
    queryKey: queryKeys.roadmaps.forkStatus(roadmapId),
    queryFn: () => getForkStatus(roadmapId),
    enabled: Boolean(roadmapId),
  });
}
