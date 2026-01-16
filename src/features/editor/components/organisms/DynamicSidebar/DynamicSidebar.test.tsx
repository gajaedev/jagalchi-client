import { render } from '@testing-library/react';
import { Provider } from 'jotai';
import { describe, it, expect } from 'vitest';

import { DynamicSidebar } from './index';

describe('DynamicSidebar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Provider>
        <DynamicSidebar />
      </Provider>,
    );

    expect(container).toBeInTheDocument();
  });

  it('renders nothing when no selection by default', () => {
    const { container } = render(
      <Provider>
        <DynamicSidebar />
      </Provider>,
    );

    expect(container.firstChild).toBeNull();
  });
});
