import React from 'react';

import { CommunityFilter } from '../../molecules/CommunityFilter';
import { CommunityHero } from '../../molecules/CommunityHero';
import { CommunityGrid } from '../../organisms/CommunityGrid';

const MOCK_DATA = Array.from({ length: 15 }, (_, i) => ({
  id: `${i + 1}`,
  title: 'Roadmap Name',
  author: '홍길동',
}));

export function Community() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <CommunityHero />
      <div className="flex w-full flex-col items-center bg-white pt-[40px] pb-[100px]">
        <CommunityFilter />
        <CommunityGrid items={MOCK_DATA} />
      </div>
    </div>
  );
}
