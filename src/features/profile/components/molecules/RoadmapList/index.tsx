import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PROFILE_MESSAGES } from '@/constants/messages';

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
  const title =
    variant === 'end' ? PROFILE_MESSAGES.COMPLETED_ROADMAP : PROFILE_MESSAGES.IN_PROGRESS_ROADMAP;

  return (
    <Card className="h-[240px] w-full gap-0 overflow-hidden rounded-xl p-4 shadow-none sm:h-[280px] sm:p-6">
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-muted-foreground text-sm font-semibold">{title}</CardTitle>
      </CardHeader>

      <ScrollArea className="h-[165px] sm:h-[180px]">
        <CardContent className="flex flex-col items-center gap-2 p-0 sm:gap-3">
          {items.map((item) => (
            <RoadmapCardItem key={item.id} item={item} />
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
