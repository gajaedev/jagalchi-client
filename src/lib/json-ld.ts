const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jagalchi.dev';

export interface RoadmapJsonLdInput {
  id: string | number;
  title: string;
  description?: string;
  authorName?: string;
  authorUrl?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * 로드맵 상세 페이지용 schema.org Course 구조화 데이터.
 * 데이터가 없을 때는 null 을 반환해 script 주입을 건너뛰도록 한다.
 */
export function buildRoadmapJsonLd(
  input: RoadmapJsonLdInput | null,
): Record<string, unknown> | null {
  if (!input) return null;

  const url = `${SITE_URL}/viewer/${input.id}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: input.title,
    description: input.description,
    url,
    ...(input.imageUrl ? { image: input.imageUrl } : {}),
    ...(input.authorName
      ? {
          provider: {
            '@type': 'Person',
            name: input.authorName,
            ...(input.authorUrl ? { url: input.authorUrl } : {}),
          },
        }
      : {}),
    ...(input.createdAt ? { dateCreated: input.createdAt } : {}),
    ...(input.updatedAt ? { dateModified: input.updatedAt } : {}),
    inLanguage: 'ko',
    isAccessibleForFree: true,
  };
}
