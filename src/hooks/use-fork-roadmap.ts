import { useMutation, useQueryClient } from '@tanstack/react-query';

import { forkRoadmap } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

export function useForkRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roadmapId: number) => forkRoadmap(roadmapId),
    onSuccess: (_data, roadmapId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roadmaps.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.roadmaps.forkStatus(roadmapId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.roadmaps.forkTree(roadmapId) });
    },
  });
}
