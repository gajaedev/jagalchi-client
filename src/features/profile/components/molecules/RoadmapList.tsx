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
    <Card className="h-[53px] w-full justify-center rounded-lg shadow-none">
      <CardContent className="flex items-center gap-3">
        <div className="h-6 w-6" />
        <p className="text-foreground">{item.title}</p>
      </CardContent>
    </Card>
  );
}

export function RoadmapList({ variant, items = [] }: RoadmapListProps) {
  const title = variant === 'end' ? '완주한 로드맵' : '진행중인 로드맵';

  return (
    <Card className="h-[240px] w-full overflow-hidden rounded-xl shadow-none">
      <CardHeader>
        <CardTitle className="text-foreground text-lg">{title}</CardTitle>
      </CardHeader>

      <ScrollArea className="h-[180px]">
        <CardContent className="flex flex-col items-center gap-4">
          {items.map((item) => (
            <RoadmapCardItem key={item.id} item={item} />
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
