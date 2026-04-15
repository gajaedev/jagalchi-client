import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteDirectory } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

export function useDeleteDirectory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDirectory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.directories.tree() });
    },
  });
}
