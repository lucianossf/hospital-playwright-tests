import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/DashboardPage';
import { LoginPage } from '../../pages/LoginPage';
import { hospitalUsers } from '../../utils/testData';

test('TC-101 | deve autenticar administrador no OpenEMR', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await test.step('Abrir o portal hospitalar', async () => {
    await loginPage.open();
  });

  await test.step('Autenticar com o usuário público da demo', async () => {
    await loginPage.login(hospitalUsers.valid.username, hospitalUsers.valid.password);
  });

  await test.step('Validar os módulos clínicos principais', async () => {
    await dashboardPage.expectLoaded();
    await dashboardPage.dismissRegistrationIfVisible();
  });
});

test('TC-102 | deve rejeitar credenciais hospitalares inválidas', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(hospitalUsers.invalid.username, hospitalUsers.invalid.password);
  await loginPage.expectInvalidCredentials();
  await expect(page.getByRole('button', { name: 'Patient', exact: true })).not.toBeVisible();
});
