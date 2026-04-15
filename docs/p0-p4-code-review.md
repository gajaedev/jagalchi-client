# P0-P4 통합 코드리뷰 리포트

> 작성일: 2026-04-07
> 리뷰 방법: review-\* 하네스 (L1 screener x3 -> L2 moderator -> judge)
> 대상: develop 브랜치 (7558391)

---

## 판정: APPROVE_WITH_NOTES

MSW 기반 개발 환경이므로 즉각적인 프로덕션 위험은 없으나, 에디터 핵심 UX 버그 1건(BLOCKER)과 보안 아키텍처 구조 문제가 출시 전 반드시 해결 필요.

---

## 심각도 요약

| 심각도   | 개수   | 비고                        |
| -------- | ------ | --------------------------- |
| BLOCKER  | 1      | 에디터 URL 입력 차단        |
| HIGH     | 8      | 보안 3, 기능 버그 2, 성능 3 |
| MEDIUM   | 17     | UX/렌더링, 성능, 접근 제어  |
| LOW      | 8      | 네이밍, 상수화, 매직 넘버   |
| **합계** | **34** |                             |

---

## BLOCKER (1건)

### B-1. URL 검증이 타이핑 중 입력을 차단

- **파일:** `src/features/roadmap-editor/properties/components/NodePropertiesPanel/index.tsx:40-48`
- **설명:** `handleResourceChange`가 `onChange` 시점에 `validateUrl(value)`를 실행해 중간 입력(`http`, `htt`)을 invalid로 판정하고 상태 업데이트를 차단. URL 필드에 아무것도 입력할 수 없는 기능 불능 상태.
- **수정:** 검증을 `onBlur` 또는 폼 제출 시점으로 이동. 입력 중에는 원시 값을 항상 허용.

---

## HIGH (8건)

### 보안

#### H-1. 액세스 토큰 저장 방식 + 미들웨어 서명 검증 부재

- **파일:** `src/api/client.ts:31,36-38`, `src/middleware.ts:12-17`
- **설명:** 토큰이 localStorage + non-httpOnly 쿠키에 동시 저장. XSS 발생 시 즉시 탈취 가능. 미들웨어는 쿠키 존재 여부만 확인하고 서명 검증 없음.
- **현재 상태:** MSW 환경이라 실제 JWT 없음 — 개발 단계에서는 HIGH, **출시 직전 BLOCKER로 재승격 필수**
- **수정:** httpOnly + Secure 쿠키로 전환, 미들웨어에 JWT 서명 검증 추가 (`jose` 활용). 현재 코드에 `// TODO(security): pre-production blocker` 주석 명시.

#### H-2. console.log로 사용자 AI 프롬프트 유출

- **파일:** `src/features/roadmap-editor/components/organisms/RoadmapAiModal/index.tsx:31,48`, `ResourceRecommendationModal/index.tsx:44`
- **설명:** 사용자 AI 프롬프트가 console.log로 출력. 프로덕션 빌드에서도 브라우저 콘솔에 노출 (CWE-532).
- **수정:** console.log 전면 제거 + ESLint `no-console` 규칙 강화.

#### H-3. editor-test 페이지 비인증 공개 노출

- **파일:** `src/app/editor-test/page.tsx`
- **설명:** 미들웨어 matcher에 미포함. 비인증 사용자도 에디터 전체 기능 접근 가능.
- **수정:** `NODE_ENV === 'production'` 시 404 반환 또는 middleware matcher에 추가.

### 기능 버그

#### H-4. Delete 키 이중 처리 — undo/redo 히스토리 오염

- **파일:** `src/features/roadmap-editor/canvas/components/RoadmapCanvas/index.tsx:162`
- **설명:** ReactFlow `deleteKeyCode="Delete"` + `useKeyboardShortcuts` Delete 처리가 동시 실행. undo 스택 중복 엔트리 생성.
- **수정:** `deleteKeyCode={null}`로 ReactFlow 내장 삭제 비활성화, `useKeyboardShortcuts`만으로 단일 경로 유지.

#### H-5. Open Redirect 잠재적 위험

