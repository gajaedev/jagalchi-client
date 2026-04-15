import { apiClient } from './client';

// === Common Types ===

interface RetrievalEvidence {
  source: string;
  id: string;
  snippet: string;
}

// === Health & Docs ===

interface HealthResponse {
  status: string;
  version: string;
  services: Record<string, boolean>;
  timestamp: string;
}

interface DemoParams {
  roadmap_id?: string;
  tech_slug?: string;
  user_id?: string;
  question?: string;
  goal?: string;
  target_role?: string;
  compose_level?: 'quick' | 'full';
  include_rationale?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DemoResponse = Record<string, any>;

// === Learning Coach Types ===

interface RecordCoachScores {
  evidence_level: number;
  structure_score: number;
  specificity_score: number;
  reproducibility_score: number;
  quality_score: number;
}

interface RecordCoachNextAction {
  effort: string;
  task: string;
}

interface RecordCoachRewriteSuggestions {
  portfolio_bullets: string[];
  improved_memo: string;
}

interface RecordCoachResponse {
  record_id: string;
  model_version: string;
  prompt_version: string;
  created_at: string;
  scores: RecordCoachScores;
  strengths: string[];
  gaps: string[];
  rewrite_suggestions: RecordCoachRewriteSuggestions;
  code_feedback: unknown[];
  next_actions: RecordCoachNextAction[];
  followup_questions: string[];
  retrieval_evidence: RetrievalEvidence[];
}

interface RecordCoachParams {
  roadmap_id: string;
  node_id?: string;
  compose_level?: 'quick' | 'full';
}

interface LearningCoachBehaviorSummary {
  motivation: number;
  ability: number;
  prompt_hour: number;
  dropout_risk: number;
}

interface LearningCoachResponse {
  user_id: string;
  question: string;
  intent: string;
  toolchain: string[];
  plan: string[];
  answer: string;
  retrieval_evidence: RetrievalEvidence[];
  behavior_summary: LearningCoachBehaviorSummary;
  model_version: string;
  prompt_version: string;
  created_at: string;
  cache_hit: boolean;
}

interface LearningCoachParams {
  question: string;
  /** 서버가 인증 토큰에서 추론 가능 — 생략 시 현재 로그인 사용자 */
  user_id?: string;
  compose_level?: 'quick' | 'full';
}

interface LearningPatternPatterns {
  active_days: number;
  avg_session_gap_days: number;
  completion_velocity: number;
}

interface LearningPatternResponse {
  user_id: string;
  period: string;
  patterns: LearningPatternPatterns;
  recommendations: string[];
  model_version: string;
  generated_at: string;
}

interface LearningPatternParams {
  user_id: string;
  days?: number;
}

// === Roadmap Types ===

interface RelatedRoadmapReason {
  type: string;
  value: number;
}

interface RelatedRoadmapCandidate {
  related_roadmap_id: string;
  score: number;
  reasons: RelatedRoadmapReason[];
}

interface RelatedRoadmapsResponse {
  roadmap_id: string;
  generated_at: string;
  candidates: RelatedRoadmapCandidate[];
  model_version: string;
  evidence_snapshot: {
    tracks: string[];
    candidate_count: number;
  };
}

interface GeneratedRoadmapNode {
  node_id: string;
  title: string;
  tags: string[];
}

interface GeneratedRoadmapEdge {
  source: string;
  target: string;
}

interface RoadmapGeneratedResponse {
  roadmap_id: string;
  title: string;
  description: string;
  nodes: GeneratedRoadmapNode[];
  edges: GeneratedRoadmapEdge[];
  tags: string[];
  model_version: string;
  prompt_version: string;
  created_at: string;
  retrieval_evidence: RetrievalEvidence[];
}

interface RoadmapGeneratedParams {
  goal: string;
  preferred_tags?: string;
  max_nodes?: number;
  compose_level?: 'quick' | 'full';
}

interface RecommendationNode {
  node_id: string;
  status: 'COMPLETED' | 'AVAILABLE' | 'LOCKED' | 'IN_PROGRESS' | 'NEEDS_REVIEW';
}

interface RoadmapRecommendationResponse {
  roadmap_id: string;
  target_role: string;
  nodes: RecommendationNode[];
  edges: GeneratedRoadmapEdge[];
  gnn_predictions: Record<string, string[]>;
  model_version: string;
  created_at: string;
}

interface RoadmapRecommendationParams {
  target_role: string;
  user_id?: string;
}

interface DocumentRoadmapRecommendedItem {
  related_roadmap_id: string;
  score: number;
  reasons: RelatedRoadmapReason[];
}

interface DocumentRoadmapResponse {
  document_summary: string;
  extracted_keywords: string[];
  recommended_roadmaps: DocumentRoadmapRecommendedItem[];
  suggested_topics: string[];
  model_version: string;
  created_at: string;
}

interface DocumentRoadmapPostRequest {
  document: string;
  goal?: string;
}

// === Tech Card Types ===

interface TechAlternative {
  slug: string;
  why: string;
}

interface TechLearningPathStage {
  stage: string;
  items: string[];
}

interface TechCardMetadata {
  language: string;
  license: string;
  latest_version: string;
  last_updated: string;
}

interface TechCardRelationships {
  based_on: string[];
  alternatives: string[];
}

interface TechCardReliabilityMetrics {
  community_score: number;
  doc_freshness: number;
  source_count: number;
}

interface TechCardLatestChanges {
  changed: boolean;
  change_ratio: number;
  summary: string;
}

interface TechCardSource {
  title: string;
  url: string;
  fetched_at: string;
}

interface TechCardResponse {
  id: string;
  name: string;
  tech_slug: string;
  category: string;
  version: string;
  summary: string;
  summary_vector: number[];
  why_it_matters: string[];
  when_to_use: string[];
  alternatives: TechAlternative[];
  pitfalls: string[];
  learning_path: TechLearningPathStage[];
  metadata: TechCardMetadata;
  relationships: TechCardRelationships;
  reliability_metrics: TechCardReliabilityMetrics;
  latest_changes: TechCardLatestChanges;
  reel_evidence: { query: string; snippet: string }[];
  sources: TechCardSource[];
  generated_by: {
    model_version: string;
    prompt_version: string;
  };
}

interface TechFingerprintTag {
  tech_slug: string;
  type: 'core' | 'optional' | 'alternative' | 'deprecated';
  confidence: number;
  rationale?: string;
}

interface TechFingerprintResponse {
  roadmap_id: string;
  tags: TechFingerprintTag[];
  generated_at: string;
  model_version: string;
}

interface TechFingerprintParams {
  roadmap_id: string;
  include_rationale?: boolean;
}

// === Comment Intelligence Types ===

interface CommentBottleneck {
  node_id: string;
  score: number;
  top_topics: string[];
}

interface CommentDigestResponse {
  roadmap_id: string;
  period: string;
  highlights: string[];
  bottlenecks: CommentBottleneck[];
  generated_by: {
    model_version: string;
    prompt_version: string | null;
  };
}

interface CommentDigestParams {
  roadmap_id: string;
  period_days?: number;
}

interface CommentDuplicate {
  comment_id: string;
  snippet: string;
}

type CommentDuplicatesResponse = CommentDuplicate[];

interface CommentDuplicatesParams {
  roadmap_id: string;
  question: string;
  top_k?: number;
}

// === Search & Recommendation Types ===

interface ResourceItem {
  title: string;
  url: string;
  source: string;
  score: number;
  why_recommended: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'unknown';
  estimated_minutes: number | null;
}

interface ResourceRecommendationResponse {
  query: string;
  generated_at: string;
  items: ResourceItem[];
  model_version: string;
  retrieval_evidence: RetrievalEvidence[];
}

interface ResourceRecommendationParams {
  query: string;
  top_k?: number;
  recency_days?: number;
  lang?: 'ko_first' | 'ko_only' | 'global';
}

interface WebSearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
  source: string;
  fetched_at: string;
  why_recommended: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'unknown';
  estimated_minutes: number | null;
}

