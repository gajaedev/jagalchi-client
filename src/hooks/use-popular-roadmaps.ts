import { useQuery } from '@tanstack/react-query';

import {
  getPopularRoadmaps,
  type PopularRoadmapsParams,
  type RoadmapListResponse,
} from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

export function usePopularRoadmaps(params: PopularRoadmapsParams = {}) {
  return useQuery<RoadmapListResponse>({
    queryKey: queryKeys.roadmaps.popular(params),
    queryFn: () => getPopularRoadmaps(params),
  });
}
