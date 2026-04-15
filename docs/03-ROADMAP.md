# Jagalchi Roadmap Service API 명세서

> **Base URL**: `http://localhost:8080` (게이트웨이 프록시 경유)
> **서비스**: jagalchi-server-roadmap (Spring Boot 4)
> **DB**: MySQL + Liquibase
> **최종 수정**: 2026-04-07

---

## 목차

1. [인증 및 권한](#1-인증-및-권한)
2. [공통 에러 형식](#2-공통-에러-형식)
3. [TypeScript 타입 정의](#3-typescript-타입-정의)
4. [로드맵 API](#4-로드맵-api)
   - [POST /roadmaps](#41-post-roadmaps)
   - [GET /roadmaps](#42-get-roadmaps)
   - [GET /roadmaps/:roadmapId](#43-get-roadmapsroadmapid)
   - [PATCH /roadmaps/:roadmapId](#44-patch-roadmapsroadmapid)
   - [DELETE /roadmaps/:roadmapId](#45-delete-roadmapsroadmapid)
   - [POST /roadmaps/:roadmapId/fork](#46-post-roadmapsroadmapidfork)
   - [GET /roadmaps/popular](#47-get-roadmapspopular)
   - [GET /roadmaps/:roadmapId/fork-tree](#48-get-roadmapsroadmapidfork-tree)
   - [GET /roadmaps/:roadmapId/fork-status](#49-get-roadmapsroadmapidfork-status)
5. [진행률 API](#5-진행률-api)
   - [GET /roadmaps/:roadmapId/my-progress](#51-get-roadmapsroadmapidmy-progress)
   - [GET /roadmaps/:roadmapId/users/:userId/progress](#52-get-roadmapsroadmapidusersuseridprogress)
   - [POST /roadmaps/:roadmapId/nodes/:nodeId/complete](#53-post-roadmapsroadmapidnodesnodeidcomplete)
6. [디렉토리 API](#6-디렉토리-api)
   - [GET /directories/tree](#61-get-directoriestree)
   - [POST /directories](#62-post-directories)
   - [PATCH /directories/:directoryId](#63-patch-directoriesdirectoryid)
   - [DELETE /directories/:directoryId](#64-delete-directoriesdirectoryid)
7. [에러 코드 레퍼런스](#7-에러-코드-레퍼런스)

---

## 1. 인증 및 권한

### 인증 흐름

모든 요청은 게이트웨이를 통해 프록시된다. 게이트웨이가 JWT를 검증한 후 다음 헤더를 주입한다:

| 헤더            | 설명                                  |
| --------------- | ------------------------------------- |
| `Authorization` | `Bearer <JWT>`                        |
| `X-User-ID`     | 게이트웨이가 JWT에서 추출한 유저 ID   |
| `X-User-Role`   | 게이트웨이가 JWT에서 추출한 유저 역할 |

### 권한 (AuthPermission)

| 권한   | 허용 HTTP 메서드         | 설명                  |
| ------ | ------------------------ | --------------------- |
| `READ` | GET, HEAD                | 조회 권한             |
| `EDIT` | POST, PUT, PATCH, DELETE | 쓰기 권한 (READ 포함) |

> `EDIT` 권한을 가진 유저는 자동으로 `READ`도 가능하다.

### 요청 헤더 예시

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

### 인증 실패 응답

```json
// 401 - 토큰 없음
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authorization header is required",
    "timestamp": "2026-04-07T12:00:00"
  }
}

// 401 - 유효하지 않은 토큰
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token",
    "timestamp": "2026-04-07T12:00:00"
  }
}

// 403 - 권한 부족
{
  "error": {
    "code": "FORBIDDEN",
    "message": "EDIT permission is required",
    "timestamp": "2026-04-07T12:00:00"
  }
}
```

---

## 2. 공통 에러 형식

모든 에러는 동일한 형식으로 반환된다. `details`는 유효성 검증 에러 시에만 포함된다.

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 설명",
    "details": {},
    "timestamp": "2026-04-07T12:34:56"
  }
}
```

| 필드              | 타입             | 설명                                                    |
| ----------------- | ---------------- | ------------------------------------------------------- |
| `error.code`      | `string`         | 에러 코드 (`VALIDATION_ERROR`, `RESOURCE_NOT_FOUND` 등) |
| `error.message`   | `string`         | 사람이 읽을 수 있는 에러 메시지                         |
| `error.details`   | `object \| null` | 필드별 상세 에러 (유효성 검증 실패 시)                  |
| `error.timestamp` | `string`         | ISO 8601 형식 타임스탬프                                |

---

## 3. TypeScript 타입 정의

프론트엔드에서 바로 사용할 수 있는 타입 정의:

```typescript
// ============================================================
// 공통
// ============================================================

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    timestamp: string; // ISO 8601
  };
}

interface PageableResponse {
  pageNumber: number;
  pageSize: number;
}

// ============================================================
// 로드맵
// ============================================================

interface RoadmapOwnerResponse {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}

interface RoadmapStatsResponse {
  totalNodes: number;
  totalEdges: number;
  forkCount: number;
}

/** POST /roadmaps 요청 바디 */
interface CreateRoadmapRequest {
  title: string; // 필수
  description?: string;
  directoryId?: number;
  isPublic?: boolean;
  thumbnailUrl?: string;
  tags?: string[];
}

/** POST /roadmaps 응답 */
interface RoadmapResponse {
  id: number;
  title: string;
  description: string | null;
  directoryId: number | null;
  ownerId: number;
  isPublic: boolean;
  viewCount: number;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

/** PATCH /roadmaps/:id 요청 바디 */
interface UpdateRoadmapRequest {
  title?: string; // 빈 문자열 불가 (min=1)
  description?: string;
  isPublic?: boolean;
  thumbnailUrl?: string;
  tags?: string[];
}

/** PATCH /roadmaps/:id 응답 */
interface RoadmapUpdateResponse {
  id: number;
  updatedAt: string; // ISO 8601
}

/** DELETE /roadmaps/:id 응답 */
interface RoadmapDeleteResponse {
  message: string;
}

/** GET /roadmaps/:id 상세 응답 */
interface RoadmapDetailResponse {
  id: number;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  isPublic: boolean;
  viewCount: number;
  owner: RoadmapOwnerResponse;
  stats: RoadmapStatsResponse;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

/** GET /roadmaps 목록 아이템 */
interface RoadmapListItemResponse {
  id: number;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  isPublic: boolean;
  viewCount: number;
  forkCount: number;
  tags: string[];
  owner: RoadmapOwnerResponse;
  createdAt: string;
  updatedAt: string;
}

/** GET /roadmaps 목록 응답 */
interface RoadmapListResponse {
  content: RoadmapListItemResponse[];
  pageable: PageableResponse;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

/** GET /roadmaps/:id/fork-tree 포크 트리 응답 (재귀) */
interface RoadmapForkTreeResponse {
  id: number;
  title: string;
  ownerId: number;
  ownerName: string;
  forkCount: number;
  children: RoadmapForkTreeResponse[];
}

/** GET /roadmaps/:id/fork-status 포크 상태 응답 */
interface RoadmapForkStatusResponse {
  roadmapId: number;
  forkCount: number;
  isForkedByCurrentUser: boolean;
  originalRoadmapId: number | null;
  originalRoadmapTitle: string | null;
}

/** 로드맵 요약 (디렉토리 트리 내 사용) */
interface RoadmapSummaryResponse {
  id: number;
  title: string;
  thumbnailUrl: string | null;
  isPublic: boolean;
  updatedAt: string;
}

// ============================================================
// 진행률
// ============================================================

/** GET /roadmaps/:id/my-progress 응답 */
interface ProgressResponse {
  roadmapId: number;
  totalNodes: number;
  completedNodes: number;
  progressPercentage: number; // 소수점 (예: 66.67)
  completedNodeIds: number[];
  updatedAt: string;
}

/** POST /roadmaps/:id/nodes/:nodeId/complete 요청 바디 */
interface CompleteNodeRequest {
  isCompleted?: boolean;
  link?: string;
}

/** POST /roadmaps/:id/nodes/:nodeId/complete 응답 */
interface NodeCompleteResponse {
  nodeId: number;
  isCompleted: boolean;
  roadmapProgress: number; // 소수점 (예: 75.00)
  completedAt: string | null;
}

// ============================================================
// 디렉토리
// ============================================================

/** POST /directories 요청 바디 */
interface CreateDirectoryRequest {
  name: string; // 필수
  parentId?: number;
}

/** PATCH /directories/:id 요청 바디 */
interface UpdateDirectoryRequest {
  name: string; // 필수
}

/** POST /directories, PATCH /directories/:id 응답 */
interface DirectoryResponse {
  id: number;
  name: string;
  parentId: number | null;
  path: string; // 예: "프론트엔드/React"
  createdAt: string;
}

/** GET /directories/tree 응답 (재귀) */
interface DirectoryTreeResponse {
  id: number;
  name: string;
  path: string;
  children: DirectoryTreeResponse[];
  roadmaps: RoadmapSummaryResponse[];
}
```

---

## 4. 로드맵 API

### 4.1 POST /roadmaps

새 로드맵을 생성한다.

| 항목             | 값                 |
| ---------------- | ------------------ |
| **메서드**       | `POST`             |
| **URL**          | `/roadmaps`        |
| **권한**         | `EDIT` 필요        |
| **Content-Type** | `application/json` |
| **성공 상태**    | `201 Created`      |

#### 요청 바디

| 필드           | 타입       | 필수 | 설명                         |
| -------------- | ---------- | ---- | ---------------------------- |
| `title`        | `string`   | O    | 로드맵 제목 (빈 문자열 불가) |
| `description`  | `string`   | X    | 로드맵 설명                  |
| `directoryId`  | `number`   | X    | 소속 디렉토리 ID             |
| `isPublic`     | `boolean`  | X    | 공개 여부                    |
| `thumbnailUrl` | `string`   | X    | 썸네일 이미지 URL            |
| `tags`         | `string[]` | X    | 태그 목록                    |

#### 요청 예시

```json
{
  "title": "프론트엔드 개발 로드맵",
  "description": "React, TypeScript 기반 프론트엔드 학습 경로",
  "directoryId": 1,
  "isPublic": true,
  "thumbnailUrl": "https://example.com/thumb.png",
  "tags": ["react", "typescript", "frontend"]
}
```

#### 성공 응답 (201)

```json
{
  "id": 42,
  "title": "프론트엔드 개발 로드맵",
  "description": "React, TypeScript 기반 프론트엔드 학습 경로",
  "directoryId": 1,
  "ownerId": 7,
  "isPublic": true,
  "viewCount": 0,
  "createdAt": "2026-04-07T14:30:00",
  "updatedAt": "2026-04-07T14:30:00"
}
```

#### 에러 응답

| 상태 | 코드               | 원인                |
| ---- | ------------------ | ------------------- |
| 400  | `VALIDATION_ERROR` | `title`이 비어있음  |
| 401  | `UNAUTHORIZED`     | 인증 토큰 없음/만료 |
| 403  | `FORBIDDEN`        | EDIT 권한 없음      |

```json
// 400 - 유효성 검증 실패
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력값 검증 실패",
    "details": {
      "title": "title is required"
    },
    "timestamp": "2026-04-07T14:30:00"
  }
}
```

---

### 4.2 GET /roadmaps

로드맵 목록을 페이지네이션으로 조회한다. 검색, 필터링, 정렬을 지원한다.

| 항목          | 값          |
| ------------- | ----------- |
| **메서드**    | `GET`       |
| **URL**       | `/roadmaps` |
| **권한**      | `READ` 필요 |
| **성공 상태** | `200 OK`    |

#### 쿼리 파라미터

| 파라미터      | 타입       | 기본값   | 설명                                                              |
| ------------- | ---------- | -------- | ----------------------------------------------------------------- |
| `page`        | `number`   | `0`      | 페이지 번호 (0부터 시작)                                          |
| `size`        | `number`   | `10`     | 페이지 크기 (최대 50)                                             |
| `sort`        | `string`   | `latest` | 정렬: `latest` \| `popular` \| `views` \| `forks` \| `completion` |
| `period`      | `string`   | -        | 기간 필터: `today` \| `week` \| `month` \| `year`                 |
| `query`       | `string`   | -        | 제목/설명 검색어                                                  |
| `userId`      | `number`   | -        | 특정 유저의 로드맵만                                              |
| `directoryId` | `number`   | -        | 특정 디렉토리의 로드맵만                                          |
| `isPublic`    | `boolean`  | -        | 공개 여부 필터                                                    |
| `tags`        | `string[]` | -        | 태그 필터 (복수 가능: `?tags=react&tags=typescript`)              |

#### 요청 예시

```
GET /roadmaps?page=0&size=10&sort=popular&period=month&query=React&tags=frontend&tags=react
```

#### 성공 응답 (200)

```json
{
  "content": [
    {
      "id": 42,
      "title": "프론트엔드 개발 로드맵",
      "description": "React, TypeScript 기반 프론트엔드 학습 경로",
      "thumbnailUrl": "https://example.com/thumb.png",
      "isPublic": true,
      "viewCount": 1520,
      "forkCount": 87,
      "tags": ["react", "typescript", "frontend"],
      "owner": {
        "id": 7,
        "nickname": "justn",
        "profileImageUrl": "https://example.com/avatar.png"
      },
      "createdAt": "2026-03-15T09:00:00",
      "updatedAt": "2026-04-07T12:00:00"
    },
    {
      "id": 55,
      "title": "백엔드 입문 로드맵",
      "description": "Spring Boot 기반 백엔드 학습",
      "thumbnailUrl": null,
      "isPublic": true,
      "viewCount": 340,
      "forkCount": 23,
      "tags": ["spring", "java", "backend"],
      "owner": {
        "id": 12,
        "nickname": "devkim",
        "profileImageUrl": null
      },
      "createdAt": "2026-03-20T10:00:00",
      "updatedAt": "2026-04-05T08:00:00"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10
  },
  "totalElements": 2,
  "totalPages": 1,
  "hasNext": false
}
```

#### 에러 응답

| 상태 | 코드           | 원인           |
| ---- | -------------- | -------------- |
| 401  | `UNAUTHORIZED` | 인증 실패      |
| 403  | `FORBIDDEN`    | READ 권한 없음 |

---

### 4.3 GET /roadmaps/:roadmapId

로드맵 상세 정보를 조회한다. 호출할 때마다 `viewCount`가 1 증가한다.

| 항목          | 값                      |
| ------------- | ----------------------- |
| **메서드**    | `GET`                   |
| **URL**       | `/roadmaps/{roadmapId}` |
| **권한**      | `READ` 필요             |
| **성공 상태** | `200 OK`                |

#### Path 파라미터

| 파라미터    | 타입     | 설명      |
| ----------- | -------- | --------- |
| `roadmapId` | `number` | 로드맵 ID |

#### 요청 예시

```
GET /roadmaps/42
```

#### 성공 응답 (200)

```json
{
  "id": 42,
  "title": "프론트엔드 개발 로드맵",
  "description": "React, TypeScript 기반 프론트엔드 학습 경로",
  "thumbnailUrl": "https://example.com/thumb.png",
  "isPublic": true,
  "viewCount": 1521,
  "owner": {
    "id": 7,
    "nickname": "justn",
    "profileImageUrl": "https://example.com/avatar.png"
  },
  "stats": {
    "totalNodes": 24,
    "totalEdges": 28,
    "forkCount": 87
  },
  "tags": ["react", "typescript", "frontend"],
  "createdAt": "2026-03-15T09:00:00",
  "updatedAt": "2026-04-07T12:00:00"
}
```

#### 에러 응답

| 상태 | 코드                 | 원인                   |
| ---- | -------------------- | ---------------------- |
| 401  | `UNAUTHORIZED`       | 인증 실패              |
| 403  | `FORBIDDEN`          | READ 권한 없음         |
| 404  | `RESOURCE_NOT_FOUND` | 로드맵이 존재하지 않음 |

```json
// 404
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Roadmap not found with id: 9999",
    "timestamp": "2026-04-07T14:30:00"
  }
}
```

---

### 4.4 PATCH /roadmaps/:roadmapId

로드맵 정보를 수정한다. 로드맵 소유자만 가능하다.

| 항목             | 값                      |
| ---------------- | ----------------------- |
| **메서드**       | `PATCH`                 |
| **URL**          | `/roadmaps/{roadmapId}` |
| **권한**         | `EDIT` 필요 + 소유자만  |
| **Content-Type** | `application/json`      |
| **성공 상태**    | `200 OK`                |

#### Path 파라미터

| 파라미터    | 타입     | 설명      |
| ----------- | -------- | --------- |
| `roadmapId` | `number` | 로드맵 ID |

#### 요청 바디

모든 필드가 선택적이다. 보낸 필드만 업데이트된다.

| 필드           | 타입       | 필수 | 설명                   |
| -------------- | ---------- | ---- | ---------------------- |
| `title`        | `string`   | X    | 로드맵 제목 (1자 이상) |
| `description`  | `string`   | X    | 로드맵 설명            |
| `isPublic`     | `boolean`  | X    | 공개 여부              |
| `thumbnailUrl` | `string`   | X    | 썸네일 URL             |
| `tags`         | `string[]` | X    | 태그 목록 (전체 교체)  |

#### 요청 예시

```json
{
  "title": "프론트엔드 개발 로드맵 (2026 업데이트)",
  "tags": ["react", "typescript", "nextjs", "frontend"]
}
```

#### 성공 응답 (200)

```json
{
  "id": 42,
  "updatedAt": "2026-04-07T15:00:00"
}
```

#### 에러 응답

| 상태 | 코드                 | 원인                              |
| ---- | -------------------- | --------------------------------- |
| 400  | `VALIDATION_ERROR`   | `title`이 빈 문자열               |
| 401  | `UNAUTHORIZED`       | 인증 실패                         |
| 403  | `FORBIDDEN`          | EDIT 권한 없음 또는 소유자가 아님 |
| 404  | `RESOURCE_NOT_FOUND` | 로드맵이 존재하지 않음            |

---

### 4.5 DELETE /roadmaps/:roadmapId

로드맵을 삭제한다. 로드맵 소유자만 가능하다.

| 항목          | 값                      |
| ------------- | ----------------------- |
| **메서드**    | `DELETE`                |
| **URL**       | `/roadmaps/{roadmapId}` |
| **권한**      | `EDIT` 필요 + 소유자만  |
| **성공 상태** | `200 OK`                |

#### Path 파라미터

| 파라미터    | 타입     | 설명      |
| ----------- | -------- | --------- |
| `roadmapId` | `number` | 로드맵 ID |

#### 요청 예시

```
DELETE /roadmaps/42
```

#### 성공 응답 (200)

```json
{
  "message": "Roadmap 42 deleted successfully"
}
```

#### 에러 응답

| 상태 | 코드                 | 원인                              |
| ---- | -------------------- | --------------------------------- |
| 401  | `UNAUTHORIZED`       | 인증 실패                         |
| 403  | `FORBIDDEN`          | EDIT 권한 없음 또는 소유자가 아님 |
| 404  | `RESOURCE_NOT_FOUND` | 로드맵이 존재하지 않음            |

---

### 4.6 POST /roadmaps/:roadmapId/fork

로드맵을 포크한다. 인증된 유저 소유의 복사본이 생성되며, 원본 로드맵의 `forkCount`가 1 증가한다.

| 항목          | 값                           |
| ------------- | ---------------------------- |
| **메서드**    | `POST`                       |
| **URL**       | `/roadmaps/{roadmapId}/fork` |
| **권한**      | `EDIT` 필요                  |
| **성공 상태** | `201 Created`                |

#### Path 파라미터

| 파라미터    | 타입     | 설명                  |
| ----------- | -------- | --------------------- |
| `roadmapId` | `number` | 포크할 원본 로드맵 ID |

#### 요청 예시

```
POST /roadmaps/42/fork
```

> 요청 바디 없음

#### 성공 응답 (201)

포크된 새 로드맵의 정보가 반환된다.

```json
{
  "id": 99,
  "title": "프론트엔드 개발 로드맵",
  "description": "React, TypeScript 기반 프론트엔드 학습 경로",
  "directoryId": null,
  "ownerId": 15,
  "isPublic": true,
  "viewCount": 0,
  "createdAt": "2026-04-07T16:00:00",
  "updatedAt": "2026-04-07T16:00:00"
}
```

#### 에러 응답

| 상태 | 코드                 | 원인                        |
| ---- | -------------------- | --------------------------- |
| 401  | `UNAUTHORIZED`       | 인증 실패                   |
| 403  | `FORBIDDEN`          | EDIT 권한 없음              |
| 404  | `RESOURCE_NOT_FOUND` | 원본 로드맵이 존재하지 않음 |

---

### 4.7 GET /roadmaps/popular

인기 로드맵을 조회한다. 포크 수 또는 조회 수 기준으로 정렬된다.

| 항목          | 값                  |
| ------------- | ------------------- |
| **메서드**    | `GET`               |
| **URL**       | `/roadmaps/popular` |
| **권한**      | `READ` 필요         |
| **성공 상태** | `200 OK`            |

#### 쿼리 파라미터

| 파라미터 | 타입     | 기본값  | 설명                          |
| -------- | -------- | ------- | ----------------------------- |
| `page`   | `number` | `0`     | 페이지 번호                   |
| `size`   | `number` | `10`    | 페이지 크기 (최대 50)         |
| `sortBy` | `string` | `forks` | 정렬 기준: `forks` \| `views` |

#### 요청 예시

```
GET /roadmaps/popular?page=0&size=5&sortBy=views
```

#### 성공 응답 (200)

`RoadmapListResponse`와 동일한 형식이다.

```json
{
  "content": [
    {
      "id": 42,
      "title": "프론트엔드 개발 로드맵",
      "description": "React, TypeScript 기반 프론트엔드 학습 경로",
      "thumbnailUrl": "https://example.com/thumb.png",
      "isPublic": true,
      "viewCount": 15200,
      "forkCount": 870,
      "tags": ["react", "typescript", "frontend"],
      "owner": {
        "id": 7,
        "nickname": "justn",
        "profileImageUrl": "https://example.com/avatar.png"
      },
      "createdAt": "2026-01-10T09:00:00",
      "updatedAt": "2026-04-07T12:00:00"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 5
  },
  "totalElements": 128,
  "totalPages": 26,
  "hasNext": true
}
```

#### 에러 응답

| 상태 | 코드           | 원인           |
| ---- | -------------- | -------------- |
| 401  | `UNAUTHORIZED` | 인증 실패      |
| 403  | `FORBIDDEN`    | READ 권한 없음 |

---

### 4.8 GET /roadmaps/:roadmapId/fork-tree

로드맵의 전체 포크 트리를 조회한다. 루트 로드맵부터 모든 하위 포크까지 재귀적으로 반환한다.

| 항목          | 값                                |
| ------------- | --------------------------------- |
| **메서드**    | `GET`                             |
| **URL**       | `/roadmaps/{roadmapId}/fork-tree` |
| **권한**      | `READ` 필요                       |
| **성공 상태** | `200 OK`                          |

#### Path 파라미터

| 파라미터    | 타입     | 설명      |
| ----------- | -------- | --------- |
| `roadmapId` | `number` | 로드맵 ID |

#### 요청 예시

```
GET /roadmaps/42/fork-tree
```

#### 성공 응답 (200)

```json
{
  "id": 42,
  "title": "프론트엔드 개발 로드맵",
  "ownerId": 7,
  "ownerName": "justn",
  "forkCount": 3,
  "children": [
    {
      "id": 99,
      "title": "프론트엔드 개발 로드맵",
      "ownerId": 15,
      "ownerName": "devkim",
      "forkCount": 1,
      "children": [
        {
          "id": 120,
          "title": "프론트엔드 개발 로드맵",
          "ownerId": 22,
          "ownerName": "parkdev",
          "forkCount": 0,
          "children": []
        }
      ]
    },
    {
      "id": 105,
      "title": "프론트엔드 개발 로드맵",
      "ownerId": 18,
      "ownerName": "leedev",
      "forkCount": 0,
      "children": []
    }
  ]
}
```

#### 에러 응답

| 상태 | 코드                 | 원인                   |
| ---- | -------------------- | ---------------------- |
| 401  | `UNAUTHORIZED`       | 인증 실패              |
| 404  | `RESOURCE_NOT_FOUND` | 로드맵이 존재하지 않음 |

---

### 4.9 GET /roadmaps/:roadmapId/fork-status

로드맵의 포크 상태를 조회한다. 포크 수, 현재 유저의 포크 여부, 원본 로드맵 정보를 반환한다.

| 항목          | 값                                  |
| ------------- | ----------------------------------- |
| **메서드**    | `GET`                               |
| **URL**       | `/roadmaps/{roadmapId}/fork-status` |
| **권한**      | `READ` 필요                         |
| **성공 상태** | `200 OK`                            |

#### Path 파라미터

| 파라미터    | 타입     | 설명      |
| ----------- | -------- | --------- |
| `roadmapId` | `number` | 로드맵 ID |

#### 요청 예시

```
GET /roadmaps/42/fork-status
```

#### 성공 응답 (200) - 원본 로드맵인 경우

```json
{
  "roadmapId": 42,
  "forkCount": 87,
  "isForkedByCurrentUser": false,
  "originalRoadmapId": null,
  "originalRoadmapTitle": null
}
```

#### 성공 응답 (200) - 포크된 로드맵인 경우

```json
{
  "roadmapId": 99,
  "forkCount": 3,
  "isForkedByCurrentUser": true,
  "originalRoadmapId": 42,
  "originalRoadmapTitle": "프론트엔드 개발 로드맵"
}
```

#### 에러 응답

| 상태 | 코드                 | 원인                   |
| ---- | -------------------- | ---------------------- |
| 401  | `UNAUTHORIZED`       | 인증 실패              |
| 404  | `RESOURCE_NOT_FOUND` | 로드맵이 존재하지 않음 |

> **UI 활용 팁**: `forkCount`를 이용해 "87명이 학습 중" 같은 표시가 가능하다. `isForkedByCurrentUser`로 "이미 포크됨" 버튼 상태를 제어할 수 있다.

---

## 5. 진행률 API

### 5.1 GET /roadmaps/:roadmapId/my-progress

현재 로그인한 유저의 로드맵 진행률을 조회한다.

| 항목          | 값                                  |
| ------------- | ----------------------------------- |
| **메서드**    | `GET`                               |
| **URL**       | `/roadmaps/{roadmapId}/my-progress` |
| **권한**      | `READ` 필요                         |
| **성공 상태** | `200 OK`                            |

#### Path 파라미터

| 파라미터    | 타입     | 설명      |
| ----------- | -------- | --------- |
| `roadmapId` | `number` | 로드맵 ID |

#### 요청 예시

```
GET /roadmaps/42/my-progress
```

#### 성공 응답 (200)

```json
{
  "roadmapId": 42,
  "totalNodes": 24,
  "completedNodes": 16,
  "progressPercentage": 66.67,
  "completedNodeIds": [1, 2, 3, 5, 7, 8, 10, 11, 12, 14, 15, 16, 18, 19, 20, 22],
  "updatedAt": "2026-04-07T10:30:00"
}
```

#### 성공 응답 (200) - 진행 기록이 없는 경우

```json
{
  "roadmapId": 42,
  "totalNodes": 24,
  "completedNodes": 0,
  "progressPercentage": 0.0,
  "completedNodeIds": [],
  "updatedAt": null
}
```

#### 에러 응답

| 상태 | 코드                 | 원인                   |
| ---- | -------------------- | ---------------------- |
| 401  | `UNAUTHORIZED`       | 인증 실패              |
| 404  | `RESOURCE_NOT_FOUND` | 로드맵이 존재하지 않음 |

---

### 5.2 GET /roadmaps/:roadmapId/users/:userId/progress

특정 유저의 로드맵 진행률을 조회한다. 로드맵 소유자만 다른 유저의 진행률을 볼 수 있다.

| 항목          | 값                                              |
| ------------- | ----------------------------------------------- |
| **메서드**    | `GET`                                           |
| **URL**       | `/roadmaps/{roadmapId}/users/{userId}/progress` |
| **권한**      | `READ` 필요 + 로드맵 소유자만                   |
| **성공 상태** | `200 OK`                                        |

#### Path 파라미터

| 파라미터    | 타입     | 설명           |
| ----------- | -------- | -------------- |
| `roadmapId` | `number` | 로드맵 ID      |
| `userId`    | `number` | 조회할 유저 ID |

#### 요청 예시

```
GET /roadmaps/42/users/15/progress
```

#### 성공 응답 (200)

```json
{
  "roadmapId": 42,
  "totalNodes": 24,
  "completedNodes": 8,
  "progressPercentage": 33.33,
  "completedNodeIds": [1, 2, 3, 5, 7, 8, 10, 11],
  "updatedAt": "2026-04-06T18:00:00"
}
```

#### 에러 응답

| 상태 | 코드                 | 원인                             |
| ---- | -------------------- | -------------------------------- |
| 401  | `UNAUTHORIZED`       | 인증 실패                        |
| 403  | `FORBIDDEN`          | 로드맵 소유자가 아님             |
| 404  | `RESOURCE_NOT_FOUND` | 로드맵 또는 유저가 존재하지 않음 |

---

### 5.3 POST /roadmaps/:roadmapId/nodes/:nodeId/complete

노드의 완료 상태를 토글한다. 완료/미완료 상태를 전환하며, 전체 로드맵 진행률을 재계산하여 반환한다.

| 항목             | 값                                              |
| ---------------- | ----------------------------------------------- |
| **메서드**       | `POST`                                          |
| **URL**          | `/roadmaps/{roadmapId}/nodes/{nodeId}/complete` |
| **권한**         | `EDIT` 필요                                     |
| **Content-Type** | `application/json`                              |
| **성공 상태**    | `200 OK`                                        |

#### Path 파라미터

| 파라미터    | 타입     | 설명      |
| ----------- | -------- | --------- |
| `roadmapId` | `number` | 로드맵 ID |
| `nodeId`    | `number` | 노드 ID   |

#### 요청 바디

| 필드          | 타입      | 필수 | 설명                                          |
| ------------- | --------- | ---- | --------------------------------------------- |
| `isCompleted` | `boolean` | X    | `true`면 완료, `false`면 미완료. 생략 시 토글 |
| `link`        | `string`  | X    | 학습 근거 링크 (블로그 포스트, 노트 등)       |

#### 요청 예시 - 완료 처리

```json
{
  "isCompleted": true,
  "link": "https://myblog.com/react-hooks-study"
}
```

#### 요청 예시 - 미완료로 되돌리기

```json
{
  "isCompleted": false
}
```

#### 성공 응답 (200)

```json
{
  "nodeId": 13,
  "isCompleted": true,
  "roadmapProgress": 70.83,
  "completedAt": "2026-04-07T16:30:00"
}
```

#### 성공 응답 (200) - 미완료로 변경 시

```json
{
  "nodeId": 13,
  "isCompleted": false,
  "roadmapProgress": 66.67,
  "completedAt": null
}
```

#### 에러 응답

| 상태 | 코드                 | 원인                             |
| ---- | -------------------- | -------------------------------- |
| 401  | `UNAUTHORIZED`       | 인증 실패                        |
| 403  | `FORBIDDEN`          | EDIT 권한 없음                   |
| 404  | `RESOURCE_NOT_FOUND` | 로드맵 또는 노드가 존재하지 않음 |

---

## 6. 디렉토리 API

### 6.1 GET /directories/tree

현재 유저의 전체 디렉토리 트리를 조회한다. 각 디렉토리에 속한 로드맵 요약 정보도 함께 반환한다.

| 항목          | 값                  |
| ------------- | ------------------- |
| **메서드**    | `GET`               |
| **URL**       | `/directories/tree` |
| **권한**      | `READ` 필요         |
| **성공 상태** | `200 OK`            |

#### 요청 예시

```
GET /directories/tree
```

#### 성공 응답 (200)

최상위 디렉토리 배열이 반환된다. 각 디렉토리는 하위 디렉토리와 소속 로드맵을 포함한다.

```json
[
  {
    "id": 1,
    "name": "프론트엔드",
    "path": "프론트엔드",
    "children": [
      {
        "id": 3,
        "name": "React",
        "path": "프론트엔드/React",
        "children": [],
        "roadmaps": [
          {
            "id": 42,
            "title": "프론트엔드 개발 로드맵",
            "thumbnailUrl": "https://example.com/thumb.png",
            "isPublic": true,
            "updatedAt": "2026-04-07T12:00:00"
          }
        ]
      },
      {
        "id": 4,
        "name": "Vue",
        "path": "프론트엔드/Vue",
        "children": [],
        "roadmaps": []
      }
    ],
    "roadmaps": []
  },
  {
    "id": 2,
    "name": "백엔드",
    "path": "백엔드",
    "children": [],
    "roadmaps": [
      {
        "id": 55,
        "title": "백엔드 입문 로드맵",
        "thumbnailUrl": null,
        "isPublic": true,
        "updatedAt": "2026-04-05T08:00:00"
      }
    ]
  }
]
```

#### 에러 응답

| 상태 | 코드           | 원인      |
| ---- | -------------- | --------- |
| 401  | `UNAUTHORIZED` | 인증 실패 |

---

### 6.2 POST /directories

새 디렉토리를 생성한다.

| 항목             | 값                 |
| ---------------- | ------------------ |
| **메서드**       | `POST`             |
| **URL**          | `/directories`     |
| **권한**         | `EDIT` 필요        |
| **Content-Type** | `application/json` |
| **성공 상태**    | `201 Created`      |

#### 요청 바디

| 필드       | 타입     | 필수 | 설명                                    |
| ---------- | -------- | ---- | --------------------------------------- |
| `name`     | `string` | O    | 디렉토리 이름 (빈 문자열 불가)          |
| `parentId` | `number` | X    | 부모 디렉토리 ID. 생략 시 최상위에 생성 |

#### 요청 예시 - 최상위 디렉토리

```json
{
  "name": "DevOps"
}
```

#### 요청 예시 - 하위 디렉토리

```json
{
  "name": "Docker",
  "parentId": 5
}
```

#### 성공 응답 (201)

```json
{
  "id": 6,
  "name": "Docker",
  "parentId": 5,
  "path": "DevOps/Docker",
  "createdAt": "2026-04-07T17:00:00"
}
```

#### 에러 응답

| 상태 | 코드                 | 원인                                  |
| ---- | -------------------- | ------------------------------------- |
| 400  | `VALIDATION_ERROR`   | `name`이 비어있음                     |
| 401  | `UNAUTHORIZED`       | 인증 실패                             |
| 403  | `FORBIDDEN`          | EDIT 권한 없음                        |
| 404  | `RESOURCE_NOT_FOUND` | `parentId`에 해당하는 디렉토리가 없음 |

```json
// 400
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력값 검증 실패",
    "details": {
      "name": "name is required"
    },
    "timestamp": "2026-04-07T17:00:00"
  }
}
```

---

### 6.3 PATCH /directories/:directoryId

디렉토리 이름을 수정한다. 소유자만 가능하다.

| 항목             | 값                           |
| ---------------- | ---------------------------- |
| **메서드**       | `PATCH`                      |
| **URL**          | `/directories/{directoryId}` |
| **권한**         | `EDIT` 필요 + 소유자만       |
| **Content-Type** | `application/json`           |
| **성공 상태**    | `200 OK`                     |

#### Path 파라미터

| 파라미터      | 타입     | 설명        |
| ------------- | -------- | ----------- |
| `directoryId` | `number` | 디렉토리 ID |

#### 요청 바디

| 필드   | 타입     | 필수 | 설명                              |
| ------ | -------- | ---- | --------------------------------- |
| `name` | `string` | O    | 새 디렉토리 이름 (빈 문자열 불가) |

#### 요청 예시

```json
{
  "name": "Docker & K8s"
}
```

#### 성공 응답 (200)

```json
{
  "id": 6,
  "name": "Docker & K8s",
  "parentId": 5,
  "path": "DevOps/Docker & K8s",
  "createdAt": "2026-04-07T17:00:00"
}
```

#### 에러 응답

| 상태 | 코드                 | 원인                              |
| ---- | -------------------- | --------------------------------- |
| 400  | `VALIDATION_ERROR`   | `name`이 비어있음                 |
| 401  | `UNAUTHORIZED`       | 인증 실패                         |
| 403  | `FORBIDDEN`          | EDIT 권한 없음 또는 소유자가 아님 |
| 404  | `RESOURCE_NOT_FOUND` | 디렉토리가 존재하지 않음          |

---

### 6.4 DELETE /directories/:directoryId

디렉토리를 삭제한다. 소유자만 가능하다.

| 항목          | 값                           |
| ------------- | ---------------------------- |
| **메서드**    | `DELETE`                     |
| **URL**       | `/directories/{directoryId}` |
| **권한**      | `EDIT` 필요 + 소유자만       |
| **성공 상태** | `200 OK`                     |

#### Path 파라미터

| 파라미터      | 타입     | 설명        |
| ------------- | -------- | ----------- |
| `directoryId` | `number` | 디렉토리 ID |

#### 쿼리 파라미터

| 파라미터            | 타입     | 기본값 | 설명                                            |
| ------------------- | -------- | ------ | ----------------------------------------------- |
| `mode`              | `string` | -      | 삭제 모드: `move` \| `delete`                   |
| `targetDirectoryId` | `number` | -      | `move` 모드 시 로드맵을 이동할 대상 디렉토리 ID |

#### mode 설명

| 모드     | 동작                                                                        |
| -------- | --------------------------------------------------------------------------- |
| `move`   | 디렉토리 내 로드맵을 부모 디렉토리(또는 `targetDirectoryId`)로 이동 후 삭제 |
| `delete` | 디렉토리 내 모든 로드맵과 함께 삭제                                         |
| 미지정   | 기본 동작 (서버 구현에 따름)                                                |

#### 요청 예시 - 로드맵을 부모로 이동 후 삭제

```
DELETE /directories/6?mode=move
```

#### 요청 예시 - 로드맵과 함께 삭제

```
DELETE /directories/6?mode=delete
```

#### 요청 예시 - 특정 디렉토리로 이동 후 삭제

```
DELETE /directories/6?mode=move&targetDirectoryId=2
```

#### 성공 응답 (200)

```json
{
  "message": "Directory deleted successfully"
}
```

#### 에러 응답

| 상태 | 코드                 | 원인                              |
| ---- | -------------------- | --------------------------------- |
| 401  | `UNAUTHORIZED`       | 인증 실패                         |
| 403  | `FORBIDDEN`          | EDIT 권한 없음 또는 소유자가 아님 |
| 404  | `RESOURCE_NOT_FOUND` | 디렉토리가 존재하지 않음          |

---

## 7. 에러 코드 레퍼런스

| HTTP 상태 | 에러 코드            | 설명                                                       |
| --------- | -------------------- | ---------------------------------------------------------- |
| 400       | `VALIDATION_ERROR`   | 요청 바디 유효성 검증 실패. `details`에 필드별 메시지 포함 |
| 400       | `BAD_REQUEST`        | 잘못된 요청 파라미터                                       |
| 401       | `UNAUTHORIZED`       | 인증 토큰 없음, 형식 오류, 만료                            |
| 403       | `FORBIDDEN`          | 권한 부족 (READ/EDIT) 또는 리소스 소유자가 아님            |
| 404       | `RESOURCE_NOT_FOUND` | 요청한 리소스가 존재하지 않음                              |
| 500       | `INTERNAL_ERROR`     | 서버 내부 오류                                             |

### VALIDATION_ERROR 상세 예시

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력값 검증 실패",
    "details": {
      "title": "title is required",
      "name": "name is required"
    },
    "timestamp": "2026-04-07T12:34:56"
  }
}
```

### 공통 에러 시나리오

#### 인증 관련

| 시나리오                           | HTTP 상태 | 에러 코드      | 메시지                               |
| ---------------------------------- | --------- | -------------- | ------------------------------------ |
| Authorization 헤더 없음            | 401       | `UNAUTHORIZED` | `Authorization header is required`   |
| Bearer 접두사 없음                 | 401       | `UNAUTHORIZED` | `Authorization must be Bearer token` |
| 토큰이 빈 문자열                   | 401       | `UNAUTHORIZED` | `Bearer token is empty`              |
| 토큰 만료/변조                     | 401       | `UNAUTHORIZED` | `Invalid or expired token`           |
| POST/PATCH/DELETE에 EDIT 권한 없음 | 403       | `FORBIDDEN`    | `EDIT permission is required`        |
| GET/HEAD에 READ 권한 없음          | 403       | `FORBIDDEN`    | `READ permission is required`        |

#### 리소스 관련

| 시나리오               | HTTP 상태 | 에러 코드            | 메시지 예시                         |
| ---------------------- | --------- | -------------------- | ----------------------------------- |
| 존재하지 않는 로드맵   | 404       | `RESOURCE_NOT_FOUND` | `Roadmap not found with id: 9999`   |
| 존재하지 않는 디렉토리 | 404       | `RESOURCE_NOT_FOUND` | `Directory not found with id: 9999` |
| 존재하지 않는 노드     | 404       | `RESOURCE_NOT_FOUND` | `Node not found with id: 9999`      |

---

## 부록: 엔티티 관계도

```
User (1) ──── (*) Roadmap
                  │
                  ├── originalRoadmapId → Roadmap (포크 원본)
                  ├── directoryId → Directory
                  │
                  ├── (1) ──── (*) RoadmapNode
                  │                    │
                  │                    └── (*) RoadmapNodeProgress
                  │                              │
                  │                              └── userId → User
                  │
                  └── tags (쉼표 구분 문자열, API에서는 string[]로 변환)

User (1) ──── (*) Directory
                  │
                  └── parentId → Directory (자기 참조, 트리 구조)
```

### 주요 엔티티 필드 요약

| 엔티티                  | 주요 필드                                                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Roadmap**             | `id`, `title`, `description`, `directoryId`, `ownerId`, `thumbnailUrl`, `isPublic`, `viewCount`, `forkCount`, `originalRoadmapId`, `tags`, `createdAt`, `updatedAt` |
| **RoadmapNode**         | `id`, `roadmapId`, `label`, `createdAt`, `updatedAt`                                                                                                                |
| **RoadmapNodeProgress** | `id`, `roadmapId`, `nodeId`, `userId`, `isCompleted`, `completedAt` / UNIQUE(`roadmapId`, `nodeId`, `userId`)                                                       |
| **Directory**           | `id`, `name`, `parentId`, `ownerId`, `createdAt`, `updatedAt`                                                                                                       |
| **User**                | `id`, `nickname`, `email`, `profileImageUrl`, `createdAt`, `updatedAt`                                                                                              |
