import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

import { RoadmapCard } from './RoadmapCard';

const MOCK_ROADMAPS = [
  { id: 1, title: 'Roadmap Name', author: '홍길동' },
  { id: 2, title: 'Roadmap Name', author: '홍길동' },
  { id: 3, title: 'Roadmap Name', author: '홍길동' },
  { id: 4, title: 'Roadmap Name', author: '홍길동' },
  { id: 5, title: 'Roadmap Name', author: '홍길동' },
  { id: 6, title: 'Roadmap Name', author: '홍길동' },
  { id: 7, title: 'Roadmap Name', author: '홍길동' },
];

export default function CreatedRoadmapList() {
  return (
    <div className="mb-10 flex w-[950px] flex-col gap-4 rounded-xl border border-slate-200 p-4">
      <h2 style={{ ...typography.paragraph.bold, color: colors.gray[600] }}>만든 로드맵</h2>

      <div className="grid grid-cols-3 gap-4">
        {MOCK_ROADMAPS.map((roadmap) => (
          <RoadmapCard key={roadmap.id} title={roadmap.title} author={roadmap.author} />
        ))}
      </div>
    </div>
  );
}
