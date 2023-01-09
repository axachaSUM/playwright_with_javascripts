import { test, expect } from '@playwright/test';

test('Buying jacket and t-shirt', async ({ page }) => {
    //login as standard user
    await page.goto("https://www.saucedemo.com/")
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('secret_sauce')
    await page.locator('#login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
   
    //buying tshirt and jacket
    await page.locator('.product_sort_container').selectOption('lohi')
    await page.locator('#add-to-cart-sauce-labs-fleece-jacket').click();
    await page.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await expect(page.locator('#remove-sauce-labs-fleece-jacket')).toHaveText('Remove');
    await expect(page.locator('#remove-sauce-labs-bolt-t-shirt')).toHaveText('Remove');

    //Your Shopping cart 
    await page.locator('#shopping_cart_container').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')
    await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Your Cart');
    await expect(page.locator('#item_5_title_link')).toHaveText('Sauce Labs Fleece Jacket');
    await expect(page.locator('.inventory_item_price >> nth=0')).toBeVisible('$49.99');
    await expect(page.locator('#item_1_title_link')).toHaveText('Sauce Labs Bolt T-Shirt');
    await expect(page.locator('.inventory_item_price >> nth=1')).toBeVisible('$15.99');
    await page.locator('#checkout').click();

    //checkout page
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    await expect(page.locator('.header_secondary_container')).toHaveText('Checkout: Your Information');
    await page.locator('#first-name').fill('Marko');
    await page.locator('#last-name').fill('Zavodja');
    await page.locator('#postal-code').fill('22330');
    await page.locator('#continue').click();

    //overview
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html'); 
    await expect(page.locator('.header_secondary_container')).toHaveText('Checkout: Overview');
    await expect(page.locator('.inventory_item_name >> nth=0')).toHaveText('Sauce Labs Fleece Jacket');
    await expect(page.locator('.inventory_item_name >> nth=1')).toHaveText('Sauce Labs Bolt T-Shirt');
    await expect(page.locator('.summary_total_label')).toBeVisible('$71.26');
    await expect(page.locator('//*[@id="checkout_summary_container"]/div/div[2]/div[2]')).toHaveText('SauceCard #31337');
    await page.locator('#finish').click();

     //ordering
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('//*[@id="header_container"]/div[2]/span')).toHaveText('Checkout: Complete!');
    await expect(page.locator('.complete-header')).toHaveText('THANK YOU FOR YOUR ORDER');
    await expect(page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    await expect(page.locator('.pony_express')).toHaveAttribute('src','/static/media/pony-express.46394a5d.png');   
    await page.locator('#back-to-products').click();

    //logout
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();




});