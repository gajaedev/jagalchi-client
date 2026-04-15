/**
 * Vitest 4.x removed forceExit. On Linux CI, open handles (Vite server, esbuild,
 * worker threads) keep the process alive indefinitely after tests complete.
 * This globalSetup teardown forces exit when running in CI.
 */
export async function teardown() {
  if (process.env.CI) {
    // Allow 1 s for reporters/coverage to flush, then hard-exit.
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    process.exit(0);
  }
}
