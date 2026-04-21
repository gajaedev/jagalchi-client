# Dual-Model Code Review: FINAL MERGED REPORT

## Finding Comparison

| File                                                                      | Line    | Severity   | Issue                                                                                                                     | Suggestion                                                                                          | Match         |
| ------------------------------------------------------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------- |
| src/api/client.ts                                                         | 39-43   | 🟡 Warning | Session/auth state depends on a client-set cookie flag (`jagalchi-session`), which is script-writable and can be spoofed. | Gate authenticated routes with server-verified session/JWT claims rather than a JS-set cookie flag. | ✅ Confirmed  |
| e2e/editor.spec.ts                                                        | 17-46   | 🟡 Warning | Core editor E2E flows are disabled with `test.fixme`.                                                                     | Stabilize fixtures and enable these tests in CI.                                                    | ✅ Confirmed  |
| e2e/viewer.spec.ts                                                        | 8-35    | 🟡 Warning | Viewer E2E flow is disabled with `test.fixme`.                                                                            | Seed viewer data reliably and enable test execution in CI.                                          | ✅ Confirmed  |
| e2e/auth.spec.ts                                                          | 120-141 | 🟡 Warning | Full registration E2E flow is disabled with `test.fixme`.                                                                 | Re-enable and enforce this scenario in CI.                                                          | ✅ Confirmed  |
| src/api/ai.ts                                                             | 32      | 🟡 Warning | `DemoResponse` uses `Record<string, any>`, weakening type guarantees.                                                     | Replace `any` with explicit response types or discriminated unions.                                 | 🟠 Codex-only |
| src/features/roadmap-editor/hooks/use-auto-save.ts                        | 66-67   | 🟡 Warning | Full `JSON.stringify` hashing of nodes/edges on autosave scales poorly with large graphs.                                 | Move to incremental dirty-state/version tracking instead of serializing full arrays.                | 🟠 Codex-only |
| src/components/MswProvider.tsx                                            | 13      | 🔵 Info    | Mock initialization can defer first render up to 3 seconds.                                                               | Use a visible loading fallback and explicit mock-init state handling.                               | 🟠 Codex-only |
| src/features/my-roadmaps/components/organisms/MyRoadmapsSidebar/index.tsx | 229-232 | 🟡 Warning | Search input has no explicit accessible label (placeholder-only).                                                         | Add `<label>` or `aria-label` for screen-reader clarity.                                            | 🟠 Codex-only |
| src/features/my-roadmaps/components/organisms/MyRoadmapsSidebar/index.tsx | 215     | 🔵 Info    | Profile avatar image lacks explicit alt text.                                                                             | Provide contextual alt text or explicitly mark as decorative.                                       | 🟠 Codex-only |
| src/features/roadmap-editor/hooks/use-auto-save.ts                        | 131-138 | 🟡 Warning | Broad catch swallows non-quota save errors silently.                                                                      | Surface failures with telemetry/user feedback for diagnosability.                                   | 🟠 Codex-only |
| src/features/roadmap-editor/hooks/use-realtime-sync.ts                    | 35-39   | 🔵 Info    | Invalid realtime payload parsing is silently ignored.                                                                     | Add structured logging/telemetry for malformed payloads.                                            | 🟠 Codex-only |
| src/lib/stomp-client.ts                                                   | 8-12    | 🟡 Warning | Missing `NEXT_PUBLIC_WS_URL` disables realtime in production with only a console warning.                                 | Add startup config validation and deployment health checks.                                         | 🟠 Codex-only |
| package.json                                                              | 5-26    | 🔵 Info    | No dedicated `typecheck` script reduces explicit CI enforcement of TS correctness.                                        | Add `typecheck` (`tsc --noEmit`) and require it in CI.                                              | 🟠 Codex-only |

## Top 10 Must-Fix

1. Remove client-cookie-based auth gating in `src/api/client.ts` and rely on server-verified auth state.
2. Re-enable editor E2E tests in `e2e/editor.spec.ts`.
3. Re-enable viewer E2E tests in `e2e/viewer.spec.ts`.
4. Re-enable full registration E2E tests in `e2e/auth.spec.ts`.
5. Replace `Record<string, any>` in `src/api/ai.ts` with strict response types.
6. Eliminate full-array `JSON.stringify` autosave hashing in `use-auto-save.ts`.
7. Stop swallowing non-quota autosave errors silently in `use-auto-save.ts`.
8. Add accessible labeling for search input in `MyRoadmapsSidebar`.
9. Add production startup validation for `NEXT_PUBLIC_WS_URL` in realtime configuration.
10. Introduce and enforce a CI `typecheck` step (`tsc --noEmit`).

## Ship/No-Ship Verdict

**No-Ship.** There are unresolved reliability and security-adjacent risks (client-writable auth gate, disabled core E2E flows, and silent failure paths in persistence/realtime code) that materially reduce confidence in production behavior. Shipping should be blocked until the must-fix items above are addressed, especially auth gating and restoration of end-to-end coverage for editor/viewer/registration.
