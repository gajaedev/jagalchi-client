'use client';

import CreatedRoadmapList from '../atoms/MadeRoadmapList';
import { ProfileBio } from '../atoms/ProfileBio';
import ProfileHeader from '../molecules/ProfileHeader';
import ProfileSecondBox from '../organisms/ProfileSecondBox';
import ProfileThirdBox from '../organisms/ProfileThirdBox';
export default function Profile() {
  return (
    <div className="flex w-[950px] flex-col gap-12">
      {ProfileHeader()}
      <ProfileBio bio="임베디드 소프트웨어과 카사노비 김태현 여자 500,000,000명을 따먹다. 그냥 다 먹어버리고싶노 ㅋㅋㅋㅋㅋㅋㅋ 비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어비누를먹어" />
      <ProfileSecondBox />
      <ProfileThirdBox />
      <CreatedRoadmapList />
    </div>
  );
}
