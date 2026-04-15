import type { RoadmapData } from '../types/my-roadmaps.types';

export const MOCK_MY_ROADMAPS: RoadmapData[] = [
  {
    id: 1,
    title: 'Frontend Developer Roadmap',
    author: '홍길동',
    type: 'Roadmap',
    updatedAt: '2024-02-06T10:00:00Z',
    isFavorite: true,
    category: 'my-roadmap',
  },
  {
    id: 2,
    title: 'Directory Name',
    type: 'Directory',
    fileCount: 67,
    updatedAt: '2024-02-05T10:00:00Z',
    category: 'my-roadmap',
  },
  {
    id: 3,
    title: 'React Mastery',
    author: '홍길동',
    type: 'Roadmap',
    updatedAt: '2024-02-04T10:00:00Z',
    isShared: true,
    category: 'my-roadmap',
  },
  {
    id: 4,
    title: 'Backend Essentials',
    author: '홍길동',
    type: 'Roadmap',
    updatedAt: '2024-02-03T10:00:00Z',
    category: 'community',
  },
  {
    id: 5,
    title: 'DevOps Guide',
    author: '홍길동',
    type: 'Roadmap',
    updatedAt: '2024-02-02T10:00:00Z',
    isFavorite: true,
    category: 'community',
  },
];
