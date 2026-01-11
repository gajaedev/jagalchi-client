import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { TextSidebar } from './index';

describe('TextSidebar', () => {
  const defaultTextData = {
    content: 'Test Content',
    fontSize: 16,
    fontWeight: 'normal' as const,
    color: '#000000',
    locked: false,
  };

  it('does not render when closed', () => {
    render(<TextSidebar open={false} onOpenChange={vi.fn()} />);

    expect(screen.queryByText('텍스트 편집')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    render(<TextSidebar open={true} onOpenChange={vi.fn()} />);

    expect(screen.getByText('텍스트 편집')).toBeInTheDocument();
  });

  it('displays text data', () => {
    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const contentTextarea = screen.getByLabelText('텍스트 내용');
    expect(contentTextarea).toHaveValue('Test Content');

    const fontSizeInput = screen.getByLabelText('글자 크기');
    expect(fontSizeInput).toHaveValue(16);
  });

  it('allows changing text content', async () => {
    const user = userEvent.setup();

    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const contentTextarea = screen.getByLabelText('텍스트 내용');
    await user.clear(contentTextarea);
    await user.type(contentTextarea, 'New Content');

    expect(contentTextarea).toHaveValue('New Content');
  });

  it('allows changing font size', async () => {
    const user = userEvent.setup();

    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const fontSizeInput = screen.getByLabelText('글자 크기');
    await user.clear(fontSizeInput);
    await user.type(fontSizeInput, '24');

    expect(fontSizeInput).toHaveValue(24);
  });

  it('allows toggling font weight', async () => {
    const user = userEvent.setup();

    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const boldButton = screen.getByRole('button', { name: /굵게/ });
    await user.click(boldButton);

    expect(boldButton).toHaveClass(/default/);
  });

  it('calls onSave with updated data', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(
      <TextSidebar
        open={true}
        onOpenChange={vi.fn()}
        textData={defaultTextData}
        onSave={handleSave}
      />,
    );

    const saveButton = screen.getByRole('button', { name: '저장' });
    await user.click(saveButton);

    expect(handleSave).toHaveBeenCalledWith({
      content: 'Test Content',
      fontSize: 16,
      fontWeight: 'normal',
      color: '#000000',
      locked: false,
    });
  });

  it('increments font size with plus button', async () => {
    const user = userEvent.setup();

    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const plusButton = screen.getByRole('button', { name: '글자 크기 증가' });
    await user.click(plusButton);

    const fontSizeInput = screen.getByLabelText('글자 크기');
    expect(fontSizeInput).toHaveValue(17);
  });

  it('decrements font size with minus button', async () => {
    const user = userEvent.setup();

    render(<TextSidebar open={true} onOpenChange={vi.fn()} textData={defaultTextData} />);

    const minusButton = screen.getByRole('button', { name: '글자 크기 감소' });
    await user.click(minusButton);

    const fontSizeInput = screen.getByLabelText('글자 크기');
    expect(fontSizeInput).toHaveValue(15);
  });
});
