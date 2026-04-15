import { MyRoadmapsSidebar } from '../../organisms/MyRoadmapsSidebar';

interface MyRoadmapsLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

export function MyRoadmapsLayout({ children, onLogout }: MyRoadmapsLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <MyRoadmapsSidebar onLogout={onLogout} />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
