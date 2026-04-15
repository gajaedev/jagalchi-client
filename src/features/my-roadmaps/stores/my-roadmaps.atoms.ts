import { atom } from 'jotai';

import type { SortOrder, SortBy, FilterCategory } from '@/types/sort.types';

export type SidebarCategory = 'recent' | 'community' | 'my-roadmap' | 'shared' | 'favorites';

export interface BreadcrumbSegment {
  id: number;
  name: string;
}

export const breadcrumbPathAtom = atom<BreadcrumbSegment[]>([]);

export const searchQueryAtom = atom<string>('');

export const sortOrderAtom = atom<SortOrder>('desc');
export const sortByAtom = atom<SortBy>('recent');
export const filterCategoryAtom = atom<FilterCategory>('all');
export const sidebarCategoryAtom = atom<SidebarCategory>('my-roadmap');
