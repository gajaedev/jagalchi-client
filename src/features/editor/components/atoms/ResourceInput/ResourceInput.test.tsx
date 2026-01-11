import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';

import { ResourceInput } from './index';

vi.mock('lucide-react', () => ({
  X: () => <span data-testid="x-icon" />,
}));

describe('ResourceInput', () => {
  it('URL과 title 입력 필드가 렌더링된다', () => {
    render(<ResourceInput url="" title="" onUrlChange={vi.fn()} onTitleChange={vi.fn()} />);

    expect(screen.getByLabelText('자료 링크')).toBeInTheDocument();
    expect(screen.getByLabelText('자료 제목')).toBeInTheDocument();
  });

  it('현재 URL과 title 값을 표시한다', () => {
    render(
      <ResourceInput
        url="https://example.com"
        title="예제 자료"
        onUrlChange={vi.fn()}
        onTitleChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('자료 링크')).toHaveValue('https://example.com');
    expect(screen.getByLabelText('자료 제목')).toHaveValue('예제 자료');
  });

  it('URL 입력 변경 시 onUrlChange를 호출한다', async () => {
    const user = userEvent.setup();
    const handleUrlChange = vi.fn();

    render(<ResourceInput url="" title="" onUrlChange={handleUrlChange} onTitleChange={vi.fn()} />);

    const urlInput = screen.getByLabelText('자료 링크');
    await user.type(urlInput, 'https://test.com');

    // 각 글자마다 호출되므로 여러 번 호출된다
    expect(handleUrlChange).toHaveBeenCalled();
    expect(handleUrlChange).toHaveBeenCalledWith('https://test.com');
  });

  it('title 입력 변경 시 onTitleChange를 호출한다', async () => {
    const user = userEvent.setup();
    const handleTitleChange = vi.fn();

    render(
      <ResourceInput url="" title="" onUrlChange={vi.fn()} onTitleChange={handleTitleChange} />,
    );

    const titleInput = screen.getByLabelText('자료 제목');
    await user.type(titleInput, '테스트');

    expect(handleTitleChange).toHaveBeenCalled();
    expect(handleTitleChange).toHaveBeenCalledWith('테스트');
  });

  it('onRemove가 제공되면 삭제 버튼이 렌더링된다', () => {
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

  it('onRemove가 제공되지 않으면 삭제 버튼이 렌더링되지 않는다', () => {
    render(<ResourceInput url="" title="" onUrlChange={vi.fn()} onTitleChange={vi.fn()} />);

    expect(screen.queryByRole('button', { name: '자료 삭제' })).not.toBeInTheDocument();
  });

  it('삭제 버튼 클릭 시 onRemove를 호출한다', async () => {
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

    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('커스텀 placeholder가 제공되면 사용한다', () => {
    render(
      <ResourceInput
        url=""
        title=""
        onUrlChange={vi.fn()}
        onTitleChange={vi.fn()}
        placeholder={{
          url: '커스텀 URL 입력',
          title: '커스텀 제목 입력',
        }}
      />,
    );

    expect(screen.getByLabelText('자료 링크')).toHaveAttribute('placeholder', '커스텀 URL 입력');
    expect(screen.getByLabelText('자료 제목')).toHaveAttribute('placeholder', '커스텀 제목 입력');
  });

  it('기본 placeholder를 사용한다', () => {
    render(<ResourceInput url="" title="" onUrlChange={vi.fn()} onTitleChange={vi.fn()} />);

    expect(screen.getByLabelText('자료 링크')).toHaveAttribute('placeholder', '자료 링크 입력');
    expect(screen.getByLabelText('자료 제목')).toHaveAttribute('placeholder', '자료 제목 입력');
  });

  it('URL input의 type이 url이다', () => {
    render(<ResourceInput url="" title="" onUrlChange={vi.fn()} onTitleChange={vi.fn()} />);

    expect(screen.getByLabelText('자료 링크')).toHaveAttribute('type', 'url');
  });

  it('title input의 type이 text이다', () => {
    render(<ResourceInput url="" title="" onUrlChange={vi.fn()} onTitleChange={vi.fn()} />);

    expect(screen.getByLabelText('자료 제목')).toHaveAttribute('type', 'text');
  });

  it('커스텀 className이 적용된다', () => {
    const { container } = render(
      <ResourceInput
        url=""
        title=""
        onUrlChange={vi.fn()}
        onTitleChange={vi.fn()}
        className="custom-class"
      />,
    );

    const resourceInput = container.firstChild as HTMLElement;
    expect(resourceInput).toHaveClass('custom-class');
  });

  it('forwardRef가 올바르게 작동한다', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <ResourceInput ref={ref} url="" title="" onUrlChange={vi.fn()} onTitleChange={vi.fn()} />,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('빈 값에서 시작하여 값을 채울 수 있다', async () => {
    const user = userEvent.setup();
    const handleUrlChange = vi.fn();
    const handleTitleChange = vi.fn();

    render(
      <ResourceInput
        url=""
        title=""
        onUrlChange={handleUrlChange}
        onTitleChange={handleTitleChange}
      />,
    );

    const urlInput = screen.getByLabelText('자료 링크');
    const titleInput = screen.getByLabelText('자료 제목');

    await user.type(urlInput, 'https://example.com');
    await user.type(titleInput, '예제');

    expect(handleUrlChange).toHaveBeenCalled();
    expect(handleTitleChange).toHaveBeenCalled();
  });

  it('값이 있는 상태에서 수정할 수 있다', async () => {
    const user = userEvent.setup();
    const handleUrlChange = vi.fn();

    render(
      <ResourceInput
        url="https://old.com"
        title="Old Title"
        onUrlChange={handleUrlChange}
        onTitleChange={vi.fn()}
      />,
    );

    const urlInput = screen.getByLabelText('자료 링크');
    await user.clear(urlInput);
    await user.type(urlInput, 'https://new.com');

    expect(handleUrlChange).toHaveBeenCalled();
  });
});
