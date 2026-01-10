import { RoadmapDetail } from '@/features/community/components/templates/RoadmapDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoadmapDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <RoadmapDetail id={id} />;
}
