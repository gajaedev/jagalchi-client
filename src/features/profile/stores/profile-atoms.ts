import { atom } from 'jotai';

export interface ProfileLinkItem {
  id: string;
  name: string;
  url: string;
}

export const profileModeAtom = atom<'show' | 'edit'>('show');
export const profileBioAtom = atom(
  '안녕하세요! 새로운 기술을 배우고 공유하는 것을 좋아하는 개발자입니다.',
);
export const profileOrgAtom = atom('부산소프트웨어마이스터고등학교');
export const profileLinksAtom = atom<ProfileLinkItem[]>([
  { id: '1', name: '포트폴리오', url: 'https://github.com/jagalchi' },
]);
export const profileImageAtom = atom('/profile.svg');

/** Snapshot atoms — store values captured when entering edit mode for cancel restoration */
export const profileBioSnapshotAtom = atom('');
export const profileOrgSnapshotAtom = atom('');
export const profileLinksSnapshotAtom = atom<ProfileLinkItem[]>([]);
