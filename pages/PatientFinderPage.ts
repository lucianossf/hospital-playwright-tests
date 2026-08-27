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

  async expectDemographicColumns(): Promise<void> {
    for (const column of ['Full Name', 'Home Phone', 'SSN', 'Date of Birth', 'External ID']) {
      await expect(this.finderFrame.getByRole('columnheader', { name: new RegExp(`^${column}:`) })).toBeVisible();
    }
  }
}
