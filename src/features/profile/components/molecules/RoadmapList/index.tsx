import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RoadmapItem {
  id: string;
  title: string;
}

interface RoadmapListProps {
  variant: 'end' | 'process';
  items?: RoadmapItem[];
}

function RoadmapCardItem({ item }: { item: RoadmapItem }) {
  return (
    <Card className="h-14 w-full justify-center rounded-lg shadow-none sm:h-[53px]">
      <CardContent className="flex items-center gap-2">
        <Image src="/jagalchi.svg" alt="jagalchi" width={16} height={16} />
        <p className="text-foreground">{item.title}</p>
      </CardContent>
    </Card>
  );
}

export function RoadmapList({ variant, items = [] }: RoadmapListProps) {
  const title = variant === 'end' ? '완주한 로드맵' : '진행중인 로드맵';

  return (
    <Card className="h-[280px] w-full overflow-hidden rounded-xl p-6 shadow-none sm:h-[240px] sm:p-4">
      <CardHeader className="mb-4 p-0 sm:mb-0 sm:p-6">
        <CardTitle className="text-foreground text-lg">{title}</CardTitle>
      </CardHeader>

      <ScrollArea className="h-[200px] sm:h-[180px]">
        <CardContent className="flex flex-col items-center gap-3 p-0 sm:gap-2 sm:p-6">
          {items.map((item) => (
            <RoadmapCardItem key={item.id} item={item} />
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
