import { test } from '../../fixtures/testFixtures';

test('TC-104 | deve exibir agenda com visões diária semanal e mensal', async ({ dashboardPage }) => {
  await dashboardPage.expectCalendarAvailable();
});
