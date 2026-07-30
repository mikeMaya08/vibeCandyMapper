import { test } from '@playwright/test';
import { WelcomePopupPage } from '../pages/WelcomePopupPage';
import { ChallengesPage } from '../pages/ChallengesPage';
import { ContactFormPage } from '../pages/ContactFormPage';

// VARIANTE 5: Test parametrizado con loop
// Corre el mismo flujo con distintos conjuntos de datos.
// Útil para probar múltiples casos de validación sin duplicar código.

const casos = [
  { firstName: '',    lastName: 'Mon',  email: '', descripcion: 'sin nombre ni email' },
  { firstName: 'Min', lastName: 'Mon',  email: '', descripcion: 'sin email' },
  { firstName: 'Min', lastName: '',     email: '', descripcion: 'sin apellido ni email' },
];

test.describe('Dynamic Values challenge — parametrizado', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const popup = new WelcomePopupPage(page);
    await popup.dismissIfVisible();
  });

  for (const caso of casos) {
    test(`shows email validation error — ${caso.descripcion}`, async ({ page }) => {
      const challenges = new ChallengesPage(page);
      await challenges.selectChallenge('Dynamic Values');

      const form = new ContactFormPage(page);
      await form.fillForm({
        firstName: caso.firstName || undefined,
        lastName: caso.lastName || undefined,
        email: caso.email || undefined,
      });
      await form.submit();
      await form.expectEmailValidationError();
    });
  }

});
