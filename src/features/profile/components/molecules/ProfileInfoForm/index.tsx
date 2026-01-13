'use client';

import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import { Input } from '@/components/ui/input';

import { profileModeAtom } from '../../../stores/profile-atoms';
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

  const toggleMode = () => {
    setMode((prev) => (prev === 'show' ? 'edit' : 'show'));
  };

  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);

  useEffect(() => {
    setUserName(name);
  }, [name]);

  useEffect(() => {
    setUserEmail(email);
  }, [email]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setUserName(newValue);
    onNameChange?.(newValue);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setUserEmail(newValue);
    onEmailChange?.(newValue);
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
            <ProfileEditButton variant="show" onClick={toggleMode} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input type="text" value={userName} onChange={handleNameChange} aria-label="이름" />
              <Input
                type="email"
                value={userEmail}
                onChange={handleEmailChange}
                aria-label="이메일"
              />
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
            <ProfileEditButton variant="edit" onClick={toggleMode} />
          </div>
        </div>
      )}
    </div>
  );
}
