import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface RoadmapCardProps {
  title: string;
  author: string;
}

export function RoadmapCard({ title, author }: RoadmapCardProps) {
  return (
    <Card className="flex h-[200px] w-[304px] flex-col overflow-hidden rounded-xl shadow-none">
      <div className="bg-muted h-[140px]" />
      <Separator />
      <CardContent className="flex flex-1 flex-col justify-center p-4">
        <p className="text-foreground line-clamp-1 text-sm font-normal">{title}</p>
        <p className="text-muted-foreground text-xs font-normal tracking-[0.5px]">By {author}</p>
      </CardContent>
    </Card>
  );
}
