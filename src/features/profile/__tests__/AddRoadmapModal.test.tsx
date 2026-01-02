import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Button } from '@/components/ui/button';

import { AddRoadmapModal } from '../components/organisms/AddRoadmapModal';

vi.mock('lucide-react', () => ({
  ChevronRight: () => <span data-testid="chevron-right" />,
  FileText: () => <span data-testid="file-text" />,
  Folder: () => <span data-testid="folder" />,
  Search: () => <span data-testid="search-icon" />,
}));

describe('AddRoadmapModal', () => {
  it('renders trigger button', () => {
    render(
      <AddRoadmapModal>
        <Button>Open Modal</Button>
      </AddRoadmapModal>,
    );
    expect(screen.getByRole('button', { name: 'Open Modal' })).toBeInTheDocument();
  });

  it('opens modal and displays correct content', async () => {
    render(
      <AddRoadmapModal>
        <Button>Open Modal</Button>
      </AddRoadmapModal>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open Modal' }));

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    expect(screen.getByText('로드맵 선택')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('로드맵 검색')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
  });

  it('selects and deselects items', async () => {
    render(
      <AddRoadmapModal>
        <Button>Open Modal</Button>
      </AddRoadmapModal>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Open Modal' }));

    const folder = await screen.findByText('CS 기초');
    fireEvent.click(folder);

    const file = await screen.findByText('운영체제 정복하기');

    fireEvent.click(file);
    let confirmBtn = screen.getByRole('button', { name: '확인' });
    expect(confirmBtn).not.toBeDisabled();

    fireEvent.click(file);
    confirmBtn = screen.getByRole('button', { name: '확인' });
    expect(confirmBtn).toBeDisabled();
  });
});
