import { test, expect } from '@playwright/test';
import { fillStripeInfo } from '../utils/stripe';

test.setTimeout(1200000)

test('Login with old user', async ({ page, context, }) => {

  // const tab1 = await context.newPage();
  // await tab1.goto('https://www.fakemail.net/');
  // const mail = await tab1.evaluate(() => document.getElementById('email').innerHTML);


  await page.goto('https://mfstaging.webflow.io/');
  await page.getByRole('link', { name: 'reserve FEAST' }).nth(1).click();
  await page.getByRole('link', { name: 'Reserve your feast' }).first().click();
  await page.getByPlaceholder('Enter your email...').fill('mjtesterovic@gmail.com');
  await page.getByRole('button', { name: 'Continue' }).click();

  await page.goto('https://mail.google.com/mail/u/0/#inbox');
  await page.fill('#identifierId', 'mjtesterovic@gmail.com');
  await page.click('#identifierNext');
  await page.waitForSelector('input[type="password"]');
  await page.fill('input[type="password"]', 'Automationuser1991$');
  await page.locator('text=Next').click();
  await page.getByRole('button', { name: 'Refresh' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('link', { name: 'Your temporary Moveable Feast login code' }).first().click();
  const pagePromise = context.waitForEvent('page');
  await page.getByRole('link', { name: 'LOGIN' }).click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();

  await newPage.getByRole('link', { name: 'reserve feast' }).nth(0).click();
  
  await expect(newPage).toHaveURL('https://mfstaging.webflow.io/dirt-candy');

  await newPage.getByRole("link", { name: "Reserve your feast" }).first().click();

  await newPage.locator('[placeholder="Allergies information"]').fill('NemamAlergiju');

  await newPage.locator('button:has-text("Next")').click();

  await newPage.locator('button:has-text("Next")').click();
  // Click text=Select Feast size
  await newPage.locator('text=Select Feast size').click();
  // // Click #react-select-2-option-1
  await newPage.locator('#react-select-2-option-1').click();

  await newPage.locator('button:has-text("Next")').click();

  await newPage.waitForTimeout(2000);

  await newPage.locator('button:has-text("Next")').click();

  await newPage.waitForTimeout(2000);

  await newPage.locator("text=reed >> nth=0", { timeout: 10000 }).click();

  // await newPage.getByRole('heading', { name: 'reed' }).click();
  
  await newPage.locator("text=PAYMENT", { timeout: 10000 }).click();

  await fillStripeInfo(newPage);

  await newPage.getByRole("button", { name: "See all orders" }).click();

  // await newPage.locator('button:has-text("See all orders")').click();
  await expect(newPage).toHaveURL('https://frontend.staging.mfeast.io/member-account/account/my-feasts');
  
  await newPage.close();


});