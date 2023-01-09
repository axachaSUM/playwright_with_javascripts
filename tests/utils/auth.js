export const login = async (page, email) => {

    await page.locator('[placeholder="Enter your email\\.\\.\\."]').fill(email);

    await page.locator('button:has-text("Continue")').click();

}