import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { markNotificationRead } from '@/api/notifications';
import { NOTIFICATION_MESSAGES } from '@/constants/messages';
import { queryKeys } from '@/lib/query-keys';

export function useMarkRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) => markNotificationRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all });
    },
    onError: () => {
      toast.error(NOTIFICATION_MESSAGES.ERROR);
    },
  });
}
