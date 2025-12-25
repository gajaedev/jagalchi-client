'use client';

import { ProfilePicture } from '@/features/auth/components/atoms/ProfilePicture';

export default function ProfilePage() {
  return <div>{ProfilePicture({ src: '/profile.svg', mode: 'edit' })}</div>;
}
