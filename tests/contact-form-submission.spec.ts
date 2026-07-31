import { test } from '@playwright/test';
import { WelcomePopupPage } from './pages/WelcomePopupPage';
import { ContactFormPage } from './pages/ContactFormPage';

test.describe('Contact Us form — submission', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
  });

  test('shows success message after submitting all required fields', async ({ page }) => {
    const form = new ContactFormPage(page);
    await form.scrollIntoView();

    // Fill the minimum required fields: name + valid email
    await form.fillForm({ firstName: 'Alex', email: 'alex@example.com' });
    await form.submit();

    // The form should transition to the success view
    await form.expectSuccessView();
  });

  test('disables the submit button and shows a spinner while submitting', async ({ page }) => {
    const form = new ContactFormPage(page);
    await form.scrollIntoView();

    await form.fillForm({ firstName: 'Alex', email: 'alex@example.com' });
    await form.submit();

    // Immediately after clicking, the button enters the loading state
    await form.expectSendingState();
    await form.expectSubmitButtonDisabled();
  });

});
