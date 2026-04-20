# Jagalchi Client - 프로젝트 구조 완전 분석

**생성 날짜**: 2026-02-14
**분석 범위**: `src/` 디렉토리 전체 (265 TypeScript 파일 중 220개가 features)
**상태**: ✅ 체계적 아키텍처 구현 (Feature-based isolation 준수)

---

## 📊 전체 구조 개요

### 파일 통계

| 항목                   | 수량      |
| ---------------------- | --------- |
| **총 TypeScript 파일** | 265       |
| **Feature 파일**       | 220 (83%) |
| **Shared 파일**        | 45 (17%)  |
| **Test 파일**          | 61        |
| **Feature 개수**       | 5         |

### 프로젝트 구성

```
src/
├── app/                          # Next.js App Router (12 pages/layouts)
├── features/                     # Feature modules (220 files)
│   ├── auth/                    # 인증 (21 files)
│   ├── community/               # 커뮤니티 (27 files)
│   ├── my-roadmaps/             # 내 로드맵 (28 files)
│   ├── profile/                 # 프로필 (37 files)
│   └── roadmap-editor/          # 로드맵 에디터 (107 files - 가장 복잡)
├── components/ui/               # shadcn/ui 컴포넌트 (15개)
├── hooks/                        # 공유 훅 (1개)
├── lib/                          # 유틸리티 (1개)
├── constants/                    # 상수 (3개)
└── stories/                      # Storybook
```

---

## 🏗️ Feature 상세 분석

### 1. Auth Feature (21 files - 8% of features)

**역할**: 인증 및 사용자 계정 관리

**내부 구조**:

```
auth/
├── components/
│   ├── atoms/
│   │   └── GoogleAuthButton/          (Google OAuth)
│   ├── molecules/
│   │   ├── PasswordInput/
│   │   └── VerificationCodeInput/
│   ├── organisms/
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   ├── FindPasswordForm/
│   │   └── register-steps/            (3-step register flow)
│   │       ├── RegisterStep1Form.tsx
│   │       ├── RegisterStep2Form.tsx
│   │       └── RegisterStep3Form.tsx
│   └── templates/
│       └── AuthCard/                  (Layout wrapper)
├── hooks/
│   └── use-verification-code.ts       (이메일 인증 로직)
├── schemas/
│   ├── auth.schema.ts                 (Zod 스키마)
│   └── auth.schema.test.ts            (테스트)
├── types/
│   └── auth.types.ts
└── index.ts                           (Barrel: 7개 named exports)
```

**주요 특징**:

- ✅ 3단계 회원가입 flow (Step1, Step2, Step3)
- ✅ 이메일 인증 코드 검증
- ✅ Google OAuth 통합
- ✅ Zod 스키마 기반 validation
- ✅ Test coverage: 50% (3 test files)

**Export 패턴**: Named exports (7개)

```typescript
export { AuthCard, GoogleAuthButton, PasswordInput, ... }
export type { RegisterStep, FindPasswordStep, ... }
export { loginSchema, registerStep1Schema, ... }
```

---

### 2. Community Feature (27 files - 12% of features)

**역할**: 로드맵 커뮤니티 탐색 및 공유

**내부 구조**:

```
community/
├── components/
│   ├── atoms/
│   │   ├── ContributorItem/           (사용자 정보)
│   │   └── RoadmapCard/               (로드맵 카드)
│   ├── molecules/
│   │   ├── CommunityFilter/           (검색/필터)
│   │   └── CommunityHero/             (Hero section)
│   ├── organisms/
│   │   └── CommunityGrid/             (로드맵 그리드)
│   └── templates/
│       ├── Community/                 (메인 페이지)
│       └── RoadmapDetail/             (상세 페이지)
├── hooks/
│   └── use-click-outside/             (클릭 감지)
├── stores/
│   └── community-atoms.ts             (Jotai atoms)
├── types/
│   └── community.types.ts
├── utils/
│   └── community-utils/               (유틸리티 함수)
├── constants/
│   └── community.constants.ts
└── index.ts                           (Barrel: wildcard export *)
```

**주요 특징**:

- ✅ 로드맵 검색/필터 기능
- ✅ 기여도 그래프 (Contributor stats)
- ✅ Jotai 상태 관리
- ⚠️ Wildcard export 사용 (지양 권장)
- ✅ Test files: 구조 정리 필요

**Export 패턴**: Wildcard export (지양)

```typescript
export * from './components'; // ❌ Wildcard
```

