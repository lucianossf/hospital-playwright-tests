import { test } from '../../fixtures/testFixtures';
import { PatientFinderPage } from '../../pages/PatientFinderPage';
import { hospitalPatient } from '../../utils/testData';

test('TC-110 | deve exibir filtros para os dados demográficos do paciente', async ({ page, dashboardPage }) => {
  const patientFinderPage = new PatientFinderPage(page);

  await dashboardPage.expectLoaded();
  await patientFinderPage.search(hospitalPatient.searchTerm);
  await patientFinderPage.expectDemographicFilters();
});

test('TC-111 | deve permitir alternar pesquisa demográfica exata sem alterar o estado original', async ({ page, dashboardPage }) => {
  const patientFinderPage = new PatientFinderPage(page);

  await dashboardPage.expectLoaded();
  await patientFinderPage.search(hospitalPatient.searchTerm);
  await patientFinderPage.expectExactSearchToggleable();
});
