# API Gateway 명세서

> **대상**: 프론트엔드 개발자  
> **기술 스택**: Spring Cloud Gateway (포트 `8080`)  
> **프론트엔드는 게이트웨이만 호출한다. 백엔드 서비스에 직접 요청하지 않는다.**

---

## 1. Base URL

```
http://localhost:8080
```

모든 API 요청은 이 주소로 보낸다.

---

## 2. 라우팅 규칙

| 패턴        | 대상 서비스                | 포트 | 비고             |
| ----------- | -------------------------- | ---- | ---------------- |
| `/users/**` | user-service               | 8081 | 회원/인증 관련   |
| `/node/**`  | node-service               | 8082 | 노드 관련 REST   |
| `/ws/**`    | node-service (WebSocket)   | 8082 | WebSocket 연결   |
| `/api/**`   | node-service (Docker 전용) | 8082 | Docker 환경 전용 |

---

## 3. 인증 (JWT)

### 3.1 기본 정보

| 항목      | 값                                                         |
| --------- | ---------------------------------------------------------- |
| 알고리즘  | HS512 (JJWT)                                               |
| 전달 방식 | `Authorization: Bearer <token>` 헤더                       |
| 대체 방식 | `?access_token=<token>` 쿼리 파라미터 (WebSocket/SockJS용) |

### 3.2 토큰 클레임 (필수)

```json
{
  "type": "ACCESS_TOKEN",
  "id": 1,
  "role": "STUDENT"
}
```

| 클레임 | 타입   | 가능한 값                           |
| ------ | ------ | ----------------------------------- |
| `type` | string | `"ACCESS_TOKEN"` (필수)             |
| `id`   | Long   | 유저 ID                             |
| `role` | string | `"STUDENT"`, `"TEACHER"`, `"ADMIN"` |

### 3.3 인증 없이 접근 가능한 경로 (Public Routes)

| 메서드    | 경로                  | 설명                       |
| --------- | --------------------- | -------------------------- |
| `POST`    | `/users`              | 회원가입                   |
| `POST`    | `/users/auth/login`   | 로그인                     |
| `POST`    | `/users/auth/refresh` | 토큰 갱신                  |
| `*`       | `**/oauth2/**`        | OAuth2 관련                |
| `GET`     | `/actuator/health`    | 헬스체크                   |
| `OPTIONS` | `**`                  | CORS preflight (모든 경로) |

---

## 4. 게이트웨이가 주입하는 헤더

JWT 검증 후 게이트웨이는 `Authorization` 헤더를 제거하고, 아래 커스텀 헤더를 백엔드 서비스에 전달한다.  
**프론트엔드에서 이 헤더를 직접 보낼 필요는 없다.** 다만 응답 디버깅 시 참고할 수 있다.

| 헤더            | 타입   | 설명                         | 예시                        |
| --------------- | ------ | ---------------------------- | --------------------------- |
| `X-User-ID`     | Long   | 유저 고유 ID                 | `42`                        |
| `X-User-Role`   | string | 매핑된 역할                  | `USER`, `ADMIN`             |
| `X-Permissions` | string | 권한 문자열                  | `ALL`, `READ,WRITE`, `READ` |
| `X-Roadmap-ID`  | Long   | 추출된 로드맵 ID (있을 때만) | `123`                       |

### 4.1 역할 매핑 테이블

| JWT `role` | `X-User-Role` | `X-Permissions` |
| ---------- | ------------- | --------------- |
| `STUDENT`  | `USER`        | `READ,WRITE`    |
| `TEACHER`  | `ADMIN`       | `ALL`           |
| `ADMIN`    | `ADMIN`       | `ALL`           |
| 그 외      | `USER`        | `READ`          |

---

## 5. Roadmap ID 추출 전략

게이트웨이는 아래 순서로 `roadmapId`를 추출한다:

1. 쿼리 파라미터: `?roadmapId=123`
2. URL 경로 패턴: `/roadmap/{id}`
3. 폴백: 경로의 마지막 숫자 세그먼트

---

## 6. CORS 설정

| 항목            | 값                                                 |
| --------------- | -------------------------------------------------- |
| Allowed Origins | `http://localhost:3000`, `http://localhost:5173`   |
| Allowed Methods | `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS` |
| Allowed Headers | `*` (전체)                                         |
| Credentials     | `true`                                             |
| Max Age         | `3600`초                                           |

---

## 7. WebSocket

### 7.1 연결 엔드포인트

```
ws://localhost:8080/ws
ws://localhost:8080/ws-sockjs
```

### 7.2 인증

- `Upgrade: websocket` 요청은 `WebSocketHandshakeFilter`가 별도 처리한다.
- 토큰이 있으면 REST와 동일하게 헤더를 주입한다.
- **토큰 없이 연결하면 게스트(guest) 모드로 접속된다.**

### 7.3 토큰 전달 방법

WebSocket은 커스텀 헤더를 보내기 어려우므로, 쿼리 파라미터를 사용한다:

```
ws://localhost:8080/ws?access_token=eyJhbGciOi...
```

---

## 8. 에러 응답

게이트웨이에서 발생하는 에러는 아래와 같다 (백엔드 서비스 에러와 구분 필요):

| 상태 코드          | 원인                                |
| ------------------ | ----------------------------------- |
| `401 Unauthorized` | 토큰 누락                           |
| `401 Unauthorized` | 토큰 만료 또는 유효하지 않은 토큰   |
| `401 Unauthorized` | `type`이 `ACCESS_TOKEN`이 아닌 경우 |
| `401 Unauthorized` | 토큰에 `id` 또는 `role` 클레임 누락 |

> **401을 받으면** 로그인 페이지로 리다이렉트하거나 토큰 갱신(`POST /users/auth/refresh`)을 시도한다.

---

## 9. 헬스체크 / 모니터링

| 메서드 | 경로                   | 설명              |
| ------ | ---------------------- | ----------------- |
| `GET`  | `/actuator/health`     | 서비스 상태 확인  |
| `GET`  | `/actuator/prometheus` | Prometheus 메트릭 |
| `GET`  | `/actuator/metrics`    | 앱 메트릭         |

---

## 10. 프론트엔드 통합 체크리스트

- [ ] API 호출 시 base URL은 `http://localhost:8080`
- [ ] 인증 요청에는 `Authorization: Bearer <token>` 헤더 포함
- [ ] WebSocket 연결 시 `ws://localhost:8080/ws` 또는 `/ws-sockjs` 사용
- [ ] WebSocket 인증은 `?access_token=<token>` 쿼리 파라미터로 전달
- [ ] `401` 응답 시 토큰 갱신 또는 로그인 리다이렉트 처리
- [ ] Public 경로는 토큰 없이 호출 가능 (회원가입, 로그인, 토큰 갱신)

### 요청 예시

```ts
// 인증된 요청
const res = await fetch('http://localhost:8080/node/roadmap/1', {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

// 토큰 갱신
const res = await fetch('http://localhost:8080/users/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken }),
});

// WebSocket 연결
const socket = new WebSocket(`ws://localhost:8080/ws?access_token=${accessToken}`);
```
