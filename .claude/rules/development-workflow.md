# Development Workflow

**Purpose**: 모든 개발 작업의 필수 프로세스를 명시합니다. Claude Code가 이 워크플로우를 **무조건 따라야** 합니다.

**Enforcement Policy**:
- ⚠️ **MUST** - 필수 단계 (위반 시 작업 중단, 사용자 확인 필요)
- 💡 **SHOULD** - 권장 단계 (경고 후 계속 진행 가능)

---

## 📋 Phase 1: 작업 시작 전 (Pre-Development)

### ⚠️ MUST: 브랜치 & 이슈 확인

```bash
# 브랜치 네이밍 규칙
<type>/#<issue-number>-<short-description>

# 예시
feat/#84-ai-features-ui
fix/#92-login-error
refactor/#101-editor-state
```

**체크리스트**:
- [ ] ⚠️ Issue 번호 확인 (이슈 없으면 생성 필요)
- [ ] ⚠️ 브랜치 생성 (`git checkout -b feat/#<issue>-<desc>`)
- [ ] ⚠️ `.github/ISSUE_TEMPLATE/` 템플릿 확인

### ⚠️ MUST: 복잡도 평가 & 계획

**Decision Tree**:

```
작업 복잡도 판단:
├─ 1-2 파일 + 명확한 요구사항 → 바로 시작
├─ 3+ 파일 OR 아키텍처 변경 → EnterPlanMode
├─ 불명확한 요구사항 → /intake 또는 AskUserQuestion
└─ UI 작업 + Figma 있음 → /intake → FVL 선택
```

**체크리스트**:
- [ ] ⚠️ 파일 변경 개수 추정 (3개 이상 → Plan 필수)
- [ ] ⚠️ EnterPlanMode 사용 여부 결정
- [ ] ⚠️ TodoWrite로 작업 계획 수립

**예시**:

```markdown
# 단순 작업 (Plan 불필요)
- 1개 파일 버그 수정
- 단일 컴포넌트 스타일 변경
- 오타 수정

# 복잡한 작업 (Plan 필수)
- 새 기능 추가 (3+ 파일)
- 아키텍처 리팩토링
- API 통합
- 상태 관리 변경
```

### 💡 SHOULD: UI 작업 전 확인

**UI 작업 시**:
- [ ] Figma 디자인 확인 (`/intake` 사용 권장)
- [ ] `src/components/ui/` 기존 컴포넌트 먼저 확인
- [ ] `design_system_rules.md` 참고
- [ ] FVL (Frontend Verification Level) 선택

---

## 🔨 Phase 2: 개발 중 (Development)

### ⚠️ MUST: 코드 수정 전 필수 작업

**체크리스트**:
- [ ] ⚠️ **기존 코드 먼저 Read** (Read tool 사용)
- [ ] ⚠️ Feature 간 cross-import 금지 확인
- [ ] ⚠️ Named exports 사용 (default export 금지)
- [ ] ⚠️ TypeScript strict mode 준수

**Critical Rules**:

```typescript
// ✅ Good - Named exports
export { LoginForm } from './LoginForm';
export { useAuth } from './use-auth';

// ❌ Bad - Default exports
export default LoginForm;

// ✅ Good - Feature isolation
import { Button } from '@/components/ui/button';
import { useAuth } from './hooks/use-auth';

// ❌ Bad - Cross-feature import
import { LoginForm } from '@/features/auth/components/organisms/LoginForm';
```

### ⚠️ MUST: 실시간 진행 상황 추적

**체크리스트**:
- [ ] ⚠️ TodoWrite로 작업 상태 업데이트 (in_progress → completed)
- [ ] ⚠️ 작업 완료 즉시 체크리스트 업데이트 (배치 금지)
- [ ] ⚠️ 새 작업 발견 시 Todo 추가

**예시**:

```typescript
// Bad - 한 번에 여러 작업 완료 표시
TodoWrite([
  { content: 'Fix login', status: 'completed' },
  { content: 'Add tests', status: 'completed' },
  { content: 'Update docs', status: 'completed' },
]);

// Good - 작업 완료 즉시 업데이트
TodoWrite([
  { content: 'Fix login', status: 'completed' },
  { content: 'Add tests', status: 'in_progress' },
  { content: 'Update docs', status: 'pending' },
]);
```

### 💡 SHOULD: 코드 품질 유지

**체크리스트**:
- [ ] 변경마다 `pnpm lint` 실행
- [ ] Boolean 변수는 `is/has/can/should` prefix 사용
- [ ] UI 문자열은 `src/constants/messages.ts`에 정의
- [ ] JSDoc 추가 (복잡한 로직만)

### 💡 SHOULD: 보안 & 성능

