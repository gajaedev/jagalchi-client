import { http, HttpResponse } from 'msw';

import {
  MOCK_AI_HEALTH,
  MOCK_GENERATED_ROADMAP,
  MOCK_NODE_DESCRIPTION,
  MOCK_RESOURCE_RECOMMENDATIONS,
  MOCK_TECH_CARD,
} from '../fixtures/ai';

/** AI API 핸들러 */
export const aiHandlers = [
  // GET /api/ai/health/ — AI 서비스 헬스 체크
  http.get('/api/ai/health/', () => {
    return HttpResponse.json({
      ...MOCK_AI_HEALTH,
      timestamp: new Date().toISOString(),
    });
  }),

  // GET /api/ai/node-description — 노드 설명 생성
  http.get('/api/ai/node-description', ({ request }) => {
    const url = new URL(request.url);
    const nodeTitle = url.searchParams.get('node_title');

    if (!nodeTitle) {
      return HttpResponse.json({ message: 'node_title parameter is required' }, { status: 400 });
    }

    return HttpResponse.json({
      ...MOCK_NODE_DESCRIPTION,
      node_title: nodeTitle,
      generated_at: new Date().toISOString(),
    });
  }),

  // GET /api/ai/resource-recommendation — 리소스 추천
  http.get('/api/ai/resource-recommendation', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');

    if (!query) {
      return HttpResponse.json({ message: 'query parameter is required' }, { status: 400 });
    }

    return HttpResponse.json({
      ...MOCK_RESOURCE_RECOMMENDATIONS,
      query,
    });
  }),

  // GET /api/ai/roadmap-generated — AI 로드맵 생성
  http.get('/api/ai/roadmap-generated', () => {
    return HttpResponse.json({
      ...MOCK_GENERATED_ROADMAP,
      generated_at: new Date().toISOString(),
    });
  }),

  // GET /api/ai/tech-cards — 기술 카드 조회
  http.get('/api/ai/tech-cards', () => {
    return HttpResponse.json({
      ...MOCK_TECH_CARD,
      generated_at: new Date().toISOString(),
    });
  }),
];
