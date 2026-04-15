import { useQuery } from '@tanstack/react-query';

import { getForkTree, type RoadmapForkTreeResponse } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

export function useForkTree(roadmapId: number) {
  return useQuery<RoadmapForkTreeResponse>({
    queryKey: queryKeys.roadmaps.forkTree(roadmapId),
    queryFn: () => getForkTree(roadmapId),
    enabled: Boolean(roadmapId),
  });
}
