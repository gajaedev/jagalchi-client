import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ResourceCard } from './index';

describe('ResourceCard', () => {
  const mockResource = {
    title: 'React Documentation',
    url: 'https://react.dev',
  };

  it('리소스 제목과 URL을 렌더링한다', () => {
    render(<ResourceCard title={mockResource.title} url={mockResource.url} />);

    expect(screen.getByText(mockResource.title)).toBeInTheDocument();
    expect(screen.getByText(mockResource.url)).toBeInTheDocument();
  });

  it('URL은 새 탭에서 열린다', () => {
    render(<ResourceCard title={mockResource.title} url={mockResource.url} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockResource.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('onAdd가 제공되면 Add 버튼을 표시한다', () => {
    const handleAdd = vi.fn();

    render(<ResourceCard title={mockResource.title} url={mockResource.url} onAdd={handleAdd} />);

    expect(screen.getByRole('button', { name: `Add ${mockResource.title}` })).toBeInTheDocument();
  });

  it('onAdd가 없으면 Add 버튼을 표시하지 않는다', () => {
    render(<ResourceCard title={mockResource.title} url={mockResource.url} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('Add 버튼 클릭 시 onAdd를 호출한다', async () => {
    const handleAdd = vi.fn();
    const user = userEvent.setup();

    render(<ResourceCard title={mockResource.title} url={mockResource.url} onAdd={handleAdd} />);

    const addButton = screen.getByRole('button', { name: `Add ${mockResource.title}` });
    await user.click(addButton);

    expect(handleAdd).toHaveBeenCalledTimes(1);
  });
});
