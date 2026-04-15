# Node Service API 명세서

> **대상**: 프론트엔드 개발자  
> **서비스**: jagalchi-server-node (Spring Boot 4)  
> **포트**: 8082  
> **역할**: 실시간 협업 로드맵 캔버스 에디터  
> **프로토콜**: WebSocket/STOMP + REST

---

## 목차

1. [개요](#1-개요)
2. [인증](#2-인증)
3. [WebSocket 연결](#3-websocket-연결)
4. [STOMP 프로토콜](#4-stomp-프로토콜)
5. [REST API](#5-rest-api)
6. [Action 상세](#6-action-상세)
7. [커서 추적](#7-커서-추적)
8. [도메인 모델](#8-도메인-모델)
9. [Enum 정의](#9-enum-정의)
10. [에러 코드](#10-에러-코드)
11. [권한 체계](#11-권한-체계)
12. [프론트엔드 통합 가이드](#12-프론트엔드-통합-가이드)

---

## 1. 개요

Node Service는 로드맵 캔버스의 실시간 협업 편집을 담당한다. 모든 상태 변경은 WebSocket/STOMP를 통해 이루어지며, REST API는 재연결 시 놓친 이벤트 복구용으로만 사용한다.

### 메시지 흐름

```
클라이언트                         서버                          다른 클라이언트
   │                              │                              │
   │── STOMP CONNECT ────────────>│                              │
   │   (X-User-ID, X-User-Role)  │                              │
   │                              │                              │
   │── SUBSCRIBE ────────────────>│                              │
   │   /topic/roadmap/{id}/state  │                              │
   │                              │                              │
   │<──── SNAPSHOT ───────────────│  (초기 전체 상태)             │
   │   /user/queue/snapshot       │                              │
   │                              │                              │
   │── SEND (Action) ───────────>│                              │
   │   /app/roadmap/{id}/action   │                              │
   │                              │                              │
   │<──── ACK ────────────────────│  (요청 수락)                 │
   │   /user/queue/ack            │                              │
   │                              │── EVENT broadcast ──────────>│
   │                              │   /topic/roadmap/{id}/state  │
   │<──── EVENT ──────────────────│  (상태 변경 브로드캐스트)     │
   │   /topic/roadmap/{id}/state  │                              │
```

---

## 2. 인증

API Gateway가 JWT를 검증한 후, 다음 헤더를 Node Service로 전달한다.

| 헤더            | 설명                                   | 필수 |
| --------------- | -------------------------------------- | ---- |
| `X-User-ID`     | 사용자 ID (숫자)                       | O    |
| `X-User-Role`   | 사용자 역할 (`ADMIN`, `USER`, `GUEST`) | O    |
| `X-Roadmap-ID`  | 로드맵 ID                              | -    |
| `X-Permissions` | 추가 권한 정보                         | -    |

### Role 매핑 (User Service -> Node Service)

| User Service Role | Node Service Role | 설명           |
| ----------------- | ----------------- | -------------- |
| `TEACHER`         | `ADMIN`           | 전체 편집 권한 |
| `ADMIN`           | `ADMIN`           | 전체 편집 권한 |
| `STUDENT`         | `USER`            | 읽기 + 쓰기    |
| `GUEST`           | `GUEST`           | 읽기 전용      |

---

## 3. WebSocket 연결

### 엔드포인트

| 엔드포인트                       | 프로토콜           | 설명                    |
| -------------------------------- | ------------------ | ----------------------- |
| `ws://localhost:8082/ws/roadmap` | WebSocket + SockJS | SockJS 폴백 지원 (권장) |

> SockJS 폴백이 포함되어 있으므로, 브라우저 호환성을 위해 SockJS 클라이언트 사용을 권장한다.

### STOMP Broker 설정

| 설정                    | 값                          | 설명                               |
| ----------------------- | --------------------------- | ---------------------------------- |
| Application prefix      | `/app`                      | 클라이언트 -> 서버 메시지의 prefix |
| Broker prefix           | `/topic`, `/queue`, `/user` | 서버 -> 클라이언트 구독 prefix     |
| User destination prefix | `/user`                     | 개인 메시지 prefix                 |

### 연결 순서

```
1. SockJS/WebSocket으로 /ws/roadmap 연결
2. STOMP CONNECT 프레임 전송 (인증 헤더 포함)
3. /topic/roadmap/{roadmapId}/state 구독
4. /user/queue/snapshot 구독 (스냅샷 수신용)
5. /user/queue/ack 구독
6. /user/queue/nack 구독
7. /topic/roadmap/{roadmapId}/cursors 구독 (커서 추적)
8. /topic/roadmap/{roadmapId}/cursors/hide 구독 (커서 숨김)
```

---

## 4. STOMP 프로토콜

### 4.1 구독 (Server -> Client)

#### `/topic/roadmap/{roadmapId}/state` - 상태 변경 이벤트

모든 사용자의 액션 결과가 브로드캐스트된다. 자기 자신의 액션 결과도 포함.

```json
{
  "type": "EVENT",
  "eventId": "evt-301",
  "sequence": 43,
  "payload": {
    "type": "MOVE",
    "target": {
      "type": "NODE",
      "object": "node-1"
    },
    "state": {
      "x": 300,
      "y": 200
    }
  }
}
```

| 필드       | 타입     | 설명                                 |
| ---------- | -------- | ------------------------------------ |
| `type`     | `string` | 항상 `"EVENT"`                       |
| `eventId`  | `string` | 이벤트 고유 ID (서버 생성)           |
| `sequence` | `number` | 순서 번호 (단조 증가, 재연결 복구용) |
| `payload`  | `object` | 확정된 상태 변경 내용                |

#### `/user/queue/snapshot` - 초기 스냅샷

`/topic/roadmap/{roadmapId}/state`를 구독하면 자동으로 수신된다.

```json
{
  "type": "SNAPSHOT",
  "version": 42,
  "roadmapId": "123",
  "nodes": [
    {
      "id": 1,
      "label": "JavaScript 기초",
      "x": 100.0,
      "y": 200.0,
      "width": 200.0,
      "height": 100.0,
      "data": { "difficulty": "easy" },
      "locked": false,
      "learningState": "NOT_STARTED"
    }
  ],
  "edges": [
    {
      "id": 1,
      "fromNodeId": 1,
      "toNodeId": 2,
      "style": "straight",
      "strokeColor": "#000000",
      "strokeWidth": 2.0,
      "labelText": "",
      "arrowType": "single",
      "isDirectional": true,
      "animationType": "none"
    }
  ],
  "sections": [
    {
      "id": 1,
      "name": "Frontend",
      "x": 0.0,
      "y": 0.0,
      "width": 500.0,
      "height": 400.0,
      "color": "#E3F2FD",
      "description": "프론트엔드 학습 영역"
    }
  ],
  "orphanNodeIds": [5, 8]
}
```

| 필드            | 타입       | 설명                                  |
| --------------- | ---------- | ------------------------------------- |
| `type`          | `string`   | 항상 `"SNAPSHOT"`                     |
| `version`       | `number`   | 현재 상태 버전 (sequence와 동일 개념) |
| `roadmapId`     | `string`   | 로드맵 ID                             |
| `nodes`         | `array`    | 전체 노드 목록                        |
| `edges`         | `array`    | 전체 엣지 목록                        |
| `sections`      | `array`    | 전체 섹션 목록                        |
| `orphanNodeIds` | `number[]` | 간선이 없는 고아 노드 ID 목록         |

#### `/user/queue/ack` - 액션 수락 응답

본인이 보낸 액션이 정상 처리되었을 때 수신.

```json
{
  "type": "ACK",
  "actionId": "act-401",
  "status": "ACCEPTED"
}
```

| 필드       | 타입     | 설명                    |
| ---------- | -------- | ----------------------- |
| `type`     | `string` | 항상 `"ACK"`            |
| `actionId` | `string` | 요청 시 보낸 `actionId` |
| `status`   | `string` | `"ACCEPTED"`            |

#### `/user/queue/nack` - 액션 거부 응답

본인이 보낸 액션이 거부되었을 때 수신.

```json
{
  "actionId": "act-401",
  "actionType": "CREATE",
  "errorCode": "NODE_001",
  "errorMessage": "위치 정보는 필수입니다."
}
```

| 필드           | 타입     | 설명                                           |
| -------------- | -------- | ---------------------------------------------- |
| `actionId`     | `string` | 요청 시 보낸 `actionId`                        |
| `actionType`   | `string` | 요청한 액션 타입                               |
| `errorCode`    | `string` | 에러 코드 ([에러 코드 표](#10-에러-코드) 참고) |
| `errorMessage` | `string` | 에러 메시지 (한국어)                           |

#### `/topic/roadmap/{roadmapId}/cursors` - 커서 위치 업데이트

다른 사용자의 커서 위치가 브로드캐스트된다.

```json
{
  "userId": 1,
  "userName": "Kim",
  "x": 500.0,
  "y": 300.0,
  "timestamp": 1234567890000,
  "state": "NORMAL",
  "targetId": null
}
```

#### `/topic/roadmap/{roadmapId}/cursors/hide` - 커서 숨김

사용자가 로드맵을 떠났을 때 브로드캐스트된다.

```json
{
  "userId": 1,
  "timestamp": 1234567890000
}
```

---

### 4.2 전송 (Client -> Server)

#### `/app/roadmap/{roadmapId}/action` - 로드맵 액션 실행

캔버스의 모든 상태 변경(노드/엣지/섹션/텍스트/자료의 생성/수정/삭제, 되돌리기/다시실행)은 이 단일 엔드포인트를 통한다.

**요청 (Action)**

```json
{
  "actionId": "uuid-v4-string",
  "roadmap": "123",
  "action": "CREATE",
  "payload": {
    "type": "INFO",
    "target": {
      "type": "NODE",
      "object": "existing-node-id",
      "tempId": "client-generated-temp-id",
      "nodeId": null
    },
    "prev": null,
    "next": null,
    "data": {
      "label": "새 노드",
      "x": 100.0,
      "y": 200.0
    }
  }
}
```

| 필드       | 타입            | 필수 | 설명                                             |
| ---------- | --------------- | ---- | ------------------------------------------------ |
| `actionId` | `string`        | O    | 클라이언트가 생성하는 UUID. ACK/NACK 매칭에 사용 |
| `roadmap`  | `string`        | O    | 로드맵 ID                                        |
| `action`   | `ActionType`    | O    | `CREATE`, `EDIT`, `DELETE`, `UNDO`, `REDO`       |
| `payload`  | `ActionPayload` | -    | `UNDO`/`REDO`일 때 null 가능                     |

**ActionPayload**

| 필드     | 타입           | 설명                                                   |
| -------- | -------------- | ------------------------------------------------------ |
| `type`   | `string`       | 페이로드 타입: `INFO`, `MOVE`, `SCALE`, `LOCK`, `COPY` |
| `target` | `ActionTarget` | 대상 객체 정보                                         |
| `prev`   | `ActionState`  | 이전 상태 (EDIT 시 클라이언트 참조용)                  |
| `next`   | `ActionState`  | 다음 상태 (EDIT 시 서버가 적용할 상태)                 |
| `data`   | `ActionData`   | 생성 데이터 (CREATE 시 사용)                           |

**ActionTarget**

| 필드     | 타입         | 설명                                                   |
| -------- | ------------ | ------------------------------------------------------ |
| `type`   | `TargetType` | `NODE`, `GROUP`, `SECTION`, `EDGE`, `TEXT`, `RESOURCE` |
| `object` | `string`     | 기존 객체 ID (수정/삭제 시)                            |
| `tempId` | `string`     | 클라이언트 임시 ID (생성 시, Optimistic UI용)          |
| `nodeId` | `number`     | 부모 노드 ID (RESOURCE 생성 시 필수)                   |

**ActionState (prev/next)**

| 필드       | 타입      | 설명            |
| ---------- | --------- | --------------- |
| `x`        | `number`  | X 좌표          |
| `y`        | `number`  | Y 좌표          |
| `label`    | `string`  | 라벨            |
| `locked`   | `boolean` | 잠금 상태       |
| `metadata` | `object`  | 추가 메타데이터 |

**응답 흐름**

```
클라이언트 ── Action ──> 서버
    │
    ├── 성공: ACK (/user/queue/ack) + EVENT 브로드캐스트 (/topic/roadmap/{id}/state)
    │
    └── 실패: NACK (/user/queue/nack)
```

#### `/app/roadmap/{roadmapId}/cursor` - 커서 위치 전송

```json
{
  "userId": 1,
  "userName": "Kim",
  "x": 500.0,
  "y": 300.0,
  "state": "NORMAL",
  "targetId": "node-1"
}
```

| 필드       | 타입          | 필수 | 설명                                         |
| ---------- | ------------- | ---- | -------------------------------------------- |
| `userId`   | `number`      | -    | 미전송 시 서버가 헤더의 X-User-ID 사용       |
| `userName` | `string`      | -    | 다른 사용자에게 표시할 이름                  |
| `x`        | `number`      | O    | 캔버스 X 좌표                                |
| `y`        | `number`      | O    | 캔버스 Y 좌표                                |
| `state`    | `CursorState` | -    | `NORMAL`, `DRAGGING`, `SELECTING`, `EDITING` |
| `targetId` | `string`      | -    | 선택/드래그 중인 요소 ID                     |

> `timestamp`는 서버가 자동 설정한다.

#### `/app/roadmap/{roadmapId}/cursor/hide` - 커서 숨김

로드맵 페이지를 떠날 때 호출. 별도 payload 없이 SEND만 하면 된다. 서버가 `X-User-ID` 헤더로 사용자를 식별한다.

---

## 5. REST API

### `GET /api/roadmap/{roadmapId}/events`

재연결 시 놓친 이벤트를 복구하기 위한 엔드포인트.

**Query Parameters**

| 파라미터 | 타입     | 기본값 | 설명                             |
| -------- | -------- | ------ | -------------------------------- |
| `since`  | `number` | `0`    | 이 sequence 이후의 이벤트만 조회 |

**Response** `200 OK`

```json
[
  {
    "type": "EVENT",
    "eventId": "evt-301",
    "sequence": 43,
    "payload": { ... }
  },
  {
    "type": "EVENT",
    "eventId": "evt-302",
    "sequence": 44,
    "payload": { ... }
  }
]
```

Event 목록이 `sequence` 오름차순으로 반환된다.

---

## 6. Action 상세

### 6.1 노드 (NODE)

#### CREATE - 노드 생성

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "CREATE",
  "payload": {
    "type": "INFO",
    "target": {
      "type": "NODE",
      "tempId": "temp-node-1"
    },
    "data": {
      "label": "React 기초",
      "x": 100.0,
      "y": 200.0,
      "width": 200.0,
      "height": 100.0,
      "metadata": { "difficulty": "easy" }
    }
  }
}
```

> `data.x`, `data.y`는 필수. 누락 시 `NODE_001` 에러.

#### EDIT - 노드 수정

**이동 (MOVE)**

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "EDIT",
  "payload": {
    "type": "MOVE",
    "target": { "type": "NODE", "object": "1" },
    "prev": { "x": 100.0, "y": 200.0 },
    "next": { "x": 300.0, "y": 400.0 }
  }
}
```

**정보 수정 (INFO)**

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "EDIT",
  "payload": {
    "type": "INFO",
    "target": { "type": "NODE", "object": "1" },
    "prev": { "label": "old label" },
    "next": { "label": "new label", "metadata": { "difficulty": "hard" } }
  }
}
```

**크기 조절 (SCALE)**

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "EDIT",
  "payload": {
    "type": "SCALE",
    "target": { "type": "NODE", "object": "1" },
    "data": { "width": 300.0, "height": 150.0 }
  }
}
```

**잠금 (LOCK)**

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "EDIT",
  "payload": {
    "type": "LOCK",
    "target": { "type": "NODE", "object": "1" },
    "next": { "locked": true }
  }
}
```

**학습 상태 변경**

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "EDIT",
  "payload": {
    "type": "INFO",
    "target": { "type": "NODE", "object": "1" },
    "data": { "learningState": "IN_PROGRESS" }
  }
}
```

#### DELETE - 노드 삭제

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "DELETE",
  "payload": {
    "target": { "type": "NODE", "object": "1" }
  }
}
```

---

### 6.2 엣지 (EDGE)

#### CREATE - 엣지 생성

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "CREATE",
  "payload": {
    "type": "INFO",
    "target": {
      "type": "EDGE",
      "tempId": "temp-edge-1"
    },
    "data": {
      "fromNodeId": 1,
      "toNodeId": 2,
      "edgeStyle": "curved",
      "strokeColor": "#3B82F6",
      "strokeWidth": 2.0,
      "labelText": "선행 학습",
      "arrowType": "single",
      "isDirectional": true,
      "animationType": "flow"
    }
  }
}
```

#### EDIT - 엣지 수정

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "EDIT",
  "payload": {
    "type": "INFO",
    "target": { "type": "EDGE", "object": "1" },
    "data": {
      "strokeColor": "#EF4444",
      "strokeWidth": 3.0,
      "labelText": "필수 선행",
      "animationType": "pulse"
    }
  }
}
```

#### DELETE - 엣지 삭제

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "DELETE",
  "payload": {
    "target": { "type": "EDGE", "object": "1" }
  }
}
```

---

### 6.3 섹션 (SECTION)

#### CREATE

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "CREATE",
  "payload": {
    "type": "INFO",
    "target": { "type": "SECTION", "tempId": "temp-section-1" },
    "data": {
      "sectionName": "Frontend",
      "x": 0.0,
      "y": 0.0,
      "sectionWidth": 500.0,
      "sectionHeight": 400.0,
      "sectionColor": "#E3F2FD",
      "sectionDescription": "프론트엔드 학습 영역"
    }
  }
}
```

#### EDIT

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "EDIT",
  "payload": {
    "type": "INFO",
    "target": { "type": "SECTION", "object": "1" },
    "data": {
      "sectionName": "Frontend Basics",
      "sectionColor": "#BBDEFB"
    }
  }
}
```

#### DELETE

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "DELETE",
  "payload": {
    "target": { "type": "SECTION", "object": "1" }
  }
}
```

---

### 6.4 텍스트 요소 (TEXT)

#### CREATE

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "CREATE",
  "payload": {
    "type": "INFO",
    "target": { "type": "TEXT", "tempId": "temp-text-1" },
    "data": {
      "textContent": "학습 가이드",
      "x": 50.0,
      "y": 50.0,
      "fontSize": 24,
      "textColor": "#1E293B",
      "fontWeight": "bold",
      "textAlign": "center",
      "styleData": {}
    }
  }
}
```

#### EDIT

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "EDIT",
  "payload": {
    "type": "INFO",
    "target": { "type": "TEXT", "object": "1" },
    "data": {
      "textContent": "수정된 텍스트",
      "fontSize": 18,
      "textColor": "#64748B"
    }
  }
}
```

#### DELETE

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "DELETE",
  "payload": {
    "target": { "type": "TEXT", "object": "1" }
  }
}
```

---

### 6.5 자료 (RESOURCE)

#### CREATE

> `target.nodeId` 필수 - 자료가 소속될 노드 ID

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "CREATE",
  "payload": {
    "type": "INFO",
    "target": {
      "type": "RESOURCE",
      "tempId": "temp-resource-1",
      "nodeId": 1
    },
    "data": {
      "resourceTitle": "MDN JavaScript 가이드",
      "resourceType": "LINK",
      "resourceUrl": "https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide",
      "resourceDescription": "JavaScript 공식 학습 자료",
      "resourceMetadata": { "language": "ko" },
      "displayOrder": 1
    }
  }
}
```

#### EDIT

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "EDIT",
  "payload": {
    "type": "INFO",
    "target": { "type": "RESOURCE", "object": "1" },
    "data": {
      "resourceTitle": "수정된 제목",
      "displayOrder": 2
    }
  }
}
```

#### DELETE

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "DELETE",
  "payload": {
    "target": { "type": "RESOURCE", "object": "1" }
  }
}
```

---

### 6.6 되돌리기 / 다시실행

#### UNDO

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "UNDO",
  "payload": null
}
```

#### REDO

```json
{
  "actionId": "uuid",
  "roadmap": "123",
  "action": "REDO",
  "payload": null
}
```

> UNDO/REDO는 서버가 사용자별 히스토리 스택을 관리한다. `payload`는 null이어도 된다.

---

## 7. 커서 추적

실시간 협업 시 다른 사용자의 커서 위치를 표시하기 위한 기능.

### 전송 주기

커서 이동 이벤트를 **throttle하여 50~100ms 간격**으로 전송하는 것을 권장한다. 너무 잦은 전송은 서버 부하를 유발한다.

### CursorPosition 필드

| 필드        | 타입          | 설명                                      |
| ----------- | ------------- | ----------------------------------------- |
| `userId`    | `number`      | 사용자 ID (미전송 시 서버가 헤더값 사용)  |
| `userName`  | `string`      | 표시 이름                                 |
| `x`         | `number`      | 캔버스 X 좌표 (뷰포트가 아닌 캔버스 좌표) |
| `y`         | `number`      | 캔버스 Y 좌표                             |
| `timestamp` | `number`      | 밀리초 타임스탬프 (서버가 설정)           |
| `state`     | `CursorState` | 커서 상태                                 |
| `targetId`  | `string`      | 선택/드래그 중인 요소 ID                  |

### 커서 숨김

페이지를 떠날 때 `/app/roadmap/{roadmapId}/cursor/hide`로 SEND하여 다른 사용자 화면에서 커서를 제거한다. `beforeunload` 이벤트에서도 호출하는 것을 권장한다.

---

## 8. 도메인 모델

### RoadmapNode

| 필드            | 타입            | 설명                                      |
| --------------- | --------------- | ----------------------------------------- |
| `id`            | `number`        | PK                                        |
| `unitId`        | `number`        | 외부 로드맵 서비스의 unit ID              |
| `label`         | `string`        | 노드 제목                                 |
| `x`             | `number`        | 캔버스 X 좌표                             |
| `y`             | `number`        | 캔버스 Y 좌표                             |
| `width`         | `number?`       | 너비 (null이면 클라이언트에서 동적 계산)  |
| `height`        | `number?`       | 높이 (null이면 클라이언트에서 동적 계산)  |
| `data`          | `object?`       | JSON 메타데이터 (난이도, 태그, 썸네일 등) |
| `locked`        | `boolean`       | 잠금 상태 (기본: false)                   |
| `learningState` | `LearningState` | 학습 상태 (기본: NOT_STARTED)             |
| `sectionId`     | `number?`       | 소속 섹션 ID                              |

### RoadmapEdge

| 필드            | 타입      | 기본값       | 설명                                      |
| --------------- | --------- | ------------ | ----------------------------------------- |
| `id`            | `number`  | -            | PK                                        |
| `unitId`        | `number`  | -            | 외부 로드맵 unit ID                       |
| `fromNodeId`    | `number`  | -            | 시작 노드 ID                              |
| `toNodeId`      | `number`  | -            | 도착 노드 ID                              |
| `style`         | `string`  | `"straight"` | 선 스타일: `straight`, `curved`, `bezier` |
| `strokeColor`   | `string`  | `"#000000"`  | 선 색상 (hex)                             |
| `strokeWidth`   | `number`  | `2.0`        | 선 두께                                   |
| `labelText`     | `string`  | `""`         | 라벨 텍스트                               |
| `arrowType`     | `string`  | `"single"`   | 화살표: `none`, `single`, `double`        |
| `isDirectional` | `boolean` | `true`       | 방향성 여부                               |
| `animationType` | `string`  | `"none"`     | 애니메이션: `none`, `pulse`, `flow`       |

### RoadmapSection

| 필드          | 타입      | 설명                |
| ------------- | --------- | ------------------- |
| `id`          | `number`  | PK                  |
| `unitId`      | `number`  | 외부 로드맵 unit ID |
| `name`        | `string`  | 섹션명              |
| `x`           | `number`  | X 좌표              |
| `y`           | `number`  | Y 좌표              |
| `width`       | `number`  | 너비                |
| `height`      | `number`  | 높이                |
| `color`       | `string`  | 배경색 (hex)        |
| `description` | `string`  | 설명                |
| `locked`      | `boolean` | 잠금 상태           |

### RoadmapTextElement

| 필드         | 타입      | 설명                            |
| ------------ | --------- | ------------------------------- |
| `id`         | `number`  | PK                              |
| `unitId`     | `number`  | 외부 로드맵 unit ID             |
| `content`    | `string`  | 텍스트 내용                     |
| `x`          | `number`  | X 좌표                          |
| `y`          | `number`  | Y 좌표                          |
| `fontSize`   | `number`  | 폰트 크기                       |
| `color`      | `string`  | 텍스트 색상 (hex)               |
| `fontWeight` | `string`  | 굵기: `normal`, `bold`          |
| `textAlign`  | `string`  | 정렬: `left`, `center`, `right` |
| `styleData`  | `object?` | 추가 스타일 JSON                |
| `locked`     | `boolean` | 잠금 상태                       |

### NodeResource

| 필드           | 타입      | 설명                                                   |
| -------------- | --------- | ------------------------------------------------------ |
| `id`           | `number`  | PK                                                     |
| `unitId`       | `number`  | 외부 로드맵 unit ID                                    |
| `nodeId`       | `number`  | 소속 노드 ID                                           |
| `title`        | `string`  | 자료 제목                                              |
| `resourceType` | `string`  | 자료 타입: `LINK`, `PDF`, `VIDEO`, `IMAGE`, `DOCUMENT` |
| `url`          | `string`  | 자료 URL                                               |
| `description`  | `string`  | 설명                                                   |
| `metadata`     | `object?` | 추가 메타데이터 JSON                                   |
| `displayOrder` | `number`  | 표시 순서                                              |

---

## 9. Enum 정의

### ActionType (액션 타입)

| 값       | 설명                                                 |
| -------- | ---------------------------------------------------- |
| `CREATE` | 생성                                                 |
| `EDIT`   | 수정 (이동, 크기 조절, 잠금, 정보 수정 등 모두 포함) |
| `DELETE` | 삭제                                                 |
| `UNDO`   | 되돌리기                                             |
| `REDO`   | 다시실행                                             |

### PayloadType (페이로드 타입)

| 값      | 설명                            |
| ------- | ------------------------------- |
| `INFO`  | 정보 수정 (라벨, 메타데이터 등) |
| `MOVE`  | 위치 이동 (x, y 변경)           |
| `SCALE` | 크기 조절 (width, height 변경)  |
| `LOCK`  | 잠금/해제                       |
| `COPY`  | 복제                            |

### TargetType (대상 타입)

| 값         | 설명          |
| ---------- | ------------- |
| `NODE`     | 노드          |
| `GROUP`    | 그룹          |
| `SECTION`  | 섹션          |
| `EDGE`     | 엣지 (연결선) |
| `TEXT`     | 텍스트 요소   |
| `RESOURCE` | 자료          |

### EventType (이벤트 타입)

| 값         | 설명                   |
| ---------- | ---------------------- |
| `SNAPSHOT` | 초기 전체 상태         |
| `ACK`      | 명령 접수 확인         |
| `EVENT`    | 상태 변경 브로드캐스트 |
| `PRESENCE` | 커서/인터랙션          |

### LearningState (학습 상태)

| 값            | 표시명 | 설명      |
| ------------- | ------ | --------- |
| `NOT_STARTED` | 미시작 | 기본값    |
| `IN_PROGRESS` | 진행중 | 학습 중   |
| `COMPLETED`   | 완료   | 학습 완료 |

### CursorState (커서 상태)

| 값          | 설명      |
| ----------- | --------- |
| `NORMAL`    | 일반 커서 |
| `DRAGGING`  | 드래그 중 |
| `SELECTING` | 선택 중   |
| `EDITING`   | 편집 중   |

### UserRole (사용자 역할)

| 값      | 설명           |
| ------- | -------------- |
| `ADMIN` | 전체 편집 권한 |
| `USER`  | 읽기 + 쓰기    |
| `GUEST` | 읽기 전용      |

---

## 10. 에러 코드

| 코드          | HTTP 상태 | 설명                                   |
| ------------- | --------- | -------------------------------------- |
| `AUTH_001`    | 401       | 인증이 필요합니다                      |
| `AUTH_002`    | 403       | 권한이 없습니다                        |
| `AUTH_003`    | 400       | 유효하지 않은 사용자 ID입니다          |
| `ACTION_001`  | 409       | 이미 처리된 요청입니다 (중복 actionId) |
| `ACTION_002`  | 400       | 지원하지 않는 액션 타입입니다          |
| `NODE_001`    | 400       | 위치 정보는 필수입니다 (x, y 누락)     |
| `NODE_002`    | 404       | 노드를 찾을 수 없습니다                |
| `EDGE_001`    | 404       | 엣지를 찾을 수 없습니다                |
| `ROADMAP_001` | 404       | 로드맵을 찾을 수 없습니다              |
| `COMMON_001`  | 400       | 잘못된 입력입니다                      |
| `COMMON_002`  | 500       | 서버 내부 오류가 발생했습니다          |

> WebSocket에서는 HTTP 상태 코드 대신 NACK의 `errorCode` 필드로 전달된다.

---

## 11. 권한 체계

| 역할    | 읽기 (SUBSCRIBE) | 쓰기 (Action SEND) | 설명                                        |
| ------- | ---------------- | ------------------ | ------------------------------------------- |
| `ADMIN` | O                | O                  | 모든 Action 실행 가능                       |
| `USER`  | O                | O                  | 모든 Action 실행 가능                       |
| `GUEST` | O                | X                  | 구독만 가능, Action 전송 시 `AUTH_002` NACK |

---

## 12. 프론트엔드 통합 가이드

### 12.1 필요한 라이브러리

```bash
npm install @stomp/stompjs sockjs-client
npm install -D @types/sockjs-client
```

### 12.2 WebSocket 연결

```typescript
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ROADMAP_ID = '123';
const WS_URL = 'http://localhost:8082/ws/roadmap';

const client = new Client({
  // SockJS 팩토리
  webSocketFactory: () => new SockJS(WS_URL),

  // STOMP CONNECT 시 인증 헤더 전달
  connectHeaders: {
    'X-User-ID': '1',
    'X-User-Role': 'USER',
  },

  // 재연결 설정 (5초 간격)
  reconnectDelay: 5000,

  onConnect: (frame) => {
    console.log('Connected:', frame);
    subscribeAll();
  },

  onStompError: (frame) => {
    console.error('STOMP error:', frame.headers['message']);
  },

  onDisconnect: () => {
    console.log('Disconnected');
  },
});

client.activate();
```

### 12.3 구독 설정

```typescript
// 마지막으로 받은 sequence (재연결 복구용)
let lastSequence = 0;

function subscribeAll() {
  // 1. 상태 이벤트 구독 (구독 시 자동으로 SNAPSHOT 수신)
  client.subscribe(`/topic/roadmap/${ROADMAP_ID}/state`, (message: IMessage) => {
    const event = JSON.parse(message.body);
    handleStateEvent(event);
  });

  // 2. 스냅샷 수신 (개인 큐)
  client.subscribe('/user/queue/snapshot', (message: IMessage) => {
    const snapshot = JSON.parse(message.body);
    handleSnapshot(snapshot);
  });

  // 3. ACK 수신
  client.subscribe('/user/queue/ack', (message: IMessage) => {
    const ack = JSON.parse(message.body);
    handleAck(ack);
  });

  // 4. NACK 수신
  client.subscribe('/user/queue/nack', (message: IMessage) => {
    const nack = JSON.parse(message.body);
    handleNack(nack);
  });

  // 5. 커서 위치 수신
  client.subscribe(`/topic/roadmap/${ROADMAP_ID}/cursors`, (message: IMessage) => {
    const cursor = JSON.parse(message.body);
    handleCursorUpdate(cursor);
  });

  // 6. 커서 숨김 수신
  client.subscribe(`/topic/roadmap/${ROADMAP_ID}/cursors/hide`, (message: IMessage) => {
    const cursor = JSON.parse(message.body);
    handleCursorHide(cursor);
  });
}
```

### 12.4 이벤트 핸들러

```typescript
interface Snapshot {
  type: 'SNAPSHOT';
  version: number;
  roadmapId: string;
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
  sections: RoadmapSection[];
  orphanNodeIds: number[];
}

interface StateEvent {
  type: 'EVENT';
  eventId: string;
  sequence: number;
  payload: Record<string, unknown>;
}

interface ActionAck {
  type: 'ACK';
  actionId: string;
  status: string;
}

interface ActionNack {
  actionId: string;
  actionType: string;
  errorCode: string;
  errorMessage: string;
}

function handleSnapshot(snapshot: Snapshot) {
  // 전체 캔버스 상태 초기화
  lastSequence = snapshot.version;
  canvasStore.initialize(snapshot);
}

function handleStateEvent(event: StateEvent) {
  // sequence 기반 순서 보장
  if (event.sequence <= lastSequence) {
    return; // 이미 처리된 이벤트 무시
  }
  lastSequence = event.sequence;
  canvasStore.applyEvent(event);
}

function handleAck(ack: ActionAck) {
  // Optimistic UI: pending 상태 확정
  pendingActions.delete(ack.actionId);
}

function handleNack(nack: ActionNack) {
  // Optimistic UI: 변경사항 롤백
  pendingActions.get(nack.actionId)?.rollback();
  pendingActions.delete(nack.actionId);

  // 사용자에게 에러 표시
  toast.error(nack.errorMessage);
}
```

### 12.5 Action 전송

```typescript
import { v4 as uuidv4 } from 'uuid';

function sendAction(
  actionType: 'CREATE' | 'EDIT' | 'DELETE' | 'UNDO' | 'REDO',
  payload?: ActionPayload,
) {
  const actionId = uuidv4();

  const action = {
    actionId,
    roadmap: ROADMAP_ID,
    action: actionType,
    payload: payload ?? null,
  };

  // Optimistic UI: 즉시 로컬 상태 변경
  const rollback = canvasStore.applyOptimistic(action);
  pendingActions.set(actionId, { rollback });

  // 서버로 전송
  client.publish({
    destination: `/app/roadmap/${ROADMAP_ID}/action`,
    body: JSON.stringify(action),
  });

  // 타임아웃 처리 (10초 후 ACK/NACK 미수신 시)
  setTimeout(() => {
    if (pendingActions.has(actionId)) {
      pendingActions.get(actionId)?.rollback();
      pendingActions.delete(actionId);
      toast.error('요청 시간이 초과되었습니다.');
    }
  }, 10_000);
}

// 사용 예시
function createNode(label: string, x: number, y: number) {
  sendAction('CREATE', {
    type: 'INFO',
    target: { type: 'NODE', tempId: uuidv4() },
    data: { label, x, y },
  });
}

function moveNode(nodeId: string, x: number, y: number, prevX: number, prevY: number) {
  sendAction('EDIT', {
    type: 'MOVE',
    target: { type: 'NODE', object: nodeId },
    prev: { x: prevX, y: prevY },
    next: { x, y },
  });
}

function deleteNode(nodeId: string) {
  sendAction('DELETE', {
    target: { type: 'NODE', object: nodeId },
  });
}

function undo() {
  sendAction('UNDO');
}

function redo() {
  sendAction('REDO');
}
```

### 12.6 커서 전송

```typescript
// throttle 적용 (50ms 간격)
const sendCursor = throttle((x: number, y: number, state: CursorState = 'NORMAL') => {
  client.publish({
    destination: `/app/roadmap/${ROADMAP_ID}/cursor`,
    body: JSON.stringify({
      userName: currentUser.name,
      x,
      y,
      state,
      targetId: null,
    }),
  });
}, 50);

// 캔버스 마우스 이벤트에 연결
canvas.addEventListener('mousemove', (e) => {
  const canvasPos = screenToCanvas(e.clientX, e.clientY);
  sendCursor(canvasPos.x, canvasPos.y);
});

// 페이지 이탈 시 커서 숨김
window.addEventListener('beforeunload', () => {
  client.publish({
    destination: `/app/roadmap/${ROADMAP_ID}/cursor/hide`,
    body: '{}',
  });
});
```

### 12.7 재연결 전략

`@stomp/stompjs`의 `reconnectDelay` 옵션으로 자동 재연결이 되지만, 끊김 동안 놓친 이벤트를 복구해야 한다.

```typescript
// @stomp/stompjs의 onConnect에서 재연결 감지
let isReconnect = false;

const client = new Client({
  // ...
  onConnect: async () => {
    if (isReconnect) {
      await recoverMissedEvents();
    }
    isReconnect = true;
    subscribeAll();
  },
  onDisconnect: () => {
    // lastSequence는 유지 (재연결 시 복구 기준점)
  },
});

async function recoverMissedEvents() {
  try {
    const response = await fetch(`/api/roadmap/${ROADMAP_ID}/events?since=${lastSequence}`);
    const events: StateEvent[] = await response.json();

    // sequence 순서대로 적용
    for (const event of events) {
      handleStateEvent(event);
    }

    console.log(`${events.length}개의 놓친 이벤트 복구 완료`);
  } catch (error) {
    // 복구 실패 시 전체 스냅샷으로 폴백
    // → /topic/roadmap/{id}/state 재구독하면 SNAPSHOT이 다시 온다
    console.error('이벤트 복구 실패, 스냅샷으로 폴백');
  }
}
```

### 12.8 Optimistic UI 패턴

```
사용자 액션
    │
    ├── 1. 로컬 상태 즉시 변경 (낙관적 업데이트)
    ├── 2. pendingActions Map에 rollback 함수 저장
    ├── 3. 서버로 Action 전송
    │
    ├── ACK 수신 → pending 제거 (확정)
    ├── NACK 수신 → rollback 실행 + 에러 표시
    └── 타임아웃 → rollback 실행 + 에러 표시
```

> **주의**: 서버의 EVENT 브로드캐스트에 자기 자신의 액션 결과도 포함된다. Optimistic UI를 사용하면 이미 로컬에 적용된 상태이므로, 자신이 보낸 `actionId`에 대한 EVENT는 무시하거나, sequence 기반으로 중복을 걸러내야 한다.

### 12.9 타입 정의 (TypeScript)

```typescript
// === Action 관련 ===

type ActionType = 'CREATE' | 'EDIT' | 'DELETE' | 'UNDO' | 'REDO';
type PayloadType = 'INFO' | 'MOVE' | 'SCALE' | 'LOCK' | 'COPY';
type TargetType = 'NODE' | 'GROUP' | 'SECTION' | 'EDGE' | 'TEXT' | 'RESOURCE';
type LearningState = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
type CursorState = 'NORMAL' | 'DRAGGING' | 'SELECTING' | 'EDITING';
type UserRole = 'ADMIN' | 'USER' | 'GUEST';

interface Action {
  actionId: string;
  roadmap: string;
  action: ActionType;
  payload: ActionPayload | null;
}

interface ActionPayload {
  type?: PayloadType;
  target: ActionTarget;
  prev?: ActionState | null;
  next?: ActionState | null;
  data?: ActionData | null;
}

interface ActionTarget {
  type: TargetType;
  object?: string;
  tempId?: string;
  nodeId?: number;
}

interface ActionState {
  x?: number;
  y?: number;
  label?: string;
  locked?: boolean;
  metadata?: Record<string, unknown>;
}

interface ActionData {
  // 공통
  label?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  metadata?: Record<string, unknown>;
  learningState?: LearningState;

  // Edge
  fromNodeId?: number;
  toNodeId?: number;
  edgeStyle?: string;
  strokeColor?: string;
  strokeWidth?: number;
  labelText?: string;
  arrowType?: string;
  isDirectional?: boolean;
  animationType?: string;

  // Resource
  resourceTitle?: string;
  resourceType?: string;
  resourceUrl?: string;
  resourceDescription?: string;
  resourceMetadata?: Record<string, unknown>;
  displayOrder?: number;

  // Text
  textContent?: string;
  fontSize?: number;
  textColor?: string;
  fontWeight?: string;
  textAlign?: string;
  styleData?: Record<string, unknown>;

  // Section
  sectionName?: string;
  sectionWidth?: number;
  sectionHeight?: number;
  sectionColor?: string;
  sectionDescription?: string;
}

// === 응답 관련 ===

interface ActionAckResponse {
  type: 'ACK';
  actionId: string;
  status: string;
}

interface ActionNackResponse {
  actionId: string;
  actionType: ActionType;
  errorCode: string;
  errorMessage: string;
}

interface StateEvent {
  type: 'EVENT';
  eventId: string;
  sequence: number;
  payload: Record<string, unknown>;
}

interface Snapshot {
  type: 'SNAPSHOT';
  version: number;
  roadmapId: string;
  nodes: RoadmapNodeDto[];
  edges: RoadmapEdgeDto[];
  sections: RoadmapSectionDto[];
  orphanNodeIds: number[];
}

// === 도메인 DTO ===

interface RoadmapNodeDto {
  id: number;
  label: string;
  x: number;
  y: number;
  width: number | null;
  height: number | null;
  data: Record<string, unknown> | null;
  locked: boolean;
  learningState: LearningState;
}

interface RoadmapEdgeDto {
  id: number;
  fromNodeId: number;
  toNodeId: number;
  style: string;
  strokeColor: string;
  strokeWidth: number;
  labelText: string;
  arrowType: string;
  isDirectional: boolean;
  animationType: string;
}

interface RoadmapSectionDto {
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  description: string;
}

// === 커서 관련 ===

interface CursorPosition {
  userId: number;
  userName: string;
  x: number;
  y: number;
  timestamp: number;
  state: CursorState;
  targetId: string | null;
}
```
