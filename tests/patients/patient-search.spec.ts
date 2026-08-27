import { test } from '../../fixtures/testFixtures';
import { PatientFinderPage } from '../../pages/PatientFinderPage';
import { hospitalPatient } from '../../utils/testData';

test('TC-103 | deve localizar paciente de demonstração por dado demográfico', async ({ page, dashboardPage }) => {
  const patientFinderPage = new PatientFinderPage(page);

  await dashboardPage.expectLoaded();

  await test.step('Pesquisar o paciente sem alterar seu prontuário', async () => {
    await patientFinderPage.search(hospitalPatient.searchTerm);
  });

  await test.step('Validar resultado e colunas demográficas', async () => {
    await patientFinderPage.expectPatient(hospitalPatient.expectedName);
    await patientFinderPage.expectDemographicColumns();
  });
});

test('TC-109 | deve informar quando nenhum paciente corresponde à pesquisa', async ({ page, dashboardPage }) => {
  const patientFinderPage = new PatientFinderPage(page);

  await dashboardPage.expectLoaded();
  await patientFinderPage.search(hospitalPatient.missingSearchTerm);
  await patientFinderPage.expectNoPatients();
});
