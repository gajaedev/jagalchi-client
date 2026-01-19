import { RoadmapCard } from '@/features/community/components/atoms/RoadmapCard';
import { MyRoadmapsToolbar } from '@/features/my-roadmaps/components/molecules/MyRoadmapsToolbar';
import { MyRoadmapsHeader } from '@/features/my-roadmaps/components/organisms/MyRoadmapsHeader';
import { MyRoadmapsLayout } from '@/features/my-roadmaps/components/templates/MyRoadmapsLayout';

// Mock data for development
const MY_ROADMAPS = [
  {
    id: '1',
    title: 'Frontend Developer Roadmap',
    author: 'User',
  },
  {
    id: '2',
    title: 'React Mastery',
    author: 'User',
  },
  {
    id: '3',
    title: 'Backend Essentials',
    author: 'User',
  },
  {
    id: '4',
    title: 'DevOps Guide',
    author: 'User',
  },
  {
    id: '5',
    title: 'Full Stack Journey',
    author: 'User',
  },
];

export default function MyRoadmapsPage() {
  return (
    <MyRoadmapsLayout>
      <div className="flex h-full flex-col">
        <MyRoadmapsHeader />
        <div className="flex-1 px-20 pb-20">
          <MyRoadmapsToolbar />
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {MY_ROADMAPS.map((roadmap) => (
              <RoadmapCard
                key={roadmap.id}
                id={roadmap.id}
                title={roadmap.title}
                author={roadmap.author}
              />
            ))}
          </div>
        </div>
      </div>
    </MyRoadmapsLayout>
  );
}
