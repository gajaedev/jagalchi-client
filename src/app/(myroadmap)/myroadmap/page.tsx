'use client';

import { useAtomValue } from 'jotai';

import { MyRoadmapsToolbar } from '@/features/my-roadmaps/components/molecules/MyRoadmapsToolbar';
import { MyRoadmapsGrid } from '@/features/my-roadmaps/components/organisms/MyRoadmapsGrid';
import { MyRoadmapsHeader } from '@/features/my-roadmaps/components/organisms/MyRoadmapsHeader';
import { MyRoadmapsLayout } from '@/features/my-roadmaps/components/templates/MyRoadmapsLayout';
import {
  filterCategoryAtom,
  sidebarCategoryAtom,
  sortByAtom,
  sortOrderAtom,
} from '@/features/my-roadmaps/stores/my-roadmaps.atoms';
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
  const sortOrder = useAtomValue(sortOrderAtom);
  const sortBy = useAtomValue(sortByAtom);
  const filterCategory = useAtomValue(filterCategoryAtom);

  const filteredRoadmaps = MY_ROADMAPS.filter((roadmap) => {
    // 1. Sidebar Category Filter
    let categoryMatch = false;
    switch (activeCategory) {
      case 'recent':
        categoryMatch = true;
        break;
      case 'community':
        categoryMatch = roadmap.category === 'community';
        break;
      case 'my-roadmap':
        categoryMatch = roadmap.category === 'my-roadmap';
        break;
      case 'shared':
        categoryMatch = !!roadmap.isShared;
        break;
      case 'favorites':
        categoryMatch = !!roadmap.isFavorite;
        break;
      default:
        categoryMatch = true;
    }

    if (!categoryMatch) return false;

    // 2. Toolbar Category Filter
    if (filterCategory !== 'all') {
      const typeMatch =
        filterCategory === 'roadmap' ? roadmap.type === 'Roadmap' : roadmap.type === 'Directory';
      if (!typeMatch) return false;
    }

    return true;
  }).sort((a, b) => {
    // 3. Sorting
    let comparison = 0;
    switch (sortBy) {
      case 'recent':
        comparison = new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
        break;
      case 'name':
        comparison = (b.title || '').localeCompare(a.title || '');
        break;
      case 'size':
        comparison = (b.fileCount || 0) - (a.fileCount || 0);
        break;
      default:
        comparison = 0;
    }

    return sortOrder === 'asc' ? -comparison : comparison;
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
