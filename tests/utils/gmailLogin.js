
export const gmailLogin = async (page) => {

    await page.goto('https://mail.google.com/mail/u/0/#inbox');
    await page.fill('#identifierId', 'mjtesterovic@gmail.com');
    await page.click('#identifierNext');
    await page.waitForSelector('input[type="password"]');
    await page.fill('input[type="password"]', 'Automationuser1991$');
    await page.locator('text=Next').click();
}