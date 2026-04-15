import { useQuery } from '@tanstack/react-query';

import { getProfile } from '@/api/profile';
import type { QueryUserResponse } from '@/api/profile';
import { queryKeys } from '@/lib/query-keys';

export function useProfile(name: string) {
  return useQuery<QueryUserResponse>({
    queryKey: queryKeys.users.detail(name),
    queryFn: () => getProfile(name),
    enabled: !!name,
  });
}
