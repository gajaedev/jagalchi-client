# Jagalchi Client

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Jagalchi is a learning roadmap platform where students can fork and customize educational paths from seniors.

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS
- UI: shadcn/ui
- State: Jotai (client), TanStack Query (server)
- Form: React Hook Form + Zod
- Test: Vitest, Storybook

## Project Structure

```
src/
├── app/           # Next.js App Router
├── components/ui/ # shadcn/ui components
├── features/      # Feature modules (isolated, no cross-import)
├── hooks/         # Shared custom hooks
├── lib/           # Utility functions
├── types/         # Shared type definitions
└── constants/     # Constants
```

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm lint --fix   # Auto-fix lint issues
pnpm test         # Run Vitest
pnpm storybook    # Start Storybook
```

## Critical Rules

- **NEVER** import between features directly. Use shared modules.
- **ALWAYS** run `pnpm lint` before committing.
- **ALWAYS** use TypeScript strict mode.

## Code Conventions

### Export Strategy

- **Named exports only** - Do NOT use default exports
- **Barrel files (index.ts)** - Use explicit named exports, NOT wildcard (`export *`)

```typescript
// ✅ Good - Explicit exports
export { ComponentA } from './ComponentA';
export { ComponentB } from './ComponentB';
export type { TypeA } from './types';

// ❌ Bad - Wildcard exports
export * from './ComponentA';

// ❌ Bad - Default exports
export default ComponentA;
```

### Boolean Variable Naming

- Use `is`, `has`, `can`, `should` prefixes for boolean variables
- Exception: Enum-like string unions (e.g., `mode: 'show' | 'edit'`) should NOT use prefix

```typescript
// ✅ Good
const [isVisible, setIsVisible] = useState(false);
const [isLocked, setIsLocked] = useState(false);
const [hasError, setHasError] = useState(false);

// ✅ Good - Enum exception
const [mode, setMode] = useState<'show' | 'edit'>('show');

// ❌ Bad
const [visible, setVisible] = useState(false);
const [locked, setLocked] = useState(false);
```

### UI String Management

- Store all user-facing strings in `src/constants/messages.ts`
- Organize by feature using const objects with `as const`
- Prepare for future i18n migration

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

- When re-exporting types with `isolatedModules` enabled, use `export type`

```typescript
// ✅ Good
export type { Contribution } from './utils/contribution-utils';
export { COLORS, getLevel } from './utils/contribution-utils';

// ❌ Bad - Will cause build error
export { Contribution, COLORS, getLevel } from './utils/contribution-utils';
```

### Component Structure

- **Templates** - Use folder structure (not single file)
- **All components** - Place test file in same folder

```
templates/
├── AuthCard/
│   ├── index.tsx
│   └── AuthCard.test.tsx
└── Profile/
    ├── index.tsx
    └── Profile.test.tsx
```

### JSDoc Comments

- Add JSDoc only for complex logic, utilities, and non-obvious types
- Keep it minimal and concise
- Focus on "why" not "what"

```typescript
/**
 * 깃허브 스타일 기여 그래프를 위한 더미 데이터 생성
 * @param days - 생성할 일수 (기본 365일)
 * @returns 날짜별 기여 횟수 배열
 */
export function generateMockContributions(days = 365) { ... }
```

### Storybook

- **shadcn/ui components** - Place stories in `src/stories/ui/`
- **Feature components** - Place stories next to component (if needed)
- Include basic usage + main variants

```typescript
// src/stories/ui/Button.stories.tsx
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;
```

## Test Coverage

Current status (as of 2026-01-13):

- Editor: 100% coverage
- Auth: 50% coverage
- Profile: 59% coverage

See `~/.claude/test-coverage-report.md` for detailed missing test list.

## Git Worktree 컨벤션

이 프로젝트에서 여러 worktree 사용 시:

- **네이밍:** `../jagalchi-<issue-number>` (예: `../jagalchi-34`)
- **위치:** 메인 저장소 디렉토리와 동일 레벨
- **병렬 빌드:** `pnpm build`를 `run_in_background: true`로 실행
- **정리:** PR 머지 후 worktree 삭제

**예시:**

```bash
# 여러 worktree 생성
for issue in 34 35 37; do
  git worktree add ../jagalchi-${issue} feat/#${issue}
done

# 병렬 빌드 (Claude에서 run_in_background: true 사용)
cd ../jagalchi-34 && pnpm build
cd ../jagalchi-35 && pnpm build
cd ../jagalchi-37 && pnpm build

# 정리
git worktree remove ../jagalchi-34
```
