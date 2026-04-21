'use client';

import type { FollowListResponse } from '@/api/profile';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PROFILE_MESSAGES } from '@/constants/messages';

import { useFollowers } from '../../../hooks/use-followers';
import { useFollowings } from '../../../hooks/use-followings';

type FollowDialogType = 'followers' | 'followings';

interface FollowListDialogProps {
  /** 조회 대상 유저 이름 */
  userName: string;
  /** 열려 있는 다이얼로그 종류: 'followers' | 'followings' | null */
  open: FollowDialogType | null;
  onOpenChange: (open: boolean) => void;
}

interface FollowUserItemProps {
  profileImage: string | null;
  name: string;
}

function FollowUserItem({ profileImage, name }: FollowUserItemProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-100">
        {profileImage ? (
          <img
            src={profileImage}
            alt={`${name}${PROFILE_MESSAGES.PROFILE_PICTURE_ALT_WITH_NAME}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-500">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}

function FollowListContent({ type, userName }: { type: FollowDialogType; userName: string }) {
  const followersQuery = useFollowers(userName);
  const followingsQuery = useFollowings(userName);

  const query = type === 'followers' ? followersQuery : followingsQuery;
  const { data, isLoading, isError } = query as {
    data: FollowListResponse | undefined;
    isLoading: boolean;
    isError: boolean;
  };

  if (isLoading) {
    return (
      <p className="text-muted-foreground py-6 text-center text-sm">
        {PROFILE_MESSAGES.FOLLOW_LIST_LOADING}
      </p>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-destructive py-6 text-center text-sm">
        {PROFILE_MESSAGES.FOLLOW_LIST_ERROR}
      </p>
    );
  }

  if (data.users.length === 0) {
    return (
      <p className="text-muted-foreground py-6 text-center text-sm">
        {PROFILE_MESSAGES.FOLLOW_LIST_EMPTY}
      </p>
    );
  }

  return (
    <ScrollArea className="max-h-96">
      <div className="divide-y divide-slate-100 px-1">
        {data.users.map((user) => (
          <FollowUserItem key={user.id} profileImage={user.profileImage} name={user.name} />
        ))}
      </div>
    </ScrollArea>
  );
}

export function FollowListDialog({ userName, open, onOpenChange }: FollowListDialogProps) {
  const title =
    open === 'followers' ? PROFILE_MESSAGES.FOLLOWERS_TITLE : PROFILE_MESSAGES.FOLLOWINGS_TITLE;

  return (
    <Dialog open={open !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {open !== null && <FollowListContent type={open} userName={userName} />}
      </DialogContent>
    </Dialog>
  );
}
