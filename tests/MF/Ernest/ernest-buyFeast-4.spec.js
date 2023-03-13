import { test, expect, chromium, defineConfig } from '@playwright/test';
import { fillStripeInfo } from '../../utils/stripe';
import { login } from '../../utils/auth';
import { deliveryContact } from '../../utils/deliveryContact';
import { deliveryAddress } from '../../utils/deliveryAddress';

const randomEmail = () => {
    return `marko.jovancevic+testemail${Math.round(Math.random() * 10000)}@growthmill.com`;
}

test.setTimeout(120000);

// test.use({ launchOptions: { slowMo: 1000 } });

test('Ernest buy 4 people feast e2e test', async ({ page }) => {
    //navigate
    await page.goto("https://mfstaging.webflow.io//")

    await page.getByRole('link', { name: 'LIMITED RESERVATIONS OPEN NOW' }).click();

    await expect(page).toHaveURL('https://mfstaging.webflow.io/ernest');

    await page.getByRole('link', { name: 'LIMITED RESERVATIONS OPEN NOW' }).first().click();

    await page.waitForLoadState();

    const email = randomEmail();

    await login(page, email);

    await page.waitForLoadState();

    await page.locator('[placeholder="Allergies information"]').fill('No Allergie');

    await page.locator('button:has-text("Next")').click();

    // Click button:has-text("Next")
    await page.locator('button:has-text("Next")').click();
    // Click text=Select Feast size
    
    // expect(page.locator('text=Select Feast size')).toBeVisible();

    await page.locator('text=Select Feast size').click();
    
    // expect(page.locator('#react-select-2-option-0')).toBeVisible();
    
    await page.locator('#react-select-2-option-0').click();
    
    await page.locator('button:has-text("Next")').click();

    await deliveryContact(page, email);

    await deliveryAddress(page);

    page.waitForLoadState('load');
 
    await expect(page.locator('input[name=lastName]')).toHaveValue('Testerovic');

    await page.locator('text=PAYMENT', { timeout: 10000 }).click();

    await page.waitForLoadState();

    await fillStripeInfo(page);

    // Click button:has-text("See all orders")
    await page.locator('button:has-text("See all orders")').click();

    await expect(page).toHaveURL('https://frontend.staging.mfeast.io/member-account/account/my-feasts');

    await page.close();
});










