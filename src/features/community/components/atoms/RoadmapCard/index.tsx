import { RoadmapThumbnailCard } from '@/components/roadmap';

interface RoadmapCardProps {
  id: number;
  title: string;
  author: string;
  imageUrl?: string;
  className?: string;
}

export function RoadmapCard({ id, title, author, imageUrl, className }: RoadmapCardProps) {
  return (
    <RoadmapThumbnailCard
      title={title}
      author={author}
      imageUrl={imageUrl}
      href={`/community/${id}`}
      className={className}
    />
  );
}
