import { test, expect } from '@playwright/test';

test('POM', async ({ page }) => {
    
    //login as standard user
    await page.goto("https://www.saucedemo.com/")
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('secret_sauce')
    await page.locator('#login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

    
    await page.locator('.inventory_item button >> nth=1').click();
    // await page.locator('#add-to-cart-sauce-labs-fleece-jacket').click();
    // await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();
    // await page.locator('#add-to-cart-sauce-labs-backpack').click();
    // await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    // await page.locator('#add-to-cart-sauce-labs-onesie').click();
    
    await page.waitForTimeout(1000);

    await page.locator('#shopping_cart_container').click();

    await page.waitForLoadState()
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
    // await page.waitForTimeout(1000);

    await page.locator('.cart_item button >> nth=0').click(); 

    // await page.locator('#remove-sauce-labs-backpack').click();
});
