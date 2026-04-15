import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleFollow } from '@/api/profile';
import type { QueryUserResponse } from '@/api/profile';
import { queryKeys } from '@/lib/query-keys';

export function useToggleFollow(name: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isFollow: boolean) => toggleFollow(name, { toggle: isFollow }),
    onMutate: async (isFollow) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.users.detail(name) });

      const previous = queryClient.getQueryData<QueryUserResponse>(queryKeys.users.detail(name));

      if (previous) {
        queryClient.setQueryData<QueryUserResponse>(queryKeys.users.detail(name), {
          ...previous,
          user: {
            ...previous.user,
            isFollowed: isFollow,
            stats: {
              ...previous.user.stats,
              followersCount: previous.user.stats.followersCount + (isFollow ? 1 : -1),
            },
          },
        });
      }

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.users.detail(name), context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(name) });
    },
  });
}
