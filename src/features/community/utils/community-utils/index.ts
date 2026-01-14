import {
  CommunityItem,
  SortBy,
  SortOrder,
  FilterCategory,
  ActiveTab,
} from '../../types/community.types';

export function filterAndSortCommunityItems(
  items: CommunityItem[],
  {
    searchQuery,
    filterCategory,
    activeTab,
    sortBy,
    sortOrder,
  }: {
    searchQuery: string;
    filterCategory: FilterCategory;
    activeTab: ActiveTab;
    sortBy: SortBy;
    sortOrder: SortOrder;
  },
): CommunityItem[] {
  let result = [...items];

  if (searchQuery) {
    result = result.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
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
}
