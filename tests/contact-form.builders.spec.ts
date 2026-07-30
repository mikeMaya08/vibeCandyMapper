import { test } from '@playwright/test';
import { WelcomePopupPage } from './pages/WelcomePopupPage';
import { ContactFormPage } from './pages/ContactFormPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { ContactFormDataBuilder } from './builders/ContactFormDataBuilder';

/**
 * Data Builders pattern — Contact form tests
 * Test data is constructed with a fluent builder, making the intent of each
 * scenario explicit at a glance. Page Objects handle the UI interactions.
 */
test.describe('Contact form — Data Builders pattern', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
  });

  test('shows email validation error when email is omitted', async ({ page }) => {
    const form = new ContactFormPage(page);

    // Builder communicates intent: a user who provides a name but no email
    const data = new ContactFormDataBuilder()
      .withFirstName('Mike')
      .withoutEmail()
      .build();

    await form.scrollIntoView();
    await form.fillForm(data);
    await form.submit();
    await form.expectEmailValidationError();
  });

  test('shows email validation error on Dynamic Values challenge without email', async ({ page }) => {
    const challenges = new ChallengesPage(page);
    const form = new ContactFormPage(page);

    const data = new ContactFormDataBuilder()
      .withFirstName('Min')
      .withLastName('Mon')
      .withoutEmail()
      .build();

    await challenges.selectChallenge('Dynamic Values');
    await form.fillForm(data);
    await form.submit();
    await form.expectEmailValidationError();
  });

  test('submits successfully with all fields filled', async ({ page }) => {
    const form = new ContactFormPage(page);

    // Builder with all fields — the "happy path" user
    const data = new ContactFormDataBuilder()
      .withFirstName('Miguel')
      .withLastName('Maya')
      .withEmail('miguel@mailinator.com')
      .build();

    await form.scrollIntoView();
    await form.fillForm(data);
    await form.submit();
    await form.expectSendingState();
    await form.expectSuccessView();
  });

});