interface WebSearchResponse {
  query: string;
  results: WebSearchResult[];
  engines_used: string[];
  total_results: number;
  generated_at: string;
}

interface WebSearchParams {
  query: string;
  top_k?: number;
  engine?: 'apify' | 'tavily' | 'exa' | 'all';
  recency_days?: number;
  lang?: 'ko_first' | 'ko_only' | 'global';
}

interface GraphRagNode {
  node_id: string;
  text: string;
  tags: string[];
}

interface GraphRagEdge {
  source: string;
  target: string;
  type?: string;
}

interface GraphRagResponse {
  retrieval_evidence: RetrievalEvidence[];
  graph_snapshot: {
    nodes: GraphRagNode[];
    edges: GraphRagEdge[];
  };
}

interface GraphRagParams {
  query: string;
  top_k?: number;
}

// === Init Data Types ===

interface InitData {
  init_data_id: string;
  roadmap_id: string;
  content: string;
  data_type: 'file' | 'text';
  filename: string | null;
  created_at: string;
  updated_at: string;
}

type InitDataListResponse = InitData[];

interface InitDataListParams {
  roadmap_id: string;
}

interface InitDataCreateRequest {
  roadmap_id?: string;
  content: string;
  data_type?: 'file' | 'text';
  filename?: string | null;
}

