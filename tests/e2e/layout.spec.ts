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
  ['/404.html', ['.nf-body']],
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

// On phones the footer links wrap in a row: Resume, GitHub and LinkedIn on one line, the address on the next.
for (const width of [320, 390]) {
  test(`footer links wrap in a row at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const tops = await page.locator('.foot-links > li').evaluateAll((lis) => lis.map((li) => Math.round(li.getBoundingClientRect().top)));
    expect(tops).toHaveLength(4);
    expect(new Set(tops.slice(0, 3)).size).toBe(1);
    expect(tops[3]).toBeGreaterThan(tops[0]);
  });
}

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

// A lone word ("code", "70%.") stays off the last line of the first Featured card: text-wrap: pretty does it
// for the summary, and a no-break space between the last two words does it for the title.
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

/** Every element matching the selector that wraps and ends on a line of one word, as its text. */
async function oneWordLastLines(page: import('@playwright/test').Page, selector: string) {
  return page.locator(selector).evaluateAll((els) =>
    els.flatMap((el) => {
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
      const last = tops.filter((t) => Math.abs(t - tops.at(-1)!) <= 2).length;
      return last === 1 && tops.length > 1 ? [(el.textContent ?? '').replace(/\s+/g, ' ').trim()] : [];
    }),
  );
}

// The .hit tap area is an absolutely positioned box, and Chrome skips text-wrap: pretty in any block that holds
// one, so linked titles can't count on it. hasTouch turns on pointer: coarse, which makes the tap areas live at
// every width, as on a phone, touch tablet or touch laptop.
test.describe('linked titles on touch screens', () => {
  test.use({ hasTouch: true });
  for (const width of [320, 360, 375, 1024, 1440]) {
    test(`no title ends on a one-word line at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const [path, selectors] of [
        ['/', ['.card-title', '.row-title']],
        ['/work/', ['.row-title']],
        ['/work/agent-retrieval/', ['.writeup-next']],
        ['/work/llm-evaluation/', ['.writeup-next']],
      ] as const) {
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        const position = await page.locator(`${selectors[0]} a.hit`).first().evaluate((a) => getComputedStyle(a).position);
        expect(position, `${path}: the tap areas are on`).toBe('relative');
        for (const sel of selectors) expect(await oneWordLastLines(page, sel), `${path} ${sel}`).toEqual([]);
      }
    });
  }
});
