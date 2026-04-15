import { useQuery } from '@tanstack/react-query';

import { getFollowers } from '@/api/profile';
import type { FollowListResponse } from '@/api/profile';
import { queryKeys } from '@/lib/query-keys';

export function useFollowers(name: string) {
  return useQuery<FollowListResponse>({
    queryKey: queryKeys.users.followers(name),
    queryFn: () => getFollowers(name),
    enabled: !!name,
  });
}