interface InitDataUpdateRequest {
  content: string;
}

// === Node Content Types ===

interface NodeDescriptionResponse {
  node_title: string;
  description: string;
  generated_at: string;
}

interface NodeDescriptionParams {
  node_title: string;
  context?: string;
}

interface NodeResourceRecommendationParams {
  node_id: string;
  roadmap_id?: string;
}

interface NodeResourceSaveRequest {
  node_id: string;
  title: string;
  url: string;
  source?: 'web' | 'internal' | 'generated';
  description?: string;
}

interface NodeResourceSaveResponse {
  resource_id: string;
  node_id: string;
  title: string;
  url: string;
  source: 'web' | 'internal' | 'generated';
  description?: string;
  created_at: string;
}

// === API Functions ===

/** GET /ai/health/ */
export const getAiHealth = () => apiClient.get<HealthResponse>('/ai/health/');

/** GET /ai/schema/ */
export const getAiSchema = () => apiClient.get<unknown>('/ai/schema/');

/** GET /ai/docs/ */
export const getAiDocs = () => apiClient.get<unknown>('/ai/docs/');

/** GET /ai/redoc/ */
export const getAiRedoc = () => apiClient.get<unknown>('/ai/redoc/');

/** GET /ai/demo */
export const getAiDemo = (params: DemoParams = {}) => {
  const searchParams = new URLSearchParams();
  if (params.roadmap_id) searchParams.set('roadmap_id', params.roadmap_id);
  if (params.tech_slug) searchParams.set('tech_slug', params.tech_slug);
  if (params.user_id) searchParams.set('user_id', params.user_id);
  if (params.question) searchParams.set('question', params.question);
  if (params.goal) searchParams.set('goal', params.goal);
  if (params.target_role) searchParams.set('target_role', params.target_role);
  if (params.compose_level) searchParams.set('compose_level', params.compose_level);
  if (params.include_rationale !== undefined)
    searchParams.set('include_rationale', String(params.include_rationale));

  const qs = searchParams.toString();
  return apiClient.get<DemoResponse>(`/ai/demo${qs ? `?${qs}` : ''}`);
};

/** GET /ai/record-coach */
export const getRecordCoach = (params: RecordCoachParams) => {
  const searchParams = new URLSearchParams();
  searchParams.set('roadmap_id', params.roadmap_id);
  if (params.node_id) searchParams.set('node_id', params.node_id);
  if (params.compose_level) searchParams.set('compose_level', params.compose_level);

  return apiClient.get<RecordCoachResponse>(`/ai/record-coach?${searchParams.toString()}`);
};

/** GET /ai/learning-coach */
export const getLearningCoach = (params: LearningCoachParams) => {
  const searchParams = new URLSearchParams();
  searchParams.set('question', params.question);
  if (params.user_id) searchParams.set('user_id', params.user_id);
  if (params.compose_level) searchParams.set('compose_level', params.compose_level);

  return apiClient.get<LearningCoachResponse>(`/ai/learning-coach?${searchParams.toString()}`);
};

/** GET /ai/learning-pattern */
export const getLearningPattern = (params: LearningPatternParams) => {
  const searchParams = new URLSearchParams();
  searchParams.set('user_id', params.user_id);
  if (params.days !== undefined) searchParams.set('days', String(params.days));

  return apiClient.get<LearningPatternResponse>(`/ai/learning-pattern?${searchParams.toString()}`);
};

/** GET /ai/related-roadmaps */
export const getRelatedRoadmaps = (roadmapId: string) =>
  apiClient.get<RelatedRoadmapsResponse>(
    `/ai/related-roadmaps?roadmap_id=${encodeURIComponent(roadmapId)}`,
  );

