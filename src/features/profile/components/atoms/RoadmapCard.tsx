import { Card, CardContent } from '@/components/ui/card';

interface RoadmapCardProps {
  title: string;
  author: string;
}

export function RoadmapCard({ title, author }: RoadmapCardProps) {
  return (
    <Card className="border-border bg-card flex h-[200px] w-[304px] flex-col overflow-hidden rounded-xl border shadow-none">
      <div className="border-border bg-muted h-[140px] border-b" />

      <CardContent className="flex flex-1 flex-col justify-center p-4">
        <p className="text-foreground line-clamp-1 text-sm font-normal">{title}</p>
        <p className="text-muted-foreground text-xs font-normal tracking-[0.5px]">By {author}</p>
      </CardContent>
    </Card>
  );
}
