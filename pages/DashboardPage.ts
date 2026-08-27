import { expect, type Page } from '@playwright/test';
import { HOSPITAL_MESSAGES } from '../utils/constants';

export class DashboardPage {
  constructor(private readonly page: Page) {}

  async dismissRegistrationIfVisible(): Promise<void> {
    const dialog = this.page.getByRole('dialog').filter({ hasText: HOSPITAL_MESSAGES.registrationTitle });
    await dialog.waitFor({ state: 'visible', timeout: 3_000 }).catch(() => undefined);

    if (await dialog.isVisible()) {
      await dialog.getByRole('button', { name: 'Ask again later', exact: true }).click();
    }
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page.getByRole('button', { name: 'Patient', exact: true })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Reports', exact: true })).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: 'Search by any demographics' })).toBeVisible();
  }

  async expectOperationalModules(): Promise<void> {
    for (const moduleName of ['Patient', 'Fees', 'Modules', 'Procedures', 'Admin', 'Reports', 'Miscellaneous', 'Popups']) {
      await expect(this.page.getByRole('button', { name: moduleName, exact: true })).toBeVisible();
    }
  }

  async expectCalendarAvailable(): Promise<void> {
    const calendar = this.page.frameLocator('iframe[name="cal"]');
    await expect(calendar.getByRole('link', { name: 'Day', exact: true })).toBeVisible();
    await expect(calendar.getByRole('link', { name: 'Week', exact: true })).toBeVisible();
    await expect(calendar.getByRole('link', { name: 'Month', exact: true })).toBeVisible();
  }

  async expectCalendarProviderFilter(): Promise<void> {
    const calendar = this.page.frameLocator('iframe[name="cal"]');
    const providerSelector = calendar.getByRole('listbox');

    await expect(providerSelector).toBeVisible();
    await expect(providerSelector.getByRole('option', { name: 'All Users', exact: true })).toBeVisible();
  }
}
