import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { UpdateProfileRequest } from '@/api/profile';
import { updateProfile } from '@/api/profile';
import { queryKeys } from '@/lib/query-keys';
import { sanitizeText } from '@/lib/sanitize';

export function useUpdateProfile(name: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => {
      const sanitized: UpdateProfileRequest = {
        user: {
          ...data.user,
          bio: data.user.bio ? sanitizeText(data.user.bio) : data.user.bio,
        },
      };
      return updateProfile(sanitized);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(name) });
    },
  });
}
