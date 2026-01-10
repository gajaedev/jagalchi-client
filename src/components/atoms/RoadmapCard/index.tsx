import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

interface RoadmapCardProps {
  _id?: string;
  title: string;
  author: string;
  imageUrl?: string;
  href?: string;
}

export function RoadmapCard({ _id, title, author, imageUrl, href }: RoadmapCardProps) {
  const content = (
    <div className="group flex h-[200px] w-[304px] cursor-pointer flex-col overflow-hidden rounded-[8px] border border-[#E2E8F0] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-all hover:border-[#CBD5E1]">
      {/* Thumbnail Area (Exact Height: 146px) */}
      <div className="relative h-[146px] w-full shrink-0 bg-[#F1F5F9]">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" sizes="304px" />
        ) : (
          <div className="flex size-full items-center justify-center">
            {/* Visual placeholder matching Figma's empty state color */}
            <div className="h-12 w-12 rounded-lg bg-white/50" />
          </div>
        )}
      </div>

      {/* Content Area (Exact Total Height: 54px) */}
      <div className="flex h-[54px] w-full flex-col justify-center overflow-hidden border-t border-[#E2E8F0] bg-white px-[12px] py-[8px]">
        <p className="line-clamp-1 truncate text-[14px] leading-[21px] font-normal tracking-[0.07px] text-[#020617]">
          {title}
        </p>
        <p className="line-clamp-1 truncate text-[12px] leading-[16px] font-normal tracking-[0.18px] text-[#64748B]">
          By {author}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-fit">
        {content}
      </Link>
    );
  }

  return content;
}
