import { test } from '@playwright/test';
import { WelcomePopupPage } from './pages/WelcomePopupPage';
import { ContactFormPage } from './pages/ContactFormPage';

test.describe('Contact Us form — validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
  });

  test('shows name validation error when first name is missing', async ({ page }) => {
    const form = new ContactFormPage(page);
    await form.scrollIntoView();

    // Submit without filling First Name — only email provided
    await form.fillForm({ email: 'test@example.com' });
    await form.submit();

    await form.expectNameValidationError();
    await form.expectNoEmailValidationError();
  });

  test('shows email validation error for an invalid email format', async ({ page }) => {
    const form = new ContactFormPage(page);
    await form.scrollIntoView();

    // Fill a name but use a malformed email (no @ sign)
    await form.fillForm({ firstName: 'Alex', email: 'notanemail' });
    await form.submit();

    await form.expectEmailValidationError();
    await form.expectNoNameValidationError();
  });

  test('shows both name and email errors when both fields are empty', async ({ page }) => {
    const form = new ContactFormPage(page);
    await form.scrollIntoView();

    // Submit with no fields filled at all
    await form.submit();

    await form.expectNameValidationError();
    await form.expectEmailValidationError();
  });

  test('clears name error as soon as the user starts typing', async ({ page }) => {
    const form = new ContactFormPage(page);
    await form.scrollIntoView();

    // Trigger name error
    await form.submit();
    await form.expectNameValidationError();
    await form.expectNameFieldInvalid();

    // Start typing in First Name — error should clear immediately
    await form.fillFirstName('J');
    await form.expectNoNameValidationError();
    await form.expectNameFieldValid();
  });

  test('clears email error as soon as the user starts typing', async ({ page }) => {
    const form = new ContactFormPage(page);
    await form.scrollIntoView();

    // Trigger email error
    await form.fillForm({ firstName: 'Alex' });
    await form.submit();
    await form.expectEmailValidationError();
    await form.expectEmailFieldInvalid();

    // Start typing in Email — error should clear immediately
    await form.fillEmail('a');
    await form.expectNoEmailValidationError();
    await form.expectEmailFieldValid();
  });

});
