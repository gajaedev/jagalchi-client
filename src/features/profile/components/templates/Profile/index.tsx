'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft, Pencil } from 'lucide-react';

import { ProfileBio } from '../../molecules/ProfileBio';
import { ProfileCustomBoxArea } from '../../molecules/ProfileCustomBoxArea';
import { ProfileHeader } from '../../molecules/ProfileHeader';
import { ProfileStreak } from '../../molecules/ProfileStreak';
import { MadeRoadmapList } from '../../organisms/MadeRoadmapList';
import { ProfileThirdBox } from '../../organisms/ProfileThirdBox';

// TODO: Replace with actual user data from API/state
const MOCK_USER_DATA = {
  userName: 'John Doe',
  email: 'john.doe@example.com',
  followerCount: 3000,
  followingCount: 100,
  bio: '안녕하세요! 새로운 기술을 배우고 공유하는 것을 좋아하는 개발자입니다. 현재 프론트엔드 개발에 집중하고 있으며, 보다 나은 사용자 경험을 제공하기 위해 노력하고 있습니다. React, Next.js, TypeScript를 주력으로 사용하며, 효율적인 컴포넌트 설계와 상태 관리에 관심이 많습니다. 오픈 소스 기여와 기술 블로그 운영을 통해 지식을 나누는 것을 즐깁니다. 함께 성장하는 개발 문화를 지향합니다. 안녕하세요! 새로운 기술을 배우고 공유하는 것을 좋아하는 개발자입니다. 현재 프론트엔드 개발에 집중하고 있으며, 보다 나은 사용자 경험을 제공하기 위해 노력하고 있습니다.',
};

export function Profile() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-white">
      <header className="flex h-11 w-full items-center justify-between border-b border-[#e2e8f0] bg-white px-5">
        <button className="flex items-center gap-1 text-sm" onClick={() => router.back()}>
          <ArrowLeft size={14} />
          <span>프로필</span>
        </button>
        <div className="flex items-center gap-1 text-sm">
          <span>User</span>
          <Pencil size={16} />
        </div>
      </header>
      <div className="flex w-full max-w-[960px] flex-col gap-10 px-6 py-10">
        <ProfileHeader
          userName={MOCK_USER_DATA.userName}
          email={MOCK_USER_DATA.email}
          followerCount={MOCK_USER_DATA.followerCount}
          followingCount={MOCK_USER_DATA.followingCount}
        />
        <div className="flex w-full gap-[76px]">
          <div className="w-[500px] shrink-0">
            <ProfileBio bio={MOCK_USER_DATA.bio} />
          </div>
          <div className="flex-1">
            <ProfileCustomBoxArea />
          </div>
        </div>
        <ProfileStreak />
        <ProfileThirdBox />
        <MadeRoadmapList />
      </div>
    </div>
  );
}
