import { expect, test } from '@playwright/test';
import { contentPages } from './pages';

for (const path of contentPages()) {
  test(`200% root text size: no horizontal scroll on ${path}`, async ({ page }) => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      await page.addStyleTag({ content: 'html{font-size:200%!important}' });
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), `${path} at ${width}`).toBeLessThanOrEqual(0);
    }
  });
}
