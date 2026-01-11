import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { SectionSidebar } from './index';

describe('SectionSidebar', () => {
  const defaultSectionData = {
    title: 'Test Section',
    color: '#3B82F6',
    locked: false,
  };

  it('does not render when closed', () => {
    render(<SectionSidebar open={false} onOpenChange={vi.fn()} />);

    expect(screen.queryByText('섹션 편집')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    render(<SectionSidebar open={true} onOpenChange={vi.fn()} />);

    expect(screen.getByText('섹션 편집')).toBeInTheDocument();
  });

  it('displays section data', () => {
    render(<SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />);

    const titleInput = screen.getByLabelText('섹션 제목');
    expect(titleInput).toHaveValue('Test Section');
  });

  it('closes sidebar when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(<SectionSidebar open={true} onOpenChange={handleOpenChange} />);

    const closeButton = screen.getByRole('button', { name: '사이드바 닫기' });
    await user.click(closeButton);

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('allows changing title', async () => {
    const user = userEvent.setup();

    render(<SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />);

    const titleInput = screen.getByLabelText('섹션 제목');
    await user.clear(titleInput);
    await user.type(titleInput, 'New Section');

    expect(titleInput).toHaveValue('New Section');
  });

  it('allows changing color', async () => {
    const user = userEvent.setup();

    render(<SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />);

    const colorInput = screen.getByLabelText('섹션 색상');
    await user.clear(colorInput);
    await user.type(colorInput, '#FF0000');

    expect(colorInput).toHaveValue('#FF0000');
  });

  it('allows toggling lock', async () => {
    const user = userEvent.setup();

    render(<SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />);

    const lockSwitch = screen.getByRole('switch', { name: '잠금' });
    expect(lockSwitch).not.toBeChecked();

    await user.click(lockSwitch);
    expect(lockSwitch).toBeChecked();
  });

  it('calls onSave with updated data', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(
      <SectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        sectionData={defaultSectionData}
        onSave={handleSave}
      />,
    );

    const saveButton = screen.getByRole('button', { name: '저장' });
    await user.click(saveButton);

    expect(handleSave).toHaveBeenCalledWith({
      title: 'Test Section',
      color: '#3B82F6',
      locked: false,
    });
  });

  it('updates internal state when sectionData prop changes', () => {
    const { rerender } = render(
      <SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />,
    );

    const titleInput = screen.getByLabelText('섹션 제목');
    expect(titleInput).toHaveValue('Test Section');

    rerender(
      <SectionSidebar
        open={true}
        onOpenChange={vi.fn()}
        sectionData={{ ...defaultSectionData, title: 'Updated Section' }}
      />,
    );

    expect(titleInput).toHaveValue('Updated Section');
  });

  it('displays lock icon and description', () => {
    render(<SectionSidebar open={true} onOpenChange={vi.fn()} sectionData={defaultSectionData} />);

    expect(screen.getByText('섹션을 잠가 수정을 방지합니다')).toBeInTheDocument();
  });
});