/** GET /ai/roadmap-generated */
export const getRoadmapGenerated = (params: RoadmapGeneratedParams) => {
  const searchParams = new URLSearchParams();
  searchParams.set('goal', params.goal);
  if (params.preferred_tags) searchParams.set('preferred_tags', params.preferred_tags);
  if (params.max_nodes !== undefined) searchParams.set('max_nodes', String(params.max_nodes));
  if (params.compose_level) searchParams.set('compose_level', params.compose_level);

  return apiClient.get<RoadmapGeneratedResponse>(
    `/ai/roadmap-generated?${searchParams.toString()}`,
  );
};

/** GET /ai/roadmap-recommendation */
export const getRoadmapRecommendation = (params: RoadmapRecommendationParams) => {
  const searchParams = new URLSearchParams();
  searchParams.set('target_role', params.target_role);
  if (params.user_id) searchParams.set('user_id', params.user_id);

  return apiClient.get<RoadmapRecommendationResponse>(
    `/ai/roadmap-recommendation?${searchParams.toString()}`,
  );
};

/** POST /ai/document-roadmap */
export const postDocumentRoadmap = (data: DocumentRoadmapPostRequest) =>
  apiClient.post<DocumentRoadmapResponse>('/ai/document-roadmap', data);

/** GET /ai/tech-cards */
export const getTechCards = (techSlug: string) =>
  apiClient.get<TechCardResponse>(`/ai/tech-cards?tech_slug=${encodeURIComponent(techSlug)}`);

/** GET /ai/tech-fingerprint */
export const getTechFingerprint = (params: TechFingerprintParams) => {
  const searchParams = new URLSearchParams();
  searchParams.set('roadmap_id', params.roadmap_id);
  if (params.include_rationale !== undefined)
    searchParams.set('include_rationale', String(params.include_rationale));

  return apiClient.get<TechFingerprintResponse>(`/ai/tech-fingerprint?${searchParams.toString()}`);
};

/** GET /ai/comment-digest */
export const getCommentDigest = (params: CommentDigestParams) => {
  const searchParams = new URLSearchParams();
  searchParams.set('roadmap_id', params.roadmap_id);
  if (params.period_days !== undefined) searchParams.set('period_days', String(params.period_days));

  return apiClient.get<CommentDigestResponse>(`/ai/comment-digest?${searchParams.toString()}`);
};

/** GET /ai/comment-duplicates */
export const getCommentDuplicates = (params: CommentDuplicatesParams) => {
  const searchParams = new URLSearchParams();
  searchParams.set('roadmap_id', params.roadmap_id);
  searchParams.set('question', params.question);
  if (params.top_k !== undefined) searchParams.set('top_k', String(params.top_k));

  return apiClient.get<CommentDuplicatesResponse>(
    `/ai/comment-duplicates?${searchParams.toString()}`,
  );
};

/** GET /ai/resource-recommendation */
export const getResourceRecommendation = (params: ResourceRecommendationParams) => {
  const searchParams = new URLSearchParams();
  searchParams.set('query', params.query);
  if (params.top_k !== undefined) searchParams.set('top_k', String(params.top_k));
  if (params.recency_days !== undefined)
    searchParams.set('recency_days', String(params.recency_days));
  if (params.lang) searchParams.set('lang', params.lang);

  return apiClient.get<ResourceRecommendationResponse>(
    `/ai/resource-recommendation?${searchParams.toString()}`,
  );
};

/** GET /ai/web-search */
export const getWebSearch = (params: WebSearchParams) => {
  const searchParams = new URLSearchParams();
  searchParams.set('query', params.query);
  if (params.top_k !== undefined) searchParams.set('top_k', String(params.top_k));
  if (params.engine) searchParams.set('engine', params.engine);
  if (params.recency_days !== undefined)
    searchParams.set('recency_days', String(params.recency_days));
  if (params.lang) searchParams.set('lang', params.lang);

  return apiClient.get<WebSearchResponse>(`/ai/web-search?${searchParams.toString()}`);
};

/** GET /ai/graph-rag */
export const getGraphRag = (params: GraphRagParams) => {
  const searchParams = new URLSearchParams();
  searchParams.set('query', params.query);
  if (params.top_k !== undefined) searchParams.set('top_k', String(params.top_k));

  return apiClient.get<GraphRagResponse>(`/ai/graph-rag?${searchParams.toString()}`);
};

