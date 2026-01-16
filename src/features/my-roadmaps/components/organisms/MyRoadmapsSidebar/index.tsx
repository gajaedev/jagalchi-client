import { BookOpen, Clock, Files, Star, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface MyRoadmapsSidebarProps {
  className?: string;
}

const SIDEBAR_ITEMS = [
  { icon: Clock, label: 'Recents' },
  { icon: Star, label: 'Favorites' },
  { icon: Files, label: 'My Roadmaps', active: true },
  { icon: BookOpen, label: 'Shared with me' },
  { icon: User, label: 'Created by me' },
];

export function MyRoadmapsSidebar({ className }: MyRoadmapsSidebarProps) {
  return (
    <div className={cn('bg-background flex w-[240px] flex-col border-r', className)}>
      <div className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-avatar.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">User Name</span>
            <span className="text-muted-foreground text-xs">user@example.com</span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.label}
              className={cn(
                'hover:bg-muted flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                item.active ? 'bg-muted text-foreground' : 'text-muted-foreground',
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
