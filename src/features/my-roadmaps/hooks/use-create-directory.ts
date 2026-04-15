import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createDirectory } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

export function useCreateDirectory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string; parentId?: number }) => createDirectory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.directories.tree() });
      queryClient.invalidateQueries({ queryKey: queryKeys.roadmaps.lists() });
    },
  });
}
