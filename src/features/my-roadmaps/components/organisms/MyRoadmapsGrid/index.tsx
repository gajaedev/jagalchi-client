import { RoadmapData } from '../../../types/my-roadmaps.types';
import { RoadmapCard } from '../../atoms/RoadmapCard';

interface MyRoadmapsGridProps {
  roadmaps: RoadmapData[];
}

export function MyRoadmapsGrid({ roadmaps }: MyRoadmapsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-14 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {roadmaps.map((roadmap) => (
        <RoadmapCard
          key={roadmap.id}
          title={roadmap.title}
          type={roadmap.type}
          author={roadmap.author}
          fileCount={roadmap.fileCount}
          imageUrl={roadmap.imageUrl}
        />
      ))}
    </div>
  );
}
