import { useRef, useState } from 'react';

import { useAtom } from 'jotai';
import {
  BookOpen,
  ChevronDown,
  Clock,
  Files,
  Folder,
  LogOut,
  MoreHorizontal,
  Pencil,
  Search,
  Star,
  Trash2,
  Users,
  type LucideIcon,
} from 'lucide-react';

import type { DirectoryTreeItem } from '@/api/roadmap';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { AUTH_MESSAGES, EDITOR_MESSAGES, MY_ROADMAPS_MESSAGES } from '@/constants/messages';
import { cn } from '@/lib/utils';

import { useDeleteDirectory } from '../../../hooks/use-delete-directory';
import { useDirectoryTree } from '../../../hooks/use-directory-tree';
import { useUpdateDirectory } from '../../../hooks/use-update-directory';
import { type SidebarCategory, sidebarCategoryAtom } from '../../../stores/my-roadmaps.atoms';

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  id: SidebarCategory;
}

const SIDEBAR_GROUPS: SidebarItem[][] = [
  [
    { icon: Clock, label: MY_ROADMAPS_MESSAGES.SIDEBAR_RECENT, id: 'recent' },
    { icon: BookOpen, label: MY_ROADMAPS_MESSAGES.SIDEBAR_COMMUNITY, id: 'community' },
  ],
  [
    { icon: Files, label: MY_ROADMAPS_MESSAGES.SIDEBAR_MY_ROADMAP, id: 'my-roadmap' },
    { icon: Users, label: MY_ROADMAPS_MESSAGES.SIDEBAR_SHARED, id: 'shared' },
  ],
  [{ icon: Star, label: MY_ROADMAPS_MESSAGES.SIDEBAR_FAVORITES, id: 'favorites' }],
];

function DirectoryNode({ node }: { node: DirectoryTreeItem }) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [renameValue, setRenameValue] = useState(node.name);
  const inputRef = useRef<HTMLInputElement>(null);

  /** path 기반 depth 계산 (e.g. "/a/b" → depth 1) */
  const depth = node.path ? node.path.split('/').filter(Boolean).length - 1 : 0;

  const { mutate: updateDirectory, isPending: isUpdating } = useUpdateDirectory();
  const { mutate: deleteDirectory } = useDeleteDirectory();

  const handleRenameStart = () => {
    setRenameValue(node.name);
    setIsRenaming(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleRenameSubmit = () => {
    const trimmed = renameValue.trim();
    if (trimmed && trimmed !== node.name) {
      updateDirectory({ id: node.id, name: trimmed });
    }
    setIsRenaming(false);
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleRenameSubmit();
    if (e.key === 'Escape') setIsRenaming(false);
  };

  const handleDeleteConfirm = () => {
    deleteDirectory(node.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div>
      <div
        className="group flex h-7 w-full items-center gap-1.5 rounded-md text-sm text-slate-700 transition-colors hover:bg-black/5"
        style={{ paddingLeft: `${12 + depth * 16}px`, paddingRight: '4px' }}
      >
        <button type="button" className="flex min-w-0 flex-1 items-center gap-1.5">
          <span className="w-3.5 shrink-0" />
          <Folder className="h-4 w-4 shrink-0 text-slate-500" />
          {isRenaming ? (
            <input
              ref={inputRef}
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={handleRenameKeyDown}
              disabled={isUpdating}
              className="min-w-0 flex-1 rounded border border-slate-300 bg-white px-1 text-sm text-slate-950 outline-none focus:border-slate-500"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="truncate">{node.name}</span>
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/10"
              aria-label={`${node.name} 더보기`}
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-3.5 w-3.5 text-slate-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem onClick={handleRenameStart}>
              <Pencil className="mr-2 h-3.5 w-3.5" />
              {MY_ROADMAPS_MESSAGES.DIR_RENAME}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              {MY_ROADMAPS_MESSAGES.DIR_DELETE}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{MY_ROADMAPS_MESSAGES.DIR_DELETE}</AlertDialogTitle>
            <AlertDialogDescription>
              {MY_ROADMAPS_MESSAGES.DIR_DELETE_CONFIRM}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{EDITOR_MESSAGES.AI_MODAL_CANCEL}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              {MY_ROADMAPS_MESSAGES.DIR_DELETE}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface MyRoadmapsSidebarProps {
  className?: string;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
}

export function MyRoadmapsSidebar({
  className,
  userName = 'UserName',
  userEmail = 'user@example.com',
  onLogout,
}: MyRoadmapsSidebarProps) {
  const [activeCategory, setActiveCategory] = useAtom(sidebarCategoryAtom);
  const { data: directoryTree } = useDirectoryTree();

  return (
    <div
      className={cn(
        'flex min-h-screen w-[240px] flex-col border-r border-slate-200 bg-slate-100 p-4',
        className,
      )}
    >
      {/* Profile Section */}
      <div className="mb-4 flex items-center gap-3 rounded-md px-3 py-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-avatar.png" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-normal text-slate-950">{userName}</span>
          <span className="truncate text-xs leading-4 text-slate-500">{userEmail}</span>
        </div>
        <ChevronDown className="h-5 w-5 text-slate-500" />
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search"
            className="h-9 border border-slate-200 bg-white pl-10 text-sm shadow-xs"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col">
        {SIDEBAR_GROUPS.map((group, groupIndex) => (
          <div key={groupIndex}>
            {groupIndex > 0 && <Separator className="my-2" />}
            {group.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveCategory(item.id)}
                className={cn(
                  'flex h-8 w-full items-center gap-2 rounded-md px-3 py-1 text-sm transition-colors',
                  activeCategory === item.id
                    ? 'bg-slate-200 text-slate-700'
                    : 'text-slate-700 hover:bg-black/5',
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Directory Tree */}
      {directoryTree && directoryTree.length > 0 && (
        <>
          <Separator className="my-2" />
          <div className="flex flex-col gap-0.5">
            {directoryTree.map((dir) => (
              <DirectoryNode key={dir.id} node={dir} />
            ))}
          </div>
        </>
      )}

      {/* Logout */}
      {onLogout && (
        <>
          <Separator className="my-2 mt-auto" />
          <button
            type="button"
            onClick={onLogout}
            className="flex h-8 w-full items-center gap-2 rounded-md px-3 py-1 text-sm text-slate-700 transition-colors hover:bg-black/5"
          >
            <LogOut className="h-5 w-5" />
            {AUTH_MESSAGES.LOGOUT}
          </button>
        </>
      )}
    </div>
  );
}
