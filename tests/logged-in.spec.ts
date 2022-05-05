import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/state.json' });

test('should be logged in and show starting page', async ({
  page,
  baseURL,
}) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto(baseURL);
  // The new page should contain an h1
  // with some text and user name
  await expect(page.locator(':nth-match(h1, 1)')).toContainText('top headline');
  await expect(page.locator(':nth-match(h1, 1)')).toContainText(
    process.env.LOGIN_USERNAME,
  );
});
