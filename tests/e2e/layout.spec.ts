import { expect, test } from '@playwright/test';
import { TEXT_SPACING, WIDTHS, contentPages } from './pages';

async function overflow(page: import('@playwright/test').Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
}

for (const path of contentPages()) {
  test(`no horizontal scroll at any width: ${path}`, async ({ page }) => {
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(await overflow(page), `${path} at ${width}px`).toBeLessThanOrEqual(0);
    }
  });

  test(`no horizontal scroll with WCAG 1.4.12 text spacing at 320px: ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto(path);
    await page.addStyleTag({ content: TEXT_SPACING });
    await page.evaluate(() => document.fonts.ready);
    expect(await overflow(page)).toBeLessThanOrEqual(0);
  });

  test(`no rightwards-arrow characters in visible text: ${path}`, async ({ page }) => {
    await page.goto(path);
    expect(await page.evaluate(() => document.body.innerText)).not.toContain('→');
  });
}
