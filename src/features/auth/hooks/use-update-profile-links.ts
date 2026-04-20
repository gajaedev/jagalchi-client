import { useMutation } from '@tanstack/react-query';

import { updateProfile } from '@/api/profile';

export interface ProfileLink {
  name: string;
  url: string;
}

function linksToExternal(links: ProfileLink[]): Record<string, string> {
  return Object.fromEntries(links.filter((l) => l.name && l.url).map((l) => [l.name, l.url]));
}

/**
 * 회원가입 3단계에서 입력한 외부 링크들을 프로필에 반영.
 * 실패해도 회원가입 자체는 성공한 상태이므로 호출자는 에러를 흡수하고 다음 단계로 진행한다.
 */
export function useUpdateProfileLinks() {
  return useMutation({
    mutationFn: async (links: ProfileLink[]) => {
      const externalLinks = linksToExternal(links);
      if (Object.keys(externalLinks).length === 0) return null;
      return updateProfile({ user: { externalLinks } });
    },
  });
}
