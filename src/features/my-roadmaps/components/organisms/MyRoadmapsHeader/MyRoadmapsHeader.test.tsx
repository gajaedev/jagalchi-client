import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MyRoadmapsHeader } from './index';

describe('MyRoadmapsHeader', () => {
  it('renders title correctly', () => {
    render(<MyRoadmapsHeader />);
    expect(screen.getByText('내 로드맵')).toBeDefined();
  });

  it('renders user name correctly', () => {
    render(<MyRoadmapsHeader userName="John" />);
    expect(screen.getByText(/John’s 로드맵/)).toBeDefined();
  });
});
