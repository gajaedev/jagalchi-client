# Figma Comparison Automation 테스트 시나리오

**테스트 일시**: 2026-01-23
**브랜치**: `feat/#100-figma-comparison-automation`

---

## 🎯 테스트 목표

1. **Figma Export**: 25개 variant가 제대로 export되는지
2. **Screenshot Capture**: Storybook 스크린샷이 정상 캡처되는지
3. **Image Comparison**: 이미지 비교가 작동하는지
4. **Report Generation**: HTML 리포트가 생성되는지
5. **전체 파이프라인**: 한 번에 실행되는지

---

## 📋 테스트 시나리오

### Scenario 1: 개별 단계 테스트 (권장)

**목적**: 각 스크립트가 독립적으로 작동하는지 확인

#### Step 1: Figma Export 테스트

**예상 결과**:

- ✅ 25개 variant 중 일부가 export됨 (rate limit 있음)
- ✅ `visual-tests/figma/*.png` 파일 생성
- ✅ 파일명이 `{ComponentName}-{Variant}.png` 형식

**실행 명령**:

```bash
cd /Users/justn/Projects/jagalchi-client

# 환경 변수 설정
export FIGMA_ACCESS_TOKEN=<your-figma-token>
export FIGMA_FILE_KEY=<your-figma-file-key>

# Export 실행
pnpm figma:export
```

**확인 사항**:

```bash
# 1. 몇 개 export 성공했는지
ls -l visual-tests/figma/*.png | wc -l

# 2. 파일명 확인
ls visual-tests/figma/

# 3. 이미지 크기 확인 (예: NodePropertiesPanel-Default.png)
file visual-tests/figma/NodePropertiesPanel-Default.png

# 예상 출력: PNG image data, 282 x 910, 8-bit/color RGBA
```

**성공 기준**:

- [ ] 최소 10개 이상 export 성공
- [ ] PNG 파일 정상 생성
- [ ] 파일명 형식 일치

---

#### Step 2: Storybook 스크린샷 테스트

**사전 준비**:

```bash
# 터미널 1: Storybook 실행
pnpm storybook

# 대기: Storybook이 http://localhost:6006에서 시작될 때까지 (약 20초)
```

**실행 명령** (터미널 2):

```bash
# Screenshot 캡처
pnpm figma:screenshots
```

**예상 결과**:

- ✅ 8개 스토리 캡처 성공
- ✅ `visual-tests/actual/*.png` 파일 생성
- ✅ 소문자 파일명 (예: `Nodepropertiespanel-Default.png`)

**확인 사항**:

```bash
# 1. 캡처된 스크린샷 개수
ls -l visual-tests/actual/*.png | wc -l

# 2. 파일 목록
ls visual-tests/actual/

# 3. 이미지 확인 (브라우저에서)
open visual-tests/actual/Nodepropertiespanel-Default.png
```

**성공 기준**:

- [ ] 8개 스크린샷 캡처 성공
- [ ] 파일 정상 생성
- [ ] 이미지에 컴포넌트가 제대로 렌더링됨

---

#### Step 3: 이미지 비교 테스트

**실행 명령**:

```bash
export FIGMA_ACCESS_TOKEN=<your-figma-token>
export FIGMA_FILE_KEY=<your-figma-file-key>

pnpm figma:compare
```

**예상 결과**:

- ✅ 자동 리사이징 메시지 출력
- ✅ 차이율 계산 (23% ~ 98% 예상)
- ✅ `visual-tests/diff/*.png` 생성
- ✅ `visual-tests/comparison-report.json` 생성

**확인 사항**:

```bash
# 1. Diff 이미지 개수
ls -l visual-tests/diff/*.png | wc -l

# 2. JSON 리포트 확인
cat visual-tests/comparison-report.json | jq '.results | length'

# 3. Diff 이미지 확인 (빨간색으로 차이 표시됨)
open visual-tests/diff/NodePropertiesPanel-Default.png
```

**성공 기준**:

- [ ] 비교 완료 (에러 없음)
- [ ] Diff 이미지 생성
- [ ] JSON 리포트 정상

---

#### Step 4: HTML 리포트 생성 테스트

**실행 명령**:

```bash
pnpm figma:report
```

**예상 결과**:

- ✅ `visual-tests/report.html` 생성
- ✅ 브라우저에서 자동 열림
- ✅ 3-column 레이아웃 (Figma | Actual | Diff)

**확인 사항**:

```bash
# 리포트 파일 존재 확인
ls -lh visual-tests/report.html

# 브라우저에서 열기
open visual-tests/report.html
```

**리포트에서 확인할 것**:

- [ ] Figma, Actual, Diff 이미지 모두 표시됨
- [ ] 차이율 표시됨 (예: "28.45% different")
- [ ] Pass/Fail 상태 표시됨
- [ ] 빨간색 차이점이 명확히 보임

**성공 기준**:

- [ ] HTML 리포트 정상 생성
- [ ] 브라우저에서 정상 렌더링
- [ ] 모든 이미지 표시됨

---

### Scenario 2: 전체 파이프라인 테스트 (원커맨드)

**목적**: 한 번에 모든 과정 실행

**실행 명령**:

```bash
cd /Users/justn/Projects/jagalchi-client

# 환경 변수
export FIGMA_ACCESS_TOKEN=<your-figma-token>
export FIGMA_FILE_KEY=<your-figma-file-key>

# 전체 파이프라인 (Storybook은 별도 실행 필요)
# 터미널 1
pnpm storybook

# 터미널 2 (Storybook 시작 후)
pnpm figma:test
```

**예상 결과**:

- ✅ Figma export → Screenshot → Compare → Report 자동 실행
- ✅ 최종 HTML 리포트 브라우저에서 열림

