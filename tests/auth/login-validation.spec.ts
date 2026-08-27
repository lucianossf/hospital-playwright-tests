import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('TC-105 | deve proteger visualmente o valor informado no campo de senha', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.expectPasswordMasked();
});

test('TC-106 | deve rejeitar autenticação com usuário e senha vazios', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login('', '');
  await loginPage.expectInvalidCredentials();
});

test('TC-107 | deve disponibilizar português brasileiro na seleção de idioma', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.selectLanguage('Portuguese (Brazilian)');
});
