import { test } from '@playwright/test';
import { WelcomePopupPage } from '../pages/WelcomePopupPage';
import { ChallengesPage } from '../pages/ChallengesPage';
import { ContactFormPage } from '../pages/ContactFormPage';

// VARIANTE 3: test.step
// Divide el test en pasos con nombre. El reporte muestra exactamente
// en qué paso falló, lo que facilita el diagnóstico.

test.describe('Dynamic Values challenge — test.step', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
  });

  test('shows email validation error when submitting without email', async ({ page }) => {
    const challenges = new ChallengesPage(page);
    const form = new ContactFormPage(page);

    await test.step('Navigate to the Dynamic Values challenge', async () => {
      await challenges.selectChallenge('Dynamic Values');
    });

    await test.step('Fill form without email', async () => {
      await form.fillForm({ firstName: 'Min', lastName: 'Mon' });
    });

    await test.step('Submit the form', async () => {
      await form.submit();
    });

    await test.step('Assert email validation error is shown', async () => {
      await form.expectEmailValidationError();
    });
  });

});
