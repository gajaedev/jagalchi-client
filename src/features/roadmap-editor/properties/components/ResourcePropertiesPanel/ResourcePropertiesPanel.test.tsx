import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ResourcePropertiesPanel } from './index';

describe('ResourcePropertiesPanel', () => {
  const mockResource = {
    id: '1',
    title: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    isLocked: false,
  };

  it('renders correctly with given resource data', () => {
    render(<ResourcePropertiesPanel resource={mockResource} />);

    // PanelHeader title
    expect(screen.getByText('MDN Web Docs')).toBeInTheDocument();

    // EditorInput values
    expect(screen.getByDisplayValue('MDN Web Docs')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://developer.mozilla.org')).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    const onChange = vi.fn();
    render(<ResourcePropertiesPanel resource={mockResource} onChange={onChange} />);

    // Since 'EditorInput' uses an input element, we query it and type
    const titleInput = screen.getByDisplayValue('MDN Web Docs');
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'New Title');

    expect(onChange).toHaveBeenCalled();
  });
});
