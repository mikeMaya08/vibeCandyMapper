import { test } from '@playwright/test';
import { WelcomePopupPage } from './pages/WelcomePopupPage';
import { ContactFormPage } from './pages/ContactFormPage';

test.describe('Contact Us form — reset after success', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
  });

  /**
   * After a successful submission the app shows the success view for ~10 s,
   * then calls resetForm() + showForm() automatically.
   * This test verifies that cycle end-to-end:
   *   1. Submit valid data → success view appears.
   *   2. Wait for the auto-reset → form view returns.
   *   3. All fields are empty and ready for a new submission.
   *
   * The per-test timeout is raised to 25 s to cover the 10 s reset delay
   * plus submission latency (1–1.5 s random) and render time.
   */
  test('form returns to empty state automatically after the success view', async ({ page }) => {
    test.setTimeout(25_000);

    const form = new ContactFormPage(page);
    await form.scrollIntoView();

    // Submit a valid entry to reach the success view
    await form.fillForm({ firstName: 'Alex', email: 'alex@example.com' });
    await form.submit();
    await form.expectSuccessView();

    // Wait for the auto-reset (~10 s) — form view should reappear without page reload
    await form.expectFormVisible();

    // All fields must be cleared so the form is ready for a fresh submission
    await form.expectFieldsEmpty();
  });

});
