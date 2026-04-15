import { useQuery } from '@tanstack/react-query';

import { getFollowings } from '@/api/profile';
import type { FollowListResponse } from '@/api/profile';
import { queryKeys } from '@/lib/query-keys';

export function useFollowings(name: string) {
  return useQuery<FollowListResponse>({
    queryKey: queryKeys.users.followings(name),
    queryFn: () => getFollowings(name),
    enabled: !!name,
  });
}
