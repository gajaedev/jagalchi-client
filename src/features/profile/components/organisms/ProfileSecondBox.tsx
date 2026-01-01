import { ProfileBio } from '../molecules/ProfileBio';
import { ProfileCustomBoxArea } from '../molecules/ProfileCustomBoxArea';

interface ProfileSecondBoxProps {
  bio: string;
  onBioChange?: (bio: string) => void;
}

export function ProfileSecondBox({ bio, onBioChange }: ProfileSecondBoxProps) {
  return (
    <div className="flex w-full flex-row justify-between">
      <ProfileBio bio={bio} onChange={onBioChange} />
      <ProfileCustomBoxArea />
    </div>
  );
}
