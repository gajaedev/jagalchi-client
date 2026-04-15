export type { SortOrder, SortBy, FilterCategory } from '@/types/sort.types';

export type ActiveTab = 'popular' | 'latest' | 'saved';

export interface CommunityItem {
  id: number;
  title: string;
  author: string;
  imageUrl?: string;
  likes: number;
  updatedAt: string;
  type: 'roadmap' | 'directory';
  size?: number;
  description?: string;
}
