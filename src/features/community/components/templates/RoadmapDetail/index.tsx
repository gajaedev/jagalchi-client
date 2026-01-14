'use client';

import NextImage from 'next/image';

import { Heart, FilePlus2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { MOCK_COMMUNITY_DATA } from '../../../constants/community.mock';
import { ContributorItem } from '../../atoms/ContributorItem';

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
      <div className="relative h-[400px] w-full bg-slate-50">
        {item.imageUrl && (
          <NextImage src={item.imageUrl} alt={item.title} fill className="object-cover" priority />
        )}
      </div>

      <div className="flex w-full max-w-[960px] gap-[64px] pt-[40px] pb-[120px]">
        <div className="flex w-[696px] flex-col">
          <div className="mb-[52px] flex flex-col gap-[16px]">
            <div className="flex items-center justify-between">
              <h1 className="text-foreground text-[30px] leading-none font-bold tracking-[-1px]">
                {item.title}
              </h1>
              <Button
                variant="outline"
                className="border-border text-foreground h-[36px] items-center gap-[8px] px-[12px] py-[8px] text-[14px] font-semibold hover:bg-slate-50"
              >
                <Heart className="h-4 w-4" />
                좋아요
              </Button>
            </div>

            <div className="flex items-center gap-[16px]">
              <Button
                variant="default"
                className="bg-primary hover:bg-primary/90 h-[32px] rounded-[6px] px-[12px] py-[6px] text-[14px] font-bold text-white"
              >
                로드맵 보기
              </Button>
              <Button
                variant="outline"
                className="border-border bg-background text-foreground h-[32px] items-center gap-[8px] rounded-[6px] px-[12px] py-[6px] text-[14px] font-bold hover:bg-slate-50"
              >
                <FilePlus2 className="h-4 w-4" />내 로드맵에 추가
              </Button>
            </div>
          </div>

          <section className="flex flex-col gap-[16px]">
            <h2 className="text-foreground text-[20px] leading-none font-semibold">About</h2>
            <p className="text-muted-foreground text-[16px] leading-[28px]">
              이 로드맵은 프론트엔드 개발자로 성장하기 위한 학습 경로를 제공합니다. HTML, CSS,
              JavaScript 기초부터 React, TypeScript, 그리고 최신 웹 개발 트렌드까지 체계적으로
              학습할 수 있습니다. 단계별 커리큘럼과 실습 프로젝트를 통해 실무에 필요한 역량을
              효과적으로 쌓을 수 있습니다.
            </p>
          </section>
        </div>

        <Separator orientation="vertical" className="bg-border h-[676px]" />

        <aside className="flex w-[134px] flex-col gap-[40px]">
          <div className="flex flex-col gap-[24px]">
            <h3 className="text-foreground text-[18px] leading-none font-semibold">Made by</h3>
            <div className="flex flex-col gap-[16px]">
              <ContributorItem name={item.author} />
              <ContributorItem name="Co-author" />
              <ContributorItem name="Contributor" />
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="flex flex-col gap-[8px]">
            <span className="text-[12px] font-bold text-slate-400">마지막 업데이트</span>
            <span className="text-[14px] font-medium text-slate-600">2달 전</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
