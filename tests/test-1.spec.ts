import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5000/');
  await page.getByPlaceholder('Enter first Name...').click();
  await page.getByPlaceholder('Enter first Name...').fill('Olga');
  await page.getByPlaceholder('Enter first Name...').press('Tab');
  await page.getByPlaceholder('Enter last Name...').fill('Zobos');
  await page.getByPlaceholder('Enter age...').click();
  await page.getByPlaceholder('Enter age...').fill('45');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
});