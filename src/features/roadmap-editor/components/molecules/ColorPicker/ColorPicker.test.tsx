import { render } from '@testing-library/react';
import { Provider } from 'jotai';
import { describe, expect, it } from 'vitest';

import { ColorPicker } from '.';

describe('ColorPicker', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Provider>
        <ColorPicker />
      </Provider>,
    );
    expect(container).toBeInTheDocument();
  });

  it('is a React component (memo wrapped)', () => {
    expect(typeof ColorPicker).toBe('object');
    expect(ColorPicker).toBeDefined();
  });

  it('renders with Provider wrapper', () => {
    const { container } = render(
      <Provider>
        <ColorPicker />
      </Provider>,
    );
    expect(container.firstChild).toBeDefined();
  });
});
