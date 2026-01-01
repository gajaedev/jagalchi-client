import { useAtom } from 'jotai';

import { Button } from '@/components/ui/button';

import { profileModeAtom } from '../../stores/profile-atoms';
import { RoadmapCard } from '../atoms/RoadmapCard';

import { AddRoadmapModal } from './AddRoadmapModal';

const MOCK_ROADMAPS = [
  { id: 1, title: 'Roadmap Name', author: '홍길동' },
  { id: 2, title: 'Roadmap Name', author: '홍길동' },
  { id: 3, title: 'Roadmap Name', author: '홍길동' },
  { id: 4, title: 'Roadmap Name', author: '홍길동' },
  { id: 5, title: 'Roadmap Name', author: '홍길동' },
  { id: 6, title: 'Roadmap Name', author: '홍길동' },
  { id: 7, title: 'Roadmap Name', author: '홍길동' },
];

export function MadeRoadmapList() {
  const [mode] = useAtom(profileModeAtom);

  return (
    <div className="mb-10 flex w-[950px] flex-col gap-4 rounded-xl border border-slate-200 p-4">
      <h2 className="text-base font-bold text-slate-500">만든 로드맵</h2>

      <div className="grid grid-cols-3 gap-4">
        {MOCK_ROADMAPS.map((roadmap) => (
          <RoadmapCard key={roadmap.id} title={roadmap.title} author={roadmap.author} />
        ))}
      </div>
      {mode === 'edit' && (
        <AddRoadmapModal>
          <Button className="w-full rounded-xl bg-slate-900 py-6 text-[14px] font-bold text-white hover:bg-slate-800">
            공개 로드맵 추가
          </Button>
        </AddRoadmapModal>
      )}
    </div>
  );
}
