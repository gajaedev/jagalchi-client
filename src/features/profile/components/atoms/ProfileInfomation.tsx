import { useState } from 'react';

import { useAtom } from 'jotai';

import { Input } from '@/components/ui/input';

import { profileModeAtom } from '../../stores/profile-atoms';

import { ProfileEditButton } from './ProfileEditButton';

interface ProfileInfomationProps {
  name: string;
  email: string;
}

export function ProfileInfomation({ name, email }: ProfileInfomationProps) {
  const [mode, setMode] = useAtom(profileModeAtom);

  const toggleMode = () => {
    setMode((prev) => (prev === 'show' ? 'edit' : 'show'));
  };

  const [names, setName] = useState(name);
  const [emails, setEmail] = useState(email);

  return (
    <div>
      {mode === 'show' ? (
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col justify-between">
            <div className="flex flex-row gap-2">
              <p className="text-xl font-semibold">{names}</p>
              <p className="text-base font-medium text-slate-500">{emails}</p>
            </div>

            <div className="flex flex-row gap-2">
              <p className="text-base font-medium">
                3k <span className="text-sm font-medium text-slate-500">followers</span>
              </p>
              <p className="text-base font-medium">
                100 <span className="text-sm font-medium text-slate-500">following</span>
              </p>
            </div>
          </div>

          <div className="w-1xl">
            <ProfileEditButton variant="show" onClick={toggleMode} className="bg-indigo-950" />
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Input type="text" value={names} onChange={(e) => setName(e.target.value)} />
              <Input type="email" value={emails} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="flex flex-row gap-2">
              <p className="text-base font-medium">
                3k <span className="text-sm font-medium text-slate-500">followers</span>
              </p>
              <p className="text-base font-medium">
                100 <span className="text-sm font-medium text-slate-500">following</span>
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <ProfileEditButton variant="edit" onClick={toggleMode} className="bg-indigo-950" />
          </div>
        </div>
      )}
    </div>
  );
}
