# Jagalchi Client - 구조 빠른 참조 (Quick Reference)

**최종 업데이트**: 2026-02-14 | **상태**: ✅ 분석 완료

---

## 🎯 30초 요약

```
총 265 TypeScript 파일
├── 220 files (83%) → 5개 Feature modules
├── 45 files (17%) → Shared modules
└── 61 test files

Feature 분포:
├── roadmap-editor (49%)  ← 가장 복잡 (그래프 에디터)
├── profile (17%)         ← 기여도 그래프
├── my-roadmaps (13%)     ← 로드맵 관리
├── community (12%)       ← 로드맵 탐색
└── auth (9%)            ← 인증
```

---

## 📍 파일 위치 빠른 검색

### "X를 찾아야 한다면..."

| 찾는 항목           | 위치                                                              | 파일명                      |
| ------------------- | ----------------------------------------------------------------- | --------------------------- |
| **로그인 폼**       | `src/features/auth/components/organisms/LoginForm/`               | `index.tsx`                 |
| **회원가입**        | `src/features/auth/components/organisms/register-steps/`          | `RegisterStep1/2/3Form.tsx` |
| **커뮤니티 페이지** | `src/features/community/components/templates/Community/`          | `index.tsx`                 |
| **로드맵 에디터**   | `src/features/roadmap-editor/components/templates/RoadmapEditor/` | `index.tsx`                 |
| **내 로드맵**       | `src/features/my-roadmaps/components/templates/MyRoadmaps/`       | `index.tsx`                 |
| **프로필 페이지**   | `src/features/profile/components/templates/Profile/`              | `index.tsx`                 |
| **기여도 그래프**   | `src/features/profile/components/molecules/ContributionGraph/`    | `index.tsx`                 |
| **노드 색상 설정**  | `src/features/roadmap-editor/constants/node-colors.ts`            | -                           |
| **인증 스키마**     | `src/features/auth/schemas/auth.schema.ts`                        | -                           |
| **Jotai atoms**     | `src/features/[feature]/stores/[feature]-atoms.ts`                | -                           |

---

## 🔑 각 Feature의 핵심 파일

### Auth (21 files)

```
src/features/auth/
├── components/
│   └── organisms/LoginForm/          ← 메인 로그인
│   └── organisms/RegisterForm/       ← 회원가입 (3단계)
│   └── templates/AuthCard/           ← Layout
├── schemas/auth.schema.ts            ← Validation (Zod)
├── types/auth.types.ts
├── hooks/use-verification-code.ts
└── index.ts                          ✅ Named exports (7개)
```

**Key Functions**:

- `loginSchema, registerStep1Schema, ...`
- `AuthCard, LoginForm, RegisterForm`

---

### Community (27 files)

```
src/features/community/
├── components/
│   ├── templates/Community/          ← 메인 페이지
│   ├── templates/RoadmapDetail/      ← 상세 페이지
│   ├── molecules/CommunityFilter/    ← 검색/필터
│   └── molecules/CommunityHero/
├── stores/community-atoms.ts         ← Jotai state
├── utils/community-utils/
└── index.ts                          ⚠️ Wildcard export (수정 필요)
```

**Key Functions**:

- `Community, RoadmapDetail` (templates)
- `CommunityFilter, CommunityGrid` (organisms)

---

### My-Roadmaps (28 files)

```
src/features/my-roadmaps/
├── components/
│   ├── organisms/MyRoadmapsSidebar/  ← 사이드바
│   ├── organisms/MyRoadmapsHeader/
│   ├── organisms/MyRoadmapsGrid/
│   └── molecules/
│       ├── AddRoadmapModal/
│       ├── AddDirectoryModal/
│       └── SelectLocationModal/
├── stores/my-roadmaps.atoms.ts
├── hooks/use-roadmap-state.ts
└── ❌ index.ts 없음 (수정 필요)
```

**Key Functions**:

- `MyRoadmapsSidebar, MyRoadmapsGrid` (organisms)
- `AddRoadmapModal, AddDirectoryModal` (modals)

---

### Profile (37 files)

```
src/features/profile/
├── components/
│   ├── templates/Profile/            ← 메인 프로필
│   ├── molecules/ContributionGraph/  ← 기여도 (GitHub 스타일)
│   ├── molecules/ProfileBio/
│   ├── molecules/ProfileInfoForm/    ← 편집 폼
│   └── atoms/ProfilePicture/
├── stores/profile-atoms.ts           ← 5개 atoms
├── utils/
│   ├── contribution-utils/           ← 기여도 계산
│   └── generate-mock-contributions/  ← Mock 데이터
└── index.ts                          ✅ Named exports (19개)
```

**Key Functions**:

- `Profile, ContributionGraph` (main components)
- `getLevel(), calculateStreak()` (utils)
- `COLORS, getLastYearDates()` (contribution logic)

---

