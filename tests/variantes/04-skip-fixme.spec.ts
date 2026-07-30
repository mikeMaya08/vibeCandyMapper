import { test, expect } from '@playwright/test';

const BASE_URL = 'https://vibe-candy-mapper.vercel.app/';

// VARIANTE 4: test.skip y test.fixme
// Útil para marcar el estado de un test sin eliminarlo.
// - test.skip: lo omite en la ejecución actual (ej. feature no lista aún)
// - test.fixme: lo marca como roto/pendiente de arreglar

test.describe('Dynamic Values challenge — skip y fixme', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);

    // Dismiss the welcome modal if it appears
    const findCandyBtn = page.getByRole('button', { name: 'FIND MY CANDY!' });
    if (await findCandyBtn.isVisible()) {
      await findCandyBtn.click();
    }
  });

  // Este test corre normalmente
  test('shows email validation error when submitting without email', async ({ page }) => {
    await page.locator('#optionsGrid').scrollIntoViewIfNeeded();
    await page.locator('//button[@data-topic="Dynamic Values"]').click();

    await page.getByRole('textbox', { name: 'First Name' }).fill('Min');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Mon');
    await page.getByRole('button', { name: 'SUBMIT' }).click();

    await expect(page.locator('#emailError')).toHaveText('Please enter a valid email address');
  });

  // Este test se salta — feature aún no implementada
  test.skip('shows error when email format is invalid', async ({ page }) => {
    await page.locator('#optionsGrid').scrollIntoViewIfNeeded();
    await page.locator('//button[@data-topic="Dynamic Values"]').click();

    await page.getByRole('textbox', { name: 'First Name' }).fill('Min');
    await page.getByRole('textbox', { name: 'Email*' }).fill('not-an-email');
    await page.getByRole('button', { name: 'SUBMIT' }).click();

    await expect(page.locator('#emailError')).toHaveText('Please enter a valid email address');
  });

  // Este test está roto y pendiente de fix
  test.fixme('shows success message after valid submission', async ({ page }) => {
    await page.locator('#optionsGrid').scrollIntoViewIfNeeded();
    await page.locator('//button[@data-topic="Dynamic Values"]').click();

    await page.getByRole('textbox', { name: 'First Name' }).fill('Min');
    await page.getByRole('textbox', { name: 'Email*' }).fill('min@example.com');
    await page.getByRole('button', { name: 'SUBMIT' }).click();

    await expect(page.locator('#successView')).toBeVisible();
  });

});
