import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createRoadmap } from '@/api/roadmap';
import type { CreateRoadmapRequest } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

export function useCreateRoadmap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoadmapRequest) => createRoadmap(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roadmaps.lists() });
    },
  });
}
