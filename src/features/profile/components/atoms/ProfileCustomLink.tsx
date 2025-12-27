'use client';

import { useState } from 'react';

import { useAtomValue } from 'jotai';
import { Link } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { profileModeAtom } from '../../stores/profile-atoms';

import { ProfileLinkAddButton } from './ProfileLinkAddButton';
interface LinkItem {
  name: string;
  url: string;
}

interface ProfileCustomLinkProps {
  initialLinks?: LinkItem[];
}

export function ProfileCustomLink({ initialLinks = [] }: ProfileCustomLinkProps) {
  const mode = useAtomValue(profileModeAtom);

  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  if (mode === 'edit') {
    return (
      <div className="flex w-full flex-col gap-3">
        {links.map((link, index) => (
          <div key={index} className="flex w-full gap-4">
            <Input
              className="w-[120px]"
              placeholder="링크 이름"
              value={link.name}
              onChange={(e) => {
                const next = [...links];
                next[index].name = e.target.value;
                setLinks(next);
              }}
            />

            <div className="relative flex-1">
              <Link size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
              <Input
                className="pl-9"
                placeholder="https://"
                value={link.url}
                onChange={(e) => {
                  const next = [...links];
                  next[index].url = e.target.value;
                  setLinks(next);
                }}
              />
            </div>
          </div>
        ))}
        <ProfileLinkAddButton
          currentCount={links.length}
          maxCount={5}
          onClick={() => setLinks([...links, { name: '', url: '' }])}
        />
      </div>
    );
  }

  if (links.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-2">
      {links.map((link, index) => (
        <div
          key={index}
          className="flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2"
        >
          <Link size={16} className="text-slate-500" />

          {link.name && <p className="text-sm font-medium text-slate-900">{link.name}</p>}

          <p className="flex-1 truncate text-sm text-slate-500 underline">{link.url}</p>
        </div>
      ))}
    </div>
  );
}
