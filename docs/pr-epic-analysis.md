# PR → Epic 매핑 분석

**분석 일시**: 2026-01-23

---

## 🎯 Epic #84: Editor Enhancements

**Main PR**: #109 (feat/#84-editor-enhancements-epic)

### ✅ Epic에 포함될 Sub-Issue PR들 (8개)

| PR   | Issue | 제목                                        | 상태 | Epic 포함 |
| ---- | ----- | ------------------------------------------- | ---- | --------- |
| #108 | #98   | Multi-select improvements with mixed states | OPEN | ✅ YES    |
| #107 | #97   | Interaction preview with context menu       | OPEN | ✅ YES    |
| #106 | #96   | AI forms and loading states                 | OPEN | ✅ YES    |
| #105 | #95   | AI modal infrastructure                     | OPEN | ✅ YES    |
| #104 | #94   | Property panels and base components         | OPEN | ✅ YES    |
| #103 | #92   | Header & toolbar refinements                | OPEN | ✅ YES    |
| #102 | #91   | Design system foundation                    | OPEN | ✅ YES    |
| #101 | #93   | Quick wins - handle size and initial node   | OPEN | ✅ YES    |

**Epic PR #109 설명**:

> "이 PR은 로드맵 에디터의 전반적인 UI/UX를 개선하는 Epic 브랜치입니다. 8개의 서브 이슈를 완료하여 머지하였습니다."

---

## 🔧 독립 기능 PR들 (2개)

| PR   | Issue | 제목                               | 상태 | Epic 포함    |
| ---- | ----- | ---------------------------------- | ---- | ------------ |
| #111 | #100  | Figma design comparison automation | OPEN | ❌ NO (독립) |
| #90  | #90   | Visual testing setup               | OPEN | ❌ NO (독립) |

### PR #111 - Figma Comparison Automation

- **목적**: Figma 디자인과 구현 자동 비교
- **기능**: Export → Screenshot → Compare → Report
- **Epic과 무관**: 별도 자동화 인프라

### PR #90 - Visual Testing Setup

- **목적**: Playwright 기반 visual regression testing
- **기능**: 에디터 컴포넌트 스크린샷 자동 캡처
- **Epic과 무관**: 테스트 인프라

---

## 📊 요약

### Epic #84 구성 (9개 PR)

```
PR #109 (Epic Main)
 ├─ PR #101 (#93) - Quick wins
 ├─ PR #102 (#91) - Design system
 ├─ PR #103 (#92) - Header & toolbar
 ├─ PR #104 (#94) - Property panels
 ├─ PR #105 (#95) - AI modal infrastructure
 ├─ PR #106 (#96) - AI forms
 ├─ PR #107 (#97) - Interaction preview
 └─ PR #108 (#98) - Multi-select
```

### 독립 PR (2개)

- PR #111 (#100) - Figma automation
- PR #90 (#90) - Visual testing

---

## 🎬 머지 순서 권장

### Phase 1: Epic Sub-Issues 먼저 머지

```bash
1. PR #101 (#93) - Quick wins (기본)
2. PR #102 (#91) - Design system (토대)
3. PR #103 (#92) - Header & toolbar
4. PR #104 (#94) - Property panels
5. PR #105 (#95) - AI modal infrastructure
6. PR #106 (#96) - AI forms
7. PR #107 (#97) - Interaction preview
8. PR #108 (#98) - Multi-select
```

### Phase 2: Epic Main 머지

```bash
9. PR #109 (Epic #84) - Editor Enhancements (모든 sub-issue 포함)
```

### Phase 3: 독립 PR 머지

```bash
10. PR #90 (#90) - Visual testing
11. PR #111 (#100) - Figma automation
```

---

## ✅ Epic에 올려도 되는 PR

**YES (8개)**:

- #108, #107, #106, #105, #104, #103, #102, #101

**NO (2개)**:

- #111 (Figma automation - 독립 기능)
- #90 (Visual testing - 테스트 인프라)

---

## 💡 주의사항

### Epic PR #109

- Sub-issue PR들이 **모두 머지되어야** epic 브랜치에 반영됨
- Epic PR은 **마지막에 머지** (sub-issue들 먼저)

### Conflict 가능성

- 8개 PR이 동시에 열려있어 conflict 발생 가능
- 순차적으로 머지 권장

### Figma Automation (#111)

- Epic과 무관하지만 **우선 머지 가능**
- 다른 PR들과 충돌 없음 (독립적인 scripts/ 폴더)

### Visual Testing (#90)

- Epic과 무관하지만 **먼저 머지 가능**
- Playwright 기반 인프라 (독립)
