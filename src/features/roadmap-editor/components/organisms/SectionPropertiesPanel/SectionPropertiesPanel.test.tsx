import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'jotai';
import { describe, expect, it } from 'vitest';

import { SectionPropertiesPanel } from '.';

import type { JagalchiSectionType } from '../../../types/editor.types';

const mockSection: JagalchiSectionType = {
  id: 'section-1',
  type: 'jagalchi-section',
  position: { x: 0, y: 0 },
  data: {
    title: 'Test Section',
    variant: 'blue',
    isLocked: false,
  },
};

const renderWithProvider = (section: JagalchiSectionType) => {
  return render(
    <Provider>
      <SectionPropertiesPanel node={section} />
    </Provider>,
  );
};

describe('SectionPropertiesPanel', () => {
  it('renders section header with ID', () => {
    renderWithProvider(mockSection);
    expect(screen.getByText('section-1')).toBeInTheDocument();
  });

  it('renders lock button', () => {
    renderWithProvider(mockSection);
    expect(screen.getByRole('button', { name: /잠금/ })).toBeInTheDocument();
  });

  it('renders section name input', () => {
    renderWithProvider(mockSection);
    expect(screen.getByDisplayValue('Test Section')).toBeInTheDocument();
  });

  it('renders color selector', () => {
    renderWithProvider(mockSection);
    expect(screen.getByText('기본 컬러')).toBeInTheDocument();
  });

  it('disables section name input when locked', () => {
    const lockedSection = { ...mockSection, data: { ...mockSection.data, isLocked: true } };
    renderWithProvider(lockedSection);

    const nameInput = screen.getByDisplayValue('Test Section');
    expect(nameInput).toBeDisabled();
  });

  it('allows user to interact with name input when unlocked', async () => {
    const user = userEvent.setup();
    renderWithProvider(mockSection);

    const nameInput = screen.getByDisplayValue('Test Section');
    expect(nameInput).not.toBeDisabled();

    // Verify input can receive focus
    await user.click(nameInput);
    expect(nameInput).toHaveFocus();
  });

  it('shows unlock icon when section is unlocked', () => {
    renderWithProvider(mockSection);
    expect(screen.getByRole('button', { name: /잠금/ })).toBeInTheDocument();
  });

  it('shows lock icon when section is locked', () => {
    const lockedSection = { ...mockSection, data: { ...mockSection.data, isLocked: true } };
    renderWithProvider(lockedSection);
    expect(screen.getByRole('button', { name: /잠금 해제/ })).toBeInTheDocument();
  });
});
