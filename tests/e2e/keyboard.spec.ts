import { expect, test } from '@playwright/test';
import { contentPages } from './pages';

for (const path of contentPages()) {
  test(`keyboard: skip link first, then focus moves into main with a visible ring: ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.keyboard.press('Tab');
    await expect(page.locator('a.skip')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    // Pages whose main has nothing focusable (none after Task 2 except the temporary home) move on to the footer.
    const mainHasFocusable = (await page.locator('main a[href], main [tabindex="0"]').count()) > 0;
    const inMain = await focused.evaluate((el) => !!el.closest('main'));
    expect(inMain).toBe(mainHasFocusable);
    const outline = await focused.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).toBe('solid');
  });
}
