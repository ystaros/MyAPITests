import { test, expect } from "@playwright/test";

const HOME_PAGE_URL = 'http://localhost:5000/';

// ### Test Case 2: Verify Tab Navigation Functionality
// Objective: Ensure each tab navigates to the correct content/page.
// - Steps:
// 1. Click on each tab (e.g., "Home", "About", "Contact").
// 2. Verify the correct page content is loaded for each tab.
// - Expected Result: Clicking each tab should navigate to the correct corresponding page.

// [
//     {tabName: 'Add', header: 'Add User', buttonName: 'Add', expectedCount: 3, expectedLabels: [ 'First Name', 'Last Name', 'Age' ]},
//     {tabName: 'Search', header: 'Search User', buttonName: 'Search', expectedCount: 4, expectedLabels: [ 'User ID', 'First Name', 'Last Name', 'Age' ]},
//     {tabName: 'Edit', header: 'Edit User', buttonName: 'Edit', expectedCount: 4, expectedLabels: [ 'User ID', 'First Name', 'Last Name', 'Age' ]},
//     {tabName: 'Delete', header: 'Delete User', buttonName: 'Delete', expectedCount: 4, expectedLabels: [ 'User ID', 'First Name', 'Last Name', 'Age' ]},
// ].forEach(({ tabName, header, buttonName, expectedCount, expectedLabels }) => {
[
    {tabName: 'Add', header: 'Add User', buttonName: 'Add', expectedCount: 3, expectedLabels: [ 'First Name', 'Last Name', 'Age' ], expectedURL: HOME_PAGE_URL+ 'add', expectedTitle: 'Users App'},
    {tabName: 'Search', header: 'Search User', buttonName: 'Search', expectedCount: 4, expectedLabels: [ 'User ID', 'First Name', 'Last Name', 'Age' ], expectedURL: HOME_PAGE_URL+ 'search', expectedTitle: 'Search User' },
    {tabName: 'Edit', header: 'Edit User', buttonName: 'Edit', expectedCount: 4, expectedLabels: [ 'User ID', 'First Name', 'Last Name', 'Age' ], expectedURL: HOME_PAGE_URL+ 'edit', expectedTitle: 'Edit User' },
    {tabName: 'Delete', header: 'Delete User', buttonName: 'Delete', expectedCount: 4, expectedLabels: [ 'User ID', 'First Name', 'Last Name', 'Age' ], expectedURL: HOME_PAGE_URL+ 'delete', expectedTitle: 'Delete User'},
].forEach(({ tabName , header, buttonName, expectedCount, expectedLabels, expectedURL, expectedTitle}) => {
    test.describe('Navigation Tabs Functionality', async() => {
        test.beforeEach('Navigate to home page url', async({ page }) => {
            await page.goto('http://localhost:5000/');

        })
        test(`TC-NavTabFun-1: Verify ${tabName} Navigation Tabs Functionality`, async({ page }) => {
            // test.setTimeout(20000);

            const tab = await page.getByRole('link', {name: `${tabName}`, exact: true});

            await tab.click();

            const h2Header = await  page.getByRole('heading', { name: `${header}`, exact: true });
            const button = await  page.getByRole('button', { name: `${buttonName}`, exact: true });
            const formFields = await  page.locator('.form-group');
            const labelsText = await formFields.locator('label').allInnerTexts();
            console.log(labelsText);

            // h2, button, UserId
            await expect(h2Header).toBeVisible();
            await expect(button).toBeVisible();
            await expect(button).toBeEnabled({ enabled: false });
            await expect(formFields).toHaveCount(expectedCount);
            await expect(labelsText).toEqual(expectedLabels);
        })

    // ### Test Case 4: Verify URL Change on Tab Click
    //     Objective: Ensure URL updates correctly based on tab navigation.
    //     - Steps:
    //     1. Click on each tab.
    //     2. Verify the URL updates according to the active tab (e.g., /home, /about).
    //     - Expected Result: URL should change based on the active tab.


        test(`TC-NavTabFun-2: Verify ${expectedURL} URL AND ${expectedTitle} Change on ${tabName} Tab Click.`, async({ page }) => {
            test.setTimeout(20000);

            const tab = await page.getByRole('link', { name: `${tabName}`, exact:  true });

            await tab.click();

            const url = page.url();
            const title = await page.title();

            // url, title
            await expect(url).toEqual(expectedURL);
            await expect(title).toEqual(expectedTitle);
        })

    })
})