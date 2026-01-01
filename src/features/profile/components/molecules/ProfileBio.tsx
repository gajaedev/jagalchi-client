'use client';

import { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';

import { cn } from '@/lib/utils';

import { profileModeAtom } from '../../stores/profile-atoms';

interface ProfileBioProps {
  bio: string;
  onChange?: (bio: string) => void;
}

export function ProfileBio({ bio, onChange }: ProfileBioProps) {
  const mode = useAtomValue(profileModeAtom);
  const [isExpanded, setIsExpanded] = useState(false);

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
        <textarea
          className="h-[280px] w-full resize-none rounded-lg border border-slate-200 bg-white p-2 text-sm text-slate-500 outline-none focus:border-slate-500"
          value={userBio}
          onChange={handleChange}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold">자기소개</p>
      <div className="flex flex-col gap-2 rounded-lg border border-slate-200 p-2">
        <p className={cn('text-justify text-sm text-slate-500', !isExpanded && 'line-clamp-3')}>
          {userBio}
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex flex-row items-center gap-1 self-end text-sm text-slate-500 hover:text-slate-700"
        >
          <span>{isExpanded ? '접기' : '전체 보기'}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('transition-transform duration-200', isExpanded && 'rotate-180')}
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
