import type { Edge, Node } from '@xyflow/react';

// === Node Data Types ===

export type NodeColorVariant = 'white' | 'black' | 'blue' | 'purple' | 'red' | 'orange';
export type TextColorVariant = 'white' | 'black' | 'blue' | 'purple' | 'red' | 'orange';
export type NodeState = 'default' | 'focus';

interface BaseNodeData {
  variant: NodeColorVariant;
  isLocked: boolean;
  [key: string]: unknown;
}

export interface JagalchiNodeData extends BaseNodeData {
  label: string;
  description: string;
  resources: string[]; // Phase 1에서는 간단히 URL 배열
}

export interface DetailNodeData extends BaseNodeData {
  label: string;
  description: string;
  resources: string[];
  /** Optional badge text shown below the label (e.g. estimated duration) */
  badge?: string;
}

export interface JagalchiSectionData extends BaseNodeData {
  title?: string;
}

export interface JagalchiTextData {
  variant: TextColorVariant;
  content?: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold';
  isLocked: boolean;
  [key: string]: unknown;
}

// === React Flow Node Types ===

export type JagalchiNodeType = Node<JagalchiNodeData, 'jagalchi-node'>;
export type JagalchiSectionType = Node<JagalchiSectionData, 'jagalchi-section'>;
export type JagalchiTextType = Node<JagalchiTextData, 'jagalchi-text'>;
export type DetailNodeType = Node<DetailNodeData, 'detail-node'>;

export type RoadmapNode =
  | JagalchiNodeType
  | JagalchiSectionType
  | JagalchiTextType
  | DetailNodeType;

// === Roadmap Entity Types ===

export interface RoadmapAuthor {
  id: number;
  name: string;
}

export interface Roadmap {
  id: number;
  title: string;
  description?: string;
  nodes: RoadmapNode[];
  edges: Edge[];
  author?: RoadmapAuthor;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoadmapInput {
  title?: string;
  description?: string;
  isPublic?: boolean;
}

export interface UpdateRoadmapInput {
  title?: string;
  description?: string;
  nodes?: RoadmapNode[];
  edges?: Edge[];
  isPublic?: boolean;
}

// === List/Summary Types ===

/** 로드맵 목록에서 사용하는 경량 타입 (Roadmap에서 파생) */
export interface RoadmapSummary {
  id: number;
  title: string;
  type?: 'Roadmap' | 'Directory';
  author?: string;
  fileCount?: number;
  imageUrl?: string;
  updatedAt?: string;
  isFavorite?: boolean;
  isShared?: boolean;
  category?: 'my-roadmap' | 'community';
}
