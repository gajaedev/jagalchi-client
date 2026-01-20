import Image from 'next/image';

import { Ellipsis, SquareDashed } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface RoadmapCardProps {
  id?: string;
  title: string;
  type?: 'Roadmap' | 'Directory';
  author?: string;
  fileCount?: number;
  imageUrl?: string;
  className?: string;
}

export function RoadmapCard({
  title,
  type = 'Roadmap',
  author,
  fileCount,
  imageUrl,
  className,
}: RoadmapCardProps) {
  const isDirectory = type === 'Directory';

  return (
    <Card
      className={cn(
        'group relative flex aspect-[300/200] w-full cursor-pointer flex-col gap-0 overflow-hidden rounded-lg bg-white p-0 shadow-none transition-all',
        className,
      )}
    >
      {/* Thumbnail Area (180px) */}
      <div className="relative h-[180px] w-full bg-[#F3F5F7]">
        {isDirectory ? (
          <div className="relative h-full w-full">
            {/* Folder shape */}
            <div className="absolute top-0 left-0 h-4 w-24 rounded-t-lg bg-white" />
            <div className="absolute inset-0 top-4 flex items-center justify-center rounded-tr-lg bg-white">
              <SquareDashed className="text-muted-foreground/30 border-muted-foreground/20 h-12 w-12 rounded-md border-2 border-dashed p-2" />
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center overflow-hidden">
            {imageUrl ? (
              <Image src={imageUrl} alt={title} fill className="object-cover" sizes="304px" />
            ) : (
              <SquareDashed className="text-muted-foreground/30 border-muted-foreground/20 h-12 w-12 rounded-md border-2 border-dashed p-2" />
            )}
          </div>
        )}
      </div>

      {/* Info Area (54px) */}
      <div className="border-border/40 flex h-[54px] items-center justify-between border-t bg-white px-3 py-2">
        <div className="flex min-w-0 flex-col justify-center">
          <p className="truncate text-[14px] leading-tight font-semibold text-[#1F2937]">{title}</p>
          <p className="text-muted-foreground mt-0.5 text-[11px] leading-tight font-medium">
            {isDirectory ? `${fileCount ?? 0}개의 파일` : `By ${author ?? '홍길동'}`}
          </p>
        </div>
        <button
          type="button"
          aria-label="더 보기"
          className="text-muted-foreground/60 hover:text-foreground shrink-0 p-1 transition-colors"
        >
          <Ellipsis className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
}
