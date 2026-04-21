import { JsonLd } from '@/components/JsonLd';
import { RoadmapViewer } from '@/features/roadmap-viewer';
import { buildRoadmapJsonLd } from '@/lib/json-ld';

interface ViewerPageProps {
  params: Promise<{ id: string }>;
}

export default async function ViewerPage({ params }: ViewerPageProps) {
  const { id } = await params;

  // TODO(#224): 백엔드 로드맵 메타 조회 후 JSON-LD 에 실데이터 주입
  const jsonLd = buildRoadmapJsonLd({ id, title: `자갈치 로드맵 #${id}` });

  return (
    <>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <RoadmapViewer roadmapId={id} />
    </>
  );
}
