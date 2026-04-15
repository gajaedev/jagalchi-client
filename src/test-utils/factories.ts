import type {
  Roadmap,
  RoadmapNode,
  JagalchiNodeData,
  NodeColorVariant,
} from '@/types/roadmap.types';

import type { Edge } from '@xyflow/react';

/** 테스트용 노드 생성 */
export function makeNode(
  id: string,
  label: string,
  options?: { variant?: NodeColorVariant; x?: number; y?: number; isLocked?: boolean },
): RoadmapNode {
  return {
    id,
    type: 'jagalchi-node',
    position: { x: options?.x ?? 0, y: options?.y ?? 0 },
    data: {
      label,
      description: '',
      resources: [],
      variant: options?.variant ?? 'white',
      isLocked: options?.isLocked ?? false,
    } as JagalchiNodeData,
  } as RoadmapNode;
}

/** 테스트용 엣지 생성 */
export function makeEdge(id: string, source: string, target: string): Edge {
  return { id, source, target };
}

/** 테스트용 로드맵 생성 */
export function makeRoadmap(overrides: Partial<Roadmap> = {}): Roadmap {
  return {
    id: 1,
    title: 'Test Roadmap',
    nodes: [],
    edges: [],
    isPublic: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}

/** 테스트용 유저 프로필 데이터 생성 */
export function makeUser(
  overrides: Partial<{
    name: string;
    email: string;
    bio: string;
    profileImageUrl: string | null;
    isFollowed: boolean;
    externalLinks: Record<string, string>;
  }> = {},
) {
  return {
    name: 'testuser',
    email: 'test@example.com',
    bio: '안녕하세요',
    profileImageUrl: null,
    isFollowed: false,
    stats: { followersCount: 0, followingCount: 0 },
    externalLinks: {},
    ...overrides,
  };
}
