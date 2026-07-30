import { test, expect } from '@playwright/test';

const BASE_URL = 'https://vibe-candy-mapper.vercel.app/';

// VARIANTE 3: test.step
// Divide el test en pasos con nombre. El reporte muestra exactamente
// en qué paso falló, lo que facilita el diagnóstico.

test.describe('Dynamic Values challenge — test.step', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);

    // Dismiss the welcome modal if it appears
    const findCandyBtn = page.getByRole('button', { name: 'FIND MY CANDY!' });
    if (await findCandyBtn.isVisible()) {
      await findCandyBtn.click();
    }
  });

  test('shows email validation error when submitting without email', async ({ page }) => {

    await test.step('Navigate to the Dynamic Values card', async () => {
      await page.locator('#optionsGrid').scrollIntoViewIfNeeded();
      await page.locator('//button[@data-topic="Dynamic Values"]').click();
    });

    await test.step('Fill form without email', async () => {
      await page.getByRole('textbox', { name: 'First Name' }).fill('Min');
      await page.getByRole('textbox', { name: 'Last Name' }).fill('Mon');
    });

    await test.step('Submit the form', async () => {
      await page.getByRole('button', { name: 'SUBMIT' }).click();
    });

    await test.step('Assert email validation error is shown', async () => {
      await expect(page.locator('#emailError')).toHaveText('Please enter a valid email address');
    });

  });

});
