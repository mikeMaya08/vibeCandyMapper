import { test as base, expect } from '@playwright/test';

const BASE_URL = 'https://vibe-candy-mapper.vercel.app/';

// VARIANTE 6: Fixture personalizado
// El fixture encapsula el setup (navegar + cerrar modal) y lo inyecta
// como "readyPage" en cualquier test que lo pida.
// Ideal para reutilizar el mismo estado inicial en múltiples archivos.

type MyFixtures = {
  readyPage: ReturnType<typeof base['extend']> extends { readyPage: infer T } ? T : import('@playwright/test').Page;
};

const test = base.extend<MyFixtures>({
  readyPage: async ({ page }, use) => {
    await page.goto(BASE_URL);

    // Dismiss the welcome modal if it appears
    const findCandyBtn = page.getByRole('button', { name: 'FIND MY CANDY!' });
    if (await findCandyBtn.isVisible()) {
      await findCandyBtn.click();
    }

    // Hand the ready page to the test
    await use(page as any);
  },
});

test.describe('Dynamic Values challenge — fixture personalizado', () => {

  test('shows email validation error when submitting without email', async ({ readyPage: page }) => {
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
