'use client';

import { Bell } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NOTIFICATION_MESSAGES } from '@/constants/messages';

import { useNotifications } from '../../hooks/use-notifications';
import { NotificationList } from '../NotificationList';

export function NotificationBell() {
  const { data } = useNotifications({ size: 20 });

  const fetchedReadCount = (data?.content ?? []).filter((n) => n.isRead).length;
  const unreadCount = data !== undefined ? data.totalElements - fetchedReadCount : 0;
  const displayCount = unreadCount > 99 ? '99+' : unreadCount;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100"
          aria-label={NOTIFICATION_MESSAGES.BELL_ARIA}
        >
          <Bell className="h-5 w-5 text-slate-600" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none"
              aria-label={`${NOTIFICATION_MESSAGES.UNREAD_COUNT_ARIA} ${displayCount}`}
            >
              {displayCount}
            </Badge>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-0">
        <NotificationList />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
