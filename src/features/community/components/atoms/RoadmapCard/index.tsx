import Image from 'next/image';
import Link from 'next/link';

import { SquareDashed } from 'lucide-react';

import { cn } from '@/lib/utils';

interface RoadmapCardProps {
  id: string;
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
          'h-[200px] w-[304px] cursor-pointer overflow-hidden rounded-lg border border-[#e2e8f0] bg-[#f1f5f9]',
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
        <div className="flex flex-col border-t border-[#e2e8f0] bg-white px-3 py-2">
          <p className="truncate text-sm leading-[21px] text-[#020617]">{title}</p>
          <p className="truncate text-xs leading-4 text-[#64748b]">By {author}</p>
        </div>
      </div>
    </Link>
  );
}
