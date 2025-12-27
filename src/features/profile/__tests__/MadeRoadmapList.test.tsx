import { render, screen } from '@testing-library/react';
import { Provider, WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect, vi } from 'vitest';

import CreatedRoadmapList from '../components/atoms/MadeRoadmapList';
import { profileModeAtom } from '../stores/profile-atoms';

vi.mock('../components/atoms/RoadmapCard', () => ({
  RoadmapCard: ({ title }: { title: string }) => <div data-testid="roadmap-card">{title}</div>,
}));

vi.mock('../components/atoms/AddRoadmapModal', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="add-roadmap-modal">{children}</div>
  ),
}));

interface WrapperProps {
  initialValues: (readonly [WritableAtom<unknown, any[], any>, unknown])[];
  children: React.ReactNode;
}

const HydrateAtoms = ({ initialValues, children }: WrapperProps) => {
  useHydrateAtoms(initialValues);
  return children;
};

const Wrapper = ({ initialValues, children }: WrapperProps) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

describe('MadeRoadmapList', () => {
  it('renders list of roadmaps in view mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'show']]}>
        <CreatedRoadmapList />
      </Wrapper>,
    );
    expect(screen.getByText('만든 로드맵')).toBeInTheDocument();
    expect(screen.getAllByTestId('roadmap-card').length).toBeGreaterThan(0);
    expect(screen.queryByText('공개 로드맵 추가')).not.toBeInTheDocument();
  });

  it('renders add button in edit mode', () => {
    render(
      <Wrapper initialValues={[[profileModeAtom, 'edit']]}>
        <CreatedRoadmapList />
      </Wrapper>,
    );
    expect(screen.getByText('공개 로드맵 추가')).toBeInTheDocument();
  });
});