/** GET /ai/init-data */
export const getInitDataList = (params: InitDataListParams) =>
  apiClient.get<InitDataListResponse>(
    `/ai/init-data?roadmap_id=${encodeURIComponent(params.roadmap_id)}`,
  );

/** POST /ai/init-data */
export const createInitData = (data: InitDataCreateRequest) =>
  apiClient.post<InitData>('/ai/init-data', data);

/** GET /ai/init-data/{init_data_id} */
export const getInitData = (initDataId: string) =>
  apiClient.get<InitData>(`/ai/init-data/${initDataId}`);

/** PUT /ai/init-data/{init_data_id} */
export const updateInitData = (initDataId: string, data: InitDataUpdateRequest) =>
  apiClient.put<InitData>(`/ai/init-data/${initDataId}`, data);

/** DELETE /ai/init-data/{init_data_id} */
export const deleteInitData = (initDataId: string) =>
  apiClient.delete<void>(`/ai/init-data/${initDataId}`);

/** GET /ai/node-generation */
export const getNodeGeneration = (initDataId: string) =>
  apiClient.get<RoadmapGeneratedResponse>(
    `/ai/node-generation?init_data_id=${encodeURIComponent(initDataId)}`,
  );

/** GET /ai/node-description */
export const getNodeDescription = (params: NodeDescriptionParams) => {
  const searchParams = new URLSearchParams();
  searchParams.set('node_title', params.node_title);
  if (params.context) searchParams.set('context', params.context);

  return apiClient.get<NodeDescriptionResponse>(`/ai/node-description?${searchParams.toString()}`);
};

/** GET /ai/node-resource-recommendation */
export const getNodeResourceRecommendation = (params: NodeResourceRecommendationParams) => {
  const searchParams = new URLSearchParams();
  searchParams.set('node_id', params.node_id);
  if (params.roadmap_id) searchParams.set('roadmap_id', params.roadmap_id);

  return apiClient.get<ResourceRecommendationResponse>(
    `/ai/node-resource-recommendation?${searchParams.toString()}`,
  );
};

/** POST /ai/node-resource-save */
export const saveNodeResource = (data: NodeResourceSaveRequest) =>
  apiClient.post<NodeResourceSaveResponse>('/ai/node-resource-save', data);

// === Type Exports ===

export type {
  RetrievalEvidence,
  HealthResponse,
  DemoParams,
  DemoResponse,
  RecordCoachScores,
  RecordCoachNextAction,
  RecordCoachRewriteSuggestions,
  RecordCoachResponse,
  RecordCoachParams,
  LearningCoachBehaviorSummary,
  LearningCoachResponse,
  LearningCoachParams,
  LearningPatternPatterns,
  LearningPatternResponse,
  LearningPatternParams,
  RelatedRoadmapReason,
  RelatedRoadmapCandidate,
  RelatedRoadmapsResponse,
  GeneratedRoadmapNode,
  GeneratedRoadmapEdge,
  RoadmapGeneratedResponse,
  RoadmapGeneratedParams,
  RecommendationNode,
  RoadmapRecommendationResponse,
  RoadmapRecommendationParams,
  DocumentRoadmapRecommendedItem,
  DocumentRoadmapResponse,
  DocumentRoadmapPostRequest,
  TechAlternative,
  TechLearningPathStage,
  TechCardMetadata,
  TechCardRelationships,
  TechCardReliabilityMetrics,
  TechCardLatestChanges,
  TechCardSource,
  TechCardResponse,
  TechFingerprintTag,
  TechFingerprintResponse,
  TechFingerprintParams,
  CommentBottleneck,
  CommentDigestResponse,
  CommentDigestParams,
  CommentDuplicate,
  CommentDuplicatesResponse,
  CommentDuplicatesParams,
  ResourceItem,
  ResourceRecommendationResponse,
  ResourceRecommendationParams,
  WebSearchResult,
  WebSearchResponse,
  WebSearchParams,
  GraphRagNode,
  GraphRagEdge,
  GraphRagResponse,
  GraphRagParams,
  InitData,
  InitDataListResponse,
  InitDataListParams,
  InitDataCreateRequest,
  InitDataUpdateRequest,
  NodeDescriptionResponse,
  NodeDescriptionParams,
  NodeResourceRecommendationParams,
  NodeResourceSaveRequest,
  NodeResourceSaveResponse,
};
