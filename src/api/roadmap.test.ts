import { beforeEach, describe, expect, it, vi } from 'vitest';

import { forkRoadmap, getForkStatus, getForkTree, getPopularRoadmaps } from './roadmap';

vi.mock('./client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

import { apiClient } from './client';

describe('forkRoadmap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls POST /roadmaps/{id}/fork', () => {
    forkRoadmap(123);
    expect(apiClient.post).toHaveBeenCalledWith('/roadmaps/123/fork');
  });
});

describe('getForkTree', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /roadmaps/{id}/fork-tree', () => {
    getForkTree(456);
    expect(apiClient.get).toHaveBeenCalledWith('/roadmaps/456/fork-tree');
  });
});

describe('getForkStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /roadmaps/{id}/fork-status', () => {
    getForkStatus(999);
    expect(apiClient.get).toHaveBeenCalledWith('/roadmaps/999/fork-status');
  });
});

describe('getPopularRoadmaps', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls GET /roadmaps/popular with no params', () => {
    getPopularRoadmaps();
    expect(apiClient.get).toHaveBeenCalledWith('/roadmaps/popular');
  });

  it('calls GET /roadmaps/popular with query string when params provided', () => {
    getPopularRoadmaps({ page: 0, size: 10, sortBy: 'forks' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('/roadmaps/popular?');
    expect(call).toContain('page=0');
    expect(call).toContain('size=10');
    expect(call).toContain('sortBy=forks');
  });

  it('supports sortBy=views', () => {
    getPopularRoadmaps({ sortBy: 'views' });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('sortBy=views');
  });

  it('omits undefined params from query string', () => {
    getPopularRoadmaps({ page: 1 });
    const call = vi.mocked(apiClient.get).mock.calls[0][0] as string;
    expect(call).toContain('page=1');
    expect(call).not.toContain('sortBy');
    expect(call).not.toContain('size');
  });
});
