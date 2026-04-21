'use client';

import type { NotificationResponse } from '@/api/notifications';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NOTIFICATION_MESSAGES } from '@/constants/messages';

import { useMarkAllRead } from '../../hooks/use-mark-all-read';
import { useMarkRead } from '../../hooks/use-mark-read';
import { useNotifications } from '../../hooks/use-notifications';

interface NotificationItemProps {
  notification: NotificationResponse;
  onMarkRead: (id: number) => void;
}

function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  return (
    <li
      className={`flex items-start gap-3 px-4 py-3 transition-colors ${
        notification.isRead ? 'bg-white' : 'bg-blue-50'
      }`}
    >
      {!notification.isRead && (
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
      )}
      {notification.isRead && <span className="mt-1.5 h-2 w-2 shrink-0" aria-hidden="true" />}
      <div className="flex flex-1 flex-col gap-0.5">
        <p className="text-sm text-slate-800">{notification.message}</p>
        <time className="text-xs text-slate-400">
          {new Date(notification.createdAt).toLocaleDateString('ko-KR')}
        </time>
      </div>
      {!notification.isRead && (
        <button
          type="button"
          onClick={() => onMarkRead(notification.id)}
          className="shrink-0 rounded p-1 text-xs text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label={NOTIFICATION_MESSAGES.MARK_READ_ARIA}
        >
          ✓
        </button>
      )}
    </li>
  );
}

export function NotificationList() {
  const { data, isLoading, isError } = useNotifications({ size: 20 });
  const { mutate: markRead } = useMarkRead();
  const { mutate: markAllRead, isPending: isMarkingAll } = useMarkAllRead();

  const notifications = data?.content ?? [];
  const hasUnread = notifications.some((n) => !n.isRead);

  return (
    <div className="flex w-80 flex-col">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <span className="text-sm font-semibold text-slate-900">{NOTIFICATION_MESSAGES.TITLE}</span>
        {hasUnread && (
          <button
            type="button"
            onClick={() => markAllRead()}
            disabled={isMarkingAll}
            className="text-xs text-blue-500 hover:text-blue-700 disabled:opacity-50"
          >
            {NOTIFICATION_MESSAGES.MARK_ALL_READ}
          </button>
        )}
      </div>

      <ScrollArea className="max-h-96">
        {isLoading && (
          <p className="px-4 py-6 text-center text-sm text-slate-400">
            {NOTIFICATION_MESSAGES.LOADING}
          </p>
        )}
        {isError && (
          <p className="px-4 py-6 text-center text-sm text-slate-400">
            {NOTIFICATION_MESSAGES.ERROR}
          </p>
        )}
        {!isLoading && !isError && notifications.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-slate-400">
            {NOTIFICATION_MESSAGES.EMPTY}
          </p>
        )}
        {!isLoading && !isError && notifications.length > 0 && (
          <ul>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkRead={markRead}
              />
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
}
