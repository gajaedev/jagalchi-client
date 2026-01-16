import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import { EditorCanvas } from './index';

describe('EditorCanvas', () => {
  it('renders without crashing', () => {
    const { container } = render(<EditorCanvas />);
    expect(container.querySelector('.react-flow')).toBeInTheDocument();
  });

  it('renders with background, controls, and minimap', () => {
    const { container } = render(<EditorCanvas />);

    // Check for React Flow components
    expect(container.querySelector('.react-flow__background')).toBeInTheDocument();
    expect(container.querySelector('.react-flow__controls')).toBeInTheDocument();
    expect(container.querySelector('.react-flow__minimap')).toBeInTheDocument();
  });
});
