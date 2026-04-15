# Jagalchi User Service API 명세서

> **Base URL**: `http://localhost:8081`
> **Content-Type**: `application/json`
> **인증 방식**: Bearer Token (JWT, HS512)

---

## 목차

1. [인증 (Authentication)](#1-인증-authentication)
   - [1.1 회원가입](#11-회원가입)
   - [1.2 로그인](#12-로그인)
   - [1.3 비밀번호 변경](#13-비밀번호-변경)
   - [1.4 토큰 갱신](#14-토큰-갱신)
   - [1.5 Google OAuth2 로그인](#15-google-oauth2-로그인)
   - [1.6 GitHub OAuth2 로그인](#16-github-oauth2-로그인)
   - [1.7 회원탈퇴](#17-회원탈퇴)
2. [이메일 인증 (Email Verification)](#2-이메일-인증-email-verification)
   - [2.1 회원가입 인증코드 발송](#21-회원가입-인증코드-발송)
   - [2.2 비밀번호 리셋 인증코드 발송](#22-비밀번호-리셋-인증코드-발송)
   - [2.3 회원가입 인증코드 검증](#23-회원가입-인증코드-검증)
   - [2.4 비밀번호 리셋 인증코드 검증](#24-비밀번호-리셋-인증코드-검증)
3. [사용자 프로필 (User Profile)](#3-사용자-프로필-user-profile)
   - [3.1 사용자 프로필 조회](#31-사용자-프로필-조회)
   - [3.2 프로필 수정](#32-프로필-수정)
4. [팔로우 (Follow)](#4-팔로우-follow)
   - [4.1 팔로우 토글](#41-팔로우-토글)
   - [4.2 팔로워 목록 조회](#42-팔로워-목록-조회)
   - [4.3 팔로잉 목록 조회](#43-팔로잉-목록-조회)
5. [JWT 토큰 구조](#5-jwt-토큰-구조)
6. [역할 (Roles)](#6-역할-roles)
7. [공통 에러 응답](#7-공통-에러-응답)

---

## 공통 사항

### 인증 헤더

인증이 필요한 요청에는 아래 헤더를 포함해야 한다.

```
Authorization: Bearer <accessToken>
```

### 공통 에러 응답 형식

모든 에러는 아래 형식으로 반환된다.

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

### 공통 HTTP 상태 코드

| 코드 | 설명                                       |
| ---- | ------------------------------------------ |
| 400  | 유효성 검사 실패 (필드별 상세 정보 포함)   |
| 401  | 인증 실패 (토큰 없음, 만료, 유효하지 않음) |
| 403  | 권한 부족                                  |
| 404  | 리소스 없음                                |
| 409  | 리소스 충돌 (이메일 중복 등)               |
| 413  | 파일 크기 초과                             |
| 500  | 서버 내부 오류                             |

---

## 1. 인증 (Authentication)

### 1.1 회원가입

새 계정을 생성한다. **반드시 이메일 인증을 먼저 완료해야 한다** ([2.1](#21-회원가입-인증코드-발송) -> [2.3](#23-회원가입-인증코드-검증) -> 회원가입 순서).

```
POST /users
```

| 항목         | 값               |
| ------------ | ---------------- |
| 인증         | 불필요           |
| Content-Type | application/json |

**Request Body**

| 필드       | 타입     | 필수 | 설명                        |
| ---------- | -------- | ---- | --------------------------- |
| `email`    | `string` | O    | 이메일 (인증 완료된 이메일) |
| `name`     | `string` | O    | 사용자 이름                 |
| `password` | `string` | O    | 비밀번호                    |

```json
{
  "email": "student@bssm.hs.kr",
  "name": "홍길동",
  "password": "MySecureP@ss123"
}
```

**Response 201 Created**

```json
{
  "id": 1,
  "email": "student@bssm.hs.kr",
  "name": "홍길동"
}
```

**에러 케이스**

| 상태 코드 | 코드                 | 설명                            |
| --------- | -------------------- | ------------------------------- |
| 400       | `VALIDATION_ERROR`   | 필수 필드 누락 또는 형식 불일치 |
| 409       | `DUPLICATE_EMAIL`    | 이미 가입된 이메일              |
| 400       | `EMAIL_NOT_VERIFIED` | 이메일 인증이 완료되지 않음     |

```json
{
  "error": {
    "code": "DUPLICATE_EMAIL",
    "message": "이미 사용 중인 이메일입니다.",
    "details": {
      "email": "student@bssm.hs.kr"
    },
    "timestamp": "2026-04-07T12:34:56"
  }
}
```

---

### 1.2 로그인

이메일/비밀번호로 로그인한다. Access Token은 응답 바디로, Refresh Token은 HttpOnly 쿠키로 설정된다.

```
POST /users/auth/login
```

| 항목         | 값               |
| ------------ | ---------------- |
| 인증         | 불필요           |
| Content-Type | application/json |

**Request Body**

| 필드       | 타입     | 필수 | 설명     |
| ---------- | -------- | ---- | -------- |
| `email`    | `string` | O    | 이메일   |
| `password` | `string` | O    | 비밀번호 |

```json
{
  "email": "student@bssm.hs.kr",
  "password": "MySecureP@ss123"
}
```

**Response 200 OK**

```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlNUVURFTlQiLCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwiaWF0IjoxNzQzOTQ0MDk2LCJleHAiOjE3NDM5NDc2OTZ9.xxxxx"
}
```

**응답 쿠키**

```
Set-Cookie: refreshToken=eyJhbGciOiJIUzUxMiJ9.xxxxx; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
```

| 쿠키 속성  | 값                      |
| ---------- | ----------------------- |
| `HttpOnly` | true (JS에서 접근 불가) |
| `Secure`   | true (HTTPS에서만 전송) |
| `SameSite` | Strict                  |
| `Max-Age`  | 604800 (7일)            |

**에러 케이스**

| 상태 코드 | 코드                  | 설명                        |
| --------- | --------------------- | --------------------------- |
| 400       | `VALIDATION_ERROR`    | 필수 필드 누락              |
| 401       | `INVALID_CREDENTIALS` | 이메일 또는 비밀번호 불일치 |

```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "이메일 또는 비밀번호가 올바르지 않습니다.",
    "details": {},
    "timestamp": "2026-04-07T12:35:00"
  }
}
```

---

### 1.3 비밀번호 변경

비밀번호를 변경한다. **반드시 비밀번호 리셋 인증을 먼저 완료해야 한다** ([2.2](#22-비밀번호-리셋-인증코드-발송) -> [2.4](#24-비밀번호-리셋-인증코드-검증) -> 비밀번호 변경 순서).

```
PATCH /users/auth/password-reset
```

| 항목         | 값               |
| ------------ | ---------------- |
| 인증         | 불필요           |
| Content-Type | application/json |

**Request Body**

| 필드          | 타입     | 필수 | 설명        |
| ------------- | -------- | ---- | ----------- |
| `email`       | `string` | O    | 이메일      |
| `newPassword` | `string` | O    | 새 비밀번호 |

```json
{
  "email": "student@bssm.hs.kr",
  "newPassword": "NewSecureP@ss456"
}
```

**Response 204 No Content**

응답 바디 없음.

**에러 케이스**

| 상태 코드 | 코드                 | 설명                                     |
| --------- | -------------------- | ---------------------------------------- |
| 400       | `VALIDATION_ERROR`   | 필수 필드 누락 또는 비밀번호 형식 불일치 |
| 400       | `EMAIL_NOT_VERIFIED` | 비밀번호 리셋 인증이 완료되지 않음       |
| 404       | `USER_NOT_FOUND`     | 해당 이메일의 사용자가 없음              |

---

### 1.4 토큰 갱신

만료된 Access Token을 새로 발급받는다. Refresh Token은 요청 바디 또는 쿠키에서 읽는다.

```
PATCH /users/auth/refresh
```

| 항목         | 값                              |
| ------------ | ------------------------------- |
| 인증         | 불필요 (Refresh Token으로 인증) |
| Content-Type | application/json                |

**Request Body**

| 필드           | 타입     | 필수 | 설명                                         |
| -------------- | -------- | ---- | -------------------------------------------- |
| `refreshToken` | `string` | 선택 | Refresh Token (쿠키로 전달할 경우 생략 가능) |

쿠키에 `refreshToken`이 있으면 바디 없이 요청 가능하다.

```json
{
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9.xxxxx"
}
```

또는 쿠키만으로 요청:

```
PATCH /users/auth/refresh
Cookie: refreshToken=eyJhbGciOiJIUzUxMiJ9.xxxxx
```

**Response 200 OK**

```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlNUVURFTlQiLCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwiaWF0IjoxNzQzOTQ3Njk2LCJleHAiOjE3NDM5NTEyOTZ9.yyyyy"
}
```

**응답 쿠키** (새 Refresh Token으로 갱신됨)

```
Set-Cookie: refreshToken=eyJhbGciOiJIUzUxMiJ9.zzzzz; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800
```

**에러 케이스**

| 상태 코드 | 코드                    | 설명                                   |
| --------- | ----------------------- | -------------------------------------- |
| 401       | `INVALID_REFRESH_TOKEN` | Refresh Token이 유효하지 않거나 만료됨 |

```json
{
  "error": {
    "code": "INVALID_REFRESH_TOKEN",
    "message": "Refresh Token이 만료되었거나 유효하지 않습니다.",
    "details": {},
    "timestamp": "2026-04-07T13:00:00"
  }
}
```

---

### 1.5 Google OAuth2 로그인

Google 계정으로 로그인한다. 이 엔드포인트를 호출하면 Google OAuth2 인증 페이지로 리다이렉트된다.

```
GET /users/auth/login/google
```

| 항목 | 값     |
| ---- | ------ |
| 인증 | 불필요 |

**동작 흐름**

1. 프론트엔드에서 `GET /users/auth/login/google`로 이동 (window.location 또는 `<a>` 태그)
2. 서버가 `302 Redirect` -> `/oauth2/authorization/google` -> Google 로그인 페이지
3. 사용자가 Google에서 로그인 완료
4. Google이 서버의 callback URL로 리다이렉트
5. 서버가 JWT를 생성하여 프론트엔드 콜백 URL로 리다이렉트 (accessToken 포함 + refreshToken 쿠키 설정)

**프론트엔드 구현 예시**

```typescript
const handleGoogleLogin = () => {
  window.location.href = 'http://localhost:8081/users/auth/login/google';
};
```

---

### 1.6 GitHub OAuth2 로그인

GitHub 계정으로 로그인한다. Google OAuth2와 동일한 흐름이다.

```
GET /users/auth/login/github
```

| 항목 | 값     |
| ---- | ------ |
| 인증 | 불필요 |

**동작 흐름**

1. 프론트엔드에서 `GET /users/auth/login/github`로 이동
2. 서버가 `302 Redirect` -> `/oauth2/authorization/github` -> GitHub 로그인 페이지
3. 사용자가 GitHub에서 로그인 완료
4. GitHub이 서버의 callback URL로 리다이렉트
5. 서버가 JWT를 생성하여 프론트엔드 콜백 URL로 리다이렉트

**프론트엔드 구현 예시**

```typescript
const handleGithubLogin = () => {
  window.location.href = 'http://localhost:8081/users/auth/login/github';
};
```

---

### 1.7 회원탈퇴

현재 로그인한 사용자의 계정을 삭제한다.

```
DELETE /users
```

| 항목 | 값                                               |
| ---- | ------------------------------------------------ |
| 인증 | **필요** (`Authorization: Bearer <accessToken>`) |

**Request**

헤더만 필요하며, 바디는 없다.

```
DELETE /users
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.xxxxx
```

**Response 204 No Content**

응답 바디 없음.

**에러 케이스**

| 상태 코드 | 코드           | 설명                     |
| --------- | -------------- | ------------------------ |
| 401       | `UNAUTHORIZED` | 인증 토큰 없음 또는 만료 |

---

## 2. 이메일 인증 (Email Verification)

### 2.1 회원가입 인증코드 발송

회원가입을 위한 이메일 인증코드를 발송한다.

```
POST /users/verification
```

| 항목         | 값               |
| ------------ | ---------------- |
| 인증         | 불필요           |
| Content-Type | application/json |

**Request Body**

| 필드    | 타입     | 필수 | 설명                   |
| ------- | -------- | ---- | ---------------------- |
| `email` | `string` | O    | 인증코드를 받을 이메일 |

```json
{
  "email": "student@bssm.hs.kr"
}
```

**Response 200 OK**

```json
{
  "message": "인증코드가 발송되었습니다."
}
```

**에러 케이스**

| 상태 코드 | 코드               | 설명               |
| --------- | ------------------ | ------------------ |
| 400       | `VALIDATION_ERROR` | 이메일 형식 불일치 |
| 409       | `DUPLICATE_EMAIL`  | 이미 가입된 이메일 |

---

### 2.2 비밀번호 리셋 인증코드 발송

비밀번호 변경을 위한 이메일 인증코드를 발송한다.

```
POST /users/auth/password-reset
```

| 항목         | 값               |
| ------------ | ---------------- |
| 인증         | 불필요           |
| Content-Type | application/json |

**Request Body**

| 필드    | 타입     | 필수 | 설명                   |
| ------- | -------- | ---- | ---------------------- |
| `email` | `string` | O    | 인증코드를 받을 이메일 |

```json
{
  "email": "student@bssm.hs.kr"
}
```

**Response 200 OK**

```json
{
  "message": "인증코드가 발송되었습니다."
}
```

**에러 케이스**

| 상태 코드 | 코드               | 설명                           |
| --------- | ------------------ | ------------------------------ |
| 400       | `VALIDATION_ERROR` | 이메일 형식 불일치             |
| 404       | `USER_NOT_FOUND`   | 해당 이메일로 가입된 계정 없음 |

---

### 2.3 회원가입 인증코드 검증

발송된 회원가입 인증코드를 검증한다.

```
PATCH /users/verification
```

| 항목         | 값               |
| ------------ | ---------------- |
| 인증         | 불필요           |
| Content-Type | application/json |

**Request Body**

| 필드    | 타입     | 필수 | 설명                                   |
| ------- | -------- | ---- | -------------------------------------- |
| `email` | `string` | O    | 이메일                                 |
| `code`  | `string` | O    | 인증코드 (이메일로 받은 6자리 코드 등) |

```json
{
  "email": "student@bssm.hs.kr",
  "code": "482951"
}
```

**Response 200 OK**

```json
{
  "message": "이메일 인증이 완료되었습니다."
}
```

**에러 케이스**

| 상태 코드 | 코드                        | 설명                      |
| --------- | --------------------------- | ------------------------- |
| 400       | `INVALID_VERIFICATION_CODE` | 인증코드 불일치 또는 만료 |
| 400       | `VALIDATION_ERROR`          | 필수 필드 누락            |

```json
{
  "error": {
    "code": "INVALID_VERIFICATION_CODE",
    "message": "인증코드가 올바르지 않거나 만료되었습니다.",
    "details": {},
    "timestamp": "2026-04-07T12:40:00"
  }
}
```

---

### 2.4 비밀번호 리셋 인증코드 검증

발송된 비밀번호 리셋 인증코드를 검증한다.

```
PATCH /users/auth/password-reset/verify
```

| 항목         | 값               |
| ------------ | ---------------- |
| 인증         | 불필요           |
| Content-Type | application/json |

**Request Body**

| 필드    | 타입     | 필수 | 설명     |
| ------- | -------- | ---- | -------- |
| `email` | `string` | O    | 이메일   |
| `code`  | `string` | O    | 인증코드 |

```json
{
  "email": "student@bssm.hs.kr",
  "code": "739204"
}
```

**Response 200 OK**

```json
{
  "message": "인증이 완료되었습니다."
}
```

**에러 케이스**

| 상태 코드 | 코드                        | 설명                      |
| --------- | --------------------------- | ------------------------- |
| 400       | `INVALID_VERIFICATION_CODE` | 인증코드 불일치 또는 만료 |
| 400       | `VALIDATION_ERROR`          | 필수 필드 누락            |

---

## 3. 사용자 프로필 (User Profile)

### 3.1 사용자 프로필 조회

사용자 이름으로 프로필을 조회한다. 인증 없이도 조회 가능하지만, 인증된 상태에서는 `isFollowed` 필드가 포함된다.

```
GET /users?name={name}
```

| 항목 | 값                               |
| ---- | -------------------------------- |
| 인증 | 선택 (인증 시 `isFollowed` 포함) |

**Query Parameters**

| 파라미터 | 타입     | 필수 | 설명               |
| -------- | -------- | ---- | ------------------ |
| `name`   | `string` | O    | 조회할 사용자 이름 |

**요청 예시**

```
GET /users?name=홍길동
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.xxxxx   (선택)
```

**Response 200 OK (인증된 상태)**

```json
{
  "user": {
    "name": "홍길동",
    "email": "student@bssm.hs.kr",
    "profileImageUrl": "https://cdn.jagalchi.com/profiles/1/avatar.webp",
    "bio": "부산소마고 소프트웨어개발과 2학년",
    "isFollowed": false,
    "stats": {
      "followersCount": 42,
      "followingCount": 18
    },
    "externalLinks": {
      "github": "https://github.com/honggildong",
      "blog": "https://blog.honggildong.dev"
    }
  },
  "streak": {
    "currentStreak": 7,
    "longestStreak": 30,
    "lastActiveDate": "2026-04-07"
  }
}
```

**Response 200 OK (비인증 상태)**

`isFollowed` 필드가 응답에 포함되지 않는다.

```json
{
  "user": {
    "name": "홍길동",
    "email": "student@bssm.hs.kr",
    "profileImageUrl": "https://cdn.jagalchi.com/profiles/1/avatar.webp",
    "bio": "부산소마고 소프트웨어개발과 2학년",
    "stats": {
      "followersCount": 42,
      "followingCount": 18
    },
    "externalLinks": {
      "github": "https://github.com/honggildong",
      "blog": "https://blog.honggildong.dev"
    }
  },
  "streak": {
    "currentStreak": 7,
    "longestStreak": 30,
    "lastActiveDate": "2026-04-07"
  }
}
```

**에러 케이스**

| 상태 코드 | 코드               | 설명                      |
| --------- | ------------------ | ------------------------- |
| 400       | `VALIDATION_ERROR` | `name` 파라미터 누락      |
| 404       | `USER_NOT_FOUND`   | 해당 이름의 사용자가 없음 |

---

### 3.2 프로필 수정

현재 로그인한 사용자의 프로필 정보를 수정한다.

```
PATCH /users/profile
```

| 항목         | 값                                               |
| ------------ | ------------------------------------------------ |
| 인증         | **필요** (`Authorization: Bearer <accessToken>`) |
| Content-Type | application/json                                 |

**Request Body**

| 필드                 | 타입     | 필수 | 설명                          |
| -------------------- | -------- | ---- | ----------------------------- |
| `user.profileImage`  | `string` | 선택 | 프로필 이미지 URL 또는 Base64 |
| `user.bio`           | `string` | 선택 | 자기소개                      |
| `user.externalLinks` | `object` | 선택 | 외부 링크 (key-value 형태)    |

변경하고 싶은 필드만 포함하면 된다. 포함하지 않은 필드는 변경되지 않는다.

```json
{
  "user": {
    "profileImage": "https://cdn.jagalchi.com/profiles/1/new-avatar.webp",
    "bio": "Flutter & Next.js 개발자",
    "externalLinks": {
      "github": "https://github.com/honggildong",
      "blog": "https://blog.honggildong.dev",
      "twitter": "https://x.com/honggildong"
    }
  }
}
```

**Response 200 OK**

```json
{
  "user": {
    "name": "홍길동",
    "email": "student@bssm.hs.kr",
    "profileImageUrl": "https://cdn.jagalchi.com/profiles/1/new-avatar.webp",
    "bio": "Flutter & Next.js 개발자",
    "stats": {
      "followersCount": 42,
      "followingCount": 18
    },
    "externalLinks": {
      "github": "https://github.com/honggildong",
      "blog": "https://blog.honggildong.dev",
      "twitter": "https://x.com/honggildong"
    }
  }
}
```

**에러 케이스**

| 상태 코드 | 코드                 | 설명                     |
| --------- | -------------------- | ------------------------ |
| 400       | `VALIDATION_ERROR`   | 잘못된 URL 형식 등       |
| 401       | `UNAUTHORIZED`       | 인증 토큰 없음 또는 만료 |
| 413       | `FILE_SIZE_EXCEEDED` | 프로필 이미지 크기 초과  |

---

## 4. 팔로우 (Follow)

### 4.1 팔로우 토글

특정 사용자를 팔로우하거나 언팔로우한다.

```
PATCH /users/{name}/follow
```

| 항목         | 값                                               |
| ------------ | ------------------------------------------------ |
| 인증         | **필요** (`Authorization: Bearer <accessToken>`) |
| Content-Type | application/json                                 |

**Path Parameters**

| 파라미터 | 타입     | 설명                          |
| -------- | -------- | ----------------------------- |
| `name`   | `string` | 팔로우/언팔로우할 사용자 이름 |

**Request Body**

| 필드     | 타입      | 필수 | 설명                                |
| -------- | --------- | ---- | ----------------------------------- |
| `toggle` | `boolean` | O    | `true` = 팔로우, `false` = 언팔로우 |

```json
{
  "toggle": true
}
```

**Response 200 OK**

```json
{
  "message": "팔로우 상태가 변경되었습니다.",
  "isFollowed": true
}
```

**에러 케이스**

| 상태 코드 | 코드               | 설명                             |
| --------- | ------------------ | -------------------------------- |
| 400       | `VALIDATION_ERROR` | 자기 자신을 팔로우하려는 경우 등 |
| 401       | `UNAUTHORIZED`     | 인증 토큰 없음 또는 만료         |
| 404       | `USER_NOT_FOUND`   | 대상 사용자가 없음               |

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "자기 자신을 팔로우할 수 없습니다.",
    "details": {},
    "timestamp": "2026-04-07T14:00:00"
  }
}
```

---

### 4.2 팔로워 목록 조회

특정 사용자의 팔로워 목록을 조회한다.

```
GET /users/{name}/followers
```

| 항목 | 값                                            |
| ---- | --------------------------------------------- |
| 인증 | 선택 (인증 시 각 사용자의 `isFollowing` 포함) |

**Path Parameters**

| 파라미터 | 타입     | 설명               |
| -------- | -------- | ------------------ |
| `name`   | `string` | 조회할 사용자 이름 |

**요청 예시**

```
GET /users/홍길동/followers
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.xxxxx   (선택)
```

**Response 200 OK**

```json
{
  "userId": 1,
  "type": "FOLLOWER",
  "totalCount": 42,
  "users": [
    {
      "id": 5,
      "name": "김철수",
      "profileImage": "https://cdn.jagalchi.com/profiles/5/avatar.webp",
      "isFollowing": true
    },
    {
      "id": 8,
      "name": "이영희",
      "profileImage": "https://cdn.jagalchi.com/profiles/8/avatar.webp",
      "isFollowing": false
    }
  ]
}
```

> `isFollowing`: 현재 로그인한 사용자가 해당 팔로워를 팔로우하고 있는지 여부. 비인증 상태에서는 항상 `false`이거나 필드가 생략될 수 있다.

**에러 케이스**

| 상태 코드 | 코드             | 설명                      |
| --------- | ---------------- | ------------------------- |
| 404       | `USER_NOT_FOUND` | 해당 이름의 사용자가 없음 |

---

### 4.3 팔로잉 목록 조회

특정 사용자의 팔로잉 목록을 조회한다.

```
GET /users/{name}/followings
```

| 항목 | 값                                            |
| ---- | --------------------------------------------- |
| 인증 | 선택 (인증 시 각 사용자의 `isFollowing` 포함) |

**Path Parameters**

| 파라미터 | 타입     | 설명               |
| -------- | -------- | ------------------ |
| `name`   | `string` | 조회할 사용자 이름 |

**요청 예시**

```
GET /users/홍길동/followings
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.xxxxx   (선택)
```

**Response 200 OK**

```json
{
  "userId": 1,
  "type": "FOLLOWING",
  "totalCount": 18,
  "users": [
    {
      "id": 3,
      "name": "박지민",
      "profileImage": "https://cdn.jagalchi.com/profiles/3/avatar.webp",
      "isFollowing": true
    },
    {
      "id": 12,
      "name": "최수연",
      "profileImage": "https://cdn.jagalchi.com/profiles/12/avatar.webp",
      "isFollowing": false
    }
  ]
}
```

> `isFollowing`: 현재 로그인한 사용자가 해당 사용자를 팔로우하고 있는지 여부.

**에러 케이스**

| 상태 코드 | 코드             | 설명                      |
| --------- | ---------------- | ------------------------- |
| 404       | `USER_NOT_FOUND` | 해당 이름의 사용자가 없음 |

---

## 5. JWT 토큰 구조

### Access Token

유효기간: **1시간**

```json
{
  "id": 1,
  "role": "STUDENT",
  "type": "ACCESS_TOKEN",
  "iat": 1743944096,
  "exp": 1743947696
}
```

### Refresh Token

유효기간: **7일** (HttpOnly 쿠키로 관리)

```json
{
  "id": 1,
  "role": "STUDENT",
  "type": "REFRESH_TOKEN",
  "iat": 1743944096,
  "exp": 1744548896
}
```

### 토큰 필드 설명

| 필드   | 타입     | 설명                                        |
| ------ | -------- | ------------------------------------------- |
| `id`   | `Long`   | 사용자 고유 ID                              |
| `role` | `string` | 사용자 역할 (`STUDENT`, `TEACHER`, `ADMIN`) |
| `type` | `string` | 토큰 타입 (`ACCESS_TOKEN`, `REFRESH_TOKEN`) |
| `iat`  | `number` | 토큰 발급 시간 (Unix timestamp)             |
| `exp`  | `number` | 토큰 만료 시간 (Unix timestamp)             |

### 알고리즘

- **HS512** (HMAC-SHA512)

### 프론트엔드 토큰 관리 가이드

```typescript
// Access Token 저장 (메모리 또는 상태 관리)
const [accessToken, setAccessToken] = useState<string | null>(null);

// API 요청 시 헤더에 포함
const api = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: true, // refreshToken 쿠키 전송을 위해 필수
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 401 응답 시 토큰 갱신
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const { data } = await api.patch('/users/auth/refresh');
        setAccessToken(data.accessToken);
        // 원래 요청 재시도
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(error.config);
      } catch {
        // Refresh Token도 만료 -> 로그아웃 처리
        setAccessToken(null);
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);
```

---

## 6. 역할 (Roles)

| 역할   | 코드      | 설명             |
| ------ | --------- | ---------------- |
| 학생   | `STUDENT` | 일반 학생 사용자 |
| 교사   | `TEACHER` | 교사 사용자      |
| 관리자 | `ADMIN`   | 시스템 관리자    |

---

## 7. 공통 에러 응답

### 에러 응답 형식

모든 에러는 아래 통일된 형식으로 반환된다.

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "사람이 읽을 수 있는 에러 설명",
    "details": {},
    "timestamp": "2026-04-07T12:34:56"
  }
}
```

### 필드 설명

| 필드              | 타입     | 설명                                   |
| ----------------- | -------- | -------------------------------------- |
| `error.code`      | `string` | 에러 코드 (프론트엔드에서 분기 처리용) |
| `error.message`   | `string` | 에러 설명 (사용자에게 표시 가능)       |
| `error.details`   | `object` | 추가 정보 (필드별 유효성 검사 결과 등) |
| `error.timestamp` | `string` | 에러 발생 시각 (ISO 8601)              |

### 유효성 검사 에러 예시 (400)

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력값이 올바르지 않습니다.",
    "details": {
      "email": "올바른 이메일 형식이 아닙니다.",
      "password": "비밀번호는 8자 이상이어야 합니다."
    },
    "timestamp": "2026-04-07T12:34:56"
  }
}
```

### 인증 에러 예시 (401)

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "인증이 필요합니다.",
    "details": {},
    "timestamp": "2026-04-07T12:34:56"
  }
}
```

### 토큰 만료 에러 예시 (401)

```json
{
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "Access Token이 만료되었습니다.",
    "details": {},
    "timestamp": "2026-04-07T12:34:56"
  }
}
```

### 권한 부족 에러 예시 (403)

```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "해당 작업을 수행할 권한이 없습니다.",
    "details": {
      "requiredRole": "ADMIN"
    },
    "timestamp": "2026-04-07T12:34:56"
  }
}
```

### 리소스 없음 에러 예시 (404)

```json
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "사용자를 찾을 수 없습니다.",
    "details": {
      "name": "존재하지않는유저"
    },
    "timestamp": "2026-04-07T12:34:56"
  }
}
```

### 리소스 충돌 에러 예시 (409)

```json
{
  "error": {
    "code": "DUPLICATE_EMAIL",
    "message": "이미 사용 중인 이메일입니다.",
    "details": {
      "email": "student@bssm.hs.kr"
    },
    "timestamp": "2026-04-07T12:34:56"
  }
}
```

### 서버 에러 예시 (500)

```json
{
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "서버 내부 오류가 발생했습니다.",
    "details": {},
    "timestamp": "2026-04-07T12:34:56"
  }
}
```

---

## 부록: 전체 플로우 요약

### 회원가입 플로우

```
1. POST /users/verification          (인증코드 발송)
2. PATCH /users/verification          (인증코드 검증)
3. POST /users                        (회원가입)
```

### 로그인 플로우

```
1. POST /users/auth/login             (로그인 -> accessToken + refreshToken 쿠키)
2. API 요청마다 Authorization 헤더에 accessToken 포함
3. 401 응답 시 PATCH /users/auth/refresh 로 토큰 갱신
```

### 비밀번호 변경 플로우

```
1. POST /users/auth/password-reset           (인증코드 발송)
2. PATCH /users/auth/password-reset/verify   (인증코드 검증)
3. PATCH /users/auth/password-reset          (비밀번호 변경)
```

### OAuth2 로그인 플로우

```
1. GET /users/auth/login/google (또는 /github)
2. 사용자가 외부 OAuth 페이지에서 로그인
3. 서버가 콜백 처리 후 프론트엔드로 리다이렉트 (토큰 포함)
```
