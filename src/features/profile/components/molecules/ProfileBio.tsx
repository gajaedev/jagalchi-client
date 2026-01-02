'use client';

import { useEffect, useRef, useState } from 'react';

import { useAtomValue } from 'jotai';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { profileModeAtom } from '../../stores/profile-atoms';

interface ProfileBioProps {
  bio: string;
  onChange?: (bio: string) => void;
}

export function ProfileBio({ bio, onChange }: ProfileBioProps) {
  const mode = useAtomValue(profileModeAtom);
  const [userBio, setUserBio] = useState(bio);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const bioRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setUserBio(bio);
  }, [bio]);

  useEffect(() => {
    const checkOverflow = () => {
      if (bioRef.current) {
        setIsOverflowing(bioRef.current.scrollHeight > bioRef.current.clientHeight);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [userBio]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setUserBio(newValue);
    onChange?.(newValue);
  };

  if (mode === 'edit') {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold">자기소개</p>
        <Textarea
          className="h-[280px] w-full resize-none"
          value={userBio}
          onChange={handleChange}
        />
      </div>
    );
  }

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">자기소개</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p
          id="profile-bio-text"
          ref={bioRef}
          className={cn(
            'text-justify text-sm leading-relaxed whitespace-pre-wrap',
            userBio ? 'text-muted-foreground' : 'text-muted-foreground/50',
            !isExpanded && 'line-clamp-3',
          )}
        >
          {userBio || '자기소개가 없습니다.'}
        </p>

        {(isOverflowing || isExpanded) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground h-auto self-end p-0 hover:bg-transparent"
            aria-expanded={isExpanded}
            aria-controls="profile-bio-text"
            aria-label={isExpanded ? '자기소개 접기' : '자기소개 전체 보기'}
          >
            <span className="text-xs">{isExpanded ? '접기' : '전체 보기'}</span>
            {isExpanded ? (
              <ChevronUp className="ml-1 h-3 w-3" />
            ) : (
              <ChevronDown className="ml-1 h-3 w-3" />
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
