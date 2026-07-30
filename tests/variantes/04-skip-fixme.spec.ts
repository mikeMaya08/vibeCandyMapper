import { test } from '@playwright/test';
import { WelcomePopupPage } from '../pages/WelcomePopupPage';
import { ChallengesPage } from '../pages/ChallengesPage';
import { ContactFormPage } from '../pages/ContactFormPage';

// VARIANTE 4: test.skip y test.fixme
// - test.skip: omite el test en la ejecución actual (feature no lista aún)
// - test.fixme: lo marca como roto/pendiente de arreglar

test.describe('Dynamic Values challenge — skip y fixme', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
  });

  // Este test corre normalmente
  test('shows email validation error when submitting without email', async ({ page }) => {
    const challenges = new ChallengesPage(page);
    await challenges.selectChallenge('Dynamic Values');

    const form = new ContactFormPage(page);
    await form.fillForm({ firstName: 'Min', lastName: 'Mon' });
    await form.submit();
    await form.expectEmailValidationError();
  });

  // Este test se salta — feature aún no implementada
  test.skip('shows error when email format is invalid', async ({ page }) => {
    const challenges = new ChallengesPage(page);
    await challenges.selectChallenge('Dynamic Values');

    const form = new ContactFormPage(page);
    await form.fillForm({ firstName: 'Min', email: 'not-an-email' });
    await form.submit();
    await form.expectEmailValidationError();
  });

  // Este test está roto y pendiente de fix
  test.fixme('shows success message after valid submission', async ({ page }) => {
    const challenges = new ChallengesPage(page);
    await challenges.selectChallenge('Dynamic Values');

    const form = new ContactFormPage(page);
    await form.fillForm({ firstName: 'Min', email: 'min@example.com' });
    await form.submit();
    await form.expectSuccessView();
  });

});
