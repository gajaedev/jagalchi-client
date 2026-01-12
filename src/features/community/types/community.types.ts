export type SortOrder = 'asc' | 'desc';
export type SortBy = 'name' | 'recent' | 'size';
export type FilterCategory = 'all' | 'roadmap' | 'directory';
export type ActiveTab = 'popular' | 'latest' | 'saved';

export interface CommunityItem {
  id: string;
  title: string;
  author: string;
  imageUrl?: string;
  likes: number;
  updatedAt: string;
  type: 'roadmap' | 'directory';
  size?: number; // e.g., number of steps or sub-items
}
