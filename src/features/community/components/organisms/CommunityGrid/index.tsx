import React from 'react';

import { RoadmapCard } from '../../atoms/RoadmapCard';

import type { CommunityItem } from '../../../types/community.types';

interface CommunityGridProps {
  items: Pick<CommunityItem, 'id' | 'title' | 'author' | 'imageUrl'>[];
}

export function CommunityGrid({ items }: CommunityGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
        <p className="text-sm font-medium text-slate-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-[960px] grid-cols-3 gap-x-6 gap-y-6">
      {items.map((item) => (
        <div key={item.id} className="h-[200px] w-[304px]">
          <RoadmapCard
            id={item.id}
            title={item.title}
            author={item.author}
            imageUrl={item.imageUrl}
          />
        </div>
      ))}
    </div>
  );
}
