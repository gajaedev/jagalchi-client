import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoadmapItem {
  id: string;
  title: string;
}

interface RoadmapListProps {
  variant: 'end' | 'process';
  items?: RoadmapItem[];
}

export function RoadmapList({ variant, items = [] }: RoadmapListProps) {
  const title = variant === 'end' ? '완주한 로드맵' : '진행중인 로드맵';

  return (
    <Card className="h-[240px] w-[468px] overflow-scroll rounded-xl border border-slate-200 bg-white shadow-none">
      <CardHeader>
        <CardTitle className="text-lg text-slate-700">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className="h-[53px] w-[444px] justify-center rounded-lg border border-slate-200 bg-white shadow-none"
          >
            <CardContent className="flex items-center gap-3">
              <div className="h-6 w-6"></div>
              <p className="text-slate-600">{item.title}</p>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
