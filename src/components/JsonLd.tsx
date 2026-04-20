interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * 구조화 데이터(schema.org)를 <script type="application/ld+json"> 로 주입한다.
 * XSS 방지를 위해 `<` 을 유니코드 escape 한다.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
