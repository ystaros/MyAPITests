import { test, expect } from '@playwright/test';

test ('first test', async ({ page }) => {

});

test ('second test', async ({ page }) => {
    await page.goto('http://localhost:5000/');

    await expect(page).toHaveURL("http://localhost:5000/");
    await expect(page).toHaveTitle("Users App");
});

test ('third test', async ({ page }) => {
    await page.goto('http://localhost:5000/');

    const headerLocator = page.getByRole('heading', { name: 'Node Express API Server App.' });

    await expect(headerLocator).toBeVisible();

    // second version
    const headerCssLocator = page.locator("#appName");

    await expect(headerCssLocator).toHaveText('Node Express API Server App.')
    
});

test('Add User form, getAttribute test', async ({ page }) => {
    await page.goto('http://localhost:5000/');

    // const locatorAttribute =  await page.getAttribute('type', 'number', {strict: true, timeout: 30000});
    const locatorAttribute = await page.locator('input[type="number"]').getAttribute('type', { timeout: 30000 });

    console.log("locatorAttribute = ", locatorAttribute);

})

test('Add User form, functional test', async ({ page }) => {
    await page.goto('http://localhost:5000/');


    const firstNamePlaceholder = page.getByPlaceholder("Enter first Name...", { exact: true });
    await firstNamePlaceholder.fill("John");

    const lastNameLabel =  await page.getByLabel('Last Name', { exact: true });
    await lastNameLabel.fill("Doe");

    const ageId = await page.getByTestId("age");
    await ageId.fill('34');

    const addButton = await page.getByRole("button", { name: "Add", exact: true });
    await addButton.click();

    // await page.pause();

    })