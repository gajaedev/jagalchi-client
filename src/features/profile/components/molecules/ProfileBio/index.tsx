'use client';

import { useEffect, useRef, useState } from 'react';

import { useAtomValue } from 'jotai';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { PROFILE_MESSAGES } from '@/constants/messages';
import { cn } from '@/lib/utils';

import { profileModeAtom } from '../../../stores/profile-atoms';

interface ProfileBioProps {
  bio: string;
  onChange?: (bio: string) => void;
}

export function ProfileBio({ bio, onChange }: ProfileBioProps) {
  const mode = useAtomValue(profileModeAtom);

  const { register, reset } = useForm({
    defaultValues: { bio },
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const bioRef = useRef<HTMLParagraphElement>(null);

  // Sync form when prop value changes (e.g., on cancel/restore)
  useEffect(() => {
    reset({ bio });
  }, [bio, reset]);

  useEffect(() => {
    const checkOverflow = () => {
      if (bioRef.current) {
        setIsOverflowing(bioRef.current.scrollHeight > bioRef.current.clientHeight);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [bio]);

  if (mode === 'edit') {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm font-semibold">{PROFILE_MESSAGES.BIO_TITLE}</p>
        <Textarea
          className="h-[280px] w-full resize-none"
          {...register('bio', {
            onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange?.(e.target.value),
          })}
        />
      </div>
    );
  }

  return (
    <Card className="gap-0 shadow-none">
      <CardHeader className="px-6 pb-4">
        <CardTitle className="text-muted-foreground text-sm font-semibold">
          {PROFILE_MESSAGES.BIO_TITLE}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p
          id="profile-bio-text"
          ref={bioRef}
          className={cn(
            'text-justify text-sm leading-relaxed whitespace-pre-wrap',
            bio ? 'text-muted-foreground' : 'text-muted-foreground/50',
            !isExpanded && 'line-clamp-3',
          )}
        >
          {bio || `${PROFILE_MESSAGES.BIO_TITLE}가 없습니다.`}
        </p>

        {(isOverflowing || isExpanded) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground h-auto self-end p-0 hover:bg-transparent"
            aria-expanded={isExpanded}
            aria-controls="profile-bio-text"
            aria-label={
              isExpanded
                ? `${PROFILE_MESSAGES.BIO_TITLE} 접기`
                : `${PROFILE_MESSAGES.BIO_TITLE} 전체 보기`
            }
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
