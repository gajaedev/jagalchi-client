import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, type TestInfo } from '@playwright/test';

/**
 * axe-core 를 주입해 현재 페이지의 WCAG 2.1 A/AA 위반을 감사.
 * serious / critical 이슈는 실패, 나머지는 리포트에 첨부하여 경고 수준.
 */
export async function assertNoA11yViolations(
  page: Page,
  testInfo: TestInfo,
  options: { label?: string; failOn?: Array<'minor' | 'moderate' | 'serious' | 'critical'> } = {},
) {
  const { label = 'page', failOn = ['serious', 'critical'] } = options;

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  await testInfo.attach(`axe-${label}`, {
    contentType: 'application/json',
    body: JSON.stringify(results, null, 2),
  });

  const blocking = results.violations.filter((v) =>
    failOn.includes((v.impact ?? 'minor') as 'minor' | 'moderate' | 'serious' | 'critical'),
  );

  expect(blocking, `a11y violations on ${label}`).toEqual([]);
}
