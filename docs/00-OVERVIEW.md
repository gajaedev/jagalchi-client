# Jagalchi Backend API 개요

> **대상 독자**: 프론트엔드 개발자
> **최종 업데이트**: 2026-04-07

---

## 목차

1. [전체 아키텍처](#1-전체-아키텍처)
2. [인증/인가 플로우](#2-인증인가-플로우)
3. [공통 응답 형식 & 에러 코드](#3-공통-응답-형식--에러-코드)
4. [서비스별 역할 요약](#4-서비스별-역할-요약)
5. [프론트엔드 개발 시 주의사항](#5-프론트엔드-개발-시-주의사항)
6. [세부 명세서 링크](#6-세부-명세서-링크)

---

## 1. 전체 아키텍처

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Frontend (React/Next.js)                        │
│                                                                         │
│  HTTP Requests ──┐              WebSocket ──┐                           │
└──────────────────┼──────────────────────────┼───────────────────────────┘
                   │                          │
                   ▼                          ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    API Gateway (Spring Cloud Gateway)                    │
│                           :8080                                         │
│                                                                         │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐ │
│  │ JWT 검증     │  │ 라우팅 결정   │  │ 헤더 주입    │  │ Rate Limit   │ │
│  │ (HS512)     │  │              │  │ X-User-ID   │  │              │ │
│  │             │  │              │  │ X-User-Role  │  │              │ │
│  │             │  │              │  │ X-Permissions│  │              │ │
│  └─────────────┘  └──────────────┘  └─────────────┘  └──────────────┘ │
└────────┬──────────────┬───────────────────┬──────────────┬──────────────┘
         │              │                   │              │
         ▼              ▼                   ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ User Service │ │ Node Service │ │Roadmap Service│ │  AI Service  │
│  (Spring)    │ │  (Spring)    │ │  (Spring)    │ │  (Django)    │
│    :8081     │ │    :8082     │ │    :8083     │ │    :8000     │
│              │ │              │ │              │ │              │
│ - 인증/인가   │ │ - 로드맵 캔버스│ │ - 로드맵 CRUD │ │ - AI 코칭     │
│ - OAuth2     │ │ - 실시간 편집  │ │ - 디렉토리    │ │ - 생성/추천   │
│ - 프로필      │ │ - WebSocket  │ │ - 포크/진행률  │ │ - RAG 검색   │
│ - 팔로우      │ │ - STOMP      │ │              │ │ - 25+ 엔드포인트│
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

### 게이트웨이 라우팅 규칙

| 경로 패턴      | 대상 서비스       | 포트   | 비고                             |
| -------------- | ----------------- | ------ | -------------------------------- |
| `/users/**`    | User Service      | `8081` | 인증, 프로필, 팔로우             |
| `/node/**`     | Node Service      | `8082` | 로드맵 노드 CRUD, 캔버스 편집    |
| `/ws/**`       | Node Service (WS) | `8082` | WebSocket/STOMP 연결             |
| `/api/**`      | Node Service      | `8082` | Docker 프로필에서만 활성화       |
| `/roadmaps/**` | Roadmap Service   | `8083` | 로드맵 CRUD, 디렉토리, 포크      |
| `/ai/**`       | AI Service        | `8000` | AI 관련 엔드포인트 (별도 라우팅) |

> **프론트엔드에서는 항상 게이트웨이(`localhost:8080` 또는 프로덕션 도메인)로만 요청을 보내면 된다.** 개별 서비스 포트를 직접 호출할 필요 없음.

---

## 2. 인증/인가 플로우

### 2.1 토큰 구조

| 토큰              | 유효 기간 | 저장 위치                             | 용도              |
| ----------------- | --------- | ------------------------------------- | ----------------- |
| **Access Token**  | 1시간     | 클라이언트 메모리 (또는 localStorage) | API 요청 인증     |
| **Refresh Token** | 7일       | HttpOnly 쿠키 (서버가 설정)           | Access Token 갱신 |

- JWT 알고리즘: **HS512**
- Access Token은 `Authorization: Bearer <token>` 헤더로 전송
- Refresh Token은 브라우저가 자동으로 쿠키에 담아 보냄 (HttpOnly이므로 JS에서 접근 불가)

### 2.2 Role 매핑

| 백엔드 Role | 프론트에서 보이는 Role | 설명          |
| ----------- | ---------------------- | ------------- |
| `STUDENT`   | `USER`                 | 일반 사용자   |
| `TEACHER`   | `ADMIN`                | 교사/관리자   |
| `ADMIN`     | `ADMIN`                | 시스템 관리자 |

### 2.3 인증 플로우 다이어그램

#### 일반 로그인

```
Frontend                    Gateway (:8080)              User Service (:8081)
   │                            │                              │
   │  POST /users/auth/login    │                              │
   │  { email, password }       │                              │
   │ ──────────────────────────►│  (Public route, JWT 검증 skip) │
   │                            │ ────────────────────────────►│
   │                            │                              │ 인증 처리
   │                            │◄─────────────────────────────│
   │◄───────────────────────────│                              │
   │  Response:                 │                              │
   │  {                         │                              │
   │    accessToken: "eyJ...",  │                              │
   │    user: { id, name, ... } │                              │
   │  }                         │                              │
   │  + Set-Cookie: refresh_token=xxx; HttpOnly; Secure        │
   │                            │                              │
```

#### 토큰 갱신

```
Frontend                    Gateway (:8080)              User Service (:8081)
   │                            │                              │
   │  POST /users/auth/refresh  │                              │
   │  Cookie: refresh_token=xxx │                              │
   │ ──────────────────────────►│  (Public route, JWT 검증 skip) │
   │                            │ ────────────────────────────►│
   │                            │◄─────────────────────────────│
   │◄───────────────────────────│                              │
   │  Response:                 │                              │
   │  { accessToken: "new_eyJ..." }                            │
   │  + Set-Cookie: refresh_token=new_xxx; HttpOnly; Secure    │
   │                            │                              │
```

#### OAuth2 로그인 (Google / GitHub)

```
Frontend                    Gateway              User Service         OAuth Provider
   │                          │                      │                     │
   │  사용자가 "Google 로그인"  │                      │                     │
   │  버튼 클릭                │                      │                     │
   │                          │                      │                     │
   │  GET /users/auth/oauth2/ │                      │                     │
   │      google (redirect)   │                      │                     │
   │ ────────────────────────►│ ───────────────────►│                     │
   │                          │                      │ ──redirect────────►│
   │                          │                      │                     │
   │                          │    (사용자가 Google에서 로그인)               │
   │                          │                      │                     │
   │                          │                      │◄──callback + code──│
   │                          │                      │                     │
   │                          │◄─────────────────────│                     │
   │◄─────────────────────────│                      │                     │
   │  Redirect to frontend    │                      │                     │
   │  with accessToken        │                      │                     │
   │  + Set-Cookie: refresh   │                      │                     │
```

### 2.4 인증 불필요 (Public) 엔드포인트

다음 경로는 JWT 없이 접근 가능:

| 메서드 | 경로                  | 설명            |
| ------ | --------------------- | --------------- |
| `POST` | `/users`              | 회원가입        |
| `POST` | `/users/auth/login`   | 로그인          |
| `POST` | `/users/auth/refresh` | 토큰 갱신       |
| `GET`  | `/actuator/health`    | 서비스 헬스체크 |

**그 외 모든 엔드포인트는 `Authorization: Bearer <token>` 헤더가 필수.**

### 2.5 프론트엔드 인증 처리 권장 패턴

```typescript
// axios interceptor 예시

// 요청 인터셉터: Access Token 주입
api.interceptors.request.use((config) => {
  const token = getAccessToken(); // 메모리 또는 store에서 가져오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401 시 토큰 갱신 후 재요청
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refresh 엔드포인트는 쿠키로 refresh token이 자동 전송됨
        const { data } = await api.post('/users/auth/refresh');
        setAccessToken(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh 실패 → 로그아웃 처리
        clearAuth();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
```

> **주의**: 토큰 갱신 중 여러 요청이 동시에 401을 받을 수 있으므로, 갱신 요청을 큐잉하는 로직을 추가하는 것을 권장한다.

---

## 3. 공통 응답 형식 & 에러 코드

### 3.1 성공 응답

단일 리소스:

```json
{
  "id": "uuid-here",
  "name": "로드맵 이름",
  "createdAt": "2026-04-07T12:00:00Z"
}
```

목록 (페이지네이션):

```json
{
  "content": [
    { "id": "...", "name": "..." },
    { "id": "...", "name": "..." }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 142,
  "totalPages": 8
}
```

### 3.2 페이지네이션 파라미터

| 파라미터        | 타입     | 기본값 | 설명                  |
| --------------- | -------- | ------ | --------------------- |
| `page`          | `number` | `0`    | 페이지 번호 (0부터)   |
| `size`          | `number` | `20`   | 페이지당 항목 수      |
| `totalElements` | `number` | -      | 전체 항목 수 (응답)   |
| `totalPages`    | `number` | -      | 전체 페이지 수 (응답) |

요청 예시:

```
GET /roadmaps?page=0&size=20
```

### 3.3 에러 응답 형식

**모든 서비스가 동일한 에러 응답 형식을 사용한다:**

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "이메일 형식이 올바르지 않습니다.",
    "details": {
      "field": "email",
      "rejectedValue": "invalid-email"
    },
    "timestamp": "2026-04-07T12:00:00Z"
  }
}
```

### 3.4 공통 에러 코드

#### HTTP 상태별 에러

| HTTP Status | 에러 코드              | 설명                         | 프론트 처리                            |
| ----------- | ---------------------- | ---------------------------- | -------------------------------------- |
| `400`       | `VALIDATION_FAILED`    | 요청 데이터 유효성 검증 실패 | `details`에서 필드별 에러 메시지 표시  |
| `400`       | `BAD_REQUEST`          | 잘못된 요청                  | 에러 메시지 표시                       |
| `401`       | `UNAUTHORIZED`         | 인증 실패 (토큰 없음/만료)   | 토큰 갱신 시도 → 실패 시 로그인 페이지 |
| `401`       | `TOKEN_EXPIRED`        | Access Token 만료            | Refresh Token으로 갱신                 |
| `401`       | `INVALID_TOKEN`        | 유효하지 않은 토큰           | 로그인 페이지로 리다이렉트             |
| `403`       | `FORBIDDEN`            | 권한 없음                    | "접근 권한이 없습니다" 표시            |
| `403`       | `ACCESS_DENIED`        | 리소스 접근 거부             | 권한 안내 메시지 표시                  |
| `404`       | `NOT_FOUND`            | 리소스를 찾을 수 없음        | 404 페이지 또는 안내 표시              |
| `409`       | `CONFLICT`             | 리소스 충돌 (중복 등)        | 충돌 해결 안내 표시                    |
| `422`       | `UNPROCESSABLE_ENTITY` | 처리할 수 없는 요청          | 에러 메시지 표시                       |
| `429`       | `RATE_LIMITED`         | 요청 횟수 초과               | 재시도 대기 (Retry-After 헤더 확인)    |
| `500`       | `INTERNAL_ERROR`       | 서버 내부 오류               | "잠시 후 다시 시도" 메시지             |
| `502`       | `SERVICE_UNAVAILABLE`  | 서비스 연결 불가             | 재시도 또는 서비스 점검 안내           |
| `503`       | `SERVICE_UNAVAILABLE`  | 서비스 점검 중               | 서비스 점검 안내 표시                  |

#### 도메인별 에러 코드

| 에러 코드                  | 서비스          | 설명                       |
| -------------------------- | --------------- | -------------------------- |
| `USER_NOT_FOUND`           | User Service    | 해당 사용자를 찾을 수 없음 |
| `EMAIL_ALREADY_EXISTS`     | User Service    | 이미 등록된 이메일         |
| `INVALID_CREDENTIALS`      | User Service    | 이메일/비밀번호 불일치     |
| `ROADMAP_NOT_FOUND`        | Roadmap Service | 해당 로드맵을 찾을 수 없음 |
| `ROADMAP_FORK_FAILED`      | Roadmap Service | 로드맵 포크 실패           |
| `NODE_NOT_FOUND`           | Node Service    | 해당 노드를 찾을 수 없음   |
| `CONCURRENT_EDIT_CONFLICT` | Node Service    | 동시 편집 충돌             |
| `AI_QUOTA_EXCEEDED`        | AI Service      | AI 사용 할당량 초과        |
| `AI_MODEL_ERROR`           | AI Service      | AI 모델 처리 오류          |

### 3.5 프론트엔드 에러 핸들링 권장 패턴

```typescript
// 공통 에러 타입 정의
interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    timestamp: string;
  };
}

// 에러 핸들러
function handleApiError(error: AxiosError<ApiError>) {
  const apiError = error.response?.data?.error;

  if (!apiError) {
    // 네트워크 에러 등
    toast.error('서버에 연결할 수 없습니다.');
    return;
  }

  switch (apiError.code) {
    case 'TOKEN_EXPIRED':
    case 'UNAUTHORIZED':
      // 인터셉터에서 처리됨
      break;
    case 'VALIDATION_FAILED':
      // 폼 필드별 에러 표시
      setFormErrors(apiError.details);
      break;
    case 'RATE_LIMITED':
      toast.error('요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.');
      break;
    default:
      toast.error(apiError.message);
  }
}
```

---

## 4. 서비스별 역할 요약

### 4.1 API Gateway (Spring Cloud Gateway)

| 항목     | 내용                                            |
| -------- | ----------------------------------------------- |
| **포트** | `8080`                                          |
| **역할** | 모든 요청의 진입점, JWT 검증, 라우팅, 헤더 주입 |
| **기술** | Spring Cloud Gateway                            |

**프론트에서 알아야 할 것:**

- 모든 API 요청의 base URL은 게이트웨이 주소
- 게이트웨이가 JWT를 검증하고, 유효한 경우 하위 서비스에 `X-User-ID`, `X-User-Role`, `X-Permissions` 헤더를 주입
- 프론트에서 이 X 헤더들을 직접 설정할 필요 없음 (게이트웨이가 자동 처리)

### 4.2 User Service (Spring Boot 4)

| 항목     | 내용                                        |
| -------- | ------------------------------------------- |
| **포트** | `8081`                                      |
| **경로** | `/users/**`                                 |
| **역할** | 인증/인가, OAuth2, 프로필 관리, 팔로우 기능 |

**주요 엔드포인트:**

- `POST /users` - 회원가입
- `POST /users/auth/login` - 로그인
- `POST /users/auth/refresh` - 토큰 갱신
- `POST /users/auth/logout` - 로그아웃
- `GET /users/auth/oauth2/{provider}` - OAuth2 로그인 (google, github)
- `GET /users/{id}` - 프로필 조회
- `PUT /users/{id}` - 프로필 수정
- `POST /users/{id}/follow` - 팔로우
- `DELETE /users/{id}/follow` - 언팔로우

> 세부 명세: [01-USER.md](./01-USER.md)

### 4.3 Node Service (Spring Boot 4)

| 항목     | 내용                                              |
| -------- | ------------------------------------------------- |
| **포트** | `8082`                                            |
| **경로** | `/node/**`, `/ws/**`                              |
| **역할** | 로드맵 캔버스의 실시간 편집, WebSocket/STOMP 통신 |

**주요 특징:**

- 로드맵 내 개별 노드의 CRUD
- **실시간 협업 편집**: WebSocket + STOMP 프로토콜
- 노드 위치, 연결선, 내용 등의 실시간 동기화

**주요 엔드포인트:**

- `GET /node/{roadmapId}` - 로드맵의 전체 노드 조회
- `POST /node` - 노드 생성
- `PUT /node/{id}` - 노드 수정
- `DELETE /node/{id}` - 노드 삭제
- `WS /ws/**` - WebSocket 연결 (STOMP)

> 세부 명세: [02-NODE.md](./02-NODE.md)

### 4.4 Roadmap Service (Spring Boot 4)

| 항목     | 내용                                          |
| -------- | --------------------------------------------- |
| **포트** | `8083`                                        |
| **경로** | `/roadmaps/**`                                |
| **역할** | 로드맵 CRUD, 디렉토리 관리, 포크, 학습 진행률 |

**주요 엔드포인트:**

- `GET /roadmaps` - 로드맵 목록 (페이지네이션)
- `POST /roadmaps` - 로드맵 생성
- `GET /roadmaps/{id}` - 로드맵 상세 조회
- `PUT /roadmaps/{id}` - 로드맵 수정
- `DELETE /roadmaps/{id}` - 로드맵 삭제
- `POST /roadmaps/{id}/fork` - 로드맵 포크
- `GET /roadmaps/{id}/progress` - 학습 진행률 조회
- `PUT /roadmaps/{id}/progress` - 학습 진행률 업데이트
- `GET /roadmaps/directories` - 디렉토리 목록
- `POST /roadmaps/directories` - 디렉토리 생성

> 세부 명세: [03-ROADMAP.md](./03-ROADMAP.md)

### 4.5 AI Service (Django 4.2 + DRF)

| 항목     | 내용                                      |
| -------- | ----------------------------------------- |
| **포트** | `8000`                                    |
| **경로** | `/ai/**`                                  |
| **역할** | AI 코칭, 콘텐츠 생성, 추천, RAG 기반 검색 |

**주요 기능 (25+ 엔드포인트):**

- AI 학습 코칭 / 멘토링
- 로드맵 자동 생성 / 추천
- 학습 콘텐츠 생성
- RAG 기반 검색 (문서/학습자료)
- 학습 진행률 분석 및 피드백

> 세부 명세: [04-AI.md](./04-AI.md)

---

## 5. 프론트엔드 개발 시 주의사항

### 5.1 Base URL 설정

```typescript
// .env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080  // 개발
NEXT_PUBLIC_API_BASE_URL=https://api.jagalchi.com  // 프로덕션

// api client
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // 쿠키 전송을 위해 필수
});
```

> **중요**: `withCredentials: true`를 설정해야 HttpOnly 쿠키(Refresh Token)가 자동 전송된다. fetch API를 쓸 경우 `credentials: 'include'`를 설정해야 한다.

### 5.2 CORS

- 게이트웨이에서 CORS를 처리한다.
- 프론트 origin이 허용 목록에 등록되어 있어야 한다.
- 개발 중 CORS 에러가 발생하면 백엔드 팀에 origin 등록을 요청할 것.
- `withCredentials: true` 사용 시, 서버에서 `Access-Control-Allow-Origin`이 와일드카드(`*`)가 아닌 명시적 origin으로 설정되어야 한다.

### 5.3 WebSocket 연결 (STOMP)

Node Service의 실시간 편집에 WebSocket을 사용한다.

```typescript
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const stompClient = new Client({
  // SockJS fallback을 사용하는 경우
  webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws`),

  // 또는 네이티브 WebSocket
  // brokerURL: 'ws://localhost:8080/ws',

  connectHeaders: {
    Authorization: `Bearer ${getAccessToken()}`,
  },

  onConnect: (frame) => {
    console.log('Connected:', frame);

    // 특정 로드맵의 실시간 업데이트 구독
    stompClient.subscribe(`/topic/roadmap/${roadmapId}`, (message) => {
      const update = JSON.parse(message.body);
      handleNodeUpdate(update);
    });
  },

  onStompError: (frame) => {
    console.error('STOMP error:', frame.headers['message']);
    console.error('Details:', frame.body);
  },

  // 재연결 설정
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

stompClient.activate();

// 노드 변경 전송
function sendNodeUpdate(roadmapId: string, nodeData: object) {
  stompClient.publish({
    destination: `/app/roadmap/${roadmapId}/node`,
    body: JSON.stringify(nodeData),
  });
}
```

**WebSocket 주의사항:**

- 연결 시 `Authorization` 헤더로 JWT를 전달해야 한다.
- 토큰 만료 시 WebSocket 연결이 끊어질 수 있으므로, 재연결 로직을 반드시 구현할 것.
- 재연결 시 새로운 Access Token을 `connectHeaders`에 설정해야 한다.
- 네트워크 불안정에 대비해 `reconnectDelay`를 설정할 것.
- SockJS fallback은 WebSocket을 지원하지 않는 환경(일부 프록시 뒤)에서 유용하다.

### 5.4 토큰 갱신 전략

```
                  Access Token 유효            Access Token 만료
                  ─────────────────           ──────────────────
요청 보냄 ──────► 정상 응답 (200)              401 응답
                                               │
                                               ▼
                                    POST /users/auth/refresh
                                    (쿠키로 refresh token 자동 전송)
                                               │
                                    ┌──────────┴──────────┐
                                    ▼                     ▼
                              갱신 성공               갱신 실패
                              새 access token         (refresh token 만료)
                              원래 요청 재시도              │
                                                        ▼
                                                   로그아웃 처리
                                                   로그인 페이지로
```

**권장 사항:**

- Access Token은 메모리(예: Zustand store)에 저장 권장 (XSS 방어)
- localStorage 저장은 허용되나 XSS에 취약할 수 있음
- 동시에 여러 요청이 401을 받을 경우를 대비해 **토큰 갱신 큐** 구현 권장:

```typescript
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

function processQueue(error: Error | null, token: string | null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 갱신 중이면 큐에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await api.post('/users/auth/refresh');
        setAccessToken(data.accessToken);
        processQueue(null, data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        clearAuth();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
```

### 5.5 요청/응답 타임스탬프

- 모든 날짜/시간은 **ISO 8601 형식** (UTC): `2026-04-07T12:00:00Z`
- 프론트에서 표시할 때 사용자의 로컬 타임존으로 변환할 것

### 5.6 파일 업로드

- 파일 업로드가 필요한 경우 `multipart/form-data` 사용
- `Content-Type`을 명시적으로 설정하지 말 것 (브라우저가 boundary를 자동 설정)

### 5.7 AI 엔드포인트 응답 시간

- AI 서비스 엔드포인트는 응답 시간이 길 수 있음 (수 초 ~ 수십 초)
- 스트리밍 응답을 지원하는 엔드포인트는 SSE(Server-Sent Events) 또는 chunked response를 사용
- 프론트에서 적절한 로딩 UI와 타임아웃 설정 필요
- AI 요청에는 넉넉한 타임아웃을 설정할 것 (최소 30초 ~ 60초)

### 5.8 게이트웨이 주입 헤더 (참고용)

게이트웨이가 JWT를 검증한 후 하위 서비스에 다음 헤더를 자동 주입한다. **프론트에서 이 헤더를 직접 보내면 안 되며**, 게이트웨이가 덮어쓴다:

| 헤더            | 설명                          |
| --------------- | ----------------------------- |
| `X-User-ID`     | 인증된 사용자의 고유 ID       |
| `X-User-Role`   | 사용자 역할 (`USER`, `ADMIN`) |
| `X-Permissions` | 사용자 권한 목록              |

---

## 6. 세부 명세서 링크

각 서비스의 상세 API 명세는 아래 문서를 참고:

| 문서                             | 서비스          | 설명                                      |
| -------------------------------- | --------------- | ----------------------------------------- |
| [01-USER.md](./01-USER.md)       | User Service    | 인증, OAuth2, 프로필, 팔로우 API          |
| [02-NODE.md](./02-NODE.md)       | Node Service    | 노드 CRUD, WebSocket/STOMP 실시간 편집    |
| [03-ROADMAP.md](./03-ROADMAP.md) | Roadmap Service | 로드맵 CRUD, 디렉토리, 포크, 진행률       |
| [04-AI.md](./04-AI.md)           | AI Service      | AI 코칭, 생성, 추천, RAG (25+ 엔드포인트) |

---

## 빠른 시작 체크리스트

프론트엔드 개발을 시작하기 전 확인할 것:

- [ ] API base URL 설정 (`http://localhost:8080`)
- [ ] axios 또는 fetch에 `withCredentials: true` 설정
- [ ] 요청 인터셉터에서 `Authorization: Bearer <token>` 자동 주입
- [ ] 응답 인터셉터에서 401 → 토큰 갱신 → 재요청 로직 구현
- [ ] 토큰 갱신 큐잉 로직 구현 (동시 요청 대응)
- [ ] 공통 에러 핸들러 구현 (`ApiError` 타입 기반)
- [ ] WebSocket/STOMP 연결 설정 (Node Service 실시간 편집 시)
- [ ] AI 엔드포인트 호출 시 충분한 타임아웃 설정
