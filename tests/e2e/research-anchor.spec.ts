import { expect, test } from '@playwright/test';

test('/research/ lands on the research group of /work/', async ({ page }) => {
  await page.goto('/research/');
  await page.waitForURL(/\/work\/#research$/);
  await expect(page.locator('h2#research')).toBeVisible();
});

test('/contact/ lands on the Contact section of /about/', async ({ page }) => {
  await page.goto('/contact/');
  await page.waitForURL(/\/about\/#contact$/);
  await expect(page.locator('h2#contact')).toBeVisible();
});
