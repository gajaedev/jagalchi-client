'use client';

import { ProfileBio } from '../molecules/ProfileBio';
import { ProfileHeader } from '../molecules/ProfileHeader';
import { MadeRoadmapList } from '../organisms/MadeRoadmapList';
import { ProfileSecondBox } from '../organisms/ProfileSecondBox';
import { ProfileThirdBox } from '../organisms/ProfileThirdBox';

// TODO: Replace with actual user data from API/state
const MOCK_USER_DATA = {
  userName: 'John Doe',
  email: 'john.doe@example.com',
  followerCount: 3000,
  followingCount: 100,
  bio: '안녕하세요! 새로운 기술을 배우고 공유하는 것을 좋아하는 개발자입니다. 현재 프론트엔드 개발에 집중하고 있으며, 보다 나은 사용자 경험을 제공하기 위해 노력하고 있습니다.',
};

export function Profile() {
  return (
    <div className="flex w-[950px] flex-col gap-12">
      <ProfileHeader
        userName={MOCK_USER_DATA.userName}
        email={MOCK_USER_DATA.email}
        followerCount={MOCK_USER_DATA.followerCount}
        followingCount={MOCK_USER_DATA.followingCount}
      />
      <ProfileBio bio={MOCK_USER_DATA.bio} />
      <ProfileSecondBox />
      <ProfileThirdBox />
      <MadeRoadmapList />
    </div>
  );
}
