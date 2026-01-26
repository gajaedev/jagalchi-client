import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RoadmapGenerationForm } from '.';

describe('RoadmapGenerationForm', () => {
  const mockOnGenerate = vi.fn();
  const mockOnCancel = vi.fn();

  const renderForm = (props = {}) => {
    return render(
      <RoadmapGenerationForm onGenerate={mockOnGenerate} onCancel={mockOnCancel} {...props} />,
    );
  };

  it('renders without crashing', () => {
    const { container } = renderForm();
    expect(container).toBeInTheDocument();
  });

  it('renders textarea with placeholder', () => {
    renderForm();
    const textarea = screen.getByPlaceholderText(/어떤 로드맵을 만들고 싶으신가요/);
    expect(textarea).toBeInTheDocument();
  });

  it('renders generate and cancel buttons', () => {
    renderForm();
    expect(screen.getByText('생성')).toBeInTheDocument();
    expect(screen.getByText('취소')).toBeInTheDocument();
  });

  it('disables submit button when prompt is empty', () => {
    renderForm();
    const submitButton = screen.getByText('생성');
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when prompt is filled', async () => {
    const user = userEvent.setup();
    renderForm();

    const textarea = screen.getByPlaceholderText(/어떤 로드맵을 만들고 싶으신가요/);
    await user.type(textarea, 'React 로드맵');

    const submitButton = screen.getByText('생성');
    expect(submitButton).not.toBeDisabled();
  });

  it('calls onGenerate with trimmed prompt on submit', async () => {
    const user = userEvent.setup();
    renderForm();

    const textarea = screen.getByPlaceholderText(/어떤 로드맵을 만들고 싶으신가요/);
    await user.type(textarea, '  React 로드맵  ');

    const submitButton = screen.getByText('생성');
    await user.click(submitButton);

    expect(mockOnGenerate).toHaveBeenCalledWith('React 로드맵');
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

    const textarea = screen.getByPlaceholderText(/어떤 로드맵을 만들고 싶으신가요/);
    const submitButton = screen.getByText('생성');
    const cancelButton = screen.getByText('취소');

    expect(textarea).toBeDisabled();
    expect(submitButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it('does not submit when prompt is only whitespace', async () => {
    const user = userEvent.setup();
    renderForm();

    const textarea = screen.getByPlaceholderText(/어떤 로드맵을 만들고 싶으신가요/);
    await user.type(textarea, '   ');

    const submitButton = screen.getByText('생성');
    expect(submitButton).toBeDisabled();
  });
});
