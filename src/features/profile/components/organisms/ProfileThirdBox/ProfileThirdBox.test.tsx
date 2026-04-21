import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { PROFILE_MESSAGES } from '@/constants/messages';

import { ProfileThirdBox } from './index';

describe('ProfileThirdBox', () => {
  it('renders completed roadmap section', () => {
    render(<ProfileThirdBox userName="testUser" />);
    expect(screen.getByText(PROFILE_MESSAGES.COMPLETED_ROADMAP)).toBeInTheDocument();
  });

  it('renders in-progress roadmap section', () => {
    render(<ProfileThirdBox userName="testUser" />);
    expect(screen.getByText(PROFILE_MESSAGES.IN_PROGRESS_ROADMAP)).toBeInTheDocument();
  });
});
