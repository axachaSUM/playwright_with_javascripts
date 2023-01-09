// import { delay } from "./delay";
import { expect } from '@playwright/test';

export const deliveryAddress = async (page) => {

    await page.getByPlaceholder ('Enter your address').fill('200 ocean avenue san francisco');
    await page.getByText('200 Ocean Avenue San Francisco, CA, USA').click();
    await page.waitForTimeout(1000);
    await expect(page.locator('input[name=address]')).toHaveValue('200 Ocean Avenue, San Francisco, CA, USA');
    await expect(page.locator('input[name=city]')).toHaveValue('San Francisco');
    await expect(page.locator('input[name=zip]')).toHaveValue('94112');
    await page.getByPlaceholder('Enter your apt number').fill('second floor, suite 15');
    await page.getByPlaceholder('Building access code, parking suggestions, etc').fill('SpecijalnaInstrukcija');
    await page.getByPlaceholder('eg. Home, Flat, Cottage...').fill('NewAddress');
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Submit' }).click();
    
}