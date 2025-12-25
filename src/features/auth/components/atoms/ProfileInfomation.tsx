interface ProfileInfomationProps {
  name: string;
  email: string;
  mode: 'show' | 'edit';
}

import { Input } from '@/components/ui/input';
import { typography } from '@/constants/typography';

export function ProfileInfomation({ name, email, mode }: ProfileInfomationProps) {
  return (
    <div>
      {mode === 'show' ? (
        <div className="flex flex-row justify-between">
          <p style={typography.heading.h4}>{name}</p>
          <p style={typography.paragraph.medium}>{email}</p>
        </div>
      ) : (
        <div className="flex flex-col justify-between">
          <Input type="text" value={name} />
          <Input type="email" value={email} />
        </div>
      )}
    </div>
  );
}
