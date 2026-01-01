import { Card, CardContent } from '@/components/ui/card';

interface RoadmapCardProps {
  title: string;
  author: string;
}

export function RoadmapCard({ title, author }: RoadmapCardProps) {
  return (
    <Card className="hover:bg-muted/40 w-full cursor-pointer overflow-hidden rounded-lg border shadow-none transition-colors">
      <div className="bg-muted aspect-[3/1] w-full" />
      <CardContent>
        <p className="text-foreground line-clamp-1 text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground mt-0.5 text-xs">By {author}</p>
      </CardContent>
    </Card>
  );
}
