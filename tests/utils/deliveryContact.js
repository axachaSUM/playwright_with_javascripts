import { expect } from '@playwright/test';
export const deliveryContact = async (page, email) => {

  await page.getByPlaceholder('Enter your first name').fill('MJ');
  await page.getByPlaceholder('Enter your last name').fill('Testerovic');
  await page.getByPlaceholder('(310) 832-5016').fill('800 444 4444');
  await expect(page.locator('input[name=lastName]')).toHaveValue('Testerovic');
  await expect(page.locator('input[name=firstName]')).toHaveValue('MJ');
  await expect(page.locator('input[name=email]')).toHaveValue(email);
  await page.getByRole('button', { name: 'Next' }).click();

}