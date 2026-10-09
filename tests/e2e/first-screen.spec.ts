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
    for (const sel of ['.site-head .name', 'h1', '.id-line', '.link-row', '.band li.cell:nth-child(3) .sample', '.case-link']) {
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
  for (const sel of ['.site-head .name', 'h1', '.id-line', '.link-row', '.band li.cell:nth-child(1) .sample']) {
    const b = await box(page, sel);
    expect(b.y + b.height, sel).toBeLessThanOrEqual(844);
  }
  const second = await box(page, '.band li.cell:nth-child(2)');
  expect(second.y).toBeLessThan(844);
});

test('each band cell reads as one phrase in the accessibility tree', async ({ page }) => {
  await page.goto('/');
  const snap = await page.locator('.band').ariaSnapshot();
  expect(snap).toContain('Missed source tables');
  expect(snap).toContain('cut from 79 to 24');
  expect(snap).toContain('up from 0.54 to 0.68');
  expect(snap).not.toMatch(/text: "?79"?\s*$/m);
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
    expect(items).toHaveLength(3);
    items.forEach((item, i) => {
      if (i === 0 || !item.dotShown) return;
      expect(item.top, `item ${i + 1} starts a new line while its dot is shown`).toBe(items[i - 1].top);
    });
    if (width >= 1024) expect(items.slice(1).every((item) => item.dotShown), 'dots show when the line fits').toBe(true);
  });
}
