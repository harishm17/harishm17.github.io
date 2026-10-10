import { expect, test, type Page } from '@playwright/test';

async function box(page: Page, selector: string) {
  const b = await page.locator(selector).first().boundingBox();
  if (!b) throw new Error(`${selector} is not visible`);
  return b;
}

for (const vp of [{ width: 1440, height: 800 }, { width: 1280, height: 720 }]) {
  test(`desktop first screen at ${vp.width}x${vp.height}`, async ({ page }) => {
    await page.setViewportSize(vp);
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    for (const sel of ['.lede', 'h1', '.id-line', '.link-row', '.featured .section-title', '.featured .card:first-child .card-title']) {
      const b = await box(page, sel);
      expect(b.y + b.height, sel).toBeLessThanOrEqual(vp.height);
    }
  });
}

test('h1 sets in at most two lines at 1280px', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const lines = await page.locator('h1').evaluate((el) => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight)));
  expect(lines).toBeLessThanOrEqual(2);
});

test('mobile first screen at 390x844', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  for (const sel of ['.lede', 'h1', '.id-line', '.link-row']) {
    const b = await box(page, sel);
    expect(b.y + b.height, sel).toBeLessThanOrEqual(844);
  }
});

// A wrapped flex item would put its "·" separator at the start of a line. Either the whole ID line fits on
// one row with dots, or it is stacked with the dots off; nothing in between.
for (const width of [360, 390, 601, 640, 720, 768, 899, 900, 959, 960, 1024, 1280, 1440]) {
  test(`ID line never starts a line with a visible dot at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const items = await page.locator('.id-line > li').evaluateAll((lis) =>
      lis.map((li, i) => {
        const dot = getComputedStyle(li, '::before').content;
        return {
          top: Math.round(li.getBoundingClientRect().top),
          dotShown: i > 0 && dot !== 'none' && dot !== 'normal' && dot !== '""',
        };
      }),
    );
    expect(items).toHaveLength(2);
    items.forEach((item, i) => {
      if (i === 0 || !item.dotShown) return;
      expect(item.top, `item ${i + 1} starts a new line while its dot is shown`).toBe(items[i - 1].top);
    });
    if (width >= 1024) expect(items.slice(1).every((item) => item.dotShown), 'dots show when the line fits').toBe(true);
  });
}

// The intro links fit on one line from 360px up, with dots only where the line never wraps. hasTouch turns on
// pointer: coarse, so the .hit tap areas are live at every width and must not overlap.
test.describe('home link row on touch screens', () => {
  test.use({ hasTouch: true });
  for (const width of [320, 340, 360, 375, 390, 412, 601, 1024, 1440]) {
    test(`link row: one line from 360px, no line starts with a dot, tap areas apart at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await page.evaluate(() => document.fonts.ready);
      const items = await page.locator('.link-row > li').evaluateAll((lis) =>
        lis.map((li, i) => {
          const a = li.querySelector('a')!;
          const r = a.getBoundingClientRect();
          const after = getComputedStyle(a, '::after');
          const dy = -parseFloat(after.top);
          const dx = -parseFloat(after.left);
          const dot = getComputedStyle(li, '::before').content;
          return {
            top: Math.round(r.top),
            dotShown: i > 0 && dot !== 'none' && dot !== 'normal' && dot !== '""',
            tap: { left: r.left - dx, right: r.right + dx, top: r.top - dy, bottom: r.bottom + dy },
          };
        }),
      );
      expect(items).toHaveLength(4);
      expect(items[0].tap.bottom - items[0].tap.top, 'tap area height').toBeGreaterThanOrEqual(41);
      items.forEach((item, i) => {
        if (i === 0 || !item.dotShown) return;
        expect(item.top, `item ${i + 1} starts a new line while its dot is shown`).toBe(items[i - 1].top);
      });
      if (width >= 360) expect(new Set(items.map((item) => item.top)).size, 'links on one line').toBe(1);
      for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
          const [p, q] = [items[i].tap, items[j].tap];
          const apart = p.right <= q.left || q.right <= p.left || p.bottom <= q.top || q.bottom <= p.top;
          expect(apart, `tap areas of links ${i + 1} and ${j + 1} overlap`).toBe(true);
        }
      }
    });
  }
});
