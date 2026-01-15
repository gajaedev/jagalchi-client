import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResourceDisplay } from './index';
import type { Resource } from '@/features/editor/types/editor.types';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ArrowUpRight: () => <span data-testid="arrow-up-right-icon" />,
  X: () => <span data-testid="x-icon" />,
}));

describe('ResourceDisplay', () => {
  const mockResource: Resource = {
    id: '1',
    url: 'https://example.com/resource',
    title: 'Example Resource',
  };

  describe('렌더링', () => {
    it('리소스 URL을 clickable link로 렌더링한다', () => {
      render(<ResourceDisplay resource={mockResource} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', mockResource.url);
      expect(link).toHaveTextContent(mockResource.url);
    });

    it('새 탭으로 열리도록 설정한다', () => {
      render(<ResourceDisplay resource={mockResource} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('아이콘', () => {
    it('showIcon이 true일 때 ArrowUpRight 아이콘을 표시한다', () => {
      render(<ResourceDisplay resource={mockResource} showIcon={true} />);

      expect(screen.getByTestId('arrow-up-right-icon')).toBeInTheDocument();
    });

    it('showIcon이 false일 때 아이콘을 숨긴다', () => {
      render(<ResourceDisplay resource={mockResource} showIcon={false} />);

      expect(screen.queryByTestId('arrow-up-right-icon')).not.toBeInTheDocument();
    });

    it('showIcon 기본값은 true다', () => {
      render(<ResourceDisplay resource={mockResource} />);

      expect(screen.getByTestId('arrow-up-right-icon')).toBeInTheDocument();
    });
  });

  describe('삭제 버튼', () => {
    it('onDelete가 제공되면 삭제 버튼을 렌더링한다', () => {
      render(<ResourceDisplay resource={mockResource} onDelete={vi.fn()} />);

      expect(screen.getByLabelText('자료 삭제')).toBeInTheDocument();
      expect(screen.getByTestId('x-icon')).toBeInTheDocument();
    });

    it('onDelete가 없으면 삭제 버튼을 렌더링하지 않는다', () => {
      render(<ResourceDisplay resource={mockResource} />);

      expect(screen.queryByLabelText('자료 삭제')).not.toBeInTheDocument();
    });

    it('삭제 버튼 클릭 시 onDelete를 resource id와 함께 호출한다', async () => {
      const user = userEvent.setup();
      const onDelete = vi.fn();
      render(<ResourceDisplay resource={mockResource} onDelete={onDelete} />);

      const deleteButton = screen.getByLabelText('자료 삭제');
      await user.click(deleteButton);

      expect(onDelete).toHaveBeenCalledWith(mockResource.id);
    });
  });

  describe('스타일링', () => {
    it('custom className을 적용한다', () => {
      const { container } = render(
        <ResourceDisplay resource={mockResource} className="custom-class" />,
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('링크 truncate를 적용한다', () => {
      render(<ResourceDisplay resource={mockResource} />);

      const link = screen.getByRole('link');
      const textElement = link.querySelector('.truncate');
      expect(textElement).toBeInTheDocument();
    });
  });
});
