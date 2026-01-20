import { MyRoadmapsSidebar } from '../organisms/MyRoadmapsSidebar';

interface MyRoadmapsLayoutProps {
  children: React.ReactNode;
}

export function MyRoadmapsLayout({ children }: MyRoadmapsLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <MyRoadmapsSidebar />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
