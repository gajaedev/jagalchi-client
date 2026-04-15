# Jagalchi Client - 남은 작업 현황

> 작성일: 2026-04-07
> Phase 0-4 완료 기준 정리

---

## 완료된 Phase 요약

| Phase | 제목                       | 주요 내용                                                  | 상태 |
| ----- | -------------------------- | ---------------------------------------------------------- | ---- |
| 0     | 인프라/공통 기반           | API 클라이언트, 인증 레이어, 미들웨어, 데이터 모델 통합    | Done |
| 1     | 토큰 저장/미들웨어/폼 검증 | atomWithStorage, 쿠키 동기화, Zod 강화                     | Done |
| 2A    | 마이로드맵 기능 연결       | 카드 클릭 라우팅, CRUD 콜백, 검색, empty state             | Done |
| 2B    | 커뮤니티 반응형/기능       | 반응형 그리드, 좋아요 카운트, About 동적화                 | Done |
| 2C    | 프로필 편집 개선           | 편집 취소 복원, 폼 검증, 반응형, 이미지 제한               | Done |
| 3     | 에디터/뷰어 엣지케이스     | API 로더 준비, DetailNode, 사이드바 재오픈, self-loop 방지 | Done |
| 4-1   | Tailwind 토큰              | 31파일 hex → Tailwind semantic 클래스                      | Done |
| 4-2   | 문자열 상수화              | 30파일, 6개 상수 그룹 (~120개 키) → messages.ts            | Done |
| 4-3   | 접근성                     | ARIA 속성, 키보드 네비게이션 (5개 컴포넌트)                | Done |
| 4-4   | 에러 페이지                | error.tsx, not-found.tsx (글로벌 + myroadmap 라우트그룹)   | Done |

---

## 남은 작업: Phase 5+

### 5-1. 백엔드 API 실연동

현재 모든 피처가 Mock 데이터 또는 localStorage 기반. 실제 REST API 연동 필요.

**Auth**

- [ ] 토큰 갱신 플로우 (`PATCH /users/auth/refresh`)
- [ ] 로그아웃 기능 (`POST /users/auth/logout` 또는 클라이언트 토큰 삭제)
- [ ] Google/GitHub OAuth 연동
- [ ] 인증코드 만료 타이머 UI (`expiresIn: 300` 서버 반환값 활용)
- [ ] brute force 방어 (실패 횟수 추적, CAPTCHA)

**Profile** (`docs/api.md` 참조)

- [ ] `GET /users?name={name}` — 프로필 조회
- [ ] `PATCH /users/profile` — 편집 저장 (profileImage, bio, externalLinks)
- [ ] `PATCH /users/{name}/follow` — 팔로우/언팔로우 토글
- [ ] `GET /users/{name}/followers` / `GET /users/{name}/followings`
- [ ] `DELETE /users` — 계정 삭제
- [ ] 프로필 이미지 서버 업로드 (현재 base64 Jotai atom만)

**My Roadmaps**

- [ ] TanStack Query 기반 서버 데이터 fetching
- [ ] CRUD API 연동 (생성/이름수정/이동/삭제/즐겨찾기)
- [ ] 디렉토리 계층 구조 (`parentId` 기반)
- [ ] 사이드바 사용자 정보 연동
- [ ] 페이지네이션 또는 무한 스크롤

**Community**

- [ ] 목록/상세 조회 API 연동
- [ ] MSW 핸들러 작성
- [ ] 좋아요/저장 서버 동기화
- [ ] "내 로드맵에 추가" 실제 기능
- [ ] 로그인 상태 연동
- [ ] Contributor 목록 API

### 5-2. 에디터 WebSocket/STOMP 전환

현재 에디터/뷰어 모두 localStorage 기반. 백엔드 Event Sourcing + WebSocket STOMP로 전환 필요.

**연결 설정**

