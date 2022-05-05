import { chromium } from '@playwright/test';
import { config as dotConfig } from 'dotenv';
import config from './playwright.config';

dotConfig({ path: '.env.playwright' });

module.exports = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`${config.use.baseURL}/`);
  await page.click('text=LogIn');

  await page.fill('input[type="email"]', process.env.LOGIN_USERNAME);
  await page.fill('input[type="password"]', process.env.LOGIN_PASSWORD);
  await page.click('button[type="submit"]');

  await page
    .context()
    .storageState({ path: 'tests/state.json' });
  await browser.close();
};
