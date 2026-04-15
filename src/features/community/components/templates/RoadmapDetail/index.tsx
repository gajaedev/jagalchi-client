'use client';

import { useState } from 'react';

import NextImage from 'next/image';
import { useRouter } from 'next/navigation';

import { Heart, FilePlus2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { COMMUNITY_MESSAGES } from '@/constants/messages';
import { useForkRoadmap } from '@/hooks/use-fork-roadmap';
import { useRoadmapDetail } from '@/hooks/use-roadmap-detail';
import { cn } from '@/lib/utils';

import { ContributorItem } from '../../atoms/ContributorItem';
import { CommunityHeader } from '../../molecules/CommunityHeader';

interface RoadmapDetailProps {
  id: number;
}

export function RoadmapDetail({ id }: RoadmapDetailProps) {
  const router = useRouter();
  const { data: item, isLoading, isError } = useRoadmapDetail(id);
  const { mutate: fork, isPending: isForking } = useForkRoadmap();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [forkMessage, setForkMessage] = useState('');

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-medium text-slate-500">{COMMUNITY_MESSAGES.LOADING_DETAIL}</p>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-medium text-slate-500">{COMMUNITY_MESSAGES.NOT_FOUND}</p>
      </div>
    );
  }

  const handleLikeToggle = () => {
    setIsLiked((prev) => {
      const nextLiked = !prev;
      setLikeCount((count) => (nextLiked ? count + 1 : count - 1));
      return nextLiked;
    });
  };

  const handleFork = () => {
    setForkMessage('');
    fork(id, {
      onSuccess: () => setForkMessage(COMMUNITY_MESSAGES.FORK_SUCCESS),
      onError: () => setForkMessage(COMMUNITY_MESSAGES.FORK_FAILED),
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <CommunityHeader />

      <div className="relative h-[400px] w-full bg-slate-100">
        {item.thumbnailUrl && (
          <NextImage
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      <div className="flex w-full max-w-[960px] flex-col gap-6 px-4 py-10 md:flex-row md:px-6">
        <div className="flex w-full max-w-[696px] flex-col">
          <div className="mb-4 flex flex-col gap-[16px]">
            <div className="flex items-center justify-between">
              <h1 className="text-foreground text-[24px] leading-[28.8px] font-semibold tracking-[-1px]">
                {item.title}
              </h1>
              <button
                type="button"
                onClick={handleLikeToggle}
                className="flex min-h-[36px] items-center gap-2 rounded-lg px-4 py-[7.5px] text-[14px] font-semibold text-slate-700 hover:bg-slate-50"
              >
                {likeCount}
                <Heart
                  className={cn('h-[13px] w-[13px]', isLiked && 'fill-red-500 text-red-500')}
                />
              </button>
            </div>

            <div className="flex items-center gap-[16px]">
              <Button
                variant="default"
                className="h-[32px] rounded-lg bg-slate-900 px-3 py-[5.5px] text-[14px] font-semibold text-white hover:bg-slate-800"
                onClick={() => router.push(`/viewer/${id}`)}
              >
                {COMMUNITY_MESSAGES.VIEW_ROADMAP}
              </Button>
              <Button
                variant="default"
                className="h-[32px] items-center gap-[8px] rounded-lg bg-slate-900 px-3 py-[5.5px] text-[14px] font-semibold text-white hover:bg-slate-800"
                onClick={handleFork}
                disabled={isForking}
              >
                <FilePlus2 className="h-[13px] w-[13px]" />
                {COMMUNITY_MESSAGES.ADD_TO_MY_ROADMAPS}
              </Button>
            </div>
            {forkMessage && (
              <p
                className={cn(
                  'text-sm font-medium',
                  forkMessage === COMMUNITY_MESSAGES.FORK_SUCCESS
                    ? 'text-green-600'
                    : 'text-destructive',
                )}
              >
                {forkMessage}
              </p>
            )}
          </div>

          <section className="flex flex-col gap-[16px]">
            <h2 className="text-foreground text-[20px] leading-none font-semibold">
              {COMMUNITY_MESSAGES.ABOUT}
            </h2>
            <p className="text-[16px] leading-[24px] text-slate-950">{item.description ?? ''}</p>
          </section>
        </div>

        <Separator
          orientation="vertical"
          className="bg-border hidden h-auto self-stretch md:block"
        />
        <Separator className="bg-border md:hidden" />

        <aside className="flex w-full flex-col gap-4 md:w-[134px]">
          <div className="flex flex-col gap-[24px]">
            <h3 className="text-foreground text-[20px] leading-none font-semibold">
              {COMMUNITY_MESSAGES.MADE_BY}
            </h3>
            <div className="flex flex-col gap-[16px]">
              <ContributorItem name={item.owner.nickname} />
            </div>
          </div>

          <Separator className="bg-border" />

          <div className="flex flex-col gap-0">
            <span className="text-xs font-normal text-neutral-500">
              {COMMUNITY_MESSAGES.LAST_UPDATED}
            </span>
            <span className="text-xs font-normal text-slate-950">{item.updatedAt}</span>
          </div>

          {item.stats.forkCount > 0 && (
            <div className="flex flex-col gap-0">
              <span className="text-xs font-normal text-neutral-500">
                {COMMUNITY_MESSAGES.FORK_COUNT_LABEL}
              </span>
              <span className="text-xs font-normal text-slate-950">{item.stats.forkCount}</span>
            </div>
          )}

          {item.tags.length > 0 && (
            <>
              <Separator className="bg-border" />
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
