import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { AIMenu } from './index';
import { EDITOR_MESSAGES } from '@/constants/messages';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Sparkles: () => <span data-testid="sparkles-icon" />,
}));

describe('AIMenu', () => {
  describe('렌더링', () => {
    it('Sparkles 아이콘 트리거를 렌더링한다', () => {
      render(<AIMenu onActionSelect={vi.fn()} />);

      expect(screen.getByTestId('sparkles-icon')).toBeInTheDocument();
      expect(screen.getByLabelText(EDITOR_MESSAGES.AI_MENU_LABEL)).toBeInTheDocument();
    });

    it('disabled 상태를 적용한다', () => {
      render(<AIMenu onActionSelect={vi.fn()} disabled={true} />);

      const trigger = screen.getByLabelText(EDITOR_MESSAGES.AI_MENU_LABEL);
      expect(trigger).toBeDisabled();
    });

    it('custom className을 적용한다', () => {
      render(<AIMenu onActionSelect={vi.fn()} className="custom-class" />);

      const trigger = screen.getByLabelText(EDITOR_MESSAGES.AI_MENU_LABEL);
      expect(trigger).toHaveClass('custom-class');
    });
  });

  describe('드롭다운 메뉴', () => {
    it('트리거 클릭 시 2개의 메뉴 항목을 표시한다', async () => {
      const user = userEvent.setup();
      render(<AIMenu onActionSelect={vi.fn()} />);

      const trigger = screen.getByLabelText(EDITOR_MESSAGES.AI_MENU_LABEL);
      await user.click(trigger);

      expect(screen.getByText(EDITOR_MESSAGES.AI_GENERATE_ROADMAP)).toBeInTheDocument();
      expect(screen.getByText(EDITOR_MESSAGES.AI_MODIFY_ROADMAP)).toBeInTheDocument();
    });

    it('"로드맵 생성" 클릭 시 generate action을 호출한다', async () => {
      const user = userEvent.setup();
      const onActionSelect = vi.fn();
      render(<AIMenu onActionSelect={onActionSelect} />);

      const trigger = screen.getByLabelText(EDITOR_MESSAGES.AI_MENU_LABEL);
      await user.click(trigger);

      const generateItem = screen.getByText(EDITOR_MESSAGES.AI_GENERATE_ROADMAP);
      await user.click(generateItem);

      expect(onActionSelect).toHaveBeenCalledWith('generate');
    });

    it('"로드맵 수정" 클릭 시 modify action을 호출한다', async () => {
      const user = userEvent.setup();
      const onActionSelect = vi.fn();
      render(<AIMenu onActionSelect={onActionSelect} />);

      const trigger = screen.getByLabelText(EDITOR_MESSAGES.AI_MENU_LABEL);
      await user.click(trigger);

      const modifyItem = screen.getByText(EDITOR_MESSAGES.AI_MODIFY_ROADMAP);
      await user.click(modifyItem);

      expect(onActionSelect).toHaveBeenCalledWith('modify');
    });
  });

  describe('제어된 상태', () => {
    it('isOpen prop으로 드롭다운 상태를 제어한다', () => {
      render(<AIMenu onActionSelect={vi.fn()} isOpen={true} />);

      expect(screen.getByText(EDITOR_MESSAGES.AI_GENERATE_ROADMAP)).toBeInTheDocument();
    });

    it('onOpenChange 콜백을 호출한다', async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      render(<AIMenu onActionSelect={vi.fn()} onOpenChange={onOpenChange} />);

      const trigger = screen.getByLabelText(EDITOR_MESSAGES.AI_MENU_LABEL);
      await user.click(trigger);

      expect(onOpenChange).toHaveBeenCalled();
    });
  });
});
