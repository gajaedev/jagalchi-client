import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ContributionGraph } from './index';

describe('ContributionGraph', () => {
  it('renders correctly', () => {
    const { container } = render(<ContributionGraph data={[]} />);
    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
