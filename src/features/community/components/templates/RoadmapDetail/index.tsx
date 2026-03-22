'use client';

import { useState } from 'react';

import NextImage from 'next/image';
import { useRouter } from 'next/navigation';

import { Heart, FilePlus2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { COMMUNITY_MESSAGES } from '@/constants/messages';
import { cn } from '@/lib/utils';

import { MOCK_COMMUNITY_DATA } from '../../../constants/community.mock';
import { ContributorItem } from '../../atoms/ContributorItem';
import { CommunityHeader } from '../../molecules/CommunityHeader';

interface RoadmapDetailProps {
  id: string;
}

export function RoadmapDetail({ id }: RoadmapDetailProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
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
      <CommunityHeader />

      <div className="relative h-[400px] w-full bg-[#f1f5f9]">
        {item.imageUrl && (
          <NextImage src={item.imageUrl} alt={item.title} fill className="object-cover" priority />
        )}
      </div>

      <div className="flex w-full max-w-[960px] gap-6 px-6 py-10">
        <div className="flex w-[696px] flex-col">
          <div className="mb-4 flex flex-col gap-[16px]">
            <div className="flex items-center justify-between">
              <h1 className="text-foreground text-[24px] leading-[28.8px] font-semibold tracking-[-1px]">
                {item.title}
              </h1>
              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                className="flex min-h-[36px] items-center gap-2 rounded-lg px-4 py-[7.5px] text-[14px] font-semibold text-[#334155] hover:bg-slate-50"
              >
                {item.likes ?? 67}
                <Heart
                  className={cn('h-[13px] w-[13px]', isLiked && 'fill-red-500 text-red-500')}
                />
              </button>
            </div>

            <div className="flex items-center gap-[16px]">
              <Button
                variant="default"
                className="h-[32px] rounded-lg bg-[#0f172a] px-3 py-[5.5px] text-[14px] font-semibold text-white hover:bg-[#1e293b]"
                onClick={() => router.push(`/viewer/${id}`)}
              >
                {COMMUNITY_MESSAGES.VIEW_ROADMAP}
              </Button>
              <Button
                variant="default"
                className="h-[32px] items-center gap-[8px] rounded-lg bg-[#0f172a] px-3 py-[5.5px] text-[14px] font-semibold text-white hover:bg-[#1e293b]"
                onClick={() => window.alert(COMMUNITY_MESSAGES.LOGIN_REQUIRED)}
              >
                <FilePlus2 className="h-[13px] w-[13px]" />
                {COMMUNITY_MESSAGES.ADD_TO_MY_ROADMAPS}
              </Button>
            </div>
          </div>

          <section className="flex flex-col gap-[16px]">
            <h2 className="text-foreground text-[20px] leading-none font-semibold">About</h2>
            <p className="text-[16px] leading-[24px] text-[#020617]">
              이 로드맵은 프론트엔드 개발자로 성장하기 위한 학습 경로를 제공합니다. HTML, CSS,
              JavaScript 기초부터 React, TypeScript, 그리고 최신 웹 개발 트렌드까지 체계적으로
              학습할 수 있습니다. 단계별 커리큘럼과 실습 프로젝트를 통해 실무에 필요한 역량을
              효과적으로 쌓을 수 있습니다.
            </p>
          </section>
        </div>

        <Separator orientation="vertical" className="bg-border h-auto self-stretch" />

        <aside className="flex w-[134px] flex-col gap-4">
          <div className="flex flex-col gap-[24px]">
            <h3 className="text-foreground text-[20px] leading-none font-semibold">Made by</h3>
            <div className="flex flex-col gap-[16px]">
              <ContributorItem name={item.author} />
              <ContributorItem name="Co-author" />
              <ContributorItem name="Contributor" />
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="flex flex-col gap-0">
            <span className="text-xs font-normal text-[#737373]">마지막 업데이트</span>
            <span className="text-xs font-normal text-[#020617]">2달 전</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
