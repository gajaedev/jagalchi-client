import { z } from 'zod';

/**
 * Zod schemas for runtime validation of localStorage data
 * Prevents corruption and security issues from invalid/malicious data
 */

const roadmapAuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const roadmapNodeDataSchema = z.object({
  label: z.string(),
  description: z.string().optional(),
  resources: z.array(z.string()).optional(),
  variant: z.string().optional(),
  isLocked: z.boolean().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  fontSize: z.number().optional(),
  fontWeight: z.string().optional(),
});

const roadmapNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: roadmapNodeDataSchema,
  style: z.record(z.unknown()).optional(),
});

const edgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  sourceHandle: z.string().nullable().optional(),
  targetHandle: z.string().nullable().optional(),
  type: z.string().optional(),
  animated: z.boolean().optional(),
  style: z.record(z.unknown()).optional(),
  data: z.record(z.unknown()).optional(),
});

export const roadmapSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  nodes: z.array(roadmapNodeSchema),
  edges: z.array(edgeSchema),
  author: roadmapAuthorSchema.optional(),
  isPublic: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const roadmapsArraySchema = z.array(roadmapSchema);

/**
 * Safely parse and validate roadmaps from localStorage
 * Returns empty array if validation fails
 */
export function parseRoadmaps(stored: string | null): unknown[] {
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    const result = roadmapsArraySchema.safeParse(parsed);

    if (!result.success) {
      // eslint-disable-next-line no-console
      console.error('Invalid roadmap data in localStorage:', result.error);
      return [];
    }

    return result.data;
  } catch {
    // eslint-disable-next-line no-console
    console.error('Failed to parse roadmap data from localStorage');
    return [];
  }
}
