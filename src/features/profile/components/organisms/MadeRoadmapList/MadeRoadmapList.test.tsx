import { render, screen } from '@testing-library/react';
import { Provider, WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect, vi } from 'vitest';

import { profileModeAtom } from '../../../stores/profile-atoms';

import { MadeRoadmapList } from './index';

vi.mock('../../../hooks/use-profile-roadmaps', () => ({
  useProfileRoadmaps: () => ({
    data: [
      { id: 1, title: 'Roadmap Name', owner: { id: 1, nickname: '홍길동', profileImageUrl: null } },
      {
        id: 2,
        title: 'Roadmap Name 2',
        owner: { id: 1, nickname: '홍길동', profileImageUrl: null },
      },
    ],
    isLoading: false,
  }),
}));

vi.mock('../AddRoadmapModal', () => ({
  AddRoadmapModal: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="add-roadmap-modal">{children}</div>
  ),
}));

interface WrapperProps {
  initialValues: (readonly [WritableAtom<unknown, unknown[], unknown>, unknown])[];
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
      <Wrapper
        initialValues={[[profileModeAtom as WritableAtom<unknown, unknown[], unknown>, 'show']]}
      >
        <MadeRoadmapList userName="홍길동" />
      </Wrapper>,
    );
    expect(screen.getByText('만든 로드맵')).toBeInTheDocument();
    expect(screen.getAllByTestId('roadmap-card').length).toBeGreaterThan(0);
    expect(screen.queryByText('공개 로드맵 추가')).not.toBeInTheDocument();
  });

  it('renders add button in edit mode', () => {
    render(
      <Wrapper
        initialValues={[[profileModeAtom as WritableAtom<unknown, unknown[], unknown>, 'edit']]}
      >
        <MadeRoadmapList userName="홍길동" />
      </Wrapper>,
    );
    expect(screen.getByText('공개 로드맵 추가')).toBeInTheDocument();
  });
});
