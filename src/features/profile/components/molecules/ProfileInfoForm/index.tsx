'use client';

import { useEffect } from 'react';

import { useAtom, useSetAtom } from 'jotai';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  profileBioAtom,
  profileBioSnapshotAtom,
  profileLinksAtom,
  profileLinksSnapshotAtom,
  profileModeAtom,
  profileOrgAtom,
  profileOrgSnapshotAtom,
} from '../../../stores/profile-atoms';
import { ProfileEditButton } from '../../atoms/ProfileEditButton';

interface ProfileInfoFormProps {
  name: string;
  email: string;
  followerCount?: number;
  followingCount?: number;
  onNameChange?: (name: string) => void;
  onEmailChange?: (email: string) => void;
}

function formatCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1).replace(/\.0$/, '')}k`;
  }
  return count.toString();
}

export function ProfileInfoForm({
  name,
  email,
  followerCount = 0,
  followingCount = 0,
  onNameChange,
  onEmailChange,
}: ProfileInfoFormProps) {
  const [mode, setMode] = useAtom(profileModeAtom);

  // Atoms for bio / org / links (read current, set snapshot, restore from snapshot)
  const [bio, setBio] = useAtom(profileBioAtom);
  const setBioSnapshot = useSetAtom(profileBioSnapshotAtom);

  const [org, setOrg] = useAtom(profileOrgAtom);
  const setOrgSnapshot = useSetAtom(profileOrgSnapshotAtom);

  const [links, setLinks] = useAtom(profileLinksAtom);
  const setLinksSnapshot = useSetAtom(profileLinksSnapshotAtom);

  const [bioSnapshot] = useAtom(profileBioSnapshotAtom);
  const [orgSnapshot] = useAtom(profileOrgSnapshotAtom);
  const [linksSnapshot] = useAtom(profileLinksSnapshotAtom);

  const {
    register,
    reset,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      email,
    },
  });

  const userName = watch('name');
  const userEmail = watch('email');

  // Update form when props change
  useEffect(() => {
    reset({ name, email });
  }, [name, email, reset]);

  // Notify parent of changes
  useEffect(() => {
    onNameChange?.(userName);
  }, [userName, onNameChange]);

  useEffect(() => {
    onEmailChange?.(userEmail);
  }, [userEmail, onEmailChange]);

  /** Enter edit mode: capture snapshot of bio / org / links */
  const handleEnterEdit = () => {
    setBioSnapshot(bio);
    setOrgSnapshot(org);
    setLinksSnapshot(links);
    setMode('edit');
  };

  /** Cancel edit: restore snapshot values and return to show mode */
  const handleCancel = () => {
    reset({ name, email });
    setBio(bioSnapshot);
    setOrg(orgSnapshot);
    setLinks(linksSnapshot);
    setMode('show');
  };

  /** Save edit: validate then persist current values */
  const handleSave = async () => {
    const isValid = await trigger();
    if (!isValid) return;
    if (!userName.trim() || !userEmail.trim()) return;
    setMode('show');
  };

  return (
    <div>
      {mode === 'show' ? (
        <div className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
              <p className="text-xl font-semibold">{userName}</p>
              <p className="text-muted-foreground text-sm font-medium sm:text-base">{userEmail}</p>
            </div>

            <div className="flex flex-row gap-2">
              <p className="text-base font-medium">
                {formatCount(followerCount)}{' '}
                <span className="text-muted-foreground text-sm font-medium">followers</span>
              </p>
              <p className="text-base font-medium">
                {formatCount(followingCount)}{' '}
                <span className="text-muted-foreground text-sm font-medium">following</span>
              </p>
            </div>
          </div>

          <div>
            <ProfileEditButton variant="show" onClick={handleEnterEdit} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex flex-col gap-1">
                <Input
                  type="text"
                  {...register('name', { required: true, validate: (v) => v.trim().length > 0 })}
                  aria-label="이름"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-destructive text-xs">이름을 입력해주세요.</p>}
              </div>
              <div className="flex flex-col gap-1">
                <Input
                  type="email"
                  {...register('email', {
                    required: true,
                    validate: (v) => v.trim().length > 0,
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '' },
                  })}
                  aria-label="이메일"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-destructive text-xs">올바른 이메일을 입력해주세요.</p>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-2 sm:gap-4">
              <p className="text-sm font-medium sm:text-base">
                {formatCount(followerCount)}{' '}
                <span className="text-muted-foreground text-sm font-medium">followers</span>
              </p>
              <p className="text-sm font-medium sm:text-base">
                {formatCount(followingCount)}{' '}
                <span className="text-muted-foreground text-sm font-medium">following</span>
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              className="font-semibold"
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button type="button" className="font-semibold" onClick={handleSave}>
              저장
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