- **파일:** `src/middleware.ts:29`
- **설명:** `?redirect=` 파라미터를 향후 사용 시 외부 URL 검증 없이 따르면 피싱 벡터가 됨.
- **수정:** redirect 파라미터가 동일 오리진 상대 경로인지 화이트리스트 검증.

### 성능

#### H-6. 대형 라이브러리 동기 import (번들 크기)

- **파일:** `ColorPicker/index.tsx`, `ColorPickerInline/index.tsx`, `RoadmapEditor/index.tsx`, `RoadmapViewer/index.tsx`
- **설명:** `react-colorful`과 `@xyflow/react` 전체가 초기 번들에 포함.
- **수정:** `next/dynamic` + `{ ssr: false }`로 lazy load.

#### H-7. memo 컴포넌트 핸들러에 useCallback 누락

- **파일:** `NodePropertiesPanel`, `EdgePropertiesPanel`, `SectionPropertiesPanel`, `TextPropertiesPanel`, `EditorToolbar`
- **설명:** `React.memo`로 감싼 컴포넌트에 인라인 핸들러 전달 → memo 최적화 무력화.
- **수정:** memo 경계를 넘는 함수 prop에 `useCallback` 적용.

#### H-8. ViewerSidebar 파생 계산 useMemo 누락

- **파일:** `src/features/roadmap-viewer/components/ViewerSidebar/index.tsx:29-37`
- **설명:** `nodeItems`/`filteredNodes` 파생 계산이 매 렌더마다 실행.
- **수정:** `useMemo(() => ..., [nodes, searchQuery])` 적용.

---

## MEDIUM (17건)

### 기능/UX

| #   | 제목                                    | 파일                           | 설명                                                           |
| --- | --------------------------------------- | ------------------------------ | -------------------------------------------------------------- |
| M-1 | solid/dashed/dotted 구분 오류           | `EdgePropertiesPanel:36`       | `strokeDasharray` 존재 유무만으로 판단, dotted가 dashed로 인식 |
| M-2 | Edge 잠금 상태 로컬 state 소실          | `EdgePropertiesPanel:33`       | 다른 엣지 선택 후 재선택 시 잠금 초기화                        |
| M-3 | 다중선택 커스텀 컬러 첫 번째만 적용     | `MultiSelectPanel:173`         | `selectedIds[0]`만 color picker 타겟                           |
| M-4 | 노드 겹침 (POSITION_OFFSET < 노드 너비) | `JagalchiNode:32-37`           | offset 100px < min-w 200px                                     |
| M-5 | redirect 전 빈 에디터 깜빡임            | `use-roadmap-loader.ts:89-97`  | `roadmapId === 'new'` redirect 동안 빈 상태 렌더링             |
| M-6 | savedTitle 빈 문자열 비교 오류          | `use-unsaved-changes.ts:59-61` | `''`이 falsy로 처리되어 변경사항 감지 실패                     |
| M-7 | 드래그 생성 노드 팩토리 미사용          | `RoadmapCanvas:107-118`        | `createJagalchiNode` 팩토리 우회                               |

### 보안

| #    | 제목                        | 파일                            | 설명                                                    |
| ---- | --------------------------- | ------------------------------- | ------------------------------------------------------- |
| M-8  | CSP 헤더 미설정             | `next.config.ts`                | Content-Security-Policy 부재                            |
| M-9  | URL 저장 시 sanitize 미적용 | `ProfileCustomLinks:67-79`      | 표시 시점에만 sanitize, 저장 시 `javascript:` 스킴 허용 |
| M-10 | MSW 픽스처 평문 비밀번호    | `mocks/fixtures/users.ts:19-43` | 소스코드에 `Test1234!` 포함                             |

### 성능

