'use client';

import { useAtom } from 'jotai';

import { profileLinksAtom, profileOrgAtom } from '../../../stores/profile-atoms';
import { ProfileCustomLinks } from '../../organisms/ProfileCustomLinks';
import { ProfileCustomOrganization } from '../ProfileCustomOrganization';

export function ProfileCustomBoxArea() {
  const [org, setOrg] = useAtom(profileOrgAtom);
  const [links, setLinks] = useAtom(profileLinksAtom);

  return (
    <div className="flex w-full flex-col gap-2">
      <ProfileCustomOrganization initialValue={org} onChange={setOrg} />

      <ProfileCustomLinks initialLinks={links} onChange={setLinks} />
    </div>
  );
}
