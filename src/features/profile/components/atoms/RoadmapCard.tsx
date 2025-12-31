import { Card, CardContent } from '@/components/ui/card';

interface RoadmapCardProps {
  title: string;
  author: string;
}

export function RoadmapCard({ title, author }: RoadmapCardProps) {
  return (
    <Card className="flex h-[200px] w-[304px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-none">
      <div className="h-[140px] border-b border-slate-200 bg-slate-100" />

      <CardContent className="flex flex-1 flex-col justify-center p-4">
        <p className="line-clamp-1 text-sm font-normal text-gray-900">{title}</p>
        <p className="text-xs font-normal tracking-[0.5px] text-gray-500">By {author}</p>
      </CardContent>
    </Card>
  );
}
