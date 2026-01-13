'use client';

import React from 'react';

import NextImage from 'next/image';

import { Heart, FilePlus2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { MOCK_COMMUNITY_DATA } from '../../constants/community.mock';
import { ContributorItem } from '../atoms/ContributorItem';

interface RoadmapDetailProps {
  id: string;
}

export function RoadmapDetail({ id }: RoadmapDetailProps) {
  const item = MOCK_COMMUNITY_DATA.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-medium text-slate-500">로드맵을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full bg-[#F8FAFC]">
        {item.imageUrl && (
          <NextImage src={item.imageUrl} alt={item.title} fill className="object-cover" priority />
        )}
      </div>

      {/* Content Section */}
      <div className="flex w-full max-w-[960px] gap-[64px] pt-[40px] pb-[120px]">
        {/* Main Content */}
        <div className="flex w-[696px] flex-col">
          {/* Header Area */}
          <div className="mb-[52px] flex flex-col gap-[16px]">
            <div className="flex items-center justify-between">
              <h1 className="text-[30px] leading-none font-bold tracking-[-1px] text-[#020617]">
                {item.title}
              </h1>
              <Button
                variant="outline"
                className="h-[36px] items-center gap-[8px] border-[#E2E8F0] px-[12px] py-[8px] text-[14px] font-semibold text-[#020617] hover:bg-slate-50"
              >
                <Heart className="h-4 w-4" />
                좋아요
              </Button>
            </div>

            <div className="flex items-center gap-[16px]">
              <Button
                variant="default"
                className="h-[32px] rounded-[6px] bg-[#020617] px-[12px] py-[6px] text-[14px] font-bold text-white hover:bg-[#020617]/90"
              >
                로드맵 보기
              </Button>
              <Button
                variant="outline"
                className="h-[32px] items-center gap-[8px] rounded-[6px] border-[#E2E8F0] bg-white px-[12px] py-[6px] text-[14px] font-bold text-[#020617] hover:bg-slate-50"
              >
                <FilePlus2 className="h-4 w-4" />내 로드맵에 추가
              </Button>
            </div>
          </div>

          {/* About Section */}
          <section className="flex flex-col gap-[16px]">
            <h2 className="text-[20px] leading-none font-semibold text-[#020617]">About</h2>
            <p className="text-[16px] leading-[28px] text-[#475569]">
              {/* Using mock description or fallback */}
              I’m as real as they come, they get feeling get numb. You think you got a little buzz,
              so now you can’t get stuck. I keep a razor blade tuck on me, under my toungue. Don’t
              let me have to tell them niggas about the city I’m from, It’s Brooklyn. Be the home of
              the hardest ever, where the nigga’s don’t aim, just palm beretta’s and bomb whatever.
              So we don’t move calmly never. It’s for my niggas trapped in cells like salmonela.
              Look I could do this shit with no effort, no pressure, no gimmick shit, no radio
              records. Just text book rhyme style with the raw texture. Punchlines, right hooks, now
              that’s a trifecta.
            </p>
          </section>
        </div>

        {/* Separator */}
        <Separator orientation="vertical" className="h-[676px] bg-[#E2E8F0]" />

        {/* Sidebar */}
        <aside className="flex w-[134px] flex-col gap-[40px]">
          {/* Made by */}
          <div className="flex flex-col gap-[24px]">
            <h3 className="text-[18px] leading-none font-semibold text-[#020617]">Made by</h3>
            <div className="flex flex-col gap-[16px]">
              <ContributorItem name={item.author} />
              <ContributorItem name="Co-author" />
              <ContributorItem name="Contributor" />
            </div>
          </div>

          <Separator className="bg-[#E2E8F0]" />

          {/* Update Info */}
          <div className="flex flex-col gap-[8px]">
            <span className="text-[12px] font-bold text-slate-400">마지막 업데이트</span>
            <span className="text-[14px] font-medium text-slate-600">
              {/* Deterministic calculation for "X months ago" could be added here */}
              2달 전
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
