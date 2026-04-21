import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { Provider, type WritableAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

const mockProfileData = {
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImageUrl: null,
    bio: '안녕하세요, 프론트엔드 개발자입니다.',
    isFollowed: false,
    stats: { followersCount: 10, followingCount: 5 },
    externalLinks: {},
  },
  streak: {
    currentStreak: 7,
    activities: [],
  },
};

vi.mock('../../../hooks/use-profile', () => ({
  useProfile: vi.fn(() => ({
    data: mockProfileData,
    isLoading: false,
    isError: false,
  })),
}));

vi.mock('../../../hooks/use-profile-roadmaps', () => ({
  useProfileRoadmaps: vi.fn(() => ({
    data: [],
    isLoading: false,
  })),
}));

import { PROFILE_MESSAGES } from '@/constants/messages';

import { useProfile } from '../../../hooks/use-profile';
import { profileModeAtom, profileImageAtom } from '../../../stores/profile-atoms';

import { Profile } from './index';

interface WrapperProps {
  initialValues: (readonly [WritableAtom<unknown, unknown[], unknown>, unknown])[];
  children: React.ReactNode;
}

const HydrateAtoms = ({ initialValues, children }: WrapperProps) => {
  useHydrateAtoms(initialValues);
  return children;
};

const TestProvider = ({ initialValues, children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>
    <Provider>
      <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
    </Provider>
  </QueryClientProvider>
);

const defaultAtoms: (readonly [WritableAtom<unknown, unknown[], unknown>, unknown])[] = [
  [profileModeAtom as WritableAtom<unknown, unknown[], unknown>, 'show'],
  [profileImageAtom as WritableAtom<unknown, unknown[], unknown>, '/profile.svg'],
];

describe('Profile', () => {
  beforeEach(() => {
    vi.mocked(useProfile).mockReturnValue({
      data: mockProfileData,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useProfile>);
  });

  it('renders the user name', () => {
    render(
      <TestProvider initialValues={defaultAtoms}>
        <Profile userName="John Doe" />
      </TestProvider>,
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders the user email', () => {
    render(
      <TestProvider initialValues={defaultAtoms}>
        <Profile userName="John Doe" />
      </TestProvider>,
    );
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('renders the bio section', () => {
    render(
      <TestProvider initialValues={defaultAtoms}>
        <Profile userName="John Doe" />
      </TestProvider>,
    );
    expect(screen.getByText(PROFILE_MESSAGES.BIO_TITLE)).toBeInTheDocument();
  });

  it('renders the streak section', () => {
    render(
      <TestProvider initialValues={defaultAtoms}>
        <Profile userName="John Doe" />
      </TestProvider>,
    );
    expect(screen.getByText(/일 연속 스트릭/)).toBeInTheDocument();
  });

  it('renders completed and in-progress roadmap sections', () => {
    render(
      <TestProvider initialValues={defaultAtoms}>
        <Profile userName="John Doe" />
      </TestProvider>,
    );
    expect(screen.getByText(PROFILE_MESSAGES.COMPLETED_ROADMAP)).toBeInTheDocument();
    expect(screen.getByText(PROFILE_MESSAGES.IN_PROGRESS_ROADMAP)).toBeInTheDocument();
  });

  it('renders made roadmap section', () => {
    render(
      <TestProvider initialValues={defaultAtoms}>
        <Profile userName="John Doe" />
      </TestProvider>,
    );
    expect(screen.getByText(PROFILE_MESSAGES.MADE_ROADMAP)).toBeInTheDocument();
  });

  it('shows loading state', () => {
    vi.mocked(useProfile).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as unknown as ReturnType<typeof useProfile>);

    render(
      <TestProvider initialValues={defaultAtoms}>
        <Profile userName="John Doe" />
      </TestProvider>,
    );
    expect(screen.getByText(PROFILE_MESSAGES.LOADING)).toBeInTheDocument();
  });

  it('shows error state', () => {
    vi.mocked(useProfile).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as unknown as ReturnType<typeof useProfile>);

    render(
      <TestProvider initialValues={defaultAtoms}>
        <Profile userName="John Doe" />
      </TestProvider>,
    );
    expect(screen.getByText(PROFILE_MESSAGES.ERROR)).toBeInTheDocument();
  });
});
