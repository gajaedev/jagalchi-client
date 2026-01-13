'use client';

import React, { useState } from 'react';

import { useAtom } from 'jotai';
import { Search, ArrowUp } from 'lucide-react';

import { Input } from '@/components/ui/input';
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
    <div className="relative flex h-[277px] w-full flex-col items-center overflow-hidden border-b border-[#E2E8F0] bg-[#F1F5F9]">
      {/* Decorative Elements */}
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

      {/* Hero Content */}
      <div className="z-10 mt-[80px] flex flex-col items-center">
        <h1 className="mb-[40px] text-[24px] font-bold tracking-[-0.02em] text-[#020617]">
          어떤 로드맵을 찾고있나요?
        </h1>

        <div className="relative h-[48px] w-[640px]">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <Input
            type="text"
            placeholder="Type a roadmap name to find..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-full w-full rounded-lg border-slate-200 bg-white px-12 text-sm shadow-sm focus-visible:ring-1 focus-visible:ring-slate-300"
          />
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            <button
              onClick={handleSearch}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white transition-colors hover:bg-slate-800"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
