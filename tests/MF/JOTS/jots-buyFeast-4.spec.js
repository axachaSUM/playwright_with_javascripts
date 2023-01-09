import { test, expect } from '@playwright/test';
import { fillStripeInfo } from '../../utils/stripe';

import { login } from '../../utils/auth';

const randomEmail = () => {
  return `marko.jovancevic+testemail${Math.round(Math.random() * 10000)}@growthmill.com`;
}

test('JotS buy 4 people feast e2e test', async ({ page }) => {
    
    //navigate
    await page.goto("https://mfstaging.webflow.io//")

    await page.locator('.nav-link >> nth=3').click();

    await expect(page).toHaveURL('https://mfstaging.webflow.io/jewel-of-the-south');

    await page.locator('text=Reserve Your Feast', {timeout: 10000}).click();

    await page.waitForLoadState();

    await login(page, randomEmail());

    await page.waitForLoadState();

    await page.locator('[placeholder="Enter your zip..."]').fill('94114');

    await page.locator('button:has-text("Continue")').click();

    await page.locator('[placeholder="Allergies information"]').fill('NemamAlergiju');

    await page.locator('button:has-text("Next")').click();

  // Click button:has-text("Next")
  await page.locator('button:has-text("Next")').click();

  await page.getByPlaceholder('Select Feast date').click();
  await page.getByRole('option', { name: 'Choose Friday, December 30th, 2022' }).click();
  // Click text=Select Feast size
  await page.locator('text=Select Feast size').click();
  // Click #react-select-2-option-1
  await page.locator('#react-select-2-option-0').click();

  // Click button:has-text("Next")
  await page.locator('button:has-text("Next")').click();

  // Fill [placeholder="Enter your first name"]
  await page.locator('[placeholder="Enter your first name"]').fill('Marko');

  // Click [placeholder="Enter your last name"]
  await page.locator('[placeholder="Enter your last name"]').click();

  // Fill [placeholder="Enter your last name"]
  await page.locator('[placeholder="Enter your last name"]').fill('Jovancevic');

  // Click [placeholder="\(310\) 832-5016"]
  await page.locator('[placeholder="\\(310\\) 832-5016"]').click();

  // Fill [placeholder="\(310\) 832-5016"]
  await page.locator('[placeholder="\\(310\\) 832-5016"]').fill('800 444 4444');

  // Click button:has-text("Next")
  await page.locator('button:has-text("Next")').click();

  // Click [placeholder="Enter your address"]
  await page.locator('[placeholder="Enter your address"]').click();

  // Fill [placeholder="Enter your address"]
  await page.locator('[placeholder="Enter your address"]').fill('200 Ocean Avenue 94112');

  // Click text=200 Ocean Avenue
  await page.locator('text=200 Ocean Avenue').click();

  // Click [placeholder="Apt\, Suite\, Floor \#\, etc\."]
  await page.locator('[placeholder="Apt\\, Suite\\, Floor \\#\\, etc\\."]').click();

  // Fill [placeholder="Apt\, Suite\, Floor \#\, etc\."]
  await page.locator('[placeholder="Apt\\, Suite\\, Floor \\#\\, etc\\."]').fill('111');

  // Click textarea
  await page.locator('textarea').click();

  // Fill textarea
  await page.locator('textarea').fill('1233');

  // Click button:has-text("Submit")
  // await page.locator('text=Submit', {timeout: 10000 }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  // await page.waitForLoadState();

  // Click button:has-text("PAYMENT")
  // await page.locator('//*[@id="root"]/div[1]/div[3]/div/div/form/div/div[3]/div[2]/button').click();
  // await page.locator('button:has-text("PAYMENT")').click();
   await page.locator('text=PAYMENT', {timeout: 10000}).click();

  await page.waitForLoadState();

  await fillStripeInfo(page);

  // Click button:has-text("Submit")
  await page.locator('button:has-text("Submit")').click();

  // Click button:has-text("See all orders")
  await page.locator('button:has-text("See all orders")').click();
  
//   await new Promise((resolve) => setTimeout(resolve, 5000));
//   await page.reload();
//   await expect(page.getByText('Ordered')).toBeVisible();

  await expect(page).toHaveURL('https://frontend.staging.mfeast.io/member-account/my-feasts');

  await page.close();
});

