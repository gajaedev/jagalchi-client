import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ContributorItemProps {
  name: string;
  avatarUrl?: string;
}

export function ContributorItem({ name, avatarUrl }: ContributorItemProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-[32px] w-[32px]">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="bg-slate-100 text-[12px] font-bold text-slate-400">
          {name[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-[12px] leading-tight font-bold text-[#020617]">{name}</span>
        <span className="text-[10px] leading-none text-slate-400">Contributor</span>
      </div>
    </div>
  );
}
