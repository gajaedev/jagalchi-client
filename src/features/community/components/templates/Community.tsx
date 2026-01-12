import React, { useMemo } from 'react';

import { useAtomValue } from 'jotai';

import { MOCK_COMMUNITY_DATA } from '../../constants/community.mock';
import {
  activeTabAtom,
  filterCategoryAtom,
  searchQueryAtom,
  sortByAtom,
  sortOrderAtom,
} from '../../stores/community.atoms';
import { CommunityFilter } from '../molecules/CommunityFilter';
import { CommunityHero } from '../molecules/CommunityHero';
import { CommunityGrid } from '../organisms/CommunityGrid';

export function Community() {
  const searchQuery = useAtomValue(searchQueryAtom);
  const activeTab = useAtomValue(activeTabAtom);
  const sortOrder = useAtomValue(sortOrderAtom);
  const sortBy = useAtomValue(sortByAtom);
  const filterCategory = useAtomValue(filterCategoryAtom);

  const filteredItems = useMemo(() => {
    let result = [...MOCK_COMMUNITY_DATA];

    if (searchQuery) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (filterCategory !== 'all') {
      result = result.filter((item) => item.type === filterCategory);
    }

    if (activeTab === 'saved') {
      result = result.slice(0, 5);
    }

    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'recent':
          comparison = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          break;
        case 'size':
          comparison = (b.size || 0) - (a.size || 0);
          break;
        default:
          break;
      }

      return sortOrder === 'desc' ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, activeTab, sortOrder, sortBy, filterCategory]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <CommunityHero />
      <div className="flex w-full flex-col items-center bg-white pt-[40px] pb-[100px]">
        <CommunityFilter />
        <CommunityGrid items={filteredItems} />
      </div>
    </div>
  );
}
