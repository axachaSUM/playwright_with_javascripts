import { test, expect } from '@playwright/test';
import { login } from '../utils/auth';
import { fillStripeInfo } from '../utils/stripe';
import { deliveryAddress } from '../utils/deliveryAddress';
import { deliveryContact } from '../utils/deliveryContact';

test.setTimeout(1200000)


const randomEmail = () => {
    return `marko.jovancevic+testemail${Math.round(Math.random() * 10000)}@growthmill.com`;
    }

test('Casia bug on prod', async ({ page }) => {

  await page.goto('https://mfstaging.webflow.io/');
  await page.getByRole('link', { name: 'reserve feast' }).nth(1).click();
  await page.getByRole('link', { name: 'Reserve your feast' }).first().click();

  const email = randomEmail();

  await login(page, email);

  await page.getByPlaceholder('Enter your zip...').fill('20001');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByPlaceholder('Allergies information').fill('NoAllergie');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('text=Select Feast size').click();
  await page.locator('#react-select-2-option-2').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await deliveryContact(page, email);

  await deliveryAddress(page);
  
  await page.getByPlaceholder('Gift Card').fill('stubbs');
  await page.getByRole('button', { name: 'Apply' }).click();

  await expect(page.getByText('total$1145.99')).toBeVisible();

  await page.getByRole('paragraph').filter({ hasText: 'Back' }).click();
  await page.getByRole('paragraph').filter({ hasText: 'Back' }).click();
  await page.getByRole('paragraph').filter({ hasText: 'Back' }).click();
  await page.locator('form').getByText('12 people').click();  
  await page.locator('#react-select-5-option-1').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(1000);
  await page.getByText('20000 Kingwood Drive, Porter, TX, 77339').click();

  await page.waitForLoadState();

  await expect(page.getByText('DIRT CANDY | 8 PEOPLE$770')).toBeVisible();

  await page.getByRole('button', { name: 'PAYMENT' }).click();

  await page.waitForLoadState();

  await fillStripeInfo(page);

  await page.locator('text=See all orders', {timeout: 10000}).click();
  
  await expect(page).toHaveURL('https://frontend.staging.mfeast.io/member-account/my-feasts');
  
});