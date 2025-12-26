interface ProfileInfomationProps {
  name: string;
  email: string;
  mode: 'show' | 'edit';
}

import { Input } from '@/components/ui/input';
import { colors } from '@/constants/colors';
import { typography } from '@/constants/typography';

import { ProfileEditButton } from './ProfileEditButton';

export function ProfileInfomation({ name, email, mode }: ProfileInfomationProps) {
  return (
    <div>
      {mode === 'show' ? (
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex flex-col justify-between">
            <div className="flex flex-row gap-2">
              <p style={typography.heading.h4}>{name}</p>
              <p style={{ ...typography.paragraph.medium, color: colors.slate[500] }}>{email}</p>
            </div>

            <div className="flex flex-row gap-2">
              <p style={typography.paragraph.medium}>
                3k{' '}
                <span style={{ ...typography.paragraph.smallMedium, color: colors.slate[500] }}>
                  followers
                </span>
              </p>
              <p style={typography.paragraph.medium}>
                100{' '}
                <span style={{ ...typography.paragraph.smallMedium, color: colors.slate[500] }}>
                  following
                </span>
              </p>
            </div>
          </div>

          <div className="w-1xl">
            <ProfileEditButton
              variant="show"
              onClick={() => {}}
              className={`bg-${colors.indigo[950]}`}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Input type="text" value={name} />
          <Input type="email" value={email} />
        </div>
      )}
    </div>
  );
}
