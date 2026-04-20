import Image from 'next/image';
import Link from 'next/link';

import { SquareDashed } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface RoadmapThumbnailCardProps {
  title: string;
  author: string;
  imageUrl?: string;
  href?: string;
  className?: string;
  testId?: string;
}

/**
 * 썸네일 + 제목/작성자만 표시하는 최소 카드. community 리스트/프로필 리스트에서 공유.
 * 드롭다운/액션이 필요한 my-roadmaps 카드는 feature 전용으로 분리되어 있다.
 */
export function RoadmapThumbnailCard({
  title,
  author,
  imageUrl,
  href,
  className,
  testId,
}: RoadmapThumbnailCardProps) {
  const card = (
    <div
      data-testid={testId}
      className={cn(
        'h-full w-full cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-slate-100',
        className,
      )}
    >
      <div className="relative flex h-[146px] w-full items-center justify-center overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" sizes="304px" />
        ) : (
          <SquareDashed className="text-muted-foreground/30 h-8 w-8" />
        )}
      </div>
      <div className="flex flex-col border-t border-slate-200 bg-white px-3 py-2">
        <p className="truncate text-sm leading-[21px] text-slate-950">{title}</p>
        <p className="truncate text-xs leading-4 text-slate-500">By {author}</p>
      </div>
    </div>
  );

  if (!href) return card;

  return (
    <Link href={href} className="block">
      {card}
    </Link>
  );
}