---

### 3. My-Roadmaps Feature (28 files - 13% of features)

**역할**: 사용자의 로드맵 관리 (생성, 편집, 삭제)

**내부 구조**:

```
my-roadmaps/
├── components/
│   ├── atoms/
│   │   └── RoadmapCard/               (로드맵 카드)
│   ├── molecules/
│   │   ├── AddDirectoryModal/         (디렉토리 추가)
│   │   ├── AddRoadmapModal/           (로드맵 추가)
│   │   ├── SelectLocationModal/       (위치 선택)
│   │   └── MyRoadmapsToolbar/         (상단 도구모음)
│   ├── MyRoadmapsFilter/              (필터)
│   ├── organisms/
│   │   ├── MyRoadmapsGrid/            (그리드)
│   │   ├── MyRoadmapsHeader/          (헤더)
│   │   └── MyRoadmapsSidebar/         (사이드바)
│   └── templates/
│       └── MyRoadmaps/                (메인 레이아웃)
├── hooks/
│   └── use-roadmap-state.ts           (상태 관리)
├── stores/
│   └── my-roadmaps.atoms.ts           (Jotai atoms)
├── types/
│   └── my-roadmaps.types.ts
└── index.ts                           (Barrel file 없음 ⚠️)
```

**주요 특징**:

- ✅ 로드맵 CRUD 작업
- ✅ 디렉토리 구조 지원
- ✅ Modal 기반 상호작용
- ⚠️ Feature index.ts 없음 (구조 불완전)
- ✅ Jotai 상태 관리

**Export 패턴**: Missing barrel file

```typescript
// ❌ index.ts 파일 없음
```

---

### 4. Profile Feature (37 files - 17% of features)

**역할**: 사용자 프로필 및 통계

**내부 구조**:

```
profile/
├── components/
│   ├── atoms/
│   │   ├── ProfileEditButton/
│   │   ├── ProfileLinkAddButton/
│   │   ├── ProfilePicture/            (아바타)
│   │   └── RoadmapCard/
│   ├── molecules/
│   │   ├── ContributionGraph/         (기여도 그래프)
│   │   ├── ProfileBio/
│   │   ├── ProfileCustomBoxArea/
│   │   ├── ProfileCustomOrganization/
│   │   ├── ProfileHeader/
│   │   ├── ProfileInfoForm/           (프로필 폼)
│   │   ├── ProfileStreak/             (연속 기록)
│   │   └── RoadmapList/
│   ├── organisms/
│   │   ├── AddRoadmapModal/
│   │   ├── MadeRoadmapList/
│   │   ├── ProfileCustomLinks/        (소셜 링크)
│   │   └── ProfileThirdBox/
│   └── templates/
│       └── Profile/                   (메인 레이아웃)
├── stores/
│   └── profile-atoms.ts               (Jotai atoms - 5개)
├── utils/
│   ├── contribution-utils/            (기여도 계산)
│   └── generate-mock-contributions/   (Mock 데이터)
└── index.ts                           (Barrel: named exports 19개)
```

**주요 특징**:

- ✅ GitHub 스타일 기여도 그래프
- ✅ 연속 기록 (streak) 계산
- ✅ 사용자 맞춤형 박스 (Custom boxes)
- ✅ 소셜 링크 관리
- ✅ Mock 데이터 생성 함수
- ✅ Test coverage: 59%

**Export 패턴**: Named exports (19개)

```typescript
export {
  ProfileEditButton,
  ProfileLinkAddButton,
  ProfilePicture,
  // ... (19개 전체)
}
export { profileModeAtom, profileBioAtom, ... }
export type { Contribution }
export { COLORS, getLevel, ... }
```

---

### 5. Roadmap-Editor Feature (107 files - 49% of features) ⭐

**역할**: 로드맵 편집 (가장 복잡한 feature)

**내부 구조**:

