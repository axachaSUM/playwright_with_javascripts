import { test, expect } from '@playwright/test';
import { fillStripeInfo } from '../utils/stripe';
import { login } from '../utils/auth';

const randomEmail = () => {
    return `marko.jovancevic+testemail${Math.round(Math.random() * 10000)}@growthmill.com`;
}

test('Buy all in one membership', async ({ page }) => {

    await page.goto("https://mfstaging.webflow.io//")

    const seasonalMember = page.getByText('ALL IN MEMBER');

    const box = await seasonalMember.boundingBox();

    if (box) {
        const y = box.y;
        await page.mouse.wheel(0, y);
    }

    await page.frameLocator('#iframe-button-membership-plan-all-in-member').getByRole('button', { name: 'become an ALL IN MEMBER' }).click();

    await expect(page).toHaveURL('https://frontend.staging.mfeast.io/login?productId=prod_Mm7QXvpoNI6Fxe');

    const email = randomEmail();

    await login(page, email);

    await expect(page).toHaveURL('https://frontend.staging.mfeast.io/membership-checkout?productId=prod_Mm7QXvpoNI6Fxe');

    await page.locator("text=PAYMENT", { timeout: 10000 }).click();

    await fillStripeInfo(page);

    await page.locator('button:has-text("Explore Feasts")').click();

    await expect(page).toHaveURL('https://mfstaging.webflow.io/#feasts');

    await page.close();

});