'use client';

import { useAtom } from 'jotai';

import { profileImageAtom } from '../../stores/profile-atoms';
import { ProfilePicture } from '../atoms/ProfilePicture';

import { ProfileInfoForm } from './ProfileInfoForm';

export function ProfileHeader() {
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
    <div className="flex w-full flex-row items-center gap-8">
      <ProfilePicture src={imageSrc} userName="John Doe" onUpload={handleImageUpload} />

      <div className="w-full">
        <ProfileInfoForm name="John Doe" email="john.doe@example.com" />
      </div>
    </div>
  );
}
