'use client';

import { ProfileInfomation } from '../atoms/ProfileInfomation';
import { ProfilePicture } from '../atoms/ProfilePicture';

export default function ProfileHeader() {
  return (
    <div className="flex w-full flex-row items-center gap-8">
      <ProfilePicture src="/profile.svg" />

      <div className="w-full">
        <ProfileInfomation name="John Doe" email="john.doe@example.com" />
      </div>
    </div>
  );
}
