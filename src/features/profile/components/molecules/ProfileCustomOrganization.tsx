'use client';

import { useState } from 'react';

import { useAtomValue } from 'jotai';
import { Building2 } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { profileModeAtom } from '../../stores/profile-atoms';

interface ProfileCustomOrganizationProps {
  initialValue?: string;
}

export function ProfileCustomOrganization({ initialValue = '' }: ProfileCustomOrganizationProps) {
  const mode = useAtomValue(profileModeAtom);
  const [value, setValue] = useState(initialValue);

  if (mode === 'edit') {
    return (
      <div className="flex w-full flex-col gap-2">
        <div className="relative">
          <Building2
            size={16}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500"
          />
          <Input
            className="pl-9"
            placeholder="소속을 입력해주세요"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    );
  }

  if (!value) return null;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2 rounded-md border border-slate-200 px-4 py-2">
        <Building2 size={16} className="text-slate-500" />
        <p className="text-sm font-medium text-slate-900">{value}</p>
      </div>
    </div>
  );
}
