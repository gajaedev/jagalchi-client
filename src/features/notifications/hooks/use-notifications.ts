import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

import { getNotifications } from '@/api/notifications';
import type { NotificationListParams, NotificationListResponse } from '@/api/notifications';
import { isAuthenticatedAtom } from '@/lib/auth-atoms';
import { queryKeys } from '@/lib/query-keys';

export function useNotifications(params?: NotificationListParams) {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  return useQuery<NotificationListResponse>({
    queryKey: queryKeys.notifications.lists(params),
    queryFn: () => getNotifications(params),
    enabled: isAuthenticated,
    refetchInterval: isAuthenticated ? 30_000 : false,
    refetchOnWindowFocus: isAuthenticated,
  });
}
