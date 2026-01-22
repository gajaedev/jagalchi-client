import { MyRoadmapsToolbar } from '@/features/my-roadmaps/components/molecules/MyRoadmapsToolbar';
import { MyRoadmapsGrid } from '@/features/my-roadmaps/components/organisms/MyRoadmapsGrid';
import { MyRoadmapsHeader } from '@/features/my-roadmaps/components/organisms/MyRoadmapsHeader';
import { MyRoadmapsLayout } from '@/features/my-roadmaps/components/templates/MyRoadmapsLayout';
import type { RoadmapData } from '@/features/my-roadmaps/types/my-roadmaps.types';

// Mock data for development
const MY_ROADMAPS: RoadmapData[] = [
  {
    id: '1',
    title: 'Frontend Developer Roadmap',
    author: '홍길동',
    type: 'Roadmap',
  },
  {
    id: '2',
    title: 'Directory Name',
    type: 'Directory',
    fileCount: 67,
  },
  {
    id: '3',
    title: 'React Mastery',
    author: '홍길동',
    type: 'Roadmap',
  },
  {
    id: '4',
    title: 'Backend Essentials',
    author: '홍길동',
    type: 'Roadmap',
  },
  {
    id: '5',
    title: 'DevOps Guide',
    author: '홍길동',
    type: 'Roadmap',
  },
];

export default function MyRoadmapsPage() {
  return (
    <MyRoadmapsLayout>
      <div className="flex h-full flex-col">
        <MyRoadmapsHeader />
        <div className="flex-1 px-20 pb-20">
          <MyRoadmapsToolbar />
          <div className="mt-6">
            <MyRoadmapsGrid roadmaps={MY_ROADMAPS} />
          </div>
        </div>
      </div>
    </MyRoadmapsLayout>
  );
}
