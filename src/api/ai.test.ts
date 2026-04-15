import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  createInitData,
  deleteInitData,
  getAiDemo,
  getAiDocs,
  getAiHealth,
  getAiRedoc,
  getAiSchema,
  getCommentDigest,
  getCommentDuplicates,
  getGraphRag,
  getInitData,
  getInitDataList,
  getLearningCoach,
  getLearningPattern,
  getNodeDescription,
  getNodeGeneration,
  getNodeResourceRecommendation,
  getRecordCoach,
  getRelatedRoadmaps,
  getRoadmapGenerated,
  getRoadmapRecommendation,
  getResourceRecommendation,
  getTechCards,
  getTechFingerprint,
  getWebSearch,
  postDocumentRoadmap,
  saveNodeResource,
  updateInitData,
} from './ai';

vi.mock('./client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

import { apiClient } from './client';

describe('getAiSchema', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/schema/', () => {
    getAiSchema();
    expect(apiClient.get).toHaveBeenCalledWith('/ai/schema/');
  });
});

describe('getAiDocs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/docs/', () => {
    getAiDocs();
    expect(apiClient.get).toHaveBeenCalledWith('/ai/docs/');
  });
});

describe('getAiRedoc', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/redoc/', () => {
    getAiRedoc();
    expect(apiClient.get).toHaveBeenCalledWith('/ai/redoc/');
  });
});

describe('getLearningCoach', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/learning-coach with required question', () => {
    getLearningCoach({ question: 'how to learn react?' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/ai/learning-coach?');
    expect(call).toContain('question=how+to+learn+react%3F');
  });

  it('includes optional user_id when provided', () => {
    getLearningCoach({ question: 'q', user_id: 'u-1' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('user_id=u-1');
  });
});

describe('getLearningPattern', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/learning-pattern with required user_id', () => {
    getLearningPattern({ user_id: 'u-1' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/ai/learning-pattern?');
    expect(call).toContain('user_id=u-1');
  });

  it('includes optional days when provided', () => {
    getLearningPattern({ user_id: 'u-1', days: 30 });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('days=30');
  });
});

describe('getRelatedRoadmaps', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/related-roadmaps with encoded roadmap_id', () => {
    getRelatedRoadmaps('rm-1');
    expect(apiClient.get).toHaveBeenCalledWith('/ai/related-roadmaps?roadmap_id=rm-1');
  });
});

describe('getRoadmapGenerated', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/roadmap-generated with required goal', () => {
    getRoadmapGenerated({ goal: 'learn frontend' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/ai/roadmap-generated?');
    expect(call).toContain('goal=learn+frontend');
  });

  it('includes optional params when provided', () => {
    getRoadmapGenerated({ goal: 'learn', max_nodes: 10, compose_level: 'full' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('max_nodes=10');
    expect(call).toContain('compose_level=full');
  });
});

describe('getRoadmapRecommendation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/roadmap-recommendation with required target_role', () => {
    getRoadmapRecommendation({ target_role: 'frontend' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/ai/roadmap-recommendation?');
    expect(call).toContain('target_role=frontend');
  });

  it('includes optional user_id when provided', () => {
    getRoadmapRecommendation({ target_role: 'backend', user_id: 'u-1' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('user_id=u-1');
  });
});

describe('getTechFingerprint', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/tech-fingerprint with required roadmap_id', () => {
    getTechFingerprint({ roadmap_id: 'rm-1' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/ai/tech-fingerprint?');
    expect(call).toContain('roadmap_id=rm-1');
  });

  it('includes optional include_rationale when provided', () => {
    getTechFingerprint({ roadmap_id: 'rm-1', include_rationale: true });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('include_rationale=true');
  });
});

describe('getCommentDigest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/comment-digest with required roadmap_id', () => {
    getCommentDigest({ roadmap_id: 'rm-1' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/ai/comment-digest?');
    expect(call).toContain('roadmap_id=rm-1');
  });

  it('includes optional period_days when provided', () => {
    getCommentDigest({ roadmap_id: 'rm-1', period_days: 7 });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('period_days=7');
  });
});

describe('getCommentDuplicates', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/comment-duplicates with required params', () => {
    getCommentDuplicates({ roadmap_id: 'rm-1', question: 'what is react?' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/ai/comment-duplicates?');
    expect(call).toContain('roadmap_id=rm-1');
    expect(call).toContain('question=what+is+react%3F');
  });

  it('includes optional top_k when provided', () => {
    getCommentDuplicates({ roadmap_id: 'rm-1', question: 'q', top_k: 5 });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('top_k=5');
  });
});

describe('getResourceRecommendation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/resource-recommendation with required query', () => {
    getResourceRecommendation({ query: 'react tutorial' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/ai/resource-recommendation?');
    expect(call).toContain('query=react+tutorial');
  });

  it('includes optional params when provided', () => {
    getResourceRecommendation({ query: 'react', top_k: 3, lang: 'ko_first' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('top_k=3');
    expect(call).toContain('lang=ko_first');
  });
});

describe('getWebSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/web-search with required query', () => {
    getWebSearch({ query: 'nextjs guide' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/ai/web-search?');
    expect(call).toContain('query=nextjs+guide');
  });

  it('includes optional params when provided', () => {
    getWebSearch({ query: 'react', engine: 'tavily', top_k: 5 });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('engine=tavily');
    expect(call).toContain('top_k=5');
  });
});

describe('getGraphRag', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/graph-rag with required query', () => {
    getGraphRag({ query: 'react basics' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/ai/graph-rag?');
    expect(call).toContain('query=react+basics');
  });

  it('includes optional top_k when provided', () => {
    getGraphRag({ query: 'react', top_k: 10 });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('top_k=10');
  });
});

describe('getInitDataList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/init-data with encoded roadmap_id', () => {
    getInitDataList({ roadmap_id: 'rm-1' });
    expect(apiClient.get).toHaveBeenCalledWith('/ai/init-data?roadmap_id=rm-1');
  });
});

