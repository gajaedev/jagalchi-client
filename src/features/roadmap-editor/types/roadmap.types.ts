import type { RoadmapNode } from './editor.types';
import type { Edge } from '@xyflow/react';

export interface RoadmapAuthor {
  id: string;
  name: string;
}

export interface Roadmap {
  id: string;
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
