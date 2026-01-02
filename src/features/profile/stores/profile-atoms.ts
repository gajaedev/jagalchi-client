import { atom } from 'jotai';

export const profileModeAtom = atom<'show' | 'edit'>('show');
export const profileBioAtom = atom(
  '안녕하세요! 새로운 기술을 배우고 공유하는 것을 좋아하는 개발자입니다.',
);
export const profileOrgAtom = atom('');
export const profileLinkAtom = atom('');
export const profileImageAtom = atom('/profile.svg');
