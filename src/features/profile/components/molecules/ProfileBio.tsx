'use client';

import { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
        <Textarea className="h-[280px] resize-none" value={userBio} onChange={handleChange} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold">자기소개</p>
      <div className="border-border flex flex-col gap-2 rounded-lg border p-2">
        <p
          className={cn(
            'text-muted-foreground text-justify text-sm',
            !isExpanded && 'line-clamp-3',
          )}
        >
          {userBio}
        </p>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-muted-foreground hover:text-foreground h-auto self-end p-0 text-sm"
        >
          <span>{isExpanded ? '접기' : '전체 보기'}</span>
          <ChevronDown
            size={20}
            className={cn('transition-transform duration-200', isExpanded && 'rotate-180')}
          />
        </Button>
      </div>
    </div>
  );
}
