import { test } from '../../fixtures/testFixtures';

test('TC-104 | deve exibir agenda com visões diária semanal e mensal', async ({ dashboardPage }) => {
  await dashboardPage.expectCalendarAvailable();
});

test('TC-112 | deve disponibilizar filtro de profissionais na agenda', async ({ dashboardPage }) => {
  await dashboardPage.expectCalendarProviderFilter();
});
