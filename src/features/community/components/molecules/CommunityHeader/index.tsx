'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export function CommunityHeader({ className }: { className?: string }) {
  const router = useRouter();

  return (
    <header
      className={cn(
        'flex h-11 w-full items-center justify-between border-b border-[#e2e8f0] bg-white px-5',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="flex min-h-9 min-w-9 items-center justify-center rounded-lg p-2 hover:bg-gray-100"
        aria-label="뒤로가기"
      >
        <ArrowLeft className="h-5 w-5 text-[#020617]" />
      </button>

      <div className="flex items-center gap-2">
        <span className="text-sm font-normal text-[#020617]">UserName</span>
        <Avatar className="h-8 w-8">
          <AvatarImage src="" alt="UserName" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
