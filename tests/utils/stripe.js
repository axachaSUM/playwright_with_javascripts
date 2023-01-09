
export const fillStripeInfo = async (page) => {
    // await page.locator('.p-CardNumberInput >> nth=0').fill('5555555555554444');
   await page.frameLocator('.StripeElement iframe').locator('#Field-numberInput').fill('5555555555554444');

   // Fill [placeholder="MM \/ YY"]
   await page.frameLocator('.StripeElement iframe').locator('[placeholder="MM \\/ YY"]').fill('05 / 25');
 
   // Fill [placeholder="CVC"]
   await page.frameLocator('.StripeElement iframe').locator('[placeholder="CVC"]').fill('123'); 

   await page.locator('button:has-text("Submit")').click();
   
}

