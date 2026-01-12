import { atom } from 'jotai';

import type { ActiveTab, FilterCategory, SortBy, SortOrder } from '../types/community.types';

export const searchQueryAtom = atom<string>('');
export const activeTabAtom = atom<ActiveTab>('popular');
export const sortOrderAtom = atom<SortOrder>('desc');
export const sortByAtom = atom<SortBy>('recent');
export const filterCategoryAtom = atom<FilterCategory>('all');
