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

// One title size and one start line on every page, so moving between pages feels steady.
for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test(`every h1 has the same size and top at ${vp.width}x${vp.height}`, async ({ page }) => {
    await page.setViewportSize(vp);
    const titles: { path: string; size: string; y: number }[] = [];
    for (const path of ['/', '/work/', '/about/', '/404.html']) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const h1 = page.locator('h1');
      titles.push({ path, size: await h1.evaluate((el) => getComputedStyle(el).fontSize), y: (await h1.boundingBox())!.y });
    }
    for (const t of titles.slice(1)) {
      expect(t.size, t.path).toBe(titles[0].size);
      expect(Math.abs(t.y - titles[0].y), t.path).toBeLessThanOrEqual(1);
    }
  });
}

test('About photo ends on the nav line at 1440 and sits beside the story at 768', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/about/');
  await page.evaluate(() => document.fonts.ready);
  const photo = (await page.locator('.intro .photo').boundingBox())!;
  const nav = (await page.locator('.site-head nav').boundingBox())!;
  expect(Math.abs(photo.x + photo.width - (nav.x + nav.width))).toBeLessThanOrEqual(1);

  await page.setViewportSize({ width: 768, height: 900 });
  const tablet = (await page.locator('.intro .photo').boundingBox())!;
  const story = (await page.locator('.story').boundingBox())!;
  expect(tablet.width).toBe(160);
  expect(story.y).toBeLessThan(tablet.y + tablet.height);
  expect(story.x + story.width).toBeLessThanOrEqual(tablet.x);
});

/** Number of words on the element's last rendered line. */
async function wordsOnLastLine(page: import('@playwright/test').Page, selector: string) {
  return page.locator(selector).first().evaluate((el) => {
    const range = document.createRange();
    const tops: number[] = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      for (const m of (n.textContent ?? '').matchAll(/\S+/g)) {
        range.setStart(n, m.index!);
        range.setEnd(n, m.index! + m[0].length);
        const r = range.getClientRects()[0];
        if (r) tops.push(Math.round(r.top));
      }
    }
    return tops.filter((t) => Math.abs(t - tops.at(-1)!) <= 2).length;
  });
}

// text-wrap: pretty keeps a lone word ("code", "70%.") off the last line of the first Featured card.
for (const width of [390, 1024, 1280, 1440]) {
  test(`first Featured card has no one-word last line at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    for (const sel of ['.featured .card:first-child .card-title', '.featured .card:first-child .card-summary']) {
      expect(await wordsOnLastLine(page, sel), sel).toBeGreaterThan(1);
    }
  });
}
