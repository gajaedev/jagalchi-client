import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteRoadmap } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

export function useDeleteRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roadmapId: number) => deleteRoadmap(roadmapId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roadmaps.lists() });
    },
  });
}