```
roadmap-editor/
├── components/
│   ├── atoms/ (7개)
│   │   ├── ColorPickerInline/
│   │   ├── ColorPresetButton/
│   │   ├── EditorDivider/
│   │   ├── EditorInput/
│   │   ├── LoadingButton/
│   │   ├── PlusButtonHandle/
│   │   └── ToolbarButton/
│   ├── molecules/ (8개)
│   │   ├── ColorPicker/
│   │   ├── ColorSelector/
│   │   ├── ConnectionLine/           (그래프 연결선)
│   │   ├── EditorAiMenu/
│   │   ├── JagalchiNode/             (노드 컴포넌트)
│   │   ├── JagalchiSection/          (섹션 컴포넌트)
│   │   ├── JagalchiText/             (텍스트 컴포넌트)
│   │   └── index.ts
│   ├── organisms/ (14개)
│   │   ├── EdgePropertiesPanel/      (엣지 속성)
│   │   ├── EditorHeader/
│   │   ├── EditorSidebar/
│   │   ├── EditorToolbar/
│   │   ├── MultiSelectPanel/         (다중 선택)
│   │   ├── NodePropertiesPanel/      (노드 속성)
│   │   ├── ResourceRecommendationModal/
│   │   ├── RoadmapAiModal/           (AI 기능)
│   │   ├── RoadmapCanvas/            (그래프 캔버스)
│   │   ├── RoadmapGenerationForm/    (자동 생성)
│   │   ├── RoadmapModificationForm/  (수정 폼)
│   │   ├── SectionPropertiesPanel/   (섹션 속성)
│   │   ├── TextPropertiesPanel/      (텍스트 속성)
│   │   └── UnsavedChangesDialog/     (저장 확인)
│   ├── templates/
│   │   └── RoadmapEditor/
│   ├── pages/                        (특수 디렉토리)
│   │   └── RoadmapEditorPage/
│   ├── hooks/ (4개)
│   │   ├── use-canvas-center.ts
│   │   ├── use-editor-state.ts
│   │   ├── use-node-operations.ts
│   │   └── use-edge-operations.ts
│   ├── stores/ (2개)
│   │   ├── editor-atoms.ts           (13개 atoms)
│   │   └── ui-atoms.ts
│   ├── types/ (2개)
│   │   ├── editor.types.ts
│   │   └── canvas.types.ts
│   ├── utils/ (3개)
│   │   ├── node-factory.ts           (노드 생성)
│   │   ├── align-nodes.ts            (정렬)
│   │   └── canvas-utils.ts
│   ├── constants/ (3개)
│   │   ├── node-colors.ts
│   │   ├── preset-colors.ts
│   │   └── editor.constants.ts
│   ├── schemas/
│   │   └── editor.schema.ts          (Zod validation)
│   └── index.ts                      (Barrel: 36개 named exports)
```

**주요 특징**:

- ✅ React Flow 기반 그래프 에디터
- ✅ Node/Edge/Section/Text 컴포넌트
- ✅ 색상 선택기 (Color picker)
- ✅ AI 기반 로드맵 생성/수정
- ✅ 다중 선택 지원
- ✅ 속성 패널 (Properties panels)
- ✅ 변경사항 추적 (Unsaved changes)
- ✅ 13개 Jotai atoms (상태 관리)
- ✅ 4개 커스텀 훅
- ⚠️ 복잡도 높음 (107 files)
- ✅ Test coverage: 100% (에디터)

**Export 패턴**: Named exports (36개)

```typescript
// Components
export { ColorPresetButton, ToolbarButton, ... }
// Hooks
export { useCanvasCenter }
// Stores
export { nodesAtom, edgesAtom, ... }
// Types
export type { NodeColorVariant, ... }
// Utils
export { createJagalchiNode, alignNodes, ... }
// Constants
export { getNodeColors, NODE_PRESET_COLORS, ... }
```

---

## 🔗 라우팅 구조 (App Router)

### 페이지 계층 구조

```
src/app/
├── layout.tsx                         (Root layout - font config)
├── page.tsx                          (홈 페이지 - /)
│
├── (auth)                            (Group - 인증 페이지)
│   ├── layout.tsx                    (Auth layout)
│   ├── login/page.tsx                (/auth/login)
│   ├── register/page.tsx             (/auth/register)
│   └── find-password/page.tsx        (/auth/find-password)
│
├── (editor)                          (Group - 에디터)
│   └── editor/[id]/page.tsx          (/editor/[id])
│
├── (profile)                         (Group - 프로필)
│   └── profile/page.tsx              (/profile)
│
├── (community)                       (Group - 커뮤니티)
│   └── community/
│       ├── page.tsx                  (/community)
│       └── [id]/page.tsx             (/community/[id])
│
├── (myroadmap)                       (Group - 내 로드맵)
│   └── myroadmap/page.tsx            (/myroadmap)
│
└── editor-test/page.tsx              (/editor-test) ⚠️ 테스트 페이지
```

**라우팅 패턴**:

