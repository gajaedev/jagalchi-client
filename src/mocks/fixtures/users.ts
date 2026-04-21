/**
 * Mock user fixture data for MSW handlers
 * 한국어 기반의 현실적인 사용자 데이터
 */

export interface MockUser {
  id: string;
  email: string;
  password: string;
  username: string;
  bio?: string;
  links: { name: string; url: string }[];
  createdAt: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 'user-1',
    email: 'kim@example.com',
    password: 'Test1234!',
    username: '김선배',
    bio: '프론트엔드 개발자 | React, TypeScript 전문',
    links: [
      { name: 'GitHub', url: 'https://github.com/kimsenior' },
      { name: 'Blog', url: 'https://blog.kimsenior.dev' },
    ],
    createdAt: '2025-06-15T09:00:00.000Z',
  },
  {
    id: 'user-2',
    email: 'park@example.com',
    password: 'Test1234!',
    username: '박후배',
    bio: '백엔드 개발을 배우는 학생입니다',
    links: [{ name: 'GitHub', url: 'https://github.com/parkstudent' }],
    createdAt: '2025-09-01T12:00:00.000Z',
  },
  {
    id: 'user-3',
    email: 'lee@example.com',
    password: 'Test1234!',
    username: '이멘토',
    bio: '10년차 풀스택 개발자 | 로드맵 큐레이터',
    links: [
      { name: 'LinkedIn', url: 'https://linkedin.com/in/leementor' },
      { name: 'Blog', url: 'https://leementor.tistory.com' },
      { name: 'YouTube', url: 'https://youtube.com/@leementor' },
    ],
    createdAt: '2025-03-10T08:30:00.000Z',
  },
];

/** 이메일로 사용자 검색 */
export const findUserByEmail = (email: string): MockUser | undefined =>
  MOCK_USERS.find((user) => user.email === email);

/** ID로 사용자 검색 */
export const findUserById = (id: string): MockUser | undefined =>
  MOCK_USERS.find((user) => user.id === id);

/**
 * Mock JWT 토큰 생성
 * 실제 서명은 없지만 base64url header.payload.signature 구조를 갖춰
 * decodeJwtPayload()가 name 클레임을 정상적으로 추출할 수 있도록 한다.
 */
const toBase64Url = (obj: object): string =>
  btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(obj))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

export const createMockToken = (userId: string): string => {
  const user = MOCK_USERS.find((u) => u.id === userId);
  const header = toBase64Url({ alg: 'HS512', typ: 'JWT' });
  const payload = toBase64Url({
    sub: userId,
    name: user?.username ?? userId,
    exp: Math.floor(Date.now() / 1000) + 3600,
  });
  return `${header}.${payload}.mock-signature`;
};

/** Mock 인증 코드 (항상 동일한 값 반환) */
export const MOCK_VERIFICATION_CODE = '123456';
