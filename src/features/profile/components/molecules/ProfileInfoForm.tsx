'use client';

import { useEffect, useState } from 'react';

import { useAtom } from 'jotai';

import { Input } from '@/components/ui/input';

import { profileModeAtom } from '../../stores/profile-atoms';
import { ProfileEditButton } from '../atoms/ProfileEditButton';

interface ProfileInfoFormProps {
  name: string;
  email: string;
  onNameChange?: (name: string) => void;
  onEmailChange?: (email: string) => void;
}

export function ProfileInfoForm({
  name,
  email,
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
                3k <span className="text-sm font-medium text-slate-500">followers</span>
              </p>
              <p className="text-base font-medium">
                100 <span className="text-sm font-medium text-slate-500">following</span>
              </p>
            </div>
          </div>

          <div className="w-1xl">
            <ProfileEditButton variant="show" onClick={toggleMode} className="bg-indigo-950" />
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Input type="text" value={userName} onChange={handleNameChange} />
              <Input type="email" value={userEmail} onChange={handleEmailChange} />
            </div>

            <div className="flex flex-row gap-2">
              <p className="text-base font-medium">
                3k <span className="text-sm font-medium text-slate-500">followers</span>
              </p>
              <p className="text-base font-medium">
                100 <span className="text-sm font-medium text-slate-500">following</span>
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
