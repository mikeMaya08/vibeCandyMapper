import { test } from '@playwright/test';
import { WelcomePopupPage } from '../pages/WelcomePopupPage';
import { ChallengesPage } from '../pages/ChallengesPage';
import { ContactFormPage } from '../pages/ContactFormPage';

// VARIANTE 2: describe + beforeEach
// El setup se extrae al beforeEach. Ideal cuando varios tests comparten el mismo estado inicial.

test.describe('Dynamic Values challenge — describe + beforeEach', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
  });

  test('shows email validation error when submitting without email', async ({ page }) => {
    const challenges = new ChallengesPage(page);
    await challenges.selectChallenge('Dynamic Values');

    const form = new ContactFormPage(page);
    await form.fillForm({ firstName: 'Min', lastName: 'Mon' });
    await form.submit();
    await form.expectEmailValidationError();
  });

});
