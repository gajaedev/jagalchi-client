import { http, HttpResponse } from 'msw';

import type { Roadmap } from '@/types/roadmap.types';

import { MOCK_ROADMAPS } from '../fixtures/roadmaps';

// 가변 로드맵 저장소 (런타임에서 CRUD 추적)
const roadmapStore: Roadmap[] = [...MOCK_ROADMAPS];

let nextId = 100;

// Mock 디렉토리 저장소
const directoryStore = [
  { id: 1, name: '프론트엔드', parentId: null as number | null, path: '/프론트엔드' },
  { id: 2, name: '백엔드', parentId: null as number | null, path: '/백엔드' },
  { id: 3, name: 'React', parentId: 1, path: '/프론트엔드/React' },
];

/** Roadmap API 핸들러 */
export const roadmapHandlers = [
  // GET /api/roadmaps — 로드맵 목록 조회 (RoadmapListResponse)
  http.get('/api/roadmaps', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '0');
    const size = Number(url.searchParams.get('size') ?? '20');
    const query = url.searchParams.get('query') ?? '';

    let filtered = roadmapStore;

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (r) => r.title.toLowerCase().includes(q) || r.description?.toLowerCase().includes(q),
      );
    }

    const start = page * size;
    const content = filtered.slice(start, start + size);

    return HttpResponse.json({
      content: content.map((r) => ({
        id: r.id,
        title: r.title,
        tags: [],
        owner: {
          id: r.author?.id ?? 1,
          nickname: r.author?.name ?? '김선배',
          profileImageUrl: null,
        },
      })),
      pageable: { pageNumber: page, pageSize: size },
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
      hasNext: start + size < filtered.length,
    });
  }),

  // GET /api/roadmaps/popular — 인기 로드맵 조회 (RoadmapListResponse)
  http.get('/api/roadmaps/popular', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '0');
    const size = Number(url.searchParams.get('size') ?? '20');

    const publicRoadmaps = roadmapStore.filter((r) => r.isPublic);
    const start = page * size;
    const content = publicRoadmaps.slice(start, start + size);

    return HttpResponse.json({
      content: content.map((r) => ({
        id: r.id,
        title: r.title,
        tags: [],
        owner: {
          id: r.author?.id ?? 1,
          nickname: r.author?.name ?? '김선배',
          profileImageUrl: null,
        },
      })),
      pageable: { pageNumber: page, pageSize: size },
      totalElements: publicRoadmaps.length,
      totalPages: Math.ceil(publicRoadmaps.length / size),
      hasNext: start + size < publicRoadmaps.length,
    });
  }),

  // GET /api/roadmaps/liked — 좋아요한 로드맵 목록
  http.get('/api/roadmaps/liked', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '0');
    const size = Number(url.searchParams.get('size') ?? '10');

    return HttpResponse.json({
      content: [],
      pageable: { pageNumber: page, pageSize: size },
      totalElements: 0,
      totalPages: 0,
      hasNext: false,
    });
  }),

  // GET /api/roadmaps/favorited — 즐겨찾기한 로드맵 목록
  http.get('/api/roadmaps/favorited', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '0');
    const size = Number(url.searchParams.get('size') ?? '10');

    return HttpResponse.json({
      content: [],
      pageable: { pageNumber: page, pageSize: size },
      totalElements: 0,
      totalPages: 0,
      hasNext: false,
    });
  }),

  // GET /api/roadmaps/:id — 단일 로드맵 조회 (RoadmapDetailResponse)
  http.get<{ id: string }>('/api/roadmaps/:id', ({ params }) => {
    const id = Number(params.id);
    const roadmap = roadmapStore.find((r) => r.id === id);

    if (!roadmap) {
      return HttpResponse.json({ message: '로드맵을 찾을 수 없습니다' }, { status: 404 });
    }

    return HttpResponse.json({
      id: roadmap.id,
      title: roadmap.title,
      description: roadmap.description ?? null,
      thumbnailUrl: null,
      isPublic: roadmap.isPublic,
      viewCount: 42,
      owner: {
        id: roadmap.author?.id ?? 1,
        nickname: roadmap.author?.name ?? '김선배',
        profileImageUrl: null,
      },
      stats: { totalNodes: roadmap.nodes.length, totalEdges: roadmap.edges.length, forkCount: 5 },
      tags: [],
      createdAt: roadmap.createdAt,
      updatedAt: roadmap.updatedAt,
    });
  }),

  // POST /api/roadmaps — 로드맵 생성 (RoadmapResponse)
  http.post('/api/roadmaps', async ({ request }) => {
    const body = (await request.json()) as {
      title: string;
      description?: string;
      isPublic?: boolean;
    };

    const now = new Date().toISOString();
    const id = nextId++;
    const newRoadmap: Roadmap = {
      id,
      title: body.title,
      description: body.description,
      nodes: [],
      edges: [],
      author: { id: 1, name: '김선배' },
      isPublic: body.isPublic ?? false,
      createdAt: now,
      updatedAt: now,
    };

    roadmapStore.push(newRoadmap);

    return HttpResponse.json(
      {
        id,
        title: newRoadmap.title,
        description: newRoadmap.description ?? null,
        directoryId: null,
        ownerId: 1,
        isPublic: newRoadmap.isPublic,
        viewCount: 0,
        forkCount: 0,
        createdAt: now,
        updatedAt: now,
      },
      { status: 201 },
    );
  }),

  // PATCH /api/roadmaps/:id — 로드맵 수정 (RoadmapUpdateResponse)
  http.patch<{ id: string }>('/api/roadmaps/:id', async ({ params, request }) => {
    const id = Number(params.id);
    const roadmapIndex = roadmapStore.findIndex((r) => r.id === id);

    if (roadmapIndex === -1) {
      return HttpResponse.json({ message: '로드맵을 찾을 수 없습니다' }, { status: 404 });
    }

    const body = (await request.json()) as {
      title?: string;
      description?: string;
      isPublic?: boolean;
    };
    const existing = roadmapStore[roadmapIndex];
    const now = new Date().toISOString();

    roadmapStore[roadmapIndex] = {
      ...existing,
      title: body.title ?? existing.title,
      description: body.description ?? existing.description,
      isPublic: body.isPublic ?? existing.isPublic,
      updatedAt: now,
    };

    return HttpResponse.json({ id, updatedAt: now });
  }),

  // DELETE /api/roadmaps/:id — 로드맵 삭제 (RoadmapDeleteResponse)
  http.delete<{ id: string }>('/api/roadmaps/:id', ({ params }) => {
    const id = Number(params.id);
    const roadmapIndex = roadmapStore.findIndex((r) => r.id === id);

    if (roadmapIndex === -1) {
      return HttpResponse.json({ message: '로드맵을 찾을 수 없습니다' }, { status: 404 });
    }

    roadmapStore.splice(roadmapIndex, 1);
    return HttpResponse.json({ message: '로드맵이 삭제되었습니다' });
  }),

  // POST /api/roadmaps/:id/likes — 좋아요
  http.post<{ roadmapId: string }>('/api/roadmaps/:roadmapId/likes', ({ params }) => {
    return HttpResponse.json({
      roadmapId: Number(params.roadmapId),
      likeCount: 1,
      likedByCurrentUser: true,
    });
  }),

  // DELETE /api/roadmaps/:id/likes — 좋아요 취소
  http.delete<{ roadmapId: string }>('/api/roadmaps/:roadmapId/likes', () => {
    return HttpResponse.json({ message: '좋아요가 취소되었습니다' });
  }),

  // GET /api/roadmaps/:id/like-status — 좋아요 상태
  http.get<{ roadmapId: string }>('/api/roadmaps/:roadmapId/like-status', ({ params }) => {
    return HttpResponse.json({
      roadmapId: Number(params.roadmapId),
      likeCount: 0,
      likedByCurrentUser: false,
    });
  }),

  // POST /api/roadmaps/:id/favorites — 즐겨찾기
  http.post<{ roadmapId: string }>('/api/roadmaps/:roadmapId/favorites', ({ params }) => {
    return HttpResponse.json({
      roadmapId: Number(params.roadmapId),
      favoriteCount: 1,
      favoritedByCurrentUser: true,
    });
  }),

  // DELETE /api/roadmaps/:id/favorites — 즐겨찾기 취소
  http.delete<{ roadmapId: string }>('/api/roadmaps/:roadmapId/favorites', () => {
    return HttpResponse.json({ message: '즐겨찾기가 취소되었습니다' });
  }),

  // GET /api/roadmaps/:id/favorite-status — 즐겨찾기 상태
  http.get<{ roadmapId: string }>('/api/roadmaps/:roadmapId/favorite-status', ({ params }) => {
    return HttpResponse.json({
      roadmapId: Number(params.roadmapId),
      favoriteCount: 0,
      favoritedByCurrentUser: false,
    });
  }),

  // POST /api/roadmaps/:id/fork — 포크
  http.post<{ roadmapId: string }>('/api/roadmaps/:roadmapId/fork', ({ params }) => {
    const id = Number(params.roadmapId);
    const original = roadmapStore.find((r) => r.id === id);

    if (!original) {
      return HttpResponse.json({ message: '로드맵을 찾을 수 없습니다' }, { status: 404 });
    }

    const now = new Date().toISOString();
    const forkedId = nextId++;
    return HttpResponse.json({
      id: forkedId,
      title: original.title,
      description: original.description ?? null,
      directoryId: null,
      ownerId: 1,
      isPublic: false,
      viewCount: 0,
      forkCount: 0,
      createdAt: now,
      updatedAt: now,
    });
  }),

  // GET /api/roadmaps/:id/fork-tree — 포크 트리
  http.get<{ roadmapId: string }>('/api/roadmaps/:roadmapId/fork-tree', ({ params }) => {
    return HttpResponse.json({
      id: Number(params.roadmapId),
      title: '원본 로드맵',
      ownerId: 1,
      ownerName: '김선배',
      forkCount: 2,
      children: [
        { id: 101, title: '포크 1', ownerId: 2, ownerName: '박후배', forkCount: 0, children: [] },
        { id: 102, title: '포크 2', ownerId: 3, ownerName: '이멘토', forkCount: 0, children: [] },
      ],
    });
  }),

  // GET /api/roadmaps/:id/fork-status — 포크 상태
  http.get<{ roadmapId: string }>('/api/roadmaps/:roadmapId/fork-status', ({ params }) => {
    return HttpResponse.json({
      roadmapId: Number(params.roadmapId),
      forkCount: 2,
      originalRoadmapId: null,
      originalRoadmapTitle: null,
      forkedByCurrentUser: false,
    });
  }),

  // GET /api/directories/tree — 디렉토리 트리 (DirectoryTreeItem[])
  http.get('/api/directories/tree', () => {
    return HttpResponse.json(
      directoryStore.map((d) => ({
        id: d.id,
        name: d.name,
        path: d.path,
        roadmaps: [],
      })),
    );
  }),

  // POST /api/directories — 디렉토리 생성 (DirectoryResponse)
  http.post('/api/directories', async ({ request }) => {
    const body = (await request.json()) as { name: string; parentId?: number };
    const parent = body.parentId ? directoryStore.find((d) => d.id === body.parentId) : null;
    const path = parent ? `${parent.path}/${body.name}` : `/${body.name}`;
    const newDir = {
      id: nextId++,
      name: body.name,
      parentId: body.parentId ?? null,
      path,
    };
    directoryStore.push(newDir);
    return HttpResponse.json(
      {
        id: newDir.id,
        name: newDir.name,
        parentId: newDir.parentId,
        path: newDir.path,
        createdAt: new Date().toISOString(),
      },
      { status: 201 },
    );
  }),

  // PATCH /api/directories/:id — 디렉토리 수정 (DirectoryResponse)
  http.patch<{ directoryId: string }>(
    '/api/directories/:directoryId',
    async ({ params, request }) => {
      const directoryId = Number(params.directoryId);
      const body = (await request.json()) as { name: string };
      const dir = directoryStore.find((d) => d.id === directoryId);

      if (!dir) {
        return HttpResponse.json({ message: '디렉토리를 찾을 수 없습니다' }, { status: 404 });
      }

      dir.name = body.name;
      return HttpResponse.json({
        id: dir.id,
        name: dir.name,
        parentId: dir.parentId,
        path: dir.path,
        createdAt: new Date().toISOString(),
      });
    },
  ),

  // DELETE /api/directories/:id — 디렉토리 삭제
  http.delete<{ directoryId: string }>('/api/directories/:directoryId', ({ params }) => {
    const directoryId = Number(params.directoryId);
    const idx = directoryStore.findIndex((d) => d.id === directoryId);

    if (idx === -1) {
      return HttpResponse.json({ message: '디렉토리를 찾을 수 없습니다' }, { status: 404 });
    }

    directoryStore.splice(idx, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  // GET /api/roadmaps/:id/my-progress — 내 진행률 (ProgressResponse)
  http.get<{ roadmapId: string }>('/api/roadmaps/:roadmapId/my-progress', ({ params }) => {
    return HttpResponse.json({
      roadmapId: Number(params.roadmapId),
      totalNodes: 5,
      completedNodes: 2,
      progressPercentage: 40,
      completedNodeIds: [1, 2],
      updatedAt: new Date().toISOString(),
    });
  }),

  // POST /api/roadmaps/:roadmapId/nodes/:nodeId/complete — 노드 완료 토글
  http.post<{ roadmapId: string; nodeId: string }>(
    '/api/roadmaps/:roadmapId/nodes/:nodeId/complete',
    async ({ params, request }) => {
      const body = (await request.json()) as { isCompleted: boolean; link?: string };
      return HttpResponse.json({
        nodeId: Number(params.nodeId),
        isCompleted: body.isCompleted,
        roadmapProgress: body.isCompleted ? 60 : 40,
        completedAt: body.isCompleted ? new Date().toISOString() : null,
      });
    },
  ),

  // GET /api/notifications — 알림 목록
  http.get('/api/notifications', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? '0');
    const size = Number(url.searchParams.get('size') ?? '10');

    return HttpResponse.json({
      notifications: [],
      totalCount: 0,
      unreadCount: 0,
      page,
      size,
    });
  }),

  // GET /api/notifications/settings — 알림 설정
  http.get('/api/notifications/settings', () => {
    return HttpResponse.json([
      { type: 'FORK', isEnabled: true },
      { type: 'FOLLOW', isEnabled: true },
      { type: 'STUDY', isEnabled: true },
      { type: 'COMMENT', isEnabled: true },
      { type: 'SYSTEM', isEnabled: true },
    ]);
  }),

  // GET /api/roadmap/:id/events — 로드맵 이벤트 조회 (에디터)
  http.get<{ roadmapId: string }>('/api/roadmap/:roadmapId/events', ({ params }) => {
    const roadmap = roadmapStore.find((r) => String(r.id) === params.roadmapId);

    if (!roadmap) {
      return HttpResponse.json({ message: '로드맵을 찾을 수 없습니다' }, { status: 404 });
    }

    const events = [
      ...roadmap.nodes.map((node, i) => ({
        type: 'EVENT' as const,
        eventId: `evt-node-${i}`,
        sequence: i + 1,
        payload: node,
      })),
      ...roadmap.edges.map((edge, i) => ({
        type: 'EVENT' as const,
        eventId: `evt-edge-${i}`,
        sequence: roadmap.nodes.length + i + 1,
        payload: edge,
      })),
    ];

    return HttpResponse.json(events);
  }),
];

export const resetRoadmapStore = (): void => {
  roadmapStore.length = 0;
  roadmapStore.push(...MOCK_ROADMAPS);
};
