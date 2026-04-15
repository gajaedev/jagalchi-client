import { RoadmapDetail } from '@/features/community';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoadmapDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <RoadmapDetail id={Number(id)} />;
}
