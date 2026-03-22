'use client';

import { useAtom } from 'jotai';

import { profileImageAtom } from '../../../stores/profile-atoms';
import { ProfilePicture } from '../../atoms/ProfilePicture';
import { ProfileInfoForm } from '../ProfileInfoForm';

interface ProfileHeaderProps {
  userName: string;
  email: string;
  followerCount?: number;
  followingCount?: number;
}

export function ProfileHeader({
  userName,
  email,
  followerCount = 0,
  followingCount = 0,
}: ProfileHeaderProps) {
  const [imageSrc, setImageSrc] = useAtom(profileImageAtom);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setImageSrc(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:gap-6">
      <ProfilePicture src={imageSrc} userName={userName} onUpload={handleImageUpload} />

      <div className="w-full">
        <ProfileInfoForm
          name={userName}
          email={email}
          followerCount={followerCount}
          followingCount={followingCount}
        />
      </div>
    </div>
  );
}
