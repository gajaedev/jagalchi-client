import { atom } from 'jotai';

export const profileModeAtom = atom<'show' | 'edit'>('show');
export const profileBioAtom = atom('임베디드 소프트웨어과 카사노바 김태현');
export const profileOrgAtom = atom('');
export const profileLinkAtom = atom('');
