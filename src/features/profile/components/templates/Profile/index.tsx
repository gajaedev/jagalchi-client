'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useAtomValue, useSetAtom } from 'jotai';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';

import { clearAccessToken } from '@/api/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AUTH_MESSAGES, PROFILE_MESSAGES } from '@/constants/messages';
import { useDeleteAccount } from '@/hooks/use-delete-account';

import { useProfile } from '../../../hooks/use-profile';
import { profileBioAtom, profileModeAtom } from '../../../stores/profile-atoms';
import { ProfileBio } from '../../molecules/ProfileBio';
import { ProfileCustomBoxArea } from '../../molecules/ProfileCustomBoxArea';
import { ProfileHeader } from '../../molecules/ProfileHeader';
import { ProfileStreak } from '../../molecules/ProfileStreak';
import { MadeRoadmapList } from '../../organisms/MadeRoadmapList';
import { ProfileThirdBox } from '../../organisms/ProfileThirdBox';

interface ProfileProps {
  userName?: string;
}

export function Profile({ userName = '' }: ProfileProps) {
  const router = useRouter();
  const mode = useAtomValue(profileModeAtom);
  const setBio = useSetAtom(profileBioAtom);
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteAccount = () => {
    deleteAccount(undefined, {
      onSuccess: () => {
        clearAccessToken();
        router.push('/login');
      },
    });
  };

  const { data, isLoading, isError } = useProfile(userName);

  // Warn user before leaving the page while in edit mode
  useEffect(() => {
    if (mode !== 'edit') return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [mode]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">{PROFILE_MESSAGES.LOADING}</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-destructive">{PROFILE_MESSAGES.ERROR}</p>
      </div>
    );
  }

  const { user, streak } = data;

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <header className="flex h-11 w-full items-center justify-between border-b border-slate-200 bg-white px-5">
        <button className="flex items-center gap-1 text-sm" onClick={() => router.back()}>
          <ArrowLeft size={14} />
          <span>{PROFILE_MESSAGES.BACK_BUTTON}</span>
        </button>
        <div className="flex items-center gap-1 text-sm">
          <span>{user.name}</span>
          <Pencil size={16} />
        </div>
      </header>
      <div className="flex w-full max-w-[960px] flex-col gap-10 px-6 py-10">
        <ProfileHeader
          userName={user.name}
          email={user.email}
          followerCount={user.stats.followersCount}
          followingCount={user.stats.followingCount}
        />
        <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-[76px]">
          <div className="w-full lg:w-[500px] lg:shrink-0">
            <ProfileBio bio={user.bio ?? ''} onChange={setBio} />
          </div>
          <div className="flex-1">
            <ProfileCustomBoxArea />
          </div>
        </div>
        <ProfileStreak activities={streak.activities} currentStreak={streak.currentStreak} />
        <ProfileThirdBox />
        <MadeRoadmapList />

        {/* 계정 삭제 섹션 */}
        <div className="border-t border-slate-200 pt-8">
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground gap-2"
              >
                <Trash2 className="h-4 w-4" />
                {AUTH_MESSAGES.DELETE_ACCOUNT}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{AUTH_MESSAGES.DELETE_ACCOUNT}</AlertDialogTitle>
                <AlertDialogDescription>
                  {AUTH_MESSAGES.DELETE_ACCOUNT_CONFIRM}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>{AUTH_MESSAGES.CANCEL}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? AUTH_MESSAGES.DELETING : AUTH_MESSAGES.DELETE_ACCOUNT}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
