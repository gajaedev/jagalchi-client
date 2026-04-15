# Jagalchi Backend 통합 API 명세서

> **대상 독자**: 프론트엔드 개발자  
> **최종 업데이트**: 2026-04-07  
> **Base URL**: `http://localhost:8080` (API Gateway)

---

## 목차

1. [아키텍처 개요](#1-아키텍처-개요)
2. [인증/인가](#2-인증인가)
3. [공통 규칙](#3-공통-규칙)
4. [User Service API](#4-user-service-api)
5. [Roadmap Service API](#5-roadmap-service-api)
6. [Node Service API](#6-node-service-api)
7. [AI Service API](#7-ai-service-api)
8. [API Gateway](#8-api-gateway)
9. [에러 코드 전체 목록](#9-에러-코드-전체-목록)
10. [프론트엔드 통합 가이드](#10-프론트엔드-통합-가이드)

---

## 1. 아키텍처 개요

```
Frontend (React/Next.js)
    │
    ▼
┌─────────────────────────────────────────────┐
│       API Gateway (Spring Cloud Gateway)     │
│                  :8080                        │
│  JWT 검증 → 라우팅 → 헤더 주입 (X-User-*)     │
└────┬──────────┬──────────┬──────────┬────────┘
     │          │          │          │
     ▼          ▼          ▼          ▼
 User :8081  Node :8082  Roadmap :8083  AI :8000
 (Spring)   (Spring+WS)  (Spring)     (Django)
```

### 라우팅 규칙

| 경로 패턴         | 대상 서비스              | 포트 | 비고                      |
| ----------------- | ------------------------ | ---- | ------------------------- |
| `/users/**`       | User Service             | 8081 | 인증, 프로필, 팔로우      |
| `/node/**`        | Node Service (REST)      | 8082 | 노드 REST API             |
| `/ws/**`          | Node Service (WebSocket) | 8082 | STOMP over WebSocket      |
| `/api/**`         | Node Service             | 8082 | Docker 환경 전용          |
| `/roadmaps/**`    | Roadmap Service          | 8083 | 로드맵 CRUD, 포크, 진행률 |
| `/directories/**` | Roadmap Service          | 8083 | 디렉토리 관리             |
| `/ai/**`          | AI Service               | 8000 | AI 기능 전체              |

---

## 2. 인증/인가

### 2.1 토큰 구조

| 토큰              | 유효 기간 | 저장 위치         | 용도              |
| ----------------- | --------- | ----------------- | ----------------- |
| **Access Token**  | 1시간     | 클라이언트 메모리 | API 요청 인증     |
| **Refresh Token** | 7일       | HttpOnly 쿠키     | Access Token 갱신 |

- JWT 알고리즘: **HS512**
- Access Token: `Authorization: Bearer <token>` 헤더
- Refresh Token: 브라우저 쿠키 자동 전송 (HttpOnly)

### 2.2 Role 매핑

| JWT role  | 게이트웨이 매핑 | X-Permissions |
| --------- | --------------- | ------------- |
| `STUDENT` | `USER`          | `READ,WRITE`  |
| `TEACHER` | `ADMIN`         | `ALL`         |
| `ADMIN`   | `ADMIN`         | `ALL`         |

### 2.3 Public 엔드포인트 (JWT 불필요)

| 메서드    | 경로                            | 설명                                |
| --------- | ------------------------------- | ----------------------------------- |
| `POST`    | `/users`                        | 회원가입                            |
| `POST`    | `/users/auth/login`             | 로그인                              |
| `PATCH`   | `/users/auth/refresh`           | 토큰 갱신                           |
| `*`       | `/users/auth/password-reset/**` | 비밀번호 리셋 (코드 발송/검증/변경) |
| `*`       | `/users/verification/**`        | 이메일 인증 (코드 발송/검증)        |
| `*`       | `/users/oauth2/**`              | OAuth2                              |
| `GET`     | `/actuator/health`              | 헬스체크                            |
| `OPTIONS` | `**`                            | CORS preflight                      |

### 2.4 인증 플로우

```
일반 로그인:
POST /users/auth/login { email, password }
  → { accessToken } + Set-Cookie: refreshToken

토큰 갱신:
PATCH /users/auth/refresh { refreshToken }
  → { accessToken } + Set-Cookie: refreshToken (신규)

OAuth2 로그인:
GET /users/auth/login/google → Google 리다이렉트 → 콜백 → accessToken
GET /users/auth/login/github → GitHub 리다이렉트 → 콜백 → accessToken
```

---

## 3. 공통 규칙

### 3.1 요청/응답 형식

- **Content-Type**: `application/json`
- **날짜**: ISO 8601 UTC (`2026-04-07T12:00:00Z`)
- **페이지네이션**: Spring 표준 (`page`, `size`, `totalElements`, `totalPages`)

### 3.2 성공 응답

```json
// 단일 리소스
{ "id": 1, "name": "...", "createdAt": "2026-04-07T12:00:00Z" }

// 목록 (페이지네이션)
{
  "content": [{ "id": 1, "name": "..." }],
  "page": 0,
  "size": 20,
  "totalElements": 142,
  "totalPages": 8
}
```

### 3.3 에러 응답

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "이메일 형식이 올바르지 않습니다.",
    "details": { "field": "email", "rejectedValue": "invalid-email" },
    "timestamp": "2026-04-07T12:00:00Z"
  }
}
```

---

## 4. User Service API

> **경로 접두사**: `/users` | **포트**: 8081 | **기술**: Spring Boot 4

### 4.1 인증 (Authentication)

#### POST `/users` — 회원가입

| 항목 | 값            |
| ---- | ------------- |
| 인증 | 불필요        |
| 상태 | `201 Created` |

**Request Body**

```json
{
  "email": "user@example.com",
  "name": "사용자이름",
  "password": "password123"
}
```

| 필드       | 타입     | 필수 | 설명               |
| ---------- | -------- | ---- | ------------------ |
| `email`    | `string` | O    | 인증 완료된 이메일 |
| `name`     | `string` | O    | 사용자 이름        |
| `password` | `string` | O    | 비밀번호           |

**Response**

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "사용자이름"
}
```

---

#### POST `/users/auth/login` — 로그인

| 항목 | 값       |
| ---- | -------- |
| 인증 | 불필요   |
| 상태 | `200 OK` |

**Request Body**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**

```json
{
  "accessToken": "eyJhbGciOi..."
}
```

> 응답 헤더에 `Set-Cookie: refreshToken=xxx; HttpOnly; Secure` 포함

---

#### PATCH `/users/auth/password-reset` — 비밀번호 변경

| 항목 | 값                        |
| ---- | ------------------------- |
| 인증 | 불필요 (이메일 인증 필요) |
| 상태 | `204 No Content`          |

**Request Body**

```json
{
  "email": "user@example.com",
  "newPassword": "newPassword123"
}
```

---

#### PATCH `/users/auth/refresh` — 토큰 갱신

| 항목 | 값       |
| ---- | -------- |
| 인증 | 불필요   |
| 상태 | `200 OK` |

**Request Body**

```json
{
  "refreshToken": "refresh_token_value"
}
```

**Response**

```json
{
  "accessToken": "eyJhbGciOi..."
}
```

> 새로운 Refresh Token도 Set-Cookie로 발급

---

#### GET `/users/auth/login/google` — Google OAuth2 로그인

| 항목 | 값                       |
| ---- | ------------------------ |
| 인증 | 불필요                   |
| 상태 | `302 Found` (리다이렉트) |

---

#### GET `/users/auth/login/github` — GitHub OAuth2 로그인

| 항목 | 값                       |
| ---- | ------------------------ |
| 인증 | 불필요                   |
| 상태 | `302 Found` (리다이렉트) |

---

#### DELETE `/users` — 회원탈퇴

| 항목 | 값               |
| ---- | ---------------- |
| 인증 | **필수**         |
| 상태 | `204 No Content` |

---

### 4.2 이메일 인증 (Email Verification)

#### POST `/users/verification` — 회원가입 인증코드 발송

| 항목 | 값       |
| ---- | -------- |
| 인증 | 불필요   |
| 상태 | `200 OK` |

**Request Body**

```json
{
  "email": "user@example.com"
}
```

---

#### PATCH `/users/verification` — 회원가입 인증코드 검증

| 항목 | 값       |
| ---- | -------- |
| 인증 | 불필요   |
| 상태 | `200 OK` |

**Request Body**

```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

---

#### POST `/users/auth/password-reset` — 비밀번호 리셋 인증코드 발송

| 항목 | 값       |
| ---- | -------- |
| 인증 | 불필요   |
| 상태 | `200 OK` |

**Request Body**

```json
{
  "email": "user@example.com"
}
```

> 주의: `PATCH /users/auth/password-reset`(비밀번호 변경)과 경로는 같지만 HTTP 메서드가 다름 (POST vs PATCH)

---

#### PATCH `/users/auth/password-reset/verify` — 비밀번호 리셋 인증코드 검증

| 항목 | 값       |
| ---- | -------- |
| 인증 | 불필요   |
| 상태 | `200 OK` |

**Request Body**

```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

---

### 4.3 사용자 프로필 (User Profile)

#### GET `/users` — 사용자 프로필 조회

| 항목 | 값                               |
| ---- | -------------------------------- |
| 인증 | 선택 (로그인 시 isFollowed 포함) |
| 상태 | `200 OK`                         |

**Query Parameters**

| 파라미터 | 타입     | 필수 | 설명               |
| -------- | -------- | ---- | ------------------ |
| `name`   | `string` | O    | 조회할 사용자 이름 |

**Response**

```json
{
  "user": {
    "name": "사용자이름",
    "email": "user@example.com",
    "profileImageUrl": "https://...",
    "bio": "자기소개",
    "isFollowed": true,
    "stats": {
      "followersCount": 10,
      "followingCount": 5
    },
    "externalLinks": {
      "github": "https://github.com/user"
    }
  },
  "streak": {
    "currentStreak": 5,
    "activities": [
      { "date": "2026-04-07", "count": 3 },
      { "date": "2026-04-06", "count": 1 }
    ]
  }
}
```

---

#### PATCH `/users/profile` — 프로필 수정

| 항목 | 값       |
| ---- | -------- |
| 인증 | **필수** |
| 상태 | `200 OK` |

**Request Body**

```json
{
  "user": {
    "profileImage": "https://...",
    "bio": "새로운 자기소개",
    "externalLinks": {
      "github": "https://github.com/user"
    }
  }
}
```

**Response**

```json
{
  "message": "프로필이 성공적으로 수정되었습니다."
}
```

---

### 4.4 팔로우 (Follow)

#### PATCH `/users/{name}/follow` — 팔로우 토글

| 항목 | 값       |
| ---- | -------- |
| 인증 | **필수** |
| 상태 | `200 OK` |

**Path Parameters**

| 파라미터 | 타입     | 설명             |
| -------- | -------- | ---------------- |
| `name`   | `string` | 대상 사용자 이름 |

**Request Body**

```json
{
  "toggle": true
}
```

---

#### GET `/users/{name}/followers` — 팔로워 목록

| 항목 | 값       |
| ---- | -------- |
| 인증 | 불필요   |
| 상태 | `200 OK` |

**Response**

```json
{
  "userId": 1,
  "type": "FOLLOWER",
  "totalCount": 10,
  "users": [{ "name": "follower1", "profileImage": "https://..." }]
}
```

---

#### GET `/users/{name}/followings` — 팔로잉 목록

| 항목 | 값       |
| ---- | -------- |
| 인증 | 불필요   |
| 상태 | `200 OK` |

**Response**

```json
{
  "userId": 1,
  "type": "FOLLOWING",
  "totalCount": 5,
  "users": [{ "name": "following1", "profileImage": "https://..." }]
}
```

---

### User Service 엔드포인트 요약

| #   | 메서드   | 경로                                | 인증 | 설명                    |
| --- | -------- | ----------------------------------- | ---- | ----------------------- |
| 1   | `POST`   | `/users`                            | X    | 회원가입                |
| 2   | `POST`   | `/users/auth/login`                 | X    | 로그인                  |
| 3   | `PATCH`  | `/users/auth/password-reset`        | X    | 비밀번호 변경           |
| 4   | `PATCH`  | `/users/auth/refresh`               | X    | 토큰 갱신               |
| 5   | `GET`    | `/users/auth/login/google`          | X    | Google OAuth2           |
| 6   | `GET`    | `/users/auth/login/github`          | X    | GitHub OAuth2           |
| 7   | `DELETE` | `/users`                            | O    | 회원탈퇴                |
| 8   | `POST`   | `/users/verification`               | X    | 회원가입 인증코드 발송  |
| 9   | `PATCH`  | `/users/verification`               | X    | 회원가입 인증코드 검증  |
| 10  | `POST`   | `/users/auth/password-reset`        | X    | 비밀번호 리셋 코드 발송 |
| 11  | `PATCH`  | `/users/auth/password-reset/verify` | X    | 비밀번호 리셋 코드 검증 |
| 12  | `GET`    | `/users?name={name}`                | △    | 프로필 조회             |
| 13  | `PATCH`  | `/users/profile`                    | O    | 프로필 수정             |
| 14  | `PATCH`  | `/users/{name}/follow`              | O    | 팔로우 토글             |
| 15  | `GET`    | `/users/{name}/followers`           | X    | 팔로워 목록             |
| 16  | `GET`    | `/users/{name}/followings`          | X    | 팔로잉 목록             |

---

## 5. Roadmap Service API

> **경로 접두사**: `/roadmaps`, `/directories` | **포트**: 8083 | **기술**: Spring Boot 4

### 5.1 로드맵 CRUD

#### POST `/roadmaps` — 로드맵 생성

| 항목 | 값            |
| ---- | ------------- |
| 인증 | **필수**      |
| 상태 | `201 Created` |

**Request Body**

```json
{
  "title": "프론트엔드 로드맵",
  "description": "React부터 Next.js까지",
  "directoryId": 1,
  "isPublic": true,
  "thumbnailUrl": "https://...",
  "tags": ["react", "nextjs", "frontend"]
}
```

| 필드           | 타입       | 필수 | 설명                   |
| -------------- | ---------- | ---- | ---------------------- |
| `title`        | `string`   | O    | 로드맵 제목 (NotBlank) |
| `description`  | `string`   | X    | 설명                   |
| `directoryId`  | `Long`     | X    | 저장할 디렉토리 ID     |
| `isPublic`     | `boolean`  | X    | 공개 여부              |
| `thumbnailUrl` | `string`   | X    | 썸네일 URL             |
| `tags`         | `string[]` | X    | 태그 목록              |

**Response**

```json
{
  "id": 1,
  "title": "프론트엔드 로드맵",
  "description": "React부터 Next.js까지",
  "directoryId": 1,
  "ownerId": 42,
  "isPublic": true,
  "viewCount": 0,
  "createdAt": "2026-04-07T12:00:00Z",
  "updatedAt": "2026-04-07T12:00:00Z"
}
```

---

#### GET `/roadmaps` — 로드맵 목록 (페이지네이션)

| 항목 | 값       |
| ---- | -------- |
| 인증 | **필수** |
| 상태 | `200 OK` |

**Query Parameters**

| 파라미터      | 타입       | 기본값     | 설명                        |
| ------------- | ---------- | ---------- | --------------------------- |
| `page`        | `int`      | `0`        | 페이지 번호                 |
| `size`        | `int`      | `10`       | 페이지 크기                 |
| `sort`        | `string`   | `"latest"` | 정렬 (latest, forks, views) |
| `period`      | `string`   | -          | 기간 필터                   |
| `query`       | `string`   | -          | 검색어                      |
| `userId`      | `Long`     | -          | 사용자 필터                 |
| `directoryId` | `Long`     | -          | 디렉토리 필터               |
| `isPublic`    | `boolean`  | -          | 공개 여부 필터              |
| `tags`        | `string[]` | -          | 태그 필터                   |

**Response**

```json
{
  "content": [
    {
      "id": 1,
      "title": "프론트엔드 로드맵",
      "description": "...",
      "thumbnailUrl": "https://...",
      "isPublic": true,
      "viewCount": 100,
      "forkCount": 5,
      "tags": ["react", "nextjs"],
      "owner": {
        "id": 42,
        "nickname": "사용자",
        "profileImageUrl": "https://..."
      },
      "createdAt": "2026-04-07T12:00:00Z",
      "updatedAt": "2026-04-07T12:00:00Z"
    }
  ],
  "pageable": { "pageNumber": 0, "pageSize": 10 },
  "totalElements": 50,
  "totalPages": 5,
  "hasNext": true
}
```

---

#### GET `/roadmaps/popular` — 인기 로드맵

| 항목 | 값       |
| ---- | -------- |
| 인증 | 불필요   |
| 상태 | `200 OK` |

**Query Parameters**

| 파라미터 | 타입     | 기본값    | 설명                            |
| -------- | -------- | --------- | ------------------------------- |
| `page`   | `int`    | `0`       | 페이지 번호                     |
| `size`   | `int`    | `10`      | 페이지 크기                     |
| `sortBy` | `string` | `"forks"` | 정렬 기준 (forks, stars, views) |

---

#### GET `/roadmaps/{roadmapId}` — 로드맵 상세 조회

| 항목 | 값       |
| ---- | -------- |
| 인증 | **필수** |
| 상태 | `200 OK` |

**Response**

```json
{
  "id": 1,
  "title": "프론트엔드 로드맵",
  "description": "...",
  "thumbnailUrl": "https://...",
  "isPublic": true,
  "viewCount": 100,
  "owner": {
    "id": 42,
    "nickname": "사용자",
    "profileImageUrl": "https://..."
  },
  "stats": {
    "totalNodes": 20,
    "totalEdges": 19,
    "forkCount": 5
  },
  "tags": ["react", "nextjs"],
  "createdAt": "2026-04-07T12:00:00Z",
  "updatedAt": "2026-04-07T12:00:00Z"
}
```

---

#### PATCH `/roadmaps/{roadmapId}` — 로드맵 수정

| 항목 | 값       |
| ---- | -------- |
| 인증 | **필수** |
| 상태 | `200 OK` |

**Request Body**

```json
{
  "title": "수정된 제목",
  "description": "수정된 설명",
  "isPublic": false,
  "thumbnailUrl": "https://...",
  "tags": ["react", "typescript"]
}
```

> 모든 필드 선택적 (변경할 필드만 포함)

**Response**

```json
{
  "id": 1,
  "updatedAt": "2026-04-07T13:00:00Z"
}
```

---

#### DELETE `/roadmaps/{roadmapId}` — 로드맵 삭제

| 항목 | 값       |
| ---- | -------- |
| 인증 | **필수** |
| 상태 | `200 OK` |

**Response**

```json
{
  "message": "로드맵이 삭제되었습니다."
}
```

---

### 5.2 포크 (Fork)

#### POST `/roadmaps/{roadmapId}/fork` — 로드맵 포크

| 항목 | 값            |
| ---- | ------------- |
| 인증 | **필수**      |
| 상태 | `201 Created` |

**Response**: 새로 생성된 로드맵 (`RoadmapResponse`)

---

#### GET `/roadmaps/{roadmapId}/fork-tree` — 포크 트리 조회

| 항목 | 값       |
| ---- | -------- |
| 인증 | 불필요   |
| 상태 | `200 OK` |

**Response**

```json
{
  "id": 1,
  "title": "원본 로드맵",
  "ownerId": 42,
  "ownerName": "사용자",
  "forkCount": 3,
  "children": [
    {
      "id": 2,
      "title": "포크된 로드맵",
      "ownerId": 43,
      "ownerName": "다른사용자",
      "forkCount": 0,
      "children": []
    }
  ]
}
```

---

#### GET `/roadmaps/{roadmapId}/fork-status` — 포크 상태 조회

| 항목 | 값       |
| ---- | -------- |
| 인증 | **필수** |
| 상태 | `200 OK` |

**Response**

```json
{
  "roadmapId": 1,
  "forkCount": 3,
  "isForkedByCurrentUser": true,
  "originalRoadmapId": null,
  "originalRoadmapTitle": null
}
```

---

### 5.3 학습 진행률 (Progress)

#### GET `/roadmaps/{roadmapId}/my-progress` — 내 진행률

| 항목 | 값       |
| ---- | -------- |
| 인증 | **필수** |
| 상태 | `200 OK` |

**Response**

```json
{
  "roadmapId": 1,
  "totalNodes": 20,
  "completedNodes": 8,
  "progressPercentage": 40.0,
  "completedNodeIds": [1, 3, 5, 7, 9, 11, 13, 15],
  "updatedAt": "2026-04-07T12:00:00Z"
}
```

---

#### GET `/roadmaps/{roadmapId}/users/{userId}/progress` — 타인 진행률

| 항목 | 값       |
| ---- | -------- |
| 인증 | **필수** |
| 상태 | `200 OK` |

**Response**: 위와 동일 (`ProgressResponse`)

---

#### POST `/roadmaps/{roadmapId}/nodes/{nodeId}/complete` — 노드 완료 처리

| 항목 | 값       |
| ---- | -------- |
| 인증 | **필수** |
| 상태 | `200 OK` |

**Request Body**

```json
{
  "isCompleted": true,
  "link": "https://blog.example.com/my-learning-record"
}
```

| 필드          | 타입      | 필수 | 설명           |
| ------------- | --------- | ---- | -------------- |
| `isCompleted` | `boolean` | O    | 완료 여부      |
| `link`        | `string`  | X    | 학습 기록 링크 |

**Response**

```json
{
  "nodeId": 5,
  "isCompleted": true,
  "roadmapProgress": 45.0,
  "completedAt": "2026-04-07T12:30:00Z"
}
```

---

### 5.4 디렉토리 관리

#### GET `/directories/tree` — 디렉토리 트리

| 항목 | 값       |
| ---- | -------- |
| 인증 | **필수** |
| 상태 | `200 OK` |

**Response**

```json
[
  {
    "id": 1,
    "name": "프론트엔드",
    "path": "/프론트엔드",
    "children": [
      {
        "id": 2,
        "name": "React",
        "path": "/프론트엔드/React",
        "children": [],
        "roadmaps": [
          {
            "id": 1,
            "title": "React 입문",
            "thumbnailUrl": "...",
            "isPublic": true,
            "updatedAt": "..."
          }
        ]
      }
    ],
    "roadmaps": []
  }
]
```

---

#### POST `/directories` — 디렉토리 생성

| 항목 | 값            |
| ---- | ------------- |
| 인증 | **필수**      |
| 상태 | `201 Created` |

**Request Body**

```json
{
  "name": "새 디렉토리",
  "parentId": 1
}
```

| 필드       | 타입     | 필수 | 설명                     |
| ---------- | -------- | ---- | ------------------------ |
| `name`     | `string` | O    | 디렉토리 이름 (NotBlank) |
| `parentId` | `Long`   | X    | 부모 디렉토리 ID         |

**Response**

```json
{
  "id": 3,
  "name": "새 디렉토리",
  "parentId": 1,
  "path": "/프론트엔드/새 디렉토리",
  "createdAt": "2026-04-07T12:00:00Z"
}
```

---

#### PATCH `/directories/{directoryId}` — 디렉토리 수정

| 항목 | 값       |
| ---- | -------- |
| 인증 | **필수** |
| 상태 | `200 OK` |

**Request Body**

```json
{
  "name": "수정된 이름"
}
```

---

#### DELETE `/directories/{directoryId}` — 디렉토리 삭제

| 항목 | 값       |
| ---- | -------- |
| 인증 | **필수** |
| 상태 | `200 OK` |

**Query Parameters**

| 파라미터            | 타입     | 필수 | 설명                       |
| ------------------- | -------- | ---- | -------------------------- |
| `mode`              | `string` | X    | 삭제 모드 (move, trash)    |
| `targetDirectoryId` | `Long`   | X    | move 시 이동할 디렉토리 ID |

---

### Roadmap Service 엔드포인트 요약

| #   | 메서드   | 경로                                            | 인증 | 설명          |
| --- | -------- | ----------------------------------------------- | ---- | ------------- |
| 1   | `POST`   | `/roadmaps`                                     | O    | 로드맵 생성   |
| 2   | `GET`    | `/roadmaps`                                     | O    | 로드맵 목록   |
| 3   | `GET`    | `/roadmaps/popular`                             | X    | 인기 로드맵   |
| 4   | `GET`    | `/roadmaps/{roadmapId}`                         | O    | 로드맵 상세   |
| 5   | `PATCH`  | `/roadmaps/{roadmapId}`                         | O    | 로드맵 수정   |
| 6   | `DELETE` | `/roadmaps/{roadmapId}`                         | O    | 로드맵 삭제   |
| 7   | `POST`   | `/roadmaps/{roadmapId}/fork`                    | O    | 포크          |
| 8   | `GET`    | `/roadmaps/{roadmapId}/fork-tree`               | X    | 포크 트리     |
| 9   | `GET`    | `/roadmaps/{roadmapId}/fork-status`             | O    | 포크 상태     |
| 10  | `GET`    | `/roadmaps/{roadmapId}/my-progress`             | O    | 내 진행률     |
| 11  | `GET`    | `/roadmaps/{roadmapId}/users/{userId}/progress` | O    | 타인 진행률   |
| 12  | `POST`   | `/roadmaps/{roadmapId}/nodes/{nodeId}/complete` | O    | 노드 완료     |
| 13  | `GET`    | `/directories/tree`                             | O    | 디렉토리 트리 |
| 14  | `POST`   | `/directories`                                  | O    | 디렉토리 생성 |
| 15  | `PATCH`  | `/directories/{directoryId}`                    | O    | 디렉토리 수정 |
| 16  | `DELETE` | `/directories/{directoryId}`                    | O    | 디렉토리 삭제 |

---

## 6. Node Service API

> **포트**: 8082 | **기술**: Spring Boot 4 + WebSocket/STOMP  
> **REST 경로**: `/api/**` | **WebSocket 경로**: `/ws/**`

### 6.1 REST API

#### GET `/api/roadmap/{roadmapId}/events` — 이벤트 조회 (재연결용)

| 항목 | 값       |
| ---- | -------- |
| 인증 | **필수** |
| 상태 | `200 OK` |

**Query Parameters**

| 파라미터 | 타입   | 기본값 | 설명                           |
| -------- | ------ | ------ | ------------------------------ |
| `since`  | `Long` | `0`    | 이 시퀀스 이후의 이벤트만 반환 |

**Response**

```json
[
  {
    "type": "EVENT",
    "eventId": "evt_abc123",
    "sequence": 101,
    "payload": { "...": "..." }
  }
]
```

> 클라이언트 재연결 시 마지막으로 받은 sequence 번호를 `since`로 보내서 누락된 이벤트를 복구한다.

---

### 6.2 WebSocket/STOMP 프로토콜

#### 연결

```
WebSocket (순수):  ws://localhost:8080/ws?access_token=<token>
SockJS fallback:  http://localhost:8080/ws-sockjs?access_token=<token>
STOMP + SockJS:   /ws/roadmap (PresentationWebSocketConfig)
```

> 3개 엔드포인트가 모두 활성화되어 있다. `/ws`는 순수 WebSocket, `/ws-sockjs`는 SockJS fallback, `/ws/roadmap`은 STOMP+SockJS 통합 엔드포인트.

**STOMP 브로커 설정**

| 항목                    | 값                          |
| ----------------------- | --------------------------- |
| Application prefix      | `/app`                      |
| User destination prefix | `/user`                     |
| Simple broker topics    | `/topic`, `/queue`, `/user` |

#### 연결 시 헤더 (CONNECT 프레임)

| 헤더            | 설명                           |
| --------------- | ------------------------------ |
| `X-User-ID`     | 게이트웨이가 주입              |
| `X-User-Role`   | 게이트웨이가 주입 (USER/ADMIN) |
| `X-Roadmap-ID`  | 게이트웨이가 주입 (선택)       |
| `X-Permissions` | 게이트웨이가 주입 (선택)       |

---

#### STOMP `/app/roadmap/{roadmapId}/action` — 로드맵 액션 전송

캔버스에서 노드/엣지/리소스 등을 생성/수정/삭제할 때 사용.

**Payload (Action)**

```json
{
  "actionId": "act_unique_id",
  "roadmap": "1",
  "action": "CREATE",
  "payload": {
    "type": "INFO",
    "target": {
      "type": "NODE",
      "object": "node_1",
      "tempId": "temp_123",
      "nodeId": null
    },
    "prev": null,
    "next": {
      "x": 100.0,
      "y": 200.0,
      "label": "React 기초",
      "locked": false,
      "metadata": {}
    },
    "data": {
      "label": "React 기초",
      "x": 100.0,
      "y": 200.0,
      "width": 200,
      "height": 100
    }
  }
}
```

**Action Types**: `CREATE`, `EDIT`, `DELETE`, `UNDO`, `REDO`

**Target Types**: `NODE`, `GROUP`, `SECTION`, `EDGE`, `TEXT`, `RESOURCE`

**응답 채널**

| 채널                               | 조건         | 페이로드                                                                                        |
| ---------------------------------- | ------------ | ----------------------------------------------------------------------------------------------- |
| `/user/queue/ack`                  | 성공         | `{ "type": "ACK", "actionId": "...", "status": "ACCEPTED" }`                                    |
| `/user/queue/nack`                 | 실패         | `{ "actionId": "...", "actionType": "CREATE", "errorCode": "NODE_001", "errorMessage": "..." }` |
| `/topic/roadmap/{roadmapId}/state` | 브로드캐스트 | `{ "type": "EVENT", "eventId": "...", "sequence": 101, "payload": {...} }`                      |

---

#### STOMP `/app/roadmap/{roadmapId}/cursor` — 커서 위치 전송

다른 사용자에게 내 커서 위치를 공유.

**Payload (CursorPosition)**

```json
{
  "userId": 42,
  "userName": "사용자",
  "x": 350.5,
  "y": 200.3,
  "timestamp": 1712448000000,
  "state": "NORMAL",
  "targetId": "node_1"
}
```

**Cursor States**: `NORMAL`, `DRAGGING`, `SELECTING`, `EDITING`

**브로드캐스트**: `/topic/roadmap/{roadmapId}/cursors`

---

#### STOMP `/app/roadmap/{roadmapId}/cursor/hide` — 커서 숨기기

사용자가 캔버스를 떠날 때 커서를 숨긴다.

**브로드캐스트**: `/topic/roadmap/{roadmapId}/cursors/hide`

---

#### 구독 시 자동 스냅샷

`/topic/roadmap/{roadmapId}/state`를 구독하면 자동으로 `/user/queue/snapshot`에 현재 로드맵 전체 상태가 전송된다.

---

### 6.3 Action Data 필드 상세

| 카테고리   | 필드                                                           | 타입     | 설명                                      |
| ---------- | -------------------------------------------------------------- | -------- | ----------------------------------------- |
| **기본**   | `label`, `x`, `y`, `width`, `height`                           | 다양     | 위치/크기                                 |
| **노드**   | `learningState`                                                | `enum`   | `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED` |
| **엣지**   | `fromNodeId`, `toNodeId`                                       | `Long`   | 연결 노드                                 |
| **엣지**   | `edgeStyle`, `strokeColor`, `strokeWidth`                      | 다양     | 스타일                                    |
| **엣지**   | `arrowType`, `isDirectional`, `animationType`                  | 다양     | 화살표/방향                               |
| **리소스** | `resourceTitle`, `resourceType`, `resourceUrl`                 | `string` | 리소스 정보                               |
| **텍스트** | `textContent`, `fontSize`, `textColor`, `fontWeight`           | 다양     | 텍스트 스타일                             |
| **섹션**   | `sectionName`, `sectionWidth`, `sectionHeight`, `sectionColor` | 다양     | 섹션 정보                                 |

---

### 6.4 에러 코드

| 코드          | 설명                      |
| ------------- | ------------------------- |
| `AUTH_001`    | 인증이 필요합니다         |
| `AUTH_002`    | 권한이 없습니다           |
| `AUTH_003`    | 유효하지 않은 사용자 ID   |
| `ACTION_001`  | 이미 처리된 요청 (중복)   |
| `ACTION_002`  | 지원하지 않는 액션 타입   |
| `NODE_001`    | 위치 정보는 필수입니다    |
| `NODE_002`    | 노드를 찾을 수 없습니다   |
| `EDGE_001`    | 엣지를 찾을 수 없습니다   |
| `ROADMAP_001` | 로드맵을 찾을 수 없습니다 |
| `COMMON_001`  | 잘못된 입력입니다         |
| `COMMON_002`  | 서버 내부 오류            |

---

### 6.5 메시지 플로우

```
1. Client CONNECT (ws://gateway:8080/ws?access_token=...)
   → 게이트웨이가 JWT 검증 후 헤더 주입

2. Client SUBSCRIBE /topic/roadmap/{id}/state
   → 서버가 /user/queue/snapshot 으로 초기 상태 전송

3. Client SEND /app/roadmap/{id}/action { Action payload }
   → 서버 검증 → ACK/NACK → 브로드캐스트 EVENT

4. Client SEND /app/roadmap/{id}/cursor { CursorPosition }
   → 브로드캐스트 to /topic/roadmap/{id}/cursors

5. 재연결 시: GET /api/roadmap/{id}/events?since={lastSequence}
   → 누락된 이벤트 복구
```

---

### Node Service 엔드포인트 요약

| #   | 프로토콜 | 경로                                      | 방향 | 설명              |
| --- | -------- | ----------------------------------------- | ---- | ----------------- |
| 1   | REST     | `GET /api/roadmap/{roadmapId}/events`     | →    | 이벤트 조회       |
| 2   | STOMP    | `/app/roadmap/{roadmapId}/action`         | →    | 액션 전송         |
| 3   | STOMP    | `/app/roadmap/{roadmapId}/cursor`         | →    | 커서 위치         |
| 4   | STOMP    | `/app/roadmap/{roadmapId}/cursor/hide`    | →    | 커서 숨기기       |
| 5   | STOMP    | `/topic/roadmap/{roadmapId}/state`        | ←    | 상태 브로드캐스트 |
| 6   | STOMP    | `/topic/roadmap/{roadmapId}/cursors`      | ←    | 커서 브로드캐스트 |
| 7   | STOMP    | `/topic/roadmap/{roadmapId}/cursors/hide` | ←    | 커서 숨김 알림    |
| 8   | STOMP    | `/user/queue/ack`                         | ←    | 액션 성공         |
| 9   | STOMP    | `/user/queue/nack`                        | ←    | 액션 실패         |
| 10  | STOMP    | `/user/queue/snapshot`                    | ←    | 초기 스냅샷       |

---

## 7. AI Service API

> **경로 접두사**: `/ai` | **포트**: 8000 | **기술**: Django 4.2 + DRF  
> **인증**: 선택적 (Bearer Token 또는 쿼리 파라미터)  
> **대부분 GET + Query Parameter 방식**

### Rate Limiting

| 유형   | 제한           |
| ------ | -------------- |
| 비인증 | 100 req/hour   |
| 인증   | 1,000 req/hour |

---

### 7.1 문서 및 헬스체크

#### GET `/ai/health/` — 헬스체크

**Response**

```json
{
  "status": "ok",
  "version": "1.0.0",
  "services": {
    "gemini": true,
    "tavily": true,
    "exa": true,
    "graph_rag": true,
    "semantic_cache": true
  },
  "timestamp": "2026-04-07T12:00:00Z"
}
```

#### GET `/ai/schema/` — OpenAPI 스키마

#### GET `/ai/docs/` — Swagger UI

#### GET `/ai/redoc/` — ReDoc UI

---

### 7.2 학습 코치 API

#### GET `/ai/record-coach` — 학습 기록 피드백

| 파라미터        | 타입     | 설명                    |
| --------------- | -------- | ----------------------- |
| `roadmap_id`    | `string` | 로드맵 ID               |
| `node_id`       | `string` | 노드 ID                 |
| `compose_level` | `string` | `"quick"` 또는 `"full"` |

**Response**

```json
{
  "record_id": "rec_001",
  "scores": {
    "evidence_level": 80,
    "structure_score": 70,
    "specificity_score": 90,
    "reproducibility_score": 60,
    "quality_score": 75
  },
  "strengths": ["코드 예시가 풍부함", "단계별 설명이 명확함"],
  "gaps": ["테스트 코드 부재", "에러 핸들링 미언급"],
  "rewrite_suggestions": { "...": "..." },
  "code_feedback": { "...": "..." },
  "next_actions": [{ "...": "..." }],
  "followup_questions": ["useEffect 클린업은 어떻게 하나요?"],
  "retrieval_evidence": [{ "...": "..." }],
  "model_version": "gemini-2.0",
  "prompt_version": "v3",
  "created_at": "2026-04-07T12:00:00Z"
}
```

---

#### GET `/ai/learning-coach` — 학습 코치 Q&A

| 파라미터        | 타입     | 기본값                             | 설명                    |
| --------------- | -------- | ---------------------------------- | ----------------------- |
| `user_id`       | `string` | -                                  | 사용자 ID               |
| `question`      | `string` | `"React useEffect 에러 해결 방법"` | 질문                    |
| `compose_level` | `string` | -                                  | `"quick"` 또는 `"full"` |

**Response**

```json
{
  "user_id": "user_1",
  "question": "React useEffect 에러 해결 방법",
  "intent": "debugging",
  "toolchain": ["rag", "web_search"],
  "plan": ["RAG 검색으로 관련 문서 탐색", "코드 예시 생성"],
  "answer": "useEffect에서 발생하는 에러는...",
  "retrieval_evidence": [{ "...": "..." }],
  "behavior_summary": { "...": "..." },
  "model_version": "gemini-2.0",
  "prompt_version": "v3",
  "created_at": "2026-04-07T12:00:00Z",
  "cache_hit": false
}
```

---

#### GET `/ai/learning-pattern` — 학습 패턴 분석

| 파라미터  | 타입     | 기본값 | 설명           |
| --------- | -------- | ------ | -------------- |
| `user_id` | `string` | -      | 사용자 ID      |
| `days`    | `int`    | `30`   | 분석 기간 (일) |

**Response**

```json
{
  "user_id": "user_1",
  "period": "30d",
  "patterns": { "...": "..." },
  "recommendations": ["매일 30분씩 학습하면 효과적입니다"],
  "model_version": "gemini-2.0",
  "generated_at": "2026-04-07T12:00:00Z"
}
```

---

### 7.3 로드맵 API

#### GET `/ai/related-roadmaps` — 관련 로드맵 추천

| 파라미터     | 타입     | 설명           |
| ------------ | -------- | -------------- |
| `roadmap_id` | `string` | 기준 로드맵 ID |

**Response**

```json
{
  "roadmap_id": "rm_frontend",
  "candidates": [
    {
      "related_roadmap_id": "rm_react",
      "score": 0.92,
      "reasons": [{ "type": "topic_overlap", "value": "React 관련 노드 80% 공유" }]
    }
  ],
  "model_version": "gemini-2.0",
  "evidence_snapshot": { "...": "..." },
  "generated_at": "2026-04-07T12:00:00Z"
}
```

---

#### GET `/ai/roadmap-generated` — AI 로드맵 생성

| 파라미터         | 타입     | 기본값              | 설명                    |
| ---------------- | -------- | ------------------- | ----------------------- |
| `goal`           | `string` | `"프론트엔드 심화"` | 학습 목표               |
| `preferred_tags` | `string` | -                   | 선호 태그 (쉼표 구분)   |
| `max_nodes`      | `int`    | `6`                 | 최대 노드 수            |
| `compose_level`  | `string` | -                   | `"quick"` 또는 `"full"` |

**Response**

```json
{
  "roadmap_id": "rm_generated_001",
  "title": "프론트엔드 심화 로드맵",
  "description": "...",
  "nodes": [{ "node_id": "n1", "title": "TypeScript 기초", "tags": ["typescript"] }],
  "edges": [{ "source": "n1", "target": "n2", "type": "prerequisite" }],
  "tags": ["typescript", "react", "nextjs"],
  "model_version": "gemini-2.0",
  "prompt_version": "v3",
  "created_at": "2026-04-07T12:00:00Z",
  "retrieval_evidence": [{ "...": "..." }]
}
```

---

#### GET `/ai/roadmap-recommendation` — 로드맵 추천

| 파라미터      | 타입     | 기본값           | 설명      |
| ------------- | -------- | ---------------- | --------- |
| `target_role` | `string` | `"frontend_dev"` | 목표 직군 |
| `user_id`     | `string` | -                | 사용자 ID |

---

#### GET `/ai/document-roadmap` — 문서 기반 로드맵 분석

| 파라미터   | 타입     | 설명                 |
| ---------- | -------- | -------------------- |
| `document` | `string` | 문서 내용 (optional) |
| `goal`     | `string` | 목표 (optional)      |

#### POST `/ai/document-roadmap` — 문서 기반 로드맵 분석 (POST)

**Request Body**

```json
{
  "document": "문서 내용...",
  "goal": "프론트엔드 개발자"
}
```

| 필드       | 타입     | 필수 | 설명                 |
| ---------- | -------- | ---- | -------------------- |
| `document` | `string` | X    | 문서 내용 (optional) |
| `goal`     | `string` | X    | 목표 (optional)      |

**Response**

```json
{
  "document_summary": "...",
  "extracted_keywords": ["React", "TypeScript"],
  "recommended_roadmaps": [{ "...": "..." }],
  "suggested_topics": ["상태 관리", "테스팅"],
  "model_version": "gemini-2.0",
  "created_at": "2026-04-07T12:00:00Z"
}
```

---

### 7.4 기술 카드 API

#### GET `/ai/tech-cards` — 기술 카드 조회

| 파라미터    | 타입     | 기본값    | 설명        |
| ----------- | -------- | --------- | ----------- |
| `tech_slug` | `string` | `"react"` | 기술 슬러그 |

**Response**

```json
{
  "id": "tc_react",
  "name": "React",
  "category": "frontend_library",
  "tech_slug": "react",
  "version": "19.x",
  "summary": "UI 빌드를 위한 JavaScript 라이브러리",
  "why_it_matters": ["..."],
  "when_to_use": ["..."],
  "pitfalls": ["과도한 리렌더링", "상태 관리 복잡성"],
  "alternatives": [{ "slug": "vuejs", "why": "더 낮은 학습 곡선" }],
  "learning_path": [{ "stage": "beginner", "items": ["JSX", "Components", "Props"] }],
  "sources": [
    { "title": "React 공식 문서", "url": "https://react.dev", "fetched_at": "2026-04-07T12:00:00Z" }
  ]
}
```

---

#### GET `/ai/tech-fingerprint` — 로드맵 기술 태깅

| 파라미터            | 타입     | 설명           |
| ------------------- | -------- | -------------- |
| `roadmap_id`        | `string` | 로드맵 ID      |
| `include_rationale` | `bool`   | 근거 포함 여부 |

**Response**

```json
{
  "roadmap_id": "rm_frontend",
  "tags": [
    { "tech_slug": "react", "type": "core", "confidence": 0.95, "rationale": "..." },
    { "tech_slug": "webpack", "type": "optional", "confidence": 0.6, "rationale": "..." }
  ],
  "generated_at": "2026-04-07T12:00:00Z",
  "model_version": "gemini-2.0"
}
```

> Tag types: `core`, `optional`, `alternative`, `deprecated`

---

### 7.5 댓글 인텔리전스 API

#### GET `/ai/comment-digest` — 댓글 요약 & 병목 분석

| 파라미터      | 타입     | 기본값 | 설명           |
| ------------- | -------- | ------ | -------------- |
| `roadmap_id`  | `string` | -      | 로드맵 ID      |
| `period_days` | `int`    | `14`   | 분석 기간 (일) |

**Response**

```json
{
  "roadmap_id": "rm_frontend",
  "period": "14d",
  "highlights": ["React hooks에 대한 질문이 가장 많음"],
  "bottlenecks": [{ "node_id": "n5", "score": 0.85, "top_topics": ["useEffect", "cleanup"] }],
  "generated_by": {
    "model_version": "gemini-2.0",
    "prompt_version": "v3"
  }
}
```

---

#### GET `/ai/comment-duplicates` — 중복 질문 탐지

| 파라미터     | 타입     | 기본값 | 설명      |
| ------------ | -------- | ------ | --------- |
| `roadmap_id` | `string` | -      | 로드맵 ID |
| `query`      | `string` | -      | 검색 쿼리 |
| `top_k`      | `int`    | `3`    | 반환 개수 |

**Response**

```json
[
  { "comment_id": "c_123", "snippet": "useEffect 클린업이 안 됩니다..." },
  { "comment_id": "c_456", "snippet": "Effect에서 메모리 누수가..." }
]
```

---

### 7.6 검색 및 추천 API

#### GET `/ai/resource-recommendation` — 학습 자료 추천

| 파라미터       | 타입     | 기본값                             | 설명                 |
| -------------- | -------- | ---------------------------------- | -------------------- |
| `query`        | `string` | `"React useEffect 에러 해결 방법"` | 검색어               |
| `top_k`        | `int`    | `3`                                | 반환 개수            |
| `recency_days` | `int`    | `30`                               | 최근 기간 (0=무제한) |

**Response**

```json
{
  "query": "React useEffect 에러 해결 방법",
  "items": [
    { "title": "useEffect 완벽 가이드", "url": "https://...", "source": "blog", "score": 0.95 }
  ],
  "model_version": "gemini-2.0",
  "retrieval_evidence": [{ "...": "..." }],
  "generated_at": "2026-04-07T12:00:00Z"
}
```

---

#### GET `/ai/web-search` — 웹 검색

| 파라미터       | 타입     | 기본값               | 설명                               |
| -------------- | -------- | -------------------- | ---------------------------------- |
| `query`        | `string` | `"Python 학습 자료"` | 검색어 (선택, 기본값 있음)         |
| `top_k`        | `int`    | `5`                  | 결과 수 (최대 20)                  |
| `engine`       | `string` | `"all"`              | 검색 엔진 (`tavily`, `exa`, `all`) |
| `recency_days` | `int`    | -                    | 최근 기간 필터                     |

**Response**

```json
{
  "query": "React 19 new features",
  "results": [
    {
      "title": "React 19 Release Notes",
      "url": "https://...",
      "content": "...",
      "score": 0.9,
      "source": "tavily",
      "fetched_at": "2026-04-07T12:00:00Z"
    }
  ],
  "engines_used": ["tavily"],
  "total_results": 5,
  "generated_at": "2026-04-07T12:00:00Z"
}
```

---

#### GET `/ai/graph-rag` — GraphRAG 컨텍스트 검색

| 파라미터 | 타입     | 기본값                             | 설명      |
| -------- | -------- | ---------------------------------- | --------- |
| `query`  | `string` | `"React useEffect 에러 해결 방법"` | 검색어    |
| `top_k`  | `int`    | `3`                                | 반환 개수 |

**Response**

```json
{
  "retrieval_evidence": [{ "...": "..." }],
  "graph_snapshot": {
    "nodes": [{ "id": "n1", "label": "React", "type": "technology" }],
    "edges": [{ "from": "n1", "to": "n2", "relation": "depends_on" }]
  }
}
```

---

### 7.7 Init Data 관리 API

#### GET `/ai/init-data` — Init Data 목록

| 파라미터     | 타입     | 설명             |
| ------------ | -------- | ---------------- |
| `roadmap_id` | `string` | 로드맵 ID (선택) |

---

#### POST `/ai/init-data` — Init Data 생성

| 항목 | 값            |
| ---- | ------------- |
| 인증 | **필수**      |
| 상태 | `201 Created` |

**Request Body**

```json
{
  "roadmap_id": "rm_frontend",
  "content": "학습 자료 내용...",
  "data_type": "text",
  "filename": null
}
```

| 필드         | 타입     | 필수 | 설명                                    |
| ------------ | -------- | ---- | --------------------------------------- |
| `roadmap_id` | `string` | X    | 로드맵 ID                               |
| `content`    | `string` | O    | 내용                                    |
| `data_type`  | `string` | X    | `"file"` 또는 `"text"` (기본: `"text"`) |
| `filename`   | `string` | X    | 파일명                                  |

---

#### GET `/ai/init-data/{init_data_id}` — Init Data 상세

#### PUT `/ai/init-data/{init_data_id}` — Init Data 수정

**Request Body**

```json
{
  "content": "수정된 내용"
}
```

#### DELETE `/ai/init-data/{init_data_id}` — Init Data 삭제

| 상태 | `204 No Content` |

---

### 7.8 노드 콘텐츠 생성 API

#### GET `/ai/node-generation` — Init Data 기반 노드 생성

| 파라미터       | 타입     | 설명                |
| -------------- | -------- | ------------------- |
| `init_data_id` | `string` | Init Data ID (필수) |

**Response**: `RoadmapGeneratedSerializer` (7.3 roadmap-generated 응답과 동일 구조)

---

#### GET `/ai/node-description` — 노드 설명 생성

| 파라미터     | 타입     | 설명                 |
| ------------ | -------- | -------------------- |
| `node_title` | `string` | 노드 제목 (필수)     |
| `context`    | `string` | 추가 컨텍스트 (선택) |

**Response**

```json
{
  "node_title": "React Hooks",
  "description": "React Hooks는 함수형 컴포넌트에서...",
  "generated_at": "2026-04-07T12:00:00Z"
}
```

---

#### GET `/ai/node-resource-recommendation` — 노드별 학습 자료 추천

| 파라미터     | 타입     | 설명             |
| ------------ | -------- | ---------------- |
| `node_id`    | `string` | 노드 ID (필수)   |
| `roadmap_id` | `string` | 로드맵 ID (선택) |

**Response**: `ResourceRecommendationSerializer` (7.6 resource-recommendation 응답과 동일 구조)

---

#### POST `/ai/node-resource-save` — 노드 학습 자료 저장

| 항목 | 값            |
| ---- | ------------- |
| 인증 | **필수**      |
| 상태 | `201 Created` |

**Request Body**

```json
{
  "node_id": "n1",
  "title": "React 공식 문서",
  "url": "https://react.dev",
  "source": "web",
  "description": "React 공식 문서 튜토리얼"
}
```

**Response**

```json
{
  "resource_id": "res_001",
  "node_id": "n1",
  "title": "React 공식 문서",
  "url": "https://react.dev",
  "source": "web",
  "description": "React 공식 문서 튜토리얼",
  "created_at": "2026-04-07T12:00:00Z"
}
```

---

### 7.9 통합 데모

#### GET `/ai/demo` — 전체 AI 기능 데모

모든 AI 모듈의 결과를 한 번에 반환. 개발/테스트용.

| 파라미터            | 타입     | 기본값                             | 설명                    |
| ------------------- | -------- | ---------------------------------- | ----------------------- |
| `roadmap_id`        | `string` | `"rm_frontend"`                    | 로드맵 ID               |
| `tech_slug`         | `string` | `"react"`                          | 기술 슬러그             |
| `user_id`           | `string` | `"user_1"`                         | 사용자 ID               |
| `question`          | `string` | `"React useEffect 에러 해결 방법"` | 질문                    |
| `goal`              | `string` | `"프론트엔드 심화"`                | 학습 목표               |
| `target_role`       | `string` | `"frontend_dev"`                   | 목표 직군               |
| `compose_level`     | `string` | `"quick"`                          | `"quick"` 또는 `"full"` |
| `include_rationale` | `bool`   | `false`                            | 근거 포함               |

**Response**: 모든 AI 모듈 응답을 포함한 복합 객체

---

### AI Service 엔드포인트 요약

| #   | 메서드   | 경로                               | 인증 | 설명                  |
| --- | -------- | ---------------------------------- | ---- | --------------------- |
| 1   | `GET`    | `/ai/health/`                      | X    | 헬스체크              |
| 2   | `GET`    | `/ai/schema/`                      | X    | OpenAPI 스키마        |
| 3   | `GET`    | `/ai/docs/`                        | X    | Swagger UI            |
| 4   | `GET`    | `/ai/redoc/`                       | X    | ReDoc UI              |
| 5   | `GET`    | `/ai/demo`                         | △    | 전체 데모             |
| 6   | `GET`    | `/ai/record-coach`                 | △    | 학습 기록 피드백      |
| 7   | `GET`    | `/ai/learning-coach`               | △    | 학습 코치 Q&A         |
| 8   | `GET`    | `/ai/learning-pattern`             | △    | 학습 패턴 분석        |
| 9   | `GET`    | `/ai/related-roadmaps`             | △    | 관련 로드맵           |
| 10  | `GET`    | `/ai/roadmap-generated`            | △    | AI 로드맵 생성        |
| 11  | `GET`    | `/ai/roadmap-recommendation`       | △    | 로드맵 추천           |
| 12  | `GET`    | `/ai/document-roadmap`             | △    | 문서 기반 분석 (GET)  |
| 13  | `POST`   | `/ai/document-roadmap`             | △    | 문서 기반 분석 (POST) |
| 14  | `GET`    | `/ai/tech-cards`                   | △    | 기술 카드             |
| 15  | `GET`    | `/ai/tech-fingerprint`             | △    | 기술 태깅             |
| 16  | `GET`    | `/ai/comment-digest`               | △    | 댓글 요약             |
| 17  | `GET`    | `/ai/comment-duplicates`           | △    | 중복 질문 탐지        |
| 18  | `GET`    | `/ai/resource-recommendation`      | △    | 학습 자료 추천        |
| 19  | `GET`    | `/ai/web-search`                   | △    | 웹 검색               |
| 20  | `GET`    | `/ai/graph-rag`                    | △    | GraphRAG 검색         |
| 21  | `GET`    | `/ai/init-data`                    | △    | Init Data 목록        |
| 22  | `POST`   | `/ai/init-data`                    | O    | Init Data 생성        |
| 23  | `GET`    | `/ai/init-data/{id}`               | △    | Init Data 상세        |
| 24  | `PUT`    | `/ai/init-data/{id}`               | O    | Init Data 수정        |
| 25  | `DELETE` | `/ai/init-data/{id}`               | O    | Init Data 삭제        |
| 26  | `GET`    | `/ai/node-generation`              | △    | 노드 생성             |
| 27  | `GET`    | `/ai/node-description`             | △    | 노드 설명             |
| 28  | `GET`    | `/ai/node-resource-recommendation` | △    | 노드 자료 추천        |
| 29  | `POST`   | `/ai/node-resource-save`           | O    | 노드 자료 저장        |

> △ = 선택적 인증 (인증 시 Rate Limit 상향)

---

## 8. API Gateway

> **포트**: 8080 | **기술**: Spring Cloud Gateway

### 8.1 게이트웨이가 주입하는 헤더

JWT 검증 후 모든 하위 서비스에 자동 주입. **프론트엔드에서 직접 보낼 필요 없음.**

| 헤더            | 타입     | 설명                  | 예시                        |
| --------------- | -------- | --------------------- | --------------------------- |
| `X-User-ID`     | `Long`   | 유저 고유 ID          | `42`                        |
| `X-User-Role`   | `string` | 매핑된 역할           | `USER`, `ADMIN`             |
| `X-Permissions` | `string` | 권한 문자열           | `ALL`, `READ,WRITE`, `READ` |
| `X-Roadmap-ID`  | `Long`   | 로드맵 ID (있을 때만) | `123`                       |

### 8.2 CORS 설정

| 항목            | 값                                                 |
| --------------- | -------------------------------------------------- |
| Allowed Origins | `http://localhost:3000`, `http://localhost:5173`   |
| Allowed Methods | `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS` |
| Allowed Headers | `*`                                                |
| Credentials     | `true`                                             |
| Max Age         | `3600`초                                           |

### 8.3 WebSocket 인증

- `Upgrade: websocket` 요청은 전용 `WebSocketHandshakeFilter`가 처리
- 토큰이 있으면 REST와 동일하게 헤더 주입
- 토큰 없이 연결하면 **게스트 모드**

### 8.4 게이트웨이 에러 응답

| 상태 코드 | 원인                           |
| --------- | ------------------------------ |
| `401`     | 토큰 누락/만료/유효하지 않음   |
| `401`     | `type`이 `ACCESS_TOKEN`이 아님 |
| `401`     | `id` 또는 `role` 클레임 누락   |

### 8.5 헬스체크/모니터링

| 메서드 | 경로                   | 설명              |
| ------ | ---------------------- | ----------------- |
| `GET`  | `/actuator/health`     | 서비스 상태       |
| `GET`  | `/actuator/prometheus` | Prometheus 메트릭 |
| `GET`  | `/actuator/metrics`    | 앱 메트릭         |

---

## 9. 에러 코드 전체 목록

### 9.1 공통 HTTP 에러

| HTTP  | 코드                | 설명               | 프론트 처리                    |
| ----- | ------------------- | ------------------ | ------------------------------ |
| `400` | `VALIDATION_FAILED` | 유효성 검증 실패   | `details`에서 필드별 에러 표시 |
| `400` | `BAD_REQUEST`       | 잘못된 요청        | 에러 메시지 표시               |
| `401` | `UNAUTHORIZED`      | 인증 실패          | 토큰 갱신 → 실패 시 로그인     |
| `401` | `TOKEN_EXPIRED`     | 토큰 만료          | Refresh로 갱신                 |
| `401` | `INVALID_TOKEN`     | 유효하지 않은 토큰 | 로그인 리다이렉트              |
| `403` | `FORBIDDEN`         | 권한 없음          | 접근 권한 안내                 |
| `404` | `NOT_FOUND`         | 리소스 없음        | 404 페이지                     |
| `409` | `CONFLICT`          | 리소스 충돌        | 충돌 해결 안내                 |
| `429` | `RATE_LIMITED`      | 요청 초과          | Retry-After 확인               |
| `500` | `INTERNAL_ERROR`    | 서버 오류          | 재시도 안내                    |

### 9.2 도메인별 에러

| 코드                       | 서비스  | 설명             |
| -------------------------- | ------- | ---------------- |
| `USER_NOT_FOUND`           | User    | 사용자 없음      |
| `EMAIL_ALREADY_EXISTS`     | User    | 이메일 중복      |
| `INVALID_CREDENTIALS`      | User    | 인증 정보 불일치 |
| `ROADMAP_NOT_FOUND`        | Roadmap | 로드맵 없음      |
| `ROADMAP_FORK_FAILED`      | Roadmap | 포크 실패        |
| `NODE_NOT_FOUND`           | Node    | 노드 없음        |
| `CONCURRENT_EDIT_CONFLICT` | Node    | 동시 편집 충돌   |
| `AI_QUOTA_EXCEEDED`        | AI      | AI 할당량 초과   |
| `AI_MODEL_ERROR`           | AI      | AI 모델 오류     |

### 9.3 Node Service STOMP 에러

| 코드          | 설명                    |
| ------------- | ----------------------- |
| `AUTH_001`    | 인증 필요               |
| `AUTH_002`    | 권한 없음               |
| `AUTH_003`    | 유효하지 않은 사용자 ID |
| `ACTION_001`  | 중복 요청               |
| `ACTION_002`  | 지원하지 않는 액션 타입 |
| `NODE_001`    | 위치 정보 필수          |
| `NODE_002`    | 노드 없음               |
| `EDGE_001`    | 엣지 없음               |
| `ROADMAP_001` | 로드맵 없음             |
| `COMMON_001`  | 잘못된 입력             |
| `COMMON_002`  | 서버 내부 오류          |

---

## 10. 프론트엔드 통합 가이드

### 10.1 Base URL

```typescript
// .env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080      // 개발
NEXT_PUBLIC_API_BASE_URL=https://api.jagalchi.com   // 프로덕션
```

### 10.2 axios 설정

```typescript
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // 쿠키(Refresh Token) 자동 전송
});

// 요청 인터셉터: Access Token 주입
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 응답 인터셉터: 401 → 토큰 갱신 → 재요청
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const req = error.config;
    if (error.response?.status === 401 && !req._retry) {
      req._retry = true;
      const { data } = await api.patch('/users/auth/refresh');
      setAccessToken(data.accessToken);
      req.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(req);
    }
    return Promise.reject(error);
  },
);
```

### 10.3 WebSocket/STOMP 연결

```typescript
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const client = new Client({
  webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws?access_token=${getAccessToken()}`),
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,

  onConnect: () => {
    // 스냅샷 수신
    client.subscribe('/user/queue/snapshot', (msg) => {
      const snapshot = JSON.parse(msg.body);
      initCanvas(snapshot);
    });

    // 실시간 이벤트 수신
    client.subscribe(`/topic/roadmap/${roadmapId}/state`, (msg) => {
      const event = JSON.parse(msg.body);
      applyEvent(event);
    });

    // ACK/NACK
    client.subscribe('/user/queue/ack', handleAck);
    client.subscribe('/user/queue/nack', handleNack);

    // 커서
    client.subscribe(`/topic/roadmap/${roadmapId}/cursors`, handleCursors);
  },
});

client.activate();
```

### 10.4 AI 엔드포인트 호출 시 주의

- 응답 시간이 길 수 있음 (수 초 ~ 수십 초)
- **타임아웃을 최소 30~60초로 설정**
- 적절한 로딩 UI 필수
- Rate Limiting 주의 (비인증 100/h, 인증 1000/h)

### 10.5 체크리스트

- [ ] API base URL 설정 (`http://localhost:8080`)
- [ ] `withCredentials: true` 설정
- [ ] `Authorization: Bearer <token>` 자동 주입
- [ ] 401 → 토큰 갱신 → 재요청 로직
- [ ] 토큰 갱신 큐잉 (동시 요청 대응)
- [ ] 공통 에러 핸들러
- [ ] WebSocket/STOMP 연결 (실시간 편집 시)
- [ ] AI 엔드포인트 타임아웃 설정

---

## 전체 엔드포인트 카운트

| 서비스          | REST   | WebSocket            | 합계   |
| --------------- | ------ | -------------------- | ------ |
| User Service    | 16     | -                    | 16     |
| Roadmap Service | 16     | -                    | 16     |
| Node Service    | 1      | 3 send + 6 subscribe | 10     |
| AI Service      | 29     | -                    | 29     |
| **합계**        | **62** | **9**                | **71** |
