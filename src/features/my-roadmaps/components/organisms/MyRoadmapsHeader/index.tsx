import { cn } from '@/lib/utils';

interface MyRoadmapsHeaderProps {
  className?: string;
}

export function MyRoadmapsHeader({ className }: MyRoadmapsHeaderProps) {
  return (
    <div
      className={cn('flex w-full flex-col items-start justify-center gap-6 px-20 py-10', className)}
    >
      <div className="flex w-full flex-col justify-center">
        <h2 className="text-foreground text-3xl leading-[30px] font-bold tracking-tight">
          내 로드맵
        </h2>
      </div>
      <div className="border-border flex w-full items-center justify-center border-l-2 px-6 py-0">
        <p className="text-foreground flex-1 overflow-hidden text-sm leading-[21px] font-medium tracking-[0.07px] text-ellipsis">
          User’s 로드맵
        </p>
      </div>
    </div>
  );
}
