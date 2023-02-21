import { test, expect } from '@playwright/test';

import { gmailLogin } from '../utils/gmailLogin';

import { fillStripeInfo } from '../utils/stripe';


test.setTimeout(120000)

// test.use({ launchOptions: { slowMo: 2000 } });

test('Login with old user and buy feast', async ({ page, context, }) => {

  await page.goto("https://mfstaging.webflow.io//")

  await page.getByRole('link', { name: 'LIMITED RESERVATIONS OPEN NOW' }).click();

  await expect(page).toHaveURL('https://mfstaging.webflow.io/ernest');

  await page.getByRole('link', { name: 'LIMITED RESERVATIONS OPEN NOW' }).first().click();

  await page.waitForLoadState();

  await page.getByPlaceholder('Enter your email...').fill('mjtesterovic@gmail.com');

  await page.getByRole('button', { name: 'Continue' }).click();

  await gmailLogin(page);

  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('link', { name: 'Your temporary Moveable Feast login code' }).first().click();
  await page.waitForTimeout(1000);
  const pagePromise = context.waitForEvent('page');
  await page.getByRole('link', { name: 'LOGIN' }).click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();

  await newPage.getByRole('link', { name: 'LIMITED RESERVATIONS OPEN NOW' }).click();

  await expect(newPage).toHaveURL('https://mfstaging.webflow.io/ernest');

  await newPage.getByRole('link', { name: 'LIMITED RESERVATIONS OPEN NOW' }).first().click();

  await newPage.locator('[placeholder="Allergies information"]').fill('NemamAlergiju');

  await newPage.locator('button:has-text("Next")').click();

  await newPage.locator('text=Select Feast size').click()
  
  await newPage.locator('#react-select-2-option-1').click();

  await newPage.locator('button:has-text("Next")').click();

  await newPage.getByPlaceholder('Enter your first name').fill('MJ');
  await newPage.getByPlaceholder('Enter your last name').fill('Testerovic');
  await newPage.getByPlaceholder('(310) 832-5016').fill('800 444 4444');
  await expect(newPage.locator('input[name=email]')).toHaveValue('mjtesterovic@gmail.com');
  await newPage.getByRole('button', { name: 'Next' }).click();

  await newPage.waitForTimeout(2000);

  await newPage.locator("text=san francisco >> nth=0", { timeout: 10000 }).click();

  await newPage.locator("text=PAYMENT", { timeout: 10000 }).click();

  await fillStripeInfo(newPage);

  await newPage.getByRole("button", { name: "See all orders" }).click();

  await expect(newPage).toHaveURL('https://frontend.staging.mfeast.io/member-account/account/my-feasts');

  await newPage.close();


});