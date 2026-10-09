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

// UX-12: the compact header keeps the name and nav on one line at every common phone width.
for (const width of [360, 375, 390, 412, 414, 428, 601]) {
  test(`header stays on one line at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/work/');
    await page.evaluate(() => document.fonts.ready);
    const name = (await page.locator('.site-head .name').boundingBox())!;
    const nav = (await page.locator('.site-head nav').boundingBox())!;
    expect(nav.y).toBeLessThan(name.y + name.height);
  });
}

// UX-15: all body text shares one measure (40rem = 640px at the default size).
for (const [path, selectors] of [
  ['/', ['.bio', '.card-summary']],
  ['/work/', ['.row-summary']],
  ['/work/agent-retrieval/', ['.side', '.prose']],
] as const) {
  test(`body text stays within one measure at 768px: ${path}`, async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    for (const selector of selectors) {
      const boxes = await page.locator(selector).evaluateAll((els) => els.map((el) => el.getBoundingClientRect().width));
      expect(boxes.length, selector).toBeGreaterThan(0);
      for (const width of boxes) expect(width, selector).toBeLessThanOrEqual(640);
    }
  });
}
