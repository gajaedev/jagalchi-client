# Jagalchi Client Codebase Review (Track A, Codex default model)

## 1. TypeScript Safety

| File          | Line | Severity   | Issue                                                                                                      | Suggestion                                                                             |
| ------------- | ---- | ---------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| src/api/ai.ts | 32   | 🟡 Warning | `DemoResponse` is typed as `Record<string, any>`, which weakens compile-time guarantees for API consumers. | Replace `any` with a discriminated union or concrete response interfaces per endpoint. |

## 2. Security

| File              | Line | Severity   | Issue                                                                                                                                   | Suggestion                                                                                                            |
| ----------------- | ---- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| src/api/client.ts | 43   | 🟡 Warning | Client-side writable `jagalchi-session` cookie is used as a session flag for middleware checks, so it can be forged by injected script. | Avoid trusting a JS-set cookie for auth gating; derive route protection from server-verified session/JWT claims only. |

## 3. Performance

| File                                               | Line  | Severity   | Issue                                                                                                           | Suggestion                                                                                                            |
| -------------------------------------------------- | ----- | ---------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| src/features/roadmap-editor/hooks/use-auto-save.ts | 66-67 | 🟡 Warning | `JSON.stringify` runs on full node/edge arrays for change detection, which scales poorly as roadmap size grows. | Use incremental change tracking (version counters/hash updates on mutation) instead of full serialization each cycle. |
| src/components/MswProvider.tsx                     | 13    | 🔵 Info    | Rendering can be delayed up to 3 seconds while waiting for mock initialization timeout.                         | In mock mode, show a lightweight loading fallback and fail fast with explicit init status.                            |

## 4. a11y

| File                                                                      | Line    | Severity   | Issue                                                                                                          | Suggestion                                                                                                  |
| ------------------------------------------------------------------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| src/features/my-roadmaps/components/organisms/MyRoadmapsSidebar/index.tsx | 229-232 | 🟡 Warning | Search input relies on placeholder text only and has no explicit accessible label.                             | Add a visible `<label>` or `aria-label` describing the field purpose.                                       |
| src/features/my-roadmaps/components/organisms/MyRoadmapsSidebar/index.tsx | 215     | 🔵 Info    | `AvatarImage` is rendered without an explicit `alt` text, reducing screen-reader context for profile identity. | Provide meaningful alt text (for example, `${userName} profile image`) or mark it decorative intentionally. |

## 5. Test Coverage

| File               | Line    | Severity   | Issue                                                                  | Suggestion                                                                    |
| ------------------ | ------- | ---------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| e2e/editor.spec.ts | 17-46   | 🟡 Warning | Core editor E2E scenarios are disabled with `test.fixme`.              | Implement/fix fixtures and re-enable these scenarios in CI.                   |
| e2e/viewer.spec.ts | 8-35    | 🟡 Warning | Viewer E2E scenario is disabled with `test.fixme`.                     | Seed viewer data reliably and enable the test to protect critical read flows. |
| e2e/auth.spec.ts   | 120-141 | 🟡 Warning | End-to-end registration completion flow is disabled with `test.fixme`. | Stabilize final-step assertions and run this path in CI.                      |

## 6. Code Quality

| File                                                   | Line    | Severity   | Issue                                                                                        | Suggestion                                                                           |
| ------------------------------------------------------ | ------- | ---------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| src/features/roadmap-editor/hooks/use-auto-save.ts     | 131-138 | 🟡 Warning | Broad `catch` swallows non-quota failures silently, making save issues hard to detect/debug. | Surface non-quota errors through app-level logging/telemetry and user feedback.      |
| src/features/roadmap-editor/hooks/use-realtime-sync.ts | 35-39   | 🔵 Info    | Invalid ACK/NACK payload parsing errors are silently ignored in multiple handlers.           | Add structured debug telemetry for malformed server messages to improve operability. |

## 7. Prod Readiness

| File                    | Line | Severity   | Issue                                                                                                           | Suggestion                                                                                          |
| ----------------------- | ---- | ---------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| src/lib/stomp-client.ts | 8-12 | 🟡 Warning | In production, missing `NEXT_PUBLIC_WS_URL` disables real-time features with only a console warning.            | Add startup health checks or fail-fast configuration validation in production deployment pipelines. |
| package.json            | 5-26 | 🔵 Info    | No dedicated `typecheck` script is defined, reducing explicit CI visibility for strict TypeScript verification. | Add a `typecheck` script (e.g., `tsc --noEmit`) and run it in CI before deploy.                     |