**성공 기준**:

- [ ] 에러 없이 전체 완료
- [ ] 리포트가 자동으로 열림

---

### Scenario 3: Rate Limit 테스트

**목적**: Figma API rate limit 확인 및 재시도

**실행 명령**:

```bash
# 첫 export (일부만 성공)
pnpm figma:export

# 1분 대기
sleep 60

# 재시도 (나머지 export)
pnpm figma:export
```

**예상 결과**:

- ✅ 첫 실행: 18-20개 성공, 5-7개 rate limit
- ✅ 재시도: 나머지 5-7개 성공

**성공 기준**:

- [ ] 총 25개 export 완료
- [ ] Rate limit 에러 정상 처리

---

### Scenario 4: Gap Analysis 검증

**목적**: 현재 구현과 Figma 디자인 차이 확인

**실행 명령**:

```bash
# 비교 후 리포트 확인
open visual-tests/report.html

# Gap analysis 문서 확인
open docs/figma-implementation-gap.md
```

**확인 사항**:

**NodePropertiesPanel**:

- [ ] 6색 팔레트가 없음 (현재: 단일 컬러 피커)
- [ ] 자료 섹션이 없음
- [ ] AI 생성/추천 텍스트 없음
- [ ] 한국어 → 영어 차이

**TextPropertiesPanel**:

- [ ] 컴포넌트 자체가 없음 (스크린샷 없음)

**EdgePropertiesPanel**:

- [ ] 라인 스타일 선택 없음
- [ ] 화살표 버튼 없음
- [ ] 두께 조절 없음

**성공 기준**:

- [ ] Gap analysis 문서와 리포트가 일치
- [ ] 차이점이 명확히 시각화됨

---

### Scenario 5: 자동 Variant 감지 테스트

**목적**: MCP sync가 제대로 작동했는지 확인

**실행 명령**:

```bash
# 매핑 파일 확인
cat scripts/figma-components.json | jq '.'
```

**확인 사항**:

```bash
# 1. 컴포넌트 개수
cat scripts/figma-components.json | jq '.components | length'
# 예상: 7

# 2. 총 variant 개수
cat scripts/figma-components.json | jq '[.components[].variants | length] | add'
# 예상: 25

# 3. EditorNodeSidebar variants 확인
cat scripts/figma-components.json | jq '.components[] | select(.componentName == "EditorNodeSidebar") | .variants'
# 예상: 4개 variants
```

**성공 기준**:

- [ ] 7개 컴포넌트 매핑됨
- [ ] 25개 variants 감지됨
- [ ] Node ID가 모두 있음 (PLACEHOLDER 아님)

---

## 🎬 권장 테스트 순서

### Phase 1: 기본 동작 확인

```bash
1. Scenario 1 - Step 1 (Figma Export)
2. Scenario 1 - Step 2 (Storybook Screenshot)
3. Scenario 1 - Step 3 (Image Comparison)
4. Scenario 1 - Step 4 (HTML Report)
```

### Phase 2: 통합 테스트

```bash
5. Scenario 2 (전체 파이프라인)
```

### Phase 3: 검증

```bash
6. Scenario 4 (Gap Analysis)
7. Scenario 5 (Variant Detection)
```

---

## 📊 예상 결과 요약

| 단계           | 입력                 | 출력             | 성공 기준     |
| -------------- | -------------------- | ---------------- | ------------- |
| **Export**     | Figma API + node IDs | 18-25 PNG files  | ≥10 files     |
| **Screenshot** | Storybook stories    | 8 PNG files      | 8 files       |
| **Compare**    | Figma + Actual       | Diff PNGs + JSON | 0 errors      |
| **Report**     | JSON                 | HTML file        | 브라우저 열림 |

---

## 🐛 예상 에러 및 해결

### Error 1: "FIGMA_ACCESS_TOKEN is required"

**해결**: 환경 변수 설정

```bash
export FIGMA_ACCESS_TOKEN=<your-figma-token>
export FIGMA_FILE_KEY=<your-figma-file-key>
```

### Error 2: "Storybook is not running"

**해결**: Storybook 먼저 실행

```bash
pnpm storybook  # 터미널 1
# 대기 후
pnpm figma:screenshots  # 터미널 2
```

### Error 3: "429 Too Many Requests"

**해결**: 1분 대기 후 재시도

```bash
sleep 60
pnpm figma:export
```

### Error 4: "Image dimensions don't match"

**해결**: 이미 해결됨 (sharp 라이브러리로 자동 리사이징)

- 확인: 콘솔에 "📐 Resizing to smaller dimensions" 메시지 출력

---

## ✅ 최종 체크리스트

테스트 완료 후 확인:

- [ ] Figma export: ≥10 files
- [ ] Screenshot capture: 8 files
- [ ] Image comparison: 0 errors
- [ ] HTML report: 브라우저 열림
- [ ] Gap analysis: 문서와 일치
- [ ] Variant detection: 25 variants
- [ ] Rate limit: 재시도 성공
- [ ] 전체 파이프라인: 한 번에 실행

---

## 📝 테스트 결과 기록 양식

```markdown
### 테스트 날짜: 2026-01-23

#### Scenario 1: 개별 단계

- Step 1 (Export): ✅/❌ - {개수}개 export
- Step 2 (Screenshot): ✅/❌ - {개수}개 캡처
- Step 3 (Compare): ✅/❌ - {에러 개수}개 에러
- Step 4 (Report): ✅/❌

#### Scenario 2: 전체 파이프라인

- 실행 결과: ✅/❌
- 소요 시간: {시간}

#### 발견된 이슈

1. {이슈 설명}
2. {이슈 설명}

#### 개선 필요 사항

1. {개선사항}
2. {개선사항}
```