### Roadmap-Editor (107 files) ⭐

```
src/features/roadmap-editor/
├── components/
│   ├── templates/RoadmapEditor/      ← 메인 에디터
│   ├── organisms/
│   │   ├── RoadmapCanvas/            ← 그래프 캔버스
│   │   ├── EditorToolbar/
│   │   ├── EditorSidebar/
│   │   ├── NodePropertiesPanel/      ← 노드 편집
│   │   ├── SectionPropertiesPanel/
│   │   ├── EdgePropertiesPanel/
│   │   ├── MultiSelectPanel/
│   │   ├── RoadmapAiModal/           ← AI 기능
│   │   └── ...
│   └── molecules/
│       ├── JagalchiNode/             ← 노드
│       ├── JagalchiSection/          ← 섹션
│       ├── JagalchiText/             ← 텍스트
│       ├── ColorPicker/
│       └── ConnectionLine/
├── stores/editor-atoms.ts            ← 13개 atoms
├── hooks/ (4개)
│   ├── use-canvas-center.ts
│   ├── use-editor-state.ts
│   ├── use-node-operations.ts
│   └── use-edge-operations.ts
├── utils/
│   ├── node-factory.ts               ← 노드 생성
│   ├── align-nodes.ts                ← 정렬 기능
│   └── canvas-utils.ts
├── constants/
│   ├── node-colors.ts                ← 색상
│   ├── preset-colors.ts              ← 팔레트
│   └── editor.constants.ts
└── index.ts                          ✅ Named exports (36개)
```

**Key Functions**:

- `RoadmapEditor, RoadmapCanvas` (main)
- `JagalchiNode, JagalchiSection, JagalchiText` (graph components)
- `createJagalchiNode(), alignNodes()` (factories)
- `nodesAtom, edgesAtom, selectedNodeIdsAtom` (state)

---

## 🌐 라우팅 맵

```
/ (홈)
├── /auth/login
├── /auth/register
├── /auth/find-password
│
├── /editor/[id]                      ← Roadmap-editor feature
│
├── /profile                          ← Profile feature
│
├── /community                        ← Community feature
│   └── /community/[id]               (상세)
│
├── /myroadmap                        ← My-roadmaps feature
│
└── /editor-test                      ⚠️ 개발용 (제거 필요)
```

---

## 📊 Feature 선택 기준

### 내가 수정해야 할 feature는?

```
로그인/가입 관련?
  └─> src/features/auth/

로드맵 에디터 관련?
  ├─ 노드/섹션 구조 변경?    → roadmap-editor/components/molecules/
  ├─ 속성 패널?              → roadmap-editor/components/organisms/*Panel/
  ├─ AI 기능?                → roadmap-editor/components/organisms/RoadmapAiModal/
  └─ 색상/스타일?            → roadmap-editor/constants/

사용자 로드맵 관리?
  ├─ CRUD 기능?              → my-roadmaps/
  ├─ Modal 추가?             → my-roadmaps/components/molecules/
  └─> 사이드바?              → my-roadmaps/components/organisms/MyRoadmapsSidebar/

커뮤니티/탐색?
  ├─ 로드맵 필터?            → community/components/molecules/CommunityFilter/
  ├─ 로드맵 카드?            → community/components/atoms/RoadmapCard/
  └─> 상세 페이지?           → community/components/templates/RoadmapDetail/

프로필 페이지?
  ├─ 기여도 그래프?          → profile/components/molecules/ContributionGraph/
  ├─ 프로필 편집?            → profile/components/molecules/ProfileInfoForm/
  ├─ 소셜 링크?              → profile/components/organisms/ProfileCustomLinks/
  └─> 아바타?                → profile/components/atoms/ProfilePicture/
```

---

## 🔗 상태 관리 위치

### Jotai Atoms (모든 Feature)

| Feature            | Atoms 위치                    | 주요 atoms                                                   |
| ------------------ | ----------------------------- | ------------------------------------------------------------ |
| **auth**           | 없음 (Form state만)           | -                                                            |
| **community**      | `stores/community-atoms.ts`   | `filterAtom`, `sortAtom`                                     |
| **my-roadmaps**    | `stores/my-roadmaps.atoms.ts` | `roadmapsAtom`, `selectedAtom`                               |
| **profile**        | `stores/profile-atoms.ts`     | `profileModeAtom`, `profileBioAtom`                          |
| **roadmap-editor** | `stores/editor-atoms.ts`      | `nodesAtom`, `edgesAtom`, `selectedNodeIdsAtom` (13개 total) |

---

## 🎨 UI Components 위치

### Shared UI Library (shadcn/ui)

