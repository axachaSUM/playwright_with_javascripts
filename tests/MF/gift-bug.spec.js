// import { test, expect } from '@playwright/test';
// import { fillStripeInfo } from '../../utils/stripe';
// import { login } from '../../utils/auth';

// const randomEmail = () => {
//     return `marko.jovancevic+testemail${Math.round(Math.random() * 10000)}@growthmill.com`;
//     }

// test('Casia bug on prod', async ({ page }) => {

//   await page.goto('https://mfstaging.webflow.io/');
//   await page.getByRole('link', { name: 'reserve feast' }).nth(1).click();
//   await page.getByRole('link', { name: 'Reserve your feast' }).first().click();

//   await login(page, randomEmail());

//   await page.getByPlaceholder('Enter your zip...').fill('20001');
//   await page.getByRole('button', { name: 'Continue' }).click();
//   await page.getByPlaceholder('Allergies information').fill('NoAllergie');
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.locator('text=Select Feast size').click();
//   await page.locator('#react-select-2-option-2').click();
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByPlaceholder('Enter your first name').fill('MJ');
//   await page.getByPlaceholder('Enter your last name').fill('Testerovic');
//   await page.getByPlaceholder('(310) 832-5016').fill('800 444 4444');
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByPlaceholder('Enter your address').fill('2000');
//   await page.getByPlaceholder('Enter your address').fill('20000');
//   await page.getByText('20000 Kingwood Drive Kingwood, TX, USA').click();
//   await page.getByPlaceholder('Apt, Suite, Floor #, etc.').fill('apt 123');
//   await page.getByPlaceholder('Building access code, parking suggestions, etc').fill('special');
//   await page.waitForTimeout(1000);
//   await page.getByRole('button', { name: 'Submit' }).click();
  
//   await page.getByPlaceholder('Gift Card').fill('stubbs');
//   await page.getByRole('button', { name: 'Apply' }).click();

//   await expect(page.getByText('total$1139.40')).toBeVisible();

//   await page.getByRole('paragraph').filter({ hasText: 'Back' }).click();
//   await page.getByRole('paragraph').filter({ hasText: 'Back' }).click();
//   await page.getByRole('paragraph').filter({ hasText: 'Back' }).click();
//   await page.locator('form').getByText('12 people').click();
//   await page.locator('#react-select-5-option-1').click();
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.waitForTimeout(1000);
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.waitForTimeout(1000);
//   await page.getByText('20000 Kingwood Drive, Porter, TX, 77339').click();

//   await page.waitForLoadState();

//   await expect(page.getByText('DIRT CANDY | 8 PEOPLE$770')).toBeVisible();

//   await page.getByRole('button', { name: 'PAYMENT' }).click();

//   await page.waitForLoadState();

//   await fillStripeInfo(page);

//   await page.locator('text=See all orders', {timeout: 10000}).click();
  
//   await expect(page).toHaveURL('https://frontend.staging.mfeast.io/member-account/my-feasts');
  
// });