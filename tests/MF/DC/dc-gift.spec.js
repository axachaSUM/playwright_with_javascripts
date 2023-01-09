import { test, expect } from '@playwright/test';
import { login } from '../../utils/auth';
 
const randomEmail = () => {
    return `marko.jovancevic+testemail${Math.round(Math.random() * 10000)}@growthmill.com`;
}

test('Buy Dirty Candy Feast Gift', async ({ page }) => {
    await page.goto("https://mfstaging.webflow.io//")

    // click on send a gift button
    await page.frameLocator('#iframe-button-send-a-gift-navigation').locator('button:has-text("Send a gift")').click();

    await login(page, randomEmail());

    await expect(page).toHaveURL('https://frontend.staging.mfeast.io/gift-checkout');

    await page.waitForLoadState();

    await page.locator('text=DIRT CANDY FEAST').click();

    await page.locator('[placeholder="Recipient email address"]').fill('marko.jovancevic@growthmill.com');

    await page.locator('[placeholder="Recipient name"]').fill('MJ Testerovic');

    await page.locator('button:has-text("Continue")').click();
  // Click button:has-text("PAYMENT")
    await page.waitForLoadState();
  // await page.locator('.p-CardNumberInput >> nth=0').fill('5555555555554444');
   await page.frameLocator('.StripeElement iframe').locator('#Field-numberInput').fill('5555555555554444');

  // Fill [placeholder="MM \/ YY"]
  await page.frameLocator('.StripeElement iframe').locator('[placeholder="MM \\/ YY"]').fill('05 / 25');

  // Fill [placeholder="CVC"]
  await page.frameLocator('.StripeElement iframe').locator('[placeholder="CVC"]').fill('123');

  // Click button:has-text("Submit")
  await page.locator('button:has-text("Submit")').click();


  await expect(page.getByText('Confirmation!')).toBeVisible();
  
  await expect(page.getByText('Thank you for purchasing a gift. You will receive an email confirmation and the gift card will be sent to the recipient email address you have previously provided.')).toBeVisible();

  await page.locator('button:has-text("Explore feasts")').click();

  await page.close();
});