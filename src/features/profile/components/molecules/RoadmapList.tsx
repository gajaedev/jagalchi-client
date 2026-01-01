import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card className="border-border bg-card h-[53px] w-[444px] justify-center rounded-lg border shadow-none">
      <CardContent className="flex items-center gap-3">
        <div className="h-6 w-6"></div>
        <p className="text-foreground">{item.title}</p>
      </CardContent>
    </Card>
  );
}

export function RoadmapList({ variant, items = [] }: RoadmapListProps) {
  const title = variant === 'end' ? '완주한 로드맵' : '진행중인 로드맵';

  return (
    <Card className="border-border bg-card h-[240px] w-[468px] overflow-scroll rounded-xl border shadow-none">
      <CardHeader>
        <CardTitle className="text-foreground text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        {items.map((item) => (
          <RoadmapCardItem key={item.id} item={item} />
        ))}
      </CardContent>
    </Card>
  );
}
