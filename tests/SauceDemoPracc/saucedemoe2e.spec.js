import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
// navigate to saucedemo
await page.goto("https://www.saucedemo.com/")

await page.locator('#user-name').fill('standard_user');

await page.locator('#password').fill('secret_sauce');
//click on login button
await page.locator('#login-button').click();

await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

await page.locator('#add-to-cart-sauce-labs-backpack').click();

await page.locator('#shopping_cart_container').click();

await expect(page.locator('#item_4_title_link')).toHaveText('Sauce Labs Backpack');
await expect(page.locator('.item_pricebar')).toBeVisible('$29.99');
await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

await page.locator('#checkout').click();

await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Checkout: Your Information');

await page.locator('#first-name').click();
await page.locator('#first-name').fill('Filip');
await page.locator('#last-name').click();
await page.locator('#last-name').fill('Kubski');
await page.locator('#postal-code').click();
await page.locator('#postal-code').fill('94016')
await page.locator('#continue').click();
await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html'); 

await expect(page.locator('.header_secondary_container')).toHaveText('Checkout: Overview');
await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
await expect(page.locator('.summary_total_label')).toBeVisible('$29.99');
await expect(page.locator('.summary_total_label')).toBeVisible('$32.39');
await expect(page.locator('//*[@id="checkout_summary_container"]/div/div[2]/div[2]')).toHaveText('SauceCard #31337');
await page.locator('#finish').click();

await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Checkout: Complete!');
await expect(page.locator('.complete-header')).toHaveText('THANK YOU FOR YOUR ORDER');
await expect(page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
await expect(page.locator('.pony_express')).toHaveAttribute('src','/static/media/pony-express.46394a5d.png');   
await page.locator('#back-to-products').click();
});