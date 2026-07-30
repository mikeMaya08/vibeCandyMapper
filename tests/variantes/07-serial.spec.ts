import { test } from '@playwright/test';
import { WelcomePopupPage } from '../pages/WelcomePopupPage';
import { ChallengesPage } from '../pages/ChallengesPage';
import { ContactFormPage } from '../pages/ContactFormPage';

// VARIANTE 7: describe.serial
// Los tests corren en orden secuencial.
// Si uno falla, los siguientes se saltan automáticamente.
// Útil para flujos donde cada paso depende del anterior.

test.describe.serial('Dynamic Values challenge — flujo serial', () => {

  test('1. Navega al sitio y cierra el modal', async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissWithFindMyCandyButton();
  });

  test('2. Hace clic en la card Dynamic Values', async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();

    const challenges = new ChallengesPage(page);
    await challenges.selectChallenge('Dynamic Values');
    await challenges.expectContactSectionInViewport();
  });

  test('3. Llena el formulario sin email y verifica el error', async ({ page }) => {
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

});
