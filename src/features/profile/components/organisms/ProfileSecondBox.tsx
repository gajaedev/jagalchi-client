import { ProfileCustomBoxArea } from '../molecules/ProfileCustomBoxArea';
import { ProfileStreak } from '../molecules/ProfileStreak';

export function ProfileSecondBox() {
  return (
    <div className="flex flex-row gap-6">
      <ProfileCustomBoxArea />
      <ProfileStreak />
    </div>
  );
}
