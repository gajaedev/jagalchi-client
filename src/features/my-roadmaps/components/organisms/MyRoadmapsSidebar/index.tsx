import { useAtom } from 'jotai';
import {
  ChevronDown,
  Clock,
  LayoutGrid,
  Search,
  Star,
  Users,
  Share2,
  LucideIcon,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { SidebarCategory, sidebarCategoryAtom } from '../../../stores/my-roadmaps.atoms';

interface MyRoadmapsSidebarProps {
  className?: string;
  userName?: string;
  userEmail?: string;
}

const SIDEBAR_ITEMS: { icon: LucideIcon; label: string; id: SidebarCategory }[] = [
  { icon: Clock, label: '최근', id: 'recent' },
  { icon: LayoutGrid, label: '커뮤니티', id: 'community' },
  { icon: Share2, label: '내 로드맵', id: 'my-roadmap' },
  { icon: Users, label: '공유된 로드맵', id: 'shared' },
  { icon: Star, label: '즐겨찾기', id: 'favorites' },
];

export function MyRoadmapsSidebar({
  className,
  userName = 'UserName',
  userEmail = 'user@example.com',
}: MyRoadmapsSidebarProps) {
  const [activeCategory, setActiveCategory] = useAtom(sidebarCategoryAtom);

  return (
    <div className={cn('bg-sidebar flex min-h-screen w-52 flex-col border-r', className)}>
      <div className="flex h-full flex-col">
        {/* Profile Section */}
        <div className="mb-2 flex items-center gap-2 p-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-xs font-semibold text-[#1F2937]">{userName}</span>
            <span className="text-muted-foreground truncate text-[10px] leading-none">
              {userEmail}
            </span>
          </div>
          <ChevronDown className="text-muted-foreground h-4 w-4" />
        </div>

        {/* Sidebar Search */}
        <div className="mb-4 px-3">
          <div className="relative">
            <Search className="text-muted-foreground/60 absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search"
              className="h-9 border-none bg-white pl-9 text-xs shadow-xs"
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-0.5 px-2">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveCategory(item.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors',
                activeCategory === item.id
                  ? 'bg-[#E5E7EB] text-[#1F2937]'
                  : 'text-[#4B5563] hover:bg-black/5',
              )}
            >
              <item.icon
                className={cn(
                  'h-4 w-4',
                  activeCategory === item.id ? 'text-[#1F2937]' : 'text-[#6B7280]',
                )}
              />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
