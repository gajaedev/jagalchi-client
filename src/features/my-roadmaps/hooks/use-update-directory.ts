import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateDirectory } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

export function useUpdateDirectory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) => updateDirectory(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.directories.tree() });
    },
  });
}