- ✅ Route groups 사용 `(name)` - 레이아웃 분리
- ✅ Dynamic routes `[id]` - 커뮤니티/에디터
- ⚠️ `editor-test` 페이지 - 개발용 (배포 시 제거 권장)

---

## 🎯 공유 모듈 (Shared)

### 1. Components/UI (15개 shadcn/ui)

```
src/components/ui/
├── avatar.tsx
├── badge.tsx
├── breadcrumb.tsx
├── button.tsx
├── card.tsx
├── dialog.tsx
├── dropdown-menu.tsx
├── form.tsx
├── input.tsx
├── label.tsx
├── scroll-area.tsx
├── select.tsx
├── separator.tsx
├── textarea.tsx
└── tooltip.tsx
```

**특징**:

- ✅ Shadcn/ui 기반 (radix-ui + tailwind)
- ✅ 모든 feature에서 재사용 가능
- ✅ Styled components (Tailwind CSS)

### 2. Hooks (1개)

```
src/hooks/
└── use-debounce.ts                   (디바운스 훅)
```

**특징**:

- ⚠️ 공유 훅 1개만 존재
- 각 feature별로 custom hook이 자체 정의 (중복 가능성 있음)

### 3. Constants (3개)

```
src/constants/
├── colors.ts                         (팔레트 정의)
├── messages.ts                       (UI 문자열)
└── typography.ts                     (타이포그래피)
```

**특징**:

- ✅ UI 문자열 중앙화 (messages.ts)
- ✅ 색상 팔레트 (colors.ts)
- ✅ 타이포그래피 설정

### 4. Lib (1개)

```
src/lib/
└── utils.ts                          (유틸리티 함수 - empty)
```

**특징**:

- ⚠️ utils.ts 빈 상태 - 사용 중인 기능 없음

---

## 📐 Architecture 준수 검증

### Dependency Rules ✅

```
app/ (라우팅)
  ↓ imports from
features/ (격리된 기능)
  ↓ imports from
shared/ (공유 모듈)
  - components/ui/
  - hooks/
  - lib/
  - types/
  - constants/
```

**검증 결과**:

- ✅ Feature 간 cross-import 없음
- ✅ 공유 모듈은 모든 feature에서 접근 가능
- ✅ Feature는 자체 hooks/stores/types 보유
- ✅ App router는 feature components 임포트

### Export 패턴 검증

| Feature            | Export 패턴             | 상태      |
| ------------------ | ----------------------- | --------- |
| **auth**           | Named exports           | ✅ Good   |
| **community**      | Wildcard export         | ⚠️ 지양   |
| **my-roadmaps**    | 없음 (missing index.ts) | ❌ 불완전 |
| **profile**        | Named exports           | ✅ Good   |
| **roadmap-editor** | Named exports           | ✅ Good   |

---

## 📊 File Distribution Analysis

### Feature 별 파일 분포

```
roadmap-editor   ████████████████████████ 107 (49%)
profile          ████████████ 37 (17%)
my-roadmaps      ██████████ 28 (13%)
community        ███████████ 27 (12%)
auth             ██████ 21 (9%)
────────────────────────────────
TOTAL            220 files
```

### Component Hierarchy 분포

**Feature 내 컴포넌트 분포**:

- ✅ 모든 feature에서 atoms → molecules → organisms → templates 구조 준수
- ✅ Atomic design principles 일관되게 적용
- ✅ 컴포넌트 재사용성 높음

### 조직 단위별 구조

```
각 Feature 표준 구조:
├── components/           (UI 컴포넌트)
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── hooks/                (Feature custom hooks)
├── stores/               (Jotai atoms - 옵션)
├── types/                (TS 타입 정의)
├── utils/                (유틸리티 함수 - 옵션)
├── constants/            (상수 - 옵션)
├── schemas/              (Zod validation - 옵션)
└── index.ts              (Barrel file)
```

---

## 🔍 일관성 평가

### Strengths ✅

1. **Feature Isolation**: 완벽한 기능 모듈 분리
   - 각 feature는 독립적으로 배포/테스트 가능
   - Cross-feature 의존성 없음

2. **Atomic Design 적용**: 일관된 컴포넌트 계층
   - atoms → molecules → organisms → templates
   - 재사용성과 유지보수성 우수

3. **Barrel Files**: 공개 API 명확화
   - Feature 진입점 명시적
   - 내부 구조 캡슐화

4. **State Management**: Jotai 통일
   - 모든 feature에서 일관된 상태 관리
   - 보일러플레이트 최소화

