'use client';

import { useAtomValue } from 'jotai';

import { MyRoadmapsToolbar } from '@/features/my-roadmaps/components/molecules/MyRoadmapsToolbar';
import { MyRoadmapsGrid } from '@/features/my-roadmaps/components/organisms/MyRoadmapsGrid';
import { MyRoadmapsHeader } from '@/features/my-roadmaps/components/organisms/MyRoadmapsHeader';
import { MyRoadmapsLayout } from '@/features/my-roadmaps/components/templates/MyRoadmapsLayout';
import { sidebarCategoryAtom } from '@/features/my-roadmaps/stores/my-roadmaps.atoms';
import type { RoadmapData } from '@/features/my-roadmaps/types/my-roadmaps.types';

// Mock data for development
const MY_ROADMAPS: RoadmapData[] = [
  {
    id: '1',
    title: 'Frontend Developer Roadmap',
    author: '홍길동',
    type: 'Roadmap',
    updatedAt: '2024-02-06T10:00:00Z',
    isFavorite: true,
    category: 'my-roadmap',
  },
  {
    id: '2',
    title: 'Directory Name',
    type: 'Directory',
    fileCount: 67,
    updatedAt: '2024-02-05T10:00:00Z',
    category: 'my-roadmap',
  },
  {
    id: '3',
    title: 'React Mastery',
    author: '홍길동',
    type: 'Roadmap',
    updatedAt: '2024-02-04T10:00:00Z',
    isShared: true,
    category: 'my-roadmap',
  },
  {
    id: '4',
    title: 'Backend Essentials',
    author: '홍길동',
    type: 'Roadmap',
    updatedAt: '2024-02-03T10:00:00Z',
    category: 'community',
  },
  {
    id: '5',
    title: 'DevOps Guide',
    author: '홍길동',
    type: 'Roadmap',
    updatedAt: '2024-02-02T10:00:00Z',
    isFavorite: true,
    category: 'community',
  },
];

export default function MyRoadmapsPage() {
  const activeCategory = useAtomValue(sidebarCategoryAtom);

  const filteredRoadmaps = MY_ROADMAPS.filter((roadmap) => {
    switch (activeCategory) {
      case 'recent':
        return true; // Sort by updatedAt later
      case 'community':
        return roadmap.category === 'community';
      case 'my-roadmap':
        return roadmap.category === 'my-roadmap';
      case 'shared':
        return roadmap.isShared;
      case 'favorites':
        return roadmap.isFavorite;
      default:
        return true;
    }
  }).sort((a, b) => {
    if (activeCategory === 'recent') {
      return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
    }
    return 0;
  });

  return (
    <MyRoadmapsLayout>
      <div className="flex h-full flex-col">
        <MyRoadmapsHeader />
        <div className="flex-1 px-20 pb-20">
          <MyRoadmapsToolbar />
          <div className="mt-6">
            <MyRoadmapsGrid roadmaps={filteredRoadmaps} />
          </div>
        </div>
      </div>
    </MyRoadmapsLayout>
  );
}
