import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RoadmapAiModal } from './index';

describe('RoadmapAiModal', () => {
  const mockOnClose = vi.fn();

  it('열려있을 때 모달을 렌더링한다', () => {
    render(<RoadmapAiModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '로드맵 생성' })).toBeInTheDocument();
  });

  it('닫혀있을 때 모달을 렌더링하지 않는다', () => {
    render(<RoadmapAiModal isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('Sparkles 아이콘과 제목을 표시한다', () => {
    render(<RoadmapAiModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByRole('heading', { name: '로드맵 생성' })).toBeInTheDocument();
  });

  it('Close 버튼 클릭 시 onClose를 호출한다', async () => {
    const user = userEvent.setup();

    render(<RoadmapAiModal isOpen={true} onClose={mockOnClose} />);

    const closeButton = screen.getByLabelText('Close dialog');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('탭을 전환할 수 있다', async () => {
    const user = userEvent.setup();

    render(<RoadmapAiModal isOpen={true} onClose={mockOnClose} />);

    // 초기 상태는 "로드맵 생성"
    expect(screen.getByRole('heading', { name: '로드맵 생성' })).toBeInTheDocument();

    // "로드맵 수정" 탭 클릭
    const editTab = screen.getByRole('button', { name: '로드맵 수정' });
    await user.click(editTab);

    // 제목이 변경되었는지 확인
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: '로드맵 수정' })).toBeInTheDocument();
    });
  });

  it('활성화된 탭은 aria-pressed가 true이다', async () => {
    const user = userEvent.setup();

    render(<RoadmapAiModal isOpen={true} onClose={mockOnClose} />);

    const createTab = screen.getByRole('button', { name: '로드맵 생성' });
    const editTab = screen.getByRole('button', { name: '로드맵 수정' });

    // 초기 상태
    expect(createTab).toHaveAttribute('aria-pressed', 'true');
    expect(editTab).toHaveAttribute('aria-pressed', 'false');

    // "로드맵 수정" 탭 클릭
    await user.click(editTab);

    // 상태 변경 확인
    await waitFor(() => {
      expect(createTab).toHaveAttribute('aria-pressed', 'false');
      expect(editTab).toHaveAttribute('aria-pressed', 'true');
    });
  });

  it('각 탭에 맞는 콘텐츠를 표시한다', async () => {
    const user = userEvent.setup();

    render(<RoadmapAiModal isOpen={true} onClose={mockOnClose} />);

    // "로드맵 생성" 콘텐츠
    expect(screen.getByText('로드맵 생성 폼이 여기에 표시됩니다.')).toBeInTheDocument();

    // "로드맵 수정" 탭 클릭
    const editTab = screen.getByRole('button', { name: '로드맵 수정' });
    await user.click(editTab);

    // "로드맵 수정" 콘텐츠
    await waitFor(() => {
      expect(screen.getByText('로드맵 수정 폼이 여기에 표시됩니다.')).toBeInTheDocument();
    });
  });
});
