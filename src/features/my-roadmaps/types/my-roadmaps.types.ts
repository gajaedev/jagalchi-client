export interface RoadmapData {
  id: string;
  title: string;
  type?: 'Roadmap' | 'Directory';
  author?: string;
  fileCount?: number;
  imageUrl?: string;
}
