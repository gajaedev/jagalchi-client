import { JsonLd } from '@/components/JsonLd';
import { RoadmapDetail } from '@/features/community';
import { buildRoadmapJsonLd } from '@/lib/json-ld';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoadmapDetailPage({ params }: PageProps) {
  const { id } = await params;

  // TODO(#224): 백엔드 로드맵 메타 조회 후 JSON-LD 에 실데이터 주입
  const jsonLd = buildRoadmapJsonLd({ id, title: `자갈치 로드맵 #${id}` });

  return (
    <>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <RoadmapDetail id={Number(id)} />
    </>
  );
}
