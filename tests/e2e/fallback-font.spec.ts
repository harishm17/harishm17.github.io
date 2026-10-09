import { expect, test } from '@playwright/test';
import { contentPages } from './pages';

test.beforeEach(async ({ page }) => {
  await page.route(/\.(woff2?|ttf)(\?.*)?$/, (route) => route.abort());
});

for (const path of contentPages()) {
  test(`fallback font keeps ${path} free of horizontal scroll at 390 and 1440`, async ({ page }) => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
    }
  });
}

test('fallback font keeps the home h1 at two lines at 1280px', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  const lines = await page.locator('h1').evaluate((el) => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight)));
  expect(lines).toBeLessThanOrEqual(2);
});
