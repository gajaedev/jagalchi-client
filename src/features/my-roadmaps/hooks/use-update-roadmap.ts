import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateRoadmap } from '@/api/roadmap';
import type { UpdateRoadmapRequest } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

export function useUpdateRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roadmapId, data }: { roadmapId: number; data: UpdateRoadmapRequest }) =>
      updateRoadmap(roadmapId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roadmaps.all });
    },
  });
}
