import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RoadmapModificationForm } from '.';

describe('RoadmapModificationForm', () => {
  const mockOnModify = vi.fn();
  const mockOnCancel = vi.fn();

  const renderForm = (props = {}) => {
    return render(
      <RoadmapModificationForm onModify={mockOnModify} onCancel={mockOnCancel} {...props} />,
    );
  };

  it('renders without crashing', () => {
    const { container } = renderForm();
    expect(container).toBeInTheDocument();
  });

  it('renders textarea with placeholder', () => {
    renderForm();
    const textarea = screen.getByPlaceholderText(/로드맵을 어떻게 수정하고 싶으신가요/);
    expect(textarea).toBeInTheDocument();
  });

  it('renders modify and cancel buttons', () => {
    renderForm();
    expect(screen.getByText('수정')).toBeInTheDocument();
    expect(screen.getByText('취소')).toBeInTheDocument();
  });

  it('disables submit button when prompt is empty', () => {
    renderForm();
    const submitButton = screen.getByText('수정');
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when prompt is filled', async () => {
    const user = userEvent.setup();
    renderForm();

    const textarea = screen.getByPlaceholderText(/로드맵을 어떻게 수정하고 싶으신가요/);
    await user.type(textarea, '난이도를 낮춰주세요');

    const submitButton = screen.getByText('수정');
    expect(submitButton).not.toBeDisabled();
  });

  it('calls onModify with trimmed prompt on submit', async () => {
    const user = userEvent.setup();
    renderForm();

    const textarea = screen.getByPlaceholderText(/로드맵을 어떻게 수정하고 싶으신가요/);
    await user.type(textarea, '  난이도를 낮춰주세요  ');

    const submitButton = screen.getByText('수정');
    await user.click(submitButton);

    expect(mockOnModify).toHaveBeenCalledWith('난이도를 낮춰주세요');
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();
    renderForm();

    const cancelButton = screen.getByText('취소');
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    renderForm({ isLoading: true });
    expect(screen.getByText(/AI가 작업 중입니다.../)).toBeInTheDocument();
  });

  it('disables form inputs when loading', () => {
    renderForm({ isLoading: true });

    const textarea = screen.getByPlaceholderText(/로드맵을 어떻게 수정하고 싶으신가요/);
    const submitButton = screen.getByText('수정');
    const cancelButton = screen.getByText('취소');

    expect(textarea).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it('does not submit when prompt is only whitespace', async () => {
    const user = userEvent.setup();
    renderForm();

    const textarea = screen.getByPlaceholderText(/로드맵을 어떻게 수정하고 싶으신가요/);
    await user.type(textarea, '   ');

    const submitButton = screen.getByText('수정');
    expect(submitButton).toBeDisabled();
  });
});
