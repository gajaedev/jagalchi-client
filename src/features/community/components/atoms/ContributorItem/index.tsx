import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ContributorItemProps {
  name: string;
  avatarUrl?: string;
  followerText?: string;
}

export function ContributorItem({
  name,
  avatarUrl,
  followerText = '5.8k Followers',
}: ContributorItemProps) {
  return (
    <div className="flex w-[134px] items-center gap-2">
      <Avatar className="h-[32px] w-[32px]">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="bg-slate-100 text-[12px] font-bold text-slate-400">
          {name[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm leading-[21px] font-normal text-[#020617]">{name}</span>
        <span className="truncate text-xs leading-4 text-[#64748b]">{followerText}</span>
      </div>
    </div>
  );
}
