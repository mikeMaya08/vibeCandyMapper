import { test } from '@playwright/test';
import { WelcomePopupPage } from '../pages/WelcomePopupPage';
import { ChallengesPage } from '../pages/ChallengesPage';
import { ContactFormPage } from '../pages/ContactFormPage';

// VARIANTE 1: Test básico — sin describe, sin hooks.
// La forma más simple. Útil para scripts rápidos o pruebas desechables.

test('shows email validation error on Dynamic Values form — básico', async ({ page }) => {
  await page.goto('/');

  const popup = new WelcomePopupPage(page);
  await popup.dismissIfVisible();

  const challenges = new ChallengesPage(page);
  await challenges.selectChallenge('Dynamic Values');

  const form = new ContactFormPage(page);
  await form.fillForm({ firstName: 'Min', lastName: 'Mon' });
  await form.submit();
  await form.expectEmailValidationError();
});
