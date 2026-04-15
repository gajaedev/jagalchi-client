import { describe, it, expect, vi, beforeEach } from 'vitest';

import { roadmapSchema, roadmapsArraySchema, parseRoadmaps } from './roadmap-schema';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Remove a key from an object (avoids unused-var lint errors from destructuring) */
function omit<T extends Record<string, unknown>>(obj: T, key: keyof T) {
  const copy = { ...obj };
  delete copy[key];
  return copy;
}

const validAuthor = { id: 1, name: 'Alice' };

const validNodeData = { label: 'Introduction' };

const validNode = {
  id: 'node-1',
  type: 'custom',
  position: { x: 0, y: 100 },
  data: validNodeData,
};

const validEdge = {
  id: 'edge-1',
  source: 'node-1',
  target: 'node-2',
};

const validRoadmap = {
  id: 1,
  title: 'Frontend Basics',
  nodes: [validNode],
  edges: [validEdge],
  isPublic: true,
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-01-02T00:00:00Z',
};

/* ------------------------------------------------------------------ */
/*  roadmapAuthorSchema (tested via roadmapSchema.author)              */
/* ------------------------------------------------------------------ */

describe('roadmapAuthorSchema', () => {
  it('accepts valid author data', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      author: validAuthor,
    });
    expect(result.success).toBe(true);
  });

  it('rejects author missing id', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      author: { name: 'Alice' },
    });
    expect(result.success).toBe(false);
  });

  it('rejects author missing name', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      author: { id: 1 },
    });
    expect(result.success).toBe(false);
  });

  it('accepts author with numeric id', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      author: { id: 123, name: 'Alice' },
    });
    expect(result.success).toBe(true);
  });

  it('rejects author with non-number id', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      author: { id: 'string-id', name: 'Alice' },
    });
    expect(result.success).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/*  roadmapNodeDataSchema (tested via roadmapSchema.nodes[].data)      */
/* ------------------------------------------------------------------ */

describe('roadmapNodeDataSchema', () => {
  it('accepts data with only required label', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      nodes: [{ ...validNode, data: { label: 'Hello' } }],
    });
    expect(result.success).toBe(true);
  });

  it('accepts data with all optional fields', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      nodes: [
        {
          ...validNode,
          data: {
            label: 'Hello',
            description: 'desc',
            resources: ['https://example.com'],
            variant: 'primary',
            isLocked: false,
            title: 'Title',
            content: 'Content',
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('accepts data missing label (optional for section/text nodes)', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      nodes: [{ ...validNode, data: { description: 'no label' } }],
    });
    expect(result.success).toBe(true);
  });

  it('rejects data with non-string label', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      nodes: [{ ...validNode, data: { label: 42 } }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects data with non-array resources', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      nodes: [{ ...validNode, data: { label: 'ok', resources: 'not-array' } }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects data with non-boolean isLocked', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      nodes: [{ ...validNode, data: { label: 'ok', isLocked: 'yes' } }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects data with non-number fontSize', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      nodes: [{ ...validNode, data: { label: 'ok', fontSize: '14px' } }],
    });
    expect(result.success).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/*  roadmapNodeSchema (tested via roadmapSchema.nodes[])               */
/* ------------------------------------------------------------------ */

describe('roadmapNodeSchema', () => {
  it('accepts valid node', () => {
    const result = roadmapSchema.safeParse(validRoadmap);
    expect(result.success).toBe(true);
  });

  it('rejects node missing id', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      nodes: [omit(validNode, 'id')],
    });
    expect(result.success).toBe(false);
  });

  it('rejects node missing position', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      nodes: [omit(validNode, 'position')],
    });
    expect(result.success).toBe(false);
  });

  it('rejects node with invalid position', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      nodes: [{ ...validNode, position: { x: 'a', y: 'b' } }],
    });
    expect(result.success).toBe(false);
  });

  it('accepts node with optional style', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      nodes: [{ ...validNode, style: { background: '#fff' } }],
    });
    expect(result.success).toBe(true);
  });
});

/* ------------------------------------------------------------------ */
/*  edgeSchema (tested via roadmapSchema.edges[])                      */
/* ------------------------------------------------------------------ */

