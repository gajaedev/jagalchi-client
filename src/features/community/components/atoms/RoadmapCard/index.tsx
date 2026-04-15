import Image from 'next/image';
import Link from 'next/link';

import { SquareDashed } from 'lucide-react';

import { cn } from '@/lib/utils';

interface RoadmapCardProps {
  id: number;
  title: string;
  author: string;
  imageUrl?: string;
  className?: string;
}

export function RoadmapCard({ id, title, author, imageUrl, className }: RoadmapCardProps) {
  return (
    <Link href={`/community/${id}`} className="block">
      <div
        className={cn(
          'h-full w-full cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-slate-100',
          className,
        )}
      >
        {/* Thumbnail Area - 146px */}
        <div className="relative flex h-[146px] w-full items-center justify-center overflow-hidden">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} fill className="object-cover" sizes="304px" />
          ) : (
            <SquareDashed className="text-muted-foreground/30 h-8 w-8" />
          )}
        </div>

        {/* Info Area */}
        <div className="flex flex-col border-t border-slate-200 bg-white px-3 py-2">
          <p className="truncate text-sm leading-[21px] text-slate-950">{title}</p>
          <p className="truncate text-xs leading-4 text-slate-500">By {author}</p>
        </div>
      </div>
    </Link>
  );
}
