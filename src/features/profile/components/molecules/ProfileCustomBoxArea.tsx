'use client';

import { ProfileCustomLinks } from '../organisms/ProfileCustomLinks';

import { ProfileCustomOrganization } from './ProfileCustomOrganization';

export function ProfileCustomBoxArea() {
  return (
    <div className="flex w-[400px] flex-col gap-2">
      <ProfileCustomOrganization initialValue="부산소프트웨어마이스터고등학교" />

      <ProfileCustomLinks
        initialLinks={[
          {
            id: '1',
            name: '포트폴리오',
            url: 'https://github.com/jagalchi',
          },
        ]}
      />
    </div>
  );
}
