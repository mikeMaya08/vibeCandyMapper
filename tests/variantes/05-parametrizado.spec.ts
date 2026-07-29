import { test, expect } from '@playwright/test';

const BASE_URL = 'https://vibe-candy-mapper.vercel.app/';

// VARIANTE 5: Test parametrizado con loop
// Corre el mismo flujo con distintos conjuntos de datos.
// Útil para probar múltiples casos de validación sin duplicar código.

const casos = [
  { firstName: '',    lastName: 'Mon',  email: '',                    descripcion: 'sin nombre ni email' },
  { firstName: 'Min', lastName: 'Mon',  email: '',                    descripcion: 'sin email' },
  { firstName: 'Min', lastName: '',     email: '',                    descripcion: 'sin apellido ni email' },
];

test.describe('Dynamic Values challenge — parametrizado', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);

    // Dismiss the welcome modal if it appears
    const findCandyBtn = page.getByRole('button', { name: 'FIND MY CANDY!' });
    if (await findCandyBtn.isVisible()) {
      await findCandyBtn.click();
    }
  });

  for (const caso of casos) {
    test(`shows email validation error — ${caso.descripcion}`, async ({ page }) => {
      // Navigate to the Dynamic Values card
      await page.locator('#optionsGrid').scrollIntoViewIfNeeded();
      await page.locator('//button[@data-topic="Dynamic Values"]').click();

      // Fill fields with test data
      if (caso.firstName) {
        await page.getByRole('textbox', { name: 'First Name' }).fill(caso.firstName);
      }
      if (caso.lastName) {
        await page.getByRole('textbox', { name: 'Last Name' }).fill(caso.lastName);
      }
      if (caso.email) {
        await page.getByRole('textbox', { name: 'Email*' }).fill(caso.email);
      }

      // Submit the form
      await page.getByRole('button', { name: 'SUBMIT' }).click();

      // Assert the email validation error is always shown
      await expect(page.locator('#emailError')).toHaveText('Please enter a valid email address');
    });
  }

});
