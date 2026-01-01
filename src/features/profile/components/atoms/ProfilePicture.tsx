'use client';

import { useRef } from 'react';

import { useAtomValue } from 'jotai';
import { Pencil } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { profileModeAtom } from '../../stores/profile-atoms';

interface ProfilePictureProps {
  src: string;
  userName?: string;
  onUpload?: (file: File) => void;
}

export function ProfilePicture({ src, userName, onUpload }: ProfilePictureProps) {
  const mode = useAtomValue(profileModeAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div>
      {mode === 'show' ? (
        <Avatar className="border-border h-[128px] w-[128px] border">
          <AvatarImage src={src} alt={userName ? `${userName}의 프로필 사진` : '프로필 사진'} />
          <AvatarFallback className="text-2xl">{getInitials(userName)}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="relative h-[128px] w-[128px]">
          <Avatar className="border-border h-[128px] w-[128px] border">
            <AvatarImage src={src} alt={userName ? `${userName}의 프로필 사진` : '프로필 사진'} />
            <AvatarFallback className="text-2xl">{getInitials(userName)}</AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            size="icon"
            className="border-border bg-background hover:bg-accent absolute right-0 bottom-0 h-8 w-8 rounded-full shadow-sm"
            onClick={handleButtonClick}
          >
            <Pencil size={16} />
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
}
