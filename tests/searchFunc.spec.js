import { test, expect, request } from "@playwright/test";
import { users } from "../testData/functionalTestData/usersTestData.js";
import { data } from "../testData/functionalTestData/searchFuncTestData.js"
import { HOME_PAGE_URL } from "../testData/functionalTestData/baseTestData.js";
import * as precondition from "../utils/preconditions.js";

/*
TC-SearchFun-1:
Preconditions:
1. DB is empty
2. User is on Home page
3. UsersDB contains at least 3 users

Steps:
1. Click on Search Tab
2. Fill search criteria in corresponding fields
3. Click Search button

Expected result:

*/

// Test template:
//
// [
//
// ].forEach(({}) => {
//     test.describe('', async => {
//         test.beforeEach('', async ({ page, request }) =>
//         {
//
//         })
//
//         test('', async({ page }) => {
//
//         })
//     })
// })


[
    {tcName: data._1.tcName, searchCriteria: data._1.searchCriteria, expectedCount: data._1.expectedCount, expectedUsers: data._1.expectedUsers},
    {tcName: data._2.tcName, searchCriteria: data._2.searchCriteria, expectedCount: data._2.expectedCount, expectedUsers: data._2.expectedUsers},
    {tcName: data._3.tcName, searchCriteria: data._3.searchCriteria, expectedCount: data._3.expectedCount, expectedUsers: data._3.expectedUsers},
    {tcName: data._4.tcName, searchCriteria: data._4.searchCriteria, expectedCount: data._4.expectedCount, expectedUsers: data._4.expectedUsers},
    {tcName: data._5.tcName, searchCriteria: data._5.searchCriteria, expectedCount: data._5.expectedCount, expectedUsers: data._5.expectedUsers},
    {tcName: data._6.tcName, searchCriteria: data._6.searchCriteria, expectedCount: data._6.expectedCount, expectedUsers: data._6.expectedUsers},
].forEach(({ tcName, searchCriteria, expectedCount,  expectedUsers }) => {
    test.describe('Search User Functionality', async() => {
        let apiRequest;
        const usersDB = [users.user1, users.user2, users.user3, users.user4];

        test.beforeEach('Delete DB, Land on Home page, Create DB via UI', async ({ page }) => {
            // 1. DB is empty
            apiRequest = await request.newContext();
            await precondition.setPrecondition_DeleteUsers(apiRequest);

            // 2. User is on Home page
            await page.goto(HOME_PAGE_URL);

            // 3. Create UsersDB contains at least 3 users
            const firstNameField = await page.getByPlaceholder("Enter first Name...");
            const lastNameField = await page.getByPlaceholder("Enter last Name...");
            const ageField = await page.getByPlaceholder("Enter age...");
            const addButton = await page.getByRole('button', {name: "Add"});

            for (const user of usersDB) {
                await firstNameField.fill(user.firstName);
                await lastNameField.fill(user.lastName);
                await ageField.fill(user.age);
                await addButton.click();
                user.id = await  page.locator('tbody>tr>td').last().innerText();
            }

            console.log(usersDB);

        })

        test(`TC-SearchFun-1: ${tcName}`, async({ page }) => {
            console.log("Test");

        })

        test.afterEach('Close API request context', async () => {
            await apiRequest.dispose();
        })
    })
})

