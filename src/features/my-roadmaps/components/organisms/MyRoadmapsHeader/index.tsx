import { MY_ROADMAPS_MESSAGES } from '@/constants/messages';
import { cn } from '@/lib/utils';

interface MyRoadmapsHeaderProps {
  className?: string;
  userName?: string;
}

export function MyRoadmapsHeader({ className, userName = 'User' }: MyRoadmapsHeaderProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start justify-center gap-6 px-20 pt-10 pb-6',
        className,
      )}
    >
      <div className="flex w-full flex-col justify-center">
        <h2 className="text-foreground text-3xl leading-none font-bold tracking-tight">
          {MY_ROADMAPS_MESSAGES.HEADER_TITLE}
        </h2>
      </div>
      <div className="border-border flex w-full items-center border-l-2 px-6 py-0">
        <p className="text-foreground flex-1 overflow-hidden text-sm font-medium tracking-[0.07px] text-ellipsis">
          {userName}’s {MY_ROADMAPS_MESSAGES.HEADER_ROADMAP_SUFFIX}
        </p>
      </div>
    </div>
  );
}
