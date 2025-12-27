import Image from 'next/image';

import { useAtomValue } from 'jotai';
import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { profileModeAtom } from '../../stores/profile-atoms';

interface ProfilePictureProps {
  src: string;
}

const ImageContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="relative h-[128px] w-[128px] overflow-hidden rounded-[64px] border border-[#e2e8f0]">
    {children}
  </div>
);

const StyledImage = ({ src }: { src: string }) => (
  <Image
    src={src}
    alt="profile picture"
    className="h-full w-full object-cover"
    width={100}
    height={100}
  />
);

export function ProfilePicture({ src }: ProfilePictureProps) {
  const mode = useAtomValue(profileModeAtom);
  return (
    <div>
      {mode === 'show' ? (
        <ImageContainer>
          <StyledImage src={src} />
        </ImageContainer>
      ) : (
        <div className="relative h-[128px] w-[128px]">
          <ImageContainer>
            <StyledImage src={src} />
          </ImageContainer>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 bottom-0 h-8 w-8 rounded-full border-gray-200 bg-white shadow-sm hover:bg-gray-50"
            onClick={() => document.getElementById('profile-upload')?.click()}
          >
            <Pencil size={16} />
          </Button>
          <input id="profile-upload" type="file" className="hidden" accept="image/*" />
        </div>
      )}
    </div>
  );
}
