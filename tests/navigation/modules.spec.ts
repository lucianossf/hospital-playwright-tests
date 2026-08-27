import { test } from '../../fixtures/testFixtures';

test('TC-108 | deve disponibilizar os módulos operacionais para o administrador', async ({ dashboardPage }) => {
  await dashboardPage.expectOperationalModules();
});
