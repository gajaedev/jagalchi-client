import { ProfileCustomBoxArea } from '../molecules/ProfileCustomBoxArea';
import { ProfileStreak } from '../molecules/ProfileStreak';

export function ProfileSecondBox() {
  return (
    <div className="flex flex-row justify-between">
      <ProfileCustomBoxArea />
      <ProfileStreak />
    </div>
  );
}
