import { expect, test } from '@playwright/test';

test('/research/ lands on the research group of /work/', async ({ page }) => {
  await page.goto('/research/');
  await page.waitForURL(/\/work\/#research$/);
  await expect(page.locator('h2#research')).toBeVisible();
  // scroll-margin-top keeps the heading off the top edge (1.5rem = 24px).
  await page.evaluate(() => document.fonts.ready);
  const y = (await page.locator('h2#research').boundingBox())!.y;
  expect(y).toBeGreaterThanOrEqual(20);
  expect(y).toBeLessThanOrEqual(28);
});

test('/contact/ lands on the Contact section of /about/', async ({ page }) => {
  await page.goto('/contact/');
  await page.waitForURL(/\/about\/#contact$/);
  await expect(page.locator('h2#contact')).toBeVisible();
});
