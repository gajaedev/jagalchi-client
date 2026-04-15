'use client';

import React, { useMemo } from 'react';

import { useAtomValue } from 'jotai';

import { COMMUNITY_MESSAGES } from '@/constants/messages';
import { useCommunityRoadmaps } from '@/hooks/use-community-roadmaps';
import { useDebounce } from '@/hooks/use-debounce';
import { usePopularRoadmaps } from '@/hooks/use-popular-roadmaps';

import { activeTabAtom, searchQueryAtom } from '../../../stores/community.atoms';
import { CommunityFilter } from '../../molecules/CommunityFilter';
import { CommunityHeader } from '../../molecules/CommunityHeader';
import { CommunityHero } from '../../molecules/CommunityHero';
import { CommunityGrid } from '../../organisms/CommunityGrid';

import type { CommunityItem } from '../../../types/community.types';

export function Community() {
  const searchQuery = useAtomValue(searchQueryAtom);
  const activeTab = useAtomValue(activeTabAtom);

  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: popularData, isLoading: isPopularLoading } = usePopularRoadmaps({ size: 12 });

  const { data: latestData, isLoading: isLatestLoading } = useCommunityRoadmaps({
    sort: 'latest',
    query: debouncedQuery || undefined,
    size: 12,
  });

  const popularItems = useMemo<
    Pick<CommunityItem, 'id' | 'title' | 'author' | 'imageUrl'>[]
  >(() => {
    if (!popularData?.content) return [];
    return popularData.content.map((item) => ({
      id: item.id,
      title: item.title,
      author: item.owner.nickname,
    }));
  }, [popularData]);

  const latestItems = useMemo<Pick<CommunityItem, 'id' | 'title' | 'author' | 'imageUrl'>[]>(() => {
    if (!latestData?.content) return [];
    return latestData.content.map((item) => ({
      id: item.id,
      title: item.title,
      author: item.owner.nickname,
    }));
  }, [latestData]);

  const isLoading =
    (activeTab === 'popular' && isPopularLoading) || (activeTab === 'latest' && isLatestLoading);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-[400px] w-full items-center justify-center">
          <p className="text-sm text-slate-500">{COMMUNITY_MESSAGES.LOADING}</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'popular':
        return popularItems.length === 0 ? (
          <div className="flex h-[400px] w-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <p className="text-sm font-medium text-slate-500">{COMMUNITY_MESSAGES.POPULAR_EMPTY}</p>
          </div>
        ) : (
          <CommunityGrid items={popularItems} />
        );
      case 'latest':
        return <CommunityGrid items={latestItems} />;
      case 'saved':
        return (
          <div className="flex h-[400px] w-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
            <p className="text-sm font-medium text-slate-500">{COMMUNITY_MESSAGES.SAVED_EMPTY}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <CommunityHeader />
      <CommunityHero />
      <div className="flex w-full flex-col items-center bg-white pt-[40px] pb-[100px]">
        <CommunityFilter />
        {renderContent()}
      </div>
    </div>
  );
}
