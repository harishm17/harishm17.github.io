import { expect, test } from '@playwright/test';

const CASES: [string, RegExp][] = [
  ['/experience/', /\/work\/$/],
  ['/projects/', /\/work\/$/],
  ['/research/', /\/work\/#research$/],
  ['/skills/', /\/about\/$/],
  ['/certifications/', /\/about\/$/],
  ['/leadership/', /\/about\/#outside$/],
  ['/hobbies/', /\/about\/#outside$/],
  ['/contact/', /\/about\/#contact$/],
];

for (const [from, to] of CASES) {
  test(`old link ${from} lands on the new page`, async ({ page }) => {
    await page.goto(from);
    await page.waitForURL(to);
    expect(page.url()).toMatch(to);
  });
}
