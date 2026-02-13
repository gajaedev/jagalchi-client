import type { Node } from '@xyflow/react';

export type NodeColorVariant = 'white' | 'black' | 'blue' | 'purple' | 'red' | 'orange';
export type TextColorVariant = 'gray' | 'black' | 'blue' | 'purple' | 'red' | 'orange';
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

export type JagalchiNodeType = Node<JagalchiNodeData, 'jagalchi-node'>;
export type JagalchiSectionType = Node<JagalchiSectionData, 'jagalchi-section'>;
export type JagalchiTextType = Node<JagalchiTextData, 'jagalchi-text'>;

export type RoadmapNode = JagalchiNodeType | JagalchiSectionType | JagalchiTextType;
