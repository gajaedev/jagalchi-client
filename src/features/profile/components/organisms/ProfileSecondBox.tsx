import ProfileCustomBoxArea from '../molecules/ProfileCustomBoxArea';
import ProfileStric from '../molecules/ProfileStric';

export default function ProfileSecondBox() {
  return (
    <div className="flex flex-row justify-between">
      <ProfileCustomBoxArea />
      <ProfileStric />
    </div>
  );
}
