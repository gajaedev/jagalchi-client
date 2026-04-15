'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft, ChevronDown, GitFork, Search, Sparkles } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VIEWER_MESSAGES } from '@/constants/messages';
import { useForkRoadmap } from '@/hooks/use-fork-roadmap';
import { useForkStatus } from '@/hooks/use-fork-status';

interface RoadmapHeaderProps {
  roadmapId?: number;
  roadmapTitle?: string;
  onAiFeedback?: () => void;
}

export function RoadmapHeader({
  roadmapId = 0,
  roadmapTitle = VIEWER_MESSAGES.DEFAULT_ROADMAP_TITLE,
  onAiFeedback,
}: RoadmapHeaderProps) {
  const router = useRouter();
  const { data: forkStatus } = useForkStatus(roadmapId);
  const { mutate: forkRoadmap, isPending: isForkPending } = useForkRoadmap();

  const handleFork = () => {
    if (!roadmapId || forkStatus?.forkedByCurrentUser) return;
    forkRoadmap(roadmapId, {
      onSuccess: (data) => {
        router.push(`/editor/${data.id}`);
      },
    });
  };

  return (
    <header className="flex h-12 w-full items-center justify-between bg-white px-5">
      {/* Left: Back + Title dropdown */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center justify-center rounded-lg p-2 hover:bg-slate-100"
          aria-label="뒤로가기"
        >
          <ArrowLeft className="h-4 w-4 text-slate-950" />
        </button>
        <button
          type="button"
          className="flex items-center gap-1 text-sm font-semibold text-slate-950 hover:text-slate-600"
        >
          {roadmapTitle}
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {/* Center: Avatar */}
      <Avatar className="h-8 w-8">
        <AvatarImage src="" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      {/* Right: Search + Fork + AI button */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            type="text"
            placeholder={VIEWER_MESSAGES.SEARCH_PLACEHOLDER}
            className="h-9 w-[200px] rounded-lg border-slate-200 bg-white pl-9 text-sm"
          />
        </div>
        <Button
          onClick={handleFork}
          disabled={isForkPending || forkStatus?.forkedByCurrentUser}
          variant="outline"
          className="h-9 rounded-lg px-4 text-sm font-semibold"
          title={
            forkStatus?.forkedByCurrentUser
              ? VIEWER_MESSAGES.FORK_ALREADY_FORKED
              : VIEWER_MESSAGES.FORK_BUTTON
          }
        >
          <GitFork className="mr-1.5 h-4 w-4" />
          {forkStatus?.forkedByCurrentUser
            ? VIEWER_MESSAGES.FORK_ALREADY_FORKED
            : VIEWER_MESSAGES.FORK_BUTTON}
        </Button>
        <Button
          onClick={onAiFeedback}
          className="h-9 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
        >
          <Sparkles className="mr-1.5 h-4 w-4" />
          {VIEWER_MESSAGES.AI_FEEDBACK_BUTTON}
        </Button>
      </div>
    </header>
  );
}
