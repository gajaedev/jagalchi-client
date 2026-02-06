import { atom } from 'jotai';

export type SortOrder = 'asc' | 'desc';
export type SortBy = 'recent' | 'name' | 'size';
export type FilterCategory = 'all' | 'roadmap' | 'directory';
export type SidebarCategory = 'recent' | 'community' | 'my-roadmap' | 'shared' | 'favorites';

export const sortOrderAtom = atom<SortOrder>('desc');
export const sortByAtom = atom<SortBy>('recent');
export const filterCategoryAtom = atom<FilterCategory>('all');
export const sidebarCategoryAtom = atom<SidebarCategory>('my-roadmap');
