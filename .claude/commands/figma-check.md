주어진 Figma URL의 디자인과 실제 코드를 비교해서 수정 목록을 출력한다.

## 인자

`$ARGUMENTS` — Figma URL (필수)

URL 없으면 중단하고 사용 방법 안내:

```
사용법: /figma-check <figma-url>
예시:   /figma-check https://www.figma.com/design/...
```

## 실행 순서

### 1. Figma 디자인 읽기

`mcp__claude_ai_Figma__get_design_context`로 URL에서 fileKey와 nodeId 파싱 후 호출.

수집할 정보:

- 컴포넌트 이름
- 색상 (fill, stroke, background)
- 간격 (padding, gap, margin)
- 타이포그래피 (font-size, font-weight, line-height)
- 크기 (width, height)
- border-radius, shadow

### 2. 관련 코드 찾기

컴포넌트 이름 기반으로 `src/features/`, `src/components/`에서 관련 파일 탐색.

### 3. 스펙 vs 코드 비교

Figma 스펙과 실제 코드를 항목별로 비교. Tailwind 클래스 → px 변환 포함:

- `p-3` = 12px, `p-2` = 8px
- `text-sm` = 14px, `text-base` = 16px
- `gap-4` = 16px
- 등

### 4. 결과 출력

아래 형식으로 출력:

```
## Figma vs 코드 비교: {컴포넌트명}

### ❌ 불일치 ({n}개)
| 항목 | Figma | 코드 | 위치 |
|------|-------|------|------|
| padding | 8px | p-3 (12px) | ComponentName/index.tsx:24 |
| color | #2563EB | blue-500 (#3B82F6) | ComponentName/index.tsx:31 |

### ✅ 일치 ({n}개)
- font-size 16px, border-radius 8px, ...

### 수정 필요 파일
- src/features/.../ComponentName/index.tsx
```

### 5. 시각적 비교 이미지 생성

관련 Storybook story ID를 찾아서 (없으면 story-id 생략) 아래 명령 실행:

```bash
pnpm figma:snapshot \
  --file-key {fileKey} \
  --node-id {nodeId} \
  --story-id {storybookStoryId} \
  --name {componentName}
```

- `FIGMA_ACCESS_TOKEN` 없으면 Figma 스크린샷 스킵 (자동)
- Storybook 꺼져 있거나 story 없으면 실제 스크린샷 스킵 (자동)
- 결과: `/tmp/figma-check-{name}.png` 자동으로 열림
  - 양쪽 다 있으면: 왼쪽 Figma / 오른쪽 실제 구현 side-by-side
  - 한쪽만 있으면: 그것만 저장

### 6. 수정 여부 확인

불일치 항목이 있으면 물어보기:

> 위 항목들을 지금 수정할까요?

- **수정하면**: 불일치 항목 코드 수정 → `pnpm lint` → `pnpm figma:test` (Storybook 실행 중인 경우)
- **수정 안 하면**: 결과만 출력하고 종료
