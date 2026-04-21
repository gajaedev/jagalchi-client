'use client';

import { useAtomValue } from 'jotai';

import { currentUserNameAtom } from '@/features/auth/stores/auth.atoms';
import { Profile } from '@/features/profile/components/templates/Profile';

export default function ProfilePage() {
  const currentUserName = useAtomValue(currentUserNameAtom);

  return <Profile userName={currentUserName ?? ''} />;
}
