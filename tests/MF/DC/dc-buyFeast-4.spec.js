import { test, expect } from '@playwright/test';
import { fillStripeInfo } from '../../utils/stripe';
import { login } from '../../utils/auth';
import { deliveryContact } from '../../utils/deliveryContact';
import { deliveryAddress } from '../../utils/deliveryAddress';

const randomEmail = () => {
    return `marko.jovancevic+testemail${Math.round(Math.random() * 10000)}@growthmill.com`;
}

test('DC buy 4 people feast e2e test', async ({ page }) => {

    //navigate
    await page.goto("https://mfstaging.webflow.io//")

    await page.getByRole('link', { name: 'Learn more' }).nth(1).click();

    await expect(page).toHaveURL('https://mfstaging.webflow.io/dirt-candy');

    await page.getByRole('link', { name: 'Reserve your feast' }).first().click();

    await page.waitForLoadState();

    const email = randomEmail();

    await login(page, email);

    await page.waitForLoadState();

    // removed zip code valadtion i will leave it here just in case i need it again
    // // await page.locator('[placeholder="Enter your zip..."]').fill('94114');

    // await page.locator('button:has-text("Continue")').click();

    await page.locator('[placeholder="Allergies information"]').fill('NemamAlergiju');

    await page.locator('button:has-text("Next")').click();

    // Click button:has-text("Next")
    await page.locator('button:has-text("Next")').click();
    // Click text=Select Feast size
    await page.locator('text=Select Feast size').click();
    // Click #react-select-2-option-1
    await page.locator('#react-select-2-option-0').click();

    // Click button:has-text("Next")
    await page.locator('button:has-text("Next")').click();

    // fill in users delivery contact details
    await deliveryContact(page, email);

    await deliveryAddress(page);

    await page.locator('text=PAYMENT', { timeout: 10000 }).click();

    await page.waitForLoadState();

    await fillStripeInfo(page);

    // Click button:has-text("See all orders")
    await page.locator('button:has-text("See all orders")').click();
    await expect(page).toHaveURL('https://frontend.staging.mfeast.io/member-account/account/my-feasts');

    await page.close();
});
