# Jagalchi Client

개발자 학습 로드맵 플랫폼 **자갈치**의 프론트엔드 레포지토리입니다.
노드 기반 에디터로 학습 경로를 생성하고, 포크·공유하는 플랫폼입니다.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Jotai (client), TanStack Query (server)
- **Form**: React Hook Form + Zod
- **Testing**: Vitest, Storybook, Playwright (E2E)

## Getting Started

```bash
# 설치
pnpm i

# 개발 서버
pnpm dev

# 빌드
pnpm build

# 린트
pnpm lint

# 테스트
pnpm test

# Storybook
pnpm storybook
```

## Project Structure

```
src/
├── app/           # Next.js App Router
├── components/ui/ # shadcn/ui 컴포넌트
├── features/      # 기능별 모듈
├── hooks/         # 공용 커스텀 훅
├── lib/           # 유틸리티 함수
├── types/         # 공용 타입 정의
└── constants/     # 상수
```

## Convention

### Branch

```
<type>/#<issue-number>-<short-description>
```

예시: `feat/#12-user-login`

### Commit

```
<type>(<scope>): <subject>
```

| 타입     | 용도              |
| -------- | ----------------- |
| feat     | 새로운 기능       |
| fix      | 버그 수정         |
| refactor | 리팩토링          |
| perf     | 성능 개선         |
| format   | 코드 포맷팅       |
| docs     | 문서 작업         |
| action   | GitHub Actions    |
| test     | 테스트 코드       |
| ai       | AI 코딩 작업      |
| chore    | 기타 작업         |
| revert   | 롤백              |
| wip      | 작업 중 임시 커밋 |
| hotfix   | 긴급 수정         |

예시: `feat(auth): 로그인 기능 구현`

### PR

```
<type>(#<issue-number>): <간결한 설명>
```

예시: `feat(#12): 소셜 로그인 기능 추가`

## Documentation

자세한 문서는 [`docs/`](./docs/README.md) 를 참고하세요.

- [API 명세](./docs/api.md)
- [배포 가이드](./docs/deployment.md)
- [런북 (장애 대응)](./docs/runbook.md)

## License

MIT License - see [LICENSE](./LICENSE)
