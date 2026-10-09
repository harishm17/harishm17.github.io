import { expect, test } from '@playwright/test';

// Spec 5.1: the results table must fit one desktop screen together with the title block.
for (const { width, height } of [
  { width: 1280, height: 720 },
  { width: 1440, height: 800 },
]) {
  test(`agent-retrieval results table ends above the fold at ${width}x${height}`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    await page.goto('/work/agent-retrieval/');
    await page.evaluate(() => document.fonts.ready);
    const box = await page.locator('#results').boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y + box!.height).toBeLessThanOrEqual(height);
    await context.close();
  });
}

test('side block and note sit in the left column on desktop and inline on mobile', async ({ browser }) => {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const d = await desktop.newPage();
  await d.goto('/work/agent-retrieval/');
  await d.evaluate(() => document.fonts.ready);
  const prose = await d.locator('.prose').boundingBox();
  const side = await d.locator('.side').boundingBox();
  const note = await d.locator('.prose .note').boundingBox();
  expect(side!.x + side!.width).toBeLessThanOrEqual(prose!.x);
  expect(note!.x + note!.width).toBeLessThanOrEqual(prose!.x);
  const para = await d.locator('.prose .note + p').boundingBox();
  expect(Math.abs(note!.y - para!.y)).toBeLessThanOrEqual(2);
  await desktop.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const m = await mobile.newPage();
  await m.goto('/work/agent-retrieval/');
  await m.evaluate(() => document.fonts.ready);
  const mProse = await m.locator('.prose').boundingBox();
  const mSide = await m.locator('.side').boundingBox();
  const mNote = await m.locator('.prose .note').boundingBox();
  expect(mSide!.x).toBeGreaterThanOrEqual(mProse!.x - 1);
  expect(mSide!.y + mSide!.height).toBeLessThanOrEqual(mProse!.y + 1);
  expect(mNote!.x).toBeGreaterThanOrEqual(mProse!.x - 1);
  await mobile.close();
});