**체크리스트**:
- [ ] XSS 방지 (사용자 입력 sanitize)
- [ ] 불필요한 리렌더링 방지 (memo, useMemo)
- [ ] 민감 정보 커밋 금지 (API key, credentials)
- [ ] 이미지 최적화 (Next.js Image 사용)

---

## ✅ Phase 3: 완료 전 검증 (Pre-Commit Verification)

### ⚠️ MUST: Sisyphean Checklist

**모든 항목이 체크되기 전까지 commit 금지**:

- [ ] ⚠️ **TODO LIST**: Zero pending/in_progress tasks
- [ ] ⚠️ **FUNCTIONALITY**: 요청된 모든 기능 작동
- [ ] ⚠️ **TESTS**: 모든 테스트 통과 (테스트 있는 경우)
- [ ] ⚠️ **ERRORS**: 해결되지 않은 에러 0개
- [ ] ⚠️ **QUALITY**: Production-ready 코드

**하나라도 미완료 시 → 작업 계속**

### ⚠️ MUST: 빌드 & 린트 검증

**체크리스트**:
- [ ] ⚠️ `pnpm lint` 통과 (에러 0개)
- [ ] ⚠️ `pnpm build` 성공
- [ ] ⚠️ TypeScript 타입 에러 0개

**명령어**:

```bash
# 순서대로 실행
pnpm lint           # ESLint 검사
pnpm tsc --noEmit   # 타입 체크 (빌드 없이)
pnpm build          # Production 빌드
```

### 💡 SHOULD: 테스트 & 문서

**체크리스트**:
- [ ] 새 기능 → 테스트 작성 (`*.test.tsx`)
- [ ] UI 컴포넌트 → Storybook 추가 (주요 컴포넌트)
- [ ] 복잡한 로직 → JSDoc 추가
- [ ] API 변경 → 문서 업데이트

### ⚠️ MUST: 셀프 코드 리뷰

**체크리스트**:
- [ ] ⚠️ 불필요한 console.log 제거
- [ ] ⚠️ 주석 처리된 코드 제거
- [ ] ⚠️ 사용하지 않는 import 제거
- [ ] ⚠️ 하드코딩된 값 → 상수로 추출

---

## 🚀 Phase 4: Commit & PR (Deployment)

### ⚠️ MUST: Atomic Commits

**원칙**: 1 commit = 1 논리적 변경

**체크리스트**:
- [ ] ⚠️ Conventional Commits 형식 사용
- [ ] ⚠️ Co-Authored-By 기본 제외 (사용자 명시 시만 추가)
- [ ] ⚠️ Commit message 소문자 동사 시작

**형식**:

```bash
<type>(<scope>): <subject>

# 예시
feat(auth): implement social login
fix(editor): resolve node duplication bug
refactor(profile): extract contribution utils
test(roadmap): add edge case tests
chore(deps): update dependencies
```

**Types**:

| Type | 사용 시기 |
|------|----------|
| feat | 새 기능 추가 |
| fix | 버그 수정 |
| refactor | 코드 리팩토링 |
| perf | 성능 개선 |
| format | 코드 포맷팅 |
| test | 테스트 추가/수정 |
| docs | 문서 변경 |
| chore | 빌드/도구 변경 |

### ⚠️ MUST: PR 생성 전 확인

**체크리스트**:
- [ ] ⚠️ `.github/PULL_REQUEST_TEMPLATE.md` 작성
- [ ] ⚠️ 관련 이슈 링크 (`Closes #<issue>`)
- [ ] ⚠️ 체크리스트 완료
- [ ] ⚠️ 스크린샷 첨부 (UI 변경 시)

**PR 제목 형식**:

```
<type>(#<issue>): <brief description>

# 예시
feat(#84): add AI features UI to editor toolbar
fix(#92): resolve login redirect error
```

### 💡 SHOULD: PR 최적화

**체크리스트**:
- [ ] PR 크기 < 500줄 (가능하면 분할)
- [ ] 명확한 설명 (무엇을, 왜, 어떻게)
- [ ] Breaking changes 명시
- [ ] 테스트 방법 설명

---

## 🔄 예외 처리 & 특수 상황

### 막힐 때

**Decision Tree**:

```
문제 발생 시:
├─ 요구사항 불명확 → AskUserQuestion
├─ 복잡한 디버깅 → /oracle
├─ 아키텍처 결정 → /prometheus
└─ 일반적인 막힘 → 사용자에게 상황 설명
```

### 병렬 작업

**Git Worktree 사용**:

```bash
# 여러 이슈 동시 작업
git worktree add ../jagalchi-84 feat/#84-ai-ui
git worktree add ../jagalchi-92 fix/#92-login

# 병렬 빌드 (Claude: run_in_background: true)
cd ../jagalchi-84 && pnpm build &
cd ../jagalchi-92 && pnpm build &

# 정리
git worktree remove ../jagalchi-84
```

