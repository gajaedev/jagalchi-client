import { useAtom } from 'jotai';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  { id: 7, title: 'Roadmap Name', author: '홍길동', imageUrl: '/jagalchi.svg' },
];

export function MadeRoadmapList() {
  const [mode] = useAtom(profileModeAtom);

  return (
    <Card className="mb-10 w-full rounded-xl shadow-none">
      <CardHeader className="pb-4">
        <CardTitle className="text-muted-foreground text-base font-bold">만든 로드맵</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4">
          {MOCK_ROADMAPS.map((roadmap) => (
            <RoadmapCard
              key={roadmap.id}
              title={roadmap.title}
              author={roadmap.author}
              imageUrl={roadmap.imageUrl}
            />
          ))}
        </div>
        {mode === 'edit' && (
          <AddRoadmapModal>
            <Button className="w-full rounded-xl py-6 text-[14px] font-bold">
              공개 로드맵 추가
            </Button>
          </AddRoadmapModal>
        )}
      </CardContent>
    </Card>
  );
}
