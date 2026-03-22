import { render, screen } from '@testing-library/react';
import { Provider, WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

import { PROFILE_MESSAGES } from '@/constants/messages';

import { profileImageAtom, profileModeAtom } from '../../../stores/profile-atoms';

import { Profile } from './index';

interface WrapperProps {
  initialValues: (readonly [WritableAtom<unknown, any[], any>, unknown])[];
  children: React.ReactNode;
}

const HydrateAtoms = ({ initialValues, children }: WrapperProps) => {
  useHydrateAtoms(initialValues);
  return children;
};

const TestProvider = ({ initialValues, children }: WrapperProps) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

const defaultAtoms: (readonly [WritableAtom<unknown, any[], any>, unknown])[] = [
  [profileModeAtom, 'show'],
  [profileImageAtom, '/profile.svg'],
];

describe('Profile', () => {
  it('renders the user name', () => {
    render(
      <TestProvider initialValues={defaultAtoms}>
        <Profile />
      </TestProvider>,
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders the user email', () => {
    render(
      <TestProvider initialValues={defaultAtoms}>
        <Profile />
      </TestProvider>,
    );
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('renders the bio section', () => {
    render(
      <TestProvider initialValues={defaultAtoms}>
        <Profile />
      </TestProvider>,
    );
    expect(screen.getByText(PROFILE_MESSAGES.BIO_TITLE)).toBeInTheDocument();
  });

  it('renders the streak section', () => {
    render(
      <TestProvider initialValues={defaultAtoms}>
        <Profile />
      </TestProvider>,
    );
    expect(screen.getByText(/일 연속 스트릭/)).toBeInTheDocument();
  });

  it('renders completed and in-progress roadmap sections', () => {
    render(
      <TestProvider initialValues={defaultAtoms}>
        <Profile />
      </TestProvider>,
    );
    expect(screen.getByText(PROFILE_MESSAGES.COMPLETED_ROADMAP)).toBeInTheDocument();
    expect(screen.getByText(PROFILE_MESSAGES.IN_PROGRESS_ROADMAP)).toBeInTheDocument();
  });

  it('renders made roadmap section', () => {
    render(
      <TestProvider initialValues={defaultAtoms}>
        <Profile />
      </TestProvider>,
    );
    expect(screen.getByText(PROFILE_MESSAGES.MADE_ROADMAP)).toBeInTheDocument();
  });
});
