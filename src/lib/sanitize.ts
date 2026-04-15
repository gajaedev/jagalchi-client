import DOMPurify from 'isomorphic-dompurify';

// target="_blank" 링크에 rel="noopener noreferrer" 강제 적용 (리버스 탭내핑 방지)
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A' && node.getAttribute('target') === '_blank') {
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

/**
 * HTML 문자열에서 위험한 스크립트/이벤트 핸들러를 제거
 * 사용자 입력이 innerHTML 등으로 렌더링될 때 사용
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });
}

/**
 * 순수 텍스트만 추출 (모든 HTML 태그 제거)
 * 노드 라벨, 설명 등 plain text 필드에 사용
 */
export function sanitizeText(dirty: string): string {
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}
