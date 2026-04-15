import { useQuery } from '@tanstack/react-query';

import { getRoadmaps, type RoadmapListParams, type RoadmapListResponse } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

interface UseCommunityRoadmapsParams {
  sort?: string;
  query?: string;
  tags?: string[];
  page?: number;
  size?: number;
}

export function useCommunityRoadmaps(params: UseCommunityRoadmapsParams = {}) {
  const apiParams: RoadmapListParams = {
    isPublic: true,
    sort: params.sort,
    query: params.query || undefined,
    tags: params.tags,
    page: params.page,
    size: params.size,
  };

  return useQuery<RoadmapListResponse>({
    queryKey: queryKeys.community.lists(apiParams),
    queryFn: () => getRoadmaps(apiParams),
  });
}
