import { useMutation } from '@tanstack/react-query';

import { deleteAccount } from '@/api/auth';

export function useDeleteAccount() {
  return useMutation({
    mutationFn: deleteAccount,
  });
}
