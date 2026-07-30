import { Page, expect } from '@playwright/test';

/**
 * App Actions pattern — contact form actions
 * Pure functions that model what a user does with the contact form.
 * Composable, stateless, and independent of any class or page object.
 */

export async function scrollToContactForm(page: Page) {
  await page.locator('#contactSection').scrollIntoViewIfNeeded();
}

export async function fillContactForm(
  page: Page,
  data: { firstName?: string; lastName?: string; email?: string }
) {
  if (data.firstName !== undefined)
    await page.getByRole('textbox', { name: 'First Name' }).fill(data.firstName);
  if (data.lastName !== undefined)
    await page.getByRole('textbox', { name: 'Last Name' }).fill(data.lastName);
  if (data.email !== undefined)
    await page.getByRole('textbox', { name: 'Email*' }).fill(data.email);
}

export async function submitContactForm(page: Page) {
  await page.getByRole('button', { name: 'SUBMIT' }).click();
}

export async function expectEmailValidationError(page: Page) {
  await expect(page.locator('#emailError')).toHaveText(
    'Please enter a valid email address'
  );
}

export async function expectFormSuccess(page: Page) {
  await expect(page.locator('#successView')).toBeVisible({ timeout: 5000 });
  await expect(page.locator('#successView p')).toHaveText(
    'Thank you! Your message has been sent.'
  );
}

export async function selectChallenge(page: Page, topic: string) {
  await page.locator('#optionsGrid').scrollIntoViewIfNeeded();
  await page.locator(`//button[@data-topic="${topic}"]`).click();
}
