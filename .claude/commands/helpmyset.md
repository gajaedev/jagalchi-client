# Sisyphus System Help - Jagalchi Client

**Purpose**: 프로젝트별 설정, 컨벤션, 워크플로우를 한눈에 확인할 수 있는 종합 가이드입니다.

---

## 📚 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [개발 워크플로우](#개발-워크플로우)
3. [코드 컨벤션](#코드-컨벤션)
4. [아키텍처 규칙](#아키텍처-규칙)
5. [Git & CI/CD](#git--cicd)
6. [테스트 전략](#테스트-전략)
7. [문서 참조](#문서-참조)

---

## 프로젝트 개요

### Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI**: shadcn/ui (Radix UI + CVA)
- **State**: Jotai (client), TanStack Query (server)
- **Form**: React Hook Form + Zod
- **Test**: Vitest, Storybook
- **Build**: pnpm, Husky, ESLint 9

### Project Structure

```
src/
├── app/              # Next.js App Router (routes & layouts)
├── components/ui/    # shadcn/ui components (shared)
├── features/         # Feature modules (ISOLATED - no cross-import)
│   ├── auth/
│   ├── profile/
│   ├── roadmap-editor/
│   └── community/
├── hooks/            # Shared custom hooks
├── lib/              # Utility functions
├── types/            # Shared TypeScript types
└── constants/        # Constants (colors, typography, messages)
```

### Quick Commands

```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm lint --fix   # Auto-fix lint issues
pnpm test         # Run Vitest
pnpm storybook    # Start Storybook (http://localhost:6006)
```

---

## 개발 워크플로우

**⚠️ 모든 작업은 이 4단계를 필수로 따라야 합니다.**

### Phase 1: 작업 시작 전 (Pre-Development)

#### ⚠️ MUST: 브랜치 & 이슈

```bash
# 브랜치 네이밍
<type>/#<issue>-<short-desc>

# 예시
feat/#84-ai-features-ui
fix/#92-login-error
refactor/#101-editor-state
```

**체크리스트**:

- [ ] ⚠️ Issue 번호 확인 (없으면 생성)
- [ ] ⚠️ 브랜치 생성
- [ ] ⚠️ `.github/ISSUE_TEMPLATE/` 템플릿 확인

#### ⚠️ MUST: 복잡도 평가

**Decision Tree**:

```
작업 복잡도 판단:
├─ 1-2 파일 + 명확한 요구사항 → 바로 시작
├─ 3+ 파일 OR 아키텍처 변경 → EnterPlanMode
├─ 불명확한 요구사항 → /intake 또는 AskUserQuestion
└─ UI 작업 + Figma → /intake → FVL 선택
```

**체크리스트**:

- [ ] ⚠️ 파일 변경 개수 추정 (3개 이상 → Plan 필수)
- [ ] ⚠️ EnterPlanMode 사용 여부 결정
- [ ] ⚠️ TodoWrite로 작업 계획 수립

---

### Phase 2: 개발 중 (Development)

#### ⚠️ MUST: 코드 수정 전

**체크리스트**:

- [ ] ⚠️ **기존 코드 먼저 Read** (Read tool 사용)
- [ ] ⚠️ Feature 간 cross-import 금지 확인
- [ ] ⚠️ Named exports 사용 (default export 금지)
- [ ] ⚠️ TypeScript strict mode 준수

**Critical Rules**:

```typescript
// ✅ Good
export { LoginForm } from './LoginForm';
import { Button } from '@/components/ui/button';

// ❌ Bad
export default LoginForm;
import { LoginForm } from '@/features/auth/...'; // Cross-feature import
```

#### ⚠️ MUST: 실시간 추적

**체크리스트**:

- [ ] ⚠️ TodoWrite로 작업 상태 업데이트
- [ ] ⚠️ 작업 완료 즉시 체크리스트 업데이트 (배치 금지)
- [ ] ⚠️ 새 작업 발견 시 Todo 추가

---

### Phase 3: 완료 전 검증 (Pre-Commit)

#### ⚠️ MUST: Sisyphean Checklist

**모든 항목 체크 전까지 commit 금지**:

- [ ] ⚠️ **TODO LIST**: Zero pending/in_progress tasks
- [ ] ⚠️ **FUNCTIONALITY**: 요청된 모든 기능 작동
- [ ] ⚠️ **TESTS**: 모든 테스트 통과
- [ ] ⚠️ **ERRORS**: 해결되지 않은 에러 0개
- [ ] ⚠️ **QUALITY**: Production-ready 코드

#### ⚠️ MUST: 빌드 & 린트

```bash
pnpm lint           # ESLint 검사 (에러 0개)
pnpm tsc --noEmit   # 타입 체크
pnpm build          # Production 빌드 (성공)
```

#### ⚠️ MUST: 셀프 코드 리뷰

- [ ] ⚠️ 불필요한 console.log 제거
- [ ] ⚠️ 주석 처리된 코드 제거
- [ ] ⚠️ 사용하지 않는 import 제거
- [ ] ⚠️ 하드코딩된 값 → 상수로 추출

---

### Phase 4: Commit & PR (Deployment)

#### ⚠️ MUST: Atomic Commits

**형식**:

```bash
<type>(<scope>): <subject>

# 예시
feat(auth): implement social login
fix(editor): resolve node duplication bug
refactor(profile): extract contribution utils
```

**Types**: feat, fix, refactor, perf, test, docs, chore, ai

#### ⚠️ MUST: PR 생성

**체크리스트**:

- [ ] ⚠️ `.github/PULL_REQUEST_TEMPLATE.md` 작성
- [ ] ⚠️ 관련 이슈 링크 (`Closes #<issue>`)
- [ ] ⚠️ 체크리스트 완료
- [ ] ⚠️ 스크린샷 첨부 (UI 변경 시)

**PR 제목**:

```
<type>(#<issue>): <brief description>

# 예시
feat(#84): add AI features UI to editor toolbar
```

---

## 코드 컨벤션

### Export Strategy

**⚠️ MUST: Named exports only**

```typescript
// ✅ Good - Named exports
export { ComponentA } from './ComponentA';
export { ComponentB } from './ComponentB';
export type { TypeA } from './types';

// ❌ Bad - Default exports
export default ComponentA;

// ❌ Bad - Wildcard exports
export * from './ComponentA';
```

### Boolean Variable Naming

**⚠️ MUST: Use prefixes**

```typescript
// ✅ Good
const [isVisible, setIsVisible] = useState(false);
const [hasError, setHasError] = useState(false);
const [canSubmit, setCanSubmit] = useState(false);

// ✅ Good - Enum exception
const [mode, setMode] = useState<'show' | 'edit'>('show');

// ❌ Bad
const [visible, setVisible] = useState(false);
```

### UI String Management

**⚠️ MUST: Use constants**

```typescript
// src/constants/messages.ts
export const PROFILE_MESSAGES = {
  BIO_TITLE: '자기소개',
  COMPLETED_ROADMAP: '완주한 로드맵',
} as const;

// Component usage
import { PROFILE_MESSAGES } from '@/constants/messages';
<h3>{PROFILE_MESSAGES.BIO_TITLE}</h3>
```

### TypeScript Type Exports

**⚠️ MUST: Use `export type` for re-exports**

```typescript
// ✅ Good
export type { Contribution } from './utils/contribution-utils';
export { COLORS, getLevel } from './utils/contribution-utils';

// ❌ Bad - Build error with isolatedModules
export { Contribution, COLORS, getLevel } from './utils/contribution-utils';
```

### Naming Conventions

| Target              | Style             | Example                   |
| ------------------- | ----------------- | ------------------------- |
| Variables/Functions | camelCase         | `userName`, `getUserData` |
| Constants           | UPPER_SNAKE       | `MAX_COUNT`, `API_URL`    |
| Components/Types    | PascalCase        | `LoginButton`, `UserData` |
| Files (component)   | PascalCase        | `LoginButton.tsx`         |
| Files (general)     | kebab-case        | `use-auth.ts`             |
| Folders             | kebab-case        | `user-profile/`           |
| Boolean             | is/has/can/should | `isLoading`, `hasError`   |

---

## 아키텍처 규칙

### Feature Isolation

**⚠️ MUST: NO cross-feature imports**

```
Dependency Rules:
app (routing/pages)
  ↓ can import
features (isolated)
  ↓ can import
shared (components, hooks, lib, types, constants)
```

**✅ ALLOWED**:

```typescript
// Inside feature
import { Button } from '@/components/ui/button';
import { useAuth } from './hooks/use-auth';
```

**❌ FORBIDDEN**:

```typescript
// Cross-feature import
import { LoginForm } from '@/features/auth/components/organisms/LoginForm';
```

### Component Organization (Atomic Design)

```
features/auth/components/
├── atoms/       # GoogleAuthButton, FormErrorMessage
├── molecules/   # FormField, PasswordInput
├── organisms/   # LoginForm, RegisterForm
└── templates/   # AuthCard
```

### Import Path Aliases

```typescript
'@/components/*'  →  src/components/*
'@/lib/*'         →  src/lib/*
'@/features/*'    →  src/features/*
'@/app/*'         →  src/app/*
```

---

## Git & CI/CD

### Branch Strategy

```bash
# Main branches
main     # Production (protected)
develop  # Development (default)

# Feature branches
feat/#<issue>-<desc>
fix/#<issue>-<desc>
refactor/#<issue>-<desc>
```

### Git Hooks (Husky)

```bash
# pre-commit
pnpm lint-staged  # Auto-fix + format

# commit-msg
pnpm commitlint   # Conventional commits validation
```

### GitHub Actions Workflows

1. **CI** - Lint, Type check, Build, Test
2. **Auto Label** - PR/Issue 자동 라벨링
3. **Discord Notify** - PR/Deploy 알림
4. **Netlify Preview** - Preview 배포
5. **PR Comment** - 자동 코멘트
6. **Release** - 릴리즈 자동화
7. **Storybook** - Storybook 빌드/배포

### GitHub Templates

- **PR Template**: `.github/PULL_REQUEST_TEMPLATE.md`
- **Issue Templates** (6개):
  - `ai-task.yml`
  - `bug.yml`
  - `chore.yml`
  - `docs.yml`
  - `feature.yml`
  - `refactor.yml`

---

## 테스트 전략

### Tools

- **Vitest**: Unit tests (hooks, utils, logic)
- **Testing Library**: Component tests
- **Storybook**: Visual documentation & testing

### Test Location

```
features/[feature]/__tests__/
├── LoginForm.test.tsx
├── use-auth.test.ts
└── auth.utils.test.ts
```

### Coverage Goals

| Feature | Target | Current |
| ------- | ------ | ------- |
| Editor  | 100%   | 100% ✅ |
| Auth    | 80%    | 50% 🟡  |
| Profile | 80%    | 59% 🟡  |

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

---

## 문서 참조

### 프로젝트 문서 (.claude/)

| 파일                            | 내용                           |
| ------------------------------- | ------------------------------ |
| `CLAUDE.md`                     | 프로젝트 메인 가이드           |
| `design_system_rules.md`        | Figma 통합 가이드 (800줄)      |
| `rules/development-workflow.md` | 개발 워크플로우 (이 문서 기반) |
| `rules/architecture.md`         | Feature isolation, 의존성 규칙 |
| `rules/code-style.md`           | 네이밍, Import 순서            |
| `rules/workflow.md`             | Git, Branch, Commit 규칙       |
| `rules/testing.md`              | 테스트 전략                    |
| `rules/do-not-touch.md`         | 수정 금지 파일                 |

### 글로벌 문서 (~/.claude/)

| 파일                       | 내용                         |
| -------------------------- | ---------------------------- |
| `CLAUDE.md`                | Sisyphus 시스템 개요         |
| `sisyphus-system.md`       | 스킬, 에이전트, 커맨드 상세  |
| `git-planning-guide.md`    | Git 마스터리 & Planning      |
| `engineering-practices.md` | 에러, 디버깅, 보안, 리팩토링 |
| `fvl-policy.md`            | Frontend 검증 레벨           |
| `intake-policy.md`         | 요청 정제 시스템             |
| `performance-guide.md`     | React 렌더링, 번들, 네트워크 |
| `pr-review-guide.md`       | PR 작성/리뷰 체크리스트      |
| `cicd-guide.md`            | CI/CD, 환경별 배포           |
| `accessibility-guide.md`   | WCAG 2.1 체크리스트          |
| `design-system-guide.md`   | 디자인 시스템 관리           |
| `pm-dev-collaboration.md`  | 기획-개발 협업               |
| `figma-workflow-guide.md`  | Figma → 코드 워크플로우      |

---

## Workflow Commands (Quick Reference)

### 실행 명령어

| Command               | Phase   | Usage                        |
| --------------------- | ------- | ---------------------------- |
| `/intake <request>`   | Phase 1 | 요구사항 정제 (Figma 통합)   |
| `/plan <task>`        | Phase 1 | 계획 수립 (Prometheus)       |
| `/ultrawork <task>`   | Phase 2 | 병렬 실행 최대 성능          |
| `/ui <level> <scope>` | Phase 2 | Frontend 검증 (FVL)          |
| `/sisyphus <task>`    | Phase 2 | 멀티 에이전트 오케스트레이션 |
| `/git-master`         | Phase 4 | Atomic commits 도움          |
| `/helpmyset`          | Any     | 이 가이드 표시               |

### 검증 명령어

| Command           | Usage           |
| ----------------- | --------------- |
| `pnpm lint`       | ESLint 검사     |
| `pnpm lint --fix` | 자동 수정       |
| `pnpm build`      | Production 빌드 |
| `pnpm test`       | 테스트 실행     |
| `pnpm storybook`  | Storybook 실행  |

---

## Quick Checklist

**매 작업마다 이것만 확인하세요**:

```
[ ] ⚠️ Phase 1: 브랜치 생성 + 계획 수립
[ ] ⚠️ Phase 2: 기존 코드 Read + TodoWrite 업데이트
[ ] ⚠️ Phase 3: Sisyphean Checklist + Lint + Build
[ ] ⚠️ Phase 4: Atomic commits + PR 템플릿
```

**이 4단계만 지키면 90%의 문제 예방 가능합니다.**

---

## Enforcement Policy

### High Severity (작업 중단 필수)

- Phase 1 없이 코딩 시작
- 기존 코드 안 읽고 수정
- Cross-feature import 사용
- Phase 3 체크리스트 미완료 상태로 commit
- Lint/Build 실패 상태로 PR 생성

### Medium Severity (경고 후 계속)

- TodoWrite 미사용
- 테스트 미작성 (신규 기능)
- JSDoc 미작성 (복잡한 로직)

### Low Severity (무시 가능)

- Storybook 미작성
- PR 크기 500줄 초과

---

## Contact & Support

- **Issue 생성**: `.github/ISSUE_TEMPLATE/` 사용
- **PR 리뷰 요청**: `@codeowners` 태그
- **문서 개선**: `.claude/` 파일 수정 후 PR

**이 가이드는 항상 최신 상태를 유지합니다. 의문 사항이 있으면 먼저 이 문서를 확인하세요.**
