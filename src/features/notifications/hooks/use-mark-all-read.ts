import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { markAllNotificationsRead } from '@/api/notifications';
import { NOTIFICATION_MESSAGES } from '@/constants/messages';
import { queryKeys } from '@/lib/query-keys';

export function useMarkAllRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => markAllNotificationsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
    onError: () => {
      toast.error(NOTIFICATION_MESSAGES.ERROR);
    },
  });
}
