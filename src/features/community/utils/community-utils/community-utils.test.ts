import { describe, it, expect } from 'vitest';
import { filterAndSortCommunityItems } from './index';
import { CommunityItem } from '../../types/community.types';

const mockItems: CommunityItem[] = [
  {
    id: 1,
    title: 'React Roadmap',
    author: 'Alice',
    likes: 10,
    updatedAt: '2024-01-01',
    type: 'roadmap',
    size: 5,
  },
  {
    id: 2,
    title: 'Vue Roadmap',
    author: 'Bob',
    likes: 20,
    updatedAt: '2024-01-02',
    type: 'roadmap',
    size: 10,
  },
  {
    id: 3,
    title: 'Frontend Directory',
    author: 'Charlie',
    likes: 5,
    updatedAt: '2023-12-31',
    type: 'directory',
    size: 2,
  },
];

describe('filterAndSortCommunityItems', () => {
  it('filters by searchQuery', () => {
    const result = filterAndSortCommunityItems(mockItems, {
      searchQuery: 'React',
      filterCategory: 'all',
      activeTab: 'popular',
      sortBy: 'name',
      sortOrder: 'desc',
    });
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('React Roadmap');
  });

  it('filters by category', () => {
    const result = filterAndSortCommunityItems(mockItems, {
      searchQuery: '',
      filterCategory: 'directory',
      activeTab: 'popular',
      sortBy: 'name',
      sortOrder: 'desc',
    });
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('directory');
  });

  it('sorts by size in descending order', () => {
    const result = filterAndSortCommunityItems(mockItems, {
      searchQuery: '',
      filterCategory: 'all',
      activeTab: 'popular',
      sortBy: 'size',
      sortOrder: 'desc',
    });
    expect(result[0].size).toBe(10);
    expect(result[1].size).toBe(5);
    expect(result[2].size).toBe(2);
  });

  it('sorts by recent', () => {
    const result = filterAndSortCommunityItems(mockItems, {
      searchQuery: '',
      filterCategory: 'all',
      activeTab: 'popular',
      sortBy: 'recent',
      sortOrder: 'desc',
    });
    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(1);
    expect(result[2].id).toBe(3);
  });
});
