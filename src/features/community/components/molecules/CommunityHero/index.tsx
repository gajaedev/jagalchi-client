'use client';

import React, { useState } from 'react';

import { useAtom } from 'jotai';
import { Search, ArrowUp } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { COMMUNITY_MESSAGES } from '@/constants/messages';
import { cn } from '@/lib/utils';

import { searchQueryAtom } from '../../../stores/community.atoms';

const DECORATIVE_CIRCLES = [
  { className: 'absolute top-[-195px] left-[807px] h-[449px] w-[449px] border-slate-300' },
  { className: 'absolute top-[-288px] left-[991px] h-[388px] w-[388px] border-slate-300' },
  { className: 'absolute top-[-9px] left-[158px] h-[411px] w-[411px] border-slate-300' },
];

const DECORATIVE_DOTS = [
  { className: 'top-[-20px] left-[98px] h-[40px] w-[40px] opacity-30 shadow-none' },
  { className: 'top-[263px] left-[248px] h-[22px] w-[22px] opacity-40 shadow-none' },
  { className: 'top-[58px] left-[415px] h-[12px] w-[12px] opacity-40 shadow-none' },
  { className: 'top-[154px] left-[1374px] h-[12px] w-[12px] opacity-40 shadow-none' },
  { className: 'top-[191px] left-[795px] h-[12px] w-[12px] opacity-40 shadow-none' },
  { className: 'top-[12px] left-[650px] h-[16px] w-[16px] opacity-40 shadow-none' },
  { className: 'top-[159px] left-[24px] h-[16px] w-[16px] opacity-40 shadow-none' },
  { className: 'top-[60px] left-[1074px] h-[20px] w-[20px] opacity-40 shadow-none' },
  { className: 'top-[262px] left-[1214px] h-[32px] w-[32px] opacity-40 shadow-none' },
  { className: 'top-[-9px] left-[1424px] h-[32px] w-[32px] opacity-40 shadow-none' },
];

export function CommunityHero() {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const [localQuery, setLocalQuery] = useState(query);

  const handleSearch = () => {
    setQuery(localQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="border-border relative flex h-[277px] w-full flex-col items-center overflow-hidden border-b bg-slate-100">
      {DECORATIVE_CIRCLES.map((circle, i) => (
        <div
          key={i}
          className={cn(
            'pointer-events-none rounded-full border border-solid bg-white/20',
            circle.className,
          )}
        />
      ))}

      {DECORATIVE_DOTS.map((dot, i) => (
        <div
          key={i}
          className={cn('pointer-events-none absolute rounded-full bg-slate-200', dot.className)}
        />
      ))}

      <div className="z-10 mt-[80px] flex flex-col items-center">
        <h1 className="text-foreground mb-[40px] text-[24px] leading-[28.8px] font-bold tracking-[-1px]">
          {COMMUNITY_MESSAGES.HERO_TITLE}
        </h1>

        <div className="relative w-full max-w-[640px] px-4">
          <div className="flex items-start gap-2 overflow-hidden rounded-xl border border-slate-300 bg-white p-2 shadow-md">
            <div className="flex min-h-[32px] flex-1 items-center gap-1.5 overflow-hidden rounded-lg bg-white px-2">
              <Search className="h-5 w-5 shrink-0 text-slate-500" />
              <Input
                type="text"
                placeholder="Type a roadmap name to find..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="로드맵 검색"
                className="border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
              />
            </div>
            <button
              type="button"
              aria-label={COMMUNITY_MESSAGES.SEARCH_ARIA}
              onClick={handleSearch}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-800"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
