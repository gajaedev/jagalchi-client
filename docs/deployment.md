# Deployment

Jagalchi Client 의 프로덕션 배포 가이드. 운영 타깃은 **Vercel** 을 단일 표준으로 본다. `Dockerfile`, `docker-compose.yml`, `netlify.toml` 은 자체 호스팅/백업 용도로 유지.

## 환경변수 매트릭스

| 변수                            | 필수 | Production                  | Preview / Staging              | Development              |
| ------------------------------- | ---- | --------------------------- | ------------------------------ | ------------------------ |
| `NEXT_PUBLIC_API_URL`           | ✅   | `https://api.jagalchi.dev`  | staging 백엔드                 | `http://localhost:8080`  |
| `NEXT_PUBLIC_WS_URL`            | ✅   | `wss://api.jagalchi.dev/ws` | staging                        | `ws://localhost:8080/ws` |
| `NEXT_PUBLIC_SITE_URL`          | ✅   | `https://jagalchi.dev`      | `https://staging.jagalchi.dev` | `http://localhost:3000`  |
| `NEXT_PUBLIC_ENV`               | ✅   | `production`                | `staging` / `preview`          | `development`            |
| `NEXT_PUBLIC_API_MOCKING`       | ⚠️   | **반드시 `false`**          | `false`                        | `true` 가능              |
| `NEXT_PUBLIC_REALTIME_ENABLED`  | ❌   | 플래그                      | 플래그                         | 플래그                   |
| `API_ORIGIN`                    | ✅   | 백엔드 내부 origin          | 동일                           | `http://localhost:8080`  |
| `SENTRY_DSN`                    | ⚠️   | 설정 필수(#204)             | 설정                           | (선택)                   |
| `SENTRY_ORG` / `SENTRY_PROJECT` | ⚠️   | Source Map 업로드용         | 동일                           | 불필요                   |
| `SENTRY_AUTH_TOKEN`             | ⚠️   | Secret (CI only)            | Secret                         | 불필요                   |

⚠️ 표시는 프로덕션에서 실수 시 장애 직결.

## 환경별 도메인 전략

| 환경        | 도메인                           | `NEXT_PUBLIC_ENV` | robots                | Sentry Environment |
| ----------- | -------------------------------- | ----------------- | --------------------- | ------------------ |
| Production  | `jagalchi.dev`                   | `production`      | 허용 (일부 경로 제외) | `production`       |
| Staging     | `staging.jagalchi.dev`           | `staging`         | **전체 noindex**      | `staging`          |
| Preview     | Vercel 자동 URL (`*.vercel.app`) | `preview`         | **전체 noindex**      | `preview`          |
| Development | `localhost:3000`                 | `development`     | 해당 없음             | `development`      |

> `robots.ts` 는 `NEXT_PUBLIC_ENV !== 'production'` 이면 자동으로 `disallow: '/'` 반환.
> Sentry `environment` 도 `NEXT_PUBLIC_ENV` 기준으로 분리됨.

### Staging 도메인 연결 (Vercel)

1. Vercel Dashboard → Project → Settings → Domains
2. `staging.jagalchi.dev` 추가
3. DNS: CNAME → `cname.vercel-dns.com`
4. Branch 연결: `develop` 브랜치 → staging 도메인 매핑
5. Environment Variables: `Production` 탭이 아닌 **`Preview`** 탭에 staging 값 설정

### PR Preview URL

Vercel 기본 기능. PR 생성 시 `jagalchi-client-git-<branch>-<team>.vercel.app` 자동 생성. 별도 설정 불필요.

## 배포 전 사전 검증

`scripts/verify-prod-env.mjs` 를 Vercel Build Command 에 prefix 한다.

```
node scripts/verify-prod-env.mjs && pnpm build
```

검증 내용:

- `NEXT_PUBLIC_API_MOCKING` 이 `true` 면 exit 1 (MSW 유입 차단)
- `NEXT_PUBLIC_API_URL` 미설정 시 exit 1

## 시크릿 관리

- **Vercel**: Project Settings → Environment Variables 에서 `Production` / `Preview` / `Development` 로 분리.
- **GitHub Actions**: Repository Settings → Secrets and variables → Actions.
- **로컬**: `.env.local` (gitignored) 에 개인 값. `.env.development` 는 commit 된 기본값이며 실제 시크릿 금지.

## 롤백

Vercel 배포판은 commit 단위로 보존. 장애 발생 시 Dashboard → Deployments → 이전 deployment 에서 **"Promote to Production"**. 별도 CI 재실행 불필요.

## 배포 대상 단일화 사유

세 후보 비교:

|                       | Vercel             | Netlify                   | Docker 셀프호스팅 |
| --------------------- | ------------------ | ------------------------- | ----------------- |
| Next.js 16 App Router | 퍼스트파티         | 지원(edge/functions 제약) | 직접 관리         |
| Preview URL           | 자동               | 자동                      | 미지원            |
| Edge runtime          | ✅                 | 제한적                    | 직접 관리         |
| 비용                  | 무료 tier + 사용량 | 무료 tier + 사용량        | 인프라 비용 전체  |
| 롤백 UX               | 원클릭             | 원클릭                    | 수동              |

→ **Vercel** 을 기본으로 고정. 셀프호스팅이 필요해지면 Docker 경로로 선택적으로 전환.
