import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { completeNode, getMyProgress } from '@/api/roadmap';
import type { ProgressResponse } from '@/api/roadmap';
import { queryKeys } from '@/lib/query-keys';

export function useRoadmapProgress(roadmapId: number) {
  return useQuery<ProgressResponse>({
    queryKey: queryKeys.roadmaps.progress(roadmapId),
    queryFn: () => getMyProgress(roadmapId),
    enabled: !!roadmapId,
  });
}

export function useCompleteNode(roadmapId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      nodeId,
      isCompleted,
      link,
    }: {
      nodeId: number;
      isCompleted: boolean;
      link?: string;
    }) => completeNode(roadmapId, nodeId, { isCompleted, link }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roadmaps.progress(roadmapId) });
    },
  });
}
