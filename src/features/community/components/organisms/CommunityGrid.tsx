import React from 'react';

import { RoadmapCard } from '@/components/atoms/RoadmapCard';

interface CommunityGridProps {
  items: Array<{
    id: string;
    title: string;
    author: string;
    imageUrl?: string;
  }>;
}

export function CommunityGrid({ items }: CommunityGridProps) {
  return (
    <div className="grid w-full max-w-[960px] grid-cols-3 gap-x-6 gap-y-6">
      {items.map((item) => (
        <div key={item.id} className="h-[200px] w-[304px]">
          <RoadmapCard
            title={item.title}
            author={item.author}
            imageUrl={item.imageUrl}
            href={`/community/${item.id}`}
          />
        </div>
      ))}
    </div>
  );
}