describe('edgeSchema', () => {
  it('accepts valid edge', () => {
    const result = roadmapSchema.safeParse(validRoadmap);
    expect(result.success).toBe(true);
  });

  it('accepts edge with nullable sourceHandle and targetHandle', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      edges: [
        {
          ...validEdge,
          sourceHandle: null,
          targetHandle: null,
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('accepts edge with string sourceHandle and targetHandle', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      edges: [
        {
          ...validEdge,
          sourceHandle: 'handle-a',
          targetHandle: 'handle-b',
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('accepts edge with all optional fields', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      edges: [
        {
          ...validEdge,
          sourceHandle: 'a',
          targetHandle: 'b',
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#000' },
          data: { weight: 1 },
        },
      ],
    });
    expect(result.success).toBe(true);
  });

  it('rejects edge missing source', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      edges: [{ id: 'e-1', target: 'node-2' }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects edge missing target', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      edges: [{ id: 'e-1', source: 'node-1' }],
    });
    expect(result.success).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/*  roadmapSchema                                                      */
/* ------------------------------------------------------------------ */

describe('roadmapSchema', () => {
  it('accepts a valid complete roadmap', () => {
    const result = roadmapSchema.safeParse({
      ...validRoadmap,
      description: 'A learning roadmap',
      author: validAuthor,
    });
    expect(result.success).toBe(true);
  });

  it('rejects roadmap missing required id', () => {
    const result = roadmapSchema.safeParse(omit(validRoadmap, 'id'));
    expect(result.success).toBe(false);
  });

  it('rejects roadmap missing required title', () => {
    const result = roadmapSchema.safeParse(omit(validRoadmap, 'title'));
    expect(result.success).toBe(false);
  });

  it('rejects roadmap missing required isPublic', () => {
    const result = roadmapSchema.safeParse(omit(validRoadmap, 'isPublic'));
    expect(result.success).toBe(false);
  });

  it('rejects roadmap missing required createdAt', () => {
    const result = roadmapSchema.safeParse(omit(validRoadmap, 'createdAt'));
    expect(result.success).toBe(false);
  });

  it('rejects roadmap missing required updatedAt', () => {
    const result = roadmapSchema.safeParse(omit(validRoadmap, 'updatedAt'));
    expect(result.success).toBe(false);
  });

  it('succeeds without optional description and author', () => {
    const result = roadmapSchema.safeParse(validRoadmap);
    expect(result.success).toBe(true);
  });
});

/* ------------------------------------------------------------------ */
/*  roadmapsArraySchema                                                */
/* ------------------------------------------------------------------ */

describe('roadmapsArraySchema', () => {
  it('accepts an empty array', () => {
    const result = roadmapsArraySchema.safeParse([]);
    expect(result.success).toBe(true);
  });

  it('accepts an array of valid roadmaps', () => {
    const result = roadmapsArraySchema.safeParse([validRoadmap]);
    expect(result.success).toBe(true);
  });

  it('rejects a non-array value', () => {
    const result = roadmapsArraySchema.safeParse('not an array');
    expect(result.success).toBe(false);
  });

  it('rejects a non-array object', () => {
    const result = roadmapsArraySchema.safeParse({ data: [] });
    expect(result.success).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/*  parseRoadmaps                                                      */
/* ------------------------------------------------------------------ */

describe('parseRoadmaps', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('returns empty array for null input', () => {
    expect(parseRoadmaps(null)).toEqual([]);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('returns empty array for empty string', () => {
    expect(parseRoadmaps('')).toEqual([]);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('returns empty array and logs error for invalid JSON', () => {
    expect(parseRoadmaps('invalid json')).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to parse roadmap data from localStorage');
  });

  it('returns parsed array for valid JSON roadmaps', () => {
    const input = JSON.stringify([validRoadmap]);
    const result = parseRoadmaps(input);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: 1,
      title: 'Frontend Basics',
    });
  });

  it('filters out invalid entries instead of discarding all', () => {
    const invalid = JSON.stringify([{ id: 'bad', missing: 'fields' }]);
    expect(parseRoadmaps(invalid)).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Skipping invalid roadmap entry:',
      expect.anything(),
    );
  });

  it('returns empty array for valid JSON that is not an array', () => {
    const input = JSON.stringify({ id: 'single-object' });
    expect(parseRoadmaps(input)).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Invalid roadmap data in localStorage: expected array',
    );
  });
});