- [ ] WebSocket STOMP `/ws` 연결 (`X-User-ID`, `X-User-Role` 헤더)
- [ ] `SUBSCRIBE /user/queue/ack` — ACK/NACK 수신
- [ ] `SUBSCRIBE /topic/roadmap/{id}/state` — 실시간 이벤트 수신

**액션 전송**

- [ ] `SEND /app/roadmap/{id}/action` — CREATE/EDIT/DELETE/UNDO/REDO
- [ ] `GET /api/roadmap/{id}/events?since={seq}` — 이벤트 히스토리 조회

**실시간 협업**

- [ ] 커서 추적: `SEND /app/roadmap/{id}/cursor` + `SUBSCRIBE /topic/roadmap/{id}/cursors`
- [ ] 다른 탭 동시 편집 방어 (BroadcastChannel 또는 STOMP 기반)

### 5-3. AI 기능

현재 모든 AI 기능이 setTimeout mock + console.log 상태.

**에디터 AI**

- [ ] AI 로드맵 생성 (`RoadmapAiModal` generate 모드)
- [ ] AI 로드맵 수정 (`RoadmapAiModal` modify 모드)
- [ ] AI 자료 추천 (`ResourceRecommendationModal`)

**뷰어 AI**

- [ ] AI 학습 피드백 (`onAiFeedback` prop 연결)

### 5-4. 에디터 미구현 기능

**속성 편집**

- [ ] Edge 라벨 편집
- [ ] Edge 화살표 방향 편집
- [ ] Edge 두께 편집
- [ ] Section 크기(W/H) 편집
- [ ] Text 크기 편집
- [ ] ColorPicker 커스텀 색상 실제 적용

**도구**

- [ ] "선 추가" 도구 (Line tool)
- [ ] "Readme 수정" 기능
- [ ] 더보기(Ellipsis) 메뉴

**안정성**

- [ ] 노드 수백 개 성능 최적화 (가상화, 변경감지 최적화)
- [ ] localStorage 용량 초과 시 사용자 알림
- [ ] 붙여넣기 위치 뷰포트 기준으로 보정
- [ ] Ctrl+D 복제 시 엣지도 포함
- [ ] fitView 데이터 로드 후 재실행

### 5-5. 뷰어 미구현 기능

**내보내기**

- [ ] PNG / JPG / SVG 이미지 저장
- [ ] PDF 내보내기
- [ ] Markdown 내보내기
- [ ] JSON 내보내기

**메뉴**

- [ ] JSON 가져오기
- [ ] 다크모드 전환
- [ ] 로드맵 통계
- [ ] 버전 보기

**기타**

- [ ] 헤더 검색 기능 연결
- [ ] 타이틀 ChevronDown 드롭다운
- [ ] 캔버스 `h-[700px]` 고정 → 반응형

### 5-6. UX/품질 개선

**반응형**

- [ ] 뷰어 줌 컨트롤 모바일 대응

**보안**

- [ ] 서버 전송 시 XSS sanitize
- [ ] 프로필 이미지 MIME 서버 검증

**테스트**

- [ ] 에디터 훅 테스트 보강 (use-roadmap-loader, use-unsaved-changes)
- [ ] 뷰어 테스트 보강 (RoadmapViewer, ViewerCanvas, ViewerZoomControls)
- [ ] E2E 테스트 (Playwright) — 핵심 플로우

---

## 우선순위 권장

```
1순위: 5-1 (API 실연동) — 모든 기능의 기반
2순위: 5-2 (WebSocket/STOMP) — 에디터 핵심
3순위: 5-4 (에디터 미구현) — disabled UI 활성화
4순위: 5-3 (AI 기능) — 백엔드 AI API 필요
5순위: 5-5 (뷰어) + 5-6 (품질) — 폴리싱
```

---

## 참조 문서

- API 명세: `docs/api.md`
- QA 체크리스트: `.claude/qa-checklist.md`
- 피처 리뷰: `.claude/0406_review.md`
- 이슈 노트: `.claude/issues_notes.md`
