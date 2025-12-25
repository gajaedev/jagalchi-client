'use client';

import { ProfileInfomation } from '@/features/auth/components/atoms/ProfileInfomation';
import { ProfilePicture } from '@/features/auth/components/atoms/ProfilePicture';

export default function ProfilePage() {
  return (
    <div>
      {ProfilePicture({ src: '/profile.svg', mode: 'show' })}
      {ProfileInfomation({ name: 'John Doe', email: 'john.doe@example.com', mode: 'show' })}
    </div>
  );
}
