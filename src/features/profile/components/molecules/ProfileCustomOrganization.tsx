'use client';

import { useEffect, useState } from 'react';

import { useAtomValue } from 'jotai';
import { Building2 } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { profileModeAtom } from '../../stores/profile-atoms';

interface ProfileCustomOrganizationProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

export function ProfileCustomOrganization({
  initialValue = '',
  onChange,
}: ProfileCustomOrganizationProps) {
  const mode = useAtomValue(profileModeAtom);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  if (mode === 'edit') {
    return (
      <div className="flex w-full flex-col gap-2">
        <div className="relative">
          <Building2
            size={16}
            className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
          />
          <Input
            className="pl-9"
            placeholder="소속을 입력해주세요"
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>
    );
  }

  if (!value) return null;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="border-border flex items-center gap-2 rounded-md border px-4 py-2">
        <Building2 size={16} className="text-muted-foreground" />
        <p className="text-foreground text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
