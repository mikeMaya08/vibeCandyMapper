import { test, expect } from '@playwright/test';

const BASE_URL = 'https://vibe-candy-mapper.vercel.app/';

// VARIANTE 2: describe + beforeEach
// El setup (navegar y cerrar el modal) se extrae al beforeEach.
// Ideal cuando hay varios tests que comparten el mismo estado inicial.

test.describe('Dynamic Values challenge — describe + beforeEach', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);

    // Dismiss the welcome modal if it appears
    const findCandyBtn = page.getByRole('button', { name: 'FIND MY CANDY!' });
    if (await findCandyBtn.isVisible()) {
      await findCandyBtn.click();
    }
  });

  test('shows email validation error when submitting without email', async ({ page }) => {
    // Navigate to the Dynamic Values card
    await page.locator('#optionsGrid').scrollIntoViewIfNeeded();
    await page.locator('//button[@data-topic="Dynamic Values"]').click();

    // Fill First Name and Last Name only (no email)
    await page.getByRole('textbox', { name: 'First Name' }).fill('Min');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Mon');

    // Submit without an email address
    await page.getByRole('button', { name: 'SUBMIT' }).click();

    // Assert the email validation error is displayed
    await expect(page.locator('#emailError')).toHaveText('Please enter a valid email address');
  });

});
