import { RoadmapThumbnailCard } from '@/components/roadmap';

interface RoadmapCardProps {
  title: string;
  author: string;
  imageUrl?: string;
  className?: string;
}

export function RoadmapCard({ title, author, imageUrl, className }: RoadmapCardProps) {
  return (
    <RoadmapThumbnailCard
      title={title}
      author={author}
      imageUrl={imageUrl}
      className={className}
      testId="roadmap-card"
    />
  );
}