5. **Type Safety**: TypeScript strict mode
   - 전체 codebase strict mode 적용
   - Type 정의 명확

### Weaknesses ⚠️

1. **Export 패턴 불일치**
   - community: wildcard export (지양)
   - my-roadmaps: index.ts 없음 (불완전)
   - auth, profile, roadmap-editor: named exports (좋음)

2. **공유 훅 부족**
   - src/hooks/ 에 1개만 존재
   - Feature별로 중복 구현 가능성
   - use-debounce 외 공유 가능한 훅 필요

3. **Shared Utils 미활용**
   - src/lib/utils.ts 사용 안 함
   - 공유 가능한 함수들이 feature 내에 산재

4. **Roadmap-Editor 복잡도**
   - 107 files (49% of features)
   - 세부 분기 너무 깊음
   - 리팩토링 고려 (sub-features로 분해)

5. **테스트 파일 구성**
   - 총 61개 test files
   - Feature별로 분포 불균등
   - auth: 50%, profile: 59%, roadmap-editor: 100%
   - community, my-roadmaps: 테스트 부족

6. **개발용 코드**
   - editor-test/page.tsx 존재
   - 배포 시 제거 필요

---

## 📋 Directory Structure Completeness

### Standard Feature Structure

```
✅ auth/
  ✅ components/
    ✅ atoms/
    ✅ molecules/
    ✅ organisms/
    ✅ templates/
  ✅ hooks/
  ❌ stores/
  ✅ types/
  ✅ schemas/
  ✅ index.ts

✅ community/
  ✅ components/ (atoms, molecules, organisms, templates)
  ❌ hooks/
  ✅ stores/
  ✅ types/
  ✅ utils/
  ✅ constants/
  ⚠️ index.ts (wildcard export)

⚠️ my-roadmaps/
  ✅ components/ (atoms, molecules, organisms, templates)
  ✅ hooks/
  ✅ stores/
  ✅ types/
  ❌ index.ts (missing)

✅ profile/
  ✅ components/ (atoms, molecules, organisms, templates)
  ❌ hooks/
  ✅ stores/
  ✅ utils/
  ✅ index.ts

✅ roadmap-editor/
  ✅ components/ (atoms, molecules, organisms, templates)
  ✅ hooks/
  ✅ stores/
  ✅ types/
  ✅ utils/
  ✅ constants/
  ✅ schemas/
  ✅ pages/
  ✅ index.ts
```

---

## 🎯 권장사항 (Summary)

### 긴급 개선 (High Priority)

1. **my-roadmaps/index.ts 생성**

   ```typescript
   // Named exports로 통일
   export { MyRoadmaps } from './components/templates/MyRoadmaps';
   export {} from /* ... */ './components/';
   ```

2. **community/index.ts 수정**

   ```typescript
   // Wildcard 대신 named exports 사용
   export { Community, RoadmapDetail } from './components/templates';
   export /* ... */ {};
   ```

3. **editor-test/page.tsx 제거**
   - 배포 시 제거 필수

### 중요 개선 (Medium Priority)

1. **공유 훅 추출**
   - feature 내 반복되는 hooks를 src/hooks/로 이동
   - use-node-selection, use-form-state 등

2. **Roadmap-Editor 리팩토링**
   - 107 files → sub-features로 분해
   - editor-canvas/, editor-properties/, editor-ai/ 등

3. **테스트 커버리지 증대**
   - community: 현재 미흡
   - my-roadmaps: 현재 미흡

### 권장 개선 (Low Priority)

1. **src/lib/utils.ts 활용**
   - 공유 유틸리티 함수 추가

2. **Component 문서화**
   - Storybook 확대
   - JSDoc 추가

---

## 📌 결론

**Jagalchi Client는 체계적인 Feature-based 아키텍처를 잘 구현하고 있습니다.**

### 현황

- ✅ Feature isolation 완벽
- ✅ Atomic design 일관성 있음
- ✅ Type safety 우수
- ✅ 확장성 좋음
- ⚠️ 소수의 구조적 불일치 (export 패턴, missing index.ts)
- ⚠️ 테스트 분포 불균등

### 다음 단계

1. Export 패턴 통일 (my-roadmaps, community)
2. Roadmap-editor 복잡도 관리
3. 공유 모듈 강화 (hooks, utils)
4. 테스트 커버리지 균등화

이 구조를 유지하면서 위의 개선사항을 적용하면 더욱 견고한 아키텍처를 갖출 수 있습니다.
