import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { ResourceInput } from './index';

describe('ResourceInput', () => {
  it('renders URL and title inputs', () => {
    render(<ResourceInput url="" title="" onUrlChange={vi.fn()} onTitleChange={vi.fn()} />);

    expect(screen.getByLabelText('자료 링크')).toBeInTheDocument();
    expect(screen.getByLabelText('자료 제목')).toBeInTheDocument();
  });

  it('displays current URL and title values', () => {
    render(
      <ResourceInput
        url="https://example.com"
        title="Example Resource"
        onUrlChange={vi.fn()}
        onTitleChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('자료 링크')).toHaveValue('https://example.com');
    expect(screen.getByLabelText('자료 제목')).toHaveValue('Example Resource');
  });

  it('calls onUrlChange when URL input changes', async () => {
    const user = userEvent.setup();
    const handleUrlChange = vi.fn();

    render(<ResourceInput url="" title="" onUrlChange={handleUrlChange} onTitleChange={vi.fn()} />);

    const urlInput = screen.getByLabelText('자료 링크');
    await user.type(urlInput, 'https://test.com');

    expect(handleUrlChange).toHaveBeenCalled();
  });

  it('calls onTitleChange when title input changes', async () => {
    const user = userEvent.setup();
    const handleTitleChange = vi.fn();

    render(
      <ResourceInput url="" title="" onUrlChange={vi.fn()} onTitleChange={handleTitleChange} />,
    );

    const titleInput = screen.getByLabelText('자료 제목');
    await user.type(titleInput, 'Test Title');

    expect(handleTitleChange).toHaveBeenCalled();
  });

  it('renders remove button when onRemove is provided', () => {
    render(
      <ResourceInput
        url=""
        title=""
        onUrlChange={vi.fn()}
        onTitleChange={vi.fn()}
        onRemove={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: '자료 삭제' })).toBeInTheDocument();
  });

  it('does not render remove button when onRemove is not provided', () => {
    render(<ResourceInput url="" title="" onUrlChange={vi.fn()} onTitleChange={vi.fn()} />);

    expect(screen.queryByRole('button', { name: '자료 삭제' })).not.toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', async () => {
    const user = userEvent.setup();
    const handleRemove = vi.fn();

    render(
      <ResourceInput
        url=""
        title=""
        onUrlChange={vi.fn()}
        onTitleChange={vi.fn()}
        onRemove={handleRemove}
      />,
    );

    const removeButton = screen.getByRole('button', { name: '자료 삭제' });
    await user.click(removeButton);

    expect(handleRemove).toHaveBeenCalledOnce();
  });

  it('uses custom placeholders when provided', () => {
    render(
      <ResourceInput
        url=""
        title=""
        onUrlChange={vi.fn()}
        onTitleChange={vi.fn()}
        placeholder={{
          url: 'Custom URL placeholder',
          title: 'Custom title placeholder',
        }}
      />,
    );

    expect(screen.getByLabelText('자료 링크')).toHaveAttribute(
      'placeholder',
      'Custom URL placeholder',
    );
    expect(screen.getByLabelText('자료 제목')).toHaveAttribute(
      'placeholder',
      'Custom title placeholder',
    );
  });
});
