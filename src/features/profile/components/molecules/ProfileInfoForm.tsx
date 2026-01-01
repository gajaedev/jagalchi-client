'use client';

import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import { Input } from '@/components/ui/input';

import { profileModeAtom } from '../../stores/profile-atoms';
import { ProfileEditButton } from '../atoms/ProfileEditButton';

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
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col justify-between">
            <div className="flex flex-row gap-2">
              <p className="text-xl font-semibold">{userName}</p>
              <p className="text-base font-medium text-slate-500">{userEmail}</p>
            </div>

            <div className="flex flex-row gap-2">
              <p className="text-base font-medium">
                {formatCount(followerCount)}{' '}
                <span className="text-sm font-medium text-slate-500">followers</span>
              </p>
              <p className="text-base font-medium">
                {formatCount(followingCount)}{' '}
                <span className="text-sm font-medium text-slate-500">following</span>
              </p>
            </div>
          </div>

          <div>
            <ProfileEditButton variant="show" onClick={toggleMode} className="bg-indigo-950" />
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Input type="text" value={userName} onChange={handleNameChange} aria-label="이름" />
              <Input
                type="email"
                value={userEmail}
                onChange={handleEmailChange}
                aria-label="이메일"
              />
            </div>

            <div className="flex flex-row gap-2">
              <p className="text-base font-medium">
                {formatCount(followerCount)}{' '}
                <span className="text-sm font-medium text-slate-500">followers</span>
              </p>
              <p className="text-base font-medium">
                {formatCount(followingCount)}{' '}
                <span className="text-sm font-medium text-slate-500">following</span>
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <ProfileEditButton variant="edit" onClick={toggleMode} className="bg-indigo-950" />
          </div>
        </div>
      )}
    </div>
  );
}
