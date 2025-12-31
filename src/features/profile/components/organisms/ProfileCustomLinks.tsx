'use client';

import { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';
import { Link as LinkIcon, Trash2 } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { profileModeAtom } from '../../stores/profile-atoms';
import { ProfileLinkAddButton } from '../atoms/ProfileLinkAddButton';

export interface LinkItem {
  id: string;
  name: string;
  url: string;
}

interface ProfileCustomLinksProps {
  initialLinks?: LinkItem[];
  onChange?: (links: LinkItem[]) => void;
}

export function ProfileCustomLinks({ initialLinks = [], onChange }: ProfileCustomLinksProps) {
  const mode = useAtomValue(profileModeAtom);
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);

  useEffect(() => {
    setLinks(initialLinks);
  }, [initialLinks]);

  const handleUpdateLink = (index: number, key: keyof LinkItem, value: string) => {
    const next = [...links];
    next[index] = { ...next[index], [key]: value };
    setLinks(next);
    onChange?.(next);
  };

  const handleAddLink = () => {
    const next = [...links, { id: Math.random().toString(36).substr(2, 9), name: '', url: '' }];
    setLinks(next);
    onChange?.(next);
  };

  const handleDeleteLink = (index: number) => {
    const next = links.filter((_, i) => i !== index);
    setLinks(next);
    onChange?.(next);
  };

  if (mode === 'edit') {
    return (
      <div className="flex w-full flex-col gap-3">
        {links.map((link, index) => (
          <div key={link.id || index} className="flex w-full items-center gap-2">
            <div className="flex flex-1 gap-4">
              <Input
                className="w-[120px]"
                placeholder="링크 이름"
                value={link.name}
                onChange={(e) => handleUpdateLink(index, 'name', e.target.value)}
              />

              <div className="relative flex-1">
                <LinkIcon
                  size={16}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500"
                />
                <Input
                  className="pl-9"
                  placeholder="https://"
                  value={link.url}
                  onChange={(e) => handleUpdateLink(index, 'url', e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => handleDeleteLink(index)}
              className="p-1 text-slate-400 transition-colors hover:text-red-500"
              title="링크 삭제"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <ProfileLinkAddButton currentCount={links.length} maxCount={5} onClick={handleAddLink} />
      </div>
    );
  }

  if (links.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-2">
      {links.map((link, index) => (
        <a
          key={link.id || index}
          href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2 transition-colors hover:bg-slate-50"
        >
          <LinkIcon size={16} className="text-slate-500" />
          {link.name && <span className="text-sm font-medium text-slate-900">{link.name}</span>}
          <span className="flex-1 truncate text-sm text-slate-500 underline">{link.url}</span>
        </a>
      ))}
    </div>
  );
}