### Plan Mode에서 요구사항 변경

**Protocol**:

1. **중단** - 현재 작업 일시 정지
2. **평가** - 변경 범위 및 영향도 분석
3. **결정** - AskUserQuestion으로 방향 확인
4. **기록** - Plan 문서 업데이트
5. **재개** - 새 계획으로 작업 계속

---

## 🎯 Workflow Commands (Quick Reference)

### 실행 명령어

| Command | Phase | Usage |
|---------|-------|-------|
| `/intake <request>` | Phase 1 | 요구사항 정제 (Figma 통합) |
| `/plan <task>` | Phase 1 | 계획 수립 (Prometheus) |
| `/ultrawork <task>` | Phase 2 | 병렬 실행 최대 성능 |
| `/ui <level> <scope>` | Phase 2 | Frontend 검증 (FVL) |
| `/sisyphus <task>` | Phase 2 | 멀티 에이전트 오케스트레이션 |
| `/git-master` | Phase 4 | Atomic commits 도움 |

### 검증 명령어

| Command | Usage |
|---------|-------|
| `pnpm lint` | ESLint 검사 |
| `pnpm lint --fix` | 자동 수정 |
| `pnpm build` | Production 빌드 |
| `pnpm test` | 테스트 실행 |
| `pnpm storybook` | Storybook 실행 |

---

## 📊 Workflow Violation Policy

### High Severity (작업 중단 필수)

**위반 시 즉시 중단, 사용자 확인 필요**:
- Phase 1 없이 코딩 시작
- 기존 코드 안 읽고 수정
- Cross-feature import 사용
- Phase 3 체크리스트 미완료 상태로 commit
- Lint/Build 실패 상태로 PR 생성

### Medium Severity (경고 후 계속)

**경고 메시지 표시 후 계속 진행 가능**:
- TodoWrite 미사용
- 테스트 미작성 (신규 기능)
- JSDoc 미작성 (복잡한 로직)

### Low Severity (무시 가능)

**Best practice이지만 강제 안 함**:
- Storybook 미작성
- PR 크기 500줄 초과
- 이미지 최적화 누락

---

## 🎓 Learning Examples

### Example 1: 단순 버그 수정

```
Phase 1:
✅ Issue #92 확인
✅ git checkout -b fix/#92-login-redirect
✅ 1파일 수정 예상 → Plan 불필요
✅ TodoWrite: ["Fix login redirect bug"]

Phase 2:
✅ Read: src/features/auth/components/LoginForm.tsx
✅ 버그 수정
✅ TodoWrite: status → completed

Phase 3:
✅ pnpm lint → Pass
✅ pnpm build → Success
✅ 셀프 리뷰 완료

Phase 4:
✅ git commit -m "fix(auth): resolve login redirect error"
✅ PR 생성 (템플릿 작성)
```

### Example 2: 복잡한 기능 추가

```
Phase 1:
✅ Issue #84 확인
✅ git checkout -b feat/#84-ai-features
✅ 5+ 파일 예상 → EnterPlanMode 사용
✅ Plan 작성 → ExitPlanMode
✅ TodoWrite: [5개 작업 항목]

Phase 2:
✅ /sisyphus 또는 /ultrawork 고려
✅ 기존 컴포넌트 먼저 확인
✅ 작업마다 TodoWrite 업데이트
✅ 중간중간 pnpm lint 실행

Phase 3:
✅ Sisyphean Checklist 완료
✅ pnpm lint → Pass
✅ pnpm build → Success
✅ 테스트 추가
✅ Storybook 작성

Phase 4:
✅ Atomic commits (기능별 분리)
✅ PR 생성 (상세한 설명)
✅ 스크린샷 첨부
```

---

## 🔗 Related Documents

- **Architecture**: `.claude/rules/architecture.md`
- **Code Style**: `.claude/rules/code-style.md`
- **Git Convention**: `.claude/rules/workflow.md`
- **Testing**: `.claude/rules/testing.md`
- **Design System**: `.claude/design_system_rules.md`
- **FVL Policy**: `~/.claude/fvl-policy.md` (글로벌)
- **Git Planning**: `~/.claude/git-planning-guide.md` (글로벌)

---

## 📌 Quick Checklist

**매 작업마다 이것만 확인하세요**:

```
[ ] ⚠️ Phase 1: 브랜치 생성 + 계획 수립
[ ] ⚠️ Phase 2: 기존 코드 Read + TodoWrite 업데이트
[ ] ⚠️ Phase 3: Sisyphean Checklist + Lint + Build
[ ] ⚠️ Phase 4: Atomic commits + PR 템플릿
```

**이 4단계만 지키면 90%의 문제 예방 가능합니다.**
