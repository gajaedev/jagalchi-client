'use client';

import { useState } from 'react';

import { useAtomValue } from 'jotai';

import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

import { profileModeAtom } from '../../stores/profile-atoms';

interface ProfileBioProps {
  bio: string;
}

export function ProfileBio({ bio }: ProfileBioProps) {
  const mode = useAtomValue(profileModeAtom);
  const [isExpanded, setIsExpanded] = useState(false);

  const [bios, setbio] = useState(bio);

  if (mode === 'edit') {
    return (
      <div className="flex flex-col gap-4">
        <p style={{ ...typography.paragraph.small, fontWeight: 600 }}>자기소개</p>
        <textarea
          className="h-[280px] w-full resize-none rounded-lg border bg-white p-2 outline-none focus:border-slate-500"
          style={{
            ...typography.paragraph.small,
            color: colors.slate[500],
            borderColor: colors.slate[200],
          }}
          value={bios}
          onChange={(e) => setbio(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p style={{ ...typography.paragraph.small, fontWeight: 600 }}>자기소개</p>
      <div className="flex flex-col gap-2 rounded-lg border p-2">
        <p
          className={`${!isExpanded ? 'line-clamp-3' : ''} text-justify`}
          style={{
            ...typography.paragraph.small,
            color: colors.slate[500],
          }}
        >
          {bios}
        </p>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex flex-row items-center gap-1 self-end text-slate-500 hover:text-slate-700"
          style={typography.paragraph.small}
        >
          <span>{isExpanded ? '접기' : '전체 보기'}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
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
