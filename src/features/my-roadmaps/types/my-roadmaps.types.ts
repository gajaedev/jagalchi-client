export interface RoadmapData {
  id: string;
  title: string;
  type?: 'Roadmap' | 'Directory';
  author?: string;
  fileCount?: number;
  imageUrl?: string;
  updatedAt?: string;
  isFavorite?: boolean;
  isShared?: boolean;
  category?: 'my-roadmap' | 'community';
}
