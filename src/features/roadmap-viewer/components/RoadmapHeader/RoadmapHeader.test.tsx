import React from 'react';

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockBack = vi.fn();
const mockPush = vi.fn();
const mockForkMutate = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ back: mockBack, push: mockPush }),
}));

vi.mock('@/hooks/use-fork-status', () => ({
  useForkStatus: () => ({ data: undefined }),
}));

vi.mock('@/hooks/use-fork-roadmap', () => ({
  useForkRoadmap: () => ({ mutate: mockForkMutate, isPending: false }),
}));

import { RoadmapHeader } from './index';

describe('RoadmapHeader', () => {
  it('renders the default roadmap title', () => {
    render(<RoadmapHeader />);
    expect(screen.getByText("Jagalchi's Roadmap")).toBeTruthy();
  });

  it('renders a custom roadmap title', () => {
    render(<RoadmapHeader roadmapTitle="My Roadmap" />);
    expect(screen.getByText('My Roadmap')).toBeTruthy();
  });

  it('renders the back button', () => {
    render(<RoadmapHeader />);
    expect(screen.getByRole('button', { name: '뒤로가기' })).toBeTruthy();
  });

  it('renders the search input with placeholder', () => {
    render(<RoadmapHeader />);
    expect(screen.getByPlaceholderText('로드맵 안에서 검색')).toBeTruthy();
  });

  it('renders the AI feedback button', () => {
    render(<RoadmapHeader />);
    expect(screen.getByText('AI 학습 피드백')).toBeTruthy();
  });

  it('calls onAiFeedback when AI button is clicked', async () => {
    const onAiFeedback = vi.fn();
    render(<RoadmapHeader onAiFeedback={onAiFeedback} />);
    await userEvent.click(screen.getByText('AI 학습 피드백'));
    expect(onAiFeedback).toHaveBeenCalledTimes(1);
  });

  it('calls router.back when back button is clicked', async () => {
    mockBack.mockClear();
    render(<RoadmapHeader />);
    await userEvent.click(screen.getByRole('button', { name: '뒤로가기' }));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
