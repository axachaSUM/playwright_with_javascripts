import { test, expect, chromium } from '@playwright/test';

test('Buying jacket and t-shirt', async ({ page }) => {

    //login as standard user
    await page.goto("https://www.saucedemo.com/")
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('secret_sauce')
    await page.locator('#login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
   
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.waitForTimeout(5000);
    await page.locator('#shopping_cart_container').click();
});