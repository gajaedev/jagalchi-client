'use client';

import { useEffect } from 'react';

import { useSetAtom } from 'jotai';

import { getRoadmap } from '@/api/roadmap';
import { loadRoadmapFromLocalStorage } from '@/lib/roadmap-storage';

import { viewerErrorAtom, viewerLoadingAtom, viewerRoadmapAtom } from '../stores/viewer-atoms';

export function useViewerRoadmapLoader(roadmapId: string) {
  const setRoadmap = useSetAtom(viewerRoadmapAtom);
  const setLoading = useSetAtom(viewerLoadingAtom);
  const setError = useSetAtom(viewerErrorAtom);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      // 1. API에서 로드맵 상세 조회 → 메타데이터 + localStorage에서 노드/엣지
      try {
        const detail = await getRoadmap(Number(roadmapId));

        if (isCancelled) return;

        // localStorage에서 노드/엣지 로드 (이벤트 replay 구현 전까지)
        const local = loadRoadmapFromLocalStorage(Number(roadmapId));

        setRoadmap({
          id: detail.id,
          title: detail.title,
          description: detail.description ?? undefined,
          nodes: local?.nodes ?? [],
          edges: local?.edges ?? [],
          author: { id: detail.owner.id, name: detail.owner.nickname },
          isPublic: detail.isPublic,
          createdAt: detail.createdAt,
          updatedAt: detail.updatedAt,
        });
        setLoading(false);
        return;
      } catch {
        // API 실패 시 localStorage fallback
      }

      if (isCancelled) return;

      // 2. Fallback: localStorage만으로 로드
      const localRoadmap = loadRoadmapFromLocalStorage(Number(roadmapId));

      if (isCancelled) return;

      if (localRoadmap) {
        setRoadmap(localRoadmap);
        setLoading(false);
      } else {
        setLoading(false);
        setError(`Roadmap not found: ${roadmapId}`);
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [roadmapId, setRoadmap, setLoading, setError]);
}
