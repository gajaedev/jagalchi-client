'use client';

import Link from 'next/link';

import { NotificationBell } from '../NotificationBell';

interface AppHeaderProps {
  className?: string;
}

export function AppHeader({ className }: AppHeaderProps) {
  return (
    <header
      className={`flex h-11 w-full items-center justify-between border-b border-slate-200 bg-white px-5 ${className ?? ''}`}
    >
      <Link href="/" className="text-sm font-semibold text-slate-900">
        자갈치
      </Link>
      <div className="flex items-center gap-2">
        <NotificationBell />
      </div>
    </header>
  );
}
