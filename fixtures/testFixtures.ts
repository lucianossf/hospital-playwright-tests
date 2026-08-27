import { test as base, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { hospitalUsers } from '../utils/testData';

type HospitalFixtures = {
  dashboardPage: DashboardPage;
};

export const test = base.extend<HospitalFixtures>({
  dashboardPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.open();
    await loginPage.login(hospitalUsers.valid.username, hospitalUsers.valid.password);
    await dashboardPage.expectLoaded();
    await dashboardPage.dismissRegistrationIfVisible();
    await use(dashboardPage);
  },
});

export { expect };
