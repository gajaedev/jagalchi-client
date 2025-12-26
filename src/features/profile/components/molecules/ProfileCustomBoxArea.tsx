'use client';

import { ProfileCustomLink } from '../atoms/ProfileCustomLink';
import { ProfileCustomOrganization } from '../atoms/ProfileCustomOrganization';

export default function ProfileCustomBoxArea() {
  return (
    <div className="flex w-[384px] flex-col gap-4">
      <ProfileCustomOrganization initialValue="부산소프트웨어마이스터고등학교" />

      <ProfileCustomLink
        initialLinks={[
          {
            name: '포트폴리오',
            url: 'https://github.com/jagalchi',
          },
        ]}
      />
    </div>
  );
}
