import { test } from '@playwright/test';
import { WelcomePopupPage } from '../../tests/pages/WelcomePopupPage';
import { ContactFormPage } from '../../tests/pages/ContactFormPage';
import { ChallengesPage } from '../../tests/pages/ChallengesPage';
import { ContactFormDataBuilder } from './builders/ContactFormDataBuilder';

/**
 * Data Builders pattern — Contact form tests
 * Specs live in e2e/ with testMatch pointing here via playwright.config.ts.
 * Test data is constructed with a fluent builder.
 */
test.describe('Contact form — Data Builders pattern', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
  });

  test('shows email validation error when email is omitted', async ({ page }) => {
    const form = new ContactFormPage(page);

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
