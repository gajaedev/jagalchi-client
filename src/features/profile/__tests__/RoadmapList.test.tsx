import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { RoadmapList } from '../components/molecules/RoadmapList';

describe('RoadmapList', () => {
  it('renders correctly for "end" variant', () => {
    render(<RoadmapList variant="end" />);
    expect(screen.getByText('완주한 로드맵')).toBeInTheDocument();
  });

  it('renders correctly for "process" variant', () => {
    render(<RoadmapList variant="process" />);
    expect(screen.getByText('진행중인 로드맵')).toBeInTheDocument();
  });
});