```
src/components/ui/
├── button.tsx          ← 버튼
├── input.tsx           ← 입력 필드
├── dialog.tsx          ← 모달
├── form.tsx            ← 폼 (React Hook Form)
├── select.tsx          ← 선택 드롭다운
├── textarea.tsx        ← 텍스트 에어리어
├── card.tsx            ← 카드
├── badge.tsx           ← 배지
├── avatar.tsx          ← 아바타
├── dropdown-menu.tsx   ← 드롭다운
├── scroll-area.tsx     ← 스크롤 영역
├── separator.tsx       ← 구분선
├── tooltip.tsx         ← 툴팁
└── breadcrumb.tsx      ← 브레드크럼
```

모든 feature에서 `@/components/ui/` 경로로 임포트 가능

---

## 🧪 테스트 파일 위치

```
Test Coverage 현황:

✅ roadmap-editor   100%  (복잡도 높음)
✅ profile          59%   (기여도 계산)
⚠️ auth             50%   (인증 로직)
❌ community        부족  (필터/검색)
❌ my-roadmaps      부족  (CRUD)
```

Test 파일은 각 component와 동일 폴더:

```
components/
├── LoginForm/
│   ├── index.tsx
│   └── LoginForm.test.tsx      ← 테스트
```

---

## 📋 Export 패턴 정리

### ✅ Good Pattern (auth, profile, roadmap-editor)

```typescript
// src/features/auth/index.ts
export { AuthCard } from './components/templates/AuthCard';
export { GoogleAuthButton } from './components/atoms/GoogleAuthButton';
export type { RegisterStep } from './types/auth.types';
export { loginSchema } from './schemas/auth.schema';
```

### ❌ Bad Pattern (community)

```typescript
// src/features/community/index.ts
export * from './components'; // ← Wildcard! 지양
```

### ❌ Missing (my-roadmaps)

```typescript
// src/features/my-roadmaps/
// ❌ index.ts 없음 - 생성 필요
```

---

## 🚀 개발 시 체크리스트

### Feature 추가 시

```
[ ] src/features/[feature-name]/ 디렉토리 생성
[ ] components/ 생성 (atoms/, molecules/, organisms/, templates/)
[ ] hooks/ 생성 (필요시)
[ ] stores/ 생성 (상태 필요시)
[ ] types/ 생성 (타입 정의)
[ ] index.ts 생성 (named exports)
[ ] 테스트 파일 추가 (*.test.tsx)
```

### Component 추가 시

```
[ ] 적절한 계층 선택 (atoms/molecules/organisms/templates)
[ ] index.tsx 파일명 사용
[ ] Props interface 정의
[ ] feature 수준의 index.ts에 export 추가
[ ] 테스트 파일 작성
```

### State 추가 시

```
[ ] src/features/[feature]/stores/[feature]-atoms.ts 에 추가
[ ] Jotai atom으로 정의
[ ] feature index.ts에서 export
```

---

## 🎯 자주 묻는 질문

### Q. 새로운 공유 컴포넌트를 추가하려면?

```
A. src/components/ui/your-component.tsx
   pnpm dlx shadcn@latest add component-name (shadcn 컴포넌트)
   또는 직접 생성
```

### Q. Feature 간 코드 공유하려면?

```
A. Feature 간 직접 import X
   → src/shared 또는 src/lib에 공유 모듈 추가
   또는 공유 hook을 src/hooks/에 추가
```

### Q. Atoms 상태는 어디에?

```
A. src/features/[feature]/stores/[feature]-atoms.ts
   export const myAtom = atom(initialValue);
```

### Q. API 호출은 어디서?

```
A. Feature 내 hooks/utils 에서
   또는 TanStack Query 사용 (src/lib/api/)
```

---

## 📌 구조 건강도 지표

| 항목               | 현황                | 상태               |
| ------------------ | ------------------- | ------------------ |
| **Feature 격리**   | 100%                | ✅ Perfect         |
| **Export 패턴**    | 80%                 | ⚠️ 개선 필요       |
| **Test Coverage**  | ~60%                | ⚠️ 부족            |
| **문서화**         | 낮음                | ⚠️ JSDoc 추가 필요 |
| **복잡도**         | roadmap-editor 높음 | ⚠️ 리팩토링 고려   |
| **공유 모듈 활용** | 낮음                | ⚠️ 개선 필요       |

---

## 🔧 다음 할 일

### 우선순위 높음

```
1. my-roadmaps/index.ts 생성 (named exports)
2. community/index.ts 수정 (wildcard → named)
3. editor-test/ 페이지 제거
4. 공유 훅 추출 (src/hooks/)
```

### 우선순위 중간

```
1. Roadmap-editor 리팩토링 (sub-features로 분해)
2. 테스트 커버리지 증대 (community, my-roadmaps)
3. JSDoc 문서화 추가
```

### 우선순위 낮음

```
1. src/lib/utils.ts 활용
2. Storybook 확대
3. 컴포넌트 디렉토리 최적화
```

---

**Last Updated**: 2026-02-14
**Status**: ✅ Ready for Development
