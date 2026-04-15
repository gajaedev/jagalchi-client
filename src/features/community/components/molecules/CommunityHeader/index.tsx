'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { COMMUNITY_MESSAGES } from '@/constants/messages';
import { cn } from '@/lib/utils';

export function CommunityHeader({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <header
      className={cn(
        'flex h-11 w-full items-center justify-between border-b border-slate-200 bg-white px-5',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="flex min-h-9 min-w-9 items-center justify-center rounded-lg p-2 hover:bg-gray-100"
        aria-label={COMMUNITY_MESSAGES.BACK_ARIA}
      >
        <ArrowLeft className="h-5 w-5 text-slate-950" />
      </button>

      <div className="flex items-center gap-2">
        <span className="text-sm font-normal text-slate-950">UserName</span>
        <Avatar className="h-8 w-8">
          <AvatarImage src="" alt="UserName" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
