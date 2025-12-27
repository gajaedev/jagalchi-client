import Image from 'next/image';

import { useAtomValue } from 'jotai';

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
          <button
            className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
            onClick={() => document.getElementById('profile-upload')?.click()}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
          </button>
          <input id="profile-upload" type="file" className="hidden" accept="image/*" />
        </div>
      )}
    </div>
  );
}
