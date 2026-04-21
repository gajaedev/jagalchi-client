import { useAtom } from 'jotai';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PROFILE_MESSAGES } from '@/constants/messages';

import { useProfileRoadmaps } from '../../../hooks/use-profile-roadmaps';
import { profileModeAtom } from '../../../stores/profile-atoms';
import { RoadmapCard } from '../../atoms/RoadmapCard';
import { AddRoadmapModal } from '../AddRoadmapModal';

interface MadeRoadmapListProps {
  userName: string;
}

export function MadeRoadmapList({ userName }: MadeRoadmapListProps) {
  const [mode] = useAtom(profileModeAtom);
  const { data: roadmaps = [], isLoading } = useProfileRoadmaps({ userName });

  return (
    <Card className="mb-10 w-full gap-0 rounded-xl shadow-none">
      <CardHeader className="px-6 pb-4">
        <CardTitle className="text-muted-foreground text-sm font-semibold">
          {PROFILE_MESSAGES.MADE_ROADMAP}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {isLoading ? (
          <p className="text-muted-foreground text-sm">{PROFILE_MESSAGES.LOADING}</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {roadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.id} title={roadmap.title} author={roadmap.owner.nickname} />
            ))}
          </div>
        )}
        {mode === 'edit' && (
          <AddRoadmapModal>
            <Button className="w-full rounded-xl py-6 text-[14px] font-bold">
              {PROFILE_MESSAGES.ADD_PUBLIC_ROADMAP}
            </Button>
          </AddRoadmapModal>
        )}
      </CardContent>
    </Card>
  );
}
