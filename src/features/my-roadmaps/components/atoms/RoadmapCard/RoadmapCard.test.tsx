import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RoadmapCard } from './index';

describe('RoadmapCard', () => {
  const defaultProps = {
    title: 'Test Roadmap',
  };

  it('renders title correctly', () => {
    render(<RoadmapCard {...defaultProps} />);
    expect(screen.getByText('Test Roadmap')).toBeDefined();
  });

  it('renders directory type correctly', () => {
    render(<RoadmapCard title="Directory Name" type="Directory" fileCount={67} />);
    expect(screen.getByText('Directory Name')).toBeDefined();
    expect(screen.getByText('67개의 파일')).toBeDefined();
  });

  it('renders roadmap type with author correctly', () => {
    render(<RoadmapCard title="Roadmap Name" type="Roadmap" author="홍길동" />);
    expect(screen.getByText('Roadmap Name')).toBeDefined();
    expect(screen.getByText('By 홍길동')).toBeDefined();
  });
});
