'use client';

import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { useAtomValue, useSetAtom } from 'jotai';

import { MY_ROADMAPS_MESSAGES } from '@/constants/messages';
import { logoutAtom } from '@/features/auth';
import { MyRoadmapsToolbar } from '@/features/my-roadmaps/components/molecules/MyRoadmapsToolbar';
import { MyRoadmapsGrid } from '@/features/my-roadmaps/components/organisms/MyRoadmapsGrid';
import { MyRoadmapsHeader } from '@/features/my-roadmaps/components/organisms/MyRoadmapsHeader';
import { MyRoadmapsLayout } from '@/features/my-roadmaps/components/templates';
import { useRoadmaps } from '@/features/my-roadmaps/hooks/use-roadmaps';
import {
  filterCategoryAtom,
  searchQueryAtom,
  sidebarCategoryAtom,
  sortByAtom,
  sortOrderAtom,
} from '@/features/my-roadmaps/stores/my-roadmaps.atoms';
import type { RoadmapSummary } from '@/types/roadmap.types';

export default function MyRoadmapsPage() {
  const router = useRouter();
  const logout = useSetAtom(logoutAtom);
  const activeCategory = useAtomValue(sidebarCategoryAtom);
  const sortOrder = useAtomValue(sortOrderAtom);
  const sortBy = useAtomValue(sortByAtom);
  const filterCategory = useAtomValue(filterCategoryAtom);
  const searchQuery = useAtomValue(searchQueryAtom);

  const { data, isLoading } = useRoadmaps();

  // 서버 응답 → RoadmapSummary 매핑
  const items: RoadmapSummary[] = useMemo(() => {
    if (!data?.content) return [];
    return data.content.map((r) => ({
      id: r.id,
      title: r.title,
      type: 'Roadmap' as const,
      author: r.owner.nickname,
    }));
  }, [data]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const filteredRoadmaps = useMemo(
    () =>
      items
        .filter((roadmap) => {
          let categoryMatch = false;
          switch (activeCategory) {
            case 'recent':
              categoryMatch = true;
              break;
            case 'community':
              categoryMatch = true;
              break;
            case 'my-roadmap':
              categoryMatch = true;
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

          if (filterCategory !== 'all') {
            const typeMatch =
              filterCategory === 'roadmap'
                ? roadmap.type === 'Roadmap'
                : roadmap.type === 'Directory';
            if (!typeMatch) return false;
          }

          if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            if (!roadmap.title.toLowerCase().includes(lowerQuery)) return false;
          }

          return true;
        })
        .sort((a, b) => {
          let comparison = 0;
          switch (sortBy) {
            case 'recent':
              comparison =
                new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
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
        }),
    [items, sortOrder, sortBy, filterCategory, activeCategory, searchQuery],
  );

  if (isLoading) {
    return (
      <MyRoadmapsLayout onLogout={handleLogout}>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">{MY_ROADMAPS_MESSAGES.LOADING}</p>
        </div>
      </MyRoadmapsLayout>
    );
  }

  return (
    <MyRoadmapsLayout onLogout={handleLogout}>
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
