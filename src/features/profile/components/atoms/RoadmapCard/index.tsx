import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

interface RoadmapCardProps {
  title: string;
  author: string;
  imageUrl?: string;
}

export function RoadmapCard({ title, author, imageUrl }: RoadmapCardProps) {
  return (
    <Card
      data-testid="roadmap-card"
      className="hover:bg-muted/40 w-full cursor-pointer overflow-hidden rounded-lg border p-0 shadow-none transition-colors"
    >
      {imageUrl ? (
        <div className="bg-muted/50 relative aspect-[2/1] w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="bg-muted/50 flex aspect-[2/1] w-full items-center justify-center">
          <p className="text-muted-foreground text-sm font-medium">Thumbnail</p>
        </div>
      )}
      <CardContent className="m-2 flex h-5 flex-col items-start justify-end px-2">
        <p className="text-foreground text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground py-1 text-xs">By {author}</p>
      </CardContent>
    </Card>
  );
}