| #    | 제목                                    | 파일                                                              | 설명                                         |
| ---- | --------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------- |
| M-11 | Contribution streak UTC/로컬 불일치     | `generate-mock-contributions.ts:32`, `contribution-utils.tsx:179` | UTC+9에서 날짜 1일 오차                      |
| M-12 | localStorage 전체 순회                  | `use-auto-save.ts:28-42`                                          | `for...in localStorage`                      |
| M-13 | JSON.stringify 중복 직렬화              | `use-auto-save.ts:64-65`                                          | 기존 `hashNodes`/`hashEdges` 미사용          |
| M-14 | CardListMode filter useMemo 누락        | `CardListMode:13`                                                 | `nodes.filter` 매 렌더 실행                  |
| M-15 | 노드 우측 정렬 시 너비 0 계산           | `align-nodes.ts:41-46`                                            | 측정 전 `node.measured?.width` 0             |
| M-16 | ViewerZoomControls 불필요한 useCallback | `ViewerZoomControls:15-26`                                        | 내부 함수에 불필요한 훅 오버헤드             |
| M-17 | atomWithStorage SSR hydration 깜빡임    | `auth.atoms.ts:7,10-13`                                           | 인증 상태 초기값 null → 순간적 미인증 렌더링 |

---

## LOW (8건)

| #   | 제목                                          | 파일                                                                            |
| --- | --------------------------------------------- | ------------------------------------------------------------------------------- |
| L-1 | `GenerateMockContributions` PascalCase 함수명 | `generate-mock-contributions.ts:25`                                             |
| L-2 | `contribution-utils.tsx` 확장자 (JSX 없음)    | `contribution-utils.tsx` → `.ts`                                                |
| L-3 | 하드코딩 UI 문자열 미상수화                   | `EditorHeader`, `SectionPropertiesPanel`, `TextPropertiesPanel`, `CardListMode` |
| L-4 | 네비게이션 경로 `/myroadmap` 하드코딩         | `use-unsaved-changes.ts`, `EditorHeader`                                        |
| L-5 | index 기반 key 사용                           | `NodePropertiesPanel:106`, `ResourceRecommendationModal:111`                    |
| L-6 | 매직 넘버 120                                 | `use-canvas-center.ts:11`                                                       |
| L-7 | 60줄 초과 주석 블록                           | `contribution-utils.tsx:43-107`                                                 |
| L-8 | roadmapTitle에 ID 노출                        | `RoadmapViewer:57`                                                              |

---

## 우선순위 실행 계획

| 순서 | 항목                                        | 심각도  | 예상 공수        |
| ---- | ------------------------------------------- | ------- | ---------------- |
| 1    | URL 입력 차단 버그 수정                     | BLOCKER | 소               |
| 2    | Delete 키 이중 처리 제거                    | HIGH    | 소               |
| 3    | console.log 전면 제거 + no-console 강화     | HIGH    | 소               |
| 4    | editor-test 페이지 인증/제거                | HIGH    | 소               |
| 5    | 토큰 보안 아키텍처 설계 문서화              | HIGH    | 중 (백엔드 협의) |
| 6    | dynamic import (ReactFlow, react-colorful)  | HIGH    | 소               |
| 7    | memo + useCallback 정합성                   | HIGH    | 중               |
| 8    | MEDIUM 이슈 → 이슈 트래커 등록 후 순차 처리 | MEDIUM  | -                |

---

## 총평

Phase 4까지의 코드베이스는 **전반적으로 양호**합니다.

**긍정적 측면:**

- Feature 격리 구조가 잘 지켜지고 있음 (cross-feature import 위반 없음)
- TypeScript strict 모드 활용도가 높음
- Zod 기반 localStorage 데이터 검증, jotai-history undo/redo, isCancelled 플래그 race condition 방어 등 좋은 패턴 사용
- Phase 4의 시맨틱 토큰, 문자열 상수화, 접근성, 에러 페이지가 코드 품질을 체계적으로 개선

**구조적 우려:**

1. **보안 아키텍처**: localStorage 토큰 저장 패턴이 고착되기 전에 httpOnly 쿠키 방식으로 전환 설계 필요
2. **에디터 UX 회귀**: URL 입력 차단, Delete 키 이중 처리가 develop에 포함된 채 다음 Phase로 진행되면 기술 부채 누적
3. **성능 최적화**: memo/useCallback 정합성과 dynamic import는 노드 수 증가 시 체감 성능에 직접 영향

**권고:** BLOCKER 1건(URL 입력)을 즉시 수정하고, 보안 토큰 아키텍처를 스펙 문서에 기록한 후 Phase 5 진행을 권장합니다.

---

## 참조

- API 명세: `docs/api.md`
- 남은 작업: `docs/remaining-tasks.md`
- 에디터 컴포넌트 현황: `docs/editor-components-inventory.md`
