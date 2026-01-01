'use client';

import { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';

import { Textarea } from '@/components/ui/textarea';

import { profileModeAtom } from '../../stores/profile-atoms';

interface ProfileBioProps {
  bio: string;
  onChange?: (bio: string) => void;
}

export function ProfileBio({ bio, onChange }: ProfileBioProps) {
  const mode = useAtomValue(profileModeAtom);
  const [userBio, setUserBio] = useState(bio);

  useEffect(() => {
    setUserBio(bio);
  }, [bio]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setUserBio(newValue);
    onChange?.(newValue);
  };

  if (mode === 'edit') {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold">자기소개</p>
        <Textarea className="h-[280px] resize-none" value={userBio} onChange={handleChange} />
      </div>
    );
  }

  return (
    <div className="border-border flex h-[280px] w-[500px] flex-col gap-4 overflow-hidden rounded-lg border p-4">
      <p className="text-sm font-semibold">자기소개</p>
      <p className="text-muted-foreground line-clamp-6 w-full text-justify text-sm">{userBio}</p>
    </div>
  );
}
