'use client';

import { useRef } from 'react';

import Image from 'next/image';

import { useAtomValue } from 'jotai';
import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { profileModeAtom } from '../../stores/profile-atoms';

interface ProfilePictureProps {
  src: string;
  userName?: string;
  onUpload?: (file: File) => void;
}

const ImageContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="relative h-[128px] w-[128px] overflow-hidden rounded-[64px] border border-[#e2e8f0]">
    {children}
  </div>
);

const StyledImage = ({ src, userName }: { src: string; userName?: string }) => (
  <Image
    src={src}
    alt={userName ? `${userName}의 프로필 사진` : '사용자의 프로필 사진'}
    className="h-full w-full object-cover"
    width={128}
    height={128}
  />
);

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

  return (
    <div>
      {mode === 'show' ? (
        <ImageContainer>
          <StyledImage src={src} userName={userName} />
        </ImageContainer>
      ) : (
        <div className="relative h-[128px] w-[128px]">
          <ImageContainer>
            <StyledImage src={src} userName={userName} />
          </ImageContainer>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 bottom-0 h-8 w-8 rounded-full border-gray-200 bg-white shadow-sm hover:bg-gray-50"
            onClick={handleButtonClick}
          >
            <Pencil size={16} />
          </Button>
          <input
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
