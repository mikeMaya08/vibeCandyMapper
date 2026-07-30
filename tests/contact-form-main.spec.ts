import { test } from '@playwright/test';
import { WelcomePopupPage } from './pages/WelcomePopupPage';
import { ContactFormPage } from './pages/ContactFormPage';

test.describe('Contact Us form — main', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
  });

  test('shows validation error when email is missing and succeeds on valid submission', async ({ page }) => {
    const form = new ContactFormPage(page);

    // Scroll to the contact section
    await form.scrollIntoView();

    // Fill only First Name (no email) and submit — expect validation error
    await form.fillForm({ firstName: 'Mike' });
    await form.submit();
    await form.expectEmailValidationError();

    // Now fill a valid email and resubmit — expect success
    await form.fillEmail('miguel@mailinator.com');
    await form.submit();
    await form.expectSendingState();
    await form.expectSuccessView();
  });

});
