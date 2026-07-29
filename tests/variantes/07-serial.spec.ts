import { test, expect } from '@playwright/test';

const BASE_URL = 'https://vibe-candy-mapper.vercel.app/';

// VARIANTE 7: describe.serial
// Los tests corren en orden secuencial y comparten estado de página.
// Si uno falla, los siguientes se saltan automáticamente.
// Útil para flujos donde cada paso depende del anterior.

test.describe.serial('Dynamic Values challenge — flujo serial', () => {

  test.beforeAll(async ({ browser }) => {
    // En serial, beforeAll corre una sola vez antes de todos los tests
    const page = await browser.newPage();
    await page.goto(BASE_URL);
    await page.close();
  });

  test('1. Navega al sitio y cierra el modal', async ({ page }) => {
    await page.goto(BASE_URL);

    const findCandyBtn = page.getByRole('button', { name: 'FIND MY CANDY!' });
    if (await findCandyBtn.isVisible()) {
      await findCandyBtn.click();
    }

    await expect(findCandyBtn).not.toBeVisible();
  });

  test('2. Hace clic en la card Dynamic Values', async ({ page }) => {
    await page.goto(BASE_URL);

    const findCandyBtn = page.getByRole('button', { name: 'FIND MY CANDY!' });
    if (await findCandyBtn.isVisible()) {
      await findCandyBtn.click();
    }

    await page.locator('#optionsGrid').scrollIntoViewIfNeeded();
    await page.locator('//button[@data-topic="Dynamic Values"]').click();

    // Verify we scrolled to the contact section
    await expect(page.locator('#contactSection')).toBeInViewport();
  });

  test('3. Llena el formulario sin email y verifica el error', async ({ page }) => {
    await page.goto(BASE_URL);

    const findCandyBtn = page.getByRole('button', { name: 'FIND MY CANDY!' });
    if (await findCandyBtn.isVisible()) {
      await findCandyBtn.click();
    }

    await page.locator('#optionsGrid').scrollIntoViewIfNeeded();
    await page.locator('//button[@data-topic="Dynamic Values"]').click();

    await page.getByRole('textbox', { name: 'First Name' }).fill('Min');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Mon');
    await page.getByRole('button', { name: 'SUBMIT' }).click();

    await expect(page.locator('#emailError')).toHaveText('Please enter a valid email address');
  });

});
