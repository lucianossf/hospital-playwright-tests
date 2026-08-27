import { expect, type FrameLocator, type Page } from '@playwright/test';

export class PatientFinderPage {
  private readonly finderFrame: FrameLocator;

  constructor(private readonly page: Page) {
    this.finderFrame = page.frameLocator('iframe[name="fin"]');
  }

  async search(searchTerm: string): Promise<void> {
    const globalSearch = this.page.getByRole('textbox', { name: 'Search by any demographics' });
    await globalSearch.fill(searchTerm);
    await globalSearch.press('Enter');
  }

  async expectPatient(expectedName: string): Promise<void> {
    await expect(this.finderFrame.getByText('Patient Finder', { exact: true }).first()).toBeVisible();
    await expect(this.finderFrame.getByRole('link', { name: expectedName, exact: true })).toBeVisible();
  }

  async expectNoPatients(): Promise<void> {
    await expect(this.finderFrame.getByText('No matching records found', { exact: true })).toBeVisible();
    await expect(this.finderFrame.getByText(/Showing 0 to 0 of 0 entries/)).toBeVisible();
  }

  async expectDemographicColumns(): Promise<void> {
    for (const column of ['Full Name', 'Home Phone', 'SSN', 'Date of Birth', 'External ID']) {
      await expect(this.finderFrame.getByRole('columnheader', { name: new RegExp(`^${column}:`) })).toBeVisible();
    }
  }

  async expectDemographicFilters(): Promise<void> {
    for (const filterName of ['Search by Name', 'Search by Home Phone', 'Search by SSN', 'Search by Date of Birth', 'Search by External ID']) {
      await expect(this.finderFrame.getByRole('textbox', { name: filterName, exact: true })).toBeVisible();
    }
  }

  async enableExactSearch(): Promise<void> {
    const exactSearch = this.finderFrame.getByRole('checkbox', { name: 'Search with exact method', exact: true });
    await expect(exactSearch).not.toBeChecked();
    await exactSearch.check();
    await expect(exactSearch).toBeChecked();
  }
}
