import { test } from '@playwright/test';
import { WelcomePopupPage } from './pages/WelcomePopupPage';
import { ContactFormPage } from './pages/ContactFormPage';

/**
 * Contact form — validation scenarios (from video flow)
 * Covers:
 *   1. Empty form submission triggers both "Name is required" and email errors.
 *   2. Submitting with an invalid email format (missing "@") shows the email error.
 */
test.describe('Contact form — validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
  });

  test('shows name and email errors when submitting an empty form', async ({ page }) => {
    const form = new ContactFormPage(page);

    // Scroll the form into view so fields are interactable
    await form.scrollIntoView();

    // Submit without filling any field
    await form.submit();

    // Both validation errors should appear simultaneously
    await form.expectNameValidationError();
    await form.expectEmailValidationError();
  });

  test('shows email error when submitting with an invalid email format', async ({ page }) => {
    const form = new ContactFormPage(page);

    await form.scrollIntoView();

    // Fill name to satisfy that field, but provide a malformed email (no "@")
    await form.fillForm({ firstName: 'Test', email: 'quieras21222.com' });
    await form.submit();

    // Email error should still appear due to invalid format
    await form.expectEmailValidationError();
  });

});
