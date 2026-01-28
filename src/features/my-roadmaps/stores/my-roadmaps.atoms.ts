import { atom } from 'jotai';

export type SortOrder = 'asc' | 'desc';
export type SortBy = 'name' | 'recent' | 'size';
export type FilterCategory = 'all' | 'roadmap' | 'directory';

export const sortOrderAtom = atom<SortOrder>('desc');
export const sortByAtom = atom<SortBy>('recent');
export const filterCategoryAtom = atom<FilterCategory>('all');
