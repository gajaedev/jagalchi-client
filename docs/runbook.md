# Runbook — 자갈치 클라이언트

프로덕션 장애 대응 표준 절차. On-call 담당자가 첫 번째로 참고하는 문서.

---

## SLO / SLI 초기 정의

| 지표                      | 목표                      | 측정 방법                                       |
| ------------------------- | ------------------------- | ----------------------------------------------- |
| 가용성                    | 99% (월 다운타임 ≤ 7.3 h) | Vercel Analytics / UptimeRobot                  |
| TTI (Time to Interactive) | < 3s (p75, 4G)            | Web Vitals (LCP 기준)                           |
| API 오류율                | < 1%                      | Sentry `BAD_GATEWAY` / `GATEWAY_TIMEOUT` 이벤트 |
| 배포 성공률               | 100% (실패 시 자동 롤백)  | Vercel Deployment 상태                          |

---

## 장애 시나리오별 대응

### 1. 로그인 실패 급증

**증상**: Sentry `CSRF_TOKEN_INVALID` / `CSRF_ORIGIN_MISMATCH` 에러 급증, 사용자 로그인 불가.

**원인 후보**:

- CSP 헤더 오설정으로 쿠키 차단
- 배포 후 환경변수 `NEXT_PUBLIC_SITE_URL` 불일치 (Origin 검증 실패)
- 백엔드 세션/JWT 만료 정책 변경

**대응 절차**:

1. Sentry → Issues → `CSRF_*` 이벤트 확인, 에러 코드·User-Agent 필터링
2. Vercel → Environment Variables → `NEXT_PUBLIC_SITE_URL` 값이 실제 도메인과 일치하는지 확인
3. `src/app/api/[...path]/route.ts` 의 `ALLOWED_ORIGINS` 로그 확인
4. 문제 확인 시 → 환경변수 수정 후 **Redeploy** (코드 변경 없이 재배포 가능)
5. 즉각 해결 불가 시 → Vercel Rollback (이전 배포 "Promote to Production")

---

### 2. 5xx 급증 (Bad Gateway / Timeout)

**증상**: Sentry `BAD_GATEWAY` (502) 또는 `GATEWAY_TIMEOUT` (504) 이벤트 급증.

**원인 후보**:

- 백엔드 서버 다운
- 네트워크 구간 장애 (Vercel Edge ↔ 백엔드)
- `API_ORIGIN` 환경변수 오기재

**대응 절차**:

1. `curl -I https://api.jagalchi.dev/health` 로 백엔드 헬스 체크
2. 백엔드 팀에 슬랙 알림 (`#incident` 채널)
3. 클라이언트 단에서 할 수 있는 것 없음 → 백엔드 복구 대기
4. 사용자 노출 최소화 필요 시 → 유지보수 페이지 임시 배포 (`NEXT_PUBLIC_MAINTENANCE=true`)

---

### 3. 배포 롤백

**증상**: 신규 배포 후 에러율 급등 / 주요 기능 깨짐.

**대응 절차**:

1. Vercel Dashboard → 프로젝트 → **Deployments** 탭
2. 이전 정상 배포 행 선택 → 우상단 `···` → **"Promote to Production"**
3. 1–2분 내 반영 완료 (DNS 전파 대기 불필요)
4. 롤백 완료 후 Sentry 에러율 정상화 확인
5. 근본 원인 수정 후 재배포

---

### 4. DB 스키마 변경 (백엔드 연동)

프론트엔드 직접 영향 범위: API 응답 타입 불일치.

**증상**: `src/api/*.ts` 타입과 실제 응답 불일치로 런타임 에러.

**대응 절차**:

1. 백엔드 팀에서 변경 예정 스키마 공유 → `docs/api.md` 업데이트
2. 프론트엔드 타입 (`src/types/`, `src/api/`) 선수 업데이트
3. 스테이징 환경에서 E2E 검증 후 프로덕션 배포
4. 백엔드/프론트 배포 순서: **백엔드 먼저** → 프론트엔드 배포 (하위 호환 유지)

---

## Sentry 알림 설정

`discord-notify.yml` 워크플로우가 배포 이벤트를 Discord `#deployments` 채널에 전송.

Sentry 이벤트 알림은 Sentry 프로젝트 Settings → Alerts 에서 설정:

| Alert       | 조건                  | 채널                |
| ----------- | --------------------- | ------------------- |
| 에러율 급등 | 1분 내 에러 10건 이상 | Discord `#incident` |
| 신규 이슈   | 처음 발생하는 에러    | Discord `#sentry`   |
| P0 크래시   | `level: fatal`        | 담당자 DM           |

---

## Post-mortem 템플릿

장애 종료 후 24시간 이내 작성. `docs/audits/postmortem-YYYYMMDD.md` 로 저장.

```markdown
# Post-mortem — YYYY-MM-DD

## 요약

한 줄 요약.

## 타임라인

- HH:MM — 최초 감지
- HH:MM — 원인 특정
- HH:MM — 완화 조치
- HH:MM — 완전 복구

## 근본 원인

## 영향 범위

- 영향 유저 수 / 기간
- 영향 기능

## 대응 과정

## 재발 방지

- [ ] Action Item 1 (담당자, 기한)
- [ ] Action Item 2
```

---

## On-call 순번 및 연락처

| 순번 | 담당자      | GitHub       | 연락처 |
| ---- | ----------- | ------------ | ------ |
| 1    | justn-hyeok | @justn-hyeok | —      |

> 팀 확장 시 이 표를 업데이트.

---

## 관련 문서

- [배포 가이드](./deployment.md)
- [API 명세](./api.md)
