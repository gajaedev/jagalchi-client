import React, { useMemo } from 'react';

import { useAtomValue } from 'jotai';

import { MOCK_COMMUNITY_DATA } from '../../../constants/community.mock';
import {
  activeTabAtom,
  filterCategoryAtom,
  searchQueryAtom,
  sortByAtom,
  sortOrderAtom,
} from '../../../stores/community.atoms';
import { filterAndSortCommunityItems } from '../../../utils/community-utils';
import { CommunityFilter } from '../../molecules/CommunityFilter';
import { CommunityHero } from '../../molecules/CommunityHero';
import { CommunityGrid } from '../../organisms/CommunityGrid';

export function Community() {
  const searchQuery = useAtomValue(searchQueryAtom);
  const activeTab = useAtomValue(activeTabAtom);
  const sortOrder = useAtomValue(sortOrderAtom);
  const sortBy = useAtomValue(sortByAtom);
  const filterCategory = useAtomValue(filterCategoryAtom);

  const filteredItems = useMemo(
    () =>
      filterAndSortCommunityItems(MOCK_COMMUNITY_DATA, {
        searchQuery,
        filterCategory,
        activeTab,
        sortBy,
        sortOrder,
      }),
    [searchQuery, activeTab, sortOrder, sortBy, filterCategory],
  );

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