describe('getInitData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/init-data/{id}', () => {
    getInitData('id-456');
    expect(apiClient.get).toHaveBeenCalledWith('/ai/init-data/id-456');
  });
});

describe('updateInitData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls PUT /ai/init-data/{id} with body', () => {
    updateInitData('id-456', { content: 'updated content' });
    expect(apiClient.put).toHaveBeenCalledWith('/ai/init-data/id-456', {
      content: 'updated content',
    });
  });
});

describe('getNodeGeneration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/node-generation with encoded init_data_id', () => {
    getNodeGeneration('init-1');
    expect(apiClient.get).toHaveBeenCalledWith('/ai/node-generation?init_data_id=init-1');
  });
});

describe('getNodeDescription', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/node-description with required node_title', () => {
    getNodeDescription({ node_title: 'React Hooks' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/ai/node-description?');
    expect(call).toContain('node_title=React+Hooks');
  });

  it('includes optional context when provided', () => {
    getNodeDescription({ node_title: 'Hooks', context: 'frontend roadmap' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('context=frontend+roadmap');
  });
});

describe('getNodeResourceRecommendation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/node-resource-recommendation with required node_id', () => {
    getNodeResourceRecommendation({ node_id: 'nd-1' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/ai/node-resource-recommendation?');
    expect(call).toContain('node_id=nd-1');
  });

  it('includes optional roadmap_id when provided', () => {
    getNodeResourceRecommendation({ node_id: 'nd-1', roadmap_id: 'rm-1' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('roadmap_id=rm-1');
  });
});

describe('saveNodeResource', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls POST /ai/node-resource-save with body', () => {
    saveNodeResource({ node_id: 'nd-1', title: 'React Docs', url: 'https://react.dev' });
    expect(apiClient.post).toHaveBeenCalledWith('/ai/node-resource-save', {
      node_id: 'nd-1',
      title: 'React Docs',
      url: 'https://react.dev',
    });
  });
});

describe('getAiHealth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/health/', () => {
    getAiHealth();
    expect(apiClient.get).toHaveBeenCalledWith('/ai/health/');
  });
});

describe('getAiDemo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/demo with no params', () => {
    getAiDemo();
    expect(apiClient.get).toHaveBeenCalledWith('/ai/demo');
  });

  it('calls GET /ai/demo with query string when params provided', () => {
    getAiDemo({ roadmap_id: 'r1', user_id: 'u1' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/ai/demo?');
    expect(call).toContain('roadmap_id=r1');
    expect(call).toContain('user_id=u1');
  });
});

describe('getRecordCoach', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/record-coach with required roadmap_id', () => {
    getRecordCoach({ roadmap_id: 'rm-1' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/ai/record-coach?');
    expect(call).toContain('roadmap_id=rm-1');
  });

  it('includes optional node_id when provided', () => {
    getRecordCoach({ roadmap_id: 'rm-1', node_id: 'nd-2' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('node_id=nd-2');
  });
});

describe('getTechCards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /ai/tech-cards with encoded tech_slug', () => {
    getTechCards('react');
    expect(apiClient.get).toHaveBeenCalledWith('/ai/tech-cards?tech_slug=react');
  });
});

describe('postDocumentRoadmap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls POST /ai/document-roadmap with body', () => {
    postDocumentRoadmap({ document: 'some doc', goal: 'learn react' });
    expect(apiClient.post).toHaveBeenCalledWith('/ai/document-roadmap', {
      document: 'some doc',
      goal: 'learn react',
    });
  });
});

describe('createInitData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls POST /ai/init-data with body', () => {
    createInitData({ content: 'test content', data_type: 'text' });
    expect(apiClient.post).toHaveBeenCalledWith('/ai/init-data', {
      content: 'test content',
      data_type: 'text',
    });
  });
});

describe('deleteInitData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls DELETE /ai/init-data/{id}', () => {
    deleteInitData('id-123');
    expect(apiClient.delete).toHaveBeenCalledWith('/ai/init-data/id-123');
  });
});
