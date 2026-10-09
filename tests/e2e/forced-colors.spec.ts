import { expect, test } from '@playwright/test';

test('bars stay visible in forced colors (they are borders, not backgrounds)', async ({ browser }) => {
  const context = await browser.newContext({ forcedColors: 'active', viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto('/');
  const widths = await page.locator('.bars .track span').evaluateAll((els) => els.map((el) => getComputedStyle(el).borderTopWidth));
  expect(widths.length).toBe(6);
  for (const w of widths) expect(w).toBe('8px');
  await page.screenshot({ path: 'test-results/forced-colors-home.png' });
  await context.close();
});
